import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ResourcesPage from "./pages/Resources";
import WhyStartBlog from "./pages/blogs/WhyStartBlog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/blogs/why-start-blog" element={<WhyStartBlog />} />
      </Routes>
    </BrowserRouter>
  );
}
