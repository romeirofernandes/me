import React from "react";

export default function GridLines() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div
        className="absolute top-0 h-full w-[0.1px]"
        style={{
          left: "calc(50% - 24rem)", // Left side of max-w-3xl (384px / 2)
          background: "white",
          border: "white",
          opacity: "100%",
        }}
      />

      {/* Double lines on the right side */}
      <div
        className="absolute top-0 h-full w-[0.1px]"
        style={{
          left: "calc(50% + 24rem)", // Right side of max-w-3xl
          background: "white",
        }}
      />
      <div
        className="absolute top-0 h-full w-[0.1px]"
        style={{
          left: "calc(50% + 24rem + 16px)", 
          background: "white",
        }}
      />
    </div>
  );
}
