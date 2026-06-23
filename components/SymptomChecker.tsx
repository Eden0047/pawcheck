"use client";

import { PetType, SYMPTOMS, severityColor } from "@/lib/petData";

interface SymptomCheckerProps {
  pet: PetType;
  petLabel: string;
  symptoms: string[];
  onToggleSymptom: (symptom: string) => void;
  severity: number;
  onSeverityChange: (severity: number) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export default function SymptomChecker({
  pet,
  petLabel,
  symptoms,
  onToggleSymptom,
  severity,
  onSeverityChange,
  onSubmit,
  disabled,
}: SymptomCheckerProps) {
  const color = severityColor(severity);
  const options = SYMPTOMS[pet];

  return (
    <section id="symptoms" className="bg-teal px-6 py-12 scroll-mt-[72px]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-nunito font-black text-white text-3xl sm:text-4xl text-center mb-8">
          What&apos;s going on with your {petLabel}?
        </h2>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {options.map((name) => {
            const active = symptoms.includes(name);
            return (
              <button
                key={name}
                onClick={() => onToggleSymptom(name)}
                className={`font-nunito font-extrabold text-sm px-5 py-3 rounded-full border-2 transition-all ${
                  active ? "bg-coral border-coral text-white" : "bg-white border-white text-nearblack"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl px-8 py-7 max-w-xl mx-auto mb-9 shadow-lg">
          <div className="flex justify-between font-nunito font-extrabold text-base mb-3">
            <span>😊 Mild</span>
            <span style={{ color, fontSize: "22px" }}>{severity}/10</span>
            <span>🚨 Severe</span>
          </div>
          <div className="relative h-4 rounded-full bg-gray-200 overflow-hidden mb-1.5">
            <div
              className="absolute inset-0 transition-all rounded-full"
              style={{ width: `${severity * 10}%`, background: color }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={severity}
            onChange={(e) => onSeverityChange(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer"
            style={{ accentColor: color }}
          />
        </div>

        <div className="text-center">
          <button
            onClick={onSubmit}
            disabled={disabled}
            className={`font-nunito font-black text-xl text-white rounded-full px-11 py-4 transition-opacity ${
              disabled ? "bg-coral/50 cursor-not-allowed" : "bg-coral animate-ctaPulse"
            }`}
          >
            Find Verified Advice →
          </button>
        </div>
      </div>
    </section>
  );
}
