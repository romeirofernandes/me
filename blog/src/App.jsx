import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ResourcesPage from "./pages/Resources";
import HackathonsPage from "./pages/Hackathons";
import WhyStartBlog from "./pages/blogs/WhyStartBlog";
import FiveXHackathonWinner from "./pages/blogs/FiveXHackathonWinner";
import MacbookExamsAndMore from "./pages/blogs/MacbookExamsAndMore";
import SevenThousandDaysOld from "./pages/blogs/SevenThousandDaysOld";
import GoogleGenAIExchange from "./pages/blogs/GoogleGenAIExchange";
import QrataInternship from "./pages/blogs/QrataInternship";
import ScrollToTop from "./components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import LiveCursors from "./components/LiveCursors";
import ThemeToggle from "./components/ThemeToggle";
import Unsubscribe from "./pages/Unsubscribe";
import AdminSendMail from "./pages/AdminSendMail";
import { ToastProvider } from "./components/Toast";

export default function App() {
  const [cursorsEnabled, setCursorsEnabled] = useState(true);

  return (
    <ToastProvider>
      <ThemeToggle />
      <LiveCursors
        isEnabled={cursorsEnabled}
        onToggle={() => setCursorsEnabled(!cursorsEnabled)}
      />
      <Analytics />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/blogs/why-start-blog" element={<WhyStartBlog />} />
        <Route path="/blogs/5x-hackathon-winner" element={<FiveXHackathonWinner />} />
        <Route path="/blogs/macbook-exams-and-more" element={<MacbookExamsAndMore />} />
        <Route path="/blogs/7305-days-old-now" element={<SevenThousandDaysOld />} />
        <Route path="/blogs/genai-hackathon-25" element={<GoogleGenAIExchange />} />
        <Route path="/blogs/qrata-internship" element={<QrataInternship />} />
        <Route path="/send-email" element={<AdminSendMail />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
      </Routes>
    </ToastProvider>
  );
}
