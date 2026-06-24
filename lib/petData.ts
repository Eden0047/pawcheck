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
    "Diarrhoea",
    "Lethargy",
    "Loss of appetite",
    "Limping",
    "Excessive scratching",
    "Coughing",
    "Excessive drinking",
    "Eye discharge",
    "Ear problems",
    "Bad breath",
    "Lump or swelling",
    "Weight loss",
    "Weight gain",
    "Difficulty breathing",
    "Frequent urination",
    "Blood in urine",
    "Constipation",
    "Hair loss",
    "Hot spots / skin irritation",
    "Pale gums",
    "Seizures",
    "Excessive panting",
    "Disorientation / circling",
    "Sudden collapse",
  ],
  cat: [
    "Loss of appetite",
    "Vomiting",
    "Diarrhoea",
    "Lethargy",
    "Hiding / withdrawal",
    "Increased thirst",
    "Increased urination",
    "Litter box issues",
    "Straining to urinate",
    "Sneezing",
    "Eye discharge",
    "Coughing",
    "Weight loss",
    "Excessive grooming",
    "Poor grooming / matted coat",
    "Limping",
    "Drooling",
    "Bad breath",
    "Lumps or swellings",
    "Difficulty breathing",
    "Open-mouth breathing",
    "Constipation",
    "Excessive hairballs",
    "Aggression / behavioural change",
    "Excessive vocalisation",
  ],
  rabbit: [
    "Not eating (GI stasis)",
    "Reduced or no droppings",
    "Lethargy",
    "Head tilt",
    "Teeth grinding (loud)",
    "Runny nose / discharge",
    "Eye discharge",
    "Diarrhoea / soft stools",
    "Sneezing",
    "Bloated abdomen",
    "Hunched posture",
    "Overgrown teeth / drooling",
    "Sore hocks (pododermatitis)",
    "Fur loss / bald patches",
    "Flystrike",
  ],
  bird: [
    "Fluffed feathers (puffed up)",
    "Feather plucking / chewing",
    "Nasal or eye discharge",
    "Not eating",
    "Lethargy / on cage floor",
    "Tail bobbing",
    "Sneezing or wheezing",
    "Loss of voice / quiet bird",
    "Runny / watery droppings",
    "Weight loss / prominent keel bone",
    "Egg-binding (female)",
    "Open-mouth / gaping breathing",
    "Discoloured droppings",
  ],
  fish: [
    "White spots on body (Ich)",
    "Fin rot",
    "Swim bladder problems / floating sideways",
    "Gasping at surface",
    "Loss of colour",
    "Clamped fins",
    "Dropsy / pinecone scales",
    "Not eating",
    "Hiding / unusual behaviour",
    "Rapid gill movement",
    "Cloudy or bulging eyes",
    "Fungal patches",
  ],
  hamster: [
    "Wet tail",
    "Hair loss / bald patches",
    "Lethargy",
    "Not eating",
    "Diarrhoea",
    "Weight loss",
    "Lumps or abscesses",
    "Eye problems",
    "Difficulty walking / wobbliness",
    "Excessive thirst / urination",
  ],
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

