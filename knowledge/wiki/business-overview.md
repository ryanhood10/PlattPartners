---
title: Platt Partners — Business overview
tags: [business, overview, services, clients]
pii: false
internal_only: false
trust_level: 3
last_verified_date: 2026-05-14
---

# Platt Partners — Business overview

## Who

- **Company:** Platt Partners
- **Founder:** Peter Platt (25+ years in recruiting per `/about-services/`)
- **Website (current):** plattpartners.com (WordPress 6.9.4 + Beaver Builder, hosted on Flywheel, agency Good Online Marketing)
- **Website (post-migration):** plattpartners.com on our Next.js stack, deployed to Heroku
- **Location:** Tennessee (per handoff) — but every phone number on the site is California or toll-free; verify
- **Site phone (header):** (949) 235-0139 — California area code
- **Site phone (home footer):** 1 (866) 766-0188 — toll-free
- **Site phone (tech page footer):** 1 (877) 205-2995 — different toll-free
- **Email (generic):** info@plattpartners.com
- **Email (Peter direct):** peter@plattpartners.com
- **LinkedIn:** https://www.linkedin.com/in/peterplatt/
- **Tracking on current site:** Google Site Kit firing **deprecated UA-172816061-1**; needs GA4 reauth

> The three different phone numbers and two different emails on the current site are tracked as blockers — `docs/blockers.md` has the canonical-pick question for Peter.

## Service lines (as written on the current site)

The site has TWO different framings depending on which page:

**Framing A (homepage):**
- **Multiple Positions** — Subscription-based service. "For one monthly fee we get to work finding exceptional candidates for a group of open positions."
- **One Position** — Fee per placement. "When you have one position you can't seem to find traction on, we'll take that on."

**Framing B (`/about-services/`):**
- **RPO** — "We deliver immediate and short-term staffing needs for small to mid-cap companies."
- **SEARCH** — "Provide unique leaders for executive level positions."
- **Staffing** — "Leverage highly-skilled professionals on a temporary and temporary-to-hire basis."

**The rebuild leads with Framing A (subscription / per-placement)** — it lines up with Peter's stated $5K/mo retainer direction. RPO/SEARCH/Staffing is deprecated unless Peter wants to keep it.

**Pricing transition:** Peter wants to move toward a flat **$5K/mo retainer** that covers multiple roles. After 3–4 placements, clients save vs. percentage-of-salary fees. See `pricing-and-retainer.md`.

## Verticals — INCONSISTENT, needs Peter's pick

The site says different things in different places. Tracked as a blocker.

| Source | Verticals |
|---|---|
| Homepage body copy | "tech, financial services and fast casual dining industries" |
| OG meta description | "tech, startup, finance, and fast casual dining industry" |
| `/technology/` page | Tech vertical (only vertical with its own page) |
| `/about-services/` page | No verticals; service-line framing instead |
| Original handoff brief | "restaurant ops, tech leadership, construction, IT leadership" |

Notable: **construction is not on the site**; **financial services IS** on the site but isn't in the handoff. Strong existing client concentration is restaurants (Jack in the Box, Del Taco, El Pollo Loco, Petco logos lead the homepage).

The rebuild plan currently scaffolds three sub-pages: `/restaurants`, `/technology`, `/it-leadership`. We'll relabel once Peter confirms.

## Known clients (named on the current site)

| Company | Where | Type |
|---|---|---|
| Jack in the Box | Homepage logo wall | Logo only — Peter's biggest |
| Del Taco | Homepage logo wall | Logo only |
| El Pollo Loco | Homepage logo wall | Logo only |
| Petco | Homepage logo wall | Logo only |
| ODK Media | Homepage testimonial | Quote from Todd Merz, Head of Talent Acquisition |
| GitLab | `/technology/` case study (anonymized) | "DevOps company w/ Iconiq Capital funding" — 30 senior hires in 4 months, 13% diversity lift |
| GitLab | `/about-services/` testimonial | Quote from Sharif Bennett, AE |
| Encore Capital Group | `/about-services/` testimonial | Quote from Frank Garcia, Sr. Director |
| (5 unidentified logos) | Homepage logo wall | `logo-12.png`, `42`, `52`, `62`, `72` — Peter to label |

## Recently placed positions (verbatim from the homepage)

- Director of Customer Success
- Account Executives
- Regional Director of Sales
- Director of Dev Ops
- Director, AWS Cloud
- Chief Information Officer
- Solutions Architect
- Senior Integration Architect

(Lopsided toward tech leadership. Restaurant-ops placements aren't named publicly; Peter likely has them in his sheet.)

## How a placement happens (current workflow)

1. Peter calls his list of ~50 HR contacts every Friday. A subset tells him about open roles.
2. The HR contact emails the job listing. Some details aren't in the JD — they're conveyed verbally and stay internal.
3. Peter logs into **LinkedIn Recruiter** and builds a search; selects candidates.
4. Selected candidates run through **Apollo.io** to find email addresses.
5. Peter (or his researcher) emails candidates with personalized outreach.
6. Replies come in to his Microsoft 365 inbox.
7. Peter sends prescreen questions (provided by the client) to interested candidates.
8. Peter does a phone screen.
9. If they pass, Peter sends them to the client for interview.
10. Offer → placement → contract.

**Average placements per year: ~18.**

## What's painful today

- Friday calls eat all his time; little left for **new-client BD** (a major goal of this build — Phase 5).
- Wants to **get off LinkedIn Recruiter** eventually — build his own candidate database.
- Fake / AI-generated applications on LinkedIn job posts are increasing — needs filtering (Phase 2 authenticity scorer).
- Unclear how to market across verticals — should he double down on restaurants or diversify?

## Decided positioning

**Lean into restaurants** as the primary public brand. Sub-pages for `/technology`, `/it-leadership`, and a third (TBD with Peter — restaurants? construction? financial services?) under one parent brand. Static sub-pages; no dynamic visitor-based personalization in v1 (can revisit later — see `docs/decisions.md`).

## Team shape (per the website)

A five-role pod: Researcher, Recruiter, Marketer, Account Manager, Data Analyst. **Verify** which are FTE vs. contractors. Currently the assumption is Peter is the primary dashboard user, with the build's automation making the five-role pitch truthful even if Peter solo-delivers today.

## Open questions (need Peter — also in `docs/blockers.md`)

- [ ] Bo vs Peter — site lists Peter; handoff context mentioned "Bo." Clarify.
- [ ] Tennessee vs California — phone is CA area code; verify operating base.
- [ ] Canonical phone (3 on site) and email (2 on site).
- [ ] Canonical verticals (site says 3, handoff says 4, only 1 has a sub-page).
- [ ] Canonical service framing (subscription vs RPO/SEARCH).
- [ ] Headcount today (FTE vs contractors in the "team of 5").
- [ ] Current ATS — Bullhorn, Crelate, PCRecruiter, Loxo, or a spreadsheet?
- [ ] Friday calls — keep personal, or AI-drafted follow-ups for missed ones?
- [ ] PII tolerance for sending candidate data to Anthropic / Voyage under enterprise DPA?
- [ ] First pilot role for Phase 2 — recommendation: next Jack in the Box exec role for highest-visibility proof point.
- [ ] Label the 5 unidentified client logos on the homepage.
- [ ] What happened to the "3 Outbound Recruiting Pro Tips" PDF lead magnet that's referenced on `/about-services/`? Still wanted?
- [ ] Notify Good Online Marketing (his current WP agency) of the migration? When?
