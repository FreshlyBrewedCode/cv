# CV with a private version behind a link

A static Astro site in English and German. The public page is a complete,
ordinary CV with nothing missing and nothing marked. Anyone arriving with a key
in their link sees a fuller version — real employer, contact details,
availability, rate, references — decrypted in their browser.

| Route   | Language |
| ------- | -------- |
| `/`     | English  |
| `/de/`  | German   |

## Running it

```sh
npm install
npm run build      # prints an unlock link per recipient, then runs the leak check
npm run preview
```

Open `http://localhost:4321/` with no fragment: an ordinary CV. Append the
`#k=…` fragment the build printed and the page fills out. The session carries
across the language switch.

```sh
npm run keys                          # list recipients and their links
npm run keys -- add acme-hr "phone screen, Feb"
npm run keys -- revoke acme-hr
npm run verify-unlock                 # decrypt the build as a recipient would
```

### HTTPS is not optional

Decryption uses WebCrypto, and `crypto.subtle` **only exists in a secure
context**. That means the site must be served over HTTPS, or from `localhost` —
browsers treat loopback as trustworthy, which is why the unlock works in local
testing and then does nothing at all over a plain-HTTP LAN or tailnet address.

Serving a preview to other devices over a tailnet:

```sh
npx astro preview --host 127.0.0.1 --port 4327 &
tailscale serve --bg --https=8443 http://127.0.0.1:4327
# https://<machine>.<tailnet>.ts.net:8443/   — real certificate, secure context
tailscale serve --https=8443 off             # to undo
```

### Printing

The printer button in the header calls `window.print()`. There is no separate
print route: the `@media print` block at the end of `src/styles/cv.css` is the
print version, so what the browser previews is what you get. It drops the
language switch, the print button itself, the session bar with its "show the
public version" control and the footer — none of which mean anything on paper —
then turns the sidebar into a three-column band of facts, because a 16rem rail
wastes a third of a portrait page.

Print spacing is set in millimetres, not rem. On paper `rem` still resolves
against the 16px screen root, which is arbitrary once there is a physical page —
and it was quietly making the printed sheet tighter than the site despite both
claiming the same numbers.

Whichever version is on screen is the one that prints. Unlock first if you want
the private one; it comes to three A4 pages, the last about half full. To get it
onto two, the levers in order of bluntness are the `.main` gap in the print
block, dropping `.quiet` detail lines from repository entries, and body size.

### When a link does nothing

Failures are silent *on the page* by design — an error would announce that a
private version exists. They are not silent in the console, which nothing
renders and no crawler reads. Open devtools and look for `cv <n>`:

| Code   | Meaning                                                        |
| ------ | -------------------------------------------------------------- |
| `cv 1` | Not a secure context. Serve over HTTPS (see above).              |
| `cv 2` | The key is not 32 bytes of base64url — usually a truncated copy. |
| `cv 3` | No bundle for this key and page. Revoked, or a stale link.       |
| `cv 4` | The bundle did not decrypt. Key and bundle are out of step.      |

No `cv` line at all means the script never saw a key: check the fragment
survived the copy, and remember an unlocked session persists in `sessionStorage`
until you press "Show the public version".

To reach the dev or preview server from another machine, pass `--host` and name
the host you will use:

```sh
CV_ALLOWED_HOSTS=.ts.net npx astro preview --host 0.0.0.0 --port 4327
```

Without it Vite answers `Blocked request. This host … is not allowed`. Its error
message tells you to set `preview.allowedHosts` in `vite.config.js`, which does
nothing here: Astro's static preview calls Vite with `configFile: false` and
copies across only `config.server.*`, so the setting has to be Astro's own
`server.allowedHosts` — which is what `CV_ALLOWED_HOSTS` feeds. Requests to a
bare IP skip the check, so `curl` to the address can succeed while a browser
using the name is refused.

## How it works

Every page renders its design **twice** — once public, once private — from a
view that decides what each mode contains. The private copy is parked in a
`<template>`, and the build lifts it out:

```
src/lib/view.ts           decides what is public; the public branch never reads private data
  ↓
page renders <Cv mode="public"> and <template data-vault><Cv mode="private"></template>
  ↓ astro:build:done
dist/index.html           template deleted — a plain page with no trace of the other one
dist/_a/<bundleId>.json   the private body, AES-256-GCM, one file per recipient
  ↓ browser, only if a key is in the fragment
document.body replaced
```

Encrypting the whole body rather than marking individual fields is what makes
the public page honest-looking. Private sections do not exist in it, and
substituted values read as ordinary prose: the employer is *described* rather
than named, and the contact address is a real public alias rather than a gap.

