import React, { useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onRemove={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }) {
  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="pointer-events-auto w-80 sm:w-96 bg-[#18181b] light:bg-white shadow-xl"
    >
      <div className="p-4 flex items-start gap-3">
        <div className={`mt-0.5 w-2 h-2 shrink-0 rounded-full ${isSuccess ? "bg-[#38bdf8]" : isError ? "bg-red-500" : "bg-zinc-400"}`} />
        <p className="text-sm text-[#f5f5f7] light:text-zinc-900 font-serif leading-snug flex-1">
          {toast.message}
        </p>
        <button
          onClick={onRemove}
          className="ml-2 text-zinc-500 hover:text-[#f5f5f7] light:hover:text-zinc-900 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
