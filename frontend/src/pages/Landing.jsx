import React, { useState, useEffect, useCallback, useRef } from "react";
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
import Signature from "../components/Signature";
// import ClashRoyaleStatus from "../components/ClashRoyaleStatus";
import WorkExperience from "../components/WorkExperience";

import DissolveOverlay from "../components/DissolveOverlay";

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

function getTimePeriod() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 16) return "morning";
  if (hour >= 16 && hour < 19) return "afternoon";
  if (hour >= 19 && hour < 22) return "evening";
  return "night";
}

function detectPeriod() {
  const saved = localStorage.getItem("timePeriod");
  const manual = localStorage.getItem("timePeriodManual") === "true";
  if (manual && saved && ["morning", "afternoon", "evening", "night"].includes(saved)) {
    return saved;
  }
  return getTimePeriod();
}

export default function Landing() {
  const [showLogo, setShowLogo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [period, setPeriod] = useState(detectPeriod);
  const [overlay, setOverlay] = useState(null);
  const overlayRef = useRef(null);
  const nextPeriodRef = useRef(null);
  const periodRef = useRef(period);
  const manualOverrideRef = useRef(localStorage.getItem("timePeriodManual") === "true");

  // Keep ref in sync
  periodRef.current = period;

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

  const applyPeriod = useCallback((next) => {
    const imageMap = {
      morning: "/morning.jpg",
      afternoon: "/afternoon.png",
      evening: "/evening.jpg",
      night: "/night.png",
    };
    const isLight = next === "morning" || next === "afternoon";

    document.documentElement.classList.toggle("light", isLight);
    document.documentElement.style.setProperty(
      "--page-bg-image",
      `url(${imageMap[next]})`
    );
    document.body.style.backgroundImage = `url(${imageMap[next]})`;
    document.body.style.backgroundColor = isLight ? "#f5f5f7" : "#080808";
    document.documentElement.setAttribute("data-period", next);
    localStorage.setItem("timePeriod", next);
    setPeriod(next);
  }, []);

  const imageMap = {
    morning: "/morning.jpg",
    afternoon: "/afternoon.png",
    evening: "/evening.jpg",
    night: "/night.png",
  };

  const triggerOverlay = useCallback((next) => {
    if (overlayRef.current) return;
    nextPeriodRef.current = next;
    const newOverlay = {
      imageFrom: imageMap[periodRef.current],
      imageTo: imageMap[next],
    };
    overlayRef.current = newOverlay;
    setOverlay(newOverlay);
  }, []);

  const handlePeriodChange = useCallback(
    (next) => {
      manualOverrideRef.current = true;
      localStorage.setItem("timePeriodManual", "true");
      triggerOverlay(next);
    },
    [triggerOverlay],
  );

  const handleDissolveComplete = useCallback(() => {
    const next = nextPeriodRef.current;
    if (next) applyPeriod(next);
    overlayRef.current = null;
    setOverlay(null);
  }, [applyPeriod]);

  // Auto-detect period transitions at time boundaries
  useEffect(() => {
    const check = () => {
      if (manualOverrideRef.current) return;
      const next = getTimePeriod();
      if (next !== periodRef.current) {
        triggerOverlay(next);
      }
    };
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [triggerOverlay]);

  // Set initial background on mount
  useEffect(() => {
    applyPeriod(period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLogo && <AnimatedLogo fadeOut={fadeOut} />}
      </AnimatePresence>
      {!showLogo && (
        <DiagonalBackground className="min-h-screen">
          <div className="flex flex-col md:flex-row min-h-screen text-[#f5f5f7] overflow-x-hidden">
            <Sidebar className="animate-in animate-delay-1" />
            <main className="relative z-10 flex-1 flex flex-col items-center px-0 pb-2 md:pb-4 mt-0 md:mt-0 w-full">
              <div className="animate-in animate-delay-1 fixed top-0 left-0 right-0 z-50 flex justify-center">
                <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 flex h-14 md:h-[4.5rem] justify-between items-center gap-1 md:gap-3">
                  <Avatar className="size-8 md:size-10">
                    <AvatarImage
                      src="https://github.com/romeirofernandes.png"
                      alt="Romeiro Fernandes"
                    />
                    <AvatarFallback>RF</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <ThemeToggle
                      period={period}
                      onPeriodChange={handlePeriodChange}
                    />
                    <Clock />
                  </div>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="h-20 md:h-[4.5rem] w-full shrink-0"
              />

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 animate-in animate-delay-2">
                <ProfileCard />
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 animate-in animate-delay-3">
                <section className="relative z-10 isolate mt-4 md:mt-12 mb-10 md:mb-20 w-full rounded-xl p-4 sm:p-6 md:p-7 border border-white/10 bg-black/15 backdrop-blur-xl shadow-xl">
                  <p
                    className="text-white font-extralight text-sm md:text-md leading-relaxed text-left"
                    style={{ fontWeight: 200 }}
                  >
                    I'm a full-stack developer with MERN as my go to stack and a
                    deep interest in AI/ML. Currently pursuing Computer
                    Engineering at Fr. CRCE, Bandra.
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

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 sm:px-4 animate-in animate-delay-4">
                <section id="github" className="mb-10 md:mb-20">
                  <GithubGraph
                    username="romeirofernandes"
                    data={githubData}
                  />
                </section>
              </div>

              <div className="relative z-10 animate-in animate-delay-5"><TechMarquee /></div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl animate-in animate-delay-6"><WorkExperience /></div>

              <div className="relative z-10 animate-in animate-delay-7"><Projects /></div>

              <div className="relative z-10 animate-in animate-delay-8"><Achievements /></div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 animate-in animate-delay-9">
                <ContactSection />
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 animate-in animate-delay-10">
                <QuoteBox>
                  "If people call you crazy for working hard, you're doing
                  something right."
                </QuoteBox>
              </div>

              <div className="relative z-10 mt-8 mb-4 flex w-full max-w-[98vw] justify-center px-2 md:max-w-2xl animate-in animate-delay-11">
                <Signature
                  text="Romeiro Fernandes"
                  fontSize={window.innerWidth < 768 ? 18 : 28}
                  color="rgba(255,255,255,0.92)"
                  duration={1.8}
                />
              </div>

              <div className="relative z-10 animate-in animate-delay-11"><Footer /></div>
            </main>
          </div>
        </DiagonalBackground>
      )}

      {overlay && (
        <DissolveOverlay
          imageFrom={overlay.imageFrom}
          imageTo={overlay.imageTo}
          onComplete={handleDissolveComplete}
        />
      )}
    </>
  );
}
