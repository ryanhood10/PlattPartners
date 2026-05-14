# Peter onboarding — ask list + response tracker

**Drafted:** 2026-05-14
**Sent:** 2026-05-14 to peter@plattpartners.com
**Owner:** Ryan (and `project-manager` agent for follow-ups)

This is the kickoff email Ryan sent to Peter, plus a tracking table for responses. Update the **Status** column as items come in.

---

## Status tracker

| # | Item | Phase needed by | Status | Response received |
|---|---|---|---|---|
| 1 | Microsoft 365 admin access | 0 | ⏳ Pending | — |
| 2 | Confirm sign-in email | 0 | ⏳ Pending | — |
| 3 | Brand assets confirmation | 0 | ⏳ Pending | — |
| 4 | DNS controller + write access | 0 | ⏳ Pending | — |
| 5 | Google Search Console access | 0 | ⏳ Pending | — |
| 6 | Canonical phone number | 0 | ⏳ Pending | — |
| 7 | Canonical email | 0 | ⏳ Pending | — |
| 8 | Canonical verticals | 0 | ⏳ Pending | — |
| 9 | Canonical service framing | 0 | ⏳ Pending | — |
| 10 | LinkedIn Recruiter workflow walk-through | 2 | ⏳ Pending | — |
| 11 | Apollo.io key/login | 2 | ⏳ Pending | — |
| 12 | 5–10 sample outreach emails | 2 | ⏳ Pending | — |
| 13 | Prescreen questions doc | 2 | ⏳ Pending | — |
| 14 | The ~50 HR contacts | 2 | ⏳ Pending | — |
| 15 | Client Excel + candidate trackers | 1 | ⏳ Pending | — |
| 16 | Any SOPs / docs / sheets relating to the business | 1 | ⏳ Pending | — |
| PS | WordPress admin (nice-to-have) | 1 | ⏳ Pending | — |

Status emoji legend: ⏳ Pending • 🔄 In progress • ✅ Done • ❌ Declined • ⚠️ Partial

---

## The email (as sent)

> Hey Peter — I've been putting the build plan together; here's what I need from you to start, grouped by what unlocks what so you know what's urgent vs. what can roll in later.
>
> This is a lot of information, but 1-5 is crucial for me to get started.
>
> **Stuff I need first (unlocks dashboard login + the rebuild)**
> 1. **Microsoft 365 admin access** — I need to register an "Entra app" in your tenant so you can sign in to the new dashboard with your work email. Easiest: add me (ryan@eldrin.ai) as a Global Admin temporarily, or hop on a 15-min screen-share meeting and we do it together.
> 2. **Confirm the email you use for work** — peter@plattpartners.com?
> 3. **Extra brand assets (not urgent)** — logo files (SVG ideal), brand colors, fonts. Whatever you have. I already pulled what's on the site, so this is just to confirm/correct what I extracted. I can also create new brand assets for us to use.
> 4. **Control of plattpartners.com DNS** — your agency, GoDaddy, Namecheap, etc. (DNS typically hosted through whichever platform you purchased the domain on). I'd like "write access" for seamless addition of tracking tools on your website.
> 5. **Add me to your Google Search Console** — takes a couple minutes. Go to search.google.com/search-console → Settings → Users and permissions → Add user → ryan@eldrin.ai → "Owner." This gives me your search-traffic history so I can preserve the pages that are actually ranking when we move to the new stack. We can also do this in our next meeting or screen-share meeting. I could start a new Google Search Console, but our previous SEO data would be lost. This is utilized to lean into keywords and phrases that keep Platt Partners ranking high on Google.
>
> **A few canonical decisions I need from you (5-min answers)**
> 6. **Phone number:** your site has three different ones — (949) 235-0139 in the header, 866-766-0188 on the homepage, 877-205-2995 on the tech page. Which is the real one?
> 7. **Email:** info@plattpartners.com or peter@plattpartners.com — which do you want on the new site?
> 8. **Verticals:** your homepage says "tech, financial services, and fast casual dining"; your /technology page exists; an older brief mentioned "restaurant ops, tech leadership, construction, IT leadership." Construction isn't on your site anywhere. What are your real three (or four) verticals today?
> 9. **Service framing:** your homepage pitches "subscription / fee-per-placement"; your /about-services page pitches "RPO / SEARCH / Staffing." Which is the canonical pitch? (I'm assuming subscription-first based on the $5K/mo retainer direction you mentioned.)
>
> **Stuff I need before we automate sourcing (Phase 2)**
> 10. **LinkedIn Recruiter workflow walk-through** — at some point I'd like to watch you do a search-and-export once (screen-share or a short video). I'm building automation around the export — the system enriches, scores, and drafts outreach the moment your CSV lands — so I need to understand the upstream half. No login needed; just your workflow.
> 11. **Apollo.io** — login OR your API key (Settings → Integrations → API in Apollo).
> 12. **5–10 of your best outreach emails** — ones that actually got replies. I'll scrub the candidate names before anything touches AI. This is what teaches the system your voice.
> 13. **Your standard prescreen-questions doc** — for whatever verticals you actually pitch. Send what you have, even if it's per-role rather than per-vertical.
> 14. **The ~50 HR contacts you call on Fridays** — name, company, email, phone if you have them. Spreadsheet or screenshot, either works.
> 15. **Your current client Excel sheet + any candidate trackers you keep.**
> 16. **ANY SOPs, documents, sheets, relating to your business** — the more information I can provide to your new AI agent, the better.
>
> ---
>
> **I would also benefit from getting the WordPress admin login (which your website is built on). As I do not want to change anything on WordPress, it would allow me to gather additional information on current website plugins and additional website assets that I could not get on my initial web scrape of your site.**
>
> Call or text me if you have any trouble gathering the needed materials.
>
> Looking forward to getting started!
> —Ryan H

---

## Notes per item

- **#1 (M365 admin):** Without this, Phase 0 cannot complete. Auth flow can be stubbed locally with a mock provider, but production needs real Entra registration.
- **#5 (GSC):** If Peter actively declines, we set up fresh GSC after DNS is ours — accept "no pre-cutover baseline" as the trade-off.
- **#8 (verticals):** Decision blocks `marketing-site-mgr` from finalizing sub-page slugs and copy. Don't commit `/construction` or `/restaurants` until Peter confirms.
- **#9 (service framing):** Decision blocks homepage copy. Assume subscription-first until told otherwise.
- **#10 (LinkedIn):** Reframed from "give us a seat / login" to "walk us through your workflow once." Manual-only rule stands per `docs/decisions.md`.
- **#13 (prescreen):** Per-role is fine. Don't gate on Peter producing per-vertical docs.
- **PS (WP admin):** Nice-to-have. Already extracted all public content via WebFetch + asset downloads in `_research/plattpartners-site/`. WP admin would mainly tell us: which paid plugins he's running (cost optimization), backend form data, full media library, and the GA4 property ID buried in Site Kit settings.

---

## Items NOT in this email (parked for follow-up)

These were drafted but cut from the initial send to keep the cognitive load down. Will roll into a follow-up email once Peter responds to #1-5.

- Friday calls decision (keep doing them or AI-drafted follow-ups?)
- Notification of Good Online Marketing (his current WP agency)
- Label the 5 unidentified client logos on the homepage
- "3 Outbound Recruiting Pro Tips" PDF — does it still exist?
- TN vs CA operating location verify (Ryan confirmed: TN, no need to ask)
- Bo vs Peter clarifier (dropped — was a placeholder in the original handoff, no real ambiguity)
- Anthropic PII enterprise terms (default-yes is fine)
