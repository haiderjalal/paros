# Paros website

A fast, animated single-page site for Paros, built with Next.js (App Router, static export), Framer Motion and CSS 3D.

## What is inside

- Hero: a 3D rotating ring of dishes with a headline, autoplay, pause control and keyboard support
- Marquee band of menu highlights
- Our story: a scroll-linked, three-chapter story with a sticky photo sequence
- Brand: a rotating circular badge built from the logo, plus brand values
- Menu: a 3D category coverflow (drag, arrows or keyboard), with every item and size from the printed menu, and tilt cards with floating price medallions
- Visit: order-by-phone call to action with a parallax photo, and a footer

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes a static site to /out
```

## Deploy

The `out/` folder is plain HTML, CSS and JavaScript. Host it on Vercel, Netlify, Cloudflare Pages, GitHub Pages or any static host. On Vercel or Netlify you can import the project directly and the build command `npm run build` is detected automatically.

## Where to edit

- `src/data/menu.js`: every category, item, size and price
- `src/data/site.js`: phone, address, hero slides, story chapters, brand values and marquee words
- `src/data/images.js`: Unsplash photo IDs. Change any ID to swap a photo across the site
- `public/logo.png`: the logo (round, transparent background)

Prices were read from the printed menu. Check any that look wrong before going live, especially drinks, fries and the sandwich prices.

## Performance

- Static export: pages are pre-built, so there is no server work per visit
- Framer Motion uses the `LazyMotion` build with only the features in use
- Fonts are self-hosted through `@fontsource`, so there are no third-party font requests
- Photos use responsive `srcset` and `sizes`, and Unsplash serves WebP/AVIF automatically
- The first hero dish loads with high priority. Hidden carousel slides load lazily at low priority
- Animations run on `transform` and `opacity` only

## Accessibility

- The hero carousel has a visible pause button
- The menu coverflow works with arrow keys and with clicks
- Motion is reduced for users who set "reduce motion" in their system
- Every photo has a designed fallback, so a failed image never leaves a broken icon
