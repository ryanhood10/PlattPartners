---
title: ICPs (Ideal Client Profiles) — for Phase 4 BD outreach
tags: [strategy, icp, bd]
pii: false
internal_only: true
trust_level: 3
last_verified_date: 2026-05-14
---

# Ideal Client Profiles (ICPs) — Phase 4 BD targeting

These define who the `signal_scanner` worker watches for and who the BD outreach engine targets when generating one-page briefs for Peter to approve.

## ICP 1: Multi-unit restaurant operators

**Definition:** Fast-casual, QSR, or casual-dining chains with 50+ units OR $50M–$1B annual revenue, hiring at the Director+ level in operations, IT, technology, finance, marketing, or development.

**Why this fits Platt:**
- Existing client concentration (Jack in the Box, Del Taco, El Pollo Loco, Petco)
- Strong existing referral network among QSR HR leaders
- Highest-confidence niche for restaurant-first brand positioning

**Sourcing signals:**
- New exec hire announcements (LinkedIn, press releases) → opportunity to congratulate + pitch the next hire
- Funding announcements (PE backing, growth equity) → growth → hiring
- Geographic expansion announcements → new market openings = new region directors needed
- Public job postings (Greenhouse, Lever, company careers pages) for matching titles

**Geographic scope:** US-wide, with stronger concentration in California, Texas, Florida, the Southeast

## ICP 2: Series B–D tech-leadership

**Definition:** Venture-backed startups, Series B through D, hiring at the Director+ level in engineering, DevOps, cloud, security, data, or product.

**Why this fits Platt:**
- Recent placements include Director of DevOps, Director AWS Cloud, CIO, Solutions Architect, Senior Integration Architect
- Tech-leadership search is high-fee, lower-volume work (premium positioning)
- Funded startups have urgency and budget

**Sourcing signals:**
- Funding announcements (Crunchbase, PitchBook) → 3–6 month leading indicator for senior hires
- New CTO/CIO announcements → they usually rebuild their leadership team
- Public job postings for Director+ engineering titles
- LinkedIn posts mentioning "hiring our first [Director of X]"

**Geographic scope:** US-wide; favor SF Bay Area, NYC, Austin, Denver, Boston, Nashville (proximity bonus)

## ICP 3: Mid-market construction firms

**Definition:** Construction firms doing $50M–$500M in revenue, hiring at the PM+ level for construction, ops, or IT.

**Why this fits Platt:**
- Stated specialty area
- Less competitive than tech recruiting — fewer specialized firms in this niche
- Often local/regional which suits referral-based BD

**Sourcing signals:**
- Public award announcements (large project wins → staffing up)
- Industry trade media (ENR, Construction Dive)
- Public job postings

**Geographic scope:** Southeast US (per Peter's home base, assuming TN); also TX, FL

## Cross-ICP filters

**Always disqualify:**
- Companies with > 5,000 employees (too big — they have in-house exec search teams)
- Companies that already use a tier-1 retained search firm publicly (Heidrick, Russell Reynolds, Egon Zehnder) for these levels
- Companies in active financial distress (bankruptcy filings, mass layoffs)

**Higher-priority signals:**
- New CEO or CFO in the last 12 months (full leadership team turnover incoming)
- Recent IPO or pre-IPO
- Acquired another company in the last 6 months (integration hiring)

## Output for `signal_scanner`

For each ICP-match: one-page brief with company overview, hiring manager identity, why-they-fit-Platt, and **3 specific candidate examples from Platt's existing pipeline** who match the role. The 3-candidate hook is the differentiator from generic BD outreach.

Brief lands in `bd_briefs` collection; Peter approves/skips via the dashboard "BD Queue" view.
