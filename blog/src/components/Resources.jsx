import React from "react";

export default function Resources({ resources }) {
  return (
    <div className="text-right">
      <h2 className="font-serif text-lg font-bold mb-3 text-white">Links</h2>
      <ul className="text-sm text-zinc-400 space-y-2">
        {resources.map((r) => (
          <li key={r.name}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#38bdf8] transition"
            >
              {r.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
