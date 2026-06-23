"use client";

import { PETS, PetType } from "@/lib/petData";

interface HeroSectionProps {
  selectedPet: PetType | null;
  onSelectPet: (pet: PetType) => void;
}

export default function HeroSection({ selectedPet, onSelectPet }: HeroSectionProps) {
  const current = PETS.find((p) => p.type === selectedPet);

  return (
    <section className="max-w-[1080px] mx-auto px-6 pt-14 pb-10 text-center">
      <h1 className="font-nunito font-black text-coral text-5xl sm:text-6xl leading-tight tracking-tight mb-3">
        PawCheck <span className="text-5xl">🐾</span>
      </h1>
      <p className="text-muted text-lg sm:text-xl font-medium max-w-xl mx-auto mb-10">
        Trusted health advice for your furry family
      </p>

      <h2 className="font-nunito font-black text-3xl mb-7">Choose your pet</h2>
      <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
        {PETS.map((p) => {
          const selected = p.type === selectedPet;
          return (
            <button
              key={p.type}
              onClick={() => onSelectPet(p.type)}
              className={`flex flex-col items-center gap-2 w-[108px] py-4 rounded-3xl bg-white border-[3px] transition-all shadow-md ${
                selected ? "border-teal shadow-[0_0_0_6px_rgba(78,205,196,0.25)] animate-petBounce" : "border-transparent"
              }`}
            >
              <span className="text-5xl leading-none">{p.emoji}</span>
              <span className="font-nunito font-extrabold text-base">{p.label}</span>
            </button>
          );
        })}
      </div>

      {current && (
        <p className="font-nunito font-extrabold text-2xl mt-9">
          Got it! Let&apos;s check on your {current.label} {current.emoji}
        </p>
      )}
    </section>
  );
}
