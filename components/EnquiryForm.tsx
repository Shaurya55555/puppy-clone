"use client";
import { useState } from "react";

export default function EnquiryForm({ puppyName, breed }: { puppyName: string; breed: string }) {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot
    if (!String(f.get("name") || "").trim() || !String(f.get("phone") || "").trim()) {
      setErr("Please add your name and a phone or WhatsApp number.");
      return;
    }
    setErr(null);
    setSent(true);
  }

  if (sent)
    return (
      <div className="panel text-center" role="status">
        <p className="font-display text-3xl">Woof! Message sent 🐾</p>
        <p className="mt-2 text-cocoa-soft">
          Thanks, our team will get back to you shortly. For the quickest reply, message us on WhatsApp.
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="panel grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="e-name">Your name *</label>
          <input id="e-name" name="name" className="input" required />
        </div>
        <div className="field">
          <label htmlFor="e-phone">Phone or WhatsApp *</label>
          <input id="e-phone" name="phone" className="input" placeholder="With country code, e.g. +971 50 123 4567" required />
        </div>
        <div className="field">
          <label htmlFor="e-email">Email (optional)</label>
          <input id="e-email" name="email" type="email" className="input" />
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
      <button className="btn btn-primary justify-self-start" type="submit">
        Send enquiry
      </button>
    </form>
  );
}
