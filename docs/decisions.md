# Decisions Log

Every architectural decision goes here. Format:

```
## YYYY-MM-DD — <short title>

**Decision:** <what we decided>
**Alternatives considered:** <what we ruled out and why>
**Rationale:** <why this won>
**Approved by:** <Ryan / Peter / agent>
**Reversible?:** <yes / no / costly>
```

If a decision is reversed later, append a new entry referencing the old one — never edit the original.

---

## 2026-05-14 — Stack: Next.js Pages Router + React 18 + Tailwind + shadcn

**Decision:** The web app is a single Next.js 14 application using the Pages Router, with React 18, Tailwind, and shadcn/ui components. Mongoose for ORM, NextAuth (Auth.js) with Microsoft Entra provider for auth, pino for logging.

**Alternatives considered:**
- **CRA + React 18** — Ryan's default. Rejected because the marketing-site rebuild needs SSR for SEO during the WP cutover, and CRA has no built-in SSR.
- **Vite + React 18 + react-router** — Ryan was open. Rejected for the same reason: SSR would need `vite-plugin-ssr` + a custom server, which is more risk than benefit for a project that needs SEO-safe page rendering.
- **Next.js App Router** — newer, but Pages Router is more stable, simpler mental model, easier Heroku deploy, and Ryan's coming from CRA so the Pages-Router model is more familiar.
- **Express + separate React SPA** — what the handoff scaffold did. Rejected because we're now one Heroku app and Next.js API routes give us the same Express-y surface without the second app.

**Rationale:** SSR/SSG out of the box, file-based routing matches a CRA mental model, deploys cleanly to Heroku, and lets the same codebase serve the public marketing site (SEO-critical) and the authenticated dashboard.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Costly — rewriting the marketing-site rendering layer later would mean a second SEO cutover risk.

---

## 2026-05-14 — Deployment: Heroku only, single app

**Decision:** One Heroku app hosts everything — the Next.js server-rendered pages, the API routes, and the static assets. Custom domain on the apex (`plattpartners.com`). No Netlify, no Vercel, no Cloudflare Pages.

**Alternatives considered:**
- **Two Heroku apps** (web + api): cleaner separation but doubles dyno cost and adds CORS. Rejected.
- **Netlify + Heroku split** (handoff default): rejected. Ryan deploys with Heroku only across his projects (Eldrin AI, BitcoinBay); consistency wins.
- **Vercel Hobby**: prohibits commercial use; Platt Partners is commercial.

**Rationale:** Ryan owns the deployment story. One app, one domain, one CORS surface, one set of config vars, one place to look when something breaks.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Yes — splitting later is straightforward if the dyno gets cramped.

---

## 2026-05-14 — Database: MongoDB + MongoDB Atlas

**Decision:** Keep the handoff's database choice. MongoDB Atlas M0 free tier to start; upgrade to M2 ($9/mo) when 512MB becomes a constraint.

**Alternatives considered:** Postgres on Heroku, Supabase. Rejected — Ryan uses Mongo across his projects and the handoff's schema cut already fits a document model well.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Costly — schema migration would be a multi-week effort.

---

## 2026-05-14 — No Raspberry Pi in v1

**Decision:** All background work runs on Heroku — Heroku Scheduler for cron, the web dyno for live webhooks, an optional worker dyno only if a job genuinely needs continuous runtime. The handoff's Pi-centered architecture is out.

**Alternatives considered:**
- **Hybrid Pi + Heroku** (handoff): rejected for v1. Adds an ISP-dependent box to the topology, complicates deploys, and the scale Peter operates at does not require it.
- **Heroku worker dyno from day 1**: deferred. Add only when a specific job demands it.

**Rationale:** Jobs are light, internal-use. Heroku Scheduler hits the cron use cases; web dyno hits the webhook ones; vector storage moves to a hosted option (Pinecone or Atlas Vector Search). One deploy command, one platform, no SD-card failure modes.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Yes — Pi can be layered in later if vector storage costs grow or a worker outgrows the web dyno.

---

## 2026-05-14 — Architecture posture: live-first, event-driven

**Decision:** Default to webhook / event-driven processing on the web dyno. Use Heroku Scheduler only for jobs that genuinely have a schedule requirement (daily GA4 pull, nightly evals, nightly backup, weekly reports).

