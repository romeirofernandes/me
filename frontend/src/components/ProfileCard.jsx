import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
} from "react-icons/fa";

export default function ProfileCard() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-[#18181b] rounded-xl shadow-lg p-7 mb-10 flex flex-col gap-4 border border-[#232323] relative">
      {/* Socials top right */}
      <div className="absolute right-6 flex gap-6">
        <a
          href="https://github.com/romeirofernandes"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="text-2xl text-gray-400 hover:text-[#f5f5f7] transition" />
        </a>
        <a
          href="https://x.com/theromeirofern"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
        >
          <FaTwitter className="text-2xl text-gray-400 hover:text-[#f5f5f7] transition" />
        </a>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold text-[#f5f5f7]">Romeiro Fernandes</div>
          <div className="text-sm text-gray-400">Computer Engineer</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaMapMarkerAlt /> Bombay, India
          </div>
          <a
            href="mailto:theromeirofernandes@gmail.com"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#f5f5f7] transition"
          >
            <FaEnvelope /> theromeirofernandes@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/romeirofernandes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#f5f5f7] transition"
          >
            <FaLinkedin />
            romeirofernandes
          </a>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-300">
        Persistent. Adaptive. Funny.
      </div>
    </div>
  );
}