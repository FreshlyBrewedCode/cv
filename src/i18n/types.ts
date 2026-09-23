export type Lang = 'en' | 'de';

export interface Content {
  /** BCP 47 tag for <html lang>. */
  htmlLang: string;
  /** Path this locale is served from, used for hreflang and the switcher. */
  base: string;
  switchLabel: string;

  name: string;
  headline: string;
  city: string;
  intro: string;

  /** Stands in for the employer's name on the public page. Not a placeholder:
      it reads as a normal way to describe an employer you have not named. */
  employerPublic: string;
  /** The address anyone may write to. The personal one is private. */
  publicEmail: string;

  meta: { description: string };

  sections: {
    about: string;
    projects: string;
    work: string;
    writing: string;
    references: string;
    terms: string;
  };

  rail: {
    based: string;
    email: string;
    phone: string;
    address: string;
    available: string;
    rate: string;
    github: string;
    since: string;
  };

  /** Unit label after a repository's star count. */
  starsLabel: string;

  actions: { print: string };

  workLede: string;
  roles: Record<string, { title: string; body: string }>;
  repos: Record<string, { blurb: string; detail: string }>;
  writing: Record<string, { title: string; where: string; note: string }>;

  vault: {
    /** Only ever rendered in the unlocked view, so never public. */
    unlocked: string;
    lock: string;
  };

  present: string;
}
