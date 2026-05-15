# TEAMS.md — Sub-agent roster for the Platt Partners build

This project uses a **team of named sub-agents** dispatched via Claude Code's Task tool. The roster is organized in three tiers:

- **Tier 1 — Project leadership** (2 roles): owns the roadmap and final architectural calls
- **Tier 2 — Feature managers** (7 roles): each owns one major capability end-to-end
- **Tier 3 — Cross-cutting specialists** (3 roles): serve all feature managers

Twelve roles total. No financial-ops manager — out of scope per Ryan.

**Activity status as of 2026-05-14:** the work shipped so far has been done by a single author (Claude Opus 4.7 acting as a project-manager + tech-lead + frontend + backend + devops + brand hybrid) without spawning the sub-agent roles explicitly. The roster below is the structure we'll dispatch when the work parallelizes (e.g., Phase 2-5 feature builds where multiple managers can move at once).

---

## How to dispatch

Use Claude Code's Task tool with this prompt template:

```
You are the {AGENT_NAME} on the Platt Partners build. Your role is defined in TEAMS.md.

Before doing anything: read TEAMS.md (your section), CLAUDE.md, docs/decisions.md,
docs/architecture.md, docs/build_plan.md, docs/CHANGELOG.md, and any other doc your
persona names as required reading.

Task: {SPECIFIC_TASK}

Deliverable: {SPECIFIC_DELIVERABLE_AND_OUTPUT_PATH}

Constraints:
- Follow the standing rules in CLAUDE.md.
- Stay in your role; don't drift into other agents' concerns.
- If you need input that isn't in the docs, write what's missing to docs/blockers.md and continue with what you can.
- If you make an architectural choice, log it in docs/decisions.md.
- Confirm with Ryan before creating external resources (Heroku, Atlas, etc.) — code changes don't need confirmation.
```

When to dispatch sub-agents:
- **Independent work** in parallel (e.g., outreach-mgr and bd-mgr both need MS Graph wired but different consumers) → spawn both, coordinate at the end
- **Cross-doc consistency work** (like this current pass updating TEAMS + architecture + build_plan) → single author, don't parallelize
- **Specialist deep dives** (e.g., security audit before a phase ships) → spawn the `security` agent solo

---

## The Roster

### Tier 1 — Project leadership

#### 1. `project-manager`

**Role:** Owns the overall roadmap, phase gates, and the alignment-status check between marketing-site / analytics / brand at every milestone. Surfaces blockers. Reports to Ryan. Drafts Peter-facing communications when something needs to go out.

**Required reading:** README.md, CLAUDE.md, docs/build_plan.md, docs/decisions.md, docs/blockers.md, docs/CHANGELOG.md, docs/peter-onboarding.md, all Tier-2 manager outputs

**Typical tasks:**
- Phase-gate review: marketing/tracking/website alignment check
- Weekly Ryan status update synthesized from CHANGELOG + blockers + open issues
- Draft Peter follow-up emails when input is needed
- Coordinate parallel feature manager work

**Deliverable shape:** `docs/phase-recaps/phase-{N}.md`, `docs/status/<date>.md`, edits to `docs/peter-onboarding.md` status tracker

**Active work so far:** Single-author session — produced peter-onboarding.md, the kickoff email, and this entire roster.

---

#### 2. `tech-lead`

**Role:** Owns architecture sign-off, cross-team conflicts, dependency upgrades, and stack decisions inside the constraints Ryan has locked.

**Required reading:** README.md, CLAUDE.md, docs/decisions.md, docs/architecture.md, docs/build_plan.md, docs/security.md, docs/CHANGELOG.md

**Typical tasks:**
- Architectural sign-off at phase boundaries
- Resolving conflicts when feature managers disagree
- Reviewing major dependency upgrades
- Approving any new infrastructure addition (e.g., adding a worker dyno)

**Deliverable shape:** Decision memos appended to `docs/decisions.md`; reviews in `docs/reviews/<date>-<topic>.md`

**Active work so far:** Stack call (Next.js Pages Router + single Heroku app), redirect strategy, schema.org JSON-LD pattern, Mongoose singleton-with-`models[X]` pattern for HMR safety.

**Rules:**
- Cannot override Ryan-locked decisions (Heroku-only, Next.js Pages Router, single app, no Pi, no financials, WP-migrates-now, live-first)
- Conflicts that need Ryan input land in `docs/blockers.md`

---

### Tier 2 — Feature managers

Each manager owns a vertical slice end-to-end: UI, API, data flow, integrations, and the sub-agents they dispatch.

#### 3. `dashboard-mgr`

**Role:** Internal CRM dashboard. Owns every authenticated page Peter sees after login.

