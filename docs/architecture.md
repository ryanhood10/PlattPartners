# Architecture

How the Platt Partners system is actually wired. See `decisions.md` for the *why* behind each choice; `build_plan.md` for what's still to come; this is the *how* of what's shipped today.

**Last reconciled:** 2026-05-14

---

## High-level

```
┌──────────────────────────────────────────────────────────────────────┐
│  plattpartners.com  (post-cutover)  +  current: platt-partners-...   │
│  -3b59df8c6202.herokuapp.com                                         │
│                                                                       │
│   Public marketing pages       │   Authenticated dashboard            │
│   (SSR/SSG, SEO-optimized)     │   (Microsoft Entra OAuth)            │
│   /, /about, /technology,      │   /app/pipeline, /app/clients,       │
│   /contact, /privacy-policy,   │   /app/inbox, /app/outreach,         │
│   /how-to-build-...            │   /app/bd, /app/analytics,           │
│   /sitemap.xml, /robots.txt    │   /app/assistant, /app/settings      │
└──────────────────────────────────────────────────────────────────────┘
                          │
                          │  Next.js API routes (/api/*)
                          ▼
┌──────────────────────────────────────────────────────────────────────┐
│  pages/api/*  —  Express-shaped routes inside Next.js                │
│                                                                       │
│   Live today:                                                         │
│   /api/health           Unauthenticated, returns JSON ok              │
│   /api/auth/[...nextauth]  NextAuth + Microsoft Entra (stubbed,       │
│                            needs MS_CLIENT_ID/SECRET to function)     │
│   /api/public/contact   Zod-validated, persists to Mongo when         │
│                         MONGODB_URI is set; logs only otherwise.      │
│                                                                       │
│   Planned (Phase 2-5):                                                │
│   /api/candidates, /api/clients, /api/pipeline, /api/outreach,        │
│   /api/inbox, /api/bd, /api/analytics, /api/assistant/ask,            │
│   /api/public/ask, /api/webhooks/msgraph, /api/webhooks/onedrive,     │
│   /api/jobs/<name>                                                    │
└──────────────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
┌────────────────┐  ┌──────────────┐  ┌────────────────────────────┐
│ MongoDB Atlas  │  │ Vector store │  │  External services         │
│ (pending)      │  │ Pinecone OR  │  │  - Microsoft 365 Graph     │
│                │  │ Atlas Vector │  │  - Apollo.io REST API      │
│ 8 models       │  │ Search       │  │  - Anthropic (Claude)      │
│ ready in       │  │ (Phase 4)    │  │  - Google AI (Gemini)      │
│ models/*       │  │              │  │  - Voyage AI (embeddings)  │
│                │  │              │  │  - Google APIs (GA4, SC)   │
│                │  │              │  │  - Cloudinary              │
│                │  │              │  │  - Upstash (rate limit)    │
│                │  │              │  │  - Backblaze B2 (backups)  │
└────────────────┘  └──────────────┘  └────────────────────────────┘
```

**One Heroku app. One domain. One CORS surface. One deploy.**

- **Heroku app:** `platt-partners` (heroku-24 stack, Basic dyno, US region)
- **Production URL:** https://platt-partners-3b59df8c6202.herokuapp.com (until DNS cutover)
- **Git remote:** `heroku` → https://git.heroku.com/platt-partners.git
- **GitHub:** https://github.com/ryanhood10/PlattPartners

The dashboard lives under `/app/*` (auth-walled). The marketing site lives at `/`, `/about`, etc. Both ship from the same Next.js build.

---

## Stack reality check

| Layer | Choice | Status |
|---|---|---|
| Web framework | Next.js 14 Pages Router + React 18 + TypeScript strict | ✅ Shipping |
| Styling | Tailwind 3.4 + shadcn-style components (copied, not registry-installed) | ✅ Shipping |
| Auth | NextAuth v4 + Microsoft Entra provider | ⚠️ Wired, needs `MS_*` env vars |
| API | Next.js API routes (no Express) | ✅ 3 routes live |
| Database | MongoDB Atlas + Mongoose 8 | ⚠️ Models ready, no cluster yet |
| Vector | Pinecone or Atlas Vector Search | ⏳ Phase 4 |
| Embeddings | Voyage-3-lite | ⏳ Phase 4 |
| LLM | Claude Sonnet (drafting), Haiku (classify), Gemini Flash (bulk) | ⏳ Phase 3+ |
| Email | Microsoft 365 Graph | ⏳ Phase 3 |
| Enrichment | Apollo.io | ⏳ Phase 2 |
| Hosting | Heroku Basic dyno | ✅ Deployed |
| Cron | Heroku Scheduler | ⏳ When first scheduled job needs it |
| Logging | pino | ✅ Wired |

