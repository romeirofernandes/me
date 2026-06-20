import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageModal({ src, alt, caption, className = "", containerClassName = "", gallery, galleryIndex }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(galleryIndex ?? 0);

  const hasGallery = !!gallery && gallery.length > 0;
  const currentSrc = hasGallery ? gallery[activeIndex].src : src;
  const currentAlt = hasGallery ? gallery[activeIndex].alt : alt;
  const currentCaption = hasGallery ? (gallery[activeIndex].caption ?? caption) : caption;

  const goNext = useCallback(() => {
    if (!gallery) return;
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery]);

  const goPrev = useCallback(() => {
    if (!gallery) return;
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery]);

  useEffect(() => {
    if (!isOpen || !hasGallery) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, hasGallery, goNext, goPrev]);

  return (
    <>
      <div className={`mb-8 ${containerClassName}`}>
        <div
          className="rounded-2xl p-2 h-full bg-neutral-800 backdrop-blur-xl shadow-lg light:bg-background/50"
        >
          <div
            className="rounded-lg overflow-hidden h-full bg-neutral-800 backdrop-blur-sm shadow-md light:bg-card/70"
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className={`w-full cursor-zoom-in hover:opacity-90 transition-opacity ${className}`}
              onClick={() => {
                if (hasGallery) setActiveIndex(galleryIndex);
                setIsOpen(true);
              }}
            />
          </div>
        </div>
        {caption && (
          <p className="text-xs text-zinc-500 mt-2 text-center italic">
            {caption}
          </p>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setIsOpen(false)}
          >
            {hasGallery && gallery.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors cursor-pointer font-['Inter']"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors cursor-pointer font-['Inter']"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-sm text-white/60 bg-black/40 px-3 py-1 rounded-full font-['Inter']">
                  {activeIndex + 1} / {gallery.length}
                </div>
              </>
            )}
            <motion.img
              key={activeIndex}
              src={currentSrc}
              alt={currentAlt}
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain cursor-zoom-out"
              style={{ touchAction: "pinch-zoom" }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
            {currentCaption && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-zinc-300 bg-black/50 px-4 py-2 rounded-lg max-w-[80vw] text-center font-['Inter']"
              >
                {currentCaption}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
