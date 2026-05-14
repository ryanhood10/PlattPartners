# plattpartners.com — Research Summary

**Crawled:** 2026-05-14
**Tool:** WebFetch + curl (manual; sub-agent permission for plattpartners.com domain not granted, so done from main context)

---

## Site at a glance

**Pages found (via Yoast sitemap):**
1. `/` — Homepage (long single-page design with anchor nav)
2. `/contact/` — Mostly hero + redirect to home contact anchor
3. `/technology/` — Tech-vertical page with GitLab (anonymized) case study
4. `/about-services/` — Peter's bio + alternate service framing (RPO/SEARCH/Staffing)
5. `/how-to-build-a-robust-pipeline-of-qualified-candidates/` — Landing-page variant, overlapping content
6. `/privacy-policy/` — Standard
7. `/header/` — Beaver Builder global header template (not user-facing)

**Total user-facing pages: ~5.** Tiny SEO footprint.

## Tech stack (current)

| Layer | Detected |
|---|---|
| CMS | WordPress 6.9.4 |
| Theme | bb-theme (Beaver Builder theme) |
| Page builder | Beaver Builder + BB PowerPack |
| SEO plugin | Yoast SEO |
| Analytics | Google Site Kit 1.142.0 + Google Tag (gtag.js) |
| Spam protection | CleanTalk |
| Hosting | Flywheel (managed WordPress) |
| Tracking IDs | **UA-172816061-1** (DEPRECATED — Universal Analytics, sunset by Google) |
| Fonts | Roboto (300, 400, 700) + Work Sans (800) — via Google Fonts |
| Icons | Font Awesome 5.15.4 |

## Brand colors (top hex codes from CSS)

| Color | Hex | Where it appears |
|---|---|---|
| Brand blue (primary) | **#428bca** | 10× — buttons, headings, links |
| White | #ffffff | backgrounds |
| Black | #000000 | body text |
| Dark navy/teal | **#215273** | secondary brand |
| Medium blue | #2b7bb9 | accents |
| Dark grey | #32373c | UI chrome |

Rebuild recommendation: use **#428bca** as primary, **#215273** as secondary, neutral grey scale, white/off-white background.

## Fonts (rebuild)

- **Headings:** Work Sans 800 (matches current)
- **Body:** Roboto 300/400/700 (matches current)
- Both available on Google Fonts; load via `next/font/google` for performance

## Assets downloaded (18 files, ~1.7MB total)

In `assets/`:
- `logo-blue-horizontal.svg` — primary logo (2025 revision, SVG, scalable)
- `logo-P-mark.png` — secondary P-mark logo
- `logo-12.png` through `logo-72.png` — five "Trusted By" client logos (unidentified — need Peter to label)
- `jack-in-the-box.png`, `el-pollo-loco.png`, `del-taco.png`, `petco.png` — restaurant client logos (named)
- `client-gitlab.jpg` — GitLab logo (from tech page case study)
- `hiring.jpg`, `hiring-manager.jpg` — stock photography
- `tech-how-we-get-you-there.jpg`, `tech-clock.png`, `tech-hands.png`, `tech-computer.png` — tech-page graphics

**Still to extract (low priority):** favicon, OG image (`recruiting-for-fast-growing-companies.jpg`).

## Vertical positioning — INCONSISTENT across the site

This is the biggest "ask Peter" question coming out of the audit.

| Source | Verticals listed |
|---|---|
| Homepage body | "tech, financial services and fast casual dining industries" |
| OG meta description | "tech, startup, finance, and fast casual dining industry" |
| `/technology/` page | Tech recruiting, case study from a "DevOps software company" (GitLab) |
| `/about-services/` page | "RPO, SEARCH, Staffing" (services not verticals) |
| Original handoff brief | "restaurant ops, tech leadership, construction, IT leadership" |

**Conclusion:** Construction is NOT currently on the site. Financial services IS. Peter's pitch has drifted. The rebuild needs an explicit decision on canonical verticals before sub-pages get built.

## Service-model positioning — ALSO inconsistent

