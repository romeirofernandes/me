import React, { useState } from "react";
import { subscribeToNewsletter, isEmailSubscribed } from "../lib/newsletter";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      if (!alreadySubscribed) {
        await subscribeToNewsletter(email);
        if (onSuccess) onSuccess();
      }
      setEmail("");
      toast.success("Subscribed! You'll get blog updates.");
    } catch (err) {
      console.error("Subscription error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="py-4 px-6">
        <h2 className="text-xl font-semibold mb-2 text-left">
          Subscribe to Blog Updates
        </h2>
        <p className="text-muted-foreground mb-4 text-left text-sm">
          Get the latest posts delivered to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-row gap-2"
        >
          <Input
            type="email"
            className="flex-1 text-sm"
            placeholder="Get blog updates by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            aria-label="Email address"
          />
          <Button
            type="submit"
            className="font-medium text-sm"
            disabled={loading}
            aria-label="Subscribe"
          >
            {loading ? "..." : "Join"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
