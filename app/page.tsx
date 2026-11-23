import Image from "next/image";
import Link from "next/link";
import PuppyCard from "@/components/PuppyCard";
import Faq from "@/components/Faq";
import { familyImages } from "@/lib/data";
import { available } from "@/lib/puppy";
import { WA } from "@/lib/site";

const SHOWROOM = "/m/media_FHyoHcIosLZE_60f6e7e00a_27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg";
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
const ARCH_SIZES = [
  { w: "clamp(4.5rem,11vw,9rem)", h: "clamp(5.5rem,14vw,11rem)" },
  { w: "clamp(5rem,12vw,10rem)", h: "clamp(7rem,17vw,14rem)" },
  { w: "clamp(5rem,12vw,10rem)", h: "clamp(6rem,15vw,12rem)" },
  null,
  { w: "clamp(5rem,12vw,10rem)", h: "clamp(7rem,16vw,13rem)" },
  { w: "clamp(5rem,13vw,11rem)", h: "clamp(8rem,19vw,15rem)" },
  { w: "clamp(4rem,9vw,8rem)", h: "clamp(4.5rem,11vw,9rem)" },
];

const STEPS = [
  ["Choose your breed", "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."],
  ["Get photos & details", "Our team will share real photos, health details, and all necessary information directly on WhatsApp."],
  ["Secure & safe delivery", "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free."],
];

export default function Home() {
  const arches = available.slice(0, 6);
  let a = 0;
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="hand text-xl" style={{ transform: "rotate(-2deg)" }}>every puppy is family</p>
          <h1>
            Premium teacup
            <br />
            puppies in Dubai
          </h1>
          <p className="lede">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>
          <div className="hero-actions">
            <Link href="/puppies" className="btn btn-primary">View available puppies</Link>
            <a href={WA} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
          </div>
        </div>
        <div className="arches" aria-hidden={false}>
          {ARCH_SIZES.map((sz, i) =>
            sz ? (
              <Link
                key={i}
                href={`/puppies/${arches[a].slug}`}
                className="arch"
                style={{ width: sz.w, height: sz.h, animationDelay: `${i * 90}ms` }}
              >
                <Image src={arches[a++].images[0]} alt={`${arches[a - 1].name ?? arches[a - 1].breed} puppy`} width={240} height={320} priority />
              </Link>
            ) : (
              <Image key={i} src="/logo.png" alt="TeddyPups teddy mascot" width={160} height={160} className="hero-teddy" priority />
            ),
          )}
        </div>
        <div className="scallop" aria-hidden />
      </section>

      <section className="section" style={{ paddingTop: "clamp(2rem,5vw,4rem)" }}>
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">available now</p>
              <h2 className="text-4xl md:text-5xl">Meet the pups</h2>
              <p className="mt-2 text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
            </div>
            <Link href="/puppies" className="btn btn-ghost">See all available puppies</Link>
          </div>
          <div className="grid-pups mt-8">
            {available.map((p) => (
              <PuppyCard key={p.slug} p={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/puppies" className="btn btn-primary">Meet them all</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-honey-soft)" }}>
        <div className="wrap">
          <h2 className="text-4xl md:text-5xl">Two ways to meet your puppy</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="panel">
              <Image src={SHOWROOM} alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom" width={640} height={420} className="mb-4 aspect-[3/2] w-full rounded-2xl object-cover" />
              <p className="eyebrow">Puppies in Dubai</p>
              <h3 className="text-3xl">In our showroom</h3>
              <p className="mt-2 text-cocoa-soft">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
              <Link href="/puppies?origin=local" className="btn btn-primary mt-5">Meet local puppies</Link>
            </div>
            <div className="panel">
              <div className="mb-4 grid aspect-[3/2] place-items-center rounded-2xl bg-sky text-center">
                <p className="font-display text-4xl text-sky-deep">Korea ✈ Dubai</p>
              </div>
              <p className="eyebrow">Order upon request</p>
              <h3 className="text-3xl">Imported for you</h3>
              <p className="mt-2 text-cocoa-soft">Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.</p>
              <Link href="/puppies?origin=imported" className="btn btn-primary mt-5">See imported puppies</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="text-4xl md:text-5xl">Your puppy journey</h2>
          <p className="mt-2 max-w-xl text-cocoa-soft">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="panel">
                <span className="step-n">{i + 1}</span>
                <h3 className="mt-3 text-2xl">{t}</h3>
                <p className="mt-2 text-cocoa-soft">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Link href="/how-it-works" className="btn btn-ghost">How it works</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-sky)" }}>
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--color-sky-deep)" }}>puppy passport</p>
          <h2 className="text-4xl md:text-5xl">Why families trust TeddyPups</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Vet-checked & healthy", "Every puppy comes vaccinated, dewormed, and with a verified health certificate."],
              ["Korea to Dubai, safely", "Trusted breeders, safe travel, and premium care from start to finish."],
              ["Support 24/7", "Always here to help, from choosing your puppy to post-delivery support."],
            ].map(([t, d]) => (
              <div key={t} className="panel">
                <h3 className="text-2xl">{t}</h3>
                <p className="mt-2 text-cocoa-soft">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Trusted by families worldwide</p>
          <h2 className="text-4xl md:text-5xl">Happy families &amp; puppies</h2>
          <p className="mt-2 max-w-2xl text-cocoa-soft">
            We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
          <blockquote className="panel mt-8">
            <p className="font-display text-xl leading-snug md:text-2xl">
              “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
            </p>
            <footer className="mt-3 font-bold">Sarah M., <span className="font-normal text-cocoa-soft">Dubai, UAE</span></footer>
          </blockquote>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {CAPTIONS.map((c, i) => (
              <figure key={c} className="ticket" style={{ padding: ".6rem" }}>
                <div className="t-img">
                  <Image src={familyImages[i]} alt="A happy TeddyPups family with their new puppy" width={320} height={320} />
                </div>
                <figcaption className="mt-2 text-sm font-semibold">{c}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/happy-families" className="btn btn-ghost">See every happy family</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-honey-soft)" }}>
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl">Questions, answered</h2>
            <Link href="/faq" className="btn btn-ghost">Read all questions</Link>
          </div>
          <Faq limit={3} />
        </div>
      </section>

      <section className="section text-center">
        <div className="wrap">
          <p className="hand text-xl">welcome home</p>
          <h2 className="mx-auto max-w-2xl text-4xl md:text-6xl">Ready to meet your new best friend?</h2>
          <p className="mx-auto mt-4 max-w-xl text-cocoa-soft">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
          <div className="hero-actions">
            <a href={WA} className="btn btn-wa" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
            <Link href="/contact" className="btn btn-ghost">Visit &amp; contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
