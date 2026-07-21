import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "./motion/popover"
import { SharedLayoutBg } from "./motion/shared-layout-bg"
import { useSmoothScroll } from "./motion/smooth-scroll"

export default function ScrollProgress({ sections = [] }) {
  const { progress: progressVal, scrollTo } = useSmoothScroll()
  const [progress, setProgress] = useState(0)
  const [currentLabel, setCurrentLabel] = useState(sections[0]?.label ?? "")
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const unsubscribe = progressVal.on("change", setProgress)
    return () => unsubscribe()
  }, [progressVal])

  useEffect(() => {
    if (!sections.length) return
    const labelMap = {}
    const observers = []
    sections.forEach(({ id, label }) => {
      labelMap[id] = label
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentLabel(labelMap[entry.target.id])
          }
        })
      }, { threshold: 0.3 })
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  const handleSectionClick = (id) => {
    scrollTo(document.getElementById(id), { offset: -80 })
    setOpen(false)
  }

  const circumference = 2 * Math.PI * 13
  const offset = circumference - progress * circumference

  return (
    <div className="fixed bottom-6 left-4 md:left-6 z-[9999]">
      <Popover open={open} onOpenChange={setOpen} side="top" align="start" trigger={isMobile ? "click" : "hover"}>
        <PopoverTrigger>
          <button className="flex items-center gap-2 bg-[#18181b] light:bg-white backdrop-blur-md rounded-full pl-4 pr-2 py-1.5 shadow-lg border border-[#232323] light:border-zinc-200 cursor-pointer">
            <div className="relative h-4 overflow-hidden w-36">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentLabel}
                  initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                  className="absolute inset-0 text-[11px] text-zinc-300 light:text-zinc-900 flex items-center"
                >
                  {currentLabel}
                </motion.span>
              </AnimatePresence>
            </div>

            <svg width="32" height="32" className="-rotate-90 shrink-0">
              <defs>
                <linearGradient id="progress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#90CAF9" />
                  <stop offset="50%" stopColor="#42A5F5" />
                  <stop offset="100%" stopColor="#1565C0" />
                </linearGradient>
              </defs>
              <circle
                cx="16"
                cy="16"
                r="13"
                fill="none"
                className="stroke-current opacity-10"
                strokeWidth="3"
              />
              <circle
                cx="16"
                cy="16"
                r="13"
                fill="none"
                stroke="url(#progress-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-none"
              />
            </svg>
          </button>
        </PopoverTrigger>

        <PopoverContent className="p-2">
          <SharedLayoutBg inset={8}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="relative w-full text-left px-3 py-2 text-sm rounded-xl text-zinc-300 light:text-zinc-900 hover:text-white light:hover:text-black transition-colors"
              >
                {section.label}
              </button>
            ))}
          </SharedLayoutBg>
        </PopoverContent>
      </Popover>
    </div>
  )
}
