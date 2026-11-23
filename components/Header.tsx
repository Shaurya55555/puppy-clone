"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, WA } from "@/lib/site";
import { useFavorites } from "@/lib/favorites";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { favs } = useFavorites();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="hdr">
      <div className="wrap hdr-bar">
        <Link href="/" className="hdr-brand" aria-label="TeddyPups home">
          <Image src="/logo.png" alt="" width={44} height={44} priority />
          TeddyPups
        </Link>
        <nav className="hdr-nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hdr-end">
          <Link href="/favourites" className="hdr-fav" aria-label={`Favourites (${favs.length})`}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M12 21s-7.5-4.6-9.6-9.2C1 8.7 2.8 5 6.3 5c2 0 3.5 1.1 4.2 2.4h3C14.2 6.1 15.7 5 17.7 5c3.5 0 5.3 3.7 3.9 6.8C19.5 16.4 12 21 12 21Z" fill={favs.length ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
            {favs.length > 0 && <b>{favs.length}</b>}
          </Link>
          <a href={WA} className="btn btn-wa hdr-wa" target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
          <button className="hdr-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div id="menu" className="menu-overlay" role="dialog" aria-label="Menu">
          <div className="flex items-center justify-between">
            <span className="hand" style={{ color: "var(--color-honey)" }}>
              where to, friend?
            </span>
            <button
              className="hdr-menu"
              style={{ borderColor: "var(--color-milk)", color: "var(--color-milk)" }}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav className="mt-6 flex flex-col" aria-label="Mobile">
            {NAV.map((n, i) => (
              <Link key={n.href} href={n.href} className="ml" style={{ animationDelay: `${i * 60}ms` }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a href={WA} className="btn btn-wa mt-auto" target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </div>
      )}
    </header>
  );
}
