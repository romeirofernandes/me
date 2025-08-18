import React from "react";

export default function Background({ children, className = "" }) {
  return (
    <div className={`relative min-h-screen w-full ${className}`}>
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: "calc(50% - 24rem)",
          background: `repeating-linear-gradient(
            120deg,
            rgba(255,255,255,0.1) 0px,
            rgba(255,255,255,0.1) 1px,
            transparent 0.1px,
            transparent 12px
          )`,
          zIndex: -10,
        }}
      />

      <div
        className="absolute top-0 h-full"
        style={{
          left: "calc(50% + 24rem)",
          width: "calc(50% - 24rem)",
          background: `repeating-linear-gradient(
            120deg,
            rgba(255,255,255,0.1) 0px,
            rgba(255,255,255,0.1) 1px,
            transparent 0.1px,
            transparent 12px
          )`,
          zIndex: -10,
        }}
      />
      {/* Vertical separators */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-[24rem] h-full w-[0.1px] bg-white/15" />
      <div className="pointer-events-none absolute top-0 left-1/2 translate-x-[24rem] h-full w-[0.1px] bg-white/15" />
      {/* Main content */}
      <div className="relative flex justify-center">
        <div className="w-full max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
