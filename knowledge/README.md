# /knowledge — the AI's source of truth

Everything the assistant knows about Peter's business lives here as markdown or JSON. Versioned in git. Edits are commits. Reverts are `git revert`.

## Layout

```
knowledge/
├── brand/                # Logos, colors, fonts, brand voice
│   └── assets/           # Image files (Cloudinary mirror or local)
├── wiki/                 # Hand-curated business knowledge — HIGHEST trust
│   ├── business-overview.md
│   ├── pricing-and-retainer.md
│   ├── brand-voice.md
│   ├── prescreen-questions/
│   ├── strategy/
│   └── corrections/      # Nightly-generated from assistant feedback thumbs-down
├── clients/              # One md per client contact (PII — gitignored except template)
├── placements/           # One md per placement (factual, structured)
├── candidates/           # Auto-generated, PII-heavy, gitignored
├── emails-voice-corpus/  # PII-scrubbed emails for voice training, gitignored
└── analytics-snapshots/  # Daily JSON snapshots, gitignored
```

## Trust levels

Every chunk embedded into Qdrant carries a `trust_level` (1–3):

| Level | Meaning | Source |
|---|---|---|
| 3 | Hand-curated, ground truth | `wiki/`, `placements/` |
| 2 | Auto-generated but verified | `candidates/`, `clients/` |
| 1 | Style/tone reference, not factual | `emails-voice-corpus/` |

The public widget retrieves only level ≥ 2 AND `internal_only=false`.

## Editing rules

- Markdown only for human-curated content (wiki, brand, placements)
- JSON for auto-generated content (candidates, analytics)
- Every file has frontmatter with: `title`, `tags`, `pii` (bool), `internal_only` (bool), `last_verified_date`
- Frontmatter parsed by `scripts/seed_knowledge.ts` and used as Qdrant metadata

## Re-indexing

Whenever a wiki file changes, the nightly indexer (`pi/workers/nightly_eval` or a dedicated `reindex` job) re-embeds the affected chunks. For immediate effect after a manual edit, run `pnpm seed-knowledge` from the repo root.

## What to never put here

- Active candidate emails / phones (those go in Mongo, not the wiki)
- Anything labeled "confidential" by a client without their permission
- API keys (obviously)
