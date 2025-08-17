import React, { useState, useRef } from "react";
import { PinContainer } from "./PinCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
  // Dummy projects below
  {
    name: "TaskFlow",
    description: "Collaborative task management app",
    tech: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    image: "/taskflow.png",
    href: "https://github.com/romeirofernandes/TaskFlow",
    preview: "https://taskflow-demo.vercel.app",
  },
  {
    name: "Weatherly",
    description: "Minimal weather dashboard",
    tech: ["React", "Express", "TailwindCSS", "Vite"],
    image: "/weatherly.png",
    href: "https://github.com/romeirofernandes/Weatherly",
    preview: "https://weatherly-demo.vercel.app",
  },
  {
    name: "NoteNest",
    description: "Simple note-taking web app",
    tech: ["React", "Firebase", "TailwindCSS"],
    image: "/notenest.png",
    href: "https://github.com/romeirofernandes/NoteNest",
    preview: "https://notenest-demo.vercel.app",
  },
  {
    name: "PortfolioX",
    description: "Personal portfolio template",
    tech: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
    image: "/portfoliox.png",
    href: "https://github.com/romeirofernandes/PortfolioX",
    preview: "https://portfoliox-demo.vercel.app",
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
