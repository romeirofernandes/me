import React, { useState, useRef, useEffect } from "react";
import Background from "../components/Background";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import FunFacts from "../components/FunFacts";
import Resources from "../components/Resources";
import BlogList from "../components/BlogList";
import { Balloons } from "../components/Balloons";
import NewsletterSubscribe from "../components/NewsletterSubscribe";
import Border1 from "../components/Border1";

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
  { name: "Resources", url: "/resources" },
  { name: "Hackathons", url: "/hackathons" },
  { name: "Twitter", url: "https://twitter.com/whotookromeiro" },
  { name: "LinkedIn", url: "https://linkedin.com/in/romeirofernandes" },
];

export default function Landing() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const birthDate = useRef(new Date("2005-10-11T02:37:00Z"));
  const balloonsRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const isOctober11 = today.getMonth() === 9 && today.getDate() === 11;
    
    if (isOctober11 && balloonsRef.current) {
      const timer = setTimeout(() => {
        balloonsRef.current.launchAnimation();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-4 py-8 font-sans flex flex-col min-h-screen">
        {/* Balloons component */}
        <Balloons 
          ref={balloonsRef}
          type="default"
          className="fixed inset-0 pointer-events-none z-50"
        />
        
        {/* Top columns - fixed at top */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          <FunFacts birthDate={birthDate.current} facts={funFacts} />
          <div className="hidden sm:block">
            <Resources resources={resources} highlight="Writings" />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-8 border border-[#232323] light:border-zinc-300 px-3 py-2 rounded-none bg-transparent">
          <HugeiconsIcon icon={Search01Icon} className="text-zinc-500 light:text-zinc-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="Search blog posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none text-white light:text-zinc-900 placeholder:text-zinc-500 light:placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:border-transparent shadow-none flex-1 rounded-none"
          />
        </div>
        
        {/* Scrollable middle section */}
        <div className="flex-1 overflow-y-auto">
          <BlogList search={debouncedSearch} />
        </div>

        {/* Newsletter Subscription - fixed at bottom */}
        <div className="dark mt-10">
          <NewsletterSubscribe />
        </div>

        <div className="mt-8 block sm:hidden">
          <Resources resources={resources} highlight="Writings" />
        </div>
      </div>
    </Background>
  );
}
