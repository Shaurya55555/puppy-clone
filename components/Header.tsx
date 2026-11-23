"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, WA } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
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