**Rationale:** Better UX, fewer queue states to debug, simpler runtime. Real-time wins almost everywhere in this build.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Yes.

---

## 2026-05-14 — Vector DB: Pinecone or Atlas Vector Search (pick during Phase 4)

**Decision:** No self-hosted Qdrant. The vector layer is hosted; final choice between Pinecone free tier and MongoDB Atlas Vector Search is deferred to the `ai-mgr` agent during Phase 4 kickoff.

**Rationale:** Pi is out (see above). Solo-dev maintenance cost of a hosted vector DB is near zero. Both candidates are free at Peter's scale.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Yes — embeddings can be re-indexed into a different vector store in ~a day.

---

## 2026-05-14 — WordPress migration pulled into Phase 0/1 (was Phase 5+)

**Decision:** plattpartners.com migrates OFF WordPress and INTO our Next.js app as part of Phase 0/1. The marketing site and the dashboard share one codebase, one Heroku app, one domain.

**Alternatives considered:**
- **Keep WP, embed widget** (handoff default — Phase 5+ migration): rejected. Ryan does not want to work with WordPress at all.
- **Two separate Next.js apps** (marketing + dashboard): rejected per "single Heroku app" decision above.

**Rationale:** Consolidates everything Ryan owns into one codebase. Enables future personalization without a second migration. Removes the agency-coordination overhead of editing through Good Online Marketing.

**Risk:** SEO regression during cutover. Mitigations: every WP URL gets an explicit 301 in `next.config.js`; new sitemap submitted to Search Console; 30-day monitoring window with rollback plan; existing UA-172816061-1 tracking must be replaced with GA4 before cutover.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Costly. Once DNS flips, rolling back means a second migration.

---

## 2026-05-14 — Team structure: 12-role roster, named feature managers

**Decision:** Adopt the 12-role roster in `TEAMS.md`. Two project-leadership roles, seven feature managers, three cross-cutting specialists. Marketing-site + analytics + brand alignment is enforced at every phase gate by `project-manager`. No financial-ops manager.

**Rationale:** Ryan explicitly requested named managers per major capability and a non-negotiable alignment check across marketing/tracking/website.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Yes — roles can be renamed/merged without disruption.

---

## 2026-05-14 — Out of scope: Peter's financials

**Decision:** No QuickBooks, no invoicing, no AR/bank pulls, no commission tracking in v1.

**Rationale:** Ryan's explicit call. Can be added later as a separate vertical.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Yes.

---

## 2026-05-14 — Public AI widget: React component, not script-tag embed

**Decision:** Since the marketing site is now in the same Next.js app, the public AI widget is a React component on the public pages — not a `<script>` snippet embedded into an external site.

**Rationale:** One CORS surface, one rate-limit middleware, one place to update. Trade-off: not portable to a third-party site. If Peter ever wants it elsewhere, we re-export it as a script bundle then.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Yes — exporting a script-tag version later is a small build target.

---

## 2026-05-14 — First production deploy

**Decision:** Heroku app `platt-partners` created in US region on heroku-24 stack with Basic dyno. Initial deploy live at https://platt-partners-3b59df8c6202.herokuapp.com. Build pipeline (npm install → next build → next start) verified end-to-end.

**Rationale:** Validates the Heroku-only deployment story before any real feature work lands. Gives Ryan a public URL to A/B against the current WordPress site visually. Custom domain (plattpartners.com) deferred until Peter's DNS access lands.

**Approved by:** Ryan, 2026-05-14
**Reversible?:** Yes (`heroku apps:destroy platt-partners`)

See `docs/runbooks/heroku-deploy.md` for the full runbook.

---

## Open decisions (need Peter input — landed in docs/blockers.md)

- Canonical verticals: site says "tech, financial services, fast casual dining"; handoff says "restaurant ops, tech, IT, construction." Need Peter to pick.
- Canonical service framing: "subscription / fee-per-placement" (homepage) vs "RPO / SEARCH / Staffing" (about-services). Need Peter to pick.
- Canonical phone number and email: three of each on the current site. Need Peter to pick.
- Tennessee vs California operating location.
- Site-Kit GA4 reauth path: site is firing a deprecated UA property.
