# Heroku Deploy Runbook

How to push, debug, and roll back the Heroku app for Platt Partners.

---

## App identity

- **App name:** `platt-partners`
- **Production URL:** https://platt-partners-3b59df8c6202.herokuapp.com (until DNS cutover to plattpartners.com)
- **Region:** US
- **Stack:** heroku-24
- **Buildpack:** heroku/nodejs
- **Dyno:** Basic (web), single instance, does not sleep
- **Git remote:** `heroku` → https://git.heroku.com/platt-partners.git

---

## First-time setup (already done 2026-05-14)

```bash
heroku create platt-partners --region us --stack heroku-24
heroku config:set NODE_ENV=production \
  NEXTAUTH_URL=https://platt-partners-3b59df8c6202.herokuapp.com \
  NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
  JOB_RUNNER_SECRET="$(openssl rand -hex 32)" \
  -a platt-partners
git push heroku main
```

---

## Regular deploy

```bash
# From local main:
git push heroku main

# From any branch:
git push heroku <branch>:main
```

Heroku auto-runs `npm install`, `npm run build`, prunes devDependencies, then `npm run start` per `Procfile`. ~90s for an incremental build, ~2-3 min cold.

---

## Config vars (current)

Set by `heroku config:set KEY=value -a platt-partners`. Verify with `heroku config -a platt-partners`.

Currently set:
- `NODE_ENV` = production
- `NEXTAUTH_URL` = https://platt-partners-3b59df8c6202.herokuapp.com
- `NEXTAUTH_SECRET` = (32-byte base64)
- `JOB_RUNNER_SECRET` = (32-byte hex)

Still to be set (when each integration comes online):
- `MONGODB_URI` — once Atlas cluster created
- `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET` — once Peter grants Entra registration
- `ANTHROPIC_API_KEY` — when AI features start landing
- `APOLLO_API_KEY` — Phase 2
- `VOYAGE_API_KEY` — Phase 4
- `GEMINI_API_KEY` — Phase 4
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — Phase 4 (public widget)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Phase 1
- `SLACK_WEBHOOK_URL` — Phase 3
- `B2_*` — Phase 6 (nightly backups)
- `GA4_PROPERTY_ID`, `GOOGLE_OAUTH_*` — Phase 6
- `NEXT_PUBLIC_GA_ID` — once GA4 property created

See `.env.example` for the full inventory.

---

## Custom domain (deferred until Peter's DNS access lands)

When ready:

```bash
heroku domains:add plattpartners.com -a platt-partners
heroku domains:add www.plattpartners.com -a platt-partners
heroku certs:auto:enable -a platt-partners

# Then update DNS at the registrar:
# - A or ALIAS record at apex → Heroku DNS target (from `heroku domains -a platt-partners`)
# - CNAME www → Heroku DNS target
```

Update `NEXTAUTH_URL` once the custom domain is live:

```bash
heroku config:set NEXTAUTH_URL=https://plattpartners.com -a platt-partners
```

And tell Entra (Microsoft) about the new redirect URI: `https://plattpartners.com/api/auth/callback/azure-ad`.

---

## Logs + debugging

```bash
# Live tail:
heroku logs --tail -a platt-partners

# Last 500 lines:
heroku logs -n 500 -a platt-partners

# Just the dyno (no router noise):
heroku logs --tail --source app -a platt-partners
```

The app uses pino structured JSON; pipe to `| jq` for filtering.

---

## Roll back a bad deploy

```bash
heroku releases -a platt-partners
heroku rollback v<N> -a platt-partners
```

Heroku keeps the last ~50 releases.

---

## Restart

```bash
heroku restart -a platt-partners
```

---

## Health check

```bash
curl https://platt-partners-3b59df8c6202.herokuapp.com/api/health
# → {"ok":true,"data":{"version":"0.0.1","env":"production","ts":"..."}}
```

---

## Common build failures + fixes

- **"Cannot find module '@/lib/..."** — tsconfig paths missing or buildpack not respecting `paths`. Confirm `next.config.js` is at the repo root and tsconfig has the `paths` block.
- **"NEXTAUTH_SECRET is not set"** — set it via `heroku config:set` before pushing again.
- **OOM at build** — Tailwind/Next.js can spike memory. Upgrade to Standard-1X temporarily, build, downgrade back to Basic.
- **Slug too large (>300MB)** — review `.slugignore`. We use `.gitignore` which Heroku respects by default; `_research/` and `handoff/` are already ignored at the git level.
