"use client";

import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const GOO_SPRING = {
  type: "spring",
  visualDuration: 0.32,
  bounce: 0.28,
};
const HOVER_CLOSE_DELAY = 120;

const lerp = (a, b, t) => a + (b - a) * t;

const buildGeo = (tW, tH, cW, cH, side, align, gap, panelRadius) => {
  const py = side === "bottom" ? tH + gap : -(gap + cH);
  const px = align === "start" ? 0 : align === "end" ? tW - cW : (tW - cW) / 2;
  const left = Math.min(0, px);
  const top = Math.min(0, py);
  const layerW = Math.max(tW, px + cW) - left;
  const layerH = Math.max(tH, py + cH) - top;
  const triggerRadius = Math.min(tH / 2, panelRadius);
  return {
    layerW,
    layerH,
    left,
    top,
    trigger: { x: -left, y: -top, w: tW, h: tH, r: triggerRadius },
    panel: { x: px - left, y: py - top, w: cW, h: cH, r: panelRadius },
  };
};

const insetFor = (rect) =>
  `inset(${rect.y}px ${rect.layerW - (rect.x + rect.w)}px ${rect.layerH - (rect.y + rect.h)}px ${rect.x}px round ${rect.r}px)`;

const insetForProgress = (geo, p) => {
  const t = geo.trigger;
  const pn = geo.panel;
  return insetFor({
    x: lerp(t.x, pn.x, p),
    y: lerp(t.y, pn.y, p),
    w: lerp(t.w, pn.w, p),
    h: lerp(t.h, pn.h, p),
    r: lerp(t.r, pn.r, p),
    layerW: geo.layerW,
    layerH: geo.layerH,
  });
};

const PopoverContext = createContext(null);

const usePopoverContext = (component) => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error(`${component} must be used within <Popover>`);
  return ctx;
};

const mergeRefs = (...refs) => (node) => {
  for (const ref of refs) {
    if (typeof ref === "function") ref(node);
    else if (ref && typeof ref === "object") ref.current = node;
  }
};

export function Popover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger = "click",
  side = "bottom",
  align = "center",
  sideOffset = 14,
  panelRadius = 16,
  gooStrength = 8,
  className,
}) {
  const reduce = useReducedMotion() ?? false;
  const gooId = useId().replace(/:/g, "");
  const contentId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(null);
  const progress = useMotionValue(defaultOpen ? 1 : 0);

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const controlled = controlledOpen !== undefined;
  const open = controlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (next) => {
      if (!controlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openHover = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose, setOpen]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY);
  }, [cancelClose, setOpen]);

  const toggle = useCallback(() => setOpen(!open), [setOpen, open]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  useEffect(() => {
    const animation = animate(
      progress,
      open ? 1 : 0,
      reduce ? { duration: 0 } : GOO_SPRING,
    );
    return () => animation.stop();
  }, [open, progress, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onPointer = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target))
        setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    if (trigger === "click")
      window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen, trigger]);

  const ctx = useMemo(
    () => ({
      open,
      setOpen,
      toggle,
      openHover,
      scheduleClose,
      triggerMode: trigger,
      side,
      align,
      gap: sideOffset,
      panelRadius,
      gooStrength,
      reduce,
      gooId,
      contentId,
      progress,
      triggerRef,
    }),
    [
      open, setOpen, toggle, openHover, scheduleClose,
      trigger, side, align, sideOffset, panelRadius,
      gooStrength, reduce, gooId, contentId, progress,
    ],
  );

  const hoverHandlers =
    trigger === "hover"
      ? { onMouseEnter: openHover, onMouseLeave: scheduleClose }
      : {};

  return (
    <PopoverContext.Provider value={ctx}>
      <div
        ref={rootRef}
        className={cn("relative inline-flex isolate", className)}
        {...hoverHandlers}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children }) {
  const ctx = usePopoverContext("PopoverTrigger");

  if (!isValidElement(children)) return children;

  const child = children;
  const childProps = child.props;
  const childRef = childProps.ref;

  const compose = (name, handler) => (event) => {
    childProps[name]?.(event);
    if (!event.defaultPrevented) handler();
  };

  const handlers =
    ctx.triggerMode === "hover"
      ? {
          onFocus: compose("onFocus", ctx.openHover),
          onBlur: compose("onBlur", ctx.scheduleClose),
        }
      : { onClick: compose("onClick", ctx.toggle) };

  return (
    child.type !== undefined &&
    cloneElement(child, {
      ...handlers,
      ref: mergeRefs(childRef, (node) => {
        ctx.triggerRef.current = node;
      }),
      className: cn("relative z-0", childProps.className),
      "aria-haspopup": "dialog",
      "aria-expanded": ctx.open,
      "aria-controls": ctx.open ? ctx.contentId : undefined,
      "data-state": ctx.open ? "open" : "closed",
    })
  );
}

