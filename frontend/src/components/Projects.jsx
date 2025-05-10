import React from "react";
import { PinContainer } from "./PinCard";
import { motion } from "framer-motion";
import Underline from "./Underline";

const projects = [
  {
    name: "Habitz",
    description: "Ultimate Digital Habit Builder",
    tech: [
      "React",
      "MongoDB",
      "Express",
      "Node.js",
      "TailwindCSS",
      "Framer Motion",
    ],
    image: "/habitz.png",
    href: "https://github.com/Hike-12/HackHazard",
    preview: "https://habitz-three.vercel.app",
  },
  {
    name: "ClarityAI",
    description: "AI Powered Learning Companion",
    tech: [
      "React",
      "MongoDB",
      "Express",
      "Node.js",
      "TailwindCSS",
      "Framer Motion",
    ],
    image: "/clarityai.png",
    href: "https://github.com/romeirofernandes/ClarityAI",
    preview: "https://clarity-ai-virid.vercel.app",
  },
  {
    name: "InfluenceIQ",
    description: "AI Powered Influencer Analytics",
    tech: ["React", "MongoDB", "Express", "Node.js", "TailwindCSS", "Python"],
    image: "/influenceiq.png",
    href: "https://github.com/Hike-12/Auraflix",
    preview: "https://influenceiq-nine.vercel.app",
  },
  {
    name: "QuickChat",
    description: "Real-time chat rooms",
    tech: [
      "React",
      "MongoDB",
      "Express",
      "Node.js",
      "TailwindCSS",
      "Socket.io",
    ],
    image: "/quickchat.png",
    href: "https://github.com/romeirofernandes/QuickChat",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full max-w-2xl mx-auto mb-20 px-4 py-12"
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-left text-white tracking-tight"
        whileHover={{ scale: 1.03 }}
      >
        <Underline classname="pb-2">Projects I have worked on</Underline>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <PinContainer key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
