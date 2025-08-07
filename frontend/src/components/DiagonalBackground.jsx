import React from "react";

export default function DiagonalBackground({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Diagonal stripe pattern background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `repeating-linear-gradient(
            315deg,
            rgba(65, 65, 65, 0.8) 0,
            rgba(65, 65, 65, 0.8) 1px,
            transparent 0,
            transparent 10px
          )`,
        }}
      />
      {children}
    </div>
  );
}
