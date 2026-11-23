"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Mascot from "./Mascot";

const STEPS = [
  ["Choose your breed", "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."],
  ["Get photos & details", "Our team will share real photos, health details, and all necessary information directly on WhatsApp."],
  ["Secure & safe delivery", "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free."],
];

const BREEDS = [
  ["Maltipoo", "maltipoo"],
  ["Pomeranian", "pomeranian"],
  ["Poodle", "poodle"],
  ["Cavapoo", "cavapoo"],
  ["Shih Tzu", "shih-tzu"],
];

export default function Journey({ photos }: { photos: string[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section journey">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_24rem]">
        <div>
          <div className="relative">
            <h2 className="text-4xl md:text-6xl">Your puppy journey</h2>
            <p className="mt-3 max-w-md text-cocoa-soft">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>
          </div>
          <ol className="mt-8">
            {STEPS.map(([t, d], i) => (
              <li
                key={t}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className={`j-step ${active === i ? "j-on" : ""}`}
              >
                <span className="j-n">{i + 1}</span>
                <div>
                  <h3 className="text-2xl md:text-3xl">{t}</h3>
                  <p className="mt-1 max-w-md text-cocoa-soft">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/how-it-works" className="btn btn-ghost mt-4">How it works</Link>
        </div>

        <div className="phone-wrap">
          <div className="phone" role="img" aria-label="A WhatsApp-style chat showing the TeddyPups journey">
            <div className="phone-top">
              <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" />
              <div>
                <p className="font-display text-base font-extrabold leading-none">TeddyPups U.A.E.</p>
                <p className="mt-1 text-xs text-cocoa-soft">{active === 0 ? "typing…" : "online"}</p>
              </div>
            </div>
            <div className="phone-body">
              <p className="bubble bubble-me">Hi TeddyPups! I&apos;d love to know more about your puppies.</p>
              {active === 0 && (
                <div className="bubble bubble-them" aria-hidden>
                  <span className="typing"><i /><i /><i /></span>
                </div>
              )}
              {active === 0 && (
                <div className="chip-row">
                  {BREEDS.map(([l]) => (
                    <span key={l} className="chip" style={{ padding: ".25rem .7rem", fontSize: ".72rem" }}>{l}</span>
                  ))}
                </div>
              )}
              {active >= 1 && (
                <>
                  <div className="bubble bubble-them bubble-photos">
                    {photos.slice(0, 2).map((src) => (
                      <Image key={src} src={src} alt="" width={90} height={90} />
                    ))}
                  </div>
                  <p className="bubble bubble-them">Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
                </>
              )}
              {active >= 2 && (
                <p className="bubble bubble-them">Confirmed! ✈ Your pup is on the way, with every travel detail handled.</p>
              )}
            </div>
            <div className="phone-foot">
              <span>Say hello on WhatsApp</span>
              <span className="send" aria-hidden>➤</span>
            </div>
          </div>
          <div className="phone-pup" aria-hidden>
            <span className="say">{["woof!", "ooh, photos!", "on my way!"][active]}</span>
            <Mascot walking={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
