"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Puppy } from "@/lib/data";
import { cardSub, title } from "@/lib/puppy";
import Mascot from "./Mascot";

const DOORS = ["#a24a1a", "#5a3a28", "#d38a3a", "#b9654a", "#7a4a2e"];
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

export default function DoorScene({ puppies }: { puppies: Puppy[] }) {
  const scene = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pup = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    let walkTimer = 0;
    let last = -1;

    const doors = () => Array.from(track.current?.querySelectorAll<HTMLElement>("[data-door]") ?? []);

    const reset = () => {
      if (track.current) track.current.style.transform = "";
      doors().forEach((d) => d.style.removeProperty("--open"));
      pup.current?.classList.remove("is-walking");
    };

    const update = () => {
      raf = 0;
      const s = scene.current, p = pin.current, t = track.current, m = pup.current;
      if (!s || !p || !t || !m) return;
      const rect = s.getBoundingClientRect();
      const max = Math.max(1, rect.height - p.clientHeight);
      const prog = clamp(-rect.top / max);
      const travel = Math.max(0, t.scrollWidth - window.innerWidth * 0.62);
      t.style.transform = `translate3d(${-prog * travel}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${prog})`;

      const mr = m.getBoundingClientRect();
      const mx = mr.left + mr.width * 0.55;
      doors().forEach((d) => {
        const r = d.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - mx);
        const reach = r.width * 1.7;
        const open = clamp(1 - dist / reach);
        d.style.setProperty("--open", (open * open * (3 - 2 * open)).toFixed(3));
      });

      if (Math.abs(prog - last) > 0.0004) {
        m.classList.add("is-walking");
        window.clearTimeout(walkTimer);
        walkTimer = window.setTimeout(() => m.classList.remove("is-walking"), 140);
      }
      last = prog;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const start = () => {
      reset();
      if (!mq.matches) return;
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reset();
    };
    const onChange = () => {
      stop();
      start();
    };
    start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
      cancelAnimationFrame(raf);
      window.clearTimeout(walkTimer);
    };
  }, []);

  return (
    <section ref={scene} className="scene" aria-labelledby="meet-title">
      <div ref={pin} className="scene-pin">
        <div className="wrap scene-head">
          <div>
            <h2 id="meet-title" className="scene-title">Meet the pups</h2>
            <p className="mt-2 text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
          </div>
          <Link href="/puppies" className="btn btn-primary">See all available puppies</Link>
        </div>

        <div ref={track} className="door-track">
          {puppies.map((p, i) => (
            <Link key={p.slug} href={`/puppies/${p.slug}`} data-door className="door" style={{ ["--door" as string]: DOORS[i % DOORS.length] }}>
              <span className="door-plate">
                <span className="door-name">{title(p)}</span>
                <span className="door-meta">{cardSub(p)}</span>
              </span>
              <span className="door-frame">
                <span className="door-room">
                  <Image src={p.images[0]} alt={`${title(p)}, ${p.gender} ${p.breed} puppy`} fill sizes="200px" style={{ objectFit: "cover" }} />
                </span>
                <span className="door-leaf" aria-hidden>
                  <svg viewBox="0 0 64 64" className="door-paw" fill="currentColor">
                    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.3 26.7c1.8 3.4 1.1 7.2-1.5 8.6-2.6 1.4-6.1-.2-7.9-3.6-1.8-3.4-1.1-7.2 1.5-8.6 2.6-1.4 6.1.2 7.9 3.6zM29.6 15.6c.7 4-1.1 7.6-4.1 8.2-3 .5-6-2.3-6.7-6.2-.7-4 1.1-7.6 4.1-8.2 3-.5 6 2.3 6.7 6.2zM45.2 17.6c-.7 4-3.7 6.8-6.7 6.2-3-.5-4.8-4.2-4.1-8.2.7-4 3.7-6.7 6.7-6.2 3 .6 4.8 4.2 4.1 8.2zM54.1 31.7c-1.8 3.4-5.3 5-7.9 3.6-2.6-1.4-3.2-5.2-1.5-8.6 1.8-3.4 5.3-5 7.9-3.6 2.6 1.4 3.2 5.2 1.5 8.6z" />
                  </svg>
                  <span className="door-knob" />
                </span>
                <span className="door-tag">Available</span>
              </span>
            </Link>
          ))}
          <Link href="/puppies" className="door door-all">
            <span className="door-frame door-frame-all">
              <span className="font-display text-2xl leading-tight">Meet<br />them all</span>
            </span>
          </Link>
        </div>

        <div className="scene-floor" aria-hidden />
        <div ref={pup} className="scene-pup" aria-hidden>
          <Mascot walking />
        </div>
        <div className="scene-progress" aria-hidden>
          <div ref={bar} />
        </div>
      </div>
    </section>
  );
}
