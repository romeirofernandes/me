import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useState,
} from "react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export function SharedLayoutBg({
  children,
  className,
  pillClassName,
  inset = 20,
}) {
  const [activeId, setActiveId] = useState(null);
  const uid = useId();
  const reduce = useReducedMotion();

  return (
    <motion.div
      layoutRoot
      onMouseLeave={() => setActiveId(null)}
      className={cn("flex w-full flex-col", className)}
    >
      {Children.toArray(children)
        .filter(isValidElement)
        .map((child, index) => {
          const el = child;
          const childKey = el.key ? String(el.key) : `item-${index}`;
          return cloneElement(
            el,
            {
              key: childKey,
              className: cn("relative", el.props.className),
              onMouseEnter: () => setActiveId(childKey),
            },
            <>
              <AnimatePresence custom={activeId !== null}>
                {activeId !== null ? (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={activeId !== null ? { opacity: 0, filter: "blur(6px)" } : {}}
                    className="pointer-events-none absolute inset-y-0"
                    style={{ left: -inset, right: -inset }}
                  >
                    {activeId === childKey ? (
                      <motion.div
                        layoutId={`shared-bg-${uid}`}
                        transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                        className={cn(
                          "pointer-events-none h-full w-full rounded-2xl bg-primary/[0.06]",
                          pillClassName,
                        )}
                      />
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <div className="relative z-10">{el.props.children}</div>
            </>
          );
        })}
    </motion.div>
  );
}
