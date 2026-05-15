# MongoDB Atlas Setup Runbook

How to create the Atlas cluster Platt Partners runs on, get the connection URI, and wire it into Heroku.

**Owner:** `devops` agent
**Status (2026-05-14):** Not yet executed. Mongoose models in `models/*.ts` are ready; `lib/db.ts` is configured; the moment `MONGODB_URI` is set in Heroku Config Vars, persistence starts working.

**Confirmation:** This runbook touches Ryan's MongoDB Atlas account and creates billable (free-tier today, but card on file) resources. Confirm with Ryan before executing.

---

## Why we picked Atlas

Decided in `docs/decisions.md` 2026-05-14. Short version: MongoDB everywhere on Ryan's other projects, free M0 tier covers Peter's volume for years, Mongoose schema already aligned. No Postgres or alternative considered.

---

## Cluster sizing

| Tier | RAM | Storage | $/mo | Use it when |
|---|---|---|---|---|
| **M0 (Sandbox)** | Shared | 512MB | **$0** | v1 — Peter's volume fits comfortably |
| M2 (Dedicated) | 2GB | 2GB | $9 | Hits >400MB or vector search w/ embeddings |
| M10 | 8GB | 10GB | $57 | Real production scale |

Start with M0. Upgrade is a one-click resize with no downtime when we hit limits.

---

## Steps

### 1. Create the Atlas account + organization

Skip if Ryan already has an Atlas account.

1. https://cloud.mongodb.com → Sign up with `ryan@eldrin.ai`
2. Create an Organization named `Eldrin` (or whatever convention Ryan uses across projects)
3. Inside the org, create a Project named `Platt Partners`

### 2. Create the cluster

1. In the project: **Build a Database** → **M0 Free**
2. Provider: **AWS**, Region: `us-east-1` (closest to Heroku's us-east-1)
3. Cluster name: `platt-partners-cluster` (or just `Cluster0` — doesn't matter, never appears in user-facing strings)
4. Click **Create**. Provisioning takes ~3 minutes.

### 3. Create the database user

Atlas requires a separate username/password for connection (not your Atlas login).

1. **Security** → **Database Access** → **Add New Database User**
2. Authentication Method: **Password**
3. Username: `platt-app`
4. Password: **Autogenerate Secure Password** → copy it to a password manager
5. Built-in Role: **Atlas admin** (for now — narrow later if we add other users)
6. Click **Add User**

### 4. Network access

Heroku dyno IPs are dynamic; the simple answer is to allow all IPs, relying on the username/password and TLS for security.

1. **Security** → **Network Access** → **Add IP Address**
2. Choose **ALLOW ACCESS FROM ANYWHERE** (`0.0.0.0/0`)
3. Comment: `Heroku app — dynamic IPs`
4. Click **Confirm**

If we ever upgrade to dedicated Heroku Private Spaces, replace this with the static egress IPs. Not necessary now.

### 5. Get the connection string

1. **Database** → **Clusters** → on your cluster, click **Connect**
2. Choose **Drivers** → **Node.js** (any recent version)
3. Copy the URI. It looks like:
   ```
   mongodb+srv://platt-app:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with the actual password from step 3
5. Add the database name as a path segment: `…mongodb.net/platt_partners?retryWrites=true...`

### 6. Verify locally first

Drop the URI into a temporary `.env.local`:

```bash
echo 'MONGODB_URI="mongodb+srv://platt-app:<password>@cluster0.xxxxx.mongodb.net/platt_partners?retryWrites=true&w=majority"' >> .env.local
echo 'MONGODB_DB_NAME=platt_partners' >> .env.local

npm run dev
```

Then in another terminal:

```bash
curl -X POST http://localhost:3000/api/public/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"","message":"hello atlas"}'
```

Expected: `{"ok":true,"data":{"received":true}}`. Then check the Atlas UI — `platt_partners` database → `contacts` collection should have one document.

### 7. Set it in Heroku

```bash
heroku config:set \
  MONGODB_URI='mongodb+srv://platt-app:<password>@cluster0.xxxxx.mongodb.net/platt_partners?retryWrites=true&w=majority' \
  MONGODB_DB_NAME=platt_partners \
  -a platt-partners
```

Heroku will restart the dyno. The contact form on the live site now persists to Atlas.

### 8. Smoke test in production

```bash
curl -X POST https://platt-partners-3b59df8c6202.herokuapp.com/api/public/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Prod Smoke","email":"smoke@example.com","phone":"","message":"hello prod atlas"}'
```

Then check Atlas. Done.

---

## What this unlocks

Once `MONGODB_URI` is set in Heroku:

- ✅ `/api/public/contact` persists submissions to the `contacts` collection
- ✅ All 8 dashboard pages can swap from `lib/mock.ts` fixtures to live queries
- ✅ `lib/db.ts.connectMongo()` works from any route handler
- ✅ `requireAuth()` can pull the user record from `users` to populate `session.user.id`
- ✅ Phase 2 sourcing pipeline can write candidates
- ✅ Phase 3 outreach engine can write drafts
- ✅ Phase 4 assistant can write `assistant_logs`

Until then everything that needs persistence falls back gracefully — no errors, just empty data + log messages.

---

## Backups

- Atlas M0 includes nothing — no automated backups, no point-in-time recovery
- Phase 6 ships nightly `mongodump` → Backblaze B2 via Heroku Scheduler
- Until then: live data is contact-form submissions, low stakes. Acceptable to run without backups for the first month.

---

## Common issues

**"connection timed out"** — Network Access not configured to allow 0.0.0.0/0 (see step 4)

**"authentication failed"** — Wrong password in the URI, or the user doesn't have the right role (step 3)

**"buffering timed out after 10000ms"** — Mongoose connected but lost the connection. Check Atlas dashboard for cluster status; M0 clusters can pause if idle for 60 days. Just wake it back up.

**"too many connections"** — Mongoose connection-pool default is 100 connections. Atlas M0 limit is 500. We shouldn't hit this — `lib/db.ts` caches the connection. If we do, audit for code that creates new clients per request.

---

## When to upgrade to M2

Watch for:
- DB storage approaching 400MB (Atlas dashboard graph)
- Sustained connection counts > 50
- Vector-search latency over 200ms (Phase 4)

Upgrade path: Atlas UI → cluster → Configuration → tier change. No downtime, ~5 min migration. Update Heroku Config Vars only if the connection string format changes.
