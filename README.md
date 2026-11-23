# TeddyPups clone

A clone of https://puppy.instabizweb.com/ built for the Blutec AI technical assignment.

- **Live:** https://puppy-clone-vert.vercel.app
- **Stack:** Next.js (App Router, static generation), TypeScript, Tailwind CSS v4, `next/image`, `next/font`, Vitest

## What is cloned
Every page of the reference site: home, `/puppies` (breed and origin filters stored in the URL), `/puppies/[slug]` (42 statically generated profiles with gallery), `/gone-home` (tickets), `/happy-families`, `/how-it-works`, `/faq` (note board), `/contact` (letter form), plus the mobile menu, sticky mobile WhatsApp/Call bar and the reference's design tokens (colours, Fraunces / Figtree / Shantell Sans).

The home page recreates the reference's storytelling, drawn from scratch:
- **Door scene**: a scroll-pinned horizontal "Meet the pups" street. A walking mascot passes the doors and each one swings open to show the puppy. On phones and with `prefers-reduced-motion` it becomes a swipeable strip of open doors.
- **Signpost** ("Two ways to meet your puppy"), **chat-phone journey** that advances with scroll, **puppy passport book** with stamps, a dusk "welcome home" call to action, and scroll-reveal animations.
- The mascot is an original SVG (`components/Mascot.tsx`), not copied from the reference.

## What goes beyond the reference
1. **Find my pup** (`/match`): a five-question quiz that ranks the available puppies for your home, kids, activity, grooming time and timing, with reasons for each score (`lib/match.ts`). It uses general breed tendencies and says so.
2. **Favourites**: heart any puppy; saved on-device (`localStorage` via `useSyncExternalStore`), shown in the header and on `/favourites`, with one WhatsApp message for all of them.
3. **Real enquiry API** (`/api/enquiry`): server-side validation, honeypot, per-IP rate limit, and a WhatsApp handoff pre-filled with the visitor's details.
4. **Quality**: 8 unit/API tests (`npm test`), ESLint, GitHub Actions CI (lint, test, build), `sitemap.xml`, `robots.txt`, Open Graph metadata, 404 and error pages, skip link, keyboard-accessible gallery. axe-core reports no WCAG A/AA violations on the pages I scanned.

## Run locally
```
npm install
npm run dev      # development
npm test         # vitest
npm run build    # production build
```

## Notes
- Puppy data is in `lib/data.ts`, images in `public/m/` (copied from the reference site for this exercise only).
- Enquiries are validated and logged on the server (visible in Vercel function logs); there is no database or email sender.
- The "video" badges from the reference are omitted because the pages contain no playable videos.
