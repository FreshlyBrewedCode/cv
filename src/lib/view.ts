import { locales, type Lang } from '../i18n';
import type { Content } from '../i18n/types';
import { handle, repos, roles, skillGroups, workingSince } from '../data/shared';
import { priv } from '../data/private';

export type Mode = 'public' | 'private';

export type FactKey = 'based' | 'email' | 'phone' | 'github' | 'since';

export interface Fact {
  key: FactKey;
  label: string;
  value: string;
  href?: string;
}

export interface View {
  c: Content;
  lang: Lang;
  unlocked: boolean;
  /** Full name once unlocked, the first name before that. */
  name: string;
  facts: Fact[];
  /** Real name once unlocked, a description of the company before that. */
  employer: string;
  workLede: string;
  roles: { title: string; body: string; from: string; to: string; when: string }[];
  repos: { id: string; tech: string[]; blurb: string; detail: string; url: string }[];
  skills: { id: string; label: string; hue: number; items: { name: string; past: boolean }[] }[];
}

/**
 * The single place that decides what is public.
 *
 * The public branch never reads `priv`, so a public render cannot leak a
 * private value even by accident — and it substitutes rather than omits, so the
 * page reads as a finished CV rather than one with holes in it.
 */
export function buildView(lang: Lang, mode: Mode): View {
  const c = locales[lang];
  const unlocked = mode === 'private';

  const facts: Fact[] = [
    { key: 'based', label: c.rail.based, value: c.city },
    { key: 'email', label: c.rail.email, value: c.publicEmail, href: `mailto:${c.publicEmail}` },
  ];

  if (unlocked) facts.push({ key: 'phone', label: c.rail.phone, value: priv.phone });

  facts.push(
    { key: 'github', label: c.rail.github, value: `github.com/${handle}`, href: `https://github.com/${handle}` },
    { key: 'since', label: c.rail.since, value: String(workingSince) },
  );

  const employer = unlocked ? priv.employer.name : c.employerPublic;

  return {
    c,
    lang,
    unlocked,
    name: unlocked ? priv.name : c.name,
    facts,
    employer,
    workLede: c.workLede.replace('{employer}', employer),
    roles: roles.map((r) => ({
      ...c.roles[r.id],
      from: r.from,
      to: r.to ?? c.present,
      when: r.to === null ? c.since.replace('{year}', r.from) : r.from,
    })),
    repos: repos.map((r) => ({
      id: r.id,
      tech: r.tech,
      url: `https://github.com/${handle}/${r.id}`,
      ...c.repos[r.id],
    })),
    skills: skillGroups.map((g) => ({
      id: g.id,
      label: c.skills.groups[g.id],
      hue: g.hue,
      items: g.items.map((i) => ({ name: i.name, past: 'past' in i && i.past })),
    })),
  };
}
