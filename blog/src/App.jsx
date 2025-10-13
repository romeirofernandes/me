import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ResourcesPage from "./pages/Resources";
import HackathonsPage from "./pages/Hackathons";
import WhyStartBlog from "./pages/blogs/WhyStartBlog";
import FiveXHackathonWinner from "./pages/blogs/FiveXHackathonWinner";
import MacbookExamsAndMore from "./pages/blogs/MacbookExamsAndMore";
import { Analytics } from "@vercel/analytics/react";
import LiveCursors from "./components/LiveCursors";

export default function App() {
  const [cursorsEnabled, setCursorsEnabled] = useState(true);

  return (
    <>
      <LiveCursors
        isEnabled={cursorsEnabled}
        onToggle={() => setCursorsEnabled(!cursorsEnabled)}
      />
      <Analytics />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/blogs/why-start-blog" element={<WhyStartBlog />} />
        <Route path="/blogs/5x-hackathon-winner" element={<FiveXHackathonWinner />} />
        <Route path="/blogs/macbook-exams-and-more" element={<MacbookExamsAndMore />} />
      </Routes>
    </>
  );
}
