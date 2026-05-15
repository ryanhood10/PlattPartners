# DNS Cutover Runbook

How to flip plattpartners.com from Flywheel WordPress to our Heroku Next.js app without dropping any traffic or SEO.

**Owner:** `devops` agent + `marketing-site-mgr`
**Status (2026-05-14):** Not yet executed. Blocked on Peter granting DNS access (ask #4 in `docs/peter-onboarding.md`) and Google Search Console access (ask #5).

**Confirmation:** This runbook changes a production domain. Ryan + Peter both sign off before executing.

---

## What "ready to cutover" looks like

All of these must be ✅ before the DNS flip:

- [x] Next.js app at https://platt-partners-3b59df8c6202.herokuapp.com renders every URL from plattpartners.com's Yoast sitemap (verify by clicking each)
- [x] 301 redirects in `next.config.js` cover every URL we changed (`/about-services` → `/about`, etc.)
- [x] sitemap.xml + robots.txt live on the Heroku URL with canonical URLs pointing to plattpartners.com
- [x] JSON-LD Schema.org markup on every public page
- [x] OG image + Twitter Card metadata on every page
- [ ] Vertical sub-pages match Peter's confirmed list (currently blocked — `docs/blockers.md` item #8)
- [ ] Canonical phone number + email decided (currently using 866-766-0188 + info@plattpartners.com everywhere)
- [ ] Ryan added to Peter's Google Search Console as Owner (ask #5)
- [ ] Peter granted DNS write access at his registrar (ask #4)
- [ ] Custom domain attached to Heroku app (step 3 below)
- [ ] `NEXTAUTH_URL` updated in Heroku to `https://plattpartners.com`

---

## Phase 1 — Prep (1-2 days before cutover)

### 1. Inventory current DNS

Ask Peter (or look up at his registrar):

```bash
# These tell you what we're replacing
dig plattpartners.com A
dig plattpartners.com AAAA
dig www.plattpartners.com CNAME
dig plattpartners.com MX
dig plattpartners.com TXT
```

Save the output to `docs/runbooks/dns-pre-cutover.md` as a snapshot. We'll diff against post-cutover.

### 2. Attach the custom domain on Heroku

```bash
# Tell Heroku to expect plattpartners.com traffic
heroku domains:add plattpartners.com -a platt-partners
heroku domains:add www.plattpartners.com -a platt-partners

# Enable automated TLS
heroku certs:auto:enable -a platt-partners

# Verify
heroku domains -a platt-partners
```

Heroku returns DNS target hostnames like `xxxxxx.herokudns.com`. Note both apex + www targets.

### 3. Update env vars for the new URL

```bash
heroku config:set \
  NEXTAUTH_URL=https://plattpartners.com \
  NEXT_PUBLIC_SITE_URL=https://plattpartners.com \
  -a platt-partners
```

Heroku restarts the dyno. Verify site still loads at the herokuapp URL (it should — `NEXT_PUBLIC_SITE_URL` only affects canonical/sitemap/OG URLs, which were already plattpartners.com).

### 4. Update the Entra app redirect URI

In Peter's Microsoft Entra admin center → App registrations → the Platt Partners app:

- Add redirect URI: `https://plattpartners.com/api/auth/callback/azure-ad`
- Add redirect URI: `https://www.plattpartners.com/api/auth/callback/azure-ad` (optional — depends on whether www redirects to apex or vice versa)
- Keep the existing herokuapp.com one for now as a fallback

### 5. Preserve the WP site as a rollback

Tell Peter's WP host (Flywheel) to keep the existing WordPress site running but move it to `wp.plattpartners.com`. This is our 30-day rollback window.

```bash
# Add a CNAME at the registrar pointing wp.plattpartners.com at the current Flywheel host
# (whatever the current `plattpartners.com` A record points at)
```

Add HTTP basic auth on the WP side so only Ryan and Peter can access wp.plattpartners.com during the rollback window — prevents Google indexing it twice.

---

## Phase 2 — Cutover (the actual flip)

### 6. Lower DNS TTLs the day before

At Peter's registrar, lower the TTL on the apex + www records to **300s (5 min)**. This is so the cutover propagates within minutes instead of hours.

Wait the current TTL period (often 1-4 hours) for the lowered TTL to take effect everywhere.

### 7. Flip the records

Replace the apex `A` record (currently pointing at Flywheel) with the Heroku target:

```
TYPE    NAME             VALUE                            TTL
CNAME   plattpartners.com   xxxxxx.herokudns.com          300
                            ^ (use ALIAS/ANAME if the registrar supports it,
                              otherwise the A record IPs Heroku returns)
CNAME   www              yyyyyy.herokudns.com             300
```

Some registrars don't allow CNAME at the apex. In that case:
- Use ALIAS / ANAME / Flattened CNAME if available (Cloudflare, DNSimple, Route53 all support this)
- OR use the A-record IPs Heroku returns from `heroku domains -a platt-partners` (less ideal — IPs can change)

### 8. Immediately verify

```bash
# Should resolve to Heroku-owned IP
dig +short plattpartners.com
dig +short www.plattpartners.com

# Should return your Next.js home page HTML (look for the `<title>` you set)
curl -sI https://plattpartners.com | head -5
curl -s https://plattpartners.com | grep -i "<title>"

# Should serve the Heroku-signed cert
curl -vI https://plattpartners.com 2>&1 | grep -i "subject\|issuer"
```

If `curl` succeeds but a browser shows the WP site → it's a TTL caching issue, give it another 5 minutes.

### 9. Smoke-test every URL

```bash
# All should return 200 (or 308 → 200 for the redirected URL)
for path in / /about /contact /technology /privacy-policy /how-to-build-a-robust-pipeline-of-qualified-candidates /sitemap.xml /robots.txt; do
  echo "$path → $(curl -s -o /dev/null -w '%{http_code}' https://plattpartners.com$path)"
done

# Redirect should hit /about
curl -s -o /dev/null -w '%{redirect_url}\n' https://plattpartners.com/about-services
```

### 10. Submit the sitemap to Search Console

In Google Search Console:

1. Confirm plattpartners.com property still verified (DNS verification persists across our cutover)
2. **Sitemaps** → submit `https://plattpartners.com/sitemap.xml`
3. **URL inspection** → run a Live Test on `/`, `/about`, `/technology` to confirm Google sees the new content (not the cached WP HTML)
4. Optional: **Removals** → no, do NOT request removal of any URLs. Let Google re-crawl naturally.

### 11. Restore higher DNS TTLs

Once cutover is confirmed stable (~2 hours after the flip), set TTLs back to **3600s (1 hour)**. Faster recovery if something goes wrong, lower DNS query load when steady-state.

---

## Phase 3 — Post-cutover monitoring (30 days)

### 12. Daily checks (first week)

```bash
# Heroku app health
curl -sI https://plattpartners.com/api/health | head -3

# Sitemap still good
curl -s https://plattpartners.com/sitemap.xml | head -10
```

In Search Console daily:
- **Coverage** — watch for sudden spikes in "Excluded" or "Not indexed"
- **Performance** — clicks and impressions; expect a small dip in the first 2 weeks as Google re-indexes, then recovery

### 13. Weekly checks (next 3 weeks)

- Core Web Vitals (Search Console → Page Experience) — should be GREEN across all pages (Next.js + SSR + image optimization gives us this for free)
- 404 logs in Heroku — `heroku logs -a platt-partners --source app | grep '" 404 '` weekly
- Any URLs returning 404 that used to be live → add a redirect rule in `next.config.js`

### 14. 30-day point: WP sunset

If everything is stable:

1. **Sunset wp.plattpartners.com** — tell Flywheel to spin down the WP site (or stop paying the bill)
2. Remove the wp.plattpartners.com CNAME from the registrar
3. Notify Good Online Marketing (Peter's WP agency) — see `docs/peter-onboarding.md` item #18
4. Archive their WP install elsewhere (a tarball in B2) before tearing it down

If anything is NOT stable, do NOT sunset WP yet. Investigate the regression first.

---

## Rollback (if needed within 30 days)

If we discover a critical issue post-cutover:

1. At the registrar, flip the apex back to the original Flywheel value (saved in `docs/runbooks/dns-pre-cutover.md`)
2. Within 5 minutes (since TTLs are low), traffic returns to WP
3. Remove the heroku domain attachment so it doesn't try to serve via certs that no longer match:
   ```bash
   heroku domains:remove plattpartners.com -a platt-partners
   heroku domains:remove www.plattpartners.com -a platt-partners
   ```
4. Reset `NEXTAUTH_URL` back to the herokuapp URL
5. Diagnose, fix, repeat the cutover from step 7 when ready

The longer we wait to rollback the worse the SEO transition — Google will have started seeing the new URLs. If we rollback after 2+ weeks of being on the new site, we'll see a temporary ranking dip on the way back, too.

---

## What can go wrong + mitigations

| Problem | Mitigation |
|---|---|
| TTLs not propagated; some users still hit WP | Wait. Don't tweak anything. 5-min TTL means it resolves within an hour worst-case. |
| Heroku TLS cert not issued yet | `heroku certs:auto -a platt-partners` shows status. Usually ready within 15 minutes of attaching domain. If stuck, run `heroku certs:auto:refresh`. |
| Some pages 404 that we forgot about | Add the URL to next.config.js `redirects()`. Deploy. Restart sees new redirects immediately. |
| Google indexes both URLs (old + new) | Self-resolves in 1-2 weeks; our `<link rel="canonical">` tags tell Google which is the real one. Don't request removal. |
| Form submissions failing | Check `MONGODB_URI` is set in Heroku Config Vars (see `docs/runbooks/atlas-setup.md`). If Atlas isn't connected, the form still returns success but doesn't persist — submissions visible in `heroku logs`. |
| Email auth (sign-in) failing for Peter | Confirm new redirect URI added to Entra app (step 4 in this runbook). Confirm `NEXTAUTH_URL` matches. |

---

## Communication template for Peter

After step 9 (smoke test passes):

> Hey Peter — the new plattpartners.com is live on our stack. Everything's been redirected from your old WP site. I'll be watching Search Console for the next 30 days to make sure SEO holds. Your old site is parked at wp.plattpartners.com as a fallback for the same window.
>
> Take a look around — let me know if you spot anything off, especially on mobile. Talk soon, Ryan.
