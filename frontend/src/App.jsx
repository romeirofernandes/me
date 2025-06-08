import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import GithubGraph from "./components/GithubGraph";
import ProfileCard from "./components/ProfileCard";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import QuoteBox from "./components/QuoteBox";
import Underline from "./components/Underline";
import ContactSection from "./components/ContactSection";
import TechMarquee from "./components/TechMarquee";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#080808] text-[#f5f5f7] overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col items-start md:items-center justify-center px-2 sm:px-4 md:px-8 py-6 md:py-12 max-w-[98vw] md:max-w-5xl mx-auto mt-4 md:mt-10">
        <ProfileCard />

        <section
          id="about"
          className="mt-4 md:mt-12 mb-10 md:mb-20 w-full max-w-[98vw] md:max-w-2xl"
        >
          <p
            className="text-gray-300 font-extralight text-sm md:text-md leading-relaxed text-left"
            style={{ fontWeight: 200 }}
          >
            I'm a full-stack developer with a focus on the{" "}
            <Underline>MERN stack</Underline> and a deep interest in AI/ML.
            Currently pursuing Computer Engineering at Fr. CRCE, Bandra.
          </p>
          <p
            className="text-gray-300 mt-6 md:mt-10 font-extralight leading-relaxed text-left text-sm md:text-md"
            style={{ fontWeight: 200 }}
          >
            I love exploring new technologies and turning ideas into reality.
            Always striving to learn, grow, and{" "}
            <Underline>collaborate with others</Underline>.
          </p>
        </section>

        <section
          id="github"
          className="mb-10 md:mb-20 max-w-[98vw] md:w-2xl"
        >
          <GithubGraph username="romeirofernandes" />
        </section>

        <TechMarquee />

        <Projects />
        <Achievements />
        <ContactSection />
        <QuoteBox>
          "The master has failed more times than the beginner has ever tried."
        </QuoteBox>
        <Footer />
      </main>
    </div>
  );
}