const ALIGN_ORIGIN = {
  start: "left",
  center: "center",
  end: "right",
};

export function PopoverContent({ children, className }) {
  const ctx = usePopoverContext("PopoverContent");
  const {
    side, align, gap, panelRadius, gooStrength, reduce, gooId,
    contentId, progress, triggerRef, open, triggerMode,
    openHover, scheduleClose,
  } = ctx;

  const measureRef = useRef(null);
  const blobRef = useRef(null);
  const clipRef = useRef(null);
  const geoRef = useRef(null);

  const [sizes, setSizes] = useState({ tW: 0, tH: 0, cW: 0, cH: 0 });
  const [showLayer, setShowLayer] = useState(false);

  useLayoutEffect(() => {
    const triggerNode = triggerRef.current;
    const contentNode = measureRef.current;
    if (!contentNode) return;

    const measure = () => {
      const tW = triggerNode?.offsetWidth ?? 0;
      const tH = triggerNode?.offsetHeight ?? 0;
      const cW = contentNode.offsetWidth;
      const cH = contentNode.offsetHeight;
      setSizes((prev) =>
        prev.tW === tW && prev.tH === tH && prev.cW === cW && prev.cH === cH
          ? prev
          : { tW, tH, cW, cH },
      );
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(contentNode);
    if (triggerNode) observer.observe(triggerNode);
    return () => observer.disconnect();
  }, [triggerRef]);

  const geo = useMemo(
    () =>
      buildGeo(sizes.tW, sizes.tH, sizes.cW, sizes.cH, side, align, gap, panelRadius),
    [sizes, side, align, gap, panelRadius],
  );

  const render = useCallback((g, p) => {
    if (!g || g.layerW === 0) return;
    const clip = insetForProgress(g, p);
    if (blobRef.current) blobRef.current.style.clipPath = clip;
    if (clipRef.current) clipRef.current.style.clipPath = clip;
  }, []);

  useLayoutEffect(() => {
    geoRef.current = geo;
    render(geo, progress.get());
  }, [geo, progress, render]);

  useMotionValueEvent(progress, "change", (p) => {
    render(geoRef.current, p);
    if (p === 0 && showLayer) setShowLayer(false);
    if (p > 0 && !showLayer) setShowLayer(true);
  });

  const hoverHandlers =
    triggerMode === "hover"
      ? { onMouseEnter: openHover, onMouseLeave: scheduleClose }
      : {};

  return (
    <>
      <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
        <title>Popover goo filter</title>
        <defs>
          <filter id={gooId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={gooStrength} result="blur" />
            <feColorMatrix
              in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {showLayer && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-[-1]"
          style={{
            left: geo.left,
            top: geo.top,
            width: geo.layerW,
            height: geo.layerH,
            filter: reduce ? undefined : `url(#${gooId})`,
            opacity: open ? 1 : 0,
            transition: "opacity 0.18s ease-out",
          }}
        >
          <div
            ref={blobRef}
            className="absolute inset-0 bg-neutral-800"
            style={{ clipPath: insetForProgress(geo, progress.get()) }}
          />
        </div>
      )}

      <div
        className="pointer-events-none absolute z-10"
        style={{
          left: geo.left,
          top: geo.top,
          width: geo.layerW,
          height: geo.layerH,
        }}
      >
        <div
          ref={clipRef}
          inert={!open}
          className="absolute inset-0"
          style={{
            clipPath: insetForProgress(geo, progress.get()),
            pointerEvents: open ? "auto" : "none",
            opacity: open ? 1 : 0,
            transition: "opacity 0.18s ease-out",
          }}
        >
          <div
            ref={measureRef}
            id={contentId}
            role="dialog"
            {...hoverHandlers}
            style={{
              position: "absolute",
              left: geo.panel.x,
              top: geo.panel.y,
              transformOrigin: `${ALIGN_ORIGIN[align]} ${side === "bottom" ? "top" : "bottom"}`,
            }}
            className={cn(
              "w-max max-w-[min(92vw,20rem)] p-3 text-sm font-light text-neutral-200 outline-none bg-neutral-800 rounded-xl",
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
