import { memo } from "react";

export default memo(function QuoteBox({ children }) {
  return (
    <div className="relative z-10 isolate flex flex-col items-center justify-center border border-white/10 bg-black/15 backdrop-blur-xl rounded-xl p-6 sm:p-10 shadow-xl">
      <div className="relative w-full max-w-2xl mx-auto ">
        {/* Sketch border */}
        <div>
          <blockquote className="italic text-md sm:text-lg text-center text-white/90">
            {children}
          </blockquote>
        </div>
      </div>
    </div>
  );
});
