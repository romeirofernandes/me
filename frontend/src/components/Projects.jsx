import { useState, useRef, useCallback } from "react";
import { PinContainer } from "./PinCard";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

const projects = [
  { name: "Unified", description: "One-stop platform for setting up feedback forms in your projects.", tech: ["React", "Express", "MongoDB", "Node.js", "TailwindCSS", "Framer Motion"], image: "/unified.png", href: "https://github.com/romeirofernandes/unified", preview: "https://unified-chi.vercel.app" },
  { name: "Habitz", description: "Ultimate Digital Habit Builder", tech: ["React", "MongoDB", "Express", "Node.js", "TailwindCSS", "Framer Motion"], image: "/habitz.png", href: "https://github.com/romeirofernandes/Habitz", preview: "https://habitz-three.vercel.app" },
  { name: "Explain", description: "scribbl.io but with text instead of drawing.", tech: ["Next.js", "Firebase", "TailwindCSS", "Framer Motion"], image: "/explain.png", href: "https://github.com/romeirofernandes/explain", preview: "https://explain-ruby.vercel.app" },
  { name: "CodeStorm", description: "For my college council, crazy things coming...", tech: ["React", "Firebase", "TailwindCSS", "Framer Motion"], image: "/codestorm.png", href: "", preview: "https://codestorm-crce.vercel.app" },
  { name: "Typiks", description: "Matiks but with text. Play with a friend.", tech: ["React", "TailwindCSS", "Hono.js"], image: "/typiks.png", href: "https://github.com/romeirofernandes/typiks", preview: "https://typiks.vercel.app" },
  { name: "Infinite Sticker Grid", description: "An infinite grid of stickers, click to copy.", tech: ["React", "TailwindCSS"], image: "/infinite-grid.png", href: "https://github.com/romeirofernandes/infinite-grid", preview: "https://infinite-grid-cyan.vercel.app" },
  { name: "LogIt", description: "Simpler habit tracker compared to Habitz.", tech: ["React", "Firebase", "TailwindCSS", "Framer Motion"], image: "/log-it.png", href: "https://github.com/romeirofernandes/LogIt", preview: "https://log-it-ecru.vercel.app" },
  { name: "ClarityAI", description: "AI Powered Learning platform.", tech: ["React", "MongoDB", "Express", "Node.js", "TailwindCSS", "Framer Motion"], image: "/clarityai.png", href: "https://github.com/romeirofernandes/ClarityAI", preview: "https://clarity-ai-virid.vercel.app" },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  const handleToggle = useCallback(() => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAll((prev) => !prev);
  }, [showAll]);

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 w-full max-w-full sm:max-w-sm md:max-w-2xl mx-auto px-0 justify-items-center scroll-mt-14 md:scroll-mt-[4.5rem]">
      <div className="w-full flex justify-start">
        <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-left text-[var(--heading-text)] tracking-tight">Projects I have worked on</motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <AnimatePresence initial={false}>
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: showAll ? 40 : -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: showAll ? -40 : 40 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, delay: idx * 0.04 }}
              layout
            >
              <PinContainer {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {projects.length > 4 && (
        <div className="flex justify-center mt-10">
          <button
            className="group px-7 py-2.5 rounded-xl text-white/90 text-[15px] font-medium tracking-wide border-[var(--btn-border)] bg-[var(--btn-bg)] backdrop-blur-lg shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:border-white/20 hover:bg-[var(--glass-bg-20)] hover:text-white transition-all duration-200 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-white/20 flex items-center gap-2.5"
            aria-expanded={showAll}
            onClick={handleToggle}
          >
            {showAll ? "Show Less" : "Show More"}
            <span className={`transition-transform duration-300 ${showAll ? "-rotate-180" : ""}`}>
              <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
