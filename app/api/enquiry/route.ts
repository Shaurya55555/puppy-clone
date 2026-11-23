import { NextResponse } from "next/server";
import { puppies } from "@/lib/data";

type Body = Record<string, unknown>;

// Tiny in-memory limiter: 5 enquiries per IP per 10 minutes (per server instance).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many enquiries. Please try again in a few minutes." }, { status: 429 });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (str(body.website, 100)) return NextResponse.json({ ok: true });

  const name = str(body.name, 80);
  const phone = str(body.phone, 30);
  const email = str(body.email, 120);
  const area = str(body.area, 80);
  const message = str(body.message, 1000);
  const slug = str(body.puppy, 80);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!/^\+?[0-9][0-9\s()-]{6,17}$/.test(phone)) errors.phone = "Enter a valid phone or WhatsApp number, e.g. +971 50 123 4567.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That email doesn't look right.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const p = puppies.find((x) => x.slug === slug);
  const subject = p ? `${p.name ?? p.breed} (${p.breed})` : "your puppies";
  // On Vercel this lands in the function logs, so every enquiry is traceable.
  console.log("[enquiry]", JSON.stringify({ name, phone, email, area, puppy: slug || null, message, at: new Date().toISOString() }));

  const wa = `https://wa.me/919898124987?text=${encodeURIComponent(
    `Hi TeddyPups! I'm ${name}${area ? ` from ${area}` : ""}. I'd love to know more about ${subject}.${message ? ` ${message}` : ""}`,
  )}`;
  return NextResponse.json({ ok: true, wa });
}
