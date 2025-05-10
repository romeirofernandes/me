import React from "react";

export default function QuoteBox({ children }) {
  // Accent color for the points
  const accent = "#38bdf8"; // Tailwind sky-400

  return (
    <div className="flex flex-col items-center justify-center border-1 border-dashed border-[#3c3b3b] rounded-xl p-10 mt-12 mb-4">
      <div className="relative w-full max-w-2xl mx-auto ">
        {/* Sketch border */}
        <div>
          <blockquote className="italic text-lg text-center text-gray-200">
            {children}
          </blockquote>
        </div>
      </div>
    </div>
  );
}