Status legend: ✅ shipping in production, ⚠️ in code but needs config, ⏳ planned for a later phase

---

## Repo structure (actual)

See `README.md` for the full tree. Key paths:

```
pages/                          # Routes
  index.tsx                     # /
  about.tsx                     # /about
  contact.tsx                   # /contact
  technology.tsx                # /technology
  how-to-build-...tsx           # /how-to-build-a-robust-pipeline-of-qualified-candidates
  privacy-policy.tsx            # /privacy-policy
  sitemap.xml.tsx               # /sitemap.xml (XML)
  robots.txt.tsx                # /robots.txt
  app/                          # /app/* — auth-walled dashboard
    index.tsx                   # → redirects to /app/pipeline
    pipeline.tsx, clients.tsx, inbox.tsx, outreach.tsx,
    bd.tsx, analytics.tsx, assistant.tsx, settings.tsx
  api/
    auth/[...nextauth].ts
    health.ts
    public/contact.ts

components/
  ui/button.tsx                 # shadcn-copied; add more via `npx shadcn add <name>`
  marketing/                    # SiteHeader, SiteFooter, ContactForm, SeoHead, JsonLd
  dashboard/                    # DashboardLayout, EmptyState

lib/
  db.ts                         # Mongoose connection (cached for HMR)
  auth.ts                       # NextAuth options + requireAuth() GSSP helper
  logger.ts                     # pino + secret redaction
  api.ts                        # Frontend API client (typed)
  utils.ts                      # cn() for shadcn
  site.ts                       # SITE_URL + brand identity
  schema.ts                     # Schema.org JSON-LD builders
  mock.ts                       # Dashboard mock data (DELETE when Atlas connects)

models/                         # Mongoose schemas, singleton pattern
  Candidate.ts, Client.ts, Job.ts, PipelineState.ts,
  OutreachDraft.ts, EmailMeta.ts, Contact.ts, User.ts,
  index.ts                      # Re-exports

styles/globals.css              # Tailwind + shadcn CSS vars themed to Platt brand
types/next-auth.d.ts            # Module augmentation: session.user.id

Procfile                        # web: npm run start
app.json                        # Heroku manifest
next.config.js                  # 301 redirects + image remote patterns
tailwind.config.js              # Brand palette + display/sans fonts
.github/workflows/ci.yml        # Typecheck + lint + build on PR
```

---

## Why one Next.js app

| Decision | Why |
|---|---|
| Next.js Pages Router | SSR/SSG for marketing SEO; file-based routing matches Ryan's CRA muscle memory; Heroku-native deploy |
| Single Heroku app | One domain, no CORS, simpler deploy story, lower cost ($7 Basic dyno vs $14 for two) |
| Next.js API routes (no Express) | Replaces the handoff's separate Express server; cuts the dependency footprint |
| NextAuth v4 with Entra provider | Pages Router native; Auth.js v5 stable but Pages Router examples lag |
| Mongoose 8 | Schema design from handoff applies as-is; singleton-with-`models[X]` pattern handles HMR re-imports |

---

## Data flow: from JD to placement

Same path as the handoff envisioned, simplified to one app:

```
1. Peter enters JD → POST /api/jobs → stored in `jobs` collection
2. Peter exports CSV from LinkedIn Recruiter (manual; we never automate)
3. CSV lands in watched OneDrive folder → MS Graph webhook
   → POST /api/webhooks/onedrive
4. Parse CSV → upsert candidate docs → queue Apollo enrichment
5. Apollo /v1/people/bulk_match → backfill email + phone
6. Authenticity scoring + JD-fit scoring (Haiku) → write to candidate.score
7. Outreach draft service → Claude Sonnet using voice corpus + JD context
   → write to outreach_queue
8. Dashboard Outreach Queue shows drafts; Slack/SMS ping fires
9. Peter taps Approve → MS Graph /sendMail from outreach.plattpartners.com
10. Reply lands → MS Graph webhook → POST /api/webhooks/msgraph
    → classify (positive/neutral/negative/OOO) + summarize
11. Peter screens → enters notes → pipeline_state advances
12. Submission packet → Peter approves → sent to client
13. Placement → auto-generates /knowledge/placements/<slug>.md
```

