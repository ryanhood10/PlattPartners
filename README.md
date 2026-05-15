# Platt Partners

Single Next.js app for **Platt Partners** (plattpartners.com), Peter Platt's recruiting firm. Public marketing site + authenticated internal dashboard + AI assistant in one codebase, deployed to one Heroku app.

**Builder:** Ryan Hood (ryan@eldrin.ai)
**Client:** Peter Platt, Founder, Platt Partners
**Production URL:** https://platt-partners-3b59df8c6202.herokuapp.com (until DNS cutover → plattpartners.com)
**Repo:** https://github.com/ryanhood10/PlattPartners

---

## Start here

- **New to the project?** Open [`docs/README.md`](docs/README.md) — it's the index of every doc and what each one covers.
- **About to write code?** Skim [`CLAUDE.md`](CLAUDE.md) — standing rules — then check [`docs/blockers.md`](docs/blockers.md) for any open Peter-input questions in your path.
- **Want to see what's been shipped?** [`docs/CHANGELOG.md`](docs/CHANGELOG.md).
- **Want to deploy?** [`docs/runbooks/heroku-deploy.md`](docs/runbooks/heroku-deploy.md).

---

## Stack

| Layer | Tool |
|---|---|
| Web framework | Next.js 14 (Pages Router) + React 18 |
| Styling | Tailwind + shadcn/ui (copied components in `components/ui/`) |
| Auth | NextAuth v4 + Microsoft Entra provider |
| Backend (API routes) | Next.js API routes inside the same app |
| Database | MongoDB Atlas (pending) + Mongoose 8 |
| Vector DB | Pinecone or Atlas Vector Search (Phase 4) |
| Embeddings | Voyage-3-lite |
| LLM | Claude Sonnet (drafting) + Haiku (classification) + Gemini Flash (bulk) |
| Email | Microsoft 365 Graph API |
| Enrichment | Apollo.io REST API |
| Sourcing | LinkedIn Recruiter — manual CSV export only, **never automated** |
| Hosting | Heroku (Basic dyno) |
| Cron | Heroku Scheduler |
| Logging | pino |

Total monthly run cost target: **~$33/mo** (currently $7 — Heroku Basic).

---

## Local dev

```bash
# One-time
cp .env.example .env       # fill in MONGODB_URI etc. when you have them
npm install

# Day-to-day
npm run dev                # http://localhost:3000
npm run typecheck
npm run build
npm run lint
```

You can run the app with NO env vars set (auth and Mongo will be stubbed). Sign-in and contact persistence become functional once `MS_*` and `MONGODB_URI` are set.

---

## Repo layout

