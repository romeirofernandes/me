import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const hackathons = [
  {
    id: 6,
    name: "SUNHACKS International 2025",
    place: "Domain Winner",
    year: "Aug 25",
    image: "/team_pony.jpeg",
    text: `Domain Winner at SUNHACKS International 2025 🏆

Built StudyAid, a full-stack AI-powered study platform featuring automated course generation, AI tutoring, PDF parsing with OCR, slide and video creation, and analytics using Node.js, React, MongoDB, and multiple LLM APIs.

Teammates: Aliqyaan, Reniyas, Dylan

SUNHACKS had 550+ teams on campus and was part of the Asia Book of Records.`,
  },
  {
    id: 5,
    name: "Bucketstudy",
    place: "Winner",
    year: "Jul 15",
    image: "/bucketstudy.png",
    text: `1st Place at Bucketstudy 🏆

Built vHack: Full-stack virtual hackathon platform for online competitions, team/project management, real-time judging, and AI analytics.

Teammates: Aliqyaan, Aditya Dabreo

Hosted by: BucketStudy`,
  },
  {
    id: 4,
    name: "HackMern.AI",
    place: "3rd Place",
    year: "Jun 7",
    image: "/hackmern.png",
    text: `3rd Place at HackMern.AI 🥉

Built Trippeer: AI-powered travel planner for destinations & itineraries based on mood, budget, and time. Features reverse planner, AI itineraries, dashboard, and real-time data.

Teammates: Aliqyaan, Russel, Aditya Dabreo

Hosted by: Certifiyo`,
  },
  {
    id: 3,
    name: "HackHazards '25",
    place: "Top 100 / 17k",
    year: "Apr 27",
    image: "/hackhazards.png",
    text: `Top 100 teams at HackHazards '25 ✨

Built Habitz: Gamified, social, AI-powered habit tracker with 3D streaks, habit forest, AI coach, QR progress, analytics, and challenges.

Teammates: Aliqyaan, Liza, Gavin

Hosted by: The Namespace Community`,
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
];

export default function Achievements() {
  const [openImg, setOpenImg] = useState(null);

  return (
    <section
      id="achievements"
      className="mb-10 w-full max-w-xs sm:max-w-sm md:max-w-2xl mx-auto"
    >
      <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-left text-white tracking-tight">
        5x Hackathon Winner.
      </motion.h2>
      <Carousel className="w-full">
        <CarouselContent>
          {hackathons.map((hack) => (
            <CarouselItem key={hack.id}>
              <div className="relative flex flex-col gap-2 overflow-hidden rounded-xl border border-[#232323] bg-[#16181c]/80 p-4 sm:p-6 backdrop-blur-md shadow-lg w-full max-w-[90vw] sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto z-10 text-left">
                <div className="flex items-center mb-3">
                  <img
                    src="/profile.jpg"
                    alt="Romeiro Fernandes"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-700 mr-3"
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
                  className="w-full rounded-lg border border-gray-700 mb-3 max-h-28 sm:max-h-40 md:max-h-64 object-cover cursor-zoom-in"
                  onClick={() => setOpenImg(hack.image)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="default" />
        <CarouselNext variant="default" />
      </Carousel>

      {/* Animated Modal for zoomed image */}
      <AnimatePresence>
        {openImg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setOpenImg(null)}
          >
            <motion.img
              src={openImg}
              alt="Zoomed"
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain cursor-zoom-out"
              style={{ touchAction: "pinch-zoom" }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
