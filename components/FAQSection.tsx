"use client";

import { useState } from "react";
import { FAQ_CATEGORIES } from "@/lib/petData";

export default function FAQSection() {
  const [open, setOpen] = useState("0-0");

  return (
    <section id="faq" className="bg-softyellow px-6 pt-2 pb-16 scroll-mt-[72px]">
      <div className="max-w-[760px] mx-auto">
        <h2 className="font-nunito font-black text-3xl sm:text-4xl text-center mb-8">Frequently asked questions</h2>

        <div className="flex flex-col gap-9">
          {FAQ_CATEGORIES.map((cat, catIndex) => (
            <div key={cat.category}>
              <h3 className="font-nunito font-extrabold text-base text-[#9C7A00] uppercase tracking-wide mb-3">
                {cat.category}
              </h3>
              <div className="flex flex-col gap-3.5">
                {cat.items.map((f, i) => {
                  const key = `${catIndex}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={f.q} className="bg-white rounded-[18px] overflow-hidden shadow-md">
                      <button
                        onClick={() => setOpen(isOpen ? "" : key)}
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
          ))}
        </div>
      </div>
    </section>
  );
}
