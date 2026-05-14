# Platt Partners

Single Next.js app for **Platt Partners** (plattpartners.com), Peter Platt's recruiting firm. Public marketing site + authenticated internal dashboard + AI assistant in one codebase, deployed to one Heroku app.

**Builder:** Ryan Hood (ryan@eldrin.ai)
**Client:** Peter Platt, Founder, Platt Partners
**Existing tooling Peter pays for:** LinkedIn Recruiter, Apollo.io, Microsoft 365

---

## Start here

- New to the project? Read in this order:
  1. **`docs/build_plan.md`** — what we're building, in six phases
  2. **`docs/architecture.md`** — how it fits together
  3. **`docs/decisions.md`** — what's already been decided
  4. **`TEAMS.md`** — sub-agent roster
  5. **`CLAUDE.md`** — standing rules for Claude Code

- About to write code? Check `docs/blockers.md` first — there may be open Peter-input questions in your path.

---

## Stack

| Layer | Tool |
|---|---|
| Web framework | Next.js 14 (Pages Router) + React 18 |
| Styling | Tailwind + shadcn/ui |
| Auth | NextAuth (Auth.js) + Microsoft Entra provider |
| Backend (API routes) | Next.js API routes inside the same app |
| Database | MongoDB Atlas (M0 → M2) + Mongoose |
| Vector DB | Pinecone or Atlas Vector Search (decided Phase 4) |
| Embeddings | Voyage-3-lite |
| LLM | Claude Sonnet (drafting) + Haiku (classification) + Gemini Flash (bulk) |
| Email | Microsoft 365 Graph API |
| Enrichment | Apollo.io REST API |
| Sourcing | LinkedIn Recruiter (manual CSV export only — **never automated**) |
| Hosting | Heroku (Basic dyno) |
| Cron | Heroku Scheduler |
| Asset CDN | Cloudinary |
| Rate limiting | Upstash Redis |
| Backups | Backblaze B2 |

Total monthly run cost target: **~$33/mo**.

---

## Repo layout

```
PlattPartners/
├── pages/             # Next.js routes (public + /app dashboard + /api)
├── components/        # UI, marketing, dashboard, widget
├── lib/               # db, auth, services, middleware, prompts
├── models/            # Mongoose schemas
├── public/            # Static assets (logo, client logos)
├── docs/              # Plan, architecture, decisions, blockers, audits
├── knowledge/         # AI source-of-truth wiki + brand kit
├── eval/              # Nightly assistant eval set
├── scripts/           # Setup, seed, verify-env
├── TEAMS.md           # Sub-agent roster
├── CLAUDE.md          # Standing project rules
└── _research/         # WP site extraction (Phase 0 reference, gitignored)
```

---

## Standing rules (always)

1. **Never automate LinkedIn.** Manual CSV export only.
2. **Never expose API keys to the browser.** Server-side only.
3. **Never commit `.env`, candidate PII, or the voice corpus.**
4. **Always cite a source_id in AI responses.**
5. **Always update `docs/decisions.md`** when making an architectural choice.
6. **Marketing / tracking / website alignment is checked at every phase gate.**
7. **No financial-ops work** unless Ryan explicitly opens that scope.

See `CLAUDE.md` for the full rule set.

---

## What we need from Peter (handover checklist)

Track responses in `docs/blockers.md`.

**Critical (Phase 0 cannot start without these):**
1. Microsoft 365 admin access — register the Entra app
2. Brand assets — logos, colors, fonts (we extracted what's on the current site; confirm)
3. Canonical decisions: phone number, email, verticals, service framing

**Phase 2 prerequisites:**
4. LinkedIn Recruiter login / seat for ryan@eldrin.ai
5. Apollo.io login or API key
6. 5–10 sample outreach emails that worked
7. Prescreen-question docs per vertical
8. The ~50 HR contacts list

**Phase 1 prerequisites:**
9. DNS / domain registrar access for plattpartners.com
10. Google Search Console access (for SEO preservation during cutover)
11. WordPress admin (read-only, for content extraction)
12. Notify Good Online Marketing (Peter's agency) of the migration plan

**Decisions (need Peter input):**
13. Friday calls — keep doing them, or AI-drafted follow-ups for the ones he doesn't get to?
14. Current ATS — Bullhorn, Loxo, spreadsheet, or none?
15. PII tolerance — OK with Anthropic enterprise data handling?

---

## License & confidentiality

Private to Ryan Hood and Platt Partners. Do not commit secrets. Do not commit candidate PII.
