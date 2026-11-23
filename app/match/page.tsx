import type { Metadata } from "next";
import MatchQuiz from "@/components/MatchQuiz";
import { available } from "@/lib/puppy";

export const metadata: Metadata = {
  title: "Find my pup — TeddyPups U.A.E.",
  description: "Answer five quick questions and meet the TeddyPups puppies that fit your home best.",
};

export default function MatchPage() {
  return (
    <section className="section">
      <div className="wrap max-w-4xl">
        <p className="eyebrow">sniff out your match</p>
        <h1 className="text-5xl md:text-7xl">Find my pup</h1>
        <p className="mt-3 mb-10 max-w-2xl text-cocoa-soft">
          Five quick questions about your home and routine, and we&apos;ll rank the available puppies that suit you best.
        </p>
        <MatchQuiz pool={available} />
      </div>
    </section>
  );
}
