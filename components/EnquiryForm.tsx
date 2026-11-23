"use client";
import { useState } from "react";
import { sendEnquiry } from "@/lib/enquiry";

export default function EnquiryForm({ puppyName, breed, slug }: { puppyName: string; breed: string; slug: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [wa, setWa] = useState<string | undefined>();
  const [err, setErr] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    setErr(null);
    setFields({});
    const r = await sendEnquiry(form, slug);
    if (r.ok) {
      setWa(r.wa);
      setState("sent");
    } else {
      setState("idle");
      setFields(r.errors ?? {});
      setErr(r.error ?? (r.errors ? "Please fix the highlighted fields." : "Something went wrong."));
    }
  }

  if (state === "sent")
    return (
      <div className="panel text-center" role="status">
        <p className="font-display text-3xl">Woof! Message sent 🐾</p>
        <p className="mt-2 text-cocoa-soft">Thanks, our team will get back to you shortly. For the quickest reply, continue on WhatsApp.</p>
        {wa && (
          <a href={wa} className="btn btn-wa mt-4" target="_blank" rel="noopener noreferrer">
            Continue on WhatsApp
          </a>
        )}
      </div>
    );

  const msg = (k: string) => fields[k] && <span className="text-sm font-bold text-toffee-ink">{fields[k]}</span>;

  return (
    <form onSubmit={onSubmit} className="panel grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="e-name">Your name *</label>
          <input id="e-name" name="name" className="input" required aria-invalid={!!fields.name} />
          {msg("name")}
        </div>
        <div className="field">
          <label htmlFor="e-phone">Phone or WhatsApp *</label>
          <input id="e-phone" name="phone" className="input" placeholder="With country code, e.g. +971 50 123 4567" required aria-invalid={!!fields.phone} />
          {msg("phone")}
        </div>
        <div className="field">
          <label htmlFor="e-email">Email (optional)</label>
          <input id="e-email" name="email" type="email" className="input" aria-invalid={!!fields.email} />
          {msg("email")}
        </div>
        <div className="field">
          <label htmlFor="e-area">Your area (optional)</label>
          <input id="e-area" name="area" className="input" placeholder="e.g. Dubai Marina" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="e-msg">Message (optional)</label>
        <textarea
          id="e-msg"
          name="message"
          rows={3}
          className="input"
          defaultValue={`Hi! I'd love to know more about ${puppyName} (${breed}).`}
        />
      </div>
      <div className="hp" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {err && (
        <p className="text-sm font-bold text-toffee-ink" role="alert">
          {err}
        </p>
      )}
      <button className="btn btn-primary justify-self-start" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
