import type { Metadata } from "next";
import { Fraunces, Figtree, Shantell_Sans } from "next/font/google";
import "./globals.css";
import "./home.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz", "SOFT"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const shantell = Shantell_Sans({ variable: "--font-shantell", subsets: ["latin"] });

const SITE = "https://puppy-clone-vert.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "TeddyPups U.A.E. — Premium teacup puppies in Dubai", template: "%s" },
  description:
    "Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    type: "website",
    siteName: "TeddyPups U.A.E.",
    title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
    description: "Real puppies, real photos, looking for their families right now.",
    images: [{ url: "/logo.png", width: 800, height: 800, alt: "TeddyPups" }],
  },
  twitter: { card: "summary", title: "TeddyPups U.A.E.", description: "Premium teacup puppies in Dubai." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} ${shantell.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[70] focus:bg-milk focus:p-3">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
