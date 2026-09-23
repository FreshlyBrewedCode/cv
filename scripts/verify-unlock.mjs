#!/usr/bin/env node
/**
 * Acts as a recipient against the built site: derives each page's bundle name
 * from a key, fetches it off disk, decrypts, and checks the private values come
 * back — then checks a wrong key gets nothing.
 *
 * Uses WebCrypto rather than node:crypto on purpose. It exercises the same API
 * the browser runs, so a mismatch in HKDF inputs, IV placement, tag handling or
 * additional data shows up here instead of in someone's browser.
 *
 *   node scripts/verify-unlock.mjs            # first recipient in .keys
 *   node scripts/verify-unlock.mjs <key>
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadKeys, BUNDLE_DIR } from '../lib/vault.mjs';
import { pages } from './locales.mjs';

const DIST = 'dist';
const enc = new TextEncoder();
const dec = new TextDecoder();

const fail = (msg) => {
  console.error(`FAIL — ${msg}`);
  process.exit(1);
};

const raw = (b64url) => Buffer.from(b64url, 'base64url');
const toUrl = (bytes) => Buffer.from(bytes).toString('base64url');

async function bits(material, salt, info, length) {
  const base = await crypto.subtle.importKey('raw', material, 'HKDF', false, ['deriveBits']);
  return new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: 'HKDF', hash: 'SHA-256', salt: enc.encode(salt), info: enc.encode(info) },
      base,
      length * 8,
    ),
  );
}

async function open(material, pagePath) {
  const id = toUrl(await bits(material, pagePath, 'cv/id/v1', 16));
  const file = path.join(DIST, BUNDLE_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return null;

  const { iv, ct } = JSON.parse(fs.readFileSync(file, 'utf8'));
  const key = await crypto.subtle.importKey(
    'raw',
    await bits(material, pagePath, 'cv/body/v1', 32),
    'AES-GCM',
    false,
    ['decrypt'],
  );
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: raw(iv), additionalData: enc.encode(pagePath) },
    key,
    raw(ct),
  );
  return dec.decode(plain);
}

const given = process.argv[2];
const keys = loadKeys();
if (!given && !keys?.recipients?.length) fail('no key given and no recipients in .keys/keys.json');
const material = raw(given ?? keys.recipients[0].key);

const privSource = fs.existsSync('private/private.json')
  ? 'private/private.json'
  : 'private/private.example.json';
const priv = JSON.parse(fs.readFileSync(privSource, 'utf8'));

for (const { lang, url, dist } of pages) {
  const html = await open(material, url);
  if (!html) fail(`no bundle for ${url} — did the build run, with the same CV_BASE?`);

  const expect = [
    priv.email,
    priv.phone,
    priv.employer.name,
    priv.address.street,
    priv.availability[lang],
    priv.compensation[lang],
    priv.references[0].name,
  ];
  const missing = expect.filter((value) => !html.includes(value));
  if (missing.length) fail(`${url} decrypted but is missing: ${missing.join(' | ')}`);

  /* The public page for the same path must contain none of it. */
  const publicHtml = fs.readFileSync(path.join(DIST, dist, 'index.html'), 'utf8');
  const leaked = expect.filter((value) => publicHtml.includes(value));
  if (leaked.length) fail(`${url} public page contains: ${leaked.join(' | ')}`);

  console.log(`verify: ${url} decrypted, ${expect.length} private values recovered`);
}

/* A wrong key must not resolve to any bundle that exists. */
const wrong = crypto.getRandomValues(new Uint8Array(32));
for (const { url } of pages) {
  if (await open(wrong, url)) fail('a random key found a bundle');
}

/* A bundle is bound to its page path, so the wrong salt must not open it. */
try {
  const id = toUrl(await bits(material, pages[0].url, 'cv/id/v1', 16));
  const { iv, ct } = JSON.parse(fs.readFileSync(path.join(DIST, BUNDLE_DIR, `${id}.json`), 'utf8'));
  const key = await crypto.subtle.importKey(
    'raw',
    await bits(material, pages[0].url, 'cv/body/v1', 32),
    'AES-GCM',
    false,
    ['decrypt'],
  );
  await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: raw(iv), additionalData: enc.encode(pages[1].url) },
    key,
    raw(ct),
  );
  fail('a bundle decrypted under the wrong page path');
} catch (err) {
  if (err?.message?.startsWith?.('FAIL')) throw err;
}

console.log('verify: a random key finds nothing, and bundles are bound to their page path');
