import React from "react";

export default function Background({ children, className = "" }) {
  return (
    <div className={`relative min-h-screen w-full ${className}`}>
      {/* Hide background gradients and separators on small screens */}
      <div
        className="absolute top-0 left-0 h-full hidden md:block"
        style={{
          width: "calc(50% - 24rem)",
          background: `repeating-linear-gradient(
            140deg,
            rgba(255,255,255,0.05) 0px,
            rgba(255,255,255,0.05) 1px,
            transparent 0.1px,
            transparent 12px
          )`,
          zIndex: -10,
        }}
      />
      <div
        className="absolute top-0 h-full hidden md:block"
        style={{
          left: "calc(50% + 24rem)",
          width: "calc(50% - 24rem)",
          background: `repeating-linear-gradient(
            140deg,
            rgba(255,255,255,0.05) 0px,
            rgba(255,255,255,0.05) 1px,
            transparent 0.1px,
            transparent 12px
          )`,
          zIndex: -10,
        }}
      />
      {/* Vertical separators */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-[24rem] h-full w-[0.1px] bg-white/15 hidden md:block" />
      <div className="pointer-events-none absolute top-0 left-1/2 translate-x-[24rem] h-full w-[0.1px] bg-white/15 hidden md:block" />
      {/* Main content */}
      <div className="relative flex justify-center">
        <div className="w-full max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
