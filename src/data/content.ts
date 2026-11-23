import photoMeta from "./photos.generated.json";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
  fr: { label: "Français", short: "FR" },
};

export const profile = {
  name: "Nzokou Kengne Daren Forlan",
  displayName: "Nk Forlan",
  initials: "NF",
  title: "Full-Stack & DevOps Engineer",
  location: {
    en: "Douala, Cameroon",
    fr: "Douala, Cameroun",
  },
  // Public email: shown on the site, CV and JSON-LD.
  publicEmail: "contact@nkforlan.tech",
  // Form email: where FormSubmit delivers messages. Works before email forwarding is active.
  formEmail: "nzokouforlan@gmail.com",
  phoneDisplay: "+237 690 409 736",
  whatsappNumber: "237690409736",
  whatsappGreeting: {
    en: "Hello Forlan, I visited your portfolio and would like to talk.",
    fr: "Bonjour Forlan, j'ai visité votre portfolio et j'aimerais discuter avec vous.",
  },
  github: "https://github.com/Diego23436",
  // No LinkedIn yet. Components only show the link when this is set.
  linkedin: null as string | null,
  siteUrl: "https://nkforlan.tech",
  resume: {
    en: "/resume/Nk%20Forlan%20CV%20EN.pdf",
    fr: "/resume/Nk%20Forlan%20CV%20FR.pdf",
  },
  photos: {
    portrait: {
      // Made by "npm run photos" from forlan-portrait.jpg (4:5 crop, face in the upper third).
      src: "/images/profile/hero-front.webp",
      width: 720,
      height: 900,
      alt: {
        en: "Portrait of Nk Forlan in a white shirt, smiling with a thumbs up on a village road",
        fr: "Portrait de Nk Forlan en chemise blanche, souriant, pouce levé, sur un chemin de terre",
      },
    },
    headshot: {
      src: "/images/profile/hero-back.webp",
      width: 960,
      height: 1200,
      alt: {
        en: "Close portrait of Nk Forlan in a dark striped polo with a shoulder bag",
        fr: "Portrait rapproché de Nk Forlan en polo rayé sombre avec une sacoche",
      },
    },
    // Transparent cut-out for the hero. Swap public/images/profile/cutout.png, then run "npm run photos".
    // Sizes come from src/data/photos.generated.json (written by that script).
    cutout: photoMeta.cutout
      ? {
          variants: photoMeta.cutout.variants.map((variant) => ({
            src: `/images/profile/${variant.file}`,
            width: variant.width,
            height: variant.height,
          })),
          alt: {
            en: "Nk Forlan, cut-out portrait in a dark striped polo, thumbs up",
            fr: "Nk Forlan, portrait détouré en polo rayé sombre, pouce levé",
          },
        }
      : null,
    fullBody: {
      src: "/images/profile/about.webp",
      width: 560,
      height: 700,
      alt: {
        en: "Nk Forlan standing in front of a green hedge, wearing a knitted sweater",
        fr: "Nk Forlan debout devant une haie verte, portant un pull en maille",
      },
    },
  },
};

export function whatsappLink(lang: Locale): string {
  return `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(profile.whatsappGreeting[lang])}`;
}

