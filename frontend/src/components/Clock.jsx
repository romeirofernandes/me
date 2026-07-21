import { useEffect, useState, useRef } from "react";
import "slot-text/style.css";
import { SlotText } from "slot-text/react";
import { play } from "@/lib/cuelume";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function getScheduleMessage(date) {
  const day = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const timeNum = hour * 100 + minute;

  if (day >= 1 && day <= 5) {
    if (timeNum < 700) return "I'm probably sleeping.";
    if (timeNum >= 700 && timeNum < 740) return "Gobbling breakfast.";
    if (timeNum >= 740 && timeNum < 845) return "I'm travelling to college.";
    if (timeNum >= 845 && timeNum < 1630) return "I'm attending lectures.";
    if (timeNum >= 1630 && timeNum < 1800) return "I'm travelling back home.";
    if (timeNum >= 1800 && timeNum < 2200) return "I'm working.";
    if (timeNum >= 2200 && timeNum < 2400) return "I'm chilling.";
    return "I'm probably sleeping.";
  }

  if (timeNum < 900) return "I'm probably sleeping.";
  if (timeNum >= 900 && timeNum < 1000) return "Gobbling breakfast.";
  if (timeNum >= 1000 && timeNum < 1400) return "Wasting time, hmu";
  if (timeNum >= 1400 && timeNum < 1730) return "I'm working, probably.";
  if (timeNum >= 1730 && timeNum < 2400) return "I'm probably watching PL.";
  return "I'm probably sleeping.";
}

export default function Clock() {
  const [time, setTime] = useState(() => new Date());
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const hovering = useRef(false);

  useEffect(() => {
    if (hovering.current) {
      play("tick");
    }
  }, [time]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => n.toString().padStart(2, "0");
  const h = pad(time.getHours());
  const m = pad(time.getMinutes());
  const s = pad(time.getSeconds());

  const message = getScheduleMessage(time);

  return (
    <TooltipProvider>
      <Tooltip
        open={isMobile ? open : undefined}
        onOpenChange={isMobile ? setOpen : undefined}
      >
        <TooltipTrigger asChild>
          <div
            className="text-white font-mono bg-[var(--glass-bg-20)] backdrop-blur-md rounded-lg shadow-xl border border-white/10 select-none cursor-pointer px-3 py-1.5 md:px-4 md:py-2 text-base md:text-lg tracking-[0.05em] transition-all"
            onClick={isMobile ? () => setOpen((prev) => !prev) : undefined}
            onMouseEnter={() => { hovering.current = true; play("tick"); }}
            onMouseLeave={() => { hovering.current = false; }}
          >
            <SlotText text={h[0]} options={{ direction: "up" }} />
            <SlotText text={h[1]} options={{ direction: "up" }} />
            <span className="opacity-40">:</span>
            <SlotText text={m[0]} options={{ direction: "up" }} />
            <SlotText text={m[1]} options={{ direction: "up" }} />
            <span className="opacity-40">:</span>
            <SlotText text={s[0]} options={{ direction: "up" }} />
            <SlotText text={s[1]} options={{ direction: "up" }} />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="end"
          className="bg-[#18181b] border border-white/10 text-white"
        >
          <span>This is my time. {message}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