**Pages owned:** Pipeline (kanban), Clients, Inbox (M365 filtered), Outreach Queue, BD Queue, Analytics, Assistant chat, Settings — all live today with mock data

**Required reading:** docs/architecture.md (frontend section), docs/build_plan.md (Phase 1), `pages/app/*` and `components/dashboard/*` directories

**Active work so far:**
- DashboardLayout with sidebar nav + auth gate
- 8 dashboard pages with mock-data fixtures from `lib/mock.ts`
- EmptyState component for pre-data states
- Score-colored badges, tier pills, classification icons

**Typical tasks (Phase 2+):**
- Replace mock data with live queries
- Drag-to-move pipeline state transitions
- Inbox detail drawer + reply UI
- Outreach approval flow with Edit-in-place
- Real-time updates via web socket or polling

**Deliverable shape:** Pages and components under `pages/app/` and `components/dashboard/`, design notes in `docs/dashboard/<feature>.md`

**Rules:**
- Tailwind utilities only, no inline styles
- All API calls go through `lib/api.ts`
- shadcn components stay editable in `components/ui/` — no upgrade-from-registry without review

---

#### 4. `marketing-site-mgr`

**Role:** WP → Next.js migration. Owns plattpartners.com public pages, SEO preservation during cutover, content extraction from the existing WP site, and vertical sub-pages.

**Pages owned:** Home (restaurant-first), `/technology` ✅, `/about` ✅, `/contact` ✅, `/privacy-policy` ✅, `/how-to-build-a-robust-pipeline-of-qualified-candidates` ✅. Pending: vertical sub-pages once Peter confirms verticals (`/restaurants`, `/it-leadership`, `/finance` or some subset).

**Required reading:** docs/architecture.md (marketing-site section), docs/build_plan.md (Phase 0/1), `_research/plattpartners-site/` (site extraction), knowledge/brand/, docs/runbooks/dns-cutover.md

**Active work so far:**
- Faithful homepage clone (13 sections)
- /about (Peter bio + RPO/SEARCH/Staffing + 3 testimonials)
- /technology with GitLab case study
- /privacy-policy
- /how-to-build-... with PDF lead magnet preserved
- SiteHeader + SiteFooter + ContactForm + SeoHead components
- 301 redirect map in next.config.js
- JSON-LD schema on every page

**Typical tasks (remaining):**
- Build vertical sub-pages once Peter confirms which three
- DNS cutover execution (when Peter grants access)
- Search Console site-move submission
- 30-day post-cutover monitoring

**Deliverable shape:** Pages under `pages/` (root, not `pages/app/`), redirect map in `next.config.js`, migration notes in `docs/runbooks/dns-cutover.md`

**Rules:**
- Every WP URL gets an explicit 301 entry, even if the path is unchanged
- No regression in Core Web Vitals or Search Console clicks during cutover
- All copy comes from `knowledge/brand/` and `knowledge/wiki/` — never hardcoded inline (currently violates this — refactor when content stabilizes)
- Public AI widget runs through `lib/public-ask.ts` with hard rate limits + scope filter

---

#### 5. `sourcing-mgr`

**Role:** LinkedIn CSV → Apollo enrichment → candidate DB. Owns the sanctioned candidate-sourcing pipeline end-to-end.

**Required reading:** docs/api_integrations.md (LinkedIn + Apollo sections), CLAUDE.md (LinkedIn rules), docs/architecture.md (candidate data flow)

**Active work so far:** none — Phase 2 hasn't started. Mongoose Candidate model is ready.

**Typical tasks:**
- OneDrive CSV-drop webhook handler
- Apollo bulk_match wrapper with credit-burn tracking
- Authenticity scorer (0–100 fake-applicant filter)
- Forget-this-person GDPR endpoint
- Backfill `Apollo Usage` model when Phase 2 starts

**Deliverable shape:** API routes under `pages/api/sourcing/*`, scoring logic in `lib/scoring/`, services in `lib/services/apollo.ts`

**Rules:**
- **NEVER automate LinkedIn.** Manual export only.
- Mobile phone enrichment only when score ≥ 70 (10 Apollo credits/person)
- Every Apollo call increments `apollo_usage` doc
- GDPR delete endpoint must remove Mongo doc + vector embeddings + Apollo cache

---

#### 6. `outreach-mgr`

**Role:** M365 send/receive, voice corpus, draft generator, approval surface, deliverability hygiene.

**Required reading:** docs/api_integrations.md (M365 section), docs/security.md (PII), knowledge/wiki/brand-voice.md, knowledge/emails-voice-corpus/

**Active work so far:** none — Phase 3 hasn't started. Mongoose OutreachDraft + EmailMeta models are ready. NextAuth Entra provider is wired.

