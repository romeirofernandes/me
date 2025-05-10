import React from "react";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section id="projects" className="mb-12 w-full max-w-xl">
      <motion.h2
        className="text-2xl font-semibold mb-2"
        whileHover={{ scale: 1.03 }}
      >
        Projects
      </motion.h2>
      <ul className="text-gray-300 space-y-2">
        <li>Minimal Portfolio Website</li>
        <li>Another Cool Project</li>
      </ul>
    </section>
  );
}
