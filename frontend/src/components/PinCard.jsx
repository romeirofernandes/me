import { memo } from "react";
import { MagicCard } from "./MagicCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { techsMap } from "@/lib/techs";

export const PinContainer = memo(function PinContainer({
  name,
  description,
  tech,
  image,
  href,
  preview,
  containerClassName,
}) {
  return (
    <MagicCard
      className={`dark w-full h-[340px] rounded-xl overflow-hidden flex flex-col gap-3 p-4 ${containerClassName || ""}`}
    >
      <div className="w-full flex items-center justify-center mb-1">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-40 rounded-lg"
          loading="lazy"
          width={320}
          height={160}
        />
      </div>
      <div className="flex flex-col gap-1 px-1 py-1 w-full flex-1">
        <span className="text-base font-semibold text-white truncate">{name}</span>
        <span className="text-white/60 text-xs truncate">{description}</span>
        <div className="flex flex-wrap gap-2 items-center mt-2">
          <TooltipProvider>
            {tech.map((t) => {
              const found = techsMap.get(t.toLowerCase());
              return (
                found && (
                  <Tooltip key={t}>
                    <TooltipTrigger asChild>
                      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--glass-bg-30)] backdrop-blur-sm border border-white/10">
                        <img
                          src={found.logo}
                          alt={t}
                          className="w-4 h-4 object-contain"
                          loading="lazy"
                          width={16}
                          height={16}
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" className="bg-black/80 backdrop-blur-xl border border-white/10 text-white">
                      {found.name}
                    </TooltipContent>
                  </Tooltip>
                )
              );
            })}
          </TooltipProvider>
        </div>

        <div className="flex flex-row gap-2 mt-2 w-full">
          {preview ? (
            <a
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-[var(--glass-bg-20)] backdrop-blur-md text-sm text-white font-medium transition text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#f5f5f7] focus:ring-offset-2"
              onClick={(e) => e.stopPropagation()}
            >
              Live Preview
            </a>
          ) : (
            <span className="flex-1 px-4 py-2 rounded-lg bg-[var(--glass-bg-20)] backdrop-blur-md border border-white/10 text-sm text-white/50 font-light cursor-not-allowed select-none text-center shadow flex items-center justify-center gap-2">
              No Preview
            </span>
          )}
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-[var(--glass-bg-20)] backdrop-blur-md text-sm text-white font-medium transition text-center shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#f5f5f7] focus:ring-offset-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 inline-block"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </MagicCard>
  );
});
