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

export default function ResourcesPage() {
  const birthDate = useRef(new Date("2005-10-11T02:37:00Z"));

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-2 sm:px-4 py-8 font-sans flex flex-col min-h-screen">
        {/* Top columns */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          <FunFacts birthDate={birthDate.current} facts={funFacts} />
          <div className="hidden sm:block">
            <Resources resources={resources} highlight="Resources" />
          </div>
        </div>
        {/* Separator */}
        <hr className="border-t border-[#232323] my-6" />
        {/* Coming soon message */}
        <div className="text-center text-zinc-400 text-lg mt-8">
          resources coming soon :)
        </div>
      </div>
    </Background>
  );
}
