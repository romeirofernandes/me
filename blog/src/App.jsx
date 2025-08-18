import React, { useState, useEffect, useRef } from "react";
import Background from "./components/Background";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

// Utility for debouncing
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// Calculate age in years (with decimals)
function useLiveAge(birthDate) {
  const [age, setAge] = useState("");
  useEffect(() => {
    const updateAge = () => {
      const now = new Date();
      const diff = now - birthDate;
      const years = diff / (365.25 * 24 * 60 * 60 * 1000);
      setAge(years.toFixed(8));
    };
    updateAge();
    const interval = setInterval(updateAge, 100);
    return () => clearInterval(interval);
  }, [birthDate]);
  return age;
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
  const age = useLiveAge(birthDate.current);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      blog.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <Background>
      <div className="mx-auto w-full max-w-3xl px-2 sm:px-4 py-8 font-sans">
        {/* Top columns */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          {/* Fun Facts */}
          <div>
            <h2 className="font-serif text-lg font-bold mb-3 text-white">
              Fun Facts
            </h2>
            <ul className="text-sm text-zinc-400 space-y-2">
              <li>
                - I am <span className="font-mono text-[#38bdf8]">{age}</span>{" "}
                years old
              </li>
              {funFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          {/* Resources */}
          <div className="text-right">
            <h2 className="font-serif text-lg font-bold mb-3 text-white">
              Links
            </h2>
            <ul className="text-sm text-zinc-400 space-y-2">
              {resources.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#38bdf8] transition"
                  >
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
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
        {/* Blog List */}
        <div className="flex flex-col gap-0">
          {filteredBlogs.length === 0 && (
            <div className="text-zinc-500 text-center py-8">
              No results found.
            </div>
          )}
          {filteredBlogs.map((blog, idx) => (
            <React.Fragment key={blog.title}>
              <div className="px-1 py-4 mb-0 flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="font-serif text-lg font-bold text-white">
                    {blog.title}
                  </h3>
                  <div className="flex gap-4 text-xs text-zinc-500 font-mono">
                    <span>{blog.views} views</span>
                    <span>{blog.read}-min read</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">{blog.description}</p>
              </div>
              {/* Horizontal line except after last blog */}
              {idx < filteredBlogs.length - 1 && (
                <hr className="border-t border-[#232323] my-6" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Background>
  );
}
