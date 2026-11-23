"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Puppy } from "@/lib/data";
import { cardSub, title } from "@/lib/puppy";
import { QUESTIONS, rank, waMessage, type Answers } from "@/lib/match";
import FavButton from "./FavButton";

export default function MatchQuiz({ pool }: { pool: Puppy[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];

  const pick = (value: string) => {
    setAnswers((a) => ({ ...a, [q.key]: value }));
    setStep((s) => s + 1);
  };

  if (done) {
    const results = rank(answers as Answers, pool);
    const top = results.slice(0, 3);
    return (
      <div aria-live="polite">
        <p className="eyebrow">your top matches</p>
        <h2 className="text-4xl md:text-5xl">
          Meet {title(top[0].puppy)} <span aria-hidden>🧸</span>
        </h2>
        <p className="mt-2 max-w-2xl text-cocoa-soft">
          Scores combine general breed tendencies with your answers. Every pup has their own personality, so meet them (or ask us for a video call) before you decide.
        </p>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {top.map((m, i) => (
            <li key={m.puppy.slug} className="panel relative" style={{ padding: "1rem" }}>
              <span className="match-rank" aria-label={`Match number ${i + 1}`}>{i + 1}</span>
              <Link href={`/puppies/${m.puppy.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-honey-soft">
                  <Image src={m.puppy.images[0]} alt={`${title(m.puppy)}, ${m.puppy.breed} puppy`} fill sizes="(max-width:768px) 90vw, 320px" style={{ objectFit: "cover" }} />
                </div>
                <h3 className="mt-4 text-2xl">{title(m.puppy)}</h3>
                <p className="text-sm text-cocoa-soft">{cardSub(m.puppy)}</p>
              </Link>
              <div className="mt-3" role="img" aria-label={`${m.score}% match`}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl">{m.score}%</span>
                  <span className="hand text-sm">match</span>
                </div>
                <div className="meter"><span style={{ width: `${m.score}%` }} /></div>
              </div>
              <ul className="mt-3 grid gap-1 text-sm">
                {m.reasons.map((r) => (
                  <li key={r} className="flex gap-2"><span aria-hidden>✓</span>{r}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2">
                <a href={waMessage([title(m.puppy)])} className="btn btn-wa flex-1" target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
                <FavButton slug={m.puppy.slug} name={title(m.puppy)} className="fav-inline" />
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={waMessage(top.map((m) => title(m.puppy)))} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Ask about all three on WhatsApp
          </a>
          <button className="btn btn-ghost" onClick={() => { setAnswers({}); setStep(0); }}>
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3" aria-label={`Question ${step + 1} of ${QUESTIONS.length}`} role="group">
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`dot ${i < step ? "dot-done" : i === step ? "dot-now" : ""}`} aria-hidden />
        ))}
        <span className="ml-1 text-sm font-bold text-cocoa-soft">{step + 1} / {QUESTIONS.length}</span>
      </div>
      <fieldset key={q.key} className="reveal">
        <legend className="font-display text-3xl font-extrabold md:text-4xl">{q.title}</legend>
        <p className="mt-2 text-cocoa-soft">{q.hint}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {q.options.map((o) => (
            <button key={o.value} type="button" onClick={() => pick(o.value)} className="opt" aria-pressed={answers[q.key] === o.value}>
              <span className="text-4xl" aria-hidden>{o.emoji}</span>
              <span className="font-display text-xl font-extrabold">{o.label}</span>
            </button>
          ))}
        </div>
      </fieldset>
      {step > 0 && (
        <button className="btn btn-ghost mt-8" onClick={() => setStep((s) => s - 1)}>← Back</button>
      )}
    </div>
  );
}
