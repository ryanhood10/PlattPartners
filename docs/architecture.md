# Architecture

How the Platt Partners system is wired. See `decisions.md` for the *why* behind each choice; this doc is the *how*.

---

## High-level

```
┌──────────────────────────────────────────────────────────────────────┐
│  plattpartners.com  +  app.plattpartners.com (same Next.js app)      │
│                                                                       │
│   Public marketing pages       │   Authenticated dashboard            │
│   (SSR/SSG, SEO-optimized)     │   (Microsoft Entra OAuth)            │
│   /, /technology, /restaurants │   /app/pipeline, /app/clients,       │
│   /it-leadership, /about,      │   /app/inbox, /app/outreach,         │
│   /case-studies, /blog,        │   /app/bd, /app/analytics,           │
│   /contact + public AI widget  │   /app/assistant, /app/settings      │
└──────────────────────────────────────────────────────────────────────┘
                          │
                          │  Next.js API routes (/api/*)
                          ▼
┌──────────────────────────────────────────────────────────────────────┐
│  pages/api/*  —  Express-shaped routes inside Next.js                │
│                                                                       │
│   /api/auth/*           NextAuth (Microsoft Entra)                   │
│   /api/health           Unauth health check                          │
│   /api/public/ask       Rate-limited public AI widget                │
│   /api/candidates       Candidate CRUD                                │
│   /api/clients          Client CRUD                                   │
│   /api/pipeline         Pipeline state transitions                    │
│   /api/outreach         Draft queue, approve, send                    │
│   /api/inbox            M365 inbox proxy                              │
│   /api/bd               BD signals + briefs                           │
│   /api/analytics        Daily snapshot, weekly reports                │
│   /api/assistant        Internal AI assistant (authed, full scope)    │
│   /api/webhooks/msgraph M365 mail webhook                             │
│   /api/webhooks/onedrive OneDrive CSV-drop webhook                    │
│   /api/jobs/*           Heroku Scheduler endpoints (auth via header)  │
└──────────────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
┌────────────────┐  ┌──────────────┐  ┌────────────────────────────┐
│ MongoDB Atlas  │  │ Vector store │  │  External services         │
│ (M0 → M2)      │  │ Pinecone or  │  │  - Microsoft 365 Graph     │
│                │  │ Atlas Vector │  │  - Apollo.io REST API      │
│ collections    │  │ Search       │  │  - Anthropic (Claude)      │
│ as below       │  │              │  │  - Google AI (Gemini)      │
│                │  │ collections: │  │  - Voyage AI (embeddings)  │
│                │  │ wiki,        │  │  - Google APIs (GA4, SC)   │
│                │  │ placements,  │  │  - Cloudinary              │
│                │  │ emails_voice,│  │  - Upstash (rate limit)    │
│                │  │ candidates   │  │  - Backblaze B2 (backups)  │
└────────────────┘  └──────────────┘  └────────────────────────────┘
```

**One Heroku app. One domain (apex `plattpartners.com`). One CORS surface. One deploy.**

The dashboard is at `/app/*` (auth-walled). The marketing site is at `/`, `/technology`, `/restaurants`, etc. Both ship from the same Next.js build.

---

## Why one Next.js app

| Decision | Why |
|---|---|
| Next.js Pages Router | SSR/SSG for marketing SEO; file-based routing matches Ryan's CRA muscle memory; Heroku-native deploy |
| Single Heroku app | One domain, no CORS, simpler deploy story, lower cost ($7 Basic dyno vs $14 for two) |
| Drop Express | Next.js API routes handle the same surface; cuts the dependency footprint and the second build target |
| NextAuth (Auth.js) with Entra provider | Replaces passport-azure-ad with a Next.js-native solution; less custom auth code |
| Mongoose unchanged | Schema design from handoff still applies; just moves into `models/` at the app root |

---

## Repo structure

