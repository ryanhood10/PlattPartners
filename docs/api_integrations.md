# API Integrations

How every external service plugs in. Each section gives the credentials needed, the safe usage pattern, rate limits and gotchas, and pointers to the code.

---

## LinkedIn Recruiter — **no programmatic access**

LinkedIn banned Apollo.io and Seamless.ai in 2025. ~23% of accounts running browser-extension automation get restricted within 90 days. Peter's Recruiter seat is the most valuable asset in this build — we never automate it.

**Sanctioned pattern:**
1. Peter builds a search inside LinkedIn Recruiter (same as today)
2. Peter selects candidates → uses LinkedIn's built-in **CSV Export** (or 1-Click Export to ATS)
3. CSV lands in OneDrive folder we watch: `/PlattPartners/LinkedIn-Exports/`
4. `/api/webhooks/onedrive` receives the MS Graph subscription notification and kicks off enrichment

**Sanctioned caps (LinkedIn enforces):** 300 exports/user/month, 5,000 unique profiles/month. Both well above Peter's expected volume.

**Forbidden:** browser-extension automation, headless browsers (Puppeteer/Playwright/Selenium), scraped logged-in sessions, residential proxy rotation. LinkedIn's official Talent Solutions API is partner-tier only — Peter doesn't qualify.

**File format:** LinkedIn Recruiter CSV columns commonly include First Name, Last Name, Headline, Current Company, Current Position, Location, Profile URL. Field names vary by export type — the parser must be tolerant.

---

## Apollo.io — official REST API

**Auth:** API key (server-side only), in `APOLLO_API_KEY`.

**Endpoints used:**
| Endpoint | Purpose |
|---|---|
| `POST /v1/people/match` | Single-person enrichment |
| `POST /v1/people/bulk_match` | Batch enrichment, up to 10 per call (preferred) |
| `GET /v1/usage_stats` | Monitor credit burn |

**Rate limits:** Fixed-window per-minute / per-hour / per-day, varies by plan. Pull live limits from `/v1/usage_stats` on startup; store in memory.

**Credit costs:**
- Email enrichment: 1 credit per person
- Mobile phone enrichment: **10 credits per person** — only when authenticity score ≥ 70
- Credits don't roll over

**Storage policy (per Apollo DPA):**
- ✅ Store enriched data internally
- ✅ Sync into Peter's internal CRM (this codebase)
- ❌ Resell or redistribute
- ❌ Share with third parties without notice
- ⚠️ Peter is a joint controller — implement `POST /api/candidates/:id/forget` for GDPR/CCPA opt-out (deletes Mongo doc + vector embeddings + cached Apollo data)

**Code:** `lib/services/apollo.ts`, `pages/api/webhooks/onedrive.ts`

---

## Microsoft 365 Graph — Peter's email account

**Auth:** OAuth2 delegated flow via NextAuth (Auth.js) with the Microsoft Entra provider. Single Entra app registration in Peter's tenant.

**Required scopes (delegated):**
- `User.Read`
- `Mail.ReadWrite`
- `Mail.Send`
- `MailboxSettings.Read`
- `Files.Read.Selected` — scoped to `/PlattPartners/` OneDrive folder
- `Calendars.ReadWrite` (Phase 3+, for prescreen scheduling)
- `offline_access`

**Sending limits (Exchange Online):** 30 messages/min, 10K recipients/day, 500 recipients/message. TERRL varies; monitor.

**Practical cold-outreach ceiling:** 30–50 NEW external recipients/mailbox/day after a 3-week warmup. NDRs are a red alert (cascade is silent slowdown → NDRs → tenant-level block).

**Sending architecture:**
- Cold/BD sends from `peter@outreach.plattpartners.com` (separate subdomain, its own SPF/DKIM/DMARC)
- Reply-to set to `peter@plattpartners.com` so replies hit his main inbox
- Apex domain never used for cold outreach

**Webhook subscriptions:**
- `POST /api/webhooks/msgraph` receives mail notifications
- Subscribe to `/me/mailFolders('Inbox')/messages` with `changeType=created`
- Subscriptions expire after 3 days — renew via Heroku Scheduler job at 2.5-day cadence

**Code:** `lib/services/msgraph.ts`, `pages/api/webhooks/msgraph.ts`, `pages/api/jobs/renew-msgraph-subs.ts`

---

## Anthropic (Claude) — drafting + reasoning

**Auth:** API key in `ANTHROPIC_API_KEY`.

| Model | Used for | $/M in / $/M out |
|---|---|---|
| `claude-sonnet-4-6` | Outreach drafting, candidate scoring rationale, BD briefs, brand-voice monitor | $3 / $15 |
| `claude-haiku-4-5` | Email classification, routing, public widget, post-response validator | $1 / $5 |

**Prompt caching:** cache the system prompt + brand voice + JD context where possible. 90% discount on cached input tokens. Critical for the public widget.

**Code:** `lib/services/claude.ts`, `lib/prompts/*.ts`

---

## Google Gemini — bulk + free tier

**Auth:** API key in `GEMINI_API_KEY`.

**Model:** `gemini-2.5-flash`. Free tier (~500 req/day, ~10/min) handles bulk summarization and Anthropic-fallback use cases.

**Code:** `lib/services/gemini.ts`

---

## Voyage AI — embeddings

**Auth:** `VOYAGE_API_KEY`.

