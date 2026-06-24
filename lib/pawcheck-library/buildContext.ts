import dogData from "./data/dog.json";
import catData from "./data/cat.json";
import rabbitData from "./data/rabbit.json";
import birdData from "./data/bird.json";
import fishData from "./data/fish.json";
import hamsterData from "./data/hamster.json";
import toxicFoods from "./data/toxic-foods.json";
import sourcesData from "./data/sources.json";

interface PossibleCause {
  condition: string;
  likelihood: string;
  brief: string;
}

interface Combination {
  with: string[];
  concern: string;
}

interface SymptomEntry {
  id: string;
  symptom: string;
  aliases: string[];
  category: string;
  description: string;
  possible_causes: PossibleCause[];
  home_care: string[];
  vet_urgency: { low: string; medium: string; high: string };
  red_flags?: string[];
  combinations?: Combination[];
  sources: string[];
}

interface PetLibrary {
  pet: string;
  display_name: string;
  emoji: string;
  symptoms: SymptomEntry[];
  notes?: string;
}

interface ToxinEntry {
  name: string;
  severity: string;
  why_toxic?: string;
  why_dangerous?: string;
  rough_toxic_dose?: string;
  symptoms?: string[];
  what_to_do?: string[];
}

interface ToxicFoodsLibrary {
  dog_toxins: ToxinEntry[];
  cat_toxins: ToxinEntry[];
  universal_first_aid: { if_recent_ingestion: string[] };
}

const toxicFoodsLib = toxicFoods as ToxicFoodsLibrary;

const PET_LIBRARIES: Record<string, PetLibrary> = {
  dog: dogData as PetLibrary,
  cat: catData as PetLibrary,
  rabbit: rabbitData as PetLibrary,
  bird: birdData as PetLibrary,
  fish: fishData as PetLibrary,
  hamster: hamsterData as PetLibrary,
};

const TOXIN_KEYWORDS = [
  "ate", "eaten", "swallowed", "ingested", "poison", "toxic",
  "chocolate", "grape", "raisin", "sultana", "xylitol", "onion",
  "garlic", "lily", "lilies", "antifreeze", "paracetamol",
  "ibuprofen", "aspirin", "medication", "tablet", "pill",
  "plant", "bulb", "mushroom", "fungus", "alcohol", "cannabis",
  "permethrin", "flea treatment", "essential oil", "diffuser",
];

function isToxinQuery(symptoms: string[], freeText = ""): boolean {
  const haystack = [symptoms.join(" "), freeText].join(" ").toLowerCase();
  return TOXIN_KEYWORDS.some((k) => haystack.includes(k));
}

function formatToxinEntries(pet: string): string {
  const list: ToxinEntry[] = pet === "dog" ? toxicFoodsLib.dog_toxins : toxicFoodsLib.cat_toxins;
  if (!list) return "";

  const topRisk = list.slice(0, 6);

  return topRisk
    .map((t) => {
      const symptoms = (t.symptoms || []).slice(0, 4).join("; ");
      const dose = t.rough_toxic_dose ? `Toxic dose: ${t.rough_toxic_dose}` : "";
      return `### ${t.name} (${t.severity})
Why toxic: ${t.why_toxic || t.why_dangerous || ""}
${dose}
Key symptoms: ${symptoms}
What to do: ${(t.what_to_do || []).slice(0, 3).join("; ")}`;
    })
    .join("\n\n");
}

function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchSymptoms(petData: PetLibrary, userSymptoms: string[]): SymptomEntry[] {
  const matches: SymptomEntry[] = [];
  const wanted = userSymptoms.map(normalise);

  for (const entry of petData.symptoms) {
    const candidates = [entry.symptom, ...(entry.aliases || [])].map(normalise);
    const isMatch = wanted.some((w) => candidates.some((c) => c.includes(w) || w.includes(c)));
    if (isMatch) matches.push(entry);
  }
  return matches;
}

type SeverityTier = "low" | "medium" | "high";

function severityTier(severity: number): SeverityTier {
  if (severity <= 3) return "low";
  if (severity <= 6) return "medium";
  return "high";
}

