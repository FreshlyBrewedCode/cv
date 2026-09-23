/**
 * Astro integration: lift the private render out of each built page, encrypt it
 * once per recipient, and leave behind a public page with no trace of it.
 *
 * Each page renders its design twice — once public, once private — with the
 * private copy parked in `<template data-vault>`. This hook runs on
 * `astro:build:done`, so it operates on final HTML: it takes the template's
 * contents as the payload, writes the bundles, and deletes the template.
 *
 * Encrypting the whole body rather than marking individual fields is what makes
 * the public page honest-looking. Private sections simply do not exist in it,
 * and substituted values (the employer described instead of named) read as
 * ordinary prose rather than as something withheld.
 *
 * `astro dev` does not run this hook, so the template stays in the page and you
 * can inspect both renders while working on the design.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'node-html-parser';
import {
  loadKeys,
  loadOrCreateKeys,
  bundleId,
  bundleKey,
  normalizePath,
  seal,
  unb64u,
  unlockLink,
  BUNDLE_DIR,
  KEYS_FILE,
} from '../lib/vault.mjs';

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

export default function encryptVault() {
  /** Set from the resolved config; the salt has to include any deployed base. */
  let base = '/';

  return {
    name: 'cv:encrypt-vault',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = normalizePath(config.base || '/');
      },

      'astro:build:done': async ({ dir, logger }) => {
        const root = process.cwd();

        /*
          Minting keys on the fly is a convenience for a first local build and a
          hazard anywhere else: in CI it would silently publish bundles for a key
          nobody holds and kill every link already sent. `.keys/` is gitignored,
          so a checkout never has one — it has to come from a secret.
        */
        if (process.env.CI && !loadKeys(root)) {
          throw new Error(
            `${KEYS_FILE} is missing. Restore it from a secret before building, or every ` +
              `unlock link you have handed out stops working.`,
          );
        }

        const { keys, created } = loadOrCreateKeys(root);
        if (created) logger.warn(`no key file found, generated ${KEYS_FILE}`);
        if (!keys.recipients.length) {
          logger.warn('no recipients — the private version will not be published at all');
        }

        const distDir = dir.pathname;
        const outDir = path.join(distDir, BUNDLE_DIR);
        await fs.rm(outDir, { recursive: true, force: true });

        const pages = (await walk(distDir)).sort();
        const links = [];
        let bundles = 0;

        for (const file of pages) {
          const html = await fs.readFile(file, 'utf8');
          const doc = parse(html, { comment: true });
          const template = doc.querySelector('template[data-vault]');
          if (!template) continue;

          // `/index.html` → `/`, `/de/index.html` → `/de/`, matching pathname.
          const rel = path.relative(distDir, path.dirname(file)).split(path.sep).join('/');
          const pagePath = normalizePath(`${base}${rel ? `${rel}/` : ''}`);
          const payload = Buffer.from(template.innerHTML, 'utf8');

          for (const r of keys.recipients) {
            const key = unb64u(r.key);
            const id = bundleId(key, pagePath);
            const sealed = seal(bundleKey(key, pagePath), payload, pagePath);
            await fs.mkdir(outDir, { recursive: true });
            await fs.writeFile(path.join(outDir, `${id}.json`), JSON.stringify(sealed), 'utf8');
            bundles++;
            if (pagePath === base) links.push([r.id, unlockLink(process.env.CV_SITE, r, pagePath)]);
          }

          template.remove();
          await fs.writeFile(file, doc.toString(), 'utf8');
        }

        logger.info(
          `published ${bundles} bundle(s) for ${keys.recipients.length} recipient(s); public pages carry no reference to them`,
        );

        /*
          An unlock link contains the recipient's key in full. Build logs are
          durable and readable by anyone with access to the run, so print links
          only on an interactive build; `npm run keys` recovers them on demand.
        */
        if (process.env.CI) {
          logger.info('links withheld in CI — run `npm run keys` locally to read them');
        } else {
          for (const [id, link] of links) logger.info(`  ${id}: ${link}`);
        }
      },
    },
  };
}
