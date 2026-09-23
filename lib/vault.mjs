/**
 * Build-time crypto. The browser half lives in src/components/Vault.astro.
 *
 * The public page must not admit that a private version exists, which rules out
 * the usual shape of marking private fields in place. So the build renders each
 * page twice and encrypts the whole private body as one bundle:
 *
 *   recipientKey K   32 random bytes, one per person, only ever in their link
 *   bundleId         HKDF(K, salt=pagePath, info="cv/id/v1")   → the filename
 *   bundleKey        HKDF(K, salt=pagePath, info="cv/body/v1") → AES-256-GCM
 *
 * Deriving the filename from the key means the bundle cannot be found by
 * guessing, and because the derivation is one-way, knowing a filename does not
 * yield the key. Nothing in the published HTML points at it: a visitor without
 * a key makes no request for it at all.
 *
 * Per-recipient bundles duplicate the ciphertext once per person, which is a
 * few tens of kB each and buys real revocation — deleting one recipient removes
 * exactly their file on the next build, with no effect on anyone else's.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export const KEYS_FILE = '.keys/keys.json';
export const BUNDLE_DIR = '_a';
const KEY_BYTES = 32;

export function b64u(buf) {
  return Buffer.from(buf).toString('base64url');
}

export function unb64u(str) {
  return Buffer.from(str, 'base64url');
}

function derive(key, pagePath, info, bytes) {
  return Buffer.from(
    crypto.hkdfSync('sha256', key, Buffer.from(pagePath, 'utf8'), Buffer.from(info, 'utf8'), bytes),
  );
}

/** Page paths are salts, so they must match `location.pathname` exactly. */
export function normalizePath(p) {
  return p.endsWith('/') ? p : `${p}/`;
}

export const bundleId = (key, pagePath) => b64u(derive(key, pagePath, 'cv/id/v1', 16));
export const bundleKey = (key, pagePath) => derive(key, pagePath, 'cv/body/v1', 32);

/** AES-256-GCM, tag appended to the ciphertext to match WebCrypto. */
export function seal(key, plaintext, aad) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  c.setAAD(Buffer.from(aad, 'utf8'));
  const body = Buffer.concat([c.update(plaintext), c.final()]);
  return { iv: b64u(iv), ct: b64u(Buffer.concat([body, c.getAuthTag()])) };
}

export function loadKeys(root = process.cwd()) {
  const file = path.join(root, KEYS_FILE);
  if (!fs.existsSync(file)) return null;
  const keys = JSON.parse(fs.readFileSync(file, 'utf8'));
  keys.recipients ??= [];
  return keys;
}

export function saveKeys(keys, root = process.cwd()) {
  const file = path.join(root, KEYS_FILE);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(keys, null, 2) + '\n', { mode: 0o600 });
  return file;
}

/** Creates the key file on first build so `npm run build` works out of the box. */
export function loadOrCreateKeys(root = process.cwd()) {
  const existing = loadKeys(root);
  if (existing) return { keys: existing, created: false };
  const keys = { recipients: [newRecipient('demo', 'created automatically on first build')] };
  saveKeys(keys, root);
  return { keys, created: true };
}

export function newRecipient(id, note = '') {
  return {
    id,
    note,
    key: b64u(crypto.randomBytes(KEY_BYTES)),
    added: new Date().toISOString().slice(0, 10),
  };
}

export function unlockLink(site, recipient, pagePath = '/') {
  const base = (site || 'http://localhost:4321').replace(/\/$/, '');
  return `${base}${pagePath}#k=${recipient.key}`;
}