export const content = {
  en: {
    meta: {
      title: "Nk Forlan | Full-Stack & DevOps Engineer in Douala",
      description:
        "Portfolio of Nk Forlan, a full-stack and DevOps engineer in Douala, Cameroon. Web apps, APIs, DevOps and business websites, from data model to production server.",
    },
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      services: "Services",
      resume: "Resume",
      contact: "Contact",
    },
    actions: {
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      downloadCv: "Download CV",
      englishCv: "English CV",
      frenchCv: "French CV",
      unavailable: "Coming soon",
      viewCaseStudy: "View Case Study",
      viewLive: "Live Demo",
      viewRepo: "Repository",
      backToProjects: "Back to Projects",
      emailMe: "Email Me",
      openMailApp: "Open Mail App",
      openGmail: "Open Gmail",
      copyEmail: "Copy Email",
      copiedEmail: "Email copied.",
      whatsapp: "WhatsApp",
      github: "GitHub",
      linkedin: "LinkedIn",
      theme: "Theme",
      menu: "Menu",
      letsTalk: "Let's talk",
      skipToContent: "Skip to content",
      mainNav: "Main navigation",
      mobileNav: "Mobile navigation",
    },
    hero: {
      status: "Available for work · Douala, CM · UTC+1",
      statusShort: "Available · Douala",
      clock: "in Douala",
      lead: "I",
      ship: "ship",
      words: ["SaaS.", "APIs.", "pipelines.", "products."],
      sentence: "I ship SaaS, APIs, pipelines and products.",
      sub: "Full-Stack & DevOps engineer. From data model to production server.",
      primary: "See my work",
      copy: "Copy email",
      copied: "Copied ✓",
      copyFailed: "Copy failed. Use the Contact page.",
      // TODO: confirm "4 team projects" (Stocky, Easy Klin, SmartQueue, Clinique) before publishing.
      counters: [
        { value: 7, label: "projects" },
        { value: 4, label: "team projects" },
        { value: 2, label: "languages" },
      ],
      chips: { ci: "CI passed · main", deploy: "production · deploying", langs: "EN / FR" },
      marquee: ["FULL-STACK", "DEVOPS", "SAAS", "API DESIGN", "CI/CD"],
    },
    about: {
      intro: "I design and ship real products, for real businesses.",
      paragraphs: [
        "Full-stack and DevOps engineer from Douala. I model the data first, work in tickets and merge requests, and take a product from the spec to a server with a domain.",
        "Outside code, I am an experienced mathematics tutor. Teaching makes me better at explaining hard things simply.",
      ],
      meta: "Douala, Cameroon · Open to remote work · EN / FR",
      photoCaption: "Douala, 2026",
      now: {
        title: "Now",
        updated: "Updated Nov 2026",
        items: [
          "Shipping SaaS products with small teams.",
          "BTech year 3 at IUC: DevOps & Kubernetes, Network Management.",
          "Backend work on NestJS APIs.",
          "Building this portfolio.",
        ],
      },
      pathTitle: "Path",
    },
    skills: {
      title: "Tech Stack",
      legendTitle: "Level legend",
      filterLabel: "Filter by group",
      filterAll: "All",
      usedIn: "Used in",
      close: "Close",
      canvasLabel: "Tech stack map. Each logo opens its level and the projects where I used it.",
      levels: {
        expert: { label: "Expert", hint: "daily use in production" },
        advanced: { label: "Advanced", hint: "shipped real projects with it" },
        working: { label: "Working knowledge", hint: "used in course or side projects" },
      },
    },
    proSkills: {
      title: "Professional Skills",
      items: [
        { icon: "lucide:blocks", short: true, title: "Software architecture & system design", proof: "Clear structure, data-first design, systems that can grow." },
        { icon: "lucide:file-text", short: false, title: "Requirements & specifications", proof: "Specs and ERDs the client approves before I code." },
        { icon: "lucide:layout-dashboard", short: false, title: "Agile, ticket-based delivery", proof: "Sprints, boards, small merge requests and clear definitions of done." },
        { icon: "lucide:git-pull-request", short: true, title: "Code review & Git discipline", proof: "Rebase before merge, CI must pass, quality gates." },
        { icon: "lucide:flask-conical", short: false, title: "Test-first development", proof: "Tests written with or before the feature." },
        { icon: "lucide:users", short: true, title: "Technical leadership", proof: "I lead small teams: scope, tickets, code review, delivery." },
        { icon: "lucide:languages", short: false, title: "Client communication (EN/FR)", proof: "I turn business needs into software, and explain it simply." },
        { icon: "lucide:rocket", short: true, title: "Production mindset", proof: "Servers, domains, monitoring. A project is done when it is online." },
      ],
    },
    projects: {
      title: "Selected work",
      all: "All projects",
      allTitle: "Projects",
      count: "projects",
      filterLabel: "Filter projects",
      filters: { all: "All", saas: "SaaS", client: "Client", team: "Team", devops: "DevOps" },
      emptyFilter: "No project in this filter yet.",
    },
    projectDetail: {
      back: "All projects",
      role: "My role",
      team: "Team",
      year: "Year",
      status: "Status",
      stack: "Stack",
      problem: "Problem",
      solution: "Solution",
      result: "Result",
      confidential: "Client project, code private",
      nextProject: "Next project",
      onThisPage: "On this page",
      sections: { overview: "Overview", architecture: "Architecture", highlights: "Highlights", learning: "Learning" },
      diagramLabel: "Architecture diagram",
    },
    pipeline: {
      title: "How I ship",
      stages: [
        { key: "spec", title: "Spec", line: "I write the spec the client signs off.", proof: "cahier des charges · EN/FR" },
        { key: "erd", title: "ERD", line: "I model the data before any code.", proof: "entities · relations · constraints" },
        { key: "tickets", title: "Tickets", line: "Work is split into small tickets on a board.", proof: "boards · sprints · tickets" },
        { key: "code", title: "Code", line: "Tests first. Small changes.", proof: "NestJS · Next.js · TypeScript" },
        { key: "review", title: "Review", line: "Rebase, merge request, review. Nothing lands unread.", proof: "SonarQube gate · merge requests" },
        { key: "ci", title: "CI", line: "The pipeline must be green before merge.", proof: "GitLab CI · pipelines" },
        { key: "deploy", title: "Deploy", line: "Domain, SSL, server. Done means online.", proof: "domain · SSL · VPS" },
      ],
      terminalLabel: "Deploy log",
    },
    education: {
      title: "Education",
      items: [
        {
          period: "2024 – 2027 (expected)",
          when: "2024–27",
          line: "Year 3 (2026-27). Courses in English, including DevOps & Kubernetes.",
          title: "Bachelor of Technology (BTech) in Computer Science Engineering",
          place: "Institut Universitaire de la Côte (IUC), Douala",
          body: "Now in year 3 (2026-27). Courses are taught in English, including DevOps & Kubernetes and Network Management & Monitoring.",
        },
        {
          period: "2021 – 2023",
          when: "2021–23",
          line: "GCE Advanced Level 2023. GCE Ordinary Level 2021.",
          title: "GCE Advanced Level (2023) and GCE Ordinary Level (2021)",
          place: "GBHS Bobongo Petit Paris",
          body: "GCE Ordinary Level in 2021 and GCE Advanced Level in 2023.",
        },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          period: "24 Aug 2026 – 10 Oct 2026",
          when: "2026",
          line: "Led Stocky's design and build: architecture, data model, auth, deployment on a VPS.",
          title: "Software Engineering Intern",
          place: "Fast and Sure Travel SARL, Douala",
          body: "Worked in the IT team at the Douala branch. Led the design and build of Stocky, a multi-tenant SaaS, with a small team: architecture, data model, authentication, and deployment on a VPS with its own domain.",
        },
        {
          // TODO: exact start and end dates of Easy Klin.
          period: "2026 (in progress)",
          when: "2026",
          line: "NestJS API tickets with tests, on GitLab with CI and SonarQube.",
          title: "Backend Developer (team project)",
          place: "Easy Klin",
          body: "Backend developer on the NestJS API of a multi-agency laundry platform. Self-hosted GitLab, ticket-based sprints, rebase before merge request, CI pipelines, SonarQube quality gate and test-first work. Delivered several tickets (customer profile with addresses, catalogue service-combination logic, sales counting) with their tests.",
        },
        {
          // TODO: add the start year of freelance work.
          period: "Ongoing",
          when: "Ongoing",
          line: "Web apps and websites for local businesses and institutions.",
          title: "Freelance Full-Stack Developer",
          place: "Independent",
          body: "Web apps and websites for local businesses and institutions: back-office tools, online services, education platforms and showcase sites.",
        },
      ],
    },
    services: {
      title: "What I build",
      whatYouGet: "What you get",
      items: [
        {
          icon: "lucide:layers",
          title: "SaaS & Web Applications",
          pitch: "Web platforms and back-office tools that handle real business data.",
          bullets: [
            "Web platforms with roles, data and customer accounts",
            "Dashboards and admin tools",
            "REST APIs with clean documentation",
            "Roles and permissions",
          ],
        },
        {
          icon: "lucide:globe",
          title: "Business Websites",
          pitch: "Fast, bilingual websites for businesses, organisations and professionals.",
          bullets: [
            "French and English versions",
            "Fast and mobile-friendly pages",
            "Ready for search engines (SEO)",
            "Contact form and WhatsApp link",
          ],
        },
        {
          icon: "lucide:server",
          title: "DevOps & Deployment",
          pitch: "From code on a laptop to a secure site online, with automatic delivery.",
          bullets: [
            "Docker containers",
            "CI/CD pipelines",
            "VPS setup and hardening",
            "Domains, DNS and SSL",
          ],
        },
      ],
      cta: {
        title: "Have a project? Let's talk",
        body: "Tell me what you need. I reply with next steps and a realistic plan.",
      },
    },
    contactPage: {
      title: "Contact",
      headBefore: "Let's ",
      headItalic: "build",
      headAfter: " something.",
      reply: "I usually reply within 24h",
      email: { label: "Email", copy: "Copy", mail: "Open mail app", copied: "Copied ✓", failed: "Copy failed. Use the mail app." },
      whatsapp: { label: "WhatsApp", open: "Open" },
      form: {
        label: "Form",
        open: "Write a message",
        close: "Close",
        name: "Name",
        email: "Your email",
        subject: "Subject",
        message: "Message",
        submit: "Send message",
        sending: "Sending...",
        invalidName: "Enter your name.",
        invalidEmail: "Enter a valid email.",
        invalidSubject: "Add a subject.",
        invalidMessage: "Write a message.",
        sent: "message sent · I usually reply within 24h",
        error: "The message could not be sent. Try email or WhatsApp.",
      },
    },
    palette: {
      open: "Open command palette",
      placeholder: "Type a command or search...",
      empty: "No match",
      results: "results",
      close: "Close",
      hint: "↵ to run · esc to close",
      groups: { navigate: "Navigate", projects: "Projects", actions: "Actions" },
      actions: {
        copyEmail: "Copy email",
        whatsapp: "Open WhatsApp",
        cvEn: "Download CV (English)",
        cvFr: "Download CV (French)",
        theme: "Toggle theme",
        lang: "Switch to French",
      },
      egg: {
        label: "sudo hire forlan",
        cmd: "$ sudo hire forlan",
        password: "[sudo] password for recruiter: ********",
        granted: "access granted ✓",
        opening: "opening WhatsApp…",
        link: "tap here if it did not open",
      },
    },
    footer: { build: "deployed from Douala", cv: "CV" },
  },
  fr: {
    meta: {
      title: "Nk Forlan | Ingénieur Full-Stack & DevOps à Douala",
      description:
        "Portfolio de Nk Forlan, ingénieur full-stack et DevOps à Douala, au Cameroun. Applications web, APIs, DevOps et sites d'entreprise, du modèle de données au serveur de production.",
    },
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      services: "Services",
      resume: "CV",
      contact: "Contact",
    },
    actions: {
      viewProjects: "Voir les projets",
      contactMe: "Me contacter",
      downloadCv: "Télécharger le CV",
      englishCv: "CV anglais",
      frenchCv: "CV français",
      unavailable: "Bientôt disponible",
      viewCaseStudy: "Voir l'étude de cas",
      viewLive: "Démo en ligne",
      viewRepo: "Dépôt",
      backToProjects: "Retour aux projets",
      emailMe: "Email",
      openMailApp: "Ouvrir l'app mail",
      openGmail: "Ouvrir Gmail",
      copyEmail: "Copier l'email",
      copiedEmail: "Email copié.",
      whatsapp: "WhatsApp",
      github: "GitHub",
      linkedin: "LinkedIn",
      theme: "Thème",
      menu: "Menu",
      letsTalk: "Parlons-en",
      skipToContent: "Aller au contenu",
      mainNav: "Navigation principale",
      mobileNav: "Navigation mobile",
    },
    hero: {
      status: "Disponible · Douala, CM · UTC+1",
      statusShort: "Disponible · Douala",
      clock: "à Douala",
      lead: "Je",
      ship: "déploie",
      words: ["des SaaS.", "des API.", "des pipelines.", "des produits."],
      sentence: "Je déploie des SaaS, des API, des pipelines et des produits.",
      sub: "Ingénieur full-stack et DevOps. Du modèle de données au serveur de production.",
      primary: "Voir mes projets",
      copy: "Copier l'email",
      copied: "Copié ✓",
      copyFailed: "Copie impossible. Utilisez la page Contact.",
      counters: [
        { value: 7, label: "projets" },
        { value: 4, label: "projets d'équipe" },
        { value: 2, label: "langues" },
      ],
      chips: { ci: "CI réussie · main", deploy: "production · déploiement", langs: "EN / FR" },
      marquee: ["FULL-STACK", "DEVOPS", "SAAS", "CONCEPTION D'API", "CI/CD"],
    },
    about: {
      intro: "Je conçois et livre de vrais produits, pour de vraies entreprises.",
      paragraphs: [
        "Ingénieur full-stack et DevOps à Douala. Je modélise les données d'abord, je travaille en tickets et merge requests, et je mène un produit du cahier des charges à un serveur avec un domaine.",
        "En dehors du code, je suis répétiteur de mathématiques expérimenté. Enseigner m'aide à expliquer simplement les choses difficiles.",
      ],
      meta: "Douala, Cameroun · Ouvert au travail à distance · EN / FR",
      photoCaption: "Douala, 2026",
      now: {
        title: "En ce moment",
        updated: "Mis à jour nov. 2026",
        items: [
          "Livraison de produits SaaS avec de petites équipes.",
          "BTech 3e année à l'IUC : DevOps & Kubernetes, Administration réseau.",
          "Travail backend sur des APIs NestJS.",
          "Construction de ce portfolio.",
        ],
      },
      pathTitle: "Parcours",
    },
    skills: {
      title: "Stack technique",
      legendTitle: "Légende des niveaux",
      filterLabel: "Filtrer par groupe",
      filterAll: "Tous",
      usedIn: "Utilisé dans",
      close: "Fermer",
      canvasLabel: "Carte de la stack. Chaque logo ouvre son niveau et les projets où je l'ai utilisé.",
      levels: {
        expert: { label: "Expert", hint: "usage quotidien en production" },
        advanced: { label: "Avancé", hint: "projets réels livrés avec" },
        working: { label: "Notions pratiques", hint: "utilisé en cours ou en projets perso" },
      },
    },
    proSkills: {
      title: "Compétences professionnelles",
      items: [
        { icon: "lucide:blocks", short: true, title: "Architecture logicielle & conception de systèmes", proof: "Structure claire, conception centrée sur les données, systèmes qui peuvent grandir." },
        { icon: "lucide:file-text", short: false, title: "Besoins & spécifications", proof: "Cahiers des charges et ERD validés par le client avant le code." },
        { icon: "lucide:layout-dashboard", short: false, title: "Livraison agile par tickets", proof: "Sprints, tableaux, petites merge requests et critères de fin clairs." },
        { icon: "lucide:git-pull-request", short: true, title: "Revue de code & rigueur Git", proof: "Rebase avant merge, CI au vert obligatoire, quality gates." },
        { icon: "lucide:flask-conical", short: false, title: "Développement test-first", proof: "Tests écrits avec la fonctionnalité, ou avant." },
        { icon: "lucide:users", short: true, title: "Leadership technique", proof: "Je dirige de petites équipes : cadrage, tickets, revue de code, livraison." },
        { icon: "lucide:languages", short: false, title: "Communication client (EN/FR)", proof: "Je transforme un besoin métier en logiciel et je l'explique simplement." },
        { icon: "lucide:rocket", short: true, title: "Esprit production", proof: "Serveurs, domaines, supervision. Un projet est fini quand il est en ligne." },
      ],
    },
    projects: {
      title: "Projets choisis",
      all: "Tous les projets",
      allTitle: "Projets",
      count: "projets",
      filterLabel: "Filtrer les projets",
      filters: { all: "Tous", saas: "SaaS", client: "Client", team: "Équipe", devops: "DevOps" },
      emptyFilter: "Aucun projet dans ce filtre pour l'instant.",
    },
    projectDetail: {
      back: "Tous les projets",
      role: "Mon rôle",
      team: "Équipe",
      year: "Année",
      status: "Statut",
      stack: "Stack",
      problem: "Problème",
      solution: "Solution",
      result: "Résultat",
      confidential: "Projet client, code privé",
      nextProject: "Projet suivant",
      onThisPage: "Sur cette page",
      sections: { overview: "Aperçu", architecture: "Architecture", highlights: "Points forts", learning: "Apprentissage" },
      diagramLabel: "Schéma d'architecture",
    },
    pipeline: {
      title: "Comment je livre",
      stages: [
        { key: "spec", title: "Spec", line: "Je rédige le cahier des charges que le client valide.", proof: "cahier des charges · EN/FR" },
        { key: "erd", title: "ERD", line: "Je modélise les données avant tout code.", proof: "entités · relations · contraintes" },
        { key: "tickets", title: "Tickets", line: "Le travail est découpé en petits tickets sur un tableau.", proof: "tableaux · sprints · tickets" },
        { key: "code", title: "Code", line: "Les tests d'abord. De petits changements.", proof: "NestJS · Next.js · TypeScript" },
        { key: "review", title: "Revue", line: "Rebase, merge request, revue. Rien n'est fusionné sans relecture.", proof: "gate SonarQube · merge requests" },
        { key: "ci", title: "CI", line: "Le pipeline doit être au vert avant la fusion.", proof: "GitLab CI · pipelines" },
        { key: "deploy", title: "Déploiement", line: "Domaine, SSL, serveur. Terminé = en ligne.", proof: "domaine · SSL · VPS" },
      ],
      terminalLabel: "Journal de déploiement",
    },
    education: {
      title: "Formation",
      items: [
        {
          period: "2024 – 2027 (prévu)",
          when: "2024–27",
          line: "3e année (2026-27). Cours en anglais, dont DevOps & Kubernetes.",
          title: "Bachelor of Technology (BTech) en Ingénierie Informatique",
          place: "Institut Universitaire de la Côte (IUC), Douala",
          body: "Actuellement en 3e année (2026-27). Les cours sont donnés en anglais, notamment DevOps & Kubernetes et Administration & supervision réseau.",
        },
        {
          period: "2021 – 2023",
          when: "2021–23",
          line: "GCE Advanced Level 2023. GCE Ordinary Level 2021.",
          title: "GCE Advanced Level (2023) et GCE Ordinary Level (2021)",
          place: "GBHS Bobongo Petit Paris",
          body: "GCE Ordinary Level en 2021 et GCE Advanced Level en 2023.",
        },
      ],
    },
    experience: {
      title: "Expérience",
      items: [
        {
          period: "24 août 2026 – 10 oct. 2026",
          when: "2026",
          line: "J'ai mené la conception et le développement de Stocky : architecture, modèle de données, authentification, déploiement sur un VPS.",
          title: "Stagiaire en ingénierie logicielle",
          place: "Fast and Sure Travel SARL, Douala",
          body: "Stage dans l'équipe IT de l'agence de Douala. J'ai mené la conception et le développement de Stocky, un SaaS multi-tenant, avec une petite équipe : architecture, modèle de données, authentification et déploiement sur un VPS avec son propre domaine.",
        },
        {
          // TODO: exact start and end dates of Easy Klin.
          period: "2026 (en cours)",
          when: "2026",
          line: "Tickets sur l'API NestJS avec tests, sur GitLab avec CI et SonarQube.",
          title: "Développeur backend (projet d'équipe)",
          place: "Easy Klin",
          body: "Développeur backend sur l'API NestJS d'une plateforme de pressing multi-agences. GitLab auto-hébergé, sprints par tickets, rebase avant merge request, pipelines CI, quality gate SonarQube et développement guidé par les tests. Plusieurs tickets livrés (profil client avec adresses, logique de combinaison de services du catalogue, comptage des ventes) avec leurs tests.",
        },
        {
          // TODO: add the start year of freelance work.
          period: "En cours",
          when: "En cours",
          line: "Applications et sites web pour des entreprises et institutions locales.",
          title: "Développeur full-stack freelance",
          place: "Indépendant",
          body: "Applications et sites web pour des entreprises et institutions locales : outils de back-office, services en ligne, plateformes éducatives et sites vitrines.",
        },
      ],
    },
    services: {
      title: "Ce que je construis",
      whatYouGet: "Ce que vous obtenez",
      items: [
        {
          icon: "lucide:layers",
          title: "SaaS & applications web",
          pitch: "Des plateformes web et des outils de back-office qui gèrent de vraies données métier.",
          bullets: [
            "Plateformes web avec rôles, données et comptes clients",
            "Tableaux de bord et outils d'administration",
            "APIs REST bien documentées",
            "Rôles et permissions",
          ],
        },
        {
          icon: "lucide:globe",
          title: "Sites web d'entreprise",
          pitch: "Des sites rapides et bilingues pour entreprises, organisations et professionnels.",
          bullets: [
            "Versions française et anglaise",
            "Pages rapides et adaptées au mobile",
            "Prêt pour le référencement (SEO)",
            "Formulaire de contact et lien WhatsApp",
          ],
        },
        {
          icon: "lucide:server",
          title: "DevOps & déploiement",
          pitch: "Du code sur un ordinateur à un site sécurisé en ligne, avec livraison automatique.",
          bullets: [
            "Conteneurs Docker",
            "Pipelines CI/CD",
            "Mise en place et sécurisation de VPS",
            "Domaines, DNS et SSL",
          ],
        },
      ],
      cta: {
        title: "Un projet ? Parlons-en",
        body: "Dites-moi votre besoin. Je réponds avec les prochaines étapes et un plan réaliste.",
      },
    },
    contactPage: {
      title: "Contact",
      headBefore: "",
      headItalic: "Construisons",
      headAfter: " quelque chose.",
      reply: "Je réponds en général sous 24 h",
      email: { label: "Email", copy: "Copier", mail: "Ouvrir l'app mail", copied: "Copié ✓", failed: "Copie impossible. Utilisez l'app mail." },
      whatsapp: { label: "WhatsApp", open: "Ouvrir" },
      form: {
        label: "Formulaire",
        open: "Écrire un message",
        close: "Fermer",
        name: "Nom",
        email: "Votre email",
        subject: "Sujet",
        message: "Message",
        submit: "Envoyer le message",
        sending: "Envoi...",
        invalidName: "Entrez votre nom.",
        invalidEmail: "Entrez un email valide.",
        invalidSubject: "Ajoutez un sujet.",
        invalidMessage: "Écrivez un message.",
        sent: "message envoyé · je réponds en général sous 24 h",
        error: "Le message n'a pas pu être envoyé. Essayez l'email ou WhatsApp.",
      },
    },
    palette: {
      open: "Ouvrir la palette de commandes",
      placeholder: "Tapez une commande ou cherchez...",
      empty: "Aucun résultat",
      results: "résultats",
      close: "Fermer",
      hint: "↵ pour lancer · échap pour fermer",
      groups: { navigate: "Aller à", projects: "Projets", actions: "Actions" },
      actions: {
        copyEmail: "Copier l'email",
        whatsapp: "Ouvrir WhatsApp",
        cvEn: "Télécharger le CV (anglais)",
        cvFr: "Télécharger le CV (français)",
        theme: "Changer de thème",
        lang: "Passer en anglais",
      },
      egg: {
        label: "sudo hire forlan",
        cmd: "$ sudo hire forlan",
        password: "[sudo] mot de passe pour recruteur : ********",
        granted: "accès autorisé ✓",
        opening: "ouverture de WhatsApp…",
        link: "touchez ici si rien ne s'ouvre",
      },
    },
    footer: { build: "déployé depuis Douala", cv: "CV" },
  },
} as const;

