import React, { useState, useRef } from "react";
import { PinContainer } from "./PinCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const projects = [
  {
    name: "Unified",
    description:
      "One-stop platform for setting up feedback forms in your projects.",
    tech: [
      "React",
      "Express",
      "MongoDB",
      "Node.js",
      "TailwindCSS",
      "Framer Motion",
    ],
    image: "/unified.png",
    href: "https://github.com/romeirofernandes/unified",
    preview: "https://unified-chi.vercel.app",
  },
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
    href: "https://github.com/romeirofernandes/Habitz",
    preview: "https://habitz-three.vercel.app",
  },
  {
    name: "Explain",
    description: "scribbl.io but with text instead of drawing.",
    tech: ["Next.js", "Firebase", "TailwindCSS", "Framer Motion"],
    image: "/explain.png",
    href: "https://github.com/romeirofernandes/explain",
    preview: "https://explain-ruby.vercel.app",
  },
  {
    name: "CodeStorm",
    description: "For my college council, crazy things coming...",
    tech: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    image: "/codestorm.png",
    href: "", // No GitHub button
    preview: "https://codestorm-crce.vercel.app",
  },
  {
    name: "Typiks",
    description: "Matiks but with text. Play with a friend.",
    tech: ["React", "TailwindCSS", "Hono.js"],
    image: "/typiks.png",
    href: "https://github.com/romeirofernandes/typiks",
    preview: "https://typiks.vercel.app",
  },
  {
    name: "Infinite Sticker Grid",
    description: "An infinite grid of stickers, click to copy.",
    tech: ["React", "TailwindCSS"],
    image: "/infinite-grid.png",
    href: "https://github.com/romeirofernandes/infinite-grid",
    preview: "https://infinite-grid-cyan.vercel.app",
  },
  {
    name: "LogIt",
    description: "Simpler habit tracker compared to Habitz.",
    tech: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    image: "/log-it.png",
    href: "https://github.com/romeirofernandes/LogIt",
    preview: "https://log-it-ecru.vercel.app",
  },
  {
    name: "ClarityAI",
    description: "AI Powered Learning platform.",
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
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  const handleToggle = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setShowAll((prev) => !prev);
  };

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mb-16 px-0 py-8 md:py-12"
    >
      <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-left text-white tracking-tight">
        Projects I have worked on
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <AnimatePresence initial={false}>
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: showAll ? 40 : -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: showAll ? -40 : 40 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: showAll ? idx * 0.04 : idx * 0.04,
              }}
              layout
            >
              <PinContainer {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {projects.length > 4 && (
        <div className="flex justify-center mt-8">
          <button
            className="
              px-5 py-2 rounded-lg text-white text-sm font-medium
              border border-[#232323]
              shadow-md
              bg-gradient-to-br from-[#1a1a1d] via-[#18181b] to-[#121216]
              hover:from-[#232323] hover:via-[#222225] hover:to-[#18181b]
              transition
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[#f5f5f7] focus:ring-offset-2
              flex items-center gap-2
            "
            style={{
              background: `linear-gradient(135deg, 
                #1a1a1d 0%, 
                #18181b 15%, 
                #16161a 50%, 
                #141418 85%, 
                #121216 100%
              )`,
              boxShadow: `
                0 2px 6px -1px rgba(0, 0, 0, 0.25),
                0 1px 2px -1px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.07)
              `,
            }}
            onClick={handleToggle}
          >
            {showAll ? (
              <>
                Show Less <FaChevronUp className="text-xs" />
              </>
            ) : (
              <>
                Show More <FaChevronDown className="text-xs" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
