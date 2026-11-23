import type { MetadataRoute } from "next";
import { puppies } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://puppy-clone.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/puppies", "/match", "/gone-home", "/happy-families", "/how-it-works", "/faq", "/contact"].map((p) => ({ url: BASE + p }));
  return [...pages, ...puppies.map((p) => ({ url: `${BASE}/puppies/${p.slug}` }))];
}
