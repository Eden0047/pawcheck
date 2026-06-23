"use client";

import { useState } from "react";
import { FAQS } from "@/lib/petData";

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-softyellow px-6 pt-2 pb-16 scroll-mt-[72px]">
      <div className="max-w-[760px] mx-auto">
        <h2 className="font-nunito font-black text-3xl sm:text-4xl text-center mb-8">Frequently asked questions</h2>
        <div className="flex flex-col gap-3.5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-white rounded-[18px] overflow-hidden shadow-md">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 font-nunito font-extrabold text-lg"
                >
                  <span>{f.q}</span>
                  <span className="text-coral text-2xl flex-none">{isOpen ? "–" : "+"}</span>
                </button>
                {isOpen && <p className="px-6 pb-[22px] text-muted text-base leading-relaxed">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
