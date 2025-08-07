import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import GithubGraph from "./components/GithubGraph";
import ProfileCard from "./components/ProfileCard";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import QuoteBox from "./components/QuoteBox";
import ContactSection from "./components/ContactSection";
import TechMarquee from "./components/TechMarquee";
import Footer from "./components/Footer";
import DiagonalBackground from "./components/DiagonalBackground";
import GridLines from "./components/GridLines";
import SectionDivider from "./components/SectionDivider";

export default function App() {
  return (
    <DiagonalBackground className="min-h-screen">
      <GridLines />
      <div className="flex flex-col md:flex-row min-h-screen bg-[#080808]/95 text-[#f5f5f7] overflow-x-hidden">
        <Sidebar />
        {/* Remove max-w constraint from main container */}
        <main className="flex-1 flex flex-col items-center justify-center px-0 py-6 md:py-12 mt-4 md:mt-10 w-full">
          {/* Content wrapper for sections that need max-width */}
          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0">
            <ProfileCard />
          </div>

          <SectionDivider />
          <SectionDivider />
          <SectionDivider />


          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0">
            <section
              id="about"
              className="mt-4 md:mt-12 mb-10 md:mb-20 w-full"
            >
              <p
                className="text-gray-300 font-extralight text-sm md:text-md leading-relaxed text-left"
                style={{ fontWeight: 200 }}
              >
                I'm a full-stack developer with a focus on the MERN stack and a
                deep interest in AI/ML. Currently pursuing Computer Engineering at
                Fr. CRCE, Bandra.
              </p>
              <p
                className="text-gray-300 mt-6 md:mt-10 font-extralight leading-relaxed text-left text-sm md:text-md"
                style={{ fontWeight: 200 }}
              >
                From hackathon projects to experimental web apps, I enjoy turning
                ideas into reality. My approach combines clean code principles
                with a keen eye for user experience, whether I'm building
                AI-powered features or crafting responsive interfaces.
              </p>
            </section>
          </div>

          <SectionDivider />

          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 sm:px-4 md:px-8">
            <section id="github" className="mb-10 md:mb-20">
              <GithubGraph username="romeirofernandes" />
            </section>
          </div>

          <SectionDivider />

          <TechMarquee />

          <SectionDivider />

          <Projects />

          <SectionDivider />

          <Achievements />

          <SectionDivider />

          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 sm:px-4 md:px-8">
            <ContactSection />
          </div>

          <SectionDivider />

          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 sm:px-4 md:px-8">
            <QuoteBox>
              "The master has failed more times than the beginner has ever tried."
            </QuoteBox>
          </div>

          <SectionDivider />

          <Footer />
        </main>
      </div>
    </DiagonalBackground>
  );
}
