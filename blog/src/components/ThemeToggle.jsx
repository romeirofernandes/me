import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function ThemeToggle() {
  const [isOn, setIsOn] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("light");
    }
    return false;
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
      setIsOn(true);
    } else {
      document.documentElement.classList.remove("light");
      setIsOn(false);
    }
  }, []);

  const toggle = useCallback(() => {
    setIsOn((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("light", next);
      localStorage.setItem("theme", next ? "light" : "dark");
      return next;
    });
  }, []);

  const cordStroke = isOn ? "stroke-zinc-900" : "stroke-zinc-400";
  const capFill = isOn ? "fill-zinc-700" : "fill-zinc-500";
  const capShine = isOn ? "fill-white/25" : "fill-white/75";
  const capOutline = isOn ? "stroke-zinc-900" : "stroke-zinc-400";
  const filament = isOn ? "stroke-yellow-400" : "stroke-zinc-600";
  const bulbStroke = isOn ? "stroke-zinc-900" : "stroke-zinc-400";
  const bulbFill = isOn ? "fill-yellow-100/50" : "fill-cyan-100/10";
  const shine = isOn ? "stroke-white/25" : "stroke-white/75";
  const handleFill = isOn ? "fill-zinc-900" : "fill-zinc-400";

  const cordX2 = useTransform(x, (v) => 98.7255 + v);
  const cordY2 = useTransform(y, (v) => 380.5405 + v);

  const handleDragEnd = () => {
    isDragging.current = false;
    const dist = Math.sqrt(x.get() ** 2 + y.get() ** 2);

    animate(x, 0, { type: "spring", stiffness: 180, damping: 10, mass: 0.6 });
    animate(y, 0, { type: "spring", stiffness: 180, damping: 10, mass: 0.6 });

    if (dist > 50) {
      toggle();
    }
  };

  return (
    <div className="fixed top-6 right-8 z-50" style={{ width: "2.5rem" }}>
      <svg
        viewBox="0 0 197.451 481.081"
        className="h-28 w-auto overflow-visible"
      >
        <defs>
          <clipPath id="g" clipPathUnits="userSpaceOnUse">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4.677"
              d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
            />
          </clipPath>
        </defs>

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

        <g>
          <motion.line
            className={`${cordStroke}`}
            strokeLinecap="round"
            strokeWidth="6"
            x1="98.7255"
            y1="240.5405"
            x2={cordX2}
            y2={cordY2}
            style={{ pointerEvents: "none" }}
          />
          <motion.circle
            className={`${handleFill}`}
            cx="98.7255"
            cy="380.5405"
            r="8"
            style={{ x, y, pointerEvents: "none" }}
          />
          <motion.circle
            cx="98.7255"
            cy="380.5405"
            r="40"
            fill="transparent"
            drag
            dragElastic={0}
            dragMomentum={false}
            dragConstraints={{ top: -150, left: -100, right: 100, bottom: 150 }}
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDrag={(_, info) => {
              x.set(info.offset.x);
              y.set(info.offset.y);
            }}
            onDragEnd={handleDragEnd}
            style={{ x, y, cursor: "grab" }}
            onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
            onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
            onMouseLeave={(e) => {
              if (!isDragging.current) e.currentTarget.style.cursor = "grab";
            }}
          />
        </g>
      </svg>
    </div>
  );
}
