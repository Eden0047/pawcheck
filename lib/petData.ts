export type PetType = "dog" | "cat" | "rabbit" | "bird" | "fish" | "hamster";

export interface Pet {
  type: PetType;
  emoji: string;
  label: string;
}

export const PETS: Pet[] = [
  { type: "dog", emoji: "🐶", label: "Dog" },
  { type: "cat", emoji: "🐱", label: "Cat" },
  { type: "rabbit", emoji: "🐰", label: "Rabbit" },
  { type: "bird", emoji: "🐦", label: "Bird" },
  { type: "fish", emoji: "🐠", label: "Fish" },
  { type: "hamster", emoji: "🐹", label: "Hamster" },
];

export const SYMPTOMS: Record<PetType, string[]> = {
  dog: [
    "Vomiting",
    "Lethargy",
    "Loss of appetite",
    "Limping",
    "Scratching",
    "Coughing",
    "Diarrhoea",
    "Drinking too much",
    "Eye discharge",
    "Swollen area",
  ],
  cat: [
    "Vomiting",
    "Lethargy",
    "Loss of appetite",
    "Limping",
    "Scratching",
    "Coughing",
    "Diarrhoea",
    "Drinking too much",
    "Eye discharge",
    "Swollen area",
  ],
  rabbit: ["Not eating", "Teeth grinding", "Head tilt", "Runny nose", "Bloating", "Lethargy"],
  bird: ["Feather plucking", "Not singing", "Discharge", "Fluffed feathers", "Weight loss"],
  fish: ["Spots on body", "Fin rot", "Floating sideways", "Rapid breathing", "Loss of colour"],
  hamster: ["Wet tail", "Hair loss", "Limping", "Not eating", "Lethargy"],
};

export interface EmergencyContact {
  name: string;
  phone: string;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { name: "Animal PoisonLine (UK)", phone: "01202 509000" },
  { name: "RSPCA Cruelty & Advice", phone: "0300 1234 999" },
  { name: "Vets Now 24/7 Emergency", phone: "0333 240 2870" },
];

export interface VetListing {
  name: string;
  distance: string;
  stars: string;
  phone: string;
  open: boolean;
}

export const VET_LISTINGS: VetListing[] = [
  { name: "Camden Paws Vets", distance: "0.4 miles", stars: "★★★★☆", phone: "020 7946 0182", open: true },
  { name: "Riverside Animal Hospital", distance: "1.1 miles", stars: "★★★★★", phone: "020 7946 0247", open: true },
  { name: "Oakwood Vet Surgery", distance: "2.3 miles", stars: "★★★☆☆", phone: "0117 496 0319", open: false },
  { name: "Vets Now Emergency Clinic", distance: "3.0 miles", stars: "★★★★☆", phone: "0333 240 2870", open: true },
];

export interface HowStep {
  n: string;
  icon: string;
  title: string;
  body: string;
}

export const HOW_STEPS: HowStep[] = [
  {
    n: "1",
    icon: "🐾",
    title: "Pick your pet & symptoms",
    body: "Choose your animal and tap the issues you've noticed, then set how severe things seem.",
  },
  {
    n: "2",
    icon: "🔎",
    title: "We gather the guidance",
    body: "PawCheck pulls together relevant information from trusted public pet-health sources into one summary.",
  },
  {
    n: "3",
    icon: "🩺",
    title: "Read, act & verify",
    body: "See likely causes and at-home tips, plus emergency contacts and nearby vets if you need a professional.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Where does the advice come from?",
    a: "Summaries are compiled from publicly available, reputable UK pet-health sources such as the PDSA, RSPCA and Blue Cross. We surface and condense that information — we don't generate medical opinions of our own.",
  },
  {
    q: "Can PawCheck diagnose my pet?",
    a: "No. PawCheck is an informational starting point only. It cannot examine your pet and may not reflect their specific condition. Always confirm anything serious with a qualified veterinarian.",
  },
  {
    q: "Is my information stored?",
    a: "This prototype keeps everything on your device for the session — nothing you enter is sent anywhere or saved permanently.",
  },
  {
    q: "When should I see a vet immediately?",
    a: "If symptoms are severe, worsening quickly, or you scored a high severity, contact a vet or one of the emergency lines right away rather than waiting.",
  },
  {
    q: "Does PawCheck cover all animals?",
    a: "It currently includes dogs, cats, rabbits, birds, fish and hamsters, with symptom lists tailored to each. More species and detail can be added over time.",
  },
  {
    q: "Where is PawCheck available?",
    a: "PawCheck is currently available in the UK only. Helplines, vet listings and sources shown are UK-based, so details may not apply if you're outside the UK.",
  },
];

export interface Comment {
  avatar: string;
  user: string;
  pet: string;
  text: string;
  likes: number;
}

export const INITIAL_COMMENTS: Comment[] = [
  {
    avatar: "🐶",
    user: "@GoldenMumNewbury",
    pet: "🐶 Dog",
    likes: 42,
    text: "Helped me stay calm when Biscuit was poorly at 2am. Told me exactly what to watch for. Absolute lifesaver!",
  },
  {
    avatar: "🐱",
    user: "@CatDadReading",
    pet: "🐱 Cat",
    likes: 31,
    text: "Used PawCheck for my cat's loss of appetite. The advice matched what the vet said!",
  },
  {
    avatar: "🐰",
    user: "@BunnyLoverBasingstoke",
    pet: "🐰 Rabbit",
    likes: 27,
    text: "Finally an app that covers rabbits! Most pet health tools forget us bunny parents.",
  },
];

export function severityColor(severity: number): string {
  if (severity <= 3) return "#2BB673";
  if (severity <= 6) return "#FFE66D";
  return "#FF6B6B";
}