```
PlattPartners/
├── pages/
│   ├── index.tsx                 # Public homepage (restaurant-first)
│   ├── technology.tsx            # /technology vertical
│   ├── restaurants.tsx           # /restaurants vertical
│   ├── it-leadership.tsx         # /it-leadership vertical
│   ├── about.tsx                 # /about
│   ├── contact.tsx               # /contact
│   ├── case-studies/[slug].tsx   # /case-studies/<slug>
│   ├── blog/[slug].tsx           # /blog/<slug>
│   ├── app/                      # AUTH-WALLED dashboard
│   │   ├── pipeline.tsx
│   │   ├── clients.tsx
│   │   ├── inbox.tsx
│   │   ├── outreach.tsx
│   │   ├── bd.tsx
│   │   ├── analytics.tsx
│   │   ├── assistant.tsx
│   │   └── settings.tsx
│   ├── api/
│   │   ├── auth/[...nextauth].ts
│   │   ├── health.ts
│   │   ├── public/ask.ts         # Rate-limited public AI widget
│   │   ├── candidates/*.ts
│   │   ├── clients/*.ts
│   │   ├── pipeline/*.ts
│   │   ├── outreach/*.ts
│   │   ├── inbox/*.ts
│   │   ├── bd/*.ts
│   │   ├── analytics/*.ts
│   │   ├── assistant/*.ts
│   │   ├── jobs/[name].ts        # Heroku Scheduler hits these
│   │   └── webhooks/
│   │       ├── msgraph.ts
│   │       └── onedrive.ts
│   ├── _app.tsx
│   └── _document.tsx
├── components/
│   ├── ui/                       # shadcn-generated components
│   ├── marketing/                # Public-page components (Hero, Logos, Testimonial)
│   ├── dashboard/                # Dashboard-page components (PipelineKanban, ClientTable)
│   └── widget/                   # Public AI widget React component
├── lib/
│   ├── db.ts                     # Mongoose connection
│   ├── api.ts                    # Frontend API client (used by dashboard)
│   ├── auth.ts                   # NextAuth helpers
│   ├── logger.ts                 # pino
│   ├── middleware/
│   │   ├── requireAuth.ts
│   │   ├── rateLimit.ts          # Upstash-backed for /api/public/ask
│   │   └── error.ts
│   ├── services/
│   │   ├── apollo.ts
│   │   ├── msgraph.ts
│   │   ├── claude.ts
│   │   ├── gemini.ts
│   │   ├── voyage.ts
│   │   ├── google.ts             # GA4 + Search Console
│   │   ├── cloudinary.ts
│   │   └── slack.ts
│   ├── prompts/                  # Claude system prompts
│   ├── bd/                       # BD scoring + brief generation
│   ├── scoring/                  # Candidate authenticity + fit scoring
│   └── jobs/                     # Scheduled-job handlers (called by /api/jobs)
├── models/
│   ├── Candidate.ts
│   ├── Client.ts
│   ├── Job.ts
│   ├── PipelineState.ts
│   ├── OutreachDraft.ts
│   ├── EmailMeta.ts
│   ├── AssistantLog.ts
│   ├── ApolloUsage.ts
│   ├── BDSignal.ts
│   ├── BDBrief.ts
│   ├── AnalyticsDaily.ts
│   └── User.ts
├── public/                       # Static assets (logos, brand images)
├── styles/
│   └── globals.css               # Tailwind base
├── docs/                         # decisions, architecture, build_plan, etc.
├── knowledge/                    # AI source-of-truth wiki + brand
├── eval/                         # Nightly assistant eval set
├── scripts/                      # Setup, seed, verify-env
├── _research/                    # WP site extraction (gitignored after Phase 0)
├── TEAMS.md
├── CLAUDE.md
├── README.md
├── package.json
├── next.config.js                # Includes 301 redirect map for WP migration
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── Procfile
├── app.json                      # Heroku Scheduler entries
├── .env.example
└── .gitignore
```

---

## Data flow: from JD to placement

Same as the handoff, simplified to one app:

```
1. Peter enters JD → POST /api/jobs → stored in `jobs` collection
2. Peter exports CSV from LinkedIn Recruiter (manual; we never automate)
3. CSV lands in watched OneDrive folder → MS Graph webhook → POST /api/webhooks/onedrive
4. Parse CSV → queue Apollo enrichment (Mongo-backed queue, processed by web dyno)
5. Apollo /v1/people/bulk_match → upsert candidate docs
6. Candidate scoring service → write `score` + `rationale`
7. Outreach draft service → Claude Sonnet using voice corpus + JD context → outreach_queue
8. Dashboard Outreach Queue shows drafts; Slack ping fires
9. Peter taps Approve → MS Graph /sendMail from outreach.plattpartners.com
10. Reply lands → MS Graph webhook → POST /api/webhooks/msgraph → classify + summarize
11. Peter screens → enters notes → state advances
12. Submission packet → Peter approves → sent to client
13. Placement → auto-generates /knowledge/placements/<slug>.md doc
```

---

## Mongoose collections

Same shape as the handoff's [architecture.md](../handoff/platt-partners-handoff/docs/architecture.md). Models live under `models/`. Backend agent finalizes during Phase 1.

Headline collections: `candidates`, `clients`, `jobs`, `pipeline_state`, `outreach_queue`, `emails_meta`, `assistant_logs`, `apollo_usage`, `analytics_daily`, `bd_signals`, `bd_briefs`, `users`.

---

## Auth

