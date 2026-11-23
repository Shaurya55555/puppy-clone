import type { Metadata } from "next";
import { Suspense } from "react";
import PuppiesBrowser from "@/components/PuppiesBrowser";
import { available } from "@/lib/puppy";

export const metadata: Metadata = { title: "Available puppies — TeddyPups U.A.E." };

export default function PuppiesPage() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">from Teddy&apos;s sketchbook</p>
        <h1 className="text-5xl md:text-6xl">Available puppies</h1>
        <p className="mt-3 mb-8 max-w-2xl text-cocoa-soft">
          Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
        </p>
        <Suspense fallback={<p>Loading puppies…</p>}>
          <PuppiesBrowser puppies={available} />
        </Suspense>
      </div>
    </section>
  );
}
