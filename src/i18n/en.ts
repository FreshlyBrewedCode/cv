import type { Content } from './types';

export const en: Content = {
  htmlLang: 'en',
  base: '/',
  switchLabel: 'Deutsch',

  name: 'Ari Lindqvist',
  headline: 'Full-stack engineer',
  city: 'Gothenburg, Sweden',
  intro:
    'I build and run the whole path from a browser form to the row it writes. Six years of that at one freight-logistics company, plus a handful of tools I maintain in public because I needed them first.',

  employerPublic: 'a freight-logistics SaaS company, around 180 people',
  publicEmail: 'hello@lindqvist.dev',

  meta: {
    description:
      'Full-stack engineer in Gothenburg. Go, TypeScript and Postgres, from the browser down to the pager.',
  },

  sections: {
    about: 'Where I work in the stack',
    projects: 'Things I maintain in public',
    work: 'The day job, which pays for all of it',
    writing: 'Written down somewhere',
    references: 'People who will vouch for it',
    terms: 'Terms',
  },

  rail: {
    based: 'Based in',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    available: 'Available',
    rate: 'Rate',
    github: 'GitHub',
    since: 'Working since',
  },

  starsLabel: 'stars',

  actions: { print: 'Print this CV', theme: 'Switch between light and dark' },

  workLede:
    'Six years at {employer}. Three titles, one codebase, and a shipment volume that grew about fortyfold while I was there.',

  roles: {
    staff: {
      title: 'Staff engineer',
      body: 'Own the platform the product teams deploy onto. Cut median deploy time from 19 minutes to under 4 by replacing a Jenkins pipeline with a build cache and a small Go deploy agent. Mentor four engineers and run the design review rotation.',
    },
    senior: {
      title: 'Senior full-stack engineer',
      body: 'Rebuilt the shipment tracking UI in Svelte against a new Go API, which took the p95 page load from 3.4s to 780ms. Introduced change-data-capture from Postgres so the analytics team stopped querying the production replica.',
    },
    backend: {
      title: 'Backend engineer',
      body: 'Joined as the fifth engineer. Wrote the customs-declaration service that still handles every cross-border shipment, and the retry machinery around a carrier API that went down roughly weekly.',
    },
  },

  repos: {
    tugboat: {
      blurb: 'Deploy a container to a single server over SSH, with no control plane.',
      detail:
        'Written after the third time a client wanted zero-downtime deploys and got handed a Kubernetes cluster. One binary, a systemd unit, and a health check.',
    },
    'sqlite-stream': {
      blurb: 'Change-data-capture from SQLite into Postgres or Kafka.',
      detail:
        'Tails the WAL and emits typed change events. Used in production by a few local-first apps that need a server-side copy without writing twice.',
    },
    formwork: {
      blurb: 'Form state for Svelte that keeps its types all the way to the server.',
      detail:
        'One schema describes the fields, the validation, and the payload. The generated types are the same ones the endpoint parses, so a renamed field breaks the build instead of production.',
    },
    lilnotes: {
      blurb: 'Local-first markdown notes that sync through a 40-line server.',
      detail:
        'A PWA over IndexedDB with last-write-wins sync. Built to test whether local-first is worth the complexity for small documents. It is.',
    },
    plzcache: {
      blurb: 'HTTP caching middleware that actually reads the request headers.',
      detail:
        'Implements the parts of RFC 9111 that matter behind an API gateway: revalidation, vary handling, and stale-while-revalidate.',
    },
  },

  writing: {
    retry: {
      title: 'The retry that made the outage worse',
      where: 'personal blog',
      note: 'Why an exponential backoff without jitter turned a 30-second carrier blip into 20 minutes of failed shipments.',
    },
    'control-plane': {
      title: 'Deploying without a control plane',
      where: 'conference talk, Øredev',
      note: 'The argument behind tugboat, delivered to a room that mostly disagreed.',
    },
  },

  vault: {
    unlocked: 'Full version, for this browser session.',
    lock: 'Show the public version',
  },

  present: 'present',
};
