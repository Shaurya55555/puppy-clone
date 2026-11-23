import type { Metadata } from "next";
import FavoritesList from "@/components/FavoritesList";
import { available } from "@/lib/puppy";

export const metadata: Metadata = { title: "Your favourites — TeddyPups U.A.E." };

export default function Favourites() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">saved on this device</p>
        <h1 className="text-5xl md:text-7xl">Your favourites</h1>
        <p className="mt-3 mb-8 max-w-2xl text-cocoa-soft">The pups that stole your heart. Send them all to us in one WhatsApp message.</p>
        <FavoritesList all={available} />
      </div>
    </section>
  );
}
