/**
 * Facts that do not translate: repository names, languages, star counts and
 * dates. The prose that describes them lives in src/i18n, keyed by the ids here.
 */

export const handle = 'arilindqvist';

export interface Repo {
  id: string;
  lang: string;
  stars: number;
  tech: string[];
}

export const repos: Repo[] = [
  { id: 'tugboat', lang: 'Go', stars: 3120, tech: ['Go', 'SSH', 'systemd', 'Docker'] },
  { id: 'sqlite-stream', lang: 'Rust', stars: 840, tech: ['Rust', 'SQLite', 'Postgres', 'Kafka'] },
  { id: 'formwork', lang: 'TypeScript', stars: 2240, tech: ['TypeScript', 'Svelte', 'Zod'] },
  { id: 'lilnotes', lang: 'TypeScript', stars: 470, tech: ['TypeScript', 'SQLite', 'Astro'] },
  { id: 'plzcache', lang: 'Go', stars: 190, tech: ['Go', 'HTTP', 'Postgres'] },
];

export const roles = [
  { id: 'staff', from: '2025', to: null },
  { id: 'senior', from: '2022', to: '2025' },
  { id: 'backend', from: '2019', to: '2022' },
] as const;

export const writing = [
  { id: 'retry', year: '2024' },
  { id: 'control-plane', year: '2023' },
] as const;

export const workingSince = 2019;

export const stars = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
