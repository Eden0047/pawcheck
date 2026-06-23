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
  { name: "RSPCA (UK)", phone: "0300 1234 999" },
  { name: "Blue Cross Pet Helpline", phone: "0300 777 1897" },
  { name: "Animal Poison Line", phone: "01202 509000" },
];

export interface VetListing {
  name: string;
  distance: string;
  stars: string;
  phone: string;
  open: boolean;
}

export const VET_LISTINGS: VetListing[] = [
  { name: "Newbury Vets4Pets", distance: "0.3 miles", stars: "★★★★★", phone: "01635 000111", open: true },
  { name: "Berkshire Animal Hospital", distance: "1.1 miles", stars: "★★★★☆", phone: "01635 000222", open: true },
  { name: "Thatcham Pet Clinic", distance: "2.4 miles", stars: "★★★☆☆", phone: "01635 000333", open: false },
  { name: "Hungerford Vets", distance: "4.8 miles", stars: "★★★★☆", phone: "01488 000444", open: true },
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
