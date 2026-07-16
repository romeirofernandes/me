"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";
import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const ROW_TRANSITION = {
  type: "spring",
  duration: 0.55,
  bounce: 0.38,
};

const CONTENT_OPEN_TRANSITION = {
  type: "spring",
  duration: 0.58,
  bounce: 0.32,
};

const CONTENT_CLOSE_TRANSITION = {
  type: "spring",
  duration: 0.46,
  bounce: 0.26,
};

const DESCRIPTION_TRANSITION = {
  duration: 0.18,
  ease: EASE_OUT,
};

const CHEVRON_TRANSITION = {
  type: "spring",
  duration: 0.42,
  bounce: 0.28,
};

function useControllableAccordionValue({
  value,
  defaultValue,
  onValueChange,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);
  const isControlled = value !== undefined;
  const currentValue = value ?? internalValue;

  const setValue = useCallback(
    (next) => {
      if (!isControlled) {
        setInternalValue(next);
      }

      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return [currentValue, setValue];
}

function BouncyAccordionRow({
  item,
  open,
  startsGroup,
  endsGroup,
  separatedFromPrevious,
  contentId,
  triggerId,
  reduce,
  classNames,
  onToggle,
}) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  const rafRef = useRef(null);
  const observerRef = useRef(null);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const measure = () => {
      setContentHeight(node.offsetHeight);
    };

    measure();

    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(measure);
      observerRef.current.observe(node);
    }

    if (!open) return;

    const imgs = Array.from(node.querySelectorAll("img"));
    const unloaded = imgs.filter(
      (img) => !img.complete || img.naturalWidth === 0,
    );
    if (unloaded.length === 0) return;

    Promise.all(
      unloaded.map((img) => {
        if (typeof img.decode === "function")
          return img.decode().catch(() => {});
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }),
    ).then(() => {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(measure);
      });
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open]);

  const hasContent = !!item.description || !!item.content;

  return (
    <motion.div
      layout="position"
      initial={false}
      style={{ marginTop: separatedFromPrevious ? 12 : 0 }}
      transition={reduce ? { duration: 0 } : ROW_TRANSITION}
    >
      <motion.div
        data-state={open ? "open" : "closed"}
        initial={false}
        animate={{
          borderTopLeftRadius: startsGroup ? 12 : 0,
          borderTopRightRadius: startsGroup ? 12 : 0,
          borderBottomLeftRadius: endsGroup ? 12 : 0,
          borderBottomRightRadius: endsGroup ? 12 : 0,
        }}
        transition={reduce ? { duration: 0 } : ROW_TRANSITION}
        className={cn(
          "overflow-hidden bg-neutral-800/80 light:bg-zinc-100/80 border border-neutral-700/50 light:border-zinc-200",
          item.disabled && "opacity-50",
          classNames?.item,
        )}
      >
        <button
          id={triggerId}
          type="button"
          disabled={item.disabled}
          aria-expanded={open}
          aria-controls={contentId}
          onClick={onToggle}
          className={cn(
            "flex min-h-[54px] w-full items-center gap-4 px-5 text-left outline-none transition-colors",
            "focus-visible:bg-neutral-700/25 light:focus-visible:bg-zinc-200/50",
            "disabled:pointer-events-none",
            classNames?.trigger,
          )}
        >
          {item.icon ? (
            <span
              className={cn(
                "grid h-7 w-7 shrink-0 place-items-center text-neutral-400 light:text-neutral-500",
                classNames?.icon,
              )}
            >
              {item.icon}
            </span>
          ) : null}
          <span
            className={cn(
              "min-w-0 flex-1 text-sm font-medium text-neutral-200 light:text-neutral-800",
              classNames?.title,
            )}
          >
            {item.title}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduce ? { duration: 0 } : CHEVRON_TRANSITION}
            className={cn(
              "grid h-6 w-6 shrink-0 place-items-center text-neutral-400 light:text-neutral-500",
              classNames?.chevron,
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>

        <motion.div
          layout="size"
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          aria-hidden={!open}
          initial={false}
          style={{ height: open && hasContent ? contentHeight : 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : open
                ? CONTENT_OPEN_TRANSITION
                : CONTENT_CLOSE_TRANSITION
          }
          className={cn("overflow-hidden", classNames?.content)}
        >
          <motion.div
            ref={contentRef}
            animate={{
              opacity: open ? 1 : 0,
            }}
            transition={reduce ? { duration: 0 } : DESCRIPTION_TRANSITION}
            className="px-5 pb-5"
          >
            {item.content ? (
              <div className="text-sm leading-6 text-neutral-300 light:text-neutral-600">
                {item.content}
              </div>
            ) : item.description ? (
              <div
                className={cn(
                  "text-sm leading-6 text-neutral-300 light:text-neutral-600",
                  classNames?.description,
                )}
              >
                {item.description}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function BouncyAccordion({
  items,
  value,
  defaultValue = null,
  onValueChange,
  collapsible = true,
  className,
  classNames,
}) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [activeValue, setActiveValue] = useControllableAccordionValue({
    value,
    defaultValue,
    onValueChange,
  });
  const activeIndex = items.findIndex((item) => item.id === activeValue);

  const toggleItem = useCallback(
    (id) => {
      if (activeValue === id) {
        if (collapsible) {
          setActiveValue(null);
        }
        return;
      }

      setActiveValue(id);
    },
    [activeValue, collapsible, setActiveValue],
  );

  return (
    <div className={cn("w-full", className, classNames?.root)}>
      {items.map((item, index) => {
        const open = activeValue === item.id;
        const previousIsOpen = activeIndex === index - 1;
        const nextIsOpen = activeIndex === index + 1;
        const startsGroup = open || index === 0 || previousIsOpen;
        const endsGroup = open || index === items.length - 1 || nextIsOpen;
        const separatedFromPrevious = index > 0 && (open || previousIsOpen);
        const contentId = `${baseId}-${item.id}-content`;
        const triggerId = `${baseId}-${item.id}-trigger`;

        return (
          <BouncyAccordionRow
            key={item.id}
            item={item}
            open={open}
            startsGroup={startsGroup}
            endsGroup={endsGroup}
            separatedFromPrevious={separatedFromPrevious}
            contentId={contentId}
            triggerId={triggerId}
            reduce={reduce}
            classNames={classNames}
            onToggle={() => toggleItem(item.id)}
          />
        );
      })}
    </div>
  );
}
