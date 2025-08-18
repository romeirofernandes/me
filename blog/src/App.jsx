import React, { useState, useRef } from "react";
import Background from "./components/Background";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import FunFacts from "./components/FunFacts";
import Resources from "./components/Resources";
import BlogList from "./components/BlogList";

// Utility for debouncing
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const funFacts = [
  "- I play guitar sometimes",
  "- I overthink in FPL",
  "- I love exploring new tech",
];

const resources = [
  { name: "Writings", url: "#" },
  { name: "Resources", url: "#" },
  { name: "Twitter", url: "https://twitter.com/whotookromeiro" },
  { name: "LinkedIn", url: "https://linkedin.com/in/romeirofernandes" },
];

const blogs = [
  {
    title: "How I built my link blog",
    description:
      "A breakdown of my tech stack, design choices, and deployment for this blog.",
    views: 1234,
    read: 4,
  },
  {
    title: "Why I love Hono.js",
    description:
      "Exploring the simplicity and power of Hono.js for modern web APIs.",
    views: 876,
    read: 3,
  },
  {
    title: "FPL: Overthinking and Winning",
    description:
      "How overthinking in Fantasy Premier League sometimes pays off.",
    views: 542,
    read: 2,
  },
  {
    title: "Guitar: My Creative Escape",
    description: "Why picking up the guitar helps me reset and recharge.",
    views: 321,
    read: 2,
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const birthDate = useRef(new Date("2005-10-11T02:37:00Z"));

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-2 sm:px-4 py-8 font-sans">
        {/* Top columns */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          <FunFacts birthDate={birthDate.current} facts={funFacts} />
          <Resources resources={resources} />
        </div>
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-8 border border-[#232323] px-3 py-2 rounded-none bg-transparent">
          <FaSearch className="text-zinc-500 text-base" />
          <Input
            type="search"
            placeholder="Search blog posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none text-white placeholder:text-zinc-500 focus:ring-0 focus:outline-none flex-1 rounded-none"
          />
        </div>
        {/* Blog List */}
        <BlogList blogs={blogs} search={debouncedSearch} />
      </div>
    </Background>
  );
}
