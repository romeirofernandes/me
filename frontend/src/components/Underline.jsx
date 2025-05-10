import React from "react";
import { motion } from "framer-motion";

const Underline = ({ children }) => (
  <span className="relative inline-block">
    <span className="relative z-10">{children}</span>
    <motion.svg
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute left-0 bottom-0 w-full h-[0.3em]"
      style={{ pointerEvents: "none" }}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
    >
      {/* Upside-down curved underline */}
      <motion.path
        d="M5,15 Q50,0 95,15"
        stroke="#FF6B6B"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </motion.svg>
  </span>
);

export default Underline;
