import React from "react";
import { motion } from "framer-motion";
import Underline from "./Underline";

const hackathons = [
  {
    id: 1,
    name: "Auraflix Hackathon",
    place: "Winner",
    year: "Mar 23",
    image: "/auraflix.png",
    text: `1st Place at Auraflix Hackathon 🏆

Built InfluenceIQ: A data-driven platform for authentic influencer marketing, with a Credibility Score, LLM-based matching, and ML-powered trend prediction.

Teammates: Aliqyaan, Liza, Gavin

Hosted by: Auraverse (3-day online)`,
  },
  {
    id: 2,
    name: "Coherence Hackathon",
    place: "2nd Place",
    year: "Mar 29",
    image: "/coherence.jpg",
    text: `2nd Place at Coherence Hackathon (AIML Track) 🥈

Built ScreenSmart: An AI hiring assistant for resume screening, bias-free ranking, and predictive analytics.

Teammates: Liza, Russel, Gavin

Hosted by: VCET (24-hour offline)`,
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="mb-10 w-full max-w-xs sm:max-w-sm md:max-w-2xl mx-auto"
    >
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-left text-white tracking-tight"
        whileHover={{ scale: 1.03 }}
      >
        <Underline classname="pb-2">Some Achievements</Underline>
      </motion.h2>
      <div className="space-y-0 relative">
        {hackathons.map((hack, idx) => (
          <div key={hack.id} className="relative flex">
            <div className="bg-[#16181c] border border-[#232323] rounded-xl p-3 sm:p-4 md:p-6 shadow-lg w-full max-w-full mb-8 z-10 text-left">
              <div className="flex items-center mb-3">
                <img
                  src="/profile.jpg"
                  alt="Romeiro Fernandes"
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-gray-700 mr-3"
                />
                <div>
                  <span className="font-bold text-white text-sm sm:text-base md:text-lg">
                    Romeiro Fernandes
                  </span>
                  <span className="ml-2 text-gray-400 text-xs sm:text-sm md:text-base">
                    @theromeirofern · {hack.year}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <span className="whitespace-pre-line text-gray-100 text-xs sm:text-sm md:text-base">
                  {hack.text}
                </span>
              </div>
              <img
                src={hack.image}
                alt={hack.name}
                className="w-full rounded-lg border border-gray-700 mb-3 max-h-28 sm:max-h-40 md:max-h-64 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