Steps 1, 6-13 are not yet implemented (Phase 2+). Steps 2-5 land in Phase 2.

---

## Mongoose collections

Defined in `models/*.ts`. Each uses the singleton-via-`models[X]` pattern for Next.js hot reload safety.

| Model | File | Purpose |
|---|---|---|
| `Candidate` | `models/Candidate.ts` | LinkedIn-export-or-applicant; Apollo-enriched email/phone; PII flags |
| `Client` | `models/Client.ts` | HR-contact pod, tier 1-3, Friday-call-list flag |
| `Job` | `models/Job.ts` | JD + prescreen questions + status |
| `PipelineState` | `models/PipelineState.ts` | One per (candidate × job); stage transitions with history audit |
| `OutreachDraft` | `models/OutreachDraft.ts` | Claude-generated drafts awaiting Peter's approval |
| `EmailMeta` | `models/EmailMeta.ts` | M365 message metadata + classification (bodies stay in MS Graph) |
| `Contact` | `models/Contact.ts` | Public-site contact-form submissions (live today) |
| `User` | `models/User.ts` | Authenticated dashboard users + MS Graph refresh tokens |

Indexes: `Candidate.linkedin_url` (unique), `Candidate.email`, `Client.contact_email`, `PipelineState.{candidate_id, job_id}` (compound unique), `EmailMeta.ms_message_id` (unique), etc.

Pending models (Phase 4+): `AssistantLog`, `ApolloUsage`, `AnalyticsDaily`, `BDSignal`, `BDBrief`.

---

## Qdrant → Pinecone/Atlas Vector

The handoff specced Qdrant on a Raspberry Pi. We removed the Pi from v1 architecture (see `docs/decisions.md` 2026-05-14). `ai-mgr` picks Pinecone vs Atlas Vector Search at Phase 4 kickoff.

Collections (logical, not yet provisioned):
| Collection | Source | Trust | PII | Public-safe |
|---|---|---|---|---|
| `wiki` | `knowledge/wiki/*.md` | 3 | no | yes |
| `placements` | `knowledge/placements/*.md` | 3 | no | no |
| `clients` | `knowledge/clients/*.md` | 3 | yes | no |
| `emails_voice` | scrubbed `knowledge/emails-voice-corpus/` | 1 | scrubbed | no |
| `candidates` | candidate docs | 2 | yes | no |

Embedding model: Voyage-3-lite (1024 dim). Chunk: 512 tokens, 64 overlap. Retrieval: parent-document.

---

## Auth

NextAuth v4 (`pages/api/auth/[...nextauth].ts`) with Microsoft Entra provider. Single Entra app registration in Peter's M365 tenant covers (scopes ramp per phase):

| Scope | Phase |
|---|---|
| `User.Read`, `offline_access` | 0 (login works) |
| `Mail.ReadWrite`, `Mail.Send`, `MailboxSettings.Read` | 3 (outreach) |
| `Files.Read.Selected` (scoped to `/PlattPartners/`) | 2 (CSV ingest) |
| `Calendars.ReadWrite` | 3 (prescreen scheduling) |

Session cookies: HttpOnly, Secure, SameSite=Lax. 7-day expiry. JWT-encoded so MS Graph tokens hitchhike in the session without a separate session table.

`/api/public/*` does NOT use NextAuth — open with CORS check + Upstash rate limit (Phase 4).

---

## SEO infrastructure (live today)

