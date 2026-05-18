import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Border1 from "./Border1";

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
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast }) {
  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <Border1>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-auto w-96 bg-[#18181b] light:bg-white border border-[#232323] light:border-zinc-300 shadow-lg"
      >
        <div className="p-4 flex items-start gap-3">
          <div className={`mt-0.5 w-2 h-2 shrink-0 ${isSuccess ? "bg-[#38bdf8]" : isError ? "bg-red-500" : "bg-zinc-400"}`} />
          <p className="text-sm text-[#f5f5f7] light:text-zinc-900 font-serif leading-snug">
            {toast.message}
          </p>
        </div>
      </motion.div>
    </Border1>
  );
}