export { projects, type Project, type Localized } from "./projects";
export { skillGroups, type Skill, type SkillGroup, type SkillLevel } from "./skills";

// Logos for the second marquee row under the hero.
export const marqueeTech = [
  { name: "React", icon: "simple-icons:react" },
  { name: "Next.js", icon: "simple-icons:nextdotjs" },
  { name: "NestJS", icon: "simple-icons:nestjs" },
  { name: "PostgreSQL", icon: "simple-icons:postgresql" },
  { name: "Docker", icon: "simple-icons:docker" },
  { name: "GitLab CI", icon: "simple-icons:gitlab" },
  { name: "Cloudflare", icon: "simple-icons:cloudflare" },
  { name: "Flutter", icon: "simple-icons:flutter" },
] as const;

/** The hero cut-out as one object (srcset, sizes, biggest file). Null when there is no cutout.png. */
export function cutoutImage() {
  const cutout = profile.photos.cutout;
  if (!cutout || cutout.variants.length === 0) return null;
  const sorted = [...cutout.variants].sort((a, b) => a.width - b.width);
  const biggest = sorted[sorted.length - 1];
  return {
    src: biggest.src,
    width: biggest.width,
    height: biggest.height,
    srcset: sorted.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
    sizes: "(min-width: 768px) 40vw, 72vw",
  };
}

/** Lines of the deploy terminal under "How I ship". No numbers, nothing invented. */
export const deployLog = {
  title: "forlan@prod: ~/portfolio",
  illustrative: false,
  lines: [
    { kind: "cmd", text: "git push origin main" },
    { kind: "ok", label: "build passed", value: "" },
    { kind: "ok", label: "tests passed", value: "" },
    { kind: "ok", label: "deployed", value: "· nkforlan.tech" },
    { kind: "live", text: "live" },
  ],
} as const;

export const notFound = {
  en: { line: "404 · route not deployed", suggest: "suggest", back: "Return to main", fr: "Route non déployée." },
  fr: { line: "404 · route non déployée", suggest: "suggestions", back: "Retour à l'accueil", fr: "" },
} as const;
