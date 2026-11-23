# TeddyPups clone

A clone of https://puppy.instabizweb.com/ built for the Blutec AI technical assignment.

- **Live:** https://puppy-clone-vert.vercel.app
- **Stack:** Next.js (App Router, static generation), TypeScript, Tailwind CSS v4, `next/image`, `next/font`

## What is cloned
Every page of the reference site: home, `/puppies` (breed and origin filters stored in the URL), `/puppies/[slug]` (42 statically generated profiles with gallery), `/gone-home`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, plus the mobile menu, sticky mobile WhatsApp/Call bar, and the design tokens (colours, Fraunces / Figtree / Shantell Sans) taken from the reference.

## What goes beyond the reference
1. **Find my pup** (`/match`): a five-question quiz that ranks the available puppies for your home, kids, activity, grooming time and timing. Scores come from general breed tendencies in `lib/match.ts` and each result shows its reasons.
2. **Favourites**: heart any puppy; saved on-device (localStorage via `useSyncExternalStore`), shown in the header and on `/favourites`, with one WhatsApp message for all of them.
3. **Real enquiry API** (`/api/enquiry`): server-side validation, honeypot, per-IP rate limit, and a WhatsApp handoff pre-filled with the visitor's details.
4. SEO and quality: `sitemap.xml`, `robots.txt`, 404 page, skip link, keyboard-accessible gallery, `prefers-reduced-motion` support.

## Run locally
```
npm install
npm run dev
```

## Notes
- Puppy data is in `lib/data.ts`, images in `public/m/` (copied from the reference site for this exercise).
- Enquiries are validated and logged on the server (visible in Vercel function logs); there is no database or email sender.
- The reference site's heavier scroll animations (doors, curtain, running puppy) are not reproduced.