**Model:** `voyage-3-lite` (1024-dim). Generous free tier covers Peter's volume.

**Code:** `lib/services/voyage.ts`

---

## Vector DB — Pinecone OR Atlas Vector Search

**Decision deferred to Phase 4.** Both are free at Peter's scale.

If Pinecone: `PINECONE_API_KEY`, `PINECONE_INDEX_NAME=platt-knowledge`. One serverless index.
If Atlas Vector Search: reuses `MONGODB_URI`; index defined on a `vectors` collection.

**Collections (logical):** `wiki`, `placements`, `clients`, `emails_voice`, `candidates`. Metadata on every chunk: `source_type`, `trust_level` (1–3), `pii` (bool), `internal_only` (bool), `last_verified_date`, `entity_ids`.

**Code:** `lib/services/vector.ts` (provider-agnostic wrapper)

---

## Google APIs — GA4 + Search Console

**Auth:** OAuth as Peter, one-time consent, store refresh token in Mongo `users` collection.

| API | Purpose | Free? |
|---|---|---|
| GA4 Data API | Sessions, users, top pages, conversions | Yes (10K req/day) |
| Search Console API | Clicks, impressions, queries, page rankings | Yes |

**Note:** Site Kit is currently installed on the WP site and is firing a deprecated UA tracking ID. The rebuild requires a fresh GA4 property (or to read the active property ID from Peter's Site Kit settings).

**Code:** `lib/services/google.ts`, `pages/api/jobs/analytics-daily.ts`

---

## Cloudinary — brand asset CDN

**Auth:** Cloud name + API key + API secret.
**Free tier:** 25 monthly credits.

**Use cases:** Brand asset hosting, blog post images, OG image generation (optional — Next.js can also generate these locally).

**Code:** `lib/services/cloudinary.ts`

---

## Slack — human-in-the-loop pings

**Auth:** Incoming webhook URL in `SLACK_WEBHOOK_URL`.

**Pattern:** When a draft outreach is ready, the API posts a message with Approve / Edit / Reject buttons. Buttons fire back to `/api/webhooks/slack` with the action.

**Alt path:** Twilio SMS if Peter prefers (env vars in `.env.example`).

**Code:** `lib/services/slack.ts`, `pages/api/webhooks/slack.ts`

---

## Upstash — rate limiting for public widget

**Auth:** REST URL + token.
**Use case:** `POST /api/public/ask` rate-limits per IP. Free tier (10K commands/day) is plenty.
**Code:** `lib/middleware/rateLimit.ts`

---

## Backblaze B2 — backups

**Auth:** Application Key ID + secret.
**Free tier:** 10GB storage + 1GB/day download.
**Pattern:** Heroku Scheduler job runs `mongodump` (via mongodb-tools buildpack), gzips, uploads to B2. Prunes >30 days.
**Code:** `pages/api/jobs/nightly-backup.ts`

---

## WordPress (plattpartners.com) — **migration source, not deploy target**

The WP site is being migrated OFF, not embedded into. We use WP admin access in Phase 0 / Phase 1 only:

1. **Content extraction** — admin login OR WordPress application password, used once to read pages via REST API (`GET /wp-json/wp/v2/pages`, `GET /wp-json/wp/v2/posts`)
2. **DNS cutover** — apex flips to Heroku; old WP kept at `wp.plattpartners.com` (basic-auth) for 30-day rollback

After Phase 1 cutover, this section becomes historical reference.

**Auth:** WordPress admin URL + admin user OR application password (NOT main password — generate via WP admin → Users → Profile → Application Passwords).

---

## API integration status tracker

**Last reconciled:** 2026-05-14. Update as credentials and integrations come online.

| Integration | Code wired | Credentials in Heroku | Live in production | Phase |
|---|---|---|---|---|
| LinkedIn Recruiter (manual) | n/a | n/a | n/a | 2 |
| Apollo.io API | ☐ | ☐ | ☐ | 2 |
| MS Graph (Entra registration) | ✅ NextAuth provider wired | ☐ needs `MS_*` from Peter | ☐ | 0 (login), 3 (mail) |
| Anthropic API | ☐ | ☐ | ☐ | 3 |
| Gemini API | ☐ | ☐ | ☐ | 4 |
| Voyage API | ☐ | ☐ | ☐ | 4 |
| Pinecone OR Atlas Vector | ☐ | ☐ | ☐ | 4 |
| GA4 Data API | ☐ | ☐ | ☐ | 6 |
| Search Console API | ☐ | ☐ | ☐ | 6 |
| Cloudinary | ☐ | ☐ | ☐ | 1 |
| Slack webhook | ☐ | ☐ | ☐ | 3 |
| Upstash | ☐ | ☐ | ☐ | 4 |
| Backblaze B2 | ☐ | ☐ | ☐ | 6 |
| WordPress (content read) | ✅ done via WebFetch | n/a | n/a — one-time | 0 |
| DNS registrar (for cutover) | ☐ needs Peter | n/a | ☐ | 1 |
| MongoDB Atlas | ✅ Mongoose models + `lib/db.ts` | ☐ needs cluster + URI | ☐ | 0 |
| Heroku app + Config Vars | ✅ | ✅ NEXTAUTH_*, JOB_RUNNER_SECRET set | ✅ Live at `platt-partners-3b59df8c6202.herokuapp.com` | 0 |

Legend: ✅ done, ☐ not yet
