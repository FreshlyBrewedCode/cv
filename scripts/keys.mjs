#!/usr/bin/env node
/**
 * Recipient key management.
 *
 *   npm run keys                    list recipients and their links
 *   npm run keys -- add acme-hr "phone screen, Feb"
 *   npm run keys -- revoke acme-hr
 *
 * Each recipient has their own bundle on disk, so revoking deletes exactly
 * their file on the next build and leaves everyone else's link working. It
 * cannot reach content they already downloaded.
 */
import { loadOrCreateKeys, saveKeys, newRecipient, unlockLink, KEYS_FILE } from '../lib/vault.mjs';
import { pages } from './locales.mjs';

const site = process.env.CV_SITE;
const [cmd = 'list', id, ...rest] = process.argv.slice(2);
const { keys, created } = loadOrCreateKeys();
if (created) console.log(`created ${KEYS_FILE}\n`);

function show(r) {
  console.log(`${r.id}  (added ${r.added})${r.note ? `  — ${r.note}` : ''}`);
  for (const { lang, url } of pages) console.log(`  ${lang}  ${unlockLink(site, r, url)}`);
  console.log('');
}

switch (cmd) {
  case 'list':
    if (!keys.recipients.length) {
      console.log('No recipients. Add one with: npm run keys -- add <id>');
      break;
    }
    keys.recipients.forEach(show);
    break;

  case 'add': {
    if (!id) {
      console.error('Usage: npm run keys -- add <id> ["note"]');
      process.exit(1);
    }
    if (keys.recipients.some((r) => r.id === id)) {
      console.error(`Recipient "${id}" already exists.`);
      process.exit(1);
    }
    const r = newRecipient(id, rest.join(' '));
    keys.recipients.push(r);
    saveKeys(keys);
    console.log(`Added "${id}". Rebuild and deploy, then send one of:\n`);
    show(r);
    break;
  }

  case 'revoke': {
    const before = keys.recipients.length;
    keys.recipients = keys.recipients.filter((r) => r.id !== id);
    if (keys.recipients.length === before) {
      console.error(`No recipient named "${id}".`);
      process.exit(1);
    }
    saveKeys(keys);
    console.log(`Revoked "${id}". Their bundle disappears on the next build and deploy.`);
    console.log('Anyone visiting that link then sees the ordinary public page, with no error.');
    console.log('It does not affect content they already downloaded.');
    break;
  }

  default:
    console.error(`Unknown command "${cmd}". Try: list, add, revoke`);
    process.exit(1);
}
