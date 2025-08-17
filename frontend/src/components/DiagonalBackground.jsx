import React from "react";

export default function DiagonalBackground({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `repeating-linear-gradient(
            315deg,
            rgba(255, 255, 255, 0.75) 0,
            rgba(255, 255, 255, 0.75) 1px,
            transparent 0,
            transparent 10px
          )`,
        }}
      />
      {children}
    </div>
  );
}
