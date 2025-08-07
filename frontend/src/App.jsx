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
          <SectionDivider className="mb-11"/>

          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0">
            <ProfileCard />
          </div>
          
          
          <SectionDivider className="my-2"/>
          <SectionDivider className="mt-2"/>


          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 md:px-0">
            <section
              className="mt-4 md:mt-12 mb-10 md:mb-20 w-full"
            >
              <p
                className="text-gray-300 font-extralight text-sm md:text-md leading-relaxed text-left"
                style={{ fontWeight: 200 }}
              >
                I'm a full-stack developer with MERN as my go to stack and a
                deep interest in AI/ML. Currently pursuing Computer Engineering at
                Fr. CRCE, Bandra.
              </p>
              <p
                className="text-gray-300 mt-6 md:mt-10 font-extralight leading-relaxed text-left text-sm md:text-md"
                style={{ fontWeight: 200 }}
              >
                I love exploring new technologies and turning ideas into reality.
            Always striving to learn, grow, and collaborate with others.
              </p>
            </section>
          </div>

          <SectionDivider className="mt-[-2rem] mb-14"/>

          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 sm:px-4">
            <section id="github" className="mb-10 md:mb-20">
              <GithubGraph username="romeirofernandes" />
            </section>
          </div>

          <SectionDivider className="mt-[-1.5rem]"/>
          <SectionDivider className="mt-2"/>


          <TechMarquee />

          <SectionDivider className="mt-[-0.75rem]"/>

          <Projects />

          <SectionDivider className="mt-[-3.5rem] mb-12" />

          <Achievements />

          <SectionDivider className="mt-3" />

          <div className="w-full max-w-[98vw] md:max-w-2xl px-2">
            <ContactSection />
          </div>

          <SectionDivider className="mt-8"/>

          <div className="w-full max-w-[98vw] md:max-w-2xl px-2 ">
            <QuoteBox>
              "The master has failed more times than the beginner has ever tried."
            </QuoteBox>
          </div>

          <SectionDivider className="mt-8"/>

          <Footer />
        </main>
      </div>
    </DiagonalBackground>
  );
}
