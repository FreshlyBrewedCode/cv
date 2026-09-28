import type { Content } from './types';

const YEAR = new Date().getFullYear();

export const de: Content = {
  htmlLang: 'de',
  base: '/de/',
  switchLabel: 'English',

  name: 'Karl',
  headline: 'Full-Stack-Entwickler',
  city: 'Göttingen',
  intro: [
    `Seit über ${YEAR - 2014} Jahren baue ich Software und arbeite mit ihr, ${YEAR - 2021} davon professionell. Ich begeistere mich für alles, was technisch ist. Ursprünglich angetrieben durch den Wunsch, eigene Spiele zu entwickeln, habe ich mich über die Jahre mit vielen verschiedenen Gebieten beschäftigt: Computergrafik, Webtechnologien, Design, Mobile, XR, AI und mehr. Heute arbeite ich hauptsächlich mit Webtechnologien und einem kompletten TypeScript-Full-Stack.`,
    `Aktuell versuche ich, den Wandel zu verstehen, den wir als Softwareentwickler durch AI erleben. Dabei versuche ich, vorne mit dabei zu sein, neue Arbeitsweisen und Möglichkeiten zu erkunden und zu nutzen und trotzdem Hype von tatsächlichem Fortschritt zu unterscheiden.`,
    `Abseits der Arbeit begeistere ich mich für Radfahren, Laufen, Fotografie, Cappuccino und Pizzabacken („die beste der Stadt“, laut einigen Freunden). Falls dann noch Zeit bleibt (oder Winter ist), arbeite ich an meinem nächsten Open-Source-Sideproject (siehe unten).`,
  ].join('\n'),

  employerPublic: 'einem mittelgroßen Unternehmen der Biopharma-Industrie',
  publicEmail: 'karl@frebreco.de',

  meta: {
    description: 'Full-Stack-Entwickler in Göttingen. TypeScript all the way.',
  },

  sections: {
    skills: 'Technologien & Skills',
    about: 'Über mich',
    projects: 'Sideprojects und Open Source',
    work: 'Karriere und Bildung',
  },

  rail: {
    based: 'Standort',
    email: 'E-Mail',
    phone: 'Telefon',
    github: 'GitHub',
    since: 'Berufstätig seit',
  },

  skills: {
    groups: {
      languages: 'Sprachen',
      frameworks: 'Bibliotheken & Frameworks',
      services: 'Cloud & Dienste',
      tools: 'Tools',
      ai: 'AI',
    },
    past: 'früher/wenig genutzt',
  },

  actions: { print: 'Lebenslauf drucken', theme: 'Zwischen hell und dunkel wechseln' },

  workLede:
    'Ich hatte das Privileg, schon während des Studiums in der IT von {employer} zu arbeiten. Dort bin ich bis heute und durfte in dieser Zeit in verschiedenen Rollen und an verschiedenen Projekten arbeiten.',

  roles: {
    fullStack: {
      title: 'Software Engineer, Full-Stack',
      body: 'Kurz nach dem Release von ChatGPT gründete sich in meiner Abteilung ein kleines Team, das sich auf die Entwicklung interner, LLM-basierter Web-Apps konzentrierte. Einige Zeit später trat auch ich dem „AI Apps“-Team als Frontend-Entwickler bei. Schon bald übernahm ich allerdings zusätzlich mehr und mehr Aufgaben im Backend- und DevOps-Bereich. Zusammen mit dem Rest des Teams aus etwa acht Leuten entwickeln und betreuen wir zwei interne Apps mit ca. 5.000 monatlichen Nutzern. Außerdem war ich maßgeblich an der Konzeption und Umsetzung einer neuen Architektur für unsere Flaggschiff-App beteiligt. Neben meinen normalen Aufgaben als Entwickler setze ich mich intern aktiv für das Thema „Agentic Engineering“ ein. Dafür erprobe ich regelmäßig neue Arbeitsweisen und teile mein Wissen, z. B. in internen Workshops oder Initiativen.',
    },
    '3d': {
      title: '3D Visualization Engineer, Mixed Reality',
      body: 'Nach meinem Studium wurde ich als Vollzeitmitarbeiter übernommen. Zeitgleich gründeten wir intern ein kleines Team, das sich ausschließlich auf den Bereich „Mixed Reality“ konzentrierte. Hier trug ich als Entwickler die Hauptverantwortung für den technischen Teil zahlreicher kleinerer interner Projekte im Bereich Augmented Reality und 3D-Visualisierung. In dieser Zeit entwickelte und betreute ich eine Reihe interner Packages für die Unity Engine, mit denen wir schnell neue Projekte und Prototypen starten und Ideen validieren konnten. Zuletzt lag mein Fokus u. a. auf AR-Apps zur Visualisierung neuer Produktionsanlagen und zur Schulung von Kunden.',
    },
    workingStudent: {
      title: 'Praktikum & Werkstudent, Mixed Reality',
      body: 'Während meines Studiums arbeitete ich erst als Praktikant und danach als Werkstudent. Mein Fokus lag dabei auf dem Bereich Augmented Reality. Im Rahmen eines Innovationsprojekts im Unternehmen entwickelte und gestaltete ich Prototypen und Demos mit der Unity Engine für verschiedene Hardware, u. a. Microsoft HoloLens und HTC Vive und später auch Apple Vision Pro.',
    },
    bachelor: {
      title: 'B.Sc. Mediendesigninformatik, Hochschule Hannover',
      body: 'Ein gemischter Studiengang, der angewandte Informatik mit Mediendesign kombiniert. Das Studium umfasste allgemeine Informatik-Grundlagen, aber auch Themengebiete wie Usability, Web- und Gamedesign, 3D-Animation, Bildbearbeitung und Computergrafik.',
    },
    school: {
      title: 'Abitur, Gymnasium Corvinianum, Northeim',
      body: 'Schwerpunkte: Mathematik, Physik, Englisch und Informatik.',
    },
  },

  repos: {
    canvas: {
      blurb: 'Ein kollaborativer Canvas für Agents und Menschen.',
      detail:
        'Als Prototyp an einem Wochenende gebaut. Mein Vorzeigeprojekt, wenn jemand fragt, was man mit AI bauen kann.',
    },
    factory: {
      blurb: 'Meine Version der „Software Factory“.',
      detail: 'Agent-Workflows in TypeScript plus eine Web-UI für das Monitoring.',
    },
  },

  vault: {
    unlocked: 'Vollständige Fassung, nur über diesen Link.',
    lock: 'Öffentliche Fassung anzeigen',
  },

  present: 'heute',
  since: 'seit {year}',
};
