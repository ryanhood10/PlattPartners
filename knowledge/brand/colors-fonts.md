---
title: Brand colors & fonts
tags: [brand, design]
pii: false
internal_only: false
trust_level: 3
last_verified_date: 2026-05-14
source: extracted from plattpartners.com CSS (see _research/plattpartners-site/SUMMARY.md)
---

# Brand colors & typography

**Status:** Extracted from the current plattpartners.com CSS on 2026-05-14. These match what visitors see today. Peter to confirm before locking.

## Colors (extracted from current site)

| Token | Hex | Usage on current site | Tailwind name |
|---|---|---|---|
| `platt-primary` | `#428bca` | Primary brand blue — buttons, headings, links (10× usage) | `blue.500`-ish |
| `platt-secondary` | `#215273` | Darker navy — secondary accents | `slate.700`-ish |
| `platt-accent` | `#2b7bb9` | Medium blue — gradient steps, hover states | — |
| `platt-text` | `#000000` | Body text | `black` / `neutral.900` |
| `platt-text-muted` | `#32373c` | Secondary text, UI chrome | `neutral.800` |
| `platt-bg` | `#ffffff` | Backgrounds | `white` |
| `platt-bg-soft` | `#fafafa` | Soft backgrounds, alternating sections | `neutral.50` |

The current site also uses `#0693e3` and `#00d084` (Beaver Builder defaults) in a few places — those are not brand-essential and we should drop them.

**Implementation:** Define these as Tailwind theme tokens in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      platt: {
        primary: '#428bca',
        secondary: '#215273',
        accent: '#2b7bb9',
        text: { DEFAULT: '#000000', muted: '#32373c' },
        bg: { DEFAULT: '#ffffff', soft: '#fafafa' },
      },
    },
  },
},
```

## Fonts (extracted from current site)

The current site loads from Google Fonts:
- **Roboto** — weights 300, 400, 700 — used for body
- **Work Sans** — weight 800 — used for headings

**Implementation:** Use `next/font/google` in `pages/_app.tsx` for self-hosted, performance-optimized loading:

```ts
import { Roboto, Work_Sans } from 'next/font/google';
const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-roboto' });
const workSans = Work_Sans({ subsets: ['latin'], weight: ['800'], variable: '--font-work-sans' });
```

Then in `tailwind.config.js`:
```js
fontFamily: {
  sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
  display: ['var(--font-work-sans)', 'var(--font-roboto)', 'sans-serif'],
},
```

Body text uses `font-sans`; headings (H1, H2, brand mark) use `font-display`.

## Logo variants

Stored in `public/`:
- `logo.svg` — primary horizontal logo (extracted from the 2025-04 SVG on the current site)
- `logo-mark.png` — P-mark only (for favicon, OG image avatar)

Still need to generate (Phase 0):
- Stacked logo for square spaces
- White / reversed variants for dark backgrounds
- Favicon (.ico) in 16, 32, 48, 64 px

## Spacing + radii

Tailwind defaults plus:
- Default border radius: `0.5rem` (`rounded-lg`)
- Container max-width: `1280px`
- Section vertical padding: `4rem` desktop, `2rem` mobile
- Match the current site's generous whitespace; don't pack content

## Client logos

Stored in `public/clients/`:
- `jitb.png` — Jack in the Box
- `del-taco.png` — Del Taco
- `el-pollo-loco.png` — El Pollo Loco
- `petco.png` — Petco

Plus unidentified logos at `_research/plattpartners-site/assets/logo-12.png` through `logo-72.png` — Peter to label before they ship.

## Email signatures

For each sending identity (`peter@plattpartners.com`, `peter@outreach.plattpartners.com`), set the Outlook signature to a clean HTML block:
- Name + title
- Phone (canonical — needs Peter's pick)
- Website link
- Small logo (host on Cloudinary)
- No "Sent from my iPhone" default

`brand` agent owns the signature template; lives at `knowledge/brand/email-signature.html` (Phase 1).

---

**Confirmed by Peter:** ☐
