import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DissolveOverlay from "./DissolveOverlay";

export default function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const nextRef = useRef(false);
  const transitioningRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    if (transitioningRef.current) return;
    const next = !document.documentElement.classList.contains("light");
    nextRef.current = next;

    setIsDark(next);
    transitioningRef.current = true;

    setOverlay({
      imageFrom: next ? "/dark-bg.jpg" : "/light-bg.jpg",
      imageTo: next ? "/light-bg.jpg" : "/dark-bg.jpg",
    });
  };

  const handleComplete = () => {
    const next = nextRef.current;
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
    transitioningRef.current = false;
    setOverlay(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={`rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300 active:scale-95 size-10 flex items-center justify-center ${className}`}
      >
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.g
            animate={{ rotate: isDark ? -180 : 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            <path
              d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
              fill="white"
            />
            <path
              d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
              fill="black"
            />
          </motion.g>
          <motion.path
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
            fill="white"
          />
        </svg>
      </button>
      {overlay && (
        <DissolveOverlay
          imageFrom={overlay.imageFrom}
          imageTo={overlay.imageTo}
          center={overlay.center}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}
