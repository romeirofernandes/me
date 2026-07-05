import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Signature({
  text = "Signature",
  color = "#fff",
  fontSize = 16,
  duration = 1.5,
  delay = 0,
  className = "",
}) {
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIteration((value) => value + 1);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const width = Math.max(text.length * fontSize * 0.82, 180);
  const height = fontSize * 3.2;
  const y = height * 0.68;

  return (
    <div className={`flex w-full justify-center ${className}`}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="w-full max-w-full"
      >
        <motion.text
          key={`signature-stroke-${iteration}`}
          x="50%"
          y={y}
          textAnchor="middle"
          fontFamily="'Lastoria Bold Regular', cursive"
          fontSize={fontSize}
          fontWeight="400"
          fill="transparent"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: 1600, strokeDashoffset: 1600, opacity: 1 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration, delay, ease: "easeInOut" }}
        >
          {text}
        </motion.text>
        <motion.text
          key={`signature-fill-${iteration}`}
          x="50%"
          y={y}
          textAnchor="middle"
          fontFamily="'Lastoria Bold Regular', cursive"
          fontSize={fontSize}
          fontWeight="400"
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: delay + duration * 0.48, ease: "easeOut" }}
        >
          {text}
        </motion.text>
      </svg>
    </div>
  );
}
