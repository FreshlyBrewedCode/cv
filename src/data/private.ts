import fs from 'node:fs';

/**
 * Private CV data, read from disk at build time with `fs` on purpose.
 *
 * A plain `import` of this JSON would make it a module in Vite's graph, where a
 * stray client-side reference could pull it into a browser bundle. Reading the
 * file here keeps it server-only: these values only ever reach a browser inside
 * the encrypted bundle, and only for someone holding a key.
 */
export interface PrivateData {
  /** Full name, in place of the first name the public page goes by. */
  name: string;
  phone: string;
  employer: { name: string };
}

const real = new URL('../../private/private.json', import.meta.url);
const example = new URL('../../private/private.example.json', import.meta.url);

const source = fs.existsSync(real) ? real : example;

export const usingExampleData = source === example;
export const priv: PrivateData = JSON.parse(fs.readFileSync(source, 'utf8'));
