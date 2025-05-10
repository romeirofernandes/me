import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaTrophy,
  FaFolderOpen,
} from "react-icons/fa";

const navLinks = [
  { href: "#home", label: "Home", icon: <FaHome /> },
  { href: "#about", label: "About", icon: <FaUser /> },
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

  if (docHeight - scrollBottom < 2) return "#contact";

  const offsets = navLinks.map((link) => {
    const el = document.querySelector(link.href);
    return el ? Math.abs(el.getBoundingClientRect().top) : Infinity;
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
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
                <span
                  className={`text-xl transition-colors ${
                    isActive ? "text-[#f5f5f7]" : "text-gray-400"
                  } group-hover:text-[#f5f5f7]`}
                >
                  {link.icon}
                </span>
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
  );
}
