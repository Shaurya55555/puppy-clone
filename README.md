# TeddyPups clone

A clone of https://puppy.instabizweb.com/ built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Pages
`/`, `/puppies` (breed and origin filters), `/puppies/[slug]` (42 statically generated profiles), `/gone-home`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`.

## Run
```
npm install
npm run dev
```

Puppy data lives in `lib/data.ts`, images in `public/m/`. Enquiry forms validate on the client only (no backend).
