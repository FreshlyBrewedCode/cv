/**
 * The pages the build produces, for scripts that cannot import the TypeScript
 * locale files. Keep `url` in step with `base` in src/i18n/*.ts.
 *
 * `url` and `dist` are deliberately separate. `url` is what the browser sees —
 * it includes any deployed base path and is the salt the bundle name is derived
 * from. `dist` is where the file actually sits on disk, which the base never
 * affects. Conflating them means a base-path build looks fine locally and every
 * link resolves to nothing once deployed.
 */
const base = (process.env.CV_BASE || '/').replace(/\/$/, '');

export const pages = [
  { lang: 'en', url: `${base}/`, dist: '' },
  { lang: 'de', url: `${base}/de/`, dist: 'de' },
];
