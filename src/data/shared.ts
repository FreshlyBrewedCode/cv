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
  { id: 'bachelor', from: '2016', to: '2019' },
  { id: 'school', from: '2013', to: '2016' },
] as const;

/**
 * Skills, grouped by what they are for. Each group has a hue on the colour
 * wheel (OKLCH degrees); the stylesheet turns that into a chip colour for
 * either scheme. `past` marks things worked with before but not reached for
 * any more. Names are proper nouns and stay as they are; the handful that are
 * ordinary words are translated through `c.skills.terms`.
 */
export const skillGroups = [
  {
    id: 'languages',
    hue: 255,
    items: [{ name: 'Go' }, { name: 'TypeScript' }, { name: 'SQL' }, { name: 'Rust' }, { name: 'HTML & CSS' }, { name: 'Python', past: true }, { name: 'Java', past: true }],
  },
  {
    id: 'frameworks',
    hue: 25,
    items: [{ name: 'Svelte' }, { name: 'Astro' }, { name: 'Zod' }, { name: 'React', past: true }, { name: 'jQuery', past: true }],
  },
  {
    id: 'services',
    hue: 185,
    items: [{ name: 'AWS' }, { name: 'Cloudflare' }, { name: 'Hetzner' }, { name: 'Fly.io' }, { name: 'Heroku', past: true }],
  },
  {
    id: 'tools',
    hue: 80,
    items: [{ name: 'Docker' }, { name: 'Kubernetes' }, { name: 'Terraform' }, { name: 'GitHub Actions' }, { name: 'systemd' }, { name: 'Jenkins', past: true }],
  },
  {
    id: 'ai',
    hue: 145,
    items: [{ name: 'Claude Code' }, { name: 'Claude API' }, { name: 'MCP' }, { name: 'Ollama' }],
  },
  {
    id: 'practice',
    hue: 320,
    items: [{ name: 'mentoring' }, { name: 'design reviews' }, { name: 'incident response' }, { name: 'technical writing' }],
  },
] as const;

export const writing = [
  { id: 'retry', year: '2024' },
  { id: 'control-plane', year: '2023' },
] as const;

export const workingSince = 2019;

export const stars = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
