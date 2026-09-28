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
  /** One paragraph per line. */
  intro: string;

  /** Stands in for the employer's name on the public page. Not a placeholder:
      it reads as a normal way to describe an employer you have not named. */
  employerPublic: string;
  /** The address anyone may write to, in both versions. */
  publicEmail: string;

  meta: { description: string };

  sections: {
    about: string;
    projects: string;
    work: string;
    skills: string;
  };

  rail: {
    based: string;
    email: string;
    phone: string;
    github: string;
    since: string;
  };

  skills: {
    groups: Record<string, string>;
    /** Shown beside things worked with before but not any more. */
    past: string;
  };

  actions: { print: string; theme: string };

  workLede: string;
  roles: Record<string, { title: string; body: string }>;
  repos: Record<string, { blurb: string; detail: string }>;

  vault: {
    /** Only ever rendered in the unlocked view, so never public. */
    unlocked: string;
    lock: string;
  };

  present: string;
  /** The timeline label for the role that has not ended; `{year}` is when it
      started. Earlier roles are labelled with their start year alone. */
  since: string;
}
