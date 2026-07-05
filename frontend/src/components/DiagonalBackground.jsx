import React from "react";

export default function DiagonalBackground({ children, className = "" }) {
  return (
    <div className={`relative bg-[#080808] ${className}`}>
      {children}
    </div>
  );
}