| Source | Model |
|---|---|
| Homepage | "Subscription-based service" (multiple positions) OR "Fee per placement" (one position) |
| /about-services | "RPO" (immediate/short-term) + "SEARCH" (executive) + "Staffing" (temp/temp-to-hire) |
| Handoff plan | $5K/mo retainer model (subscription) — Peter's stated direction |

Rebuild: lead with **retainer/subscription** as Peter's preferred model; secondary mention of single-placement fee for one-off cases.

## Contact info — needs reconciliation

Three different phone numbers across the site:
- **(949) 235-0139** — header + about-services (California area code)
- **1 (866) 766-0188** — homepage footer (toll-free)
- **1 (877) 205-2995** — /technology page footer (different toll-free)

Two emails:
- **info@plattpartners.com** — generic, homepage
- **peter@plattpartners.com** — Peter direct, about-services

This is a "fix in the rebuild" win — one number, one email, consistent everywhere.

## Clients named on the site

| Company | Where | Type of mention |
|---|---|---|
| Jack in the Box | Home (Trusted By) | Logo |
| Del Taco | Home (Trusted By) | Logo |
| El Pollo Loco | Home (Trusted By) | Logo |
| Petco | Home (Trusted By) | Logo |
| ODK Media | Home testimonial | Quote from Todd Merz, Head of Talent Acquisition |
| GitLab (implied as "DevOps software company w/ Iconiq Capital funding") | /technology case study | Anonymized — 30 senior hires in 4 months, 13% diversity lift |
| GitLab (explicit) | /about-services testimonial | Quote from Sharif Bennett, AE |
| Encore Capital Group | /about-services testimonial | Quote from Frank Garcia, Sr. Director |
| Rafiq Hanna | /about-services testimonial | No company named (candidate, not client) |

Plus 5 unlabeled logos in the "Trusted By" row (`logo-12.png`, `42`, `52`, `62`, `72`) that need Peter to identify.

## Existing process pitch (4 steps, can reuse)

1. **Meet Your Team** — Researcher + Recruiter + Marketer + Account Manager + Data Analyst (5-person team, currently aspirational; our build makes this real via automation)
2. **Receive ongoing communication** — Weekly submissions + progress reports
3. **Robust pipeline of qualified candidates** — "Days, not weeks"
4. **High-five your hiring manager**

This is good copy. Preserve it in the rebuild.

## Lead magnet referenced (worth reviving)

> "3 Outbound Recruiting Pro Tips That Can Save You Time And Money" — free downloadable guide.

Not currently visible on the homepage — may have been removed or moved. Worth asking Peter if it still exists.

## SEO / tracking notes

- Yoast generates the sitemap and JSON-LD schema (WebPage type minimum, possibly Organization)
- OG image is `recruiting-for-fast-growing-companies.jpg` (1200x628)
- **UA tracking ID is dead** — Google sunset Universal Analytics. Peter's Site Kit is wired but the tag fires a deprecated property. The rebuild needs a fresh GA4 setup.

## Top 5 things the rebuild team should know

1. **The current site is tiny** — only 5 user-facing pages, mostly variations of the same homepage copy. Rebuild is a chance to dramatically expand SEO surface.
2. **Vertical positioning is incoherent** — handoff says restaurants + tech + construction + IT; site actually says tech + finance + fast casual dining; only /technology has its own page. Need Peter to lock canonical verticals.
3. **Service positioning is also incoherent** — homepage uses subscription/per-placement; about-services uses RPO/SEARCH/Staffing. Rebuild should pick one frame.
4. **Three different phone numbers, two different emails** — current site is internally inconsistent. Rebuild should land on one of each.
5. **Brand palette is solid** — primary blue #428bca, secondary navy #215273, Roboto + Work Sans. We can preserve the brand visually while completely restructuring the content.

## Anything I couldn't extract

- The actual GA4 property ID (Site Kit hides it; only the deprecated UA shows in source). Peter or his Site Kit OAuth grant needs to reveal this.
- The lead-magnet PDF ("3 Outbound Recruiting Pro Tips") — not linked from current homepage; may be archived.
- Full body of `/how-to-build-a-robust-pipeline-of-qualified-candidates/` — fetch returned a summary, not the article; if it's an actual blog post we'd want the full text.
- The exact form submission backend (CleanTalk-protected, likely Beaver Builder Forms posting back to WP admin).
