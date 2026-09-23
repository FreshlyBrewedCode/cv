import { en } from './en';
import { de } from './de';
import type { Content, Lang } from './types';

export type { Content, Lang };

export const locales: Record<Lang, Content> = { en, de };
export const langs = Object.keys(locales) as Lang[];

export const other = (lang: Lang): Lang => (lang === 'en' ? 'de' : 'en');

/**
 * A locale's `base` is the path within the site ('/' or '/de/'). Deployed under
 * a project path — GitHub Pages serves a repo from /<repo>/ — that is not a
 * usable href on its own, so every link to a locale goes through here.
 */
export const localeHref = (base: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${base}`;
