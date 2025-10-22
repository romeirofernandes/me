import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageModal({ src, alt, caption, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail Image */}
      <div className="mb-6">
        <img
          src={src}
          alt={alt}
          className={`w-full rounded-lg border border-[#232323] cursor-zoom-in hover:opacity-90 transition-opacity ${className}`}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.img
              src={src}
              alt={alt}
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
            {caption && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-zinc-300 bg-black/50 px-4 py-2 rounded-lg max-w-[80vw] text-center"
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