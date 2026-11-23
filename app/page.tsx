import Image from "next/image";
import Link from "next/link";
import DoorScene from "@/components/DoorScene";
import Faq from "@/components/Faq";
import Journey from "@/components/Journey";
import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";
import { familyImages } from "@/lib/data";
import { available, title } from "@/lib/puppy";
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
const STARS = [[8, 12], [18, 40], [30, 18], [44, 8], [58, 30], [70, 14], [82, 36], [91, 10], [12, 64], [76, 58]];

export default function Home() {
  const arches = available.slice(0, 6);
  const max = available[0];
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
        <div className="arches">
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

      <div className="home-flow">
        <DoorScene puppies={available} />

        <section className="section" style={{ paddingBottom: "2rem" }}>
          <div className="wrap">
            <Reveal className="text-center">
              <h2 className="mx-auto max-w-3xl text-5xl md:text-7xl">Two ways to meet your puppy</h2>
              <div className="signpost" aria-hidden>
                <div className="sign-pole" />
                <span className="sign-arm sign-l">Puppies in Dubai</span>
                <span className="sign-arm sign-r">Imported for you</span>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              <Reveal className="md:text-right">
                <figure className="polaroid md:ml-auto">
                  <Image src={SHOWROOM} alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom" width={420} height={420} className="aspect-square w-full rounded-md object-cover" />
                  <figcaption>In our showroom</figcaption>
                </figure>
                <div className="skyline md:ml-auto md:justify-end" aria-hidden>
                  {[3, 4.5, 3.2, 5, 3.6, 2.6].map((h, i) => <i key={i} style={{ height: `${h}rem` }} />)}
                </div>
                <p className="mt-4 max-w-sm text-cocoa-soft md:ml-auto">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
                <Link href="/puppies?origin=local" className="btn btn-primary mt-5">Meet local puppies</Link>
              </Reveal>
              <Reveal delay={120}>
                <div className="route" aria-hidden>
                  <svg viewBox="0 0 400 160">
                    <path d="M30 130 C 110 10, 260 10, 370 110" fill="none" stroke="#a24a1a" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
                    <circle cx="30" cy="130" r="7" fill="#a24a1a" />
                    <circle cx="370" cy="110" r="7" fill="#a24a1a" />
                    <text x="14" y="156" fontFamily="var(--font-hand)" fontSize="15" fill="#2a170e">Korea</text>
                    <text x="338" y="136" fontFamily="var(--font-hand)" fontSize="15" fill="#2a170e">Dubai</text>
                    <g transform="translate(196 22) rotate(6)">
                      <ellipse cx="0" cy="0" rx="34" ry="12" fill="#fffdf8" stroke="#2a170e" strokeWidth="3" />
                      <path d="M-8 -6 L-22 -30 L-10 -30 L8 -6Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
                      <circle cx="16" cy="-1" r="4" fill="#bfddf5" stroke="#2a170e" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
                <p className="mt-4 max-w-sm text-cocoa-soft">
                  Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.
                </p>
                <Link href="/puppies?origin=imported" className="btn btn-primary mt-5">See imported puppies</Link>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingBlock: "1rem 2rem" }}>
          <div className="wrap">
            <Reveal>
              <div className="panel grid items-center gap-6 md:grid-cols-[1fr_auto]" style={{ background: "var(--color-sky)" }}>
                <div>
                  <p className="eyebrow" style={{ color: "var(--color-sky-deep)" }}>new · sniff out your match</p>
                  <h2 className="text-3xl md:text-5xl">Not sure which pup fits your life?</h2>
                  <p className="mt-2 max-w-xl text-cocoa-soft">
                    Answer five quick questions about your home and routine, and we&apos;ll rank the available puppies that suit you best.
                  </p>
                </div>
                <Link href="/match" className="btn btn-primary">Find my pup</Link>
              </div>
            </Reveal>
          </div>
        </section>

        <Journey photos={[available[1].images[0], available[3].images[0]]} />

        <section className="section">
          <div className="wrap max-w-6xl">
            <Reveal>
              <div className="book">
                <div className="book-page">
                  <p className="eyebrow">puppy passport</p>
                  <h2 className="mt-2 text-4xl md:text-6xl">Why families trust TeddyPups</h2>
                  <div className="mt-6 w-32 md:mt-16" aria-hidden><Mascot /></div>
                </div>
                <div className="book-page grid content-start gap-8 sm:grid-cols-2">
                  <div className="stamp">
                    <div className="stamp-circle">
                      <b className="text-lg">
                        <svg viewBox="0 0 24 24" width="30" height="30" className="mx-auto mb-1" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7.5-4.6-9.6-9.2C1 8.7 2.8 5 6.3 5c2 0 3.5 1.1 4.2 2.4" /><path d="M12 21s7.5-4.6 9.6-9.2C23 8.7 21.2 5 17.7 5c-2 0-3.5 1.1-4.2 2.4" /><path d="M6 12h3l1.5-3 3 6 1.5-3h3" /></svg>
                        Vet-checked &amp; healthy
                      </b>
                    </div>
                    <p>Every puppy comes vaccinated, dewormed, and with a verified health certificate.</p>
                  </div>
                  <div className="stamp">
                    <div className="stamp-rect">
                      <b>
                        <svg viewBox="0 0 24 24" width="30" height="30" className="mx-auto mb-1" aria-hidden fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" /></svg>
                        Korea to Dubai, safely
                      </b>
                    </div>
                    <p>Trusted breeders, safe travel, and premium care from start to finish.</p>
                  </div>
                  <div className="stamp">
                    <div className="stamp-oval">
                      <b className="text-lg">
                        <svg viewBox="0 0 24 24" width="30" height="30" className="mx-auto mb-1" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4V5Z" /></svg>
                        Support 24/7
                      </b>
                    </div>
                    <p>Always here to help, from choosing your puppy to post-delivery support.</p>
                  </div>
                  <div className="stamp" style={{ opacity: 0.75 }}>
                    <div className="stamp-circle" style={{ borderColor: "#9a8a78", color: "#8a7a68", boxShadow: "inset 0 0 0 5px #fdf3df, inset 0 0 0 7px #9a8a78" }}>
                      <b className="text-base">Trusted by families worldwide</b>
                    </div>
                    <p>Puppies delivered to loving homes all around the world.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
      <div className="flow-fade" aria-hidden />

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Trusted by families worldwide</p>
            <h2 className="text-4xl md:text-6xl">Happy families &amp; puppies</h2>
            <p className="mt-2 max-w-2xl text-cocoa-soft">
              We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
            </p>
            <blockquote className="panel mt-8">
              <p className="font-display text-xl leading-snug md:text-2xl">
                “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
              </p>
              <footer className="mt-3 font-bold">Sarah M., <span className="font-normal text-cocoa-soft">Dubai, UAE</span></footer>
            </blockquote>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {CAPTIONS.map((c, i) => (
              <Reveal key={c} delay={(i % 4) * 70}>
                <figure className="ticket" style={{ padding: ".6rem" }}>
                  <div className="t-img">
                    <Image src={familyImages[i]} alt="A happy TeddyPups family with their new puppy" width={320} height={320} />
                  </div>
                  <figcaption className="mt-2 text-sm font-semibold">{c}</figcaption>
                </figure>
              </Reveal>
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

      <section className="section dusk text-center">
        {STARS.map(([x, y], i) => (
          <span key={i} className="star" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.35}s` }} aria-hidden />
        ))}
        <div className="wrap relative">
          <p className="hand text-xl" style={{ color: "var(--color-honey)" }}>welcome home</p>
          <div className="dusk-door my-6">
            <Image src={max.images[0]} alt={`${title(max)}, waiting inside`} fill sizes="176px" style={{ objectFit: "cover" }} />
          </div>
          <h2 className="mx-auto max-w-2xl text-4xl md:text-6xl">Ready to meet your new best friend?</h2>
          <p className="sub mx-auto mt-4 max-w-xl">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
          <div className="hero-actions">
            <a href={WA} className="btn btn-wa" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
            <Link href="/contact" className="btn btn-ghost" style={{ borderColor: "var(--color-milk)", color: "var(--color-milk)" }}>Visit &amp; contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
