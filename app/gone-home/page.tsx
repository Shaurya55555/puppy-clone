import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { gone, title, cap } from "@/lib/puppy";
import { WA } from "@/lib/site";

export const metadata: Metadata = { title: "Gone home — TeddyPups U.A.E." };

export default function GoneHome() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">tickets home</p>
        <h1 className="text-5xl md:text-7xl">Gone home</h1>
        <p className="mt-3 max-w-2xl text-cocoa-soft">
          Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we&apos;ll help you find your match.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {gone.map((p) => (
            <Link key={p.slug} href={`/puppies/${p.slug}`} className="ticket">
              <div className="t-img">
                <Image src={p.images[0]} alt={`${title(p)}, ${p.gender} ${p.breed} puppy`} width={320} height={320} sizes="(max-width:768px) 50vw, 25vw" />
              </div>
              <p className="t-top">one ticket home</p>
              <h3>{title(p)}</h3>
              <p className="text-sm text-cocoa-soft">{p.name ? `${p.breed}, ${p.gender}` : `${cap(p.gender)}`}</p>
              <div className="t-foot">
                <span>{p.origin === "local" ? "Dubai showroom" : "TeddyPups"}</span>
                <span>home ♥</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href={WA} className="btn btn-wa" target="_blank" rel="noopener noreferrer">Find my match on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
