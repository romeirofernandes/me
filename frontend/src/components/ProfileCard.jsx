
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  NewTwitterIcon,
  Location01Icon,
  Mail01Icon,
  LinkedinIcon,
  GlobeIcon,
} from "@hugeicons/core-free-icons";

export default function ProfileCard() {
  return (
    <div className="relative z-10 isolate w-full max-w-full md:max-w-2xl mx-auto rounded-xl p-4 sm:p-6 md:p-7 flex flex-col gap-3 md:gap-4 border border-white/10 text-left bg-[var(--glass-bg)] backdrop-blur-xl shadow-xl">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex flex-col gap-1 md:gap-2 relative">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">Romeiro Fernandes</div>
          <div id="about" className="text-xs md:text-sm text-[var(--glass-text-muted)]">20, Computer Engineer</div>
          <div className="flex gap-3 md:gap-6 absolute right-0 top-0">
            <a href="https://github.com/romeirofernandes" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <HugeiconsIcon icon={GithubIcon} size={20} className="text-[var(--glass-text-muted)] hover:text-white transition" />
            </a>
            <a href="https://x.com/whotookromeiro" target="_blank" rel="noopener noreferrer" aria-label="X">
              <HugeiconsIcon icon={NewTwitterIcon} size={20} className="text-[var(--glass-text-muted)] hover:text-white transition" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[var(--glass-text-muted)]">
            <HugeiconsIcon icon={Location01Icon} size={16} /> Bombay, India
          </div>
          <a href="mailto:theromeirofernandes@gmail.com" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[var(--glass-text-muted)] hover:text-white transition">
            <HugeiconsIcon icon={Mail01Icon} size={16} /> theromeirofernandes@gmail.com
          </a>
          <a href="https://linkedin.com/in/romeirofernandes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[var(--glass-text-muted)] hover:text-white transition">
            <HugeiconsIcon icon={LinkedinIcon} size={16} /> romeirofernandes
          </a>
          <a href="https://blog.romeiro.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[var(--glass-text-muted)] hover:text-white transition">
            <HugeiconsIcon icon={GlobeIcon} size={16} /> blog.romeiro.dev
          </a>
        </div>
      </div>
      <div className="mt-2 md:mt-4 text-xs md:text-sm text-white">Persistent. Adaptive. Funny.</div>
    </div>
  );
}
