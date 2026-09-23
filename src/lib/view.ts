import { locales, type Lang } from '../i18n';
import type { Content } from '../i18n/types';
import { handle, repos, roles, skillGroups, writing, workingSince } from '../data/shared';
import { priv } from '../data/private';

export type Mode = 'public' | 'private';

export type FactKey = 'based' | 'email' | 'phone' | 'address' | 'github' | 'since' | 'available' | 'rate';

export interface Fact {
  key: FactKey;
  label: string;
  value: string;
  href?: string;
}

export interface Reference {
  name: string;
  role: string;
  contact: string;
}

export interface View {
  c: Content;
  lang: Lang;
  unlocked: boolean;
  facts: Fact[];
  /** Real name once unlocked, a description of the company before that. */
  employer: string;
  workLede: string;
  roles: { title: string; body: string; from: string; to: string; when: string }[];
  repos: { id: string; lang: string; stars: number; tech: string[]; blurb: string; detail: string; url: string }[];
  skills: { id: string; label: string; hue: number; items: { name: string; past: boolean }[] }[];
  writing: { title: string; where: string; note: string; year: string }[];
  references: Reference[];
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

  const facts: Fact[] = [{ key: 'based', label: c.rail.based, value: c.city }];

  if (unlocked) {
    facts.push(
      { key: 'email', label: c.rail.email, value: priv.email, href: `mailto:${priv.email}` },
      { key: 'phone', label: c.rail.phone, value: priv.phone },
      { key: 'address', label: c.rail.address, value: `${priv.address.street}, ${priv.address.postal}` },
    );
  } else {
    facts.push({ key: 'email', label: c.rail.email, value: c.publicEmail, href: `mailto:${c.publicEmail}` });
  }

  facts.push(
    { key: 'github', label: c.rail.github, value: `github.com/${handle}`, href: `https://github.com/${handle}` },
    { key: 'since', label: c.rail.since, value: String(workingSince) },
  );

  if (unlocked) {
    facts.push(
      { key: 'available', label: c.rail.available, value: priv.availability[lang] },
      { key: 'rate', label: c.rail.rate, value: priv.compensation[lang] },
    );
  }

  const employer = unlocked ? priv.employer.name : c.employerPublic;

  return {
    c,
    lang,
    unlocked,
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
      lang: r.lang,
      stars: r.stars,
      tech: r.tech,
      url: `https://github.com/${handle}/${r.id}`,
      ...c.repos[r.id],
    })),
    skills: skillGroups.map((g) => ({
      id: g.id,
      label: c.skills.groups[g.id],
      hue: g.hue,
      items: g.items.map((i) => ({ name: c.skills.terms[i.name] ?? i.name, past: 'past' in i && i.past })),
    })),
    writing: writing.map((w) => ({ ...c.writing[w.id], year: w.year })),
    references: unlocked
      ? priv.references.map((r) => ({ name: r.name, role: r.role[lang], contact: r.contact }))
      : [],
  };
}
