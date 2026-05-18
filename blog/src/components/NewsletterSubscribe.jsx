import React, { useState } from "react";
import { subscribeToNewsletter, isEmailSubscribed } from "../lib/newsletter";
import { useToast } from "./Toast";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Border1 from "./Border1";

export default function NewsletterSubscribe({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      addToast("Enter a valid email.", "error");
      return;
    }
    setLoading(true);
    try {
      const alreadySubscribed = await isEmailSubscribed(email);
      if (!alreadySubscribed) {
        await subscribeToNewsletter(email);
        if (onSuccess) onSuccess();
        addToast("You're in! I'll send updates when there's something worth reading.", "success");
      } else {
        addToast("You're already with us. You'll get your reminders regularly.", "success");
      }
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      addToast("Something went wrong. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Border1>
      <Card className="w-full max-w-3xl mx-auto border-0 shadow-none rounded-none light:bg-white dark:bg-zinc-900">
        <CardContent className="py-4 px-6">
          <h2 className="text-lg font-semibold mb-1 text-left light:text-zinc-900">
            If you want, I can email you when I post something new
          </h2>
          <p className="text-muted-foreground mb-4 text-left text-sm light:text-zinc-500">
            No spam, no noise. Just occasional updates.
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-row gap-2"
          >
            <Input
              type="email"
              className="flex-1 text-sm rounded-none light:bg-zinc-50 light:text-zinc-900 light:caret-zinc-900 light:placeholder:text-zinc-400 light:border-zinc-300"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              aria-label="Email address"
            />
            <Button
              type="submit"
              className="font-medium text-sm rounded-none"
              disabled={loading}
              aria-label="Subscribe"
            >
              {loading ? "..." : "Send me updates"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Border1>
  );
}
