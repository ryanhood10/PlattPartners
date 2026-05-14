---
title: Pricing & the retainer transition
tags: [business, pricing, retainer]
pii: false
internal_only: false
trust_level: 3
last_verified_date: 2026-05-14
---

# Pricing & the retainer transition

## Current pricing (as known)

| Service | How priced |
|---|---|
| **Search** (retained executive search) | Fee per placement — typically 20–25% of first-year salary. On a $200K role that's $40K–$50K. |
| **RPO subscription** | Monthly retainer for multiple-role search. Existing model. |
| **Staffing** | Hourly / placement-based depending on contract. |

> **Verify all numbers with Peter.** Above is industry-standard / inferred — actual rates may differ.

## Where Peter wants to go

Peter wants to consolidate toward a **$5K/month retainer** as the default model for active clients with multiple open roles. The pitch to clients:

- After 3–4 placements/year, $5K/mo ($60K/year) saves significantly vs. percentage-of-salary on each placement
- Predictable monthly cost — easier for client procurement
- Aligns Peter's incentives (long-term partnership) rather than transactional
- Reflects the actual ongoing nature of executive search at growing companies

## Why the transition

| Reason | Detail |
|---|---|
| Cash-flow stability | Predictable monthly revenue beats lumpy per-placement billing |
| Better client conversations | He's selling a relationship, not transactions |
| Margin protection | At ~18 placements/year, his per-placement margin is large but uneven; retainer smooths and grows it |
| Scales with the AI dashboard | The dashboard makes multi-role pipelines manageable; the $5K retainer compensates for sustained capacity |

## Risks

- Some clients (especially per-need search) won't fit the retainer model — he'll need a tiered offering
- Existing per-placement contracts can't be retroactively converted; transition happens at contract renewal
- $5K/mo positions him in the middle of the search market — not premium, not low-cost. Brand needs to reinforce value

## Rollout plan (proposed, needs Peter sign-off)

| Stage | When | What |
|---|---|---|
| 1. Internal model | Now | Lock the $5K/mo offer, what's included (number of roles, geographic scope, exclusivity, response SLAs) |
| 2. Existing client tier-up | Q3 | Renewals of current accounts (Jack in the Box etc.) — propose retainer at renewal |
| 3. New client default | Q4 | New BD outreach leads with retainer model; per-placement only as a fallback |
| 4. Phase out per-placement | 2027 | Per-placement contracts only by exception |

## What the dashboard needs to track

- Per-client contract type: `retainer | per-placement | hybrid`
- Retainer start date, term, included roles, monthly fee
- Per-retainer activity: roles opened, candidates submitted, placements made
- ROI calculation for the client (what they'd have paid per-placement vs. retainer)

This is a Phase 1 schema item — `clients` collection gets a `contract` sub-object.

## Open questions

- [ ] What's the SLA Peter is willing to commit to? (e.g., first candidate submitted in 5 business days)
- [ ] How many roles per month does a $5K retainer cover? Cap, or unlimited?
- [ ] Are there industry-specific premiums (e.g., $7K for the construction vertical)?
- [ ] Out-of-scope clauses (sudden 10 new roles → re-negotiate)
