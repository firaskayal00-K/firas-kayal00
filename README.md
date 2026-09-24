# Basim Kayal Architect

Bilingual (English / Arabic) marketing site for Basim Kayal Architect, built with Next.js App Router and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` or `/ar` based on your browser language.

## Structure

- `src/app/[locale]/` — routes for the `en` and `ar` locales (`src/proxy.ts` picks the locale and redirects `/`).
- `src/content/` — all page copy, typed per locale (`en.ts`, `ar.ts`).
- `src/components/` — page sections (hero, services, projects, contact, etc).

Arabic pages render right-to-left with Amiri / IBM Plex Sans Arabic; English pages use Playfair Display / Montserrat.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
