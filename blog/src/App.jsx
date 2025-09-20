import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ResourcesPage from "./pages/Resources";
import HackathonsPage from "./pages/Hackathons";
import WhyStartBlog from "./pages/blogs/WhyStartBlog";
import FiveXHackathonWinner from "./pages/blogs/FiveXHackathonWinner";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/blogs/why-start-blog" element={<WhyStartBlog />} />
        <Route path="/blogs/5x-hackathon-winner" element={<FiveXHackathonWinner />} />
      </Routes>
    </BrowserRouter>
  );
}
