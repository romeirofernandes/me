import { memo, useState } from "react";
import { techs } from "@/lib/techs";

const MarqueeRow = memo(function MarqueeRow({ items, reverse, paused, setPaused, animationName }) {
  return (
    <div
      className="relative flex items-center overflow-hidden w-full h-12 cursor-pointer"
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
        {items.map((tech, idx) => (
          <span
            key={`${tech.name}-orig-${idx}`}
            className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white whitespace-nowrap px-6 py-2 mx-2 leading-relaxed"
          >
            <img src={tech.logo} alt={tech.name} className="w-5 h-5 shrink-0" loading="lazy" />
            <span>{tech.name}</span>
          </span>
        ))}
        {items.map((tech, idx) => (
          <span
            key={`${tech.name}-dup-${idx}`}
            className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white whitespace-nowrap px-6 py-2 mx-2 leading-relaxed"
          >
            <img src={tech.logo} alt={tech.name} className="w-5 h-5 shrink-0" loading="lazy" />
            <span>{tech.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
});

export default function TechMarquee() {
  const half = Math.ceil(techs.length / 2);
  const row1Skills = techs.slice(0, half);
  const row2Skills = techs.slice(half);

  const [pausedRow1, setPausedRow1] = useState(false);
  const [pausedRow2, setPausedRow2] = useState(false);

  return (
    <div className="relative z-10 isolate w-full mx-auto my-8 space-y-3">
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
    </div>
  );
}