- **`/sitemap.xml`** — server-rendered, lists all 6 public pages, canonical URLs hardcoded to plattpartners.com (so when DNS flips, the sitemap doesn't need a code change)
- **`/robots.txt`** — allows crawlers, disallows `/api/` and `/app/`, references the sitemap
- **JSON-LD** — every marketing page emits an `@graph` with Organization + WebSite + WebPage + page-specific types (ProfessionalService on `/` and `/technology`, Person on `/about`, Article on `/how-to-build-...`)
- **OG + Twitter Card** — uniform across pages via `<SeoHead>` component; uses `public/og-image.jpg` (Peter's existing 1200x628 image)
- **301 redirects in `next.config.js`** — `/about-services` → `/about`, `/about-services/` → `/about`, `/header` → `/` (Beaver Builder template that was in his sitemap)
- **Canonical URL tags** — per page, via `<SeoHead>`

DNS cutover walkthrough: see `docs/runbooks/dns-cutover.md`.

---

## Scheduled jobs (Heroku Scheduler — none scheduled yet)

When phase 6 lands, these run via Heroku Scheduler hitting `/api/jobs/<name>` with a `JOB_RUNNER_SECRET` header:

| Job | Schedule | Endpoint |
|---|---|---|
| Daily analytics pull (GA4 + SC) | 04:00 ET | `/api/jobs/analytics-daily` |
| Weekly client reports | Monday 06:00 ET | `/api/jobs/weekly-reports` |
| Nightly assistant eval | 02:00 ET | `/api/jobs/nightly-eval` |
| Nightly Mongo backup | 03:00 ET | `/api/jobs/nightly-backup` |
| BD signal scan (polled sources) | 08:00 ET | `/api/jobs/bd-signal-scan` |

All other work is webhook- or user-action-triggered (see `docs/decisions.md` — live-first posture).

---

## Public marketing site (live)

- `/` — Restaurant-first homepage (lead with Jack in the Box, Del Taco, El Pollo Loco, Petco logos; copy reused from current WP site)
- `/about` — Peter's 25-year story + RPO/SEARCH/Staffing service framing + 3 testimonials
- `/technology` — Tech vertical (preserved GitLab case study; anonymized as "DevOps company with $100M+ Iconiq funding")
- `/how-to-build-a-robust-pipeline-of-qualified-candidates` — Landing page with PDF lead magnet
- `/contact` — Standalone form page
- `/privacy-policy` — Extracted from current WP site

Pending (Phase 1): `/restaurants` and `/it-leadership` (or whichever verticals Peter confirms — currently blocked on `docs/blockers.md` item #8).

All public pages SSR by default. Static assets cached at the Heroku edge via `Cache-Control` headers.

Public AI widget (Phase 4) will mount globally in `_app.tsx`, configurable per route.

---

## Tracking & analytics

- **GA4** — needs Peter to grant Search Console access (`docs/peter-onboarding.md` item #5) OR create a fresh property. Current WP site is firing deprecated UA-172816061-1.
- **Search Console** — same dependency
- **Microsoft Clarity** (optional, free) — session replay; defer
- **Server-side event capture** — Phase 6, when assistant_logs and event tables are added

Tracking-code injection lives in `pages/_app.tsx` (TODO: add when GA4 ID is known).

---

## Failure modes

| Failure | Impact | Recovery |
|---|---|---|
| Heroku Basic dyno restart | Brief request loss (~5s) | Dyno restarts automatically |
| Mongo Atlas hits 512MB (when connected) | Writes fail | Alert at 400MB; archive cold candidates/emails to JSONL; upgrade to M2 ($9/mo) |
| Anthropic API outage | AI drafting + assistant degraded | Feature-flag fallback to Gemini Flash |
| Apollo rate limit | Enrichment paused | Back-off + retry; track in `apollo_usage` |
| GA4 quota exceeded | Daily snapshot incomplete | Retry next day; quota resets at midnight Pacific |
| LinkedIn restricts Peter's seat | Sourcing stops | Never happens if manual-only rule followed; fallback = job-board + referrals |
| Public widget abuse | Token spend spikes | Upstash rate limit cuts at 10/min/IP, daily spend kill-switch at $5 |
| DNS / TLS misconfig during cutover | Site down | Cutover plan in `docs/runbooks/dns-cutover.md`; old WP kept at `wp.plattpartners.com` (basic-auth) for 30-day rollback |

---

## Open architectural questions (deferred to phase kickoffs)

- Vector DB: Pinecone vs Atlas Vector Search — `ai-mgr` decides during Phase 4
- Worker dyno needed? — measure first; only add if a job runs >30s consistently
- Where to send Slack approval pings — `#peter-approvals` channel or DM — Peter's call (Phase 3)
- Phase 4 vector-search latency from Heroku → Pinecone vs Atlas — measure both before committing
