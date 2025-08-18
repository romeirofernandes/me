import React from "react";

export default function Resources({ resources, highlight }) {
  return (
    <div className="text-left w-full sm:w-auto sm:static bg-[#080808] border-t border-[#232323] z-10 sm:bg-transparent sm:border-0 pt-4 sm:pt-0">
      <h2 className="font-serif text-lg font-bold mb-3 text-white sm:block hidden">
        Links
      </h2>
      <ul className="text-sm text-zinc-400 space-y-2 flex flex-col items-start">
        {resources.map((r) => (
          <li key={r.name}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-[#38bdf8] transition break-all ${
                r.name === highlight ? "text-white font-medium" : ""
              }`}
            >
              {r.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
