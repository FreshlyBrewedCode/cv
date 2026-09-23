import { defineConfig } from 'astro/config';
import { existsSync, readFileSync } from 'node:fs';
import encryptVault from './integrations/encrypt-vault.mjs';

/*
  Vite rejects requests whose Host header it does not recognise, which blocks
  reaching `astro dev` or `astro preview` by hostname from another machine — a
  tailnet name, a LAN name, a tunnel. Raw IPs skip the check, so the failure
  looks inconsistent: curl to the IP works while the browser gets "Blocked
  request". Affects local serving only; nothing here reaches the built site.

  This has to be Astro's own `server.allowedHosts`, not `vite.preview
  .allowedHosts`. Astro's static preview calls Vite with `configFile: false`
  and copies only `config.server.*` across, so the Vite-level option — the one
  the error message tells you to set — is silently ignored.

  A leading dot matches subdomains, so `.ts.net` covers a whole tailnet.
*/
const allowedHosts = (process.env.CV_ALLOWED_HOSTS ?? '.ts.net,.local')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

/*
  `npm run cert` issues a Tailscale-trusted cert for this machine's tailnet
  hostname into .certs/. Dev server picks it up automatically when present;
  without it, `astro dev` just falls back to plain HTTP.
*/
const certFile = process.env.CV_HTTPS_CERT ?? '.certs/dev.crt';
const keyFile = process.env.CV_HTTPS_KEY ?? '.certs/dev.key';
const https =
  existsSync(certFile) && existsSync(keyFile)
    ? { cert: readFileSync(certFile), key: readFileSync(keyFile) }
    : undefined;

export default defineConfig({
  site: process.env.CV_SITE ?? 'http://localhost:4321',
  /* GitHub Pages serves a project repo from /<repo>/. The bundle path is salted
     with the page path, so the base has to be right at build time or no link
     resolves once deployed. */
  base: process.env.CV_BASE || '/',
  integrations: [encryptVault()],
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  server: { allowedHosts, port: 4324 },
  /* HTTPS is a Vite-only server option — Astro's own `server` config has no
     `https` field, so this has to live here even though `allowedHosts` above
     can't (see note on `allowedHosts`). Only affects `astro dev`. */
  vite: { server: { https } },
});
