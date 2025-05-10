import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import GithubGraph from "./components/GithubGraph";
import ProfileCard from "./components/ProfileCard";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import QuoteBox from "./components/QuoteBox";

const Underline = ({ children }) => (
  <span className="relative inline-block">
    <span className="relative z-10">{children}</span>
    <motion.svg
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute left-0 bottom-0 w-full h-[0.3em]"
      style={{ pointerEvents: "none" }}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
    >
      {/* Upside-down curved underline */}
      <motion.path
        d="M5,15 Q50,0 95,15"
        stroke="#FF6B6B"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </motion.svg>
  </span>
);

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#080808] text-[#f5f5f7]">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto">
        <ProfileCard />

        <section id="about" className="mb-12 w-full max-w-2xl">
          <p
            className="text-gray-300 font-extralight text-md leading-relaxed"
            style={{ fontWeight: 200 }}
          >
            I’m a developer passionate about building{" "}
            <Underline>minimal</Underline>, delightful web experiences. I’m
            currently in Sem 4 at Fr. CRCE, Bandra.
          </p>
          <p
            className="text-gray-300 mt-4 font-extralight leading-relaxed"
            style={{ fontWeight: 200 }}
          >
            I love exploring new technologies and turning ideas into reality.
            Always striving to learn, grow, and{" "}
            <Underline>collaborate with others</Underline>.
          </p>
        </section>
        <Projects />
        <Experience />
        <section id="github" className="mb-12 w-full max-w-2xl">
          <GithubGraph username="romeirofernandes" />
        </section>
        <section id="contact" className="w-full max-w-2xl">
          <motion.h2
            className="text-2xl font-semibold mb-2"
            whileHover={{ scale: 1.03 }}
          >
            Contact
          </motion.h2>
          <form className="flex flex-col gap-3 mt-2">
            <input
              className="bg-[#18181b] rounded px-3 py-2 text-white focus:outline-none"
              type="email"
              placeholder="Your email"
              required
            />
            <textarea
              className="bg-[#18181b] rounded px-3 py-2 text-white focus:outline-none"
              placeholder="Your message"
              rows={4}
              required
            />
            <motion.button
              type="submit"
              className="bg-[#f5f5f7] text-[#080808] rounded px-4 py-2 font-semibold mt-2"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
            >
              Send
            </motion.button>
          </form>
        </section>
        <QuoteBox>
          "The master has failed more times than the beginner has ever tried."
        </QuoteBox>
      </main>
    </div>
  );
}
