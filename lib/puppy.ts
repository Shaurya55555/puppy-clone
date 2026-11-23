import { puppies, type Puppy } from "./data";
export const available = puppies.filter((p) => !p.gone);
export const gone = puppies.filter((p) => p.gone);
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const title = (p: Puppy) => p.name ?? p.breed;
export function subtitle(p: Puppy) {
  const base = `${cap(p.gender)} · ${p.age}`;
  return p.name || p.breed !== title(p) ? `${p.breed} · ${p.gender} · ${p.age}` : base;
}
export function cardSub(p: Puppy) {
  return p.name ? `${p.breed} · ${p.gender} · ${p.age}` : `${p.gender} · ${p.age}`;
}
export const breedKey = (p: Puppy) => {
  const b = p.breed.toLowerCase();
  if (b.includes("maltipoo")) return "maltipoo";
  if (b.includes("pomeranian")) return "pomeranian";
  if (b.includes("poodle")) return "poodle";
  if (b.includes("cavapoo")) return "cavapoo";
  if (b.includes("shih")) return "shih-tzu";
  return b;
};
