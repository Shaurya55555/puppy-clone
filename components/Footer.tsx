import Link from "next/link";
import { EMAIL, PHONE, WA } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="quilt" aria-hidden />
      <div className="wrap section grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl text-honey">Home, at last.</p>
          <p className="mt-3 max-w-sm opacity-80">
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link href="/puppies">Available puppies</Link></li>
            <li><Link href="/gone-home">Gone home</Link></li>
            <li><Link href="/happy-families">Happy families</Link></li>
            <li><Link href="/how-it-works">How it works</Link></li>
            <li><Link href="/how-it-works#delivery">Delivery &amp; collection</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Visit &amp; contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Say hello</h4>
          <ul>
            <li><a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp {PHONE}</a></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>Downtown Dubai, United Arab Emirates</li>
            <li className="flex gap-4">
              <a href="https://www.instabizweb.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.instabizweb.com/" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="https://www.instabizweb.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-wrap items-center justify-between gap-2 border-t border-white/10 py-5 text-sm opacity-70">
        <span>© 2026 TeddyPups U.A.E.</span>
        <span className="hand" style={{ color: "var(--color-honey)" }}>every puppy is family</span>
      </div>
    </footer>
  );
}
