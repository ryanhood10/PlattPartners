# emails-voice-corpus

PII-scrubbed sample emails from Peter that the AI uses to learn his voice.

## ⚠️ Never commit raw emails

Everything in this folder is `.gitignore`d except this README. Process every email through `scripts/scrub_voice_corpus.ts` before saving here:

```bash
pnpm tsx scripts/scrub_voice_corpus.ts /path/to/raw/email.eml > knowledge/emails-voice-corpus/{slug}.md
```

The scrubber:
1. Replaces names with `<REDACTED_NAME>`
2. Replaces emails / phones / addresses with `<REDACTED_*>`
3. Drops headers
4. Writes a clean markdown file with frontmatter

## Frontmatter format

```yaml
---
date: 2025-07-15
context: cold outreach to a Director of DevOps candidate
length: 142 words
tone: warm-direct
purpose: schedule prescreen
---
```

## Indexing

The `emails_voice` Qdrant collection embeds these for voice-modeling retrieval. **Never** retrieve from this collection to answer factual questions — only as style examples passed to the drafting prompt.

## Trust level

These get `trust_level: 1` because the content is voice-only. Anti-hallucination rules forbid the assistant from citing them as factual sources.
