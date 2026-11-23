"use client";
import { useRouter, useSearchParams } from "next/navigation";
import type { Puppy } from "@/lib/data";
import PuppyCard from "./PuppyCard";

const BREEDS = [
  ["maltipoo", "Maltipoo"],
  ["pomeranian", "Pomeranian"],
  ["poodle", "Poodle"],
  ["cavapoo", "Cavapoo"],
  ["shih-tzu", "Shih Tzu"],
] as const;

const breedKey = (b: string) => {
  const s = b.toLowerCase();
  if (s.includes("maltipoo")) return "maltipoo";
  if (s.includes("pomeranian")) return "pomeranian";
  if (s.includes("poodle")) return "poodle";
  if (s.includes("cavapoo")) return "cavapoo";
  if (s.includes("shih")) return "shih-tzu";
  return s;
};

export default function PuppiesBrowser({ puppies }: { puppies: Puppy[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const breed = sp.get("breed");
  const origin = sp.get("origin");

  const set = (k: string, v: string | null) => {
    const q = new URLSearchParams(sp.toString());
    if (v) q.set(k, v);
    else q.delete(k);
    const s = q.toString();
    router.replace(s ? `/puppies?${s}` : "/puppies", { scroll: false });
  };

  const list = puppies.filter(
    (p) => (!breed || breedKey(p.breed) === breed) && (!origin || p.origin === origin),
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="chips" role="group" aria-label="Filter by breed">
          <button className="chip" aria-pressed={!breed} onClick={() => set("breed", null)}>All breeds</button>
          {BREEDS.map(([k, label]) => (
            <button key={k} className="chip" aria-pressed={breed === k} onClick={() => set("breed", breed === k ? null : k)}>
              {label}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Filter by origin">
          <button className="chip" aria-pressed={!origin} onClick={() => set("origin", null)}>Anywhere</button>
          <button className="chip" aria-pressed={origin === "local"} onClick={() => set("origin", origin === "local" ? null : "local")}>In Dubai</button>
          <button className="chip" aria-pressed={origin === "imported"} onClick={() => set("origin", origin === "imported" ? null : "imported")}>Imported for you</button>
        </div>
      </div>
      <p className="mt-6 text-sm font-bold text-cocoa-soft" aria-live="polite">
        {list.length} {list.length === 1 ? "puppy" : "puppies"} available
      </p>
      {list.length ? (
        <div className="grid-pups mt-4">
          {list.map((p, i) => (
            <PuppyCard key={p.slug} p={p} priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="panel mt-6 text-center">
          <p className="font-display text-2xl">No puppies match just yet</p>
          <p className="mt-2 text-cocoa-soft">Try another breed, or ask us on WhatsApp. We can source it for you.</p>
        </div>
      )}
    </>
  );
}
