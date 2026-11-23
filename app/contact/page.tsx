import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { EMAIL, PHONE, TEL, WA } from "@/lib/site";

export const metadata: Metadata = { title: "Visit & contact — TeddyPups U.A.E." };

const SHOWROOM = "/m/media_skvodl2NZiKq_cefab5eee9_27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg";

export default function Contact() {
  return (
    <>
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="text-5xl md:text-6xl">Get in touch with us</h1>
            <p className="mt-3 mb-8 max-w-2xl text-cocoa-soft">
              Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!
            </p>
            <ContactForm />
          </div>
          <aside className="grid content-start gap-5">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="panel block">
              <p className="eyebrow">WhatsApp</p>
              <p className="font-display text-2xl">{PHONE}</p>
            </a>
            <a href={TEL} className="panel block">
              <p className="eyebrow">call us</p>
              <p className="font-display text-2xl">{PHONE}</p>
            </a>
            <a href={`mailto:${EMAIL}`} className="panel block">
              <p className="eyebrow">email</p>
              <p className="font-display text-2xl break-all">{EMAIL}</p>
            </a>
          </aside>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-honey-soft)" }}>
        <div className="wrap grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-4xl md:text-5xl">Visit us in Downtown Dubai</h2>
            <p className="mt-3 text-cocoa-soft">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
            <p className="mt-3 font-bold">Downtown Dubai, United Arab Emirates</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Downtown+Dubai" className="btn btn-primary mt-5" target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </div>
          <Image src={SHOWROOM} alt="The apricot teddy bear puppy from our showroom, held up to say hello" width={640} height={640} className="aspect-square w-full rounded-3xl border-2 border-cocoa object-cover" />
        </div>
      </section>
    </>
  );
}
