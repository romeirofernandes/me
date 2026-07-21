import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { bind } from "@/lib/cuelume";
import Landing from "./pages/Landing";

export default function App() {
  useEffect(() => {
    bind();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
