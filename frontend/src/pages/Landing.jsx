import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
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
import WorkExperience from "../components/WorkExperience";
import { fetchGitHubContributions } from "../lib/github";

const DissolveOverlay = React.lazy(() => import("../components/DissolveOverlay"));

const IMAGE_MAP = {
  morning: "/morning.jpg",
  afternoon: "/afternoon.png",
  evening: "/evening.jpg",
  night: "/night.png",
};

function getTimePeriod() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 16) return "morning";
  if (hour >= 16 && hour < 19) return "afternoon";
  if (hour >= 19 && hour < 22) return "evening";
  return "night";
}

function detectPeriod() {
  try {
    const saved = localStorage.getItem("timePeriod");
    const manual = localStorage.getItem("timePeriodManual") === "true";
    if (manual && saved && ["morning", "afternoon", "evening", "night"].includes(saved)) {
      return saved;
    }
  } catch {}
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
  const [manualOverride, setManualOverride] = useState(() => {
    try { return localStorage.getItem("timePeriodManual") === "true"; } catch { return false; }
  });

  periodRef.current = period;

  const [githubData, setGithubData] = useState(null);

  const [signatureSize, setSignatureSize] = useState(() => window.innerWidth < 768 ? 18 : 28);

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

  React.useEffect(() => {
    const onResize = () => setSignatureSize(window.innerWidth < 768 ? 18 : 28);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const applyPeriod = useCallback((next) => {
    const isLight = next === "morning" || next === "afternoon";
    document.documentElement.classList.toggle("light", isLight);
    document.documentElement.style.setProperty("--page-bg-image", `url(${IMAGE_MAP[next]})`);
    document.documentElement.setAttribute("data-period", next);
    try { localStorage.setItem("timePeriod", next); } catch {}
    setPeriod(next);
  }, []);

  const triggerOverlay = useCallback((next) => {
    if (overlayRef.current) return;
    nextPeriodRef.current = next;
    const newOverlay = {
      imageFrom: IMAGE_MAP[periodRef.current],
      imageTo: IMAGE_MAP[next],
    };
    overlayRef.current = newOverlay;
    setOverlay(newOverlay);
  }, []);

  const handlePeriodChange = useCallback(
    (next) => {
      setManualOverride(true);
      try { localStorage.setItem("timePeriodManual", "true"); } catch {}
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

  useEffect(() => {
    const check = () => {
      if (manualOverride) return;
      const next = getTimePeriod();
      if (next !== periodRef.current) {
        triggerOverlay(next);
      }
    };
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [triggerOverlay, manualOverride]);

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
            <Sidebar />
            <main className="relative z-10 flex-1 flex flex-col items-center px-0 pb-2 md:pb-4 mt-0 md:mt-0 w-full">
              <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
                <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 flex h-14 md:h-[4.5rem] justify-between items-center gap-1 md:gap-3">
                  <Avatar className="size-8 md:size-10">
                    <AvatarImage
                      src="https://github.com/romeirofernandes.png"
                      alt="Romeiro Fernandes"
                    />
                    <AvatarFallback>RF</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <ThemeToggle period={period} onPeriodChange={handlePeriodChange} />
                    <Clock />
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="h-20 w-full shrink-0" />

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 mb-10 md:mb-20">
                <ProfileCard />
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 mb-10 md:mb-20">
                <section className="relative z-10 isolate w-full rounded-xl p-4 sm:p-6 md:p-7 border border-white/10 bg-black/15 backdrop-blur-xl shadow-xl">
                  <p className="text-white font-extralight text-sm md:text-md leading-relaxed text-left">
                    I'm a full-stack developer with MERN as my go to stack and a deep interest in AI/ML. Currently pursuing Computer Engineering at Fr. CRCE, Bandra.
                  </p>
                  <p className="text-white mt-6 md:mt-10 font-extralight leading-relaxed text-left text-sm md:text-md">
                    I love exploring new technologies and turning ideas into reality. Always striving to learn, grow, and collaborate with others.
                  </p>
                </section>
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 mb-10 md:mb-20">
                <section id="github">
                  <GithubGraph username="romeirofernandes" data={githubData} />
                </section>
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 mb-10 md:mb-20"><TechMarquee /></div>
              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl mb-10 md:mb-20"><WorkExperience /></div>
              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 mb-10 md:mb-20"><Projects /></div>
              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 mb-10 md:mb-20"><Achievements /></div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 mb-10 md:mb-20">
                <ContactSection />
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 mb-10 md:mb-20">
                <QuoteBox>"If people call you crazy for working hard, you're doing something right."</QuoteBox>
              </div>

              <div className="relative z-10 flex w-full max-w-[98vw] justify-center px-2 md:max-w-2xl mb-10 md:mb-20">
                <Signature text="Romeiro Fernandes" fontSize={signatureSize} color="rgba(255,255,255,0.92)" duration={1.8} />
              </div>

              <div className="relative z-10 w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0 mb-16 md:mb-0"><Footer /></div>
            </main>
          </div>
        </DiagonalBackground>
      )}

      <Suspense fallback={null}>
        {overlay && (
          <DissolveOverlay
            imageFrom={overlay.imageFrom}
            imageTo={overlay.imageTo}
            onComplete={handleDissolveComplete}
          />
        )}
      </Suspense>
    </>
  );
}
