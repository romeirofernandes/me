import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => n.toString().padStart(2, "0");
  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());

  return (
    <div className="text-white text-lg font-mono px-4 py-2 bg-[#18181b]/80 rounded-sm shadow-lg border border-white/10 select-none">
      {hours}:{minutes}:{seconds}
    </div>
  );
}