export interface FaqCategory {
  category: string;
  items: Faq[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    category: "Getting started",
    items: [
      {
        q: "Does PawCheck cover all animals?",
        a: "It currently includes dogs, cats, rabbits, birds, fish and hamsters, with symptom lists tailored to each. More species and detail can be added over time.",
      },
      {
        q: "Where is PawCheck available?",
        a: "PawCheck is currently available in the UK only. Helplines, vet listings and sources shown are UK-based, so details may not apply if you're outside the UK.",
      },
    ],
  },
  {
    category: "How the advice works",
    items: [
      {
        q: "How is the advice captured and presented?",
        a: "When you pick a pet, select symptoms and set a severity level, that information is matched against a reference library of common symptoms paraphrased from veterinary and animal welfare sources, then sent along with your inputs to Claude, an AI language model made by Anthropic. The model summarises that reference material into likely causes, at-home tips, and the sources actually used, which is then displayed in the results card. Identical pet, symptom, and severity combinations are cached briefly so repeat checks load instantly.",
      },
      {
        q: "Where does the advice come from?",
        a: "For symptoms covered by our reference library, the AI is grounded in paraphrased guidance from named UK and international sources such as the PDSA, RSPCA, Blue Cross, AVMA and VCA Hospitals, and the source pills shown are marked Verified. For symptom combinations not yet in the library, the AI falls back to its general training knowledge and the sources shown are unverified suggestions rather than confirmed citations; this is noted under the results card when it happens.",
      },
      {
        q: "Can the AI make mistakes?",
        a: "Yes. PawCheck's advice is generated by an AI language model, which can occasionally produce inaccurate, incomplete, or outdated information, sometimes stated confidently even when wrong. Treat every result as a helpful starting point, not a final answer, and always use your own judgement alongside it.",
      },
    ],
  },
  {
    category: "Safety & limitations",
    items: [
      {
        q: "Can PawCheck diagnose my pet?",
        a: "No. PawCheck is an informational starting point only. It cannot examine your pet and may not reflect their specific condition. Always confirm anything serious with a qualified veterinarian.",
      },
      {
        q: "When should I see a vet immediately?",
        a: "If symptoms are severe, worsening quickly, or you scored a high severity, contact a vet or one of the emergency lines right away rather than waiting. A severity score above 7, or symptoms our reference library flags as an emergency category, always triggers an urgent-vet warning in your results, regardless of what the AI itself says.",
      },
      {
        q: "What if my pet ate something toxic?",
        a: "If your symptom description mentions something your pet ate, swallowed, or was exposed to (such as chocolate, grapes, onions, or a household chemical), PawCheck automatically pulls in extra guidance on common toxins and surfaces the UK Animal Poison Line (01202 509000, 24/7) in your results. This is a starting point only; for any suspected poisoning, phone the Animal Poison Line or a vet immediately rather than waiting for symptoms to appear.",
      },
    ],
  },
  {
    category: "Privacy & data",
    items: [
      {
        q: "Is my information stored?",
        a: "Symptom checks are sent to our AI provider to generate a response and are cached briefly for performance, but they aren't stored long-term or linked to you. Comments and star ratings you submit in the Community section are saved in our database so they can be shown to other visitors; only the name you choose to enter (or none) is attached to a comment.",
      },
    ],
  },
];

export interface Comment {
  id: string;
  avatar: string;
  user: string;
  pet: string;
  text: string;
  likes: number;
  createdAt: number;
}

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: "seed-1",
    avatar: "🐶",
    user: "@GoldenMumNewbury",
    pet: "🐶 Dog",
    likes: 42,
    createdAt: Date.UTC(2026, 0, 3),
    text: "Helped me stay calm when Biscuit was poorly at 2am. Told me exactly what to watch for. Absolute lifesaver!",
  },
  {
    id: "seed-2",
    avatar: "🐱",
    user: "@CatDadReading",
    pet: "🐱 Cat",
    likes: 31,
    createdAt: Date.UTC(2026, 0, 5),
    text: "Used PawCheck for my cat's loss of appetite. The advice matched what the vet said!",
  },
  {
    id: "seed-3",
    avatar: "🐰",
    user: "@BunnyLoverBasingstoke",
    pet: "🐰 Rabbit",
    likes: 27,
    createdAt: Date.UTC(2026, 0, 8),
    text: "Finally an app that covers rabbits! Most pet health tools forget us bunny parents.",
  },
];

export const SEED_RATING_AVERAGE = 4.8;
export const SEED_RATING_COUNT = 1243;

export function severityColor(severity: number): string {
  if (severity <= 3) return "#2BB673";
  if (severity <= 6) return "#FFE66D";
  return "#FF6B6B";
}
