import React, { useRef } from "react";
import Background from "../components/Background";
import FunFacts from "../components/FunFacts";
import Resources from "../components/Resources";

const funFacts = [
  "- I play guitar sometimes",
  "- I overthink in FPL",
  "- I love exploring new tech",
];

const resources = [
  { name: "Writings", url: "/" },
  { name: "Resources", url: "/resources" },
  { name: "Twitter", url: "https://twitter.com/whotookromeiro" },
  { name: "LinkedIn", url: "https://linkedin.com/in/romeirofernandes" },
];

const hackathons = [
  { name: "SIH 2024", result: "Lost", status: "lost" },
  { name: "BNB 24", result: "Lost", status: "lost" },
  { name: "Auraflix", result: "1st Place", status: "first" },
  { name: "Coherence", result: "2nd Place", status: "second" },
  { name: "HackHazards", result: "Top 100", status: "success" },
  { name: "HackOwasp", result: "Lost", status: "lost" },
  { name: "Certifiyo", result: "3rd Place", status: "third" },
  { name: "BharatAI", result: "Lost", status: "lost" },
  { name: "BucketStudy", result: "1st Place", status: "first" },
  { name: "Hack4Health", result: "Honorable Mention", status: "success" },
  { name: "KLEOS 3.0", result: "Lost", status: "lost" },
  { name: "Sunhacks", result: "Domain Winner", status: "first" },
  { name: "SIH 2025", result: "Lost", status: "lost" },
  { name: "BNB 25", result: "Finalists", status: "success" },
  { name: "Google GenAI Exchange", result: "2nd Place", status: "second" },
  { name: "HackCrypt", result: "Lost", status: "lost" },
  { name: "Hackquinox", result: "Lost", status: "lost" },
  { name: "WiCS", result: "Lost", status: "lost" },
  { name: "TechFiesta", result: "Lost", status: "lost" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "first":
      return "text-yellow-400 light:text-yellow-600";
    case "second":
      return "text-gray-300 light:text-gray-600";
    case "third":
      return "text-amber-600 light:text-amber-700";
    case "success":
      return "text-green-400 light:text-green-600";
    case "lost":
      return "text-red-400 light:text-red-600";
    default:
      return "text-zinc-400 light:text-zinc-600";
  }
};

export default function HackathonsPage() {
  const birthDate = useRef(new Date("2005-10-11T02:37:00Z"));

  // Calculate statistics
  const totalHackathons = hackathons.length;
  const wins = hackathons.filter(h => h.status === "first").length;
  const podiumFinishes = hackathons.filter(h => ["first", "second", "third"].includes(h.status)).length;
  const successfulParticipations = hackathons.filter(h => h.status !== "lost").length;
  const winRate = ((successfulParticipations / totalHackathons) * 100).toFixed(1);

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-4 py-8 font-sans flex flex-col min-h-screen">
        {/* Top columns */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          <FunFacts birthDate={birthDate.current} facts={funFacts} />
          <div className="hidden sm:block">
            <Resources resources={resources} highlight="Hackathons" />
          </div>
        </div>
        {/* Separator */}
        <hr className="border-t border-[#232323] light:border-zinc-300 my-6" />
        {/* Hackathon results */}
        <div className="text-[#f5f5f7] light:text-zinc-900 text-md mx-2">
          My hackathon journey - the wins, losses, and everything in between:
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse text-xs sm:text-sm border border-[#232323] light:border-zinc-300">
              <thead>
                <tr className="bg-[#18181b] light:bg-zinc-200">
                  <th className="py-2 px-3 font-bold text-zinc-300 light:text-zinc-700 border border-[#232323] light:border-zinc-300">
                    Hackathon
                  </th>
                  <th className="py-2 px-3 font-bold text-zinc-300 light:text-zinc-700 border border-[#232323] light:border-zinc-300">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {hackathons.map((hackathon, index) => {
                  const isPodium = ["first", "second", "third"].includes(hackathon.status);
                  const podiumBg = isPodium ? "bg-green-400/10 light:bg-green-100/40" : "";

                  return (
                    <tr key={index} className={podiumBg}>
                      <td className="py-2 px-3 text-zinc-400 light:text-zinc-600 border border-[#232323] light:border-zinc-300">
                        {hackathon.name}
                      </td>
                      <td className={`py-2 px-3 border border-[#232323] light:border-zinc-300 font-medium ${getStatusColor(hackathon.status)}`}>
                        {hackathon.result}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12">
          <div className="grid grid-cols-3 gap-4 mx-2">
            <div className="bg-[#18181b] light:bg-zinc-100 border border-[#232323] light:border-zinc-300 rounded-sm p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#f5f5f7] light:text-zinc-900">{totalHackathons}</div>
              <div className="text-xs sm:text-sm text-zinc-400 light:text-zinc-500">Total Hackathons</div>
            </div>
            <div className="bg-[#18181b] light:bg-zinc-100 border border-[#232323] light:border-zinc-300 rounded-sm p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-400 light:text-yellow-600">6</div>
              <div className="text-xs sm:text-sm text-zinc-400 light:text-zinc-500">Wins</div>
            </div>
            <div className="bg-[#18181b] light:bg-zinc-100 border border-[#232323] light:border-zinc-300 rounded-sm p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#38bdf8] light:text-sky-600">{(6 / totalHackathons).toFixed(2)}</div>
              <div className="text-xs sm:text-sm text-zinc-400 light:text-zinc-500">Success Rate</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 block sm:hidden">
          <Resources resources={resources} highlight="Hackathons" />
        </div>
      </div>
    </Background>
  );
}
