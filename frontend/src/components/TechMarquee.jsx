import React, { useRef, useState } from "react";

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

function MarqueeRow({
  items,
  reverse,
  paused,
  setPaused,
  animationName,
  duration = 18,
}) {
  const rowRef = useRef(null);

  return (
    <div
      ref={rowRef}
      className="relative flex items-center"
      style={{
        overflow: "hidden",
        width: "100%",
        height: "48px",
        cursor: "pointer",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex items-center"
        style={{
          animation: `${animationName} 60s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {[...items, ...items].map((tech, idx) => (
          <span
            key={idx}
            className="flex items-center justify-center gap-2 bg-[#18181b] border border-[#27272a] rounded-full shadow text-sm font-medium text-white whitespace-nowrap"
            style={{
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "8px",
              paddingBottom: "8px",
              marginLeft: "8px",
              marginRight: "8px",
              minWidth: "unset",
              maxWidth: "unset",
              lineHeight: 1.5,
            }}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-5 h-5"
              loading="lazy"
              style={{ flexShrink: 0 }}
            />
            <span>{tech.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  // Split skills into two unique rows
  const half = Math.ceil(techs.length / 2);
  const row1Skills = techs.slice(0, half);
  const row2Skills = techs.slice(half);

  const [pausedRow1, setPausedRow1] = useState(false);
  const [pausedRow2, setPausedRow2] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 space-y-3">
      <MarqueeRow
        items={row1Skills}
        reverse={false}
        paused={pausedRow1}
        setPaused={setPausedRow1}
        animationName="marquee"
      />
      <MarqueeRow
        items={row2Skills}
        reverse={true}
        paused={pausedRow2}
        setPaused={setPausedRow2}
        animationName="marquee-reverse"
      />
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}
