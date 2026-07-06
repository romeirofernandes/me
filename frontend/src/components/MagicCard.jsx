import React from "react";
import { cn } from "@/lib/utils";

export function MagicCard({
  children,
  className,
}) {
  return (
    <div className={cn("relative rounded-[inherit] bg-black/15 backdrop-blur-xl border border-white/10 shadow-xl", className)}>
      <div className="relative">{children}</div>
    </div>
  );
}
