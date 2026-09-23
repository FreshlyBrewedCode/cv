#!/usr/bin/env node
// Issues a Tailscale-trusted HTTPS cert for this machine's tailnet hostname
// into .certs/, for `npm run dev` to pick up. Re-run when the cert expires
// (Tailscale issues ~90-day certs) or after moving to a new machine.
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const status = JSON.parse(execFileSync('tailscale', ['status', '--json']));
const hostname = status.Self.DNSName.replace(/\.$/, '');

mkdirSync('.certs', { recursive: true });
execFileSync(
  'tailscale',
  ['cert', '--cert-file', '.certs/dev.crt', '--key-file', '.certs/dev.key', hostname],
  { stdio: 'inherit' },
);

console.log(`\nCert issued. Run the dev server and open https://${hostname}:4324`);
