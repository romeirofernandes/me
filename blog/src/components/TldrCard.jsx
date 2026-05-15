import React from "react";

export default function TldrCard({ children }) {
  return (
    <div className="relative w-full grid grid-cols-[1fr_1rem_auto_1rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-sky-400)] dark:[--pattern-fg:var(--color-sky-400)]">
      {/* Center content */}
      <div className="col-start-3 row-start-3 flex flex-col relative px-8 pt-8">
        {children}
      </div>

      {/* Left vertical line */}
      <div className="-right-px col-start-2 row-span-full row-start-1 border-x border-[#7dd3fc]/60 light:border-[#7dd3fc] mask-y-from-60% bg-[image:repeating-linear-gradient(315deg,_rgb(125_211_252_/_0.6)_0,_rgb(125_211_252_/_0.6)_1px,_transparent_0,_transparent_50%)] light:bg-[image:repeating-linear-gradient(315deg,_#7dd3fc_0,_#7dd3fc_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />

      {/* Right vertical line */}
      <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-[#7dd3fc]/60 light:border-[#7dd3fc] mask-y-from-60% bg-[image:repeating-linear-gradient(315deg,_rgb(125_211_252_/_0.6)_0,_rgb(125_211_252_/_0.6)_1px,_transparent_0,_transparent_50%)] light:bg-[image:repeating-linear-gradient(315deg,_#7dd3fc_0,_#7dd3fc_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />

      {/* Top horizontal line */}
      <div className="relative -bottom-px col-span-full col-start-1 row-start-2 mask-x-from-60% border-t border-dashed border-[#7dd3fc]/60 light:border-[#7dd3fc]" />

      {/* Bottom horizontal line */}
      <div className="relative -top-px col-span-full col-start-1 row-start-4 mask-x-from-60% border-b border-dashed border-[#7dd3fc]/60 light:border-[#7dd3fc]" />
    </div>
  );
}