```
PlattPartners/
├── pages/                      # Next.js routes
│   ├── index.tsx               # / — public homepage
│   ├── about.tsx               # /about
│   ├── contact.tsx             # /contact
│   ├── technology.tsx          # /technology
│   ├── how-to-build-...tsx     # /how-to-build-a-robust-pipeline-of-qualified-candidates
│   ├── privacy-policy.tsx      # /privacy-policy
│   ├── sitemap.xml.tsx         # /sitemap.xml (server-rendered XML)
│   ├── robots.txt.tsx          # /robots.txt
│   ├── app/                    # /app/* — auth-walled dashboard
│   │   ├── pipeline.tsx        # Kanban
│   │   ├── clients.tsx         # Table
│   │   ├── inbox.tsx           # Filtered M365 view
│   │   ├── outreach.tsx        # Approval queue
│   │   ├── bd.tsx              # Phase 5 BD queue
│   │   ├── analytics.tsx       # GA4 + SC placeholder
│   │   ├── assistant.tsx       # AI chat (Phase 4)
│   │   └── settings.tsx        # Profile + integrations
│   └── api/
│       ├── auth/[...nextauth].ts
│       ├── health.ts
│       └── public/contact.ts
├── components/
│   ├── ui/                     # shadcn-copied components (button only so far)
│   ├── marketing/              # SiteHeader, SiteFooter, ContactForm, SeoHead, JsonLd
│   └── dashboard/              # DashboardLayout, EmptyState
├── lib/
│   ├── db.ts                   # Mongoose connection (cached for hot reload)
│   ├── auth.ts                 # NextAuth options + requireAuth() GSSP helper
│   ├── logger.ts               # pino with secret-redaction
│   ├── api.ts                  # Frontend API client
│   ├── utils.ts                # cn() helper for shadcn
│   ├── site.ts                 # Canonical SITE_URL + brand identity
│   ├── schema.ts               # Schema.org JSON-LD builders
│   └── mock.ts                 # Mock dashboard data (delete once Atlas connects)
├── models/                     # Mongoose schemas (singleton pattern)
│   ├── Candidate.ts
│   ├── Client.ts
│   ├── Job.ts
│   ├── PipelineState.ts
│   ├── OutreachDraft.ts
│   ├── EmailMeta.ts
│   ├── Contact.ts              # Public contact-form submissions
│   ├── User.ts                 # Authenticated dashboard users
│   └── index.ts                # Re-exports
├── public/                     # Static assets
│   ├── logo.svg                # Brand logo
│   ├── favicon.png + apple-touch-icon.png
│   ├── og-image.jpg
│   ├── clients/                # Client logos used on homepage
│   └── downloads/              # Lead-magnet PDF + cover
├── styles/globals.css          # Tailwind base + shadcn CSS variables
├── docs/                       # Decisions, plan, architecture, runbooks, changelog
│   ├── README.md               # Index of all docs
│   ├── CHANGELOG.md
│   ├── build_plan.md
│   ├── architecture.md
│   ├── decisions.md
│   ├── blockers.md             # Open Peter-input questions
│   ├── peter-onboarding.md     # Ask list + response tracker
│   ├── api_integrations.md
│   ├── security.md
│   ├── glossary.md
│   └── runbooks/
│       ├── heroku-deploy.md
│       ├── atlas-setup.md
│       └── dns-cutover.md
├── knowledge/                  # AI source-of-truth wiki + brand kit
│   ├── README.md
│   ├── brand/                  # Colors, fonts, brand-voice, assets MANIFEST
│   ├── wiki/                   # Business overview, pricing, prescreen Qs, ICPs
│   ├── clients/                # Per-client docs (templates only so far)
│   ├── placements/             # Per-placement docs (templates only so far)
│   ├── candidates/             # PII-tagged, gitignored
│   ├── emails-voice-corpus/    # PII-scrubbed, gitignored
│   └── analytics-snapshots/    # Daily JSON, gitignored
├── eval/                       # Nightly assistant eval set
│   ├── qa_pairs.jsonl          # 18 Q/A pairs covering business overview + workflows
│   ├── judge_prompt.md
│   └── README.md
├── scripts/
│   └── verify-env.js           # Pre-commit hook: required vars + no secrets in source
├── _research/                  # Plattpartners.com extraction (Phase 0 reference)
├── .github/workflows/ci.yml    # Typecheck + lint + build on PR
├── TEAMS.md                    # Sub-agent roster
├── CLAUDE.md                   # Standing project rules
├── Procfile                    # Heroku: web: npm run start
├── app.json                    # Heroku app manifest
├── tsconfig.json
├── next.config.js              # 301 redirects for WP→Next migration
├── tailwind.config.js
└── package.json
```

---

## Routes (current)

**Public marketing pages** (static-prerendered, SEO-ready):
- `/` — Homepage
- `/about` — Peter's bio + service framing + testimonials
- `/contact` — Form + direct contact details
- `/technology` — Tech vertical with case study
- `/how-to-build-a-robust-pipeline-of-qualified-candidates` — Landing page with PDF lead magnet
- `/privacy-policy`
- `/sitemap.xml` — server-rendered XML sitemap
- `/robots.txt` — server-rendered robots

**Authenticated dashboard** (gated by `requireAuth()`):
- `/app` → redirects to `/app/pipeline`
- `/app/pipeline` — Kanban (8 stages, mock data)
- `/app/clients` — Table (mock data)
- `/app/inbox` — Filtered M365 view (mock data)
- `/app/outreach` — Approval queue (mock data)
- `/app/bd` — BD queue placeholder
- `/app/analytics` — GA4 + SC placeholders
- `/app/assistant` — AI chat (disabled)
- `/app/settings` — Profile + integration-status checklist

**API routes:**
- `/api/auth/[...nextauth]` — NextAuth + Microsoft Entra
- `/api/health` — JSON health check
- `/api/public/contact` — Contact-form submissions (Zod-validated, persists to Mongo when configured)

---

## Standing rules (always)

1. **Never automate LinkedIn.** Manual CSV export only.
2. **Never expose API keys to the browser.** Server-side only.
3. **Never commit `.env`, candidate PII, or the voice corpus.**
4. **Always cite a source_id in AI responses.**
5. **Always update `docs/decisions.md`** when making an architectural choice.
6. **Marketing / tracking / website alignment is checked at every phase gate.**
7. **No financial-ops work** unless Ryan explicitly opens that scope.
8. **Confirm before creating Heroku/Atlas/external resources.** Plain `git push` of code already on `main` doesn't need confirmation.

See [`CLAUDE.md`](CLAUDE.md) for the full rule set.

---

## What we need from Peter

Live tracker at [`docs/peter-onboarding.md`](docs/peter-onboarding.md). Critical items (1-5 in the email):

1. Microsoft 365 admin access
2. Confirm sign-in email
3. Brand assets
4. DNS write access
5. Google Search Console access

Everything else is non-blocking.

---

## License & confidentiality

Private to Ryan Hood and Platt Partners. Do not commit secrets. Do not commit candidate PII.