function formatEntry(entry: SymptomEntry, tier: SeverityTier): string {
  const causes = entry.possible_causes
    .slice(0, 5)
    .map((c) => `  - ${c.condition} (${c.likelihood}): ${c.brief}`)
    .join("\n");

  const homeCare = entry.home_care.slice(0, 5).map((h) => `  - ${h}`).join("\n");

  const urgency = entry.vet_urgency[tier] || entry.vet_urgency.medium;
  const redFlags = (entry.red_flags || []).slice(0, 4).join("; ");

  return [
    `### ${entry.symptom}`,
    `Category: ${entry.category}`,
    `Description: ${entry.description}`,
    `Likely causes:`,
    causes,
    `Home care:`,
    homeCare,
    `Vet urgency (severity ${tier}): ${urgency}`,
    redFlags ? `Red flags: ${redFlags}` : null,
    `Sources: ${entry.sources.join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function findCombinations(matches: SymptomEntry[], userSymptoms: string[]): string[] {
  const warnings: string[] = [];
  const normUser = userSymptoms.map(normalise);

  for (const entry of matches) {
    for (const combo of entry.combinations || []) {
      const allPresent = combo.with.every(
        (needed) =>
          normUser.some((u) => u.includes(normalise(needed))) ||
          normUser.some((u) => normalise(needed).includes(u))
      );
      if (allPresent) {
        warnings.push(`(${entry.symptom} + ${combo.with.join(" + ")}): ${combo.concern}`);
      }
    }
  }
  return warnings;
}

export interface BuildContextInput {
  pet: string;
  symptoms: string[];
  severity: number;
  freeText?: string;
}

export interface BuildContextResult {
  context: string;
  matchedEntries: SymptomEntry[];
  isEmergencyCategory: boolean;
  toxinDetected: boolean;
}

function isEmergencyCategory(matches: SymptomEntry[]): boolean {
  return matches.some((m) => /emergency|urgent|critical/i.test(m.category));
}

export function buildContext({ pet, symptoms, severity, freeText = "" }: BuildContextInput): BuildContextResult {
  const petKey = pet.toLowerCase();
  const petData = PET_LIBRARIES[petKey];

  if (!petData || !symptoms || symptoms.length === 0) {
    return { context: "", matchedEntries: [], isEmergencyCategory: false, toxinDetected: false };
  }

  const matches = matchSymptoms(petData, symptoms);
  const tier = severityTier(severity);
  const combos = findCombinations(matches, symptoms);

  const toxinQuery = isToxinQuery(symptoms, freeText);
  const toxinBlock =
    toxinQuery && (petKey === "dog" || petKey === "cat")
      ? `\n\n## Suspected toxicity, high-priority reference\n\nUK Animal Poison Line: 01202 509000 (24/7)\n\n${formatToxinEntries(petKey)}\n\nUniversal first aid: ${toxicFoodsLib.universal_first_aid.if_recent_ingestion.slice(0, 3).join("; ")}`
      : "";

  const toxinDetected = toxinQuery && (petKey === "dog" || petKey === "cat");

  if (matches.length === 0 && !toxinQuery) {
    return {
      context: `## PawCheck Reference Library
Pet: ${petData.display_name} ${petData.emoji}
User-reported symptoms: ${symptoms.join(", ")}
Severity: ${severity}/10 (${tier} tier)

(No exact library match for these symptoms. Respond from general knowledge but stay cautious and recommend a vet for any moderate or severe concerns.)`,
      matchedEntries: [],
      isEmergencyCategory: false,
      toxinDetected: false,
    };
  }

  const formatted = matches.map((m) => formatEntry(m, tier)).join("\n\n");

  const comboBlock = combos.length ? `\n\n## Symptom combination warnings\n${combos.map((c) => `- ${c}`).join("\n")}` : "";

  const petNotes = petData.notes ? `\n\n## Important note for ${petData.display_name}s\n${petData.notes}` : "";

  const context = `## PawCheck Verified Reference Library
Pet: ${petData.display_name} ${petData.emoji}
User-reported symptoms: ${symptoms.join(", ")}
Severity: ${severity}/10 (${tier} tier)
${petNotes}

## Matched reference entries
${formatted}${comboBlock}${toxinBlock}

---
You MUST base your advice on this verified reference content. Stay within the scope above. Always recommend a vet consultation for moderate or severe concerns. Never give a definitive diagnosis, use phrasing like "this could indicate" or "possible causes include". For any suspected poisoning, the UK Animal Poison Line (01202 509000) is the first port of call.`;

  return { context, matchedEntries: matches, isEmergencyCategory: isEmergencyCategory(matches), toxinDetected };
}

interface SourceMeta {
  full_name: string;
}

const sourcesLib = (sourcesData as { sources: Record<string, SourceMeta> }).sources;

function displayName(code: string): string {
  return sourcesLib[code]?.full_name || code;
}

export function getVerifiedSources({ pet, symptoms }: { pet: string; symptoms: string[] }): string[] {
  const petData = PET_LIBRARIES[pet.toLowerCase()];
  if (!petData) return [];

  const matches = matchSymptoms(petData, symptoms);
  const all = new Set<string>();
  for (const m of matches) {
    for (const s of m.sources) all.add(displayName(s));
  }
  return Array.from(all).slice(0, 5);
}
