import React from "react";

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
    <section id="achievements" className="mb-12 w-full max-w-xl">
      <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
      <div className="space-y-0 relative">
        {hackathons.map((hack, idx) => (
          <div key={hack.id} className="relative flex">
            <div
              className={`bg-[#16181c] border border-[#232323] rounded-xl p-6 shadow-lg w-full mb-8 z-10`}
            >
              <div className="flex items-center mb-3">
                <img
                  src="/profile.jpg"
                  alt="Romeiro Fernandes"
                  className="w-12 h-12 rounded-full border border-gray-700 mr-3"
                />
                <div>
                  <span className="font-bold text-white">
                    Romeiro Fernandes
                  </span>
                  <span className="ml-2 text-gray-400">
                    @theromeirofern · {hack.year}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <span className="whitespace-pre-line text-gray-100">
                  {hack.text}
                </span>
              </div>
              <img
                src={hack.image}
                alt={hack.name}
                className="w-full rounded-lg border border-gray-700 mb-3 max-h-64 object-cover"
              />
              {/* All action buttons removed as requested */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
