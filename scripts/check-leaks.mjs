#!/usr/bin/env node
/**
 * The realistic failure of this scheme is not broken AES. It is a private value
 * escaping into something the build serves in the clear: an og:description, a
 * sitemap, an alt attribute, a leftover template, a console.log.
 *
 * So: take every leaf string in the private data and grep the whole build for
 * it. Encrypted bundles are ciphertext and cannot match, which means a hit is
 * always a real leak. Runs as part of `npm run build` and fails it.
 *
 * It also checks the second promise the public pages make — that they carry no
 * sign a private version exists.
 */
import fs from 'node:fs';
import path from 'node:path';
import { BUNDLE_DIR } from '../lib/vault.mjs';

const DIST = 'dist';
const MIN_LENGTH = 6;

function leaves(value, at = '$', out = []) {
  if (typeof value === 'string') {
    if (value.length >= MIN_LENGTH) out.push({ at, value });
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => leaves(v, `${at}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) leaves(v, `${at}.${k}`, out);
  }
  return out;
}

function files(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files(full, out);
    else out.push(full);
  }
  return out;
}

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const source = fs.existsSync('private/private.json')
  ? 'private/private.json'
  : 'private/private.example.json';

/**
 * Some private values are substrings of legitimately public ones — a country
 * name inside a city line, a surname inside a repository name. List those here
 * so the check stays loud about everything else instead of being switched off.
 */
const ALLOW = 'private/leak-allow.json';
const allowed = new Set(fs.existsSync(ALLOW) ? JSON.parse(fs.readFileSync(ALLOW, 'utf8')) : []);

if (!fs.existsSync(DIST)) {
  console.error(`${DIST}/ not found — run the build first.`);
  process.exit(1);
}

const secrets = leaves(JSON.parse(fs.readFileSync(source, 'utf8'))).filter(
  (s) => !allowed.has(s.value),
);
const built = files(DIST);
const hits = [];

for (const file of built) {
  const utf8 = fs.readFileSync(file, 'utf8');
  const bytes = fs.readFileSync(file, 'latin1');
  for (const secret of secrets) {
    const needles = [secret.value, escape(secret.value)];
    if (needles.some((n) => utf8.includes(n) || bytes.includes(n))) {
      hits.push({ file: path.relative('.', file), at: secret.at, value: secret.value });
    }
  }
}

/*
 * The public pages must not hint that a private version exists.
 *
 * Script bodies are excluded from the path check on purpose: the fetch path has
 * to exist somewhere in the client code, and no amount of renaming changes
 * that. What is checkable — and what actually matters — is that nothing in the
 * *markup* points at it: no link, no preload, no leftover attribute, nothing a
 * crawler or a reader of the rendered page would ever see.
 */
const tells = [];
for (const file of built.filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '<script></script>');
  const rel = path.relative('.', file);
  if (html.includes('data-vault')) tells.push(`${rel}: the private template was not removed`);
  if (new RegExp(`${BUNDLE_DIR}/`).test(markup)) {
    tells.push(`${rel}: markup references the bundle directory`);
  }
  if (/\bdata-(secret|sid|locked)\b/.test(html)) tells.push(`${rel}: carries a redaction marker`);
}

console.log(
  `leak check: ${secrets.length} private strings vs ${built.length} built files (${source})` +
    (allowed.size ? `, ${allowed.size} allowed` : ''),
);

if (hits.length || tells.length) {
  if (hits.length) {
    console.error(`\nFAIL — private data is readable in the build:\n`);
    for (const h of hits) console.error(`  ${h.file}\n    ${h.at} = ${JSON.stringify(h.value)}`);
  }
  if (tells.length) {
    console.error(`\nFAIL — a public page gives the private version away:\n`);
    for (const t of tells) console.error(`  ${t}`);
  }
  console.error('');
  process.exit(1);
}

console.log('leak check: clean, and no public page references the private version\n');
