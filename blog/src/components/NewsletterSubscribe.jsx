import React, { useState } from "react";
import { subscribeToNewsletter, isEmailSubscribed } from "../lib/newsletter";
import { toast } from "sonner";

export default function NewsletterSubscribe({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const alreadySubscribed = await isEmailSubscribed(email);
      if (alreadySubscribed) {
        toast.success("You're already subscribed!");
        setLoading(false);
        return;
      }
      await subscribeToNewsletter(email);
      setEmail("");
      if (onSuccess) onSuccess();
      toast.success("Subscribed! You'll get blog updates.");
    } catch (err) {
      console.error("Subscription error:", err); 
      toast.error("Something went wrong. Try again.");
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
        className="button bg-primary text-primary-foreground font-medium px-2 py-1 rounded-md hover:bg-primary/90 transition disabled:opacity-60 text-md"
        disabled={loading}
        aria-label="Subscribe"
      >
        {loading ? "..." : "Join"}
      </button>
    </form>
  );
}
