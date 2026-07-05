import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  BriefcaseIcon,
  Folder01Icon,
  Award01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";

const navLinks = [
  { href: "#home", label: "Home", icon: Home01Icon },
  // About removed per request
  { href: "#experience", label: "Experience", icon: BriefcaseIcon },
  { href: "#projects", label: "Projects", icon: Folder01Icon },
  { href: "#achievements", label: "Achievements", icon: Award01Icon },
  { href: "#contact", label: "Contact", icon: Mail01Icon }, 
];

function getActiveSection() {
  if (typeof window === "undefined") return "";
  const scrollY = window.scrollY;
  const scrollBottom = window.innerHeight + scrollY;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollY == 0) return "#home";

  // if scrolled to bottom, return the last link's href (works after removing Contact)
  if (docHeight - scrollBottom < 2) return navLinks[navLinks.length - 1]?.href || "";

  // Compute distance from element top to viewport center (more stable than abs(top))
  const viewportCenter = window.innerHeight / 2;
  const offsets = navLinks.map((link) => {
    const el = document.querySelector(link.href);
    return el ? Math.abs(el.getBoundingClientRect().top - viewportCenter) : Infinity;
  });

  const minOffset = Math.min(...offsets);
  const idx = offsets.indexOf(minOffset);
  return navLinks[idx]?.href || "";
}

export default function Sidebar() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [active, setActive] = useState("#home");
  const isManualRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (isManualRef.current) return;
      setActive(getActiveSection());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    isManualRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    setActive(href);

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      scrollTimeoutRef.current = setTimeout(() => { isManualRef.current = false; }, 800);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      scrollTimeoutRef.current = setTimeout(() => { isManualRef.current = false; }, 1200);
    }
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <motion.aside
          className="flex flex-col items-center bg-black/15 rounded-2xl py-4 px-2 shadow-xl border border-white/10 backdrop-blur-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div layoutRoot className="flex flex-col items-center">
            {navLinks.map((link, idx) => {
              const isActive = active === link.href;
              return (
                <div key={link.href} className="relative my-2 flex items-center">
                  <motion.a
                    href={link.href}
                    className="flex items-center justify-center w-10 h-10 rounded-lg relative"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-label={link.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-pill"
                        className="absolute inset-0 rounded-lg bg-white/15"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <HugeiconsIcon
                      icon={link.icon}
                      size={20}
                      className="relative z-10 text-[#f5f5f7]"
                    />
                  </motion.a>
                  <AnimatePresence>
                    {hoveredIdx === idx && (
                      <motion.span
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 16 }}
                        exit={{ opacity: 0, x: 0 }}
                        className="absolute left-12 px-3 py-1 rounded-lg text-sm font-medium bg-black/40 backdrop-blur-md border border-white/10 text-[#f5f5f7] whitespace-nowrap"
                        style={{ zIndex: 20 }}
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </motion.aside>
      </div>
      {/* Mobile dock */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-md">
        <motion.nav
          className="flex flex-row items-center justify-between bg-black/20 rounded-2xl py-2 px-4 shadow-xl border border-white/10 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks
            .map((link, idx) => {
             const isActive = active === link.href;
             return (
               <a
                 key={link.href}
                 href={link.href}
                 className="flex flex-col items-center justify-center w-10 h-10 rounded-lg group transition-colors"
                 onClick={(e) => handleNavClick(e, link.href)}
                 aria-label={link.label}
               >
                  <HugeiconsIcon
                    icon={link.icon}
                    size={20}
                    className="transition-colors text-[#f5f5f7]"
                  />
                  <span className="text-[10px] mt-1 text-[#f5f5f7]/70">
                    {link.label}
                  </span>
               </a>
             );
           })}
        </motion.nav>
      </div>
    </>
  );
}
