import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => n.toString().padStart(2, "0");
  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());

  const message = getScheduleMessage(time);

  // Detect mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <TooltipProvider>
      <Tooltip
        open={isMobile ? open : undefined}
        onOpenChange={isMobile ? setOpen : undefined}
      >
        <TooltipTrigger asChild>
          <div
            className={`
              text-white font-mono bg-[#18181b]/80 rounded-sm shadow-lg border border-white/10 select-none cursor-pointer
              px-4 py-2 text-lg
              transition-all
              ${isMobile ? "text-base px-3 py-1.5 mt-2" : ""}
            `}
            onClick={isMobile ? () => setOpen((prev) => !prev) : undefined}
          >
            {hours}:{minutes}:{seconds}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="end"
          className={isMobile ? "text-sm max-w-[180px]" : ""}
        >
          <span>This is my time. {message}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
