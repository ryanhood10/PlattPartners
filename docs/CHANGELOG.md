# Changelog

Running log of everything built. Newest at top. Each entry links to the commit, lists what shipped, and points at the docs that explain it.

Format: `[<commit>] <date> — <one-line summary>`, followed by details.

---

## [cd82d57](https://github.com/ryanhood10/PlattPartners/commit/cd82d57) — 2026-05-14 — Favicon, eval pairs, GitHub Actions CI

**Polish + CI infrastructure.** Site now has a real favicon, eval set expanded to 18 pairs covering the actual site content, and every PR now gets typecheck + build verification.

Files: `public/favicon.png`, `public/apple-touch-icon.png`, `pages/_document.tsx`, `eval/qa_pairs.jsonl`, `.github/workflows/ci.yml`

Docs touched: none

---

## [fd2b78f](https://github.com/ryanhood10/PlattPartners/commit/fd2b78f) — 2026-05-14 — Dashboard mock data — Pipeline, Clients, Inbox, Outreach Queue

**Demo-readiness.** All four dashboard pages now render realistic mock data. The kanban has 12 candidates across 8 stages, the Clients table has 10 contacts (4 real public clients + 6 fictional), the Inbox has 5 classified messages, and the Outreach Queue has 3 sample drafts with realistic Peter-voice copy.

Mock fixtures shaped to match the Mongoose models so swapping to live queries is a one-line change per page.

Files: `lib/mock.ts` (new, 220 lines), `pages/app/pipeline.tsx`, `pages/app/clients.tsx`, `pages/app/outreach.tsx`, `pages/app/inbox.tsx`

Docs: `docs/build_plan.md` Phase 1 deliverable partially complete (dashboard views, empty-state UI)

---

## [2e9b840](https://github.com/ryanhood10/PlattPartners/commit/2e9b840) — 2026-05-14 — Mobile nav, 8 Mongoose models, contact form persistence

**Data layer + mobile UX.** Mobile header now has a working hamburger menu with all nav items. Eight Mongoose models cover the entire data layer: Candidate, Client, Job, PipelineState, OutreachDraft, EmailMeta, Contact, User. Each uses the singleton pattern for Next.js hot reload. The public contact form now persists submissions to a `Contact` collection when `MONGODB_URI` is set; falls back to log-only when not.

Files: `components/marketing/SiteHeader.tsx`, `models/*.ts` (9 files), `pages/api/public/contact.ts`

Docs: `docs/architecture.md` collections section

---

## [5389d11](https://github.com/ryanhood10/PlattPartners/commit/5389d11) — 2026-05-14 — SEO hygiene — sitemap, robots, JSON-LD, OG image

**Pre-cutover SEO readiness.** Every public page now has Schema.org JSON-LD (Organization + WebSite + WebPage + ProfessionalService + Person/Article as appropriate), canonical URLs, OG tags, and Twitter Card metadata. Sitemap.xml lists all 6 public pages; robots.txt blocks `/api/` and `/app/` while pointing crawlers at the sitemap.

Files: `lib/site.ts`, `lib/schema.ts`, `components/marketing/JsonLd.tsx`, `components/marketing/SeoHead.tsx`, `pages/sitemap.xml.tsx`, `pages/robots.txt.tsx`, all marketing pages

Docs: this CHANGELOG; will also note in `docs/runbooks/dns-cutover.md` once that exists

---

## [3c84a5e](https://github.com/ryanhood10/PlattPartners/commit/3c84a5e) — 2026-05-14 — SEO preservation — rebuild missing landing page + 301 redirects

**Don't break Google rankings during cutover.** Built the `/how-to-build-a-robust-pipeline-of-qualified-candidates` page at the same URL it has on Peter's WP site (preserves long-tail SEO). Added 301 redirects in `next.config.js` for `/about-services` → `/about` since we changed that URL. Lead-magnet PDF (4.4MB) brought over to `public/downloads/`.

Files: `pages/how-to-build-a-robust-pipeline-of-qualified-candidates.tsx`, `next.config.js`, `public/downloads/outbound-recruiting-pro-tips.pdf`, `public/downloads/download-pdf-cover.jpg`

Docs: `docs/build_plan.md` Phase 1 redirect-map deliverable

---

## [ba584a0](https://github.com/ryanhood10/PlattPartners/commit/ba584a0) — 2026-05-14 — Finish public-site clone + dashboard empty states

**Site clone + dashboard skeleton.** Added `/about`, `/contact`, `/privacy-policy` to complete public-site parity with the current WP sitemap. Built the dashboard layout (sidebar nav + top bar + sign-out) and 8 auth-walled dashboard pages with empty states.

Files: `pages/about.tsx`, `pages/contact.tsx`, `pages/privacy-policy.tsx`, `components/dashboard/DashboardLayout.tsx`, `components/dashboard/EmptyState.tsx`, `pages/app/*.tsx` (8 pages), `lib/auth.ts` (added `requireAuth` GSSP helper)

Docs: `docs/architecture.md` repo layout

---

## [ca7febb](https://github.com/ryanhood10/PlattPartners/commit/ca7febb) — 2026-05-14 — First Heroku deploy

