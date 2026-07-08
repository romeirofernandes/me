import { useEffect, useRef, useState } from "react";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

export default function PdfViewer({ url }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const canvases = [];
    let cancelled = false;

    async function init() {
      try {
        const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

        const fullUrl = new URL(url, window.location.origin).href;
        const pdf = await pdfjsLib.getDocument({ url: fullUrl }).promise;
        if (cancelled) return;

        setLoading(false);
        const container = containerRef.current;
        if (!container) return;

        const dpr = window.devicePixelRatio || 1;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const unscaledViewport = page.getViewport({ scale: 1 });
          const containerWidth = container.offsetWidth;
          const scale = containerWidth / unscaledViewport.width;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = Math.round(viewport.width * dpr);
          canvas.height = Math.round(viewport.height * dpr);
          canvas.style.width = `${Math.round(viewport.width)}px`;
          canvas.style.height = `${Math.round(viewport.height)}px`;
          const isLast = i === pdf.numPages;
          canvas.className = `block rounded-lg shadow-md ${isLast ? "" : "mb-4"}`;

          container.appendChild(canvas);
          canvases.push(canvas);

          const ctx = canvas.getContext("2d");
          ctx.scale(dpr, dpr);
          await page.render({ canvasContext: ctx, viewport }).promise;
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    init();

    return () => {
      cancelled = true;
      canvases.forEach((c) => c.remove());
    };
  }, [url]);

  if (error) {
    return (
      <div className="text-white/60 py-8 text-center text-sm">
        Could not load resume.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      {loading && (
        <div className="flex justify-center py-12">
          <div className="size-7 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
