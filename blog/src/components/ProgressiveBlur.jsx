import { useState, useEffect, useRef } from "react";

const ProgressiveBlur = ({
  className = "",
  backgroundColor = "var(--progressive-blur-bg)",
  position = "top",
  height = "150px",
  blurAmount = "4px",
  offset,
}) => {
  const [visible, setVisible] = useState(!offset);
  const sentinelRef = useRef(null);
  const isTop = position === "top";

  useEffect(() => {
    if (!offset || !isTop) {
      setVisible(true);
      return;
    }
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [offset, isTop]);

  return (
    <>
      {isTop && offset && (
        <div
          ref={sentinelRef}
          className="pointer-events-none absolute left-0"
          style={{ top: offset, width: 1, height: 1 }}
        />
      )}
      <div
        className={`pointer-events-none fixed left-0 w-full select-none transition-opacity duration-300 ${className}`}
        style={{
          opacity: visible ? 1 : 0,
          [isTop ? "top" : "bottom"]: 0,
          height,
          background: isTop
            ? `linear-gradient(to top, transparent, ${backgroundColor})`
            : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
          maskImage: isTop
            ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
            : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
          WebkitBackdropFilter: `blur(${blurAmount})`,
          backdropFilter: `blur(${blurAmount})`,
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
      />
    </>
  );
};

export { ProgressiveBlur };
export default ProgressiveBlur;
