import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

export function PinContainer({
  name,
  description,
  tech,
  image,
  href,
  preview,
  className,
  containerClassName,
}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative z-10 cursor-pointer ${
        containerClassName || ""
      }`}
      style={{ outline: "none" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={-1}
    >
      <motion.div
        className="flex items-center justify-center w-full h-full"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          animate={{
            rotateX: mouse.y * 0.07,
            rotateY: -mouse.x * 0.07,
            boxShadow:
              mouse.x !== 0 || mouse.y !== 0
                ? "0 8px 32px 0 rgba(0,0,0,0.35)"
                : "0 2px 8px 0 rgba(0,0,0,0.15)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex flex-col w-[320px] h-[320px] rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="w-full flex items-center justify-center p-4 pb-0">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-40 rounded-lg"
              loading="lazy"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
            />
          </div>
          <div className="flex flex-col gap-1 px-4 py-3 w-full flex-1">
            <motion.span
              className="text-base font-semibold text-white truncate"
              style={{
                transform:
                  mouse.x !== 0 || mouse.y !== 0
                    ? "translateZ(18px)"
                    : "translateZ(0px)",
                transition: "transform 0.2s cubic-bezier(.4,0,.2,1)",
              }}
            >
              {name}
            </motion.span>
            <motion.span
              className="text-zinc-400 text-xs truncate"
              style={{
                transform:
                  mouse.x !== 0 || mouse.y !== 0
                    ? "translateZ(12px)"
                    : "translateZ(0px)",
                transition: "transform 0.2s cubic-bezier(.4,0,.2,1)",
              }}
            >
              {description}
            </motion.span>
            <div className="flex flex-wrap gap-1">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
            {/* Buttons at the bottom, full width and side by side */}
            <div className="flex flex-row gap-2 mt-auto w-full">
              {preview ? (
                <a
                  href={preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-sm text-white font-semibold hover:bg-zinc-700 transition text-center shadow flex items-center justify-center gap-2"
                >
                  <FiExternalLink className="inline-block" />
                  Live Preview
                </a>
              ) : (
                <span className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-sm text-zinc-500 font-semibold cursor-not-allowed select-none text-center shadow flex items-center justify-center gap-2">
                  No Preview
                </span>
              )}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-lg bg-zinc-700 text-sm text-white font-light hover:bg-zinc-600 transition text-center shadow flex items-center justify-center gap-2"
              >
                <FaGithub className="inline-block" />
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.a>
  );
}
