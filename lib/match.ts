import type { Puppy } from "./data";
import { breedKey, title } from "./puppy";

/** General breed tendencies on a 1-5 scale. Individual dogs vary; shown to users as a guide only. */
type Traits = { energy: number; grooming: number; kids: number; apartment: number; quiet: number };

const BREED_TRAITS: Record<string, Traits> = {
  maltipoo: { energy: 3, grooming: 3, kids: 4, apartment: 5, quiet: 4 },
  poodle: { energy: 4, grooming: 4, kids: 3, apartment: 5, quiet: 3 },
  pomeranian: { energy: 4, grooming: 4, kids: 2, apartment: 5, quiet: 2 },
  cavapoo: { energy: 3, grooming: 3, kids: 5, apartment: 4, quiet: 4 },
  "shih-tzu": { energy: 2, grooming: 4, kids: 4, apartment: 5, quiet: 4 },
};

export function traitsFor(p: Puppy): Traits {
  const t = { ...(BREED_TRAITS[breedKey(p)] ?? BREED_TRAITS.maltipoo) };
  // Teacup-sized pups are more fragile around small children.
  if (/teacup|toy/i.test(p.breed)) t.kids = Math.max(1, t.kids - 1);
  return t;
}

export type Answers = {
  home: "apartment" | "house";
  kids: "none" | "older" | "young";
  activity: "low" | "medium" | "high";
  grooming: "minimal" | "regular" | "love";
  timing: "now" | "wait" | "either";
};

export const QUESTIONS: {
  key: keyof Answers;
  title: string;
  hint: string;
  options: { value: string; label: string; emoji: string }[];
}[] = [
  {
    key: "home",
    title: "Where will your pup live?",
    hint: "Space shapes how a tiny pup spends the day.",
    options: [
      { value: "apartment", label: "Apartment", emoji: "🏙️" },
      { value: "house", label: "House or villa", emoji: "🏡" },
    ],
  },
  {
    key: "kids",
    title: "Any children at home?",
    hint: "Teacup pups are delicate, so this matters.",
    options: [
      { value: "none", label: "No children", emoji: "🧑‍🤝‍🧑" },
      { value: "older", label: "Older kids", emoji: "🧒" },
      { value: "young", label: "Young kids", emoji: "👶" },
    ],
  },
  {
    key: "activity",
    title: "How active are your days?",
    hint: "Be honest, your pup will match your pace.",
    options: [
      { value: "low", label: "Calm & cosy", emoji: "🛋️" },
      { value: "medium", label: "A daily stroll", emoji: "🚶" },
      { value: "high", label: "Always on the go", emoji: "🏃" },
    ],
  },
  {
    key: "grooming",
    title: "How much grooming can you do?",
    hint: "Fluffy coats love a brush.",
    options: [
      { value: "minimal", label: "As little as possible", emoji: "⏱️" },
      { value: "regular", label: "A regular routine", emoji: "🪮" },
      { value: "love", label: "I love it", emoji: "💇" },
    ],
  },
  {
    key: "timing",
    title: "When do you want to bring them home?",
    hint: "Local pups go home the same day, imports take longer.",
    options: [
      { value: "now", label: "As soon as possible", emoji: "⚡" },
      { value: "wait", label: "Happy to wait for a rare breed", emoji: "✈️" },
      { value: "either", label: "No rush either way", emoji: "🧸" },
    ],
  },
];

export type Match = { puppy: Puppy; score: number; reasons: string[] };

const closeness = (want: number, have: number) => 1 - Math.abs(want - have) / 4;

export function rank(answers: Answers, pool: Puppy[]): Match[] {
  const wantEnergy = { low: 2, medium: 3, high: 5 }[answers.activity];
  const wantGroom = { minimal: 2, regular: 3, love: 5 }[answers.grooming];
  const wantKids = { none: 1, older: 3, young: 5 }[answers.kids];
  // If nobody in the pool can satisfy a timing wish (e.g. all pups are imports), do not punish everyone for it.
  const timingMatters = answers.timing === "either" ? false : pool.some((p) => (answers.timing === "now" ? p.origin === "local" : p.origin === "imported"));

  return pool
    .map((puppy) => {
      const t = traitsFor(puppy);
      const reasons: string[] = [];
      let total = 0;
      let weight = 0;
      const add = (w: number, s: number) => {
        total += w * s;
        weight += w;
      };

      const energy = closeness(wantEnergy, t.energy);
      add(2, energy);
      if (energy >= 0.75) reasons.push(`Energy level suits ${answers.activity === "low" ? "calm" : answers.activity === "high" ? "active" : "daily-walk"} days`);

      const groom = closeness(wantGroom, t.grooming);
      add(1.5, groom);
      if (groom >= 0.75) reasons.push(answers.grooming === "minimal" ? "Easier coat to keep tidy" : "Happy with the grooming time you can give");

      // Children: only penalise when the pup is less kid-friendly than needed.
      const kidScore = answers.kids === "none" ? 1 : Math.min(1, t.kids / wantKids);
      add(2.5, kidScore);
      if (answers.kids !== "none" && kidScore >= 0.8) reasons.push("Gentle with children");

      const apt = answers.home === "apartment" ? t.apartment / 5 : 0.8 + (t.apartment / 5) * 0.2;
      add(1.5, apt);
      if (answers.home === "apartment" && t.apartment >= 5) reasons.push("Great in apartments");
      if (answers.home === "apartment" && t.quiet >= 4) reasons.push("Tends to be a quieter neighbour");

      const timing =
        answers.timing === "either" ? 1 : answers.timing === "now" ? (puppy.origin === "local" ? 1 : 0.35) : puppy.origin === "imported" ? 1 : 0.7;
      if (timingMatters) add(2, timing);
      if (answers.timing === "now" && puppy.origin === "local") reasons.push("Can go home the same day");
      if (answers.timing === "wait" && puppy.origin === "imported") reasons.push("Imported for you, a rare teacup line");

      const score = Math.round((total / weight) * 100);
      if (!reasons.length) reasons.push(`${title(puppy)} is a sweet all-rounder`);
      return { puppy, score, reasons: reasons.slice(0, 3) };
    })
    .sort((a, b) => b.score - a.score);
}

export function waMessage(names: string[]) {
  const list = names.length ? names.join(", ") : "your puppies";
  return `https://wa.me/919898124987?text=${encodeURIComponent(`Hi TeddyPups! I'd love to know more about ${list}.`)}`;
}
