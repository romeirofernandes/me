import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import GithubGraph from "./components/GithubGraph";
import ProfileCard from "./components/ProfileCard";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import QuoteBox from "./components/QuoteBox";
import Underline from "./components/Underline";
import ContactSection from "./components/ContactSection";
import TechMarquee from "./components/TechMarquee";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#080808] text-[#f5f5f7]">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto mt-10">
        <ProfileCard />

        <section id="about" className="mt-16 mb-32 w-full max-w-2xl">
          <p
            className="text-gray-300 font-extralight text-md leading-relaxed"
            style={{ fontWeight: 200 }}
          >
            I’m a developer passionate about building{" "}
            <Underline>minimal</Underline>, delightful web experiences. I’m
            currently in Sem 4 at Fr. CRCE, Bandra.
          </p>
          <p
            className="text-gray-300 mt-10 font-extralight leading-relaxed"
            style={{ fontWeight: 200 }}
          >
            I love exploring new technologies and turning ideas into reality.
            Always striving to learn, grow, and{" "}
            <Underline>collaborate with others</Underline>.
          </p>
        </section>

        <section id="github" className="mb-32 w-full max-w-2xl">
          <GithubGraph username="romeirofernandes" />
        </section>

        <TechMarquee />

        <Projects />
        <Experience />
        <ContactSection />
        <QuoteBox>
          "The master has failed more times than the beginner has ever tried."
        </QuoteBox>
        <Footer />
      </main>
    </div>
  );
}