Key handling, per page:

```
recipientKey K   32 random bytes, only ever in that person's link
bundleId         HKDF(K, salt = page path, info = "cv/id/v1")   → the filename
bundleKey        HKDF(K, salt = page path, info = "cv/body/v1") → AES-256-GCM
```

Deriving the filename from the key means the bundle cannot be found by guessing,
and because HKDF is one-way, knowing a filename does not yield the key. The page
path is the salt and the GCM additional data, so a bundle cannot be replayed
against a different page. Nothing in the published HTML points at any of it.

The key travels in the URL **fragment**, which browsers never put in a request —
not in server logs, not in a CDN, not in a `Referer` header.

## What "no hint" does and does not cover

**Covered.** No placeholders, no redaction blocks, no unlock UI, no ciphertext in
the HTML, no link or preload pointing at the bundle directory, and **no network
request at all** unless a key is present. A visitor, a crawler, or a scraper gets
a complete CV and no reason to think there is more. A revoked link shows the same
public page rather than an error, so even a stale link does not give the game
away — tell recipients out of band if you rotate keys.

**Not covered.** The page ships a small script that reads the fragment. It
carries no strings describing what it does, but anyone who reads the source will
work it out. The guarantee is that the page does not advertise itself and that
private content is never served to anyone without a key — not that a determined
reader cannot tell the mechanism exists.

## Threat model

**What this stops.** Bulk harvesting. Crawlers, résumé scrapers, data brokers and
someone googling your name get the public CV and nothing else.

**What this does not stop.**

- **Anything already downloaded.** Revoking a recipient deletes their bundle on
  the next build; it cannot reach the copy in their cache, on their disk, or in
  an archive. Treat the private version as "not harvestable", never as "secret".
- **A recipient sharing their link.** Per-recipient bundles tell you *which* link
  leaked, which is worth something, but the data is out either way.
- **Screenshots.** The key stays visible in the address bar. That keeps the link
  reloadable and shareable, at the cost of leaking in a screenshot.
- **A targeted adversary.** If someone specifically wants your address, use a
  server-side gate (Cloudflare Access, a Worker checking a token) so the bytes
  never leave the server unauthorised, or do not publish it at all.

Keep genuinely sensitive data out of both versions and send it on request.
`private/private.example.json` includes a street address to exercise the
mechanism, not to recommend publishing one.

Passphrases are deliberately unsupported. A 256-bit random key pasted from a link
is stronger than anything memorable and no harder to use.

## Adding content

- **Public, translatable prose** → `src/i18n/en.ts` and `src/i18n/de.ts`. Both
  satisfy `Content` in `src/i18n/types.ts`, so a missing German string is a type
  error rather than a silently English page.
- **Facts that do not translate** (repo names, star counts, dates) →
  `src/data/shared.ts`.
- **Private values** → `private/private.json`, gitignored. Anything that differs
  per language is `{ "en": …, "de": … }`.
- **Section icons** → the `icons` map in `src/components/Cv.astro`. Names come
  from [Lucide](https://lucide.dev); `Icon.astro` inlines the SVG from
  `lucide-static` at build time, so no icon runtime ships and there is no request
  per icon. They are decorative and `aria-hidden`, because each one sits beside a
  heading that already says the same thing.
- **What is public** → `src/lib/view.ts`. This is the only file that decides.
  Its public branch never touches the private data, so a public render cannot
  leak a value even by accident. Substitute rather than omit: a public page with
  a visible hole is the thing this design exists to avoid.

## The leak check

`npm run build` ends with `scripts/check-leaks.mjs`, which greps the whole build
for every leaf string in the private data, and separately checks each public page
for a leftover template, a redaction attribute, or markup pointing at the bundle
directory. Either kind of hit fails the build.

Script bodies are excluded from the path check on purpose — the fetch path has to
live somewhere in the client code. What is checkable is that no *markup* points
at it.

Values shorter than six characters are skipped as noise. If a private value is
legitimately a substring of a public one, add it to `private/leak-allow.json`
rather than turning the check off.

## Deploying

Any static host.

- `CV_SITE=https://cv.example.dev npm run build`, so the printed unlock links and
  the `hreflang` tags point at the real domain.
- Keep `.keys/` out of the repo and out of `dist/`. It is gitignored; if you build
  in CI, hold it in a secret and write it at build time. Losing it invalidates
  every link you have sent.
- Serve `dist/_a/` as ordinary static files and make sure directory listing is
  off, or the unguessable filenames stop being unguessable.
