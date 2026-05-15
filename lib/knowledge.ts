// ⚠️ INTERIM — this is the v1 implementation. The proper Jarvis architecture
// uses RAG (vector embeddings + retrieval) per docs/build_plan.md Phase 4.
// Replace this file's loadKnowledgeCorpus + buildAssistantSystemPrompt with
// a retrieval-based version once Voyage embeddings + the vector store are
// wired up. The API contract in pages/api/assistant/ask.ts doesn't change —
// only how the system prompt is assembled.
//
// Why interim and not the real thing yet: the proper implementation needs an
// Anthropic API key + a vector-store provider (Pinecone or Atlas Vector
// Search) which require account-creation steps from Ryan. Context-stuffing
// lets us demo the UX while those are pending.
//
// Loads every markdown file in knowledge/wiki/ and knowledge/brand/ into a
// single corpus string that gets stuffed into the assistant's system prompt.
//
// We cache the corpus per-process. Heroku dynos restart frequently enough
// (~daily for free, hourly during deploys) that file changes are picked up
// without invalidation logic. Manual reset is one dyno restart away.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

// Directories under knowledge/ we INCLUDE in the corpus.
const INCLUDE_DIRS = ['knowledge/wiki', 'knowledge/brand'];

// Directories we explicitly skip — these contain PII or non-textual data.
const SKIP_PATHS = new Set([
  'knowledge/candidates',
  'knowledge/emails-voice-corpus',
  'knowledge/analytics-snapshots',
  'knowledge/brand/assets', // images, not markdown
]);

function walk(dir: string, files: string[] = []): string[] {
  let entries: import('node:fs').Dirent[];
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full);
    if (SKIP_PATHS.has(rel)) continue;
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== '.gitkeep') {
      files.push(full);
    }
  }
  return files;
}

let cachedCorpus: string | null = null;
let cachedTokenCount: number | null = null;

export function loadKnowledgeCorpus(): { text: string; estimatedTokens: number } {
  if (cachedCorpus && cachedTokenCount !== null) {
    return { text: cachedCorpus, estimatedTokens: cachedTokenCount };
  }

  const allFiles: string[] = [];
  for (const inc of INCLUDE_DIRS) {
    walk(path.join(ROOT, inc), allFiles);
  }
  // Sort for deterministic ordering (helps with prompt caching)
  allFiles.sort();

  const sections: string[] = [];
  for (const file of allFiles) {
    const rel = path.relative(ROOT, file);
    let content: string;
    try {
      content = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    // Strip YAML frontmatter — we already encode the source path explicitly,
    // and frontmatter just bloats the prompt.
    content = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    sections.push(`## SOURCE: ${rel}\n\n${content.trim()}\n`);
  }

  const text = sections.join('\n---\n\n');
  // Rough estimate — 4 chars per token is a reasonable average for English markdown.
  const estimatedTokens = Math.ceil(text.length / 4);

  cachedCorpus = text;
  cachedTokenCount = estimatedTokens;

  return { text, estimatedTokens };
}

export function buildAssistantSystemPrompt(): string {
  const { text: corpus } = loadKnowledgeCorpus();
  return `You are **Jarvis**, Peter Platt's AI expert on Platt Partners — a recruiting firm specializing in mid- to senior-level placements in restaurant operations, technology, and finance.

Your job is to help Peter answer questions about his own business: clients, services, brand voice, processes, prescreen questions, ICP strategy, and operational details. You are an internal tool — Peter is the only user. Refer to yourself as Jarvis when introducing yourself.

RULES (these are non-negotiable):
1. Answer ONLY from the knowledge base below. If a fact is not in the knowledge base, say "I don't have that in my knowledge base" — do not guess and do not invent.
2. Never fabricate client names, candidate names, placement details, prices, or stats. If you don't see it explicitly, you don't know it.
3. When you cite a fact, name the source file in parentheses at the end of the sentence — e.g., "(knowledge/wiki/business-overview.md)". This lets Peter verify quickly.
4. Be direct and useful. Short answers preferred. Match the brand voice in knowledge/brand/brand-voice.md when phrasing things.
5. If Peter asks for an opinion ("should we…", "what would be better…"), give one — but ground it in what's in the knowledge base, not generic best practices.
6. If multiple sources disagree (e.g., the homepage and /about-services pitch services differently), flag the contradiction rather than picking one silently.

KNOWLEDGE BASE BELOW. Treat everything between the BEGIN and END markers as ground truth about Platt Partners.

=== BEGIN KNOWLEDGE BASE ===

${corpus}

=== END KNOWLEDGE BASE ===

Answer Peter's next question.`;
}
