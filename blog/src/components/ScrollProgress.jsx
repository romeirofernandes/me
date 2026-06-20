import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollProgress({ sections = [] }) {
  const [progress, setProgress] = useState(0)
  const [currentLabel, setCurrentLabel] = useState(sections[0]?.label ?? "")

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const circumference = 2 * Math.PI * 13
  const offset = circumference - progress * circumference

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="flex items-center gap-2 bg-neutral-800 backdrop-blur-md rounded-full px-4 py-1.5 shadow-lg border border-white/10">
        <div className="relative h-4 overflow-hidden w-40">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentLabel}
              initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", duration: 0.45, bounce: 0 }}
              className="absolute inset-0 text-[11px] text-zinc-300 flex items-center"
            >
              {currentLabel}
            </motion.span>
          </AnimatePresence>
        </div>

        <svg width="32" height="32" className="-rotate-90 shrink-0">
          <defs>
            <linearGradient id="blueProgress" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#B3E5FC" />
              <stop offset="50%" stop-color="#64B5F6" />
              <stop offset="100%" stop-color="#1E88E5" />
            </linearGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
          />
          <circle
            cx="16"
            cy="16"
            r="13"
            fill="none"
            stroke="url(#blueProgress)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-150 ease-linear"
          />
        </svg>
      </div>
    </div>
  )
}
