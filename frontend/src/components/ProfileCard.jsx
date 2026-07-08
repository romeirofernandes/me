import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  NewTwitterIcon,
  Location01Icon,
  Mail01Icon,
  LinkedinIcon,
  GlobeIcon,
} from "@hugeicons/core-free-icons";
import {
  FileText,
  Download01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import PdfViewer from "./PdfViewer";

export default function ProfileCard() {
  const [resumeOpen, setResumeOpen] = useState(false);

  function handleDownload() {
    const a = document.createElement("a");
    a.href = "/RomeiroFernandes_Resume.pdf";
    a.download = "RomeiroFernandes_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  useEffect(() => {
    if (!resumeOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setResumeOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [resumeOpen]);

  return (
    <>
      <div className="relative z-10 isolate w-full max-w-full md:max-w-2xl mx-auto rounded-xl p-4 sm:p-6 md:p-7 flex flex-col gap-3 md:gap-4 border border-white/10 text-left bg-[var(--glass-bg)] backdrop-blur-xl shadow-xl">
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col gap-1 md:gap-2 relative">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">Romeiro Fernandes</div>
            <div id="about" className="text-xs md:text-sm text-[var(--glass-text-muted)]">20, Computer Engineer</div>
            <div className="flex gap-3 md:gap-6 absolute right-0 top-0">
              <button onClick={() => setResumeOpen(true)} aria-label="View Resume" className="cursor-pointer">
                <HugeiconsIcon icon={FileText} size={20} className="text-[var(--glass-text-muted)] hover:text-white transition" />
              </button>
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

      {createPortal(
        <AnimatePresence>
          {resumeOpen && (
            <motion.div
              className="fixed inset-0 z-[60] overflow-y-auto bg-black/80 backdrop-blur-sm resume-scroll"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#555 #1a1a1a" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setResumeOpen(false)}
            >
              <div className="flex min-h-full items-center justify-center py-0 md:py-12 px-0 md:px-4">
                <motion.div
                  className="relative w-full max-w-full md:max-w-2xl mx-auto min-h-0 rounded-none md:rounded-xl bg-[var(--glass-bg)] backdrop-blur-xl border-0 md:border border-white/10 shadow-xl pt-12 sm:pt-16 pb-4 sm:pb-8 px-4 sm:px-8"
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 24 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-2 sm:top-4 right-4 sm:right-8 flex items-center gap-2 z-10">
                    <button
                      onClick={handleDownload}
                      aria-label="Download Resume"
                      className="cursor-pointer size-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-white/70 hover:text-white"
                    >
                      <HugeiconsIcon icon={Download01Icon} size={16} />
                    </button>
                    <button
                      onClick={() => setResumeOpen(false)}
                      aria-label="Close"
                      className="cursor-pointer size-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition text-white/70 hover:text-white"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={16} />
                    </button>
                  </div>
                  <PdfViewer url="/RomeiroFernandes_Resume.pdf" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
