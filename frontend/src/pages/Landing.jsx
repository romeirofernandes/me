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
import GridLines from "../components/GridLines";
import SectionDivider from "../components/SectionDivider";
import Clock from "../components/Clock";
import AnimatedLogo from "../components/AnimatedLogo";
import ClashRoyaleStatus from "../components/ClashRoyaleStatus";

const PLAYER_TAG = "RJPRJ8LR0";

async function fetchClashRoyaleBattlelog(tag) {
  const response = await fetch(`https://y.theromeirofernandes.workers.dev/api/clash-royale/battlelog/${tag}`);
  if (!response.ok) return [];
  return await response.json();
}

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

  const [battlelog, setBattlelog] = useState([]);
  const [githubData, setGithubData] = useState(null);

  // Poll Clash Royale API every 10 seconds
  React.useEffect(() => {
    let interval;
    const fetchAndSetBattlelog = () => {
      fetchClashRoyaleBattlelog(PLAYER_TAG).then(setBattlelog);
    };
    fetchAndSetBattlelog(); // initial fetch
    interval = setInterval(fetchAndSetBattlelog, 20000);
    return () => clearInterval(interval);
  }, []);

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
          <GridLines />
          <div className="flex flex-col md:flex-row min-h-screen bg-[#080808]/95 text-[#f5f5f7] overflow-x-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col items-center justify-center px-0 py-2 md:py-4 mt-0 md:mt-0 w-full">
              <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 flex justify-end mb-4">
                <Clock />
              </div>
              <SectionDivider className="mb-11" />

              <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0">
                <ProfileCard />
              </div>

              <SectionDivider className="my-2" />
              <SectionDivider className="mt-2" />

              <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0">
                <section className="mt-4 md:mt-12 mb-10 md:mb-20 w-full">
                  <p
                    className="text-gray-300 font-extralight text-sm md:text-md leading-relaxed text-left"
                    style={{ fontWeight: 200 }}
                  >
                    I'm a full-stack developer with MERN as my go to stack and a
                    deep interest in AI/ML. Currently pursuing Computer Engineering
                    at Fr. CRCE, Bandra.
                  </p>
                  <p
                    className="text-gray-300 mt-6 md:mt-10 font-extralight leading-relaxed text-left text-sm md:text-md"
                    style={{ fontWeight: 200 }}
                  >
                    I love exploring new technologies and turning ideas into
                    reality. Always striving to learn, grow, and collaborate with
                    others.
                  </p>
                </section>
              </div>

              <SectionDivider className="mt-[-2rem] mb-14" />

              <div className="w-full max-w-[98vw] md:max-w-2xl px-2 sm:px-4">
                <section id="github" className="mb-10 md:mb-20">
                  <GithubGraph username="romeirofernandes" data={githubData} />
                </section>
              </div>

              <SectionDivider className="mt-[-1.5rem]" />
              <SectionDivider className="mt-2" />

              <TechMarquee />

              <SectionDivider className="mt-[-0.75rem]" />

              <Projects />

              <SectionDivider className="mt-[-3.5rem] mb-12" />

              <Achievements />

              <SectionDivider className="mt-3" />

              <div className="w-full max-w-[98vw] md:max-w-2xl px-2">
                <ContactSection />
              </div>

              <SectionDivider className="mt-8" />

              <div className="w-full max-w-[98vw] md:max-w-2xl px-2 ">
                <QuoteBox>
<<<<<<< HEAD
                  "Momentum is everything."
=======
                  "Do it for the love of the game."
>>>>>>> 4198e91029f4d97bcabbfe41b749ac3a7acd4361
                </QuoteBox>
              </div>

              <SectionDivider className="mt-8" />

              <ClashRoyaleStatus battlelog={battlelog} />

              <SectionDivider className="mt-8" />

              <Footer />
            </main>
          </div>
        </DiagonalBackground>
      )}
    </>
  );
}
