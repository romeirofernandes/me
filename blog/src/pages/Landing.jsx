import React, { useState, useRef } from "react";
import Background from "../components/Background";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import FunFacts from "../components/FunFacts";
import Resources from "../components/Resources";
import BlogList from "../components/BlogList";

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
  { name: "Writings", url: "/" },
  { name: "Resources", url: "/resources" },
  { name: "Twitter", url: "https://twitter.com/whotookromeiro" },
  { name: "LinkedIn", url: "https://linkedin.com/in/romeirofernandes" },
];

export default function Landing() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const birthDate = useRef(new Date("2005-10-11T02:37:00Z"));

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-4 py-8 font-sans flex flex-col min-h-screen">
        {/* Top columns */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          <FunFacts birthDate={birthDate.current} facts={funFacts} />
          <div className="hidden sm:block">
            <Resources resources={resources} highlight="Writings" />
          </div>
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
        <BlogList search={debouncedSearch} />
        <div className="mt-8 block sm:hidden">
          <Resources resources={resources} highlight="Writings" />
        </div>
      </div>
    </Background>
  );
}
