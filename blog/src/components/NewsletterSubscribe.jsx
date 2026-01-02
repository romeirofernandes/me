import React, { useState } from "react";
import { subscribeToNewsletter } from "../lib/newsletter";

export default function NewsletterSubscribe({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      await subscribeToNewsletter(email);
      setSuccess(true);
      setEmail("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Subscription error:", err); 
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 animate-fade-in"
      style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)" }}
    >
      <input
        type="email"
        className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground px-2 py-1 text-base"
        placeholder="Get blog updates by email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
        aria-label="Email address"
      />
      <button
        type="submit"
        className="button bg-primary text-primary-foreground font-semibold px-4 py-1.5 rounded-md hover:bg-primary/90 transition disabled:opacity-60 text-base"
        disabled={loading}
        aria-label="Subscribe"
      >
        {loading ? "..." : "Join"}
      </button>
      {error && <span className="text-destructive text-xs ml-2">{error}</span>}
      {success && <span className="text-green-600 text-xs ml-2">You're in! 🎉</span>}
    </form>
  );
}
