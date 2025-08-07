import React from "react";

export default function SectionDivider({ className = "" }) {
  return (
    <div
      className={`w-full h-[0.1px] ${className}`}
      style={{
        background: "rgba(100, 100, 100, 0.2)",
      }}
    />
  );
}
