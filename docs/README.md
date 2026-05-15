# Docs index

Every doc in the repo, what it covers, and when to read it.

---

## If you're new to the project

Read in this order:

1. **[`CHANGELOG.md`](CHANGELOG.md)** — what's been shipped, commit by commit, newest first
2. **[`build_plan.md`](build_plan.md)** — the six-phase plan with deliverable checkboxes
3. **[`architecture.md`](architecture.md)** — how the system is wired (the *how*, not the *why*)
4. **[`decisions.md`](decisions.md)** — every architectural choice we've made and *why*
5. **[`../CLAUDE.md`](../CLAUDE.md)** — standing rules for Claude Code
6. **[`../TEAMS.md`](../TEAMS.md)** — sub-agent roster

---

## If you're starting work

Check in order:

1. **[`blockers.md`](blockers.md)** — open Peter-input questions; might affect what you're about to build
2. **[`peter-onboarding.md`](peter-onboarding.md)** — the ask list Ryan sent Peter + response tracker
3. **[`CHANGELOG.md`](CHANGELOG.md)** — has it already been done?
4. **[`api_integrations.md`](api_integrations.md)** — does your work touch a third-party integration?
5. **[`security.md`](security.md)** — does your work touch PII, secrets, or auth?

---

## Reference

| Doc | Topic |
|---|---|
| [`build_plan.md`](build_plan.md) | Phase 0-6 deliverables with status checkboxes |
| [`architecture.md`](architecture.md) | Repo layout, data flow, collections, scheduled jobs, failure modes |
| [`decisions.md`](decisions.md) | One entry per architectural decision; never edit, only append |
| [`CHANGELOG.md`](CHANGELOG.md) | Per-commit log of what shipped |
| [`api_integrations.md`](api_integrations.md) | Every external service: auth, scopes, rate limits, status |
| [`security.md`](security.md) | Secrets, PII, OAuth scopes, abuse, GDPR, audit cadence |
| [`glossary.md`](glossary.md) | Terminology |
| [`blockers.md`](blockers.md) | Live list of open input/decision blockers |
| [`peter-onboarding.md`](peter-onboarding.md) | Kickoff email + response tracker |

## Runbooks

| Runbook | When to use it |
|---|---|
| [`runbooks/heroku-deploy.md`](runbooks/heroku-deploy.md) | Deploying to Heroku, debugging build failures, rollback |
| [`runbooks/atlas-setup.md`](runbooks/atlas-setup.md) | Creating the MongoDB Atlas cluster + wiring it to Heroku |
| [`runbooks/dns-cutover.md`](runbooks/dns-cutover.md) | Flipping plattpartners.com from WordPress to our app |

---

## Knowledge base

Lives outside `docs/` because it's the AI assistant's source material, not project documentation. See [`../knowledge/README.md`](../knowledge/README.md).

| Folder | Purpose |
|---|---|
| `knowledge/brand/` | Colors, fonts, voice guide, asset manifest |
| `knowledge/wiki/` | Business overview, pricing, prescreen questions, ICPs |
| `knowledge/clients/` | Per-client docs (templates) |
| `knowledge/placements/` | Per-placement docs (auto-generated when placements happen) |
| `knowledge/candidates/` | Gitignored — auto-generated, PII-tagged |
| `knowledge/emails-voice-corpus/` | Gitignored — Peter's emails after PII-scrubbing |
| `knowledge/analytics-snapshots/` | Gitignored — daily GA4 + Search Console JSON dumps |

---

## Eval

| File | Purpose |
|---|---|
| `eval/qa_pairs.jsonl` | 18 Q/A pairs — nightly assistant eval (Phase 4+) |
| `eval/judge_prompt.md` | Claude-as-judge prompt for scoring assistant responses |
| `eval/README.md` | How the eval loop works |

---

## Site research

| Path | Purpose |
|---|---|
| `_research/plattpartners-site/SUMMARY.md` | Findings from the WP site crawl |
| `_research/plattpartners-site/pages/*.md` | Per-page content extraction |
| `_research/plattpartners-site/assets/` | Downloaded brand + client logos |

Delete after WP cutover monitoring window (30 days post-cutover).
