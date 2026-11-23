import type { Metadata } from "next";
import Faq from "@/components/Faq";
import { FAQ, WA } from "@/lib/site";

export const metadata: Metadata = { title: "FAQ — TeddyPups U.A.E." };

export default function FaqPage() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">sniff out a question</p>
        <h1 className="text-5xl md:text-7xl">Questions &amp; answers</h1>
        <p className="mt-3 max-w-xl text-cocoa-soft">Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.</p>
        <p className="mt-4 font-bold">{FAQ.length} notes on the board</p>
        <div className="mt-8">
          <Faq />
        </div>
        <a href={WA} className="btn btn-wa mt-10" target="_blank" rel="noopener noreferrer">Ask your own question</a>
      </div>
    </section>
  );
}
