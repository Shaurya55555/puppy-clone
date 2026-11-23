"use client";
import { useState } from "react";
import { sendEnquiry } from "@/lib/enquiry";
import { puppies } from "@/lib/data";
import { cap, title } from "@/lib/puppy";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [wa, setWa] = useState<string | undefined>();
  const [err, setErr] = useState<string | null>(null);
  const options = puppies.filter((p) => !p.gone);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    setErr(null);
    const r = await sendEnquiry(form);
    if (r.ok) {
      setWa(r.wa);
      setState("sent");
    } else {
      setState("idle");
      setErr(r.error ?? (r.errors ? Object.values(r.errors).join(" ") : "Something went wrong."));
    }
  }

  if (state === "sent")
    return (
      <div className="letter text-center" role="status">
        <p className="font-display text-3xl">Letter posted! 💌</p>
        <p className="mt-2">Thank you. Our team will get back to you promptly.</p>
        {wa && (
          <a href={wa} className="btn btn-wa mt-3" target="_blank" rel="noopener noreferrer">
            Continue on WhatsApp
          </a>
        )}
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="letter" noValidate>
      <p className="font-display text-2xl">Dear TeddyPups,</p>
      <p>
        my name is{" "}
        <input name="name" className="inline-in" aria-label="Your name" placeholder="your name" required />, and you can reach me on{" "}
        <input name="phone" className="inline-in" aria-label="Phone or WhatsApp" placeholder="phone / WhatsApp" required /> or by email at{" "}
        <input name="email" type="email" className="inline-in" aria-label="Email" placeholder="you@email.com" />. I live in{" "}
        <input name="area" className="inline-in" aria-label="Your area" placeholder="your area" />, and I&apos;m curious about{" "}
        <select name="puppy" className="inline-in" aria-label="Puppy you're interested in (optional)" defaultValue="">
          <option value="">any puppy (not sure yet)</option>
          {options.map((p) => (
            <option key={p.slug} value={p.slug}>
              {title(p)} ({p.name ? `${p.breed}, ${p.gender}` : cap(p.gender).toLowerCase()})
            </option>
          ))}
        </select>
        .
      </p>
      <div className="field mt-4" style={{ lineHeight: 1.4 }}>
        <label htmlFor="c-msg">Your message (optional)</label>
        <textarea id="c-msg" name="message" rows={3} className="input" />
      </div>
      <div className="hp" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="hand mt-4">with love, a future puppy parent</p>
      {err && (
        <p className="text-sm font-bold text-toffee-ink" role="alert" style={{ lineHeight: 1.4 }}>
          {err}
        </p>
      )}
      <button type="submit" className="btn btn-primary mt-3" disabled={state === "sending"}>
        {state === "sending" ? "Posting…" : "Post my letter"}
      </button>
    </form>
  );
}
