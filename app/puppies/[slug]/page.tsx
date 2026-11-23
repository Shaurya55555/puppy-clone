import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import Gallery from "@/components/Gallery";
import { puppies } from "@/lib/data";
import { available, cap, title } from "@/lib/puppy";
import { WA } from "@/lib/site";

export function generateStaticParams() {
  return puppies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = puppies.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name ? `${p.name}, ${p.breed}` : `${p.breed} (${p.gender})`} puppy — TeddyPups U.A.E.` };
}

const IMPORT_STEPS = [
  ["Reserve your puppy", "Tell us which puppy has captured your heart."],
  ["Personalized consultation", "We finalize details with you and share updates on your puppy's journey."],
  ["Import and arrival", "We manage health checks, travel arrangements, and documentation."],
  ["Welcome home", "We help your new puppy settle in and ensure a smooth transition into your home."],
];
const LOCAL_STEPS = [
  ["Say hello", "Message us or drop by our Downtown Dubai showroom."],
  ["Meet before you choose", "Spend time bonding before making your decision."],
  ["Pick-up or delivery", "Take your puppy home the same day, or have them delivered within Dubai."],
];

export default async function PuppyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = puppies.find((x) => x.slug === slug);
  if (!p) notFound();
  const name = title(p);
  const list = available;
  const idx = list.findIndex((x) => x.slug === p.slug);
  const prev = idx >= 0 ? list[(idx - 1 + list.length) % list.length] : null;
  const next = idx >= 0 ? list[(idx + 1) % list.length] : null;
  const steps = p.origin === "local" ? LOCAL_STEPS : IMPORT_STEPS;
  const waLink = `https://wa.me/919898124987?text=${encodeURIComponent(`Hi TeddyPups! I'd love to know more about ${name} (${p.breed}).`)}`;

  return (
    <div className="section">
      <div className="wrap">
        <nav className="mb-6 text-sm font-semibold text-cocoa-soft" aria-label="Breadcrumb">
          <Link href={p.gone ? "/gone-home" : "/puppies"} className="underline">
            {p.gone ? "Gone home" : "Available puppies"}
          </Link>{" "}
          / <span className="text-cocoa">{name}</span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">hello, it&apos;s me</p>
            <Gallery images={p.images} alt={`${name}, ${p.gender} ${p.breed} puppy`} />
          </div>
          <div>
            <span className="badge" style={{ position: "static", display: "inline-block", background: p.gone ? "var(--color-toffee-deep)" : undefined }}>
              {p.gone ? "Gone home ♥" : "Available"}
            </span>
            <h1 className="mt-3 text-5xl md:text-6xl">{name}</h1>
            {p.name && <p className="mt-1 text-xl text-cocoa-soft">{p.breed}</p>}
            <dl className="panel mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
              <dt className="font-bold text-cocoa-soft">Breed</dt><dd>{p.breed}</dd>
              <dt className="font-bold text-cocoa-soft">Boy or girl</dt><dd>{cap(p.gender)}</dd>
              <dt className="font-bold text-cocoa-soft">Age</dt><dd>{p.age}</dd>
              <dt className="font-bold text-cocoa-soft">Where</dt><dd>{p.where}</dd>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waLink} className="btn btn-wa" target="_blank" rel="noopener noreferrer">Ask about {name} on WhatsApp</a>
              {!p.gone && <a href="#enquire" className="btn btn-ghost">Send an enquiry</a>}
            </div>
          </div>
        </div>

        <section className="mt-16">
          <p className="eyebrow">what comes with {name}</p>
          <h2 className="text-3xl md:text-4xl">Every Teddy Pup comes</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Vaccinated", "Dewormed", "Verified health certificate from licensed vets", "Thoroughly checked before joining your family"].map((t) => (
              <li key={t} className="panel flex items-center gap-3" style={{ padding: "1rem 1.2rem", boxShadow: "0 3px 0 var(--color-cocoa)" }}>
                <span className="step-n" style={{ width: "1.8rem", height: "1.8rem" }}>✓</span>
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <p className="eyebrow">the way home</p>
          <h2 className="text-3xl md:text-4xl">{p.origin === "local" ? "Coming home from Dubai" : "Coming home from abroad"}</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <li key={t} className="panel" style={{ boxShadow: "0 4px 0 var(--color-cocoa)" }}>
                <span className="step-n">{i + 1}</span>
                <h3 className="mt-3 text-xl">{t}</h3>
                <p className="mt-1 text-sm text-cocoa-soft">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {!p.gone && (
          <section id={`enquire-${p.slug}`} className="mt-16 max-w-2xl scroll-mt-28">
            <span id="enquire" className="block scroll-mt-28" />
            <p className="eyebrow">dear TeddyPups…</p>
            <h2 className="mb-2 text-3xl md:text-4xl">Ask about {name}</h2>
            <p className="mb-5 text-cocoa-soft">Leave your details and our team will get back to you promptly, or message us on WhatsApp for the quickest reply.</p>
            <EnquiryForm puppyName={name} breed={p.breed} />
          </section>
        )}

        {prev && next && (
          <nav className="mt-16 grid gap-4 sm:grid-cols-2" aria-label="More puppies">
            {[["Previous pup", prev], ["Next pup", next]].map(([label, q]) => {
              const pp = q as typeof prev;
              return (
                <Link key={label as string} href={`/puppies/${pp.slug}`} className="card flex items-center gap-4 p-3">
                  <Image src={pp.images[0]} alt="" width={80} height={80} className="size-20 rounded-xl object-cover" />
                  <div>
                    <p className="hand text-sm">{label as string}</p>
                    <p className="font-display text-xl">{title(pp)}</p>
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
