# Security

How we handle secrets, PII, OAuth scopes, abuse, and compliance. The `security` sub-agent owns this surface and audits before each release.

---

## Secrets

**Inventory** — every secret listed in `.env.example`. If you add a new one, update both `.env.example` AND `docs/api_integrations.md`.

**Storage by environment:**
| Environment | Where secrets live |
|---|---|
| Local dev | `.env` (gitignored), chmod 600 |
| Heroku production | Heroku Config Vars (`heroku config:set`) |

**Rules:**
- NEVER commit `.env`. `.gitignore` enforces this; verify with `git status` before every push.
- NEVER log secrets. Logger has a redaction filter — keep it on.
- NEVER expose any secret to the browser. Anything with `NEXT_PUBLIC_*` is browser-readable; never put a secret there.
- Rotate every secret quarterly. Track in `docs/audits/secret-rotation-log.md`.

**Pre-commit hook (Phase 0 setup):**
- `git-secrets` scan
- ESLint rule `no-secrets`
- Custom check for hardcoded API key prefixes (`sk-`, `voyage-`, `sk-ant-`, etc.)

---

## PII

**What counts as PII:**
- Candidate names, emails, phone numbers, addresses
- Resume contents
- Email body contents (sent or received)
- LinkedIn profile data
- Apollo-enriched data

**Storage policy:**
| Data | Where | Encrypted at rest | Encrypted in transit |
|---|---|---|---|
| Candidate records | MongoDB Atlas | yes (Atlas managed) | yes (TLS) |
| Email metadata only (no bodies) | MongoDB Atlas | yes | yes |
| Email bodies | Never stored. Fetched on demand from MS Graph by ID. | n/a | yes |
| Resume files | Cloudinary (private folder), only with Peter's explicit opt-in | yes | yes |
| Voice corpus (PII-scrubbed) | `knowledge/emails-voice-corpus/` (gitignored), embedded in vector store | yes (filesystem + vector store) | yes |
| Raw email exports for voice training | DELETED after scrubbing — never persisted in raw form | n/a | n/a |

**Voice-corpus scrubbing pipeline:**

`scripts/scrub_voice_corpus.ts` runs on every email before it enters the voice corpus:
1. Remove names (NER + regex)
2. Remove emails, phones, addresses, URLs containing a personal identifier
3. Replace with `<REDACTED_NAME>`, `<REDACTED_EMAIL>`, etc.
4. Output a diff for human review (Ryan) before commit

**No exceptions.** First leak of a candidate name via the assistant's "voice example" retrieval loses trust.

---

## GDPR / CCPA

Apollo's DPA names Peter as a **joint controller**. We owe data-subject rights on anyone we store from Apollo enrichment.

**Required endpoints:**
- `POST /api/candidates/:id/forget` — deletes Mongo doc, vector embeddings, Cloudinary assets, voice-corpus chunks. Audit logged.
- `GET /api/candidates/:id/export` — returns everything we have on a candidate in JSON (data portability)

**Default retention:**
- Candidate records: kept while candidate-client relationship active OR 5 years from last interaction
- Email metadata: 2 years
- Assistant logs (with hashed IPs for public widget): 90 days

Heroku Scheduler job prunes per retention policy.

---

## Authentication & authorization

