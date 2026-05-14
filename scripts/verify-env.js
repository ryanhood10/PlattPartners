#!/usr/bin/env node
// Verify that required env vars are present + that no committed source file contains
// what looks like a hardcoded secret. Run before every commit (see CLAUDE.md).

const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_IN_PROD = ['MONGODB_URI', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL'];

const SECRET_PATTERNS = [
  /sk-[a-zA-Z0-9]{20,}/,                  // generic / OpenAI / Anthropic-ish
  /sk-ant-[a-zA-Z0-9-]{20,}/,
  /AIza[0-9A-Za-z\-_]{35}/,                // Google API keys
  /xox[baprs]-[a-zA-Z0-9-]{10,}/,          // Slack tokens
  /[a-f0-9]{32,}/,                          // overly long hex (catches some keys; tunable)
];

// Skip files that legitimately contain example/placeholder values
const SKIP_FILES = [
  '.env.example',
  'scripts/verify-env.js',
  'package-lock.json',
  'docs/security.md',
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git', '_research', 'handoff'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

let problems = 0;

// 1. Check required prod env vars
if (process.env.NODE_ENV === 'production') {
  for (const key of REQUIRED_IN_PROD) {
    if (!process.env[key]) {
      console.error(`✗ Missing required env var: ${key}`);
      problems++;
    }
  }
}

// 2. Scan source files for suspected secrets
const root = process.cwd();
const files = walk(root).filter(
  (f) =>
    (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.json')) &&
    !SKIP_FILES.some((skip) => f.endsWith(skip))
);

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  for (const pat of SECRET_PATTERNS) {
    const m = content.match(pat);
    if (m) {
      console.error(`✗ Possible secret in ${path.relative(root, f)}: ${m[0].slice(0, 12)}…`);
      problems++;
    }
  }
}

if (problems > 0) {
  console.error(`\n${problems} verify-env problem(s). Fix before committing.`);
  process.exit(1);
}

console.log('✓ verify-env passed');
