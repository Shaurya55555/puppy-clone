import type { Metadata } from "next";
import { Suspense } from "react";
import PuppiesBrowser from "@/components/PuppiesBrowser";
import Image from "next/image";
import Link from "next/link";
import { available, gone, title } from "@/lib/puppy";

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
        <div className="mt-16">
          <p className="eyebrow">Already gone home</p>
          <h2 className="text-3xl md:text-4xl">These puppies have found their families.</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
            {gone.slice(0, 5).map((p) => (
              <Link key={p.slug} href={`/puppies/${p.slug}`} className="ticket">
                <div className="t-img">
                  <Image src={p.images[0]} alt={`${title(p)}, ${p.gender} ${p.breed} puppy`} width={240} height={240} sizes="(max-width:768px) 50vw, 20vw" />
                </div>
                <p className="t-top">gone home ♥</p>
                <h3 className="text-lg">{title(p)}</h3>
              </Link>
            ))}
          </div>
          <Link href="/gone-home" className="btn btn-ghost mt-6">See the puppies who&apos;ve gone home</Link>
        </div>
      </div>
    </section>
  );
}