**Production lives.** Heroku app `platt-partners` created (heroku-24, Basic dyno, US region). Live at `https://platt-partners-3b59df8c6202.herokuapp.com`. NEXTAUTH_URL, NEXTAUTH_SECRET, JOB_RUNNER_SECRET set as Config Vars. Health endpoint returns ok. Custom-domain cutover deferred until Peter's DNS access lands.

Files: `docs/runbooks/heroku-deploy.md` (new)

Docs: `docs/decisions.md` deploy decision, `docs/runbooks/heroku-deploy.md`

---

## [78c4710](https://github.com/ryanhood10/PlattPartners/commit/78c4710) — 2026-05-14 — Clone current plattpartners.com homepage + /technology

**Marketing site clone.** Built shared SiteHeader + SiteFooter + ContactForm components. Replaced placeholder homepage with full clone of plattpartners.com home (13 sections), plus the `/technology` page mirroring the current site. All copy verbatim from `_research/plattpartners-site/`.

Files: `components/marketing/SiteHeader.tsx`, `components/marketing/SiteFooter.tsx`, `components/marketing/ContactForm.tsx`, `pages/api/public/contact.ts`, `pages/index.tsx`, `pages/technology.tsx`

---

## [5780010](https://github.com/ryanhood10/PlattPartners/commit/5780010) — 2026-05-14 — Scaffold Next.js 14 Pages Router app

**Stack landed.** Next.js 14 Pages Router + React 18 + TypeScript strict + Tailwind 3.4 + shadcn-style components + NextAuth v4 with Microsoft Entra provider + Mongoose 8 + pino. Brand palette (#428bca primary, #215273 secondary) wired into Tailwind. Roboto + Work Sans loaded via `next/font/google`. shadcn `Button` as the first component. Procfile + app.json for Heroku. Health endpoint and NextAuth route wired but stubbed pending Peter's M365 access.

Files: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `components.json`, `styles/globals.css`, `pages/_app.tsx`, `pages/_document.tsx`, `pages/index.tsx`, `pages/app/index.tsx`, `pages/api/health.ts`, `pages/api/auth/[...nextauth].ts`, `lib/utils.ts`, `lib/db.ts`, `lib/auth.ts`, `lib/logger.ts`, `lib/api.ts`, `components/ui/button.tsx`, `Procfile`, `app.json`, `scripts/verify-env.js`, `types/next-auth.d.ts`

Docs: this CHANGELOG

---

## [f061224](https://github.com/ryanhood10/PlattPartners/commit/f061224) — 2026-05-14 — Peter onboarding email sent

**Kickoff communications.** Final version of the 16-item ask list sent to Peter at peter@plattpartners.com. WordPress admin downgraded to nice-to-have-PS. LinkedIn ask reframed from "give us a seat" to "walk us through your workflow once." TN confirmed (no need to ask). Bo/Peter dropped (was a placeholder in the original handoff). Status tracker in the doc gets updated as he replies.

Files: `docs/peter-onboarding.md`

---

## [73a9403](https://github.com/ryanhood10/PlattPartners/commit/73a9403) — 2026-05-14 — Finalize Peter kickoff email

**Email content lock.** 21-item version with reframed Google Search Console ask, simplified candidate-tracking question (no jargon), Anthropic PII tolerance question dropped (default-yes is fine). Replaced by f061224.

Files: `docs/peter-onboarding.md`

---

## [7b5b3f3](https://github.com/ryanhood10/PlattPartners/commit/7b5b3f3) — 2026-05-14 — Peter onboarding ask list + response tracker (initial)

**Email skeleton.** Created `docs/peter-onboarding.md` with the ask list and response tracker table.

Files: `docs/peter-onboarding.md` (new)

---

## [ca93061](https://github.com/ryanhood10/PlattPartners/commit/ca93061) — 2026-05-14 — Initial foundation — docs, knowledge, team roster, site research

**Project foundation.** Locked the decisions in `docs/decisions.md`: Next.js Pages Router + React 18 + Tailwind + shadcn + Mongoose + NextAuth single Heroku app, WordPress migration brought into Phase 0/1 (was Phase 5+), live/event-driven architecture, 12-role team roster, no financials. Crawled plattpartners.com manually (sub-agent permission denied), extracted 5 pages of content + 18 assets, brand colors (#428bca, #215273), fonts (Roboto + Work Sans), tracking IDs. Brought forward the handoff knowledge templates.

Files: 60+ files including TEAMS.md, CLAUDE.md, README.md, docs/build_plan.md, docs/architecture.md, docs/decisions.md, docs/blockers.md, docs/security.md, docs/api_integrations.md, docs/glossary.md, knowledge/* (12 wiki + brand files), eval/* (3 files), public/clients/* (4 logos), _research/plattpartners-site/* (6 page extracts + 18 assets)

---

## Pre-build (handoff package received 2026-05-13)

- 8-doc handoff package unpacked into `handoff/platt-partners-handoff/` (kept locally as historical reference, gitignored)
- Source-of-truth canonical docs migrated into the repo root in commit `ca93061`

---

## How to read this changelog

- **Per commit:** what shipped + which docs got touched. If a doc didn't get touched, that's a flag — it probably should.
- **By phase:** Phase 0 = commits before first Heroku deploy. Phase 1 = everything since (marketing-site cutover work). See `docs/build_plan.md` for the phase definitions.
- **Numbered status:** see `docs/build_plan.md` deliverable checklists; each phase has line-level checkboxes marked as items land.
