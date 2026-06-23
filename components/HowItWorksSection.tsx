"use client";

import { useState } from "react";
import { HOW_STEPS } from "@/lib/petData";

export default function HowItWorksSection() {
  const [open, setOpen] = useState(-1);

  return (
    <section id="how" className="bg-[#FFD8CE] px-6 pt-2 pb-14 scroll-mt-[72px]">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="font-nunito font-black text-[#9C4A3C] text-3xl text-center mb-2">How PawCheck works</h2>
        <p className="text-center text-[#B5604F] mb-7">Tap a step to learn more.</p>
        <div className="grid gap-4 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {HOW_STEPS.map((h, i) => {
            const isOpen = open === i;
            return (
              <button
                key={h.n}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`text-center w-full bg-white rounded-[22px] p-6 shadow-md transition-all border-2 ${
                  isOpen ? "border-coral" : "border-transparent"
                }`}
              >
                <div className="w-[52px] h-[52px] rounded-full bg-coral text-white font-nunito font-black text-xl flex items-center justify-center mx-auto mb-3.5">
                  {h.n}
                </div>
                <h3 className="font-nunito font-extrabold text-lg mb-1.5 flex items-center justify-center gap-2">
                  {h.icon} {h.title}
                </h3>
                {isOpen && <p className="mt-2.5 text-muted text-sm leading-relaxed">{h.body}</p>}
                <span className="block mt-2 text-coral font-nunito font-extrabold text-xs">
                  {isOpen ? "Show less ▲" : "Learn more ▼"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
