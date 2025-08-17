import React from "react";
import { FaGithub } from "react-icons/fa";
import { MagicCard } from "./MagicCard"; 
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const techs = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "TailwindCSS",
    logo: "https://www.svgrepo.com/show/374118/tailwind.svg",
  },
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C++",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Flask",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Socket.io",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Vite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
  },
  {
    name: "C",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "Spline",
    logo: "/spline.png",
  },
  {
    name: "Framer Motion",
    logo: "/framer.svg",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Supabase",
    logo: "https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.svg",
  },
];

export function PinContainer({
  name,
  description,
  tech,
  image,
  href,
  preview,
  className,
  containerClassName,
}) {
  return (
    <MagicCard
      className={`dark w-[320px] h-[340px] rounded-xl overflow-hidden flex flex-col gap-3 p-4 ${
        containerClassName || ""
      }`}
      gradientFrom="#232323"
      gradientTo="#18181b"
      gradientColor="#f5f5f7"
      gradientOpacity={0.15}
      gradientSize={180}
    >
      <div className="w-full flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-36 rounded-lg"
          loading="lazy"
          style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
        />
      </div>
      <div className="flex flex-col gap-2 px-1 py-1 w-full flex-1">
        <span className="text-base font-semibold text-white truncate">
          {name}
        </span>
        <span className="text-zinc-400 text-xs truncate">{description}</span>
        <div className="flex flex-wrap gap-2 items-center mt-2">
          <TooltipProvider>
            {tech.map((t) => {
              const found = techs.find(
                (techObj) => techObj.name.toLowerCase() === t.toLowerCase()
              );
              return (
                found && (
                  <Tooltip key={t}>
                    <TooltipTrigger asChild>
                      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800">
                        <img
                          src={found.logo}
                          alt={t}
                          className="w-4 h-4 object-contain"
                          loading="lazy"
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      {found.name}
                    </TooltipContent>
                  </Tooltip>
                )
              );
            })}
          </TooltipProvider>
        </div>
        {/* Buttons at the bottom, full width and side by side */}
        <div className="flex flex-row gap-4 mt-2 w-full">
          {preview ? (
            <a
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-lg border border-[#232323] bg-white/10 text-sm text-white font-medium transition text-center shadow focus:outline-none focus:ring-2 focus:ring-[#f5f5f7] focus:ring-offset-2"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
              }}
            >
              Live Preview
            </a>
          ) : (
            <span className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-sm text-zinc-500 font-light cursor-not-allowed select-none text-center shadow flex items-center justify-center gap-2">
              No Preview
            </span>
          )}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 rounded-lg border border-[#232323] bg-white/10 text-sm text-white font-medium transition text-center shadow flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#f5f5f7] focus:ring-offset-2"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
            }}
          >
            <FaGithub className="inline-block" />
            GitHub
          </a>
        </div>
      </div>
    </MagicCard>
  );
}
