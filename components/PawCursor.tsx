"use client";

import { useEffect, useRef } from "react";

export default function PawCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef(0);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const drop = (ev: MouseEvent) => {
      const now = Date.now();
      if (now - lastRef.current < 70) return;
      lastRef.current = now;

      const span = document.createElement("span");
      span.textContent = "🐾";
      const r = Math.random() * 60 - 30;
      span.className = "paw-trail";
      span.style.left = `${ev.clientX - 10}px`;
      span.style.top = `${ev.clientY - 10}px`;
      span.style.setProperty("--r", `${r}deg`);
      span.style.transform = `rotate(${r}deg)`;
      layer.appendChild(span);
      setTimeout(() => span.remove(), 1100);
    };

    window.addEventListener("mousemove", drop);
    return () => window.removeEventListener("mousemove", drop);
  }, []);

  return <div ref={layerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
