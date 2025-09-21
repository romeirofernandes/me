import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

export default function ImageModal({ src, alt, caption, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  const resetZoom = () => {
    setScale(1);
  };

  return (
    <>
      {/* Thumbnail Image */}
      <div className="mb-6">
        <img
          src={src}
          alt={alt}
          className={`w-full rounded-lg border border-[#232323] cursor-pointer hover:opacity-90 transition-opacity ${className}`}
          onClick={() => setIsOpen(true)}
        />
        {caption && (
          <p className="text-xs text-zinc-500 mt-2 text-center italic">
            {caption}
          </p>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Controls */}
            <div className="absolute top-4 right-4 z-60 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                }}
                className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors text-xs"
              >
                1:1
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-[90vw] max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={src}
                alt={alt}
                className="w-full h-auto rounded-lg"
                style={{ scale }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                dragElastic={0.1}
              />
            </motion.div>

            {/* Caption in Modal */}
            {caption && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-zinc-300 bg-black/50 px-4 py-2 rounded-lg max-w-[80vw] text-center"
              >
                {caption}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}