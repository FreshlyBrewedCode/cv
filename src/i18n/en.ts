import type { Content } from './types';

const YEAR = new Date().getFullYear();

export const en: Content = {
  htmlLang: 'en',
  base: '/',
  switchLabel: 'Deutsch',

  name: 'Karl',
  headline: 'Full-stack engineer',
  city: 'Göttingen',
  intro: [
    `I have been building and working with software for over ${YEAR - 2014} years, ${YEAR - 2021} of them professionally. I am fascinated by anything technical. What started as the wish to make my own games has led me through many fields over the years: computer graphics, web technologies, design, mobile, XR, AI and more. Today I mostly work with web technologies and a TypeScript stack from end to end.`,
    `Right now I am trying to understand the shift AI is bringing to how we work as software engineers. I try to stay at the front of it, exploring and adopting new ways of working and new possibilities, while still telling hype apart from actual progress.`,
    `Away from work I am into cycling, running, photography, cappuccino and baking pizza ("the best in town", according to some friends). If there is any time left after that (or it is winter), I work on my next open-source side project (see below).`,
  ].join('\n'),

  employerPublic: 'a mid-sized company in the biopharmaceutical industry',
  publicEmail: 'karl@frebreco.de',

  meta: {
    description: 'Full-stack engineer in Göttingen. TypeScript all the way.',
  },

  sections: {
    skills: 'Technologies & skills',
    about: 'About me',
    projects: 'Side projects and open source',
    work: 'Career and education',
  },

  rail: {
    based: 'Based in',
    email: 'Email',
    phone: 'Phone',
    github: 'GitHub',
    since: 'Working since',
  },

  skills: {
    groups: {
      languages: 'Languages',
      frameworks: 'Libraries & frameworks',
      services: 'Cloud & services',
      tools: 'Tools',
      ai: 'AI',
    },
    past: 'used before or rarely',
  },

  actions: { print: 'Print this CV', theme: 'Switch between light and dark' },

  workLede:
    'I was lucky enough to start working in the IT department of {employer} while I was still studying. I still work there today, and over that time I have had the chance to work in several roles and on many different projects.',

  roles: {
    fullStack: {
      title: 'Software engineer, full-stack',
      body: 'Shortly after ChatGPT was released, a small team formed in my department to build internal, LLM-based web apps. Some time later I joined this "AI Apps" team as a frontend engineer, but soon took on more and more backend and DevOps work as well. Together with the rest of the team of about eight people, we build and run two internal apps with around 5,000 monthly users. I also played a major part in designing and implementing a new architecture for our flagship app. Alongside my regular work as an engineer, I actively champion "agentic engineering" inside the company: I regularly try out new ways of working and share what I learn, for example in internal workshops and initiatives.',
    },
    '3d': {
      title: '3D visualization engineer, Mixed Reality',
      body: 'After graduating I was taken on full-time. At the same time we set up a small internal team focused entirely on mixed reality. As its developer, I was mainly responsible for the technical side of numerous smaller internal projects in augmented reality and 3D visualization. During this time I built and maintained a set of internal packages for the Unity engine that let us start new projects and prototypes quickly and validate ideas. Most recently my focus included AR apps for visualizing new production plants and for training customers.',
    },
    workingStudent: {
      title: 'Intern & working student, Mixed Reality',
      body: 'While studying I worked first as an intern and then as a working student, focusing on augmented reality. Driven by an innovation project in the company, I designed and built prototypes and demos with the Unity engine for a range of hardware, including Microsoft HoloLens and HTC Vive, and later Apple Vision Pro.',
    },
    bachelor: {
      title: 'BSc Computer Science & Media Design, Hochschule Hannover',
      body: 'A combined degree that pairs applied computer science with media design. Besides the general foundations of computer science, it covered usability, web and game design, 3D animation, image editing and computer graphics.',
    },
    school: {
      title: 'Abitur, Gymnasium Corvinianum, Northeim',
      body: 'Main subjects: mathematics, physics, English and computer science.',
    },
  },

  repos: {
    canvas: {
      blurb: 'A collaborative canvas for agents and humans.',
      detail:
        'Prototype built over a weekend. My go-to example when someone asks what you can build with AI.',
    },
    factory: {
      blurb: 'My take on the "software factory".',
      detail: 'Agent workflows in TypeScript, plus a web UI for monitoring them.',
    },
  },

  vault: {
    unlocked: 'Full version, for this link only.',
    lock: 'Show the public version',
  },

  present: 'present',
  since: 'since {year}',
};
