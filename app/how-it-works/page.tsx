import type { Metadata } from "next";
import Link from "next/link";
import { WA } from "@/lib/site";

export const metadata: Metadata = { title: "How it works — TeddyPups U.A.E." };

const LOCAL = [
  ["Explore our puppies", "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information."],
  ["Choose your puppy", "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions."],
  ["Meet before you choose", "Spend time bonding before making your decision."],
  ["Pick-up or delivery", "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably."],
];
const IMPORT = [
  ["Reserve your puppy", "Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences."],
  ["Personalized consultation", "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey."],
  ["Import and arrival", "We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family."],
  ["Welcome home", "Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home."],
];
const PROMISE = [
  ["Hand-selected breeders", "We work only with breeders who uphold the highest ethical and health standards."],
  ["Full transparency", "Photos, videos, and health certificates are shared before your puppy travels."],
  ["Safe, stress-free delivery", "We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you."],
];
const DELIVERY = [
  ["Take your puppy home the same day", "Local puppies are available immediately — visit, fall in love, and go home together."],
  ["Delivery within Dubai", "Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably."],
  ["Safe international cargo", "We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free."],
];
const WHY = [
  ["International cargo", "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance."],
  ["Support 24/7", "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away."],
  ["Health guarantee", "All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family."],
  ["Unique and high quality puppies", "When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend."],
];

function Steps({ items }: { items: string[][] }) {
  return (
    <ol className="mt-5 grid gap-4">
      {items.map(([t, d], i) => (
        <li key={t} className="flex gap-4">
          <span className="step-n">{i + 1}</span>
          <div>
            <p className="hand text-sm">Step {i + 1}</p>
            <h4 className="font-display text-xl font-extrabold">{t}</h4>
            <p className="text-cocoa-soft">{d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function HowItWorks() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: "3rem" }}>
        <div className="wrap">
          <h1 className="text-5xl md:text-7xl">How it works</h1>
          <p className="lede mt-4">
            Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
          </p>
          <nav className="chips mt-6 justify-center" aria-label="On this page">
            {[["#two-ways", "Two ways home"], ["#promise", "Our premium puppy promise"], ["#delivery", "Delivery & collection"], ["#why", "Why choose us"]].map(([h, l], i) => (
              <a key={h} href={h} className="chip">{i + 1} · {l}</a>
            ))}
          </nav>
        </div>
      </section>

      <section id="two-ways" className="section scroll-mt-20">
        <div className="wrap">
          <p className="eyebrow">choose your way</p>
          <h2 className="text-4xl md:text-5xl">Two ways home</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="panel">
              <p className="eyebrow">In Dubai · meet in person</p>
              <h3 className="text-3xl">Meet your puppy in person</h3>
              <p className="mt-2 text-cocoa-soft">
                Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they&apos;re raised with care, proper nutrition, and veterinary checks.
              </p>
              <Steps items={LOCAL} />
            </div>
            <div className="panel">
              <p className="eyebrow">Imported · order upon request</p>
              <h3 className="text-3xl">Order upon request</h3>
              <p className="mt-2 text-cocoa-soft">
                Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world&apos;s most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.
              </p>
              <p className="mt-2 text-cocoa-soft">From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world&apos;s finest puppies to Dubai, just for you.</p>
              <Steps items={IMPORT} />
            </div>
          </div>
        </div>
      </section>

      <section id="promise" className="section scroll-mt-20" style={{ background: "var(--color-sky)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--color-sky-deep)" }}>puppy passport</p>
          <h2 className="text-4xl md:text-5xl">Our premium puppy promise</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PROMISE.map(([t, d]) => (
              <div key={t} className="panel"><h3 className="text-2xl">{t}</h3><p className="mt-2 text-cocoa-soft">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="section scroll-mt-20">
        <div className="wrap">
          <h2 className="text-4xl md:text-5xl">Delivery &amp; collection</h2>
          <p className="mt-2 max-w-2xl text-cocoa-soft">From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {DELIVERY.map(([t, d]) => (
              <div key={t} className="panel"><h3 className="text-2xl">{t}</h3><p className="mt-2 text-cocoa-soft">{d}</p></div>
            ))}
          </div>
          <div className="panel mt-6" style={{ background: "var(--color-honey-soft)" }}>
            <h3 className="text-2xl">Worldwide delivery</h3>
            <p className="mt-2 text-cocoa-soft">We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.</p>
            <p className="font-display mt-3 text-2xl text-sky-deep">Korea ✈ Dubai</p>
          </div>
        </div>
      </section>

      <section id="why" className="section scroll-mt-20" style={{ background: "var(--color-honey-soft)" }}>
        <div className="wrap">
          <h2 className="text-4xl md:text-5xl">Why choose us</h2>
          <p className="mt-2 max-w-3xl text-cocoa-soft">
            We&apos;re here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we&apos;re with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {WHY.map(([t, d]) => (
              <div key={t} className="panel"><h3 className="text-2xl">{t}</h3><p className="mt-2 text-cocoa-soft">{d}</p></div>
            ))}
          </div>
          <div className="hero-actions" style={{ justifyContent: "flex-start" }}>
            <a href={WA} className="btn btn-wa" target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>
            <Link href="/puppies" className="btn btn-primary">See available puppies</Link>
          </div>
        </div>
      </section>
    </>
  );
}
