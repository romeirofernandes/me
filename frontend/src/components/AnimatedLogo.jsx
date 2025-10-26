import { motion } from "framer-motion";
import '@fontsource-variable/playwrite-sk';
import { useMediaQuery } from 'react-responsive';

export default function AnimatedLogo({ fadeOut = false, onAnimationEnd }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const logoText = isMobile ? "romeiro" : "romeiro fernandes";
  const fontSize = isMobile ? 100 : 80;
  const viewBox = isMobile ? "0 0 600 200" : "0 0 1200 200";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "var(--foreground)",
        color: "var(--background)",
        minHeight: "100vh",
        width: "100vw",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ opacity: { duration: 0.7, ease: "easeInOut" } }}
    >
      <svg
        width="90vw"
        height="30vh"
        viewBox={viewBox}
        className="max-w-full"
      >
        <defs>
          <style>
            {`
              text {
                font-family: 'Playwrite SK Variable', cursive;
                font-variation-settings: 'wght' 400;
              }
            `}
          </style>
        </defs>
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Playwrite SK Variable', cursive"
          fontSize={fontSize}
          fontWeight="400"
          fill="none"
          stroke="var(--background)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            strokeDasharray: 2000,
            strokeDashoffset: 2000,
          }}
          animate={{
            strokeDashoffset: 0,
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        >
          {logoText}
        </motion.text>
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Playwrite SK Variable', cursive"
          fontSize={fontSize}
          fontWeight="400"
          fill="var(--background)"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.95,
            duration: 0.5,
          }}
          onAnimationComplete={onAnimationEnd}
        >
          {logoText}
        </motion.text>
      </svg>
    </motion.div>
  );
}