import React from "react";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="mb-12 w-full max-w-xl">
      <motion.h2
        className="text-2xl font-semibold mb-2"
        whileHover={{ scale: 1.03 }}
      >
        Experience
      </motion.h2>
      <ul className="text-gray-300 space-y-2">
        <li>Software Engineer at Company X</li>
        <li>Intern at Company Y</li>
      </ul>
    </section>
  );
}
