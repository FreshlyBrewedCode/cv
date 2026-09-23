import type { Content } from './types';

export const de: Content = {
  htmlLang: 'de',
  base: '/de/',
  switchLabel: 'English',

  name: 'Ari Lindqvist',
  headline: 'Full-Stack-Entwickler',
  city: 'Göteborg, Schweden',
  intro:
    'Ich baue und betreibe den gesamten Weg vom Formular im Browser bis zu der Zeile, die dabei in der Datenbank landet. Sechs Jahre davon bei einem einzigen Logistikunternehmen, dazu eine Handvoll Werkzeuge, die ich öffentlich pflege, weil ich sie zuerst selbst gebraucht habe.',

  employerPublic: 'einem SaaS-Anbieter für Frachtlogistik mit rund 180 Mitarbeitenden',
  publicEmail: 'hallo@lindqvist.dev',

  meta: {
    description:
      'Full-Stack-Entwickler in Göteborg. Go, TypeScript und Postgres, vom Browser bis zum Bereitschaftshandy.',
  },

  sections: {
    skills: 'Womit ich baue',
    about: 'Wo ich im Stack arbeite',
    projects: 'Was ich öffentlich pflege',
    work: 'Der Job, der das alles bezahlt',
    writing: 'Irgendwo aufgeschrieben',
    references: 'Menschen, die dafür geradestehen',
    terms: 'Konditionen',
  },

  rail: {
    based: 'Standort',
    email: 'E-Mail',
    phone: 'Telefon',
    address: 'Adresse',
    available: 'Verfügbar',
    rate: 'Gehaltsvorstellung',
    github: 'GitHub',
    since: 'Berufstätig seit',
  },

  skills: {
    groups: {
      languages: 'Sprachen',
      frameworks: 'Bibliotheken & Frameworks',
      services: 'Cloud & Dienste',
      tools: 'Werkzeuge',
      ai: 'KI',
      practice: 'Arbeitsweise',
    },
    past: 'früher genutzt',
    terms: {
      mentoring: 'Mentoring',
      'design reviews': 'Design-Reviews',
      'incident response': 'Incident Response',
      'technical writing': 'Technisches Schreiben',
    },
  },

  starsLabel: 'Sterne',

  actions: { print: 'Lebenslauf drucken', theme: 'Zwischen hell und dunkel wechseln' },

  workLede:
    'Sechs Jahre bei {employer}. Drei Titel, eine Codebasis und ein Sendungsvolumen, das sich in dieser Zeit etwa vervierzigfacht hat.',

  roles: {
    staff: {
      title: 'Staff Engineer',
      body: 'Verantwortlich für die Plattform, auf die alle Produktteams ausliefern. Die mittlere Deploy-Dauer von 19 Minuten auf unter 4 gesenkt, indem eine Jenkins-Pipeline durch einen Build-Cache und einen kleinen Deploy-Agenten in Go ersetzt wurde. Mentor für vier Kolleginnen und Kollegen, Organisation der Design-Reviews.',
    },
    senior: {
      title: 'Senior Full-Stack-Entwickler',
      body: 'Die Oberfläche für die Sendungsverfolgung in Svelte neu gebaut, gegen eine neue Go-API. Der p95-Seitenaufbau ging dabei von 3,4 s auf 780 ms zurück. Change Data Capture aus Postgres eingeführt, damit das Analytics-Team nicht länger das Produktions-Replikat abfragt.',
    },
    backend: {
      title: 'Backend-Entwickler',
      body: 'Als fünfter Entwickler eingestiegen. Den Zolldienst geschrieben, der bis heute jede grenzüberschreitende Sendung abwickelt, dazu die Wiederholungslogik um eine Spediteurs-API, die ungefähr wöchentlich ausfiel.',
    },
    bachelor: {
      title: 'B.Sc. Informatik, Chalmers University of Technology',
      body: 'Abschlussarbeit über Konsistenz-Kompromisse in offlinefähigen Mobil-Apps, betreut von der Arbeitsgruppe für verteilte Systeme. Zwei Semester Tutor im Datenbankkurs des zweiten Studienjahres.',
    },
    school: {
      title: 'Naturwissenschaftliches Profil, Hvitfeldtska gymnasiet',
      body: 'Gymnasium in Göteborg mit Mathematik und Physik als Schwerpunkt. Hier die erste Web-App geschrieben: einen Stundenplan für die Robotik-AG der Schule.',
    },
  },

  repos: {
    tugboat: {
      blurb: 'Einen Container per SSH auf einen einzelnen Server ausliefern, ganz ohne Control Plane.',
      detail:
        'Entstanden, nachdem zum dritten Mal jemand Deployments ohne Ausfallzeit wollte und dafür ein Kubernetes-Cluster bekam. Eine Binary, eine systemd-Unit, ein Health-Check.',
    },
    'sqlite-stream': {
      blurb: 'Change Data Capture von SQLite nach Postgres oder Kafka.',
      detail:
        'Liest das WAL mit und gibt typisierte Änderungsereignisse aus. Im Einsatz bei einigen Local-First-Anwendungen, die eine serverseitige Kopie brauchen, ohne doppelt zu schreiben.',
    },
    formwork: {
      blurb: 'Formularzustand für Svelte, der seine Typen bis zum Server behält.',
      detail:
        'Ein Schema beschreibt die Felder, die Validierung und die Nutzdaten. Die erzeugten Typen sind dieselben, die der Endpunkt parst. Ein umbenanntes Feld bricht damit den Build statt der Produktion.',
    },
    lilnotes: {
      blurb: 'Local-First-Notizen in Markdown, die über 40 Zeilen Server synchronisieren.',
      detail:
        'Eine PWA auf IndexedDB mit Last-Write-Wins-Abgleich. Gebaut, um zu prüfen, ob Local First den Aufwand für kleine Dokumente wert ist. Ist es.',
    },
    plzcache: {
      blurb: 'HTTP-Caching-Middleware, die die Request-Header tatsächlich liest.',
      detail:
        'Setzt die Teile von RFC 9111 um, auf die es hinter einem API-Gateway ankommt: Revalidierung, Vary-Handling und Stale-While-Revalidate.',
    },
  },

  writing: {
    retry: {
      title: 'Der Retry, der den Ausfall schlimmer machte',
      where: 'eigener Blog',
      note: 'Warum ein exponentielles Backoff ohne Jitter aus einer 30-Sekunden-Störung beim Spediteur 20 Minuten fehlgeschlagener Sendungen machte.',
    },
    'control-plane': {
      title: 'Ausliefern ohne Control Plane',
      where: 'Konferenzvortrag, Øredev',
      note: 'Die Begründung hinter tugboat, vorgetragen vor einem Saal, der überwiegend anderer Meinung war.',
    },
  },

  vault: {
    unlocked: 'Vollständige Fassung, nur über diesen Link.',
    lock: 'Öffentliche Fassung anzeigen',
  },

  present: 'heute',
  since: 'seit {year}',
};
