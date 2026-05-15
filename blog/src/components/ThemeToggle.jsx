import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ThemeToggle() {
  const [isOn, setIsOn] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const toggle = useCallback(() => {
    setIsOn((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("light", next);
      return next;
    });
  }, []);

  const cordStroke = isOn ? "stroke-zinc-900" : "stroke-zinc-400";
  const cordEnd = isOn ? "fill-zinc-900 stroke-zinc-900" : "fill-zinc-400 stroke-zinc-400";
  const capFill = isOn ? "fill-zinc-700" : "fill-zinc-500";
  const capShine = isOn ? "fill-white/25" : "fill-white/75";
  const capOutline = isOn ? "stroke-zinc-900" : "stroke-zinc-400";
  const filament = isOn ? "stroke-yellow-400" : "stroke-zinc-600";
  const bulbStroke = isOn ? "stroke-zinc-900" : "stroke-zinc-400";
  const bulbFill = isOn ? "fill-yellow-100/50" : "fill-cyan-100/10";
  const shine = isOn ? "stroke-white/25" : "stroke-white/75";
  const handleFill = isOn ? "fill-zinc-900" : "fill-zinc-400";

  const cordX2 = useTransform(x, (v) => 98.7255 + v * 0.3);
  const cordY2 = useTransform(y, (v) => 380.5405 + v);

  return (
    <div className="fixed top-6 right-8 z-50" style={{ width: "2.5rem" }}>
      <svg
        viewBox="0 0 197.451 481.081"
        className="h-28 w-auto overflow-visible"
      >
        <defs>
          <marker id="a" orient="auto" overflow="visible" refX="0" refY="0">
            <path
              className={`${cordEnd} transition-all duration-300`}
              fillRule="evenodd"
              strokeWidth=".2666"
              d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </marker>
          <clipPath id="g" clipPathUnits="userSpaceOnUse">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4.677"
              d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
            />
          </clipPath>
        </defs>

        {/* Static bulb */}
        <g transform="translate(844.069, -645.213)">
          <path
            className={`${capFill} transition-all duration-300`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.677"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          />
          <path
            className={`${capShine} transition-all duration-300`}
            d="M-778.379 802.873h25.512v118.409h-25.512z"
            clipPath="url(#g)"
            transform="matrix(.52452 0 0 .90177 -368.282 82.976)"
          />
          <path
            className={`${capFill} transition-all duration-300`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"
          />
          <path
            className={`${capOutline} fill-none transition-all duration-300`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.677"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          />
          <g className={`${filament} fill-none transition-all duration-300`} strokeLinecap="round" strokeWidth="5">
            <path d="M-752.914 823.875l-8.858-33.06" />
            <path d="M-737.772 823.875l8.858-33.06" />
          </g>
          <path
            className={`${bulbStroke} ${bulbFill} transition-all duration-300`}
            strokeLinecap="round"
            strokeWidth="5"
            d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
          />
          <path
            className={`${shine} fill-none transition-all duration-300`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="12"
            d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"
          />
        </g>

        {/* Cord + drag handle */}
        <g>
          {/* Invisible drag overlay */}
          <motion.rect
            x="80"
            y="230"
            width="40"
            height="170"
            fill="transparent"
            drag
            dragElastic={0.5}
            dragMomentum={false}
            dragConstraints={{ top: -80, left: -80, right: 80, bottom: 80 }}
            onDrag={(_, info) => {
              x.set(info.offset.x);
              y.set(info.offset.y);
            }}
            onDragEnd={() => {
              const dist = Math.sqrt(x.get() ** 2 + y.get() ** 2);
              if (dist > 50) toggle();
              x.set(0);
              y.set(0);
            }}
            style={{ cursor: "grab" }}
            onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
            onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
            onMouseLeave={(e) => (e.currentTarget.style.cursor = "grab")}
          />
          <motion.line
            className={`${cordStroke} transition-all duration-300`}
            strokeLinecap="square"
            strokeWidth="6"
            markerEnd="url(#a)"
            x1="98.7255"
            x2={cordX2}
            y1="240.5405"
            y2={cordY2}
            style={{ pointerEvents: "none" }}
          />
          <motion.circle
            className={`${handleFill} transition-all duration-300`}
            cx="98.7255"
            cy="380.5405"
            r="8"
            style={{ x, y, pointerEvents: "none" }}
          />
        </g>
      </svg>
    </div>
  );
}
