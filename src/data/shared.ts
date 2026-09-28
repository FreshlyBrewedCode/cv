/**
 * Facts that do not translate: repository names, tech tags and dates. The prose that describes them lives in src/i18n, keyed by the ids here.
 */

export const handle = 'FreshlyBrewedCode';

export interface Repo {
  id: string;
  tech: string[];
}

export const repos: Repo[] = [
  { id: 'canvas', tech: ['TypeScript', 'React', 'WebRTC', 'ACP'] },
  { id: 'factory', tech: ['TypeScript', 'React', 'Effect', 'Bun'] },
];

export const roles = [
  { id: 'fullStack', from: '2024', to: null },
  { id: '3d', from: '2021', to: '2024' },
  { id: 'workingStudent', from: '2019', to: '2021' },
  { id: 'bachelor', from: '2017', to: '2021' },
  { id: 'school', from: '2009', to: '2017' },
] as const;

/**
 * Skills, grouped by what they are for. Each group has a hue on the colour
 * wheel (OKLCH degrees); the stylesheet turns that into a chip colour for
 * either scheme. `past` marks things worked with before but not reached for
 * any more. Names are proper nouns and stay the same in every language.
 */
export const skillGroups = [
  {
    id: 'languages',
    hue: 255,
    items: [{ name: 'TypeScript' }, { name: 'Python' }, { name: 'C#', past: true }],
  },
  {
    id: 'frameworks',
    hue: 25,
    items: [{ name: 'React' }, { name: 'NextJS' }, { name: 'TanStack' }, { name: 'Bun' }, { name: 'Effect' }],
  },
  {
    id: 'services',
    hue: 185,
    items: [{ name: 'Azure' }, { name: 'GitHub' } ],
  },
  {
    id: 'tools',
    hue: 80,
    items: [{ name: 'Docker' }, { name: 'Terraform' }, { name: 'Nix' }],
  },
  {
    id: 'ai',
    hue: 145,
    items: [{ name: 'Opencode' }, { name: 'Claude Code' }, { name: 'MCP' }, { name: 'ACP' }, { name: 'AI SDK' }, { name: 'Langchain' }],
  },
] as const;

export const workingSince = 2021;
