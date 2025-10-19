import React, { useState } from "react";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ContactSection() {
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Try sending with EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_email: form.email,
          name: form.email, // or use a separate name field if you have one
          message: form.message,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ email: "", message: "" });
    } catch (err) {
      // Fallback to Firebase if EmailJS fails
      try {
        await addDoc(collection(db, "messages"), {
          email: form.email,
          message: form.message,
          created: serverTimestamp(),
        });
        setStatus("sent");
        setForm({ email: "", message: "" });
      } catch (err2) {
        setStatus("error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-[#3c3b3b] rounded-xl p-4 sm:p-6 md:p-8 mt-12 mb-4 w-full max-w-2xl mx-auto">
      <section
        id="contact"
        className="w-full flex flex-col md:flex-row items-start justify-between gap-8"
      >
        <div className="flex-1 flex flex-col justify-center mb-6 md:mb-0 text-left">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-sm">
            Have an idea or want to collaborate? <br />
            Drop a message and I’ll get back to you soon.
          </p>
        </div>
        <div className="flex-1 flex flex-col items-start md:items-end w-full">
          <form
            className="flex flex-col gap-3 w-full max-w-full sm:max-w-xs"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-[#18181b] rounded px-3 py-2 text-white focus:outline-none text-sm w-full"
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              className="bg-[#18181b] rounded px-3 py-2 text-white focus:outline-none text-sm w-full"
              name="message"
              placeholder="Your message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />
            <motion.button
              type="submit"
              className="bg-[#f5f5f7] text-[#080808] rounded px-4 py-2 font-semibold mt-2 text-sm"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Sending..."
                : status === "error"
                ? "Error! Try again"
                : "Send"}
            </motion.button>
            {status === "sent" && (
              <span className="text-green-400 text-xs mt-1">Message sent!</span>
            )}
          </form>
          <span className="text-xs text-gray-400 mt-4">
            theromeirofernandes@gmail.com
          </span>
        </div>
      </section>
    </div>
  );
}
