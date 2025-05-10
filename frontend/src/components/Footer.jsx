import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-8">
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Fading border */}
        <div className="absolute left-0 right-0 top-0 h-px w-full pointer-events-none">
          <div
            className="w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #232323 20%, #232323 80%, transparent 100%)",
            }}
          />
        </div>
        <div className="text-center text-xs text-gray-500 py-6">
          © 2025 Romeiro Fernandes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
