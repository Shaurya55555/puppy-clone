"use client";
import Link from "next/link";
import type { Puppy } from "@/lib/data";
import { title } from "@/lib/puppy";
import { waMessage } from "@/lib/match";
import { useFavorites } from "@/lib/favorites";
import PuppyCard from "./PuppyCard";

export default function FavoritesList({ all }: { all: Puppy[] }) {
  const { favs } = useFavorites();
  const list = all.filter((p) => favs.includes(p.slug));
  if (!list.length)
    return (
      <div className="panel text-center">
        <p className="font-display text-3xl">No favourites yet</p>
        <p className="mt-2 text-cocoa-soft">Tap the heart on any puppy to save them here.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/puppies" className="btn btn-primary">Browse puppies</Link>
          <Link href="/match" className="btn btn-ghost">Find my pup</Link>
        </div>
      </div>
    );
  return (
    <>
      <div className="grid-pups">
        {list.map((p) => (
          <PuppyCard key={p.slug} p={p} />
        ))}
      </div>
      <a href={waMessage(list.map(title))} className="btn btn-wa mt-8" target="_blank" rel="noopener noreferrer">
        Ask about {list.length === 1 ? title(list[0]) : `all ${list.length} favourites`} on WhatsApp
      </a>
    </>
  );
}
