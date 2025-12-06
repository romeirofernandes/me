import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaTrophy,
  FaFolderOpen,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";

const navLinks = [
  { href: "#home", label: "Home", icon: <FaHome /> },
  // About removed per request
  { href: "#experience", label: "Experience", icon: <FaBriefcase /> },
  { href: "#projects", label: "Projects", icon: <FaFolderOpen /> },
  { href: "#achievements", label: "Achievements", icon: <FaTrophy /> },
  { href: "#contact", label: "Contact", icon: <FaEnvelope /> }, 
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

  useEffect(() => {
    const onScroll = () => setActive(getActiveSection());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // initialize active on mount
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActive("#home");
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      // mark active immediately (prevents wrong highlight during smooth scroll)
      setActive(href);
      // align target to viewport center so getActiveSection's center heuristic matches
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <motion.aside
          className="flex flex-col items-center bg-[#101014]/80 rounded-2xl py-4 px-2 shadow-lg border border-[#232323] backdrop-blur"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {navLinks.map((link, idx) => {
            const isActive = active === link.href;
            return (
              <div key={link.href} className="relative my-2 flex items-center">
                <motion.a
                  href={link.href}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg group transition-colors
                    ${isActive ? "bg-[#232323]" : ""}
                  `}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-label={link.label}
                  style={{ position: "relative", zIndex: 10 }}
                >
                  {React.cloneElement(link.icon, {
                    className: `text-xl transition-colors ${
                      isActive ? "text-[#f5f5f7]" : "text-gray-400"
                    } group-hover:text-[#f5f5f7]`,
                  })}
                </motion.a>
                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <motion.span
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 16 }}
                      exit={{ opacity: 0, x: 0 }}
                      className={`absolute left-12 px-3 py-1 rounded-lg text-sm font-medium bg-[#18181b] shadow
                        ${
                          isActive
                            ? "text-[#f5f5f7] bg-[#232323]"
                            : "text-gray-400"
                        }
                        whitespace-nowrap
                      `}
                      style={{ zIndex: 20 }}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.aside>
      </div>
      {/* Mobile dock */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-md">
        <motion.nav
          className="flex flex-row items-center justify-between bg-[#101014]/90 rounded-2xl py-2 px-4 shadow-lg border border-[#232323] backdrop-blur"
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
                 {React.cloneElement(link.icon, {
                   className: `text-xl transition-colors ${
                     isActive ? "text-[#f5f5f7]" : "text-gray-400"
                   } group-hover:text-[#f5f5f7]`,
                 })}
                 <span className="text-[10px] mt-1 text-gray-400">
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
