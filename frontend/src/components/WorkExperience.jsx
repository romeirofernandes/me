import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    id: "qrata",
    company: "Qrata",
    logo: "/qrata-logo.jpg",
    position: "Backend Developer",
    type: "Internship",
    period: "Dec 2025 - Jun 2026",
    location: "Mumbai",
    current: false,
    description: [
      "Built a concurrent candidate ingestion pipeline that reduced manual talent addition time by 95% through automated resume parsing and batched processing.",
      "Integrated Gmail OAuth after independently securing Google's production approval, replacing shared-mailbox communication with recruiter-owned email workflows.",
      "Migrated recruiter-facing AI workflows from GPT-3.5 Turbo to Gemini 2.5 Flash Lite, reducing LLM inference costs by 60-70% while improving response quality.",
      "Introduced Slack-based candidate sharing, enabling real-time collaboration between talent partners and client hiring teams.",
    ],
    skills: ["Node.js", "Express", "MongoDB", "Gemini", "Gmail OAuth", "Slack API", "React"],
    isExpanded: false,
  },
  {
    id: "playtheory",
    company: "PlayTheory Labs",
    logo: "/playtheory-labs.jpg",
    position: "Full Stack Developer",
    type: "Internship",
    period: "Jun 2025 - Oct 2025",
    location: "Remote",
    current: false,
    description: [
      "Developed a serverless architecture to handle 100,000 endpoints in an endpoint monitoring system.",
      "Integrated AWS Lambda with Layers to implement storing of ESBuilds of a Vite project to S3 to display it in an iframe for a V0 alternative.",
      "Built and deployed the backend with API key generation, role-based access control, and enforced rate and key limits for secure and efficient API usage.",
      "Developed core API system with endpoints for single-page, multi-page, and structured data extraction, including logging, key-based authentication, rate limiting, and credit-based usage tracking.",
    ],
    skills: ["React", "Node.js", "AWS Lambda", "S3", "API Design", "Serverless"],
    isExpanded: false,
  },
];

function ChevronDownIcon({ className }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}><path d="M6 9l6 6 6-6"/></svg>;
}

function BriefcaseIcon({ className }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;
}

export default function WorkExperience() {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = useCallback((id) => {
    setExpandedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  }, []);

  return (
    <section id="experience" className="w-full relative z-10 max-w-[98vw] mx-auto px-0">
      <div className="w-full flex justify-start px-4 md:px-0">
        <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-left text-white tracking-tight">Places I've Worked At</motion.h2>
      </div>
      <div className="w-full space-y-8 px-2 md:px-0">
        {experiences.map((exp, idx) => {
          const isExpanded = expandedIds.includes(exp.id);
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-10 isolate rounded-xl border border-white/10 bg-black/15 backdrop-blur-xl shadow-xl overflow-hidden"
            >
              <div className="flex items-start justify-between p-4 sm:p-6 cursor-pointer" onClick={() => toggleExpand(exp.id)}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
                      {exp.logo ? (
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain rounded-md" width={64} height={64} loading="lazy" />
                      ) : (
                        <BriefcaseIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-semibold text-white truncate leading-tight">{exp.company}</h3>
                      </div>
                      <p className="text-sm sm:text-base text-white/80 mt-1 leading-snug">{exp.position}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-xs sm:text-sm text-white/60 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="whitespace-nowrap">{exp.type}</span>
                      <span className="text-white/30">•</span>
                      <span className="whitespace-nowrap">{exp.period}</span>
                      <span className="text-white/30">•</span>
                      <span className="whitespace-nowrap">{exp.location}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex items-center">
                  <motion.button aria-label={isExpanded ? "Collapse" : "Expand"} aria-expanded={isExpanded} className="text-white/60 hover:text-white transition-colors p-2" animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDownIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                      <ul className="mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 mb-4">
                            <span className="mt-2.5 mr-1 flex-shrink-0 w-1 h-1 bg-white/40 rounded-full" />
                            <span className="text-sm text-white/90 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 text-xs font-medium bg-black/20 backdrop-blur-md border border-white/10 text-white/80 rounded-full">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
