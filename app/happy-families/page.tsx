import type { Metadata } from "next";
import Image from "next/image";
import { familyImages } from "@/lib/data";

export const metadata: Metadata = { title: "Happy families — TeddyPups U.A.E." };

const CAPTIONS = [
  "Lulu 🧸 with her new mummy ❤️",
  "Adorable Maltipoo baby 🧸❤️",
  "My new teddy puppy 🥰🧸",
  "Our new puppies 🧸🥰🤗",
  "New puppy 🧸😍",
  "Gang of 3 😍🧸",
  "So happy 😍😍",
  "New pup 🤗💫",
];

export default function HappyFamilies() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">our wall of happy endings</p>
        <h1 className="text-5xl md:text-7xl">Happy families</h1>
        <p className="mt-3 max-w-2xl text-cocoa-soft">
          Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
        </p>
        <p className="mt-4 font-bold">{familyImages.length} moments and counting</p>
        <blockquote className="panel mt-8">
          <p className="font-display text-xl leading-snug md:text-2xl">
            “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
          </p>
          <footer className="mt-3 font-bold">Sarah M., <span className="font-normal text-cocoa-soft">Dubai, UAE</span></footer>
        </blockquote>
        <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
          {familyImages.map((src, i) => (
            <figure key={src} className="ticket mb-4 break-inside-avoid" style={{ padding: ".6rem" }}>
              <Image
                src={src}
                alt="A happy TeddyPups family with their new puppy"
                width={400}
                height={400}
                sizes="(max-width:768px) 50vw, 25vw"
                className="h-auto w-full rounded-lg"
                loading={i < 4 ? "eager" : "lazy"}
              />
              {CAPTIONS[i] && <figcaption className="mt-2 text-sm font-semibold">{CAPTIONS[i]}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
