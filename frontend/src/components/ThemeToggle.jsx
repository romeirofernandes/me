import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { play } from "@/lib/cuelume";

const PERIODS = [
  { value: "morning", label: "Morning", img: "/morning.webp" },
  { value: "afternoon", label: "Afternoon", img: "/afternoon.webp" },
  { value: "evening", label: "Evening", img: "/evening.webp" },
  { value: "night", label: "Night", img: "/night.webp" },
];

const PANEL_SPRING = { type: "spring", duration: 0.46, bounce: 0.08 };

export default memo(function ThemeToggle({ period, onPeriodChange, className = "" }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative size-8 md:size-9", className)}>
      <motion.button
        type="button"
        aria-label="Toggle theme"
        onClick={() => setOpen((p) => !p)}
        className="size-8 md:size-9 rounded-full flex items-center justify-center text-white cursor-pointer"
        data-cuelume-press
        data-cuelume-release
      >
        <motion.svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8 md:size-9"
          animate={{ rotate: open ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <motion.g
            animate={{ rotate: open ? -180 : 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
          >
            <path
              d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
              fill="white"
            />
            <path
              d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
              fill="black"
            />
          </motion.g>
          <motion.path
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
            fill="white"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.08 } }}
            transition={PANEL_SPRING}
            className="absolute right-0 top-full mt-2 z-30 w-48 rounded-xl border border-white/10 bg-[var(--glass-bg)] backdrop-blur-xl shadow-xl overflow-hidden"
          >
            <motion.div
              layoutRoot
              onMouseLeave={() => setHovered(null)}
              className="p-1.5"
            >
              {PERIODS.map((p) => (
                <motion.button
                  key={p.value}
                  type="button"
                  role="option"
                  layout="position"
                  aria-selected={period === p.value}
                  onClick={() => {
                    play("release");
                    onPeriodChange(p.value);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setHovered(p.value)}
                  className={cn(
                    "relative flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-left outline-none transition-colors",
                    period === p.value
                      ? "text-white"
                      : "text-white/60 hover:text-white/90",
                  )}>
                  {period === p.value && (
                    <motion.div
                      layoutId="period-pill"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <AnimatePresence>
                    {hovered !== null && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        {hovered === p.value && (
                          <motion.div
                            layoutId="theme-hover-pill"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            className="h-full w-full rounded-lg bg-white/5"
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <img
                    src={p.img}
                    alt=""
                    className="size-7 rounded-full object-cover shrink-0 ring-1 ring-white/20 relative z-10"
                  />
                  <span className="flex-1 relative z-10">{p.label}</span>
                  {period === p.value && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="size-3.5 shrink-0 text-white/60 relative z-10">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