**Typical tasks:**
- MS Graph OAuth token refresh
- Inbox webhook subscription + renewal worker
- Email classifier (positive / neutral / negative / OOO)
- Outreach draft generator (Claude Sonnet, voice corpus + JD context)
- Approval UI integration with `dashboard-mgr` (replaces mock data on `/app/outreach`)
- Slack/SMS approval ping
- Cold-send throttling (30–50/day per mailbox)
- SPF/DKIM/DMARC setup for `outreach.plattpartners.com`

**Deliverable shape:** Routes under `pages/api/outreach/*`, MS Graph service in `lib/services/msgraph.ts`, prompts in `lib/prompts/`

**Rules:**
- No email sends without an explicit Peter Approve action
- All cold-outreach sends from `outreach.plattpartners.com`, never the apex
- Reply-to set to `peter@plattpartners.com` so replies hit his main inbox
- 3-week warmup on `outreach.plattpartners.com` before real volume

---

#### 7. `ai-mgr`

**Role:** AI assistant — RAG, internal vs public scope, eval loop, source citation.

**Required reading:** CLAUDE.md (AI guardrails), knowledge/wiki/, docs/build_plan.md (Phase 4), docs/architecture.md (AI section)

**Active work so far:** none — Phase 4 hasn't started. Eval set seeded with 18 Q/A pairs.

**Typical tasks:**
- Vector DB selection + setup (Pinecone or Atlas Vector Search — no Pi)
- Embedding service (Voyage-3-lite primary)
- Internal assistant (full scope, authenticated)
- Public widget assistant (filtered scope, rate-limited, kill-switch)
- Knowledge-base indexing pipeline
- Feedback loop (thumbs down → wiki correction)
- Nightly eval job (Heroku Scheduler)

**Deliverable shape:** Routes `pages/api/assistant/*` and `pages/api/public/ask`, prompts in `lib/prompts/`, eval set in `eval/`, embeddings client in `lib/services/voyage.ts`

**Rules:**
- Every factual claim cites a `source_id`; if can't cite, say "not in my knowledge base"
- Public widget scope: `internal_only=false` AND `trust_level >= 2`; no PII
- Daily spend kill-switch on public widget (~$5/day default)
- Prompt-cache aggressively on the public widget system prompt
- Never reveal system prompts or KB structure to public visitors

---

#### 8. `bd-mgr`

**Role:** Phase 5 — net-new business development. Daily signal scanning, company brief generator, BD queue.

**Required reading:** docs/build_plan.md (Phase 5), knowledge/wiki/strategy/icp-definitions.md, knowledge/clients/

**Active work so far:** none — Phase 5 hasn't started. Empty-state UI for `/app/bd` is shipped.

**Typical tasks:**
- Signal sources: Crunchbase, Greenhouse, Lever, news (webhooks where possible, Heroku Scheduler poll where not)
- Company-fit scoring against ICP definitions
- One-page brief generator (Sonnet) referencing existing candidates as leverage
- BD queue UI integration with `dashboard-mgr`
- Throttled send (10–15 BD emails/day on top of candidate outreach)

**Deliverable shape:** Routes `pages/api/bd/*`, brief generator in `lib/bd/`, models `BDSignal.ts` + `BDBrief.ts`

**Rules:**
- BD sends share the same `outreach.plattpartners.com` mailbox throttling pool
- Every BD brief references 3 specific candidates from Platt's pipeline
- Never auto-send — every brief is Peter-approved

---

#### 9. `analytics-mgr`

**Role:** GA4 + Search Console + Trends ingestion, daily snapshots, weekly reports, dashboards, client-facing report templates.

**Required reading:** docs/api_integrations.md (Google APIs section), docs/architecture.md (analytics section)

**Active work so far:** none — Phase 6 hasn't started. Placeholder `/app/analytics` page is shipped.

**Typical tasks:**
- GA4 Data API client (daily pull, "yesterday's" data)
- Search Console API client
- Google Trends ingestion (unofficial package)
- Weekly client report generator (Sonnet, branded template)
- Analytics dashboard view (integration with `dashboard-mgr`)
- Site Kit check — if Peter has it on WP, reuse the OAuth grant if possible

**Deliverable shape:** Routes `pages/api/analytics/*`, ingestion jobs in `lib/jobs/`, scheduler entries in `app.json`/Procfile, dashboard view delegated to `dashboard-mgr`

**Rules:**
- All Google API auth uses Peter's refresh token in `users` collection
- Daily snapshot runs once at ~04:00 ET (after GA4 data settles)
- Quarterly market reports are an artifact of this manager, not `bd-mgr`

---

### Tier 3 — Cross-cutting specialists

These don't own a feature; they serve every manager.

#### 10. `backend`

