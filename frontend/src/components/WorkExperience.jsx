import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaBriefcase } from "react-icons/fa";

const experiences = [
    {
        id: "qrata",
        company: "Qrata",
        logo: "/qrata-logo.jpg",
        position: "Backend Developer",
        type: "Internship",
        period: "Dec 2025 - Present",
        location: "Mumbai",
        current: true,
        description: [
            "Building scalable backend systems for Qrata's platform",
            "Working with Node.js, Express, and MongoDB",
            "Implementing RESTful APIs and microservices architecture",
        ],
        skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
        isExpanded: true,
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
        skills: [
            "React",
            "Node.js",
            "AWS Lambda",
            "S3",
            "API Design",
            "Serverless",
        ],
        isExpanded: false,
    },
];

export default function WorkExperience() {
    const [expandedIds, setExpandedIds] = useState(["qrata"]);

    const toggleExpand = (id) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <section
            id="experience"
            className="w-full max-w-[98vw] md:max-w-2xl mx-auto mb-16 mt-10 px-0 py-8 md:py-12"
        >
            <div className="w-full flex justify-start px-6 md:px-0">
                <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-left text-white tracking-tight">
                    Places I've Worked At
                </motion.h2>
            </div>

            <div className="space-y-8 px-4 md:px-0">
                {experiences.map((exp, idx) => {
                    const isExpanded = expandedIds.includes(exp.id);
                    return (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative rounded-xl border border-[#232323] bg-[#16181c]/80 backdrop-blur-md shadow-lg overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, 
                  #1a1a1d 0%, 
                  #18181b 15%, 
                  #16161a 50%, 
                  #141418 85%, 
                  #121216 100%
                )`,
                                boxShadow: `
                  0 4px 6px -1px rgba(0, 0, 0, 0.3),
                  0 2px 4px -1px rgba(0, 0, 0, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `,
                            }}
                        >
                            {/* Header - Always Visible */}
                            <div
                                className="flex items-start justify-between p-4 sm:p-6 cursor-pointer"
                                onClick={() => toggleExpand(exp.id)}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
                                            {exp.logo ? (
                                                <img
                                                    src={exp.logo}
                                                    alt={exp.company}
                                                    className="w-full h-full object-contain rounded-md"
                                                />
                                            ) : (
                                                <FaBriefcase className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                                            )}
                                        </div>
                                        {/* Company & Position Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-base sm:text-lg font-semibold text-white truncate leading-tight">
                                                    {exp.company}
                                                </h3>
                                                {exp.current && (
                                                    <span className="px-2 py-0.5 mb-0.5 text-xs font-medium bg-green-900/60 border border-green-700 text-green-400 rounded-full">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm sm:text-base text-gray-300 mt-1 leading-snug">
                                                {exp.position}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Metadata: separate row aligned with the image's left edge */}
                                    <div className="mt-4 text-xs sm:text-sm text-gray-400 w-full">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="whitespace-nowrap">{exp.type}</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="whitespace-nowrap">{exp.period}</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="whitespace-nowrap">{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expand/Collapse Button */}
                                <div className="ml-2 flex items-center">
                                    <motion.button
                                        className="text-gray-400 hover:text-white transition-colors p-2"
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <FaChevronDown className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence initial={false}>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                                            {/* Description */}
                                            <ul className="mb-4">
                                                {exp.description.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-2 mb-4"
                                                    >
                                                        <span className="mt-2.5 mr-1 flex-shrink-0 w-1 h-1 bg-gray-400 rounded-full" />
                                                        <span className="text-sm text-gray-200 leading-relaxed">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-2 mt-5">
                                                {exp.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1 text-xs font-medium bg-[#18181b] border border-[#232323] text-gray-300 rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
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