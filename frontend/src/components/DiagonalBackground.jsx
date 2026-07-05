import React from "react";

export default function DiagonalBackground({ children, className = "" }) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {children}
    </div>
  );
}