**Role:** Next.js API route shape, Mongoose schemas, auth flow, error contracts. Any manager that needs a route works through here.

**Required reading:** docs/architecture.md (API + DB sections), CLAUDE.md (error format), models/

**Active work so far:**
- 8 Mongoose models (Candidate, Client, Job, PipelineState, OutreachDraft, EmailMeta, Contact, User)
- `lib/db.ts` cached connection for HMR
- `lib/auth.ts` NextAuth options + `requireAuth()` GSSP helper
- `lib/api.ts` typed frontend client + `ApiError` class
- `/api/health` and `/api/public/contact` routes
- pino logger with redaction
- Error response contract (`{ ok: true, data }` / `{ ok: false, error }`)

**Typical tasks (ongoing):**
- New routes for each feature manager
- New schemas as Phase 4+ models land
- Auth flow tweaks

**Deliverable shape:** Routes under `pages/api/`, models under `models/`, API contract notes in `docs/api/routes.md` (TBD)

**Rules:**
- All responses: `{ ok: true, data }` or `{ ok: false, error: { code, message } }`
- Auth check on every route except `/api/health` and `/api/public/*`
- All third-party keys come from `process.env`, never hardcoded
- Pino structured logging; never log PII (log IDs only)

---

#### 11. `devops`

**Role:** Heroku app config, DNS, GitHub Actions CI, environment vars, monitoring, cutover.

**Required reading:** docs/architecture.md (deployment section), docs/decisions.md, docs/runbooks/

**Active work so far:**
- Heroku app `platt-partners` provisioned (heroku-24, Basic dyno, US)
- Heroku Config Vars set: NODE_ENV, NEXTAUTH_URL, NEXTAUTH_SECRET, JOB_RUNNER_SECRET
- Procfile + app.json
- GitHub Actions CI (`.github/workflows/ci.yml`) — typecheck + lint + build on PR
- docs/runbooks/heroku-deploy.md
- 301 redirects in next.config.js

**Typical tasks:**
- DNS cutover (Phase 1, when Peter grants access)
- Atlas cluster provisioning (when Ryan signs off)
- Custom domain attach + Let's Encrypt cert
- Sentry / error monitoring setup (deferred)
- Heroku Scheduler entries (Phase 6)

**Deliverable shape:** `Procfile`, `app.json`, `.github/workflows/*.yml`, runbooks in `docs/runbooks/`, DNS doc in `docs/runbooks/dns-cutover.md`

**Rules:**
- All env vars documented in `.env.example` before the code that uses them lands
- DNS changes coordinated with `marketing-site-mgr` and `analytics-mgr` (SEO impact)
- No `heroku config:set` without recording in `docs/runbooks/heroku-deploy.md`
- Confirm with Ryan before any heroku-create / addons:create / domains:add — see CLAUDE.md

---

#### 12. `security`

**Role:** Secrets, PII, OAuth scopes, rate limits, abuse, ToS compliance, GDPR.

**Required reading:** docs/security.md, docs/api_integrations.md, CLAUDE.md

**Active work so far:**
- pino redaction filter for tokens/cookies/auth headers
- `scripts/verify-env.js` — pre-commit check for hardcoded secrets in source
- `.gitignore` covers `.env`, knowledge/candidates/, knowledge/emails-voice-corpus/
- IP-hash strategy on `/api/public/contact` (don't store raw IPs)

**Typical tasks:**
- Pre-phase security review
- New-integration scope justification
- Public widget rate-limit tuning (Phase 4)
- GDPR Forget-this-person implementation review (Phase 2)
- Voice corpus PII scrubber audit (Phase 3)

**Deliverable shape:** Audit reports in `docs/audits/<date>-<topic>.md`, middleware in `lib/middleware/`

**Rules:**
- Standing rules from CLAUDE.md override everything
- Block any change introducing a hardcoded secret
- Every minimum-scope justification documented in `docs/audits/scopes.md` (TBD)

---

## Cross-cutting alignment rule (critical, per Ryan)

`project-manager` will not advance a phase if `marketing-site-mgr` + `analytics-mgr` + brand work in `knowledge/brand/` have drifted from each other.

What "aligned" means at every gate:
- The public site, the dashboard chrome, and the email signatures all reflect one brand voice
- Analytics tracking is in place for every public page and every dashboard action that maps to a business outcome
- Tracking codes (GA4, Meta if added later) are scoped consistently across surfaces

---

## Conflict resolution

Feature managers disagree → `tech-lead` arbitrates. `tech-lead` unsure → Ryan decides. Resolution recorded in `docs/decisions.md`.

---

## Naming a new agent

If a task doesn't fit any of the twelve, ask Ryan before creating a new role. Sprawl is the enemy of consistency.