NextAuth (Auth.js) with the **Microsoft Entra provider**. Single Entra app registration in Peter's M365 tenant covers:
- Dashboard login (`User.Read`)
- Mail send + receive (`Mail.ReadWrite`, `Mail.Send`)
- OneDrive watch folder (`Files.Read` scoped to `/PlattPartners/`)
- Mailbox settings (`MailboxSettings.Read`)
- Refresh tokens (`offline_access`)

Session cookies: HttpOnly, Secure, SameSite=Lax. Refresh handled by NextAuth.

`/api/public/ask` does NOT use NextAuth — it's open with CORS check + Upstash rate limit + per-session token cap + daily spend kill-switch.

---

## Scheduled jobs (Heroku Scheduler)

Only five, all hit `/api/jobs/<name>` on the web dyno with a shared-secret header:

| Job | Schedule | Endpoint |
|---|---|---|
| Daily analytics pull (GA4 + SC) | 04:00 ET | `/api/jobs/analytics-daily` |
| Weekly client reports | Monday 06:00 ET | `/api/jobs/weekly-reports` |
| Nightly assistant eval | 02:00 ET | `/api/jobs/nightly-eval` |
| Nightly Mongo backup | 03:00 ET | `/api/jobs/nightly-backup` |
| BD signal scan (polled sources) | 08:00 ET | `/api/jobs/bd-signal-scan` |

All other work is webhook- or user-action-triggered (see `docs/decisions.md` — live-first posture).

---

## Public marketing site

Same Next.js app, served at the apex. Pages are SSR by default (so social-share previews and crawlers see fully-rendered HTML); cached at the edge by Heroku's reverse proxy via `Cache-Control` headers.

Pages (Phase 1 deliverable):
- `/` — Restaurant-first homepage (lead with Jack in the Box, Del Taco, El Pollo Loco, Petco logos; copy reused from current WP site)
- `/technology` — Tech vertical (preserve the GitLab case study currently at /technology)
- `/restaurants` — Restaurant ops vertical (NEW)
- `/it-leadership` — Executive IT vertical (NEW)
- `/about` — Peter's 25-year story, team-of-5 framing
- `/case-studies/<slug>` — Per-placement case studies (populated from `knowledge/placements/`)
- `/blog/<slug>` — Blog posts (populated from `knowledge/blog/`)
- `/contact` — Form posting to `/api/public/contact` (no third-party form)

301 redirect map in `next.config.js` covers every WP URL from the Yoast sitemap.

Public AI widget is a React component, mounted on every public page in `_app.tsx` (configurable per route).

---

## Tracking & analytics

- GA4 (NEW — replaces the deprecated UA-172816061-1 currently on the WP site)
- Google Search Console (transferred ownership from current WP setup)
- Optional: Microsoft Clarity for session replay (free)
- Server-side event capture for dashboard actions (logged to `assistant_logs` or a new `events` collection)

Tracking-code injection happens in `pages/_app.tsx` with a `<NEXT_PUBLIC_GA_ID>` env var.

---

## Failure modes

| Failure | Impact | Recovery |
|---|---|---|
| Heroku web dyno sleep (Eco only; Basic doesn't sleep) | First request after sleep ~10-15s | Use Basic dyno ($7/mo) — eliminates sleep entirely |
| Mongo Atlas hits 512MB | Writes fail | Alert at 400MB; archive cold candidates/emails to JSONL; upgrade to M2 |
| Anthropic API outage | AI drafting + assistant degraded | Feature-flag fallback to Gemini Flash |
| Apollo rate limit | Enrichment paused | Back-off + retry; track in `apollo_usage` |
| GA4 quota exceeded | Daily snapshot incomplete | Retry tomorrow; quota resets at midnight Pacific |
| LinkedIn restricts Peter's seat | Sourcing pipeline stops | Never happens if manual-only rule followed; fallback to job-board sourcing if it ever does |
| Public widget hit by abuse | Token spend spikes | Upstash rate limit cuts at 10/min/IP, daily spend kill-switch hits at $5 |
| DNS / TLS misconfig during WP cutover | Site down | Cutover plan keeps WP accessible at `wp.plattpartners.com` (basic-auth) for 30-day rollback window |

---

## Open architectural questions (deferred to phase kickoffs)

- Vector DB: Pinecone vs Atlas Vector Search — `ai-mgr` decides during Phase 4
- Heroku dyno type: Eco ($5, sleeps) vs Basic ($7, doesn't sleep) — recommend Basic; `devops` confirms during Phase 1
- Heroku worker dyno: add if Apollo bulk enrichment runs ever exceed 30 seconds — defer until measured
- Where to send Slack approval pings — `#peter-approvals` or DM — Peter's call
