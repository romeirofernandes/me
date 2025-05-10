import React from "react";
import { PinContainer } from "./PinCard";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Minimal Portfolio",
    description: "A minimal, animated portfolio built with React and Tailwind.",
    tech: ["React", "TailwindCSS", "Framer Motion"],
    image: "/images/portfolio.png",
    href: "https://github.com/romeirofernandes/minimal-portfolio",
  },
  {
    name: "Cool UI Kit",
    description: "A crazy UI kit with subtle 3D effects.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    image: "/images/uikit.png",
    href: "https://github.com/romeirofernandes/cool-project",
  },
  {
    name: "Blog Platform",
    description: "A markdown-powered blog with custom themes and animations.",
    tech: ["Next.js", "MDX", "Prisma"],
    image: "/images/blog.png",
    href: "https://github.com/romeirofernandes/blog-platform",
  },
  {
    name: "Realtime Chat",
    description: "A realtime chat app with websockets and beautiful UI.",
    tech: ["React", "Socket.io", "Node.js"],
    image: "/images/chat.png",
    href: "https://github.com/romeirofernandes/realtime-chat",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full max-w-2xl mx-auto mb-20 px-4 py-12">
      <motion.h2
        className="text-3xl font-bold mb-8 text-left text-white tracking-tight"
        whileHover={{ scale: 1.03 }}
      >
        Projects I have worked on
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <PinContainer key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
