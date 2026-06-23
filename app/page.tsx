"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PetPickerSection from "@/components/PetPickerSection";
import SymptomChecker from "@/components/SymptomChecker";
import ResultsPanel, { CheckResult } from "@/components/ResultsPanel";
import EmergencySection from "@/components/EmergencySection";
import CommunitySection from "@/components/CommunitySection";
import FAQSection from "@/components/FAQSection";
import WaveDivider from "@/components/WaveDivider";
import { PETS, PetType, severityColor } from "@/lib/petData";

export default function Home() {
  const [pet, setPet] = useState<PetType | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  const current = PETS.find((p) => p.type === pet);

  const handleSelectPet = (next: PetType) => {
    setPet(next);
    setSymptoms([]);
    setResult(null);
    setLoading(false);
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]));
  };

  const handleSubmit = async () => {
    if (!pet || symptoms.length === 0) return;
    setLoading(true);
    setResult(null);

    const start = Date.now();
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pet, symptoms, severity }),
      });
      const data = (await res.json()) as CheckResult;

      const elapsed = Date.now() - start;
      const remaining = Math.max(1500 - elapsed, 0);
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, remaining);
    } catch {
      setLoading(false);
    }
  };

  const issuesSummary = symptoms.length
    ? symptoms.slice(0, 3).join(", ") + (symptoms.length > 3 ? "…" : "")
    : "General check-up";

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <TopNav />
      <HeroSection />

      <WaveDivider fill="#FFD8CE" bg="#FFF8F0" />
      <HowItWorksSection />
      <WaveDivider fill="#FFF8F0" bg="#FFD8CE" flip />

      <PetPickerSection selectedPet={pet} onSelectPet={handleSelectPet} />

      {pet && current && (
        <>
          <WaveDivider fill="#4ECDC4" bg="#FFF8F0" />
          <SymptomChecker
            pet={pet}
            petLabel={current.label}
            symptoms={symptoms}
            onToggleSymptom={toggleSymptom}
            severity={severity}
            onSeverityChange={setSeverity}
            onSubmit={handleSubmit}
            disabled={symptoms.length === 0}
          />
          <WaveDivider fill="#FFF8F0" bg="#4ECDC4" flip />

          <ResultsPanel
            loading={loading}
            result={result}
            petEmoji={current.emoji}
            petLabel={current.label}
            issuesSummary={issuesSummary}
            severity={severity}
            severityColor={severityColor(severity)}
          />
        </>
      )}

      <WaveDivider fill="#A8E6CF" bg="#FFF8F0" />
      <EmergencySection />
      <WaveDivider fill="#FFF8F0" bg="#A8E6CF" flip />

      <CommunitySection />

      <WaveDivider fill="#FFE66D" bg="#FFF8F0" />
      <FAQSection />

      <footer className="bg-nearblack text-white px-6 py-12 text-center">
        <div className="font-nunito font-black text-2xl mb-1.5">PawCheck 🐾</div>
        <p className="text-gray-400 mb-4">Helpful pet health guidance, gathered from trusted online sources</p>
        <div className="text-xl mb-4 tracking-[6px]">🐾 🐾 🐾</div>
        <p className="max-w-md mx-auto text-gray-500 text-xs leading-relaxed">
          PawCheck is for informational purposes only and does not replace professional veterinary advice. Currently
          available in the UK only.
        </p>
      </footer>
    </main>
  );
}
