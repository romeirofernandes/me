import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";

export default function ProfileCard() {
  return (
    <div
      className="w-full max-w-full md:max-w-2xl mx-auto rounded-xl p-4 sm:p-6 md:p-7 mb-8 flex flex-col gap-3 md:gap-4 border border-white/10 relative text-left bg-black/15 backdrop-blur-xl shadow-xl"
    >
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex flex-col gap-1 md:gap-2 relative">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Romeiro Fernandes
          </div>
          <div id="about" className="text-xs md:text-sm text-[var(--glass-text-muted)]">
            20, Computer Engineer
          </div>
          {/* Socials: always top-right */}
          <div className="flex gap-3 md:gap-6 absolute right-0 top-0">
            <a
              href="https://github.com/romeirofernandes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="text-lg sm:text-xl md:text-2xl text-[var(--glass-text-muted)] hover:text-white transition" />
            </a>
            <a
              href="https://x.com/whotookromeiro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <FaTwitter className="text-lg sm:text-xl md:text-2xl text-[var(--glass-text-muted)] hover:text-white transition" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[var(--glass-text-muted)]">
            <FaMapMarkerAlt /> Bombay, India
          </div>
          <a
            href="mailto:theromeirofernandes@gmail.com"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[var(--glass-text-muted)] hover:text-white transition"
          >
            <FaEnvelope /> theromeirofernandes@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/romeirofernandes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[var(--glass-text-muted)] hover:text-white transition"
          >
            <FaLinkedin />
            romeirofernandes
          </a>
          <a
            href="https://blog.romeiro.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[var(--glass-text-muted)] hover:text-[#38bdf8] transition"
          >
            <FaGlobe />
            blog.romeiro.dev
          </a>
        </div>
      </div>
      <div className="mt-2 md:mt-4 text-xs md:text-sm text-white">
        Persistent. Adaptive. Funny.
      </div>
    </div>
  );
}
