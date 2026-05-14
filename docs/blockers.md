# Blockers

Open items that need someone's input before downstream work can proceed. Add an entry when you hit a blocker; remove it when resolved.

Format:
```
## YYYY-MM-DD — <short title>
**Blocked agent / phase:** <who or what is waiting>
**What we need:** <specific input or decision>
**Who can unblock:** <name>
**What we've done in the meantime:** <work that can continue without resolution>
```

---

## 2026-05-14 — Canonical verticals

**Blocked agent / phase:** `marketing-site-mgr`, Phase 1
**What we need:** Decide the three (or four) canonical verticals for the rebuild.
**Why this is open:** The current WP site lists "tech, financial services, fast casual dining" on the homepage; "tech, startup, finance, fast casual dining" in OG meta description; only `/technology/` has a sub-page; `/about-services/` reframes as "RPO / SEARCH / Staffing." The original handoff said "restaurant ops, tech leadership, construction, IT leadership." Construction is on the handoff but NOT on the site; financial services is on the site but NOT in the handoff brief.
**Who can unblock:** Peter
**What we've done in the meantime:** Site research saved to `_research/plattpartners-site/`; copy from each vertical extracted; the `marketing-site-mgr` will scaffold sub-page templates that are easy to relabel once Peter confirms.

---

## 2026-05-14 — Canonical service framing

**Blocked agent / phase:** `marketing-site-mgr` + `brand`, Phase 1
**What we need:** Pick one framing. Homepage uses "Subscription-based service (multiple positions) / Fee per placement (one position)"; `/about-services/` uses "RPO / SEARCH / Staffing." Peter's stated direction is the $5K/mo retainer model — that fits the subscription frame, not RPO/SEARCH.
**Who can unblock:** Peter
**What we've done in the meantime:** New copy drafts assume retainer/subscription as the lead; per-placement fee mentioned secondary; RPO/SEARCH/Staffing language deprecated unless Peter wants to keep it.

---

## 2026-05-14 — Canonical phone + email

**Blocked agent / phase:** `marketing-site-mgr`, `outreach-mgr`, Phase 1
**What we need:** Pick one phone and one email.
**Why this is open:** Three phones currently across the site — (949) 235-0139 (California area code, on header + about-services), 1 (866) 766-0188 (homepage footer, toll-free), 1 (877) 205-2995 (tech page footer, different toll-free). Two emails — info@plattpartners.com (generic) and peter@plattpartners.com (direct).
**Who can unblock:** Peter
**What we've done in the meantime:** Templates use placeholder variables; rebuild will populate from `knowledge/wiki/business-overview.md` once Peter confirms.

---

## 2026-05-14 — Tennessee vs California operating location

**Blocked agent / phase:** `outreach-mgr`, Phase 3 (time-zone defaults in scheduling)
**What we need:** Where is Peter physically operating from? Site lists TN; phone area code is California (Orange County).
**Who can unblock:** Peter
**What we've done in the meantime:** Default time zone in code is `America/Chicago` (TN) but configurable via env var.

---

## 2026-05-14 — Microsoft 365 admin access

**Blocked agent / phase:** `devops`, `backend`, Phase 0
**What we need:** Either Global Admin access for ryan@eldrin.ai in Peter's M365 tenant for ~30 min to register the Entra app, OR a screen-share where Peter clicks through the app registration while Ryan guides.
**Who can unblock:** Peter
**What we've done in the meantime:** Documented exact scopes needed in `docs/api_integrations.md`; can stub the auth flow with a mock provider for local dev.

---

## 2026-05-14 — Site Kit GA4 reauth

**Blocked agent / phase:** `analytics-mgr`, Phase 1 (cutover-critical)
**What we need:** Peter's current Site Kit (Google) connection on WordPress is firing a deprecated UA-172816061-1 tracking ID. We need either: (a) the active GA4 property ID from Site Kit settings, or (b) to set up a fresh GA4 property and reauth.
**Why this is critical:** During the WP cutover we need to compare pre/post traffic. If the current site isn't logging to a property we can read, we have no baseline.
**Who can unblock:** Peter
**What we've done in the meantime:** Will set up a fresh GA4 property in parallel as fallback.

---

## 2026-05-14 — DNS / registrar access

**Blocked agent / phase:** `devops`, Phase 1 (cutover-critical)
**What we need:** Who controls the DNS for plattpartners.com? Flywheel (current host)? Peter's agency? Direct at GoDaddy/Namecheap? We need write access for the cutover.
**Who can unblock:** Peter
**What we've done in the meantime:** Cutover plan written; we can execute as soon as access is granted.

---

## 2026-05-14 — Agency (Good Online Marketing) coordination

**Blocked agent / phase:** `project-manager`, Phase 1
**What we need:** Decide if/when to notify Good Online Marketing that the WP site is being retired. Are they on retainer? Do they need a sunset period for any monthly work they're doing?
**Who can unblock:** Peter (judgment call)
**What we've done in the meantime:** Draft notification email pending Peter's call on timing and tone.

---

## 2026-05-14 — Bo vs Peter

**Blocked agent / phase:** `project-manager`
**What we need:** The original handoff mentioned "Bo" in some context but the site, LinkedIn, and all public materials say "Peter Platt." Confirm who Peter is referring to — partner, nickname, different firm, typo in the handoff?
**Who can unblock:** Peter or Ryan (Ryan may know already)
**What we've done in the meantime:** All materials use "Peter."
