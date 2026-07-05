import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import GithubGraph from "../components/GithubGraph";
import ProfileCard from "../components/ProfileCard";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import QuoteBox from "../components/QuoteBox";
import ContactSection from "../components/ContactSection";
import TechMarquee from "../components/TechMarquee";
import Footer from "../components/Footer";
import DiagonalBackground from "../components/DiagonalBackground";

import Clock from "../components/Clock";
import ThemeToggle from "../components/ThemeToggle";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import AnimatedLogo from "../components/AnimatedLogo";
// import ClashRoyaleStatus from "../components/ClashRoyaleStatus";
import WorkExperience from "../components/WorkExperience";

// const PLAYER_TAG = "RJPRJ8LR0";

// async function fetchClashRoyaleBattlelog(tag) {
//   const response = await fetch(`https://y.theromeirofernandes.workers.dev/api/clash-royale/battlelog/${tag}`);
//   if (!response.ok) return [];
//   return await response.json();
// }

async function fetchGitHubContributions(username) {
  const url = new URL(
    `/v4/${username}`,
    "https://github-contributions-api.jogruber.de"
  );
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = await response.json();
  const total = data.total[new Date().getFullYear()];
  return { contributions: data.contributions, total };
}

export default function Landing() {
  const [showLogo, setShowLogo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // const [battlelog, setBattlelog] = useState([]);
  const [githubData, setGithubData] = useState(null);

  // // Poll Clash Royale API every 10 seconds
  // React.useEffect(() => {
  //   let interval;
  //   const fetchAndSetBattlelog = () => {
  //     fetchClashRoyaleBattlelog(PLAYER_TAG).then(setBattlelog);
  //   };
  //   fetchAndSetBattlelog(); // initial fetch
  //   interval = setInterval(fetchAndSetBattlelog, 20000);
  //   return () => clearInterval(interval);
  // }, []);

  // GitHub API only once
  React.useEffect(() => {
    fetchGitHubContributions("romeirofernandes").then(setGithubData);
  }, []);

  React.useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000); 
    const timer2 = setTimeout(() => setShowLogo(false), 2800); 
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLogo && (
          <AnimatedLogo fadeOut={fadeOut} />
        )}
      </AnimatePresence>
      {!showLogo && (
        <DiagonalBackground className="min-h-screen">

          <div className="flex flex-col md:flex-row min-h-screen text-[#f5f5f7] overflow-x-hidden">
            <Sidebar />
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-0 pt-20 md:pt-20 pb-2 md:pb-4 mt-0 md:mt-0 w-full">
              <div className="fixed top-0 left-0 right-0 z-10 flex justify-center">
                <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 flex justify-between items-center gap-3 pt-2">
                <Avatar>
                  <AvatarImage src="https://github.com/romeirofernandes.png" alt="Romeiro Fernandes" />
                  <AvatarFallback>RF</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <Clock />
                </div>
              </div>
              </div>
              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0">
                <ProfileCard />
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0">
                <section className="relative z-10 isolate mt-4 md:mt-12 mb-10 md:mb-20 w-full rounded-xl p-4 sm:p-6 md:p-7 border border-white/10 bg-black/15 backdrop-blur-xl shadow-xl">
                  <p
                    className="text-white font-extralight text-sm md:text-md leading-relaxed text-left"
                    style={{ fontWeight: 200 }}
                  >
                    I'm a full-stack developer with MERN as my go to stack and a
                    deep interest in AI/ML. Currently pursuing Computer Engineering
                    at Fr. CRCE, Bandra.
                  </p>
                  <p
                    className="text-white mt-6 md:mt-10 font-extralight leading-relaxed text-left text-sm md:text-md"
                    style={{ fontWeight: 200 }}
                  >
                    I love exploring new technologies and turning ideas into
                    reality. Always striving to learn, grow, and collaborate with
                    others.
                  </p>
                </section>
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 sm:px-4">
                <section id="github" className="relative z-10 mb-10 md:mb-20">
                  <GithubGraph username="romeirofernandes" data={githubData} />
                </section>
              </div>

              <TechMarquee />

              <WorkExperience />

              <Projects />

              <Achievements />

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2">
                <ContactSection />
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 ">
                <QuoteBox>
                  "If people call you crazy for working hard, you're doing something right."
                </QuoteBox>
              </div>

              <Footer />
            </main>
          </div>
        </DiagonalBackground>
      )}
    </>
  );
}