**Internal (Peter's login):**
- NextAuth (Auth.js) with Microsoft Entra provider
- Session cookies HttpOnly, Secure, SameSite=Lax
- Cookie expiry: 7 days; refresh on each authenticated request
- Logout drops the cookie; invalidate refresh tokens server-side
- Multi-user-ready (Peter's future assistant as a second `users` doc); role field defaults to `owner`

**Public widget:**
- No auth. Identified by hashed IP + session token (cookie, generated client-side)
- Cannot make any state-changing call
- Cannot retrieve PII-tagged or internal-only knowledge chunks
- Cannot reveal source documents — only summarized answers with `source_type` citations

**API surface boundary:**
- `/api/public/*` — no auth, scope-filtered, rate-limited
- `/api/auth/*` — NextAuth handshake
- `/api/*` (everything else) — session-cookie auth via NextAuth's `getServerSession`
- `/api/webhooks/*` — verified by webhook secret (MS Graph, Slack), reject on signature mismatch
- `/api/jobs/*` — verified by `JOB_RUNNER_SECRET` header (Heroku Scheduler hits these)

---

## Rate limits & abuse

**Public widget (`POST /api/public/ask`):**
- Per IP: 10/min, 100/day
- Per session (cookie): 8K input tokens, 1K output tokens cumulative
- Daily global $5 spend kill-switch — if Anthropic + Voyage spend exceeds, returns "Service temporarily unavailable"
- Implemented in `lib/middleware/rateLimit.ts` using Upstash Ratelimit

**Internal API:**
- 60/min per user
- No spend cap

**Apollo:** Track usage in `apollo_usage`. Refuse enqueue at 80% of monthly credits unless manually overridden.

**M365 sending:** Throttle 25/min in code (leaves headroom under the 30/min hard limit). 50 cold-external/day per mailbox after warmup; refuse send when limit hit.

---

## OAuth scope justification

**Microsoft Entra app — delegated scopes:**

| Scope | Why | Phase |
|---|---|---|
| `User.Read` | Profile + tenant info | 0 |
| `offline_access` | Refresh tokens | 0 |
| `Mail.ReadWrite` | Read inbox; mark read/unread | 3 |
| `Mail.Send` | Outreach + submission emails | 3 |
| `MailboxSettings.Read` | Time zone, sender info | 3 |
| `Files.Read.Selected` | OneDrive CSV watch folder (Selected = scoped to specific path) | 2 |
| `Calendars.ReadWrite` | Prescreen scheduling | 3 |

We do NOT request: `Files.ReadWrite.All`, `User.ReadBasic.All`, `Directory.*`.

**Google OAuth scopes:**
- `analytics.readonly` — GA4 data
- `webmasters.readonly` — Search Console

---

## ToS compliance

| Service | Rule | Where enforced |
|---|---|---|
| LinkedIn | No automation, scraping, or programmatic access | Code review + CLAUDE.md + culture |
| Apollo | No redistribution of enriched data | DPA notes; forget endpoint |
| Microsoft 365 | Respect sending limits | `lib/services/msgraph.ts` throttle |
| Anthropic / Voyage / Gemini | No PII in prompts unless enterprise DPA signed | Voice scrubber; PII tagging in chunks |
| Cloudinary | Standard ToS | Default |

---

## Audit cadence

- **Pre-release** (before each phase milestone): `security` agent runs a 30-min audit, writes `docs/audits/<date>-pre-release.md`
- **Quarterly:** secret rotation log review, OAuth token cleanup, PII retention check
- **Annual:** full data-flow review, DPA compliance check

---

## Incident response

If a key leaks or PII is exposed:

1. Rotate affected secret immediately (Heroku Config Vars)
2. Revoke OAuth tokens if user-related
3. Notify Ryan within 1 hour; Ryan notifies Peter within 24 hours
4. If candidate PII affected: notify candidate within 72 hours (GDPR Article 33/34)
5. Write incident report to `docs/audits/<date>-incident-<short-name>.md`

---

## Pre-launch checklist

Before any phase goes to production:

- ☐ `.env.example` matches all required env vars in code
- ☐ No hardcoded secrets in source (grep `sk-`, `key=`, `password=`, `token=`)
- ☐ Public widget rate limits configured and tested
- ☐ Daily spend kill switch tested
- ☐ Voice corpus PII-scrubber run + diff reviewed
- ☐ `/api/candidates/:id/forget` endpoint tested end-to-end
- ☐ MS Graph webhook signature verification active
- ☐ Slack webhook signature verification active
- ☐ All OAuth scopes minimum-necessary
- ☐ Heroku app has SSL + HSTS
- ☐ Heroku Config Vars complete (no missing keys)
