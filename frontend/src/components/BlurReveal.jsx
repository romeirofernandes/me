import { motion } from "framer-motion";

export default function BlurReveal({
  children,
  className = "w-full",
  delay = 0,
  speedReveal = 0.8,
  trigger = true,
  as: Component = "div",
  style,
}) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      animate={
        trigger
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 18 }
      }
      transition={{
        duration: speedReveal,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionComponent>
  );
}
