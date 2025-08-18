import React from "react";
import { useNavigate } from "react-router-dom";

export default function Resources({ resources, highlight }) {
  const navigate = useNavigate();

  return (
    <div className="text-left w-full sm:w-auto sm:static bg-[#080808] border-t border-[#232323] z-10 sm:bg-transparent sm:border-0 pt-4 sm:pt-0">
      <h2 className="font-serif text-lg font-bold mb-3 text-white sm:block hidden">
        Links
      </h2>
      <ul className="text-sm text-zinc-400 space-y-2 flex flex-col items-start">
        {resources.map((r) => (
          <li key={r.name}>
            {r.url.startsWith("/") ? (
              <button
                onClick={() => navigate(r.url)}
                className={`hover:text-[#38bdf8] transition break-all bg-transparent border-none p-0 m-0 cursor-pointer ${
                  r.name === highlight ? "text-white font-medium" : ""
                }`}
                style={{ font: "inherit" }}
              >
                {r.name}
              </button>
            ) : (
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
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
