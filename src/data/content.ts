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
        "Portfolio of Nk Forlan, a full-stack and DevOps engineer in Douala, Cameroon. Multi-tenant SaaS, document marketplaces, back-office tools and business websites, from data model to production server.",
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
      chips: { ci: "CI passed · main", deploy: "stocky.host · deploying", langs: "EN / FR" },
      marquee: ["FULL-STACK", "DEVOPS", "SAAS", "API DESIGN", "CI/CD"],
    },
    focus: {
      title: "How I Work",
      intro: "Simple habits that make software easier to ship and easier to maintain.",
      items: [
        {
          title: "Data first",
          body: "I model the data with an ERD (entity-relationship diagram) before I write code. Clean architecture starts there.",
        },
        {
          title: "Team discipline",
          body: "Tickets, merge requests, CI pipelines and code review. Small changes, clear definitions of done.",
        },
        {
          title: "Done means online",
          body: "I take a product from the spec to a server with a domain. A project is finished when people can use it.",
        },
      ],
    },
    aboutPreview: {
      title: "I design and ship real products for real businesses.",
      body:
        "I am a full-stack and DevOps engineer from Douala. I build multi-tenant SaaS, document marketplaces, back-office tools and business websites, and I explain the tech in simple words.",
    },
    about: {
      title: "About me",
      paragraphs: [
        "I am a full-stack and DevOps engineer from Douala. I design and ship real products for real businesses: multi-tenant SaaS, document marketplaces, back-office tools and business websites.",
        "I like clean architecture, and I model the data before I code. I work with tickets, merge requests, CI pipelines and code review. I take a product from the specification to deployment on a server with its own domain.",
        "Outside code, I am an experienced mathematics tutor. Teaching makes me better at explaining hard things simply.",
      ],
      location: "Based in Douala, Cameroon. Open to remote work.",
      languages: "Languages: English (first language) and French, fully bilingual.",
    },
    skills: {
      title: "Tech Stack",
      intro: "The tools I use to build and ship. Levels are honest labels, not percentages.",
      legendTitle: "Level legend",
      filterLabel: "Filter by group",
      filterAll: "All",
      usedIn: "Used in",
      noProject: "No linked project yet",
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
      intro: "How I work with teams and clients, with proof from real projects.",
      items: [
        { icon: "lucide:blocks", short: true, title: "Software architecture & system design", proof: "Multi-tenant SaaS, microservices and data-first design." },
        { icon: "lucide:file-text", short: false, title: "Requirements & specifications", proof: "Specs and ERDs the client approves before I code." },
        { icon: "lucide:layout-dashboard", short: false, title: "Agile, ticket-based delivery", proof: "Sprints, boards, small merge requests and clear definitions of done." },
        { icon: "lucide:git-pull-request", short: true, title: "Code review & Git discipline", proof: "Rebase before merge, CI must pass, quality gates." },
        { icon: "lucide:flask-conical", short: false, title: "Test-first development", proof: "Tests written with or before the feature." },
        { icon: "lucide:users", short: true, title: "Technical leadership", proof: "I lead small teams: Stocky, SmartQueue, the clinic website." },
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
        { key: "erd", title: "ERD", line: "I model the data before any code.", proof: "8 entities · Oasis-Doc" },
        { key: "tickets", title: "Tickets", line: "Work is split into small tickets on a board.", proof: "28 tickets · Stocky" },
        { key: "code", title: "Code", line: "Tests first. Small changes.", proof: "NestJS · Next.js · TypeScript" },
        { key: "review", title: "Review", line: "Rebase, merge request, review. Nothing lands unread.", proof: "SonarQube gate · Easy Klin" },
        { key: "ci", title: "CI", line: "The pipeline must be green before merge.", proof: "GitLab CI · Easy Klin" },
        { key: "deploy", title: "Deploy", line: "Domain, SSL, server. Done means online.", proof: "stocky.host · VPS" },
      ],
      terminalLabel: "Example deploy log",
    },
    education: {
      title: "Education",
      items: [
        {
          period: "2024 – 2027 (expected)",
          title: "Bachelor of Technology (BTech) in Computer Science Engineering",
          place: "Institut Universitaire de la Côte (IUC), Douala",
          body: "Now in year 3 (2026-27). Courses are taught in English, including DevOps & Kubernetes and Network Management & Monitoring.",
        },
        {
          // TODO: add the years for GCE A-Level and O-Level.
          period: "",
          title: "GCE Advanced Level and GCE Ordinary Level",
          place: "GBHS Bobongo Petit Paris",
          body: "",
        },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          period: "24 Aug 2026 – 10 Oct 2026",
          title: "Software Engineering Intern",
          place: "Fast and Sure Travel SARL, Douala",
          body: "Worked in the IT team at the Douala branch. Led the design and build of Stocky, a multi-tenant SaaS, with a small team: architecture, data model, authentication, and deployment on a VPS with its own domain.",
        },
        {
          // TODO: add the dates of the Easy Klin project.
          period: "",
          title: "Backend Developer (team project)",
          place: "Easy Klin",
          body: "Backend developer on the NestJS API of a multi-agency laundry platform. Self-hosted GitLab, ticket-based sprints, rebase before merge request, CI pipelines, SonarQube quality gate and test-first work. Delivered several tickets (customer profile with addresses, catalogue service-combination logic, sales counting) with their tests.",
        },
        {
          // TODO: add the start year of freelance work.
          period: "Ongoing",
          title: "Freelance Full-Stack Developer",
          place: "Independent",
          body: "Web apps and websites for local businesses and institutions: document services, an immigration agency back office, an education quiz platform and a clinic website.",
        },
      ],
    },
    services: {
      title: "What I Can Build For You",
      intro:
        "Three ways I can help: a product, a website, or the delivery pipeline behind them.",
      whatYouGet: "What you get",
      items: [
        {
          icon: "lucide:layers",
          title: "SaaS & Web Applications",
          pitch: "Multi-tenant platforms and back-office tools that handle real business data.",
          bullets: [
            "Multi-tenant platforms with separate data per customer",
            "Dashboards and admin tools",
            "REST APIs with clean documentation",
            "Roles and permissions",
          ],
        },
        {
          icon: "lucide:globe",
          title: "Business Websites",
          pitch: "Fast, bilingual showcase websites for clinics, agencies and shops.",
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
        body: "Tell me what you need. I will reply with the next steps and a realistic plan.",
      },
    },
    resumePage: {
      title: "Resume",
      intro:
        "Download the CV version that matches your language preference. English and French versions are available.",
      ready: "PDF ready for download.",
    },
    contactPage: {
      title: "Contact",
      intro:
        "For full-time roles, freelance projects or remote collaboration, email or WhatsApp is the fastest way to reach me.",
      responseNote: "I usually reply with my availability, how I can help and the next steps.",
      form: {
        title: "Send a Message",
        intro:
          "Write the message here and send it directly from the portfolio.",
        name: "Name",
        namePlaceholder: "Your full name",
        email: "Your Email",
        emailPlaceholder: "you@example.com",
        subject: "Subject",
        subjectPlaceholder: "Job offer, freelance project, collaboration...",
        message: "Message",
        messagePlaceholder: "Tell me what you would like to discuss.",
        submit: "Send Message",
        sending: "Sending...",
        feedback: "Message sent. Thank you for reaching out.",
        error: "The message could not be sent. Please try again or use the email button above.",
      },
      whatsappForm: {
        title: "Prepare a WhatsApp Message",
        intro:
          "Write your WhatsApp message here and open it ready to send.",
        name: "Name",
        namePlaceholder: "Your full name",
        message: "Message",
        messagePlaceholder: "Tell me what you would like to discuss on WhatsApp.",
        submit: "Open WhatsApp",
        feedback: "WhatsApp should open with your message ready.",
        greeting: "Hello Forlan, my name is {name}.",
      },
    },
    footer:
      "Full-stack and DevOps engineer in Douala. I build and ship reliable web products.",
  },
  fr: {
    meta: {
      title: "Nk Forlan | Ingénieur Full-Stack & DevOps à Douala",
      description:
        "Portfolio de Nk Forlan, ingénieur full-stack et DevOps à Douala, au Cameroun. SaaS multi-tenant, marketplaces de documents, outils de back-office et sites vitrines, du modèle de données au serveur de production.",
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
      chips: { ci: "CI réussie · main", deploy: "stocky.host · déploiement", langs: "EN / FR" },
      marquee: ["FULL-STACK", "DEVOPS", "SAAS", "CONCEPTION D'API", "CI/CD"],
    },
    focus: {
      title: "Ma façon de travailler",
      intro: "Des habitudes simples qui rendent un logiciel plus facile à livrer et à maintenir.",
      items: [
        {
          title: "Les données d'abord",
          body: "Je modélise les données avec un MCD/ERD (schéma entité-relation) avant d'écrire du code. Une bonne architecture commence là.",
        },
        {
          title: "Rigueur d'équipe",
          body: "Tickets, merge requests, pipelines CI et revue de code. Des changements courts et des critères de fin clairs.",
        },
        {
          title: "Terminé = en ligne",
          body: "Je mène un produit de la spécification jusqu'à un serveur avec un nom de domaine. Un projet est fini quand on peut l'utiliser.",
        },
      ],
    },
    aboutPreview: {
      title: "Je conçois et livre de vrais produits pour de vraies entreprises.",
      body:
        "Je suis ingénieur full-stack et DevOps, basé à Douala. Je construis des SaaS multi-tenant, des marketplaces de documents, des outils de back-office et des sites vitrines, et j'explique la technique avec des mots simples.",
    },
    about: {
      title: "À propos de moi",
      paragraphs: [
        "Je suis ingénieur full-stack et DevOps, basé à Douala. Je conçois et livre de vrais produits pour de vraies entreprises : SaaS multi-tenant, marketplaces de documents, outils de back-office et sites vitrines.",
        "J'aime les architectures propres et je modélise les données avant de coder. Je travaille avec des tickets, des merge requests, des pipelines CI et de la revue de code. Je mène un produit de la spécification jusqu'au déploiement sur un serveur avec son propre domaine.",
        "En dehors du code, je suis un répétiteur de mathématiques expérimenté. Enseigner m'aide à expliquer simplement les choses difficiles.",
      ],
      location: "Basé à Douala, au Cameroun. Ouvert au travail à distance.",
      languages: "Langues : anglais (langue maternelle) et français, bilingue complet.",
    },
    skills: {
      title: "Stack technique",
      intro: "Les outils que j'utilise pour construire et livrer. Les niveaux sont des étiquettes honnêtes, pas des pourcentages.",
      legendTitle: "Légende des niveaux",
      filterLabel: "Filtrer par groupe",
      filterAll: "Tous",
      usedIn: "Utilisé dans",
      noProject: "Pas encore de projet lié",
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
      intro: "Ma façon de travailler avec des équipes et des clients, avec des preuves issues de projets réels.",
      items: [
        { icon: "lucide:blocks", short: true, title: "Architecture logicielle & conception de systèmes", proof: "SaaS multi-tenant, microservices et conception centrée sur les données." },
        { icon: "lucide:file-text", short: false, title: "Besoins & spécifications", proof: "Cahiers des charges et ERD validés par le client avant le code." },
        { icon: "lucide:layout-dashboard", short: false, title: "Livraison agile par tickets", proof: "Sprints, tableaux, petites merge requests et critères de fin clairs." },
        { icon: "lucide:git-pull-request", short: true, title: "Revue de code & rigueur Git", proof: "Rebase avant merge, CI au vert obligatoire, quality gates." },
        { icon: "lucide:flask-conical", short: false, title: "Développement test-first", proof: "Tests écrits avec la fonctionnalité, ou avant." },
        { icon: "lucide:users", short: true, title: "Leadership technique", proof: "Je dirige de petites équipes : Stocky, SmartQueue, le site de la clinique." },
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
        { key: "erd", title: "ERD", line: "Je modélise les données avant tout code.", proof: "8 entités · Oasis-Doc" },
        { key: "tickets", title: "Tickets", line: "Le travail est découpé en petits tickets sur un tableau.", proof: "28 tickets · Stocky" },
        { key: "code", title: "Code", line: "Les tests d'abord. De petits changements.", proof: "NestJS · Next.js · TypeScript" },
        { key: "review", title: "Revue", line: "Rebase, merge request, revue. Rien n'est fusionné sans relecture.", proof: "gate SonarQube · Easy Klin" },
        { key: "ci", title: "CI", line: "Le pipeline doit être au vert avant la fusion.", proof: "GitLab CI · Easy Klin" },
        { key: "deploy", title: "Déploiement", line: "Domaine, SSL, serveur. Terminé = en ligne.", proof: "stocky.host · VPS" },
      ],
      terminalLabel: "Exemple de journal de déploiement",
    },
    education: {
      title: "Formation",
      items: [
        {
          period: "2024 – 2027 (prévu)",
          title: "Bachelor of Technology (BTech) en Ingénierie Informatique",
          place: "Institut Universitaire de la Côte (IUC), Douala",
          body: "Actuellement en 3e année (2026-27). Les cours sont donnés en anglais, notamment DevOps & Kubernetes et Administration & supervision réseau.",
        },
        {
          // TODO: add the years for GCE A-Level and O-Level.
          period: "",
          title: "GCE Advanced Level et GCE Ordinary Level",
          place: "GBHS Bobongo Petit Paris",
          body: "",
        },
      ],
    },
    experience: {
      title: "Expérience",
      items: [
        {
          period: "24 août 2026 – 10 oct. 2026",
          title: "Stagiaire en ingénierie logicielle",
          place: "Fast and Sure Travel SARL, Douala",
          body: "Stage dans l'équipe IT de l'agence de Douala. J'ai mené la conception et le développement de Stocky, un SaaS multi-tenant, avec une petite équipe : architecture, modèle de données, authentification et déploiement sur un VPS avec son propre domaine.",
        },
        {
          // TODO: add the dates of the Easy Klin project.
          period: "",
          title: "Développeur backend (projet d'équipe)",
          place: "Easy Klin",
          body: "Développeur backend sur l'API NestJS d'une plateforme de pressing multi-agences. GitLab auto-hébergé, sprints par tickets, rebase avant merge request, pipelines CI, quality gate SonarQube et développement guidé par les tests. Plusieurs tickets livrés (profil client avec adresses, logique de combinaison de services du catalogue, comptage des ventes) avec leurs tests.",
        },
        {
          // TODO: add the start year of freelance work.
          period: "En cours",
          title: "Développeur full-stack freelance",
          place: "Indépendant",
          body: "Applications et sites web pour des entreprises et institutions locales : services de documents, back-office d'une agence d'immigration, plateforme de quiz éducative et site de clinique.",
        },
      ],
    },
    services: {
      title: "Ce que je peux construire pour vous",
      intro:
        "Trois façons de vous aider : un produit, un site web, ou la chaîne de livraison qui les met en ligne.",
      whatYouGet: "Ce que vous obtenez",
      items: [
        {
          icon: "lucide:layers",
          title: "SaaS & applications web",
          pitch: "Des plateformes multi-tenant et des outils de back-office qui gèrent de vraies données métier.",
          bullets: [
            "Plateformes multi-tenant avec données séparées par client",
            "Tableaux de bord et outils d'administration",
            "APIs REST bien documentées",
            "Rôles et permissions",
          ],
        },
        {
          icon: "lucide:globe",
          title: "Sites web d'entreprise",
          pitch: "Des sites vitrines rapides et bilingues pour cliniques, agences et boutiques.",
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
        body: "Dites-moi ce dont vous avez besoin. Je vous répondrai avec les prochaines étapes et un plan réaliste.",
      },
    },
    resumePage: {
      title: "CV",
      intro:
        "Téléchargez la version du CV qui correspond à votre préférence linguistique. Les versions anglaise et française sont disponibles.",
      ready: "PDF prêt au téléchargement.",
    },
    contactPage: {
      title: "Contact",
      intro:
        "Pour un poste à temps plein, une mission freelance ou une collaboration à distance, l'email et WhatsApp sont les moyens les plus rapides pour me joindre.",
      responseNote:
        "Je réponds généralement avec ma disponibilité, la façon dont je peux aider et les prochaines étapes.",
      form: {
        title: "Envoyer un message",
        intro:
          "Écrivez le message ici et envoyez-le directement depuis le portfolio.",
        name: "Nom",
        namePlaceholder: "Votre nom complet",
        email: "Votre email",
        emailPlaceholder: "vous@example.com",
        subject: "Sujet",
        subjectPlaceholder: "Offre d'emploi, mission freelance, collaboration...",
        message: "Message",
        messagePlaceholder: "Expliquez ce que vous souhaitez discuter.",
        submit: "Envoyer le message",
        sending: "Envoi...",
        feedback: "Message envoyé. Merci pour votre prise de contact.",
        error: "Le message n'a pas pu être envoyé. Veuillez réessayer ou utiliser le bouton email ci-dessus.",
      },
      whatsappForm: {
        title: "Préparer un message WhatsApp",
        intro:
          "Écrivez votre message WhatsApp ici et ouvrez-le prêt à envoyer.",
        name: "Nom",
        namePlaceholder: "Votre nom complet",
        message: "Message",
        messagePlaceholder: "Expliquez ce que vous souhaitez discuter sur WhatsApp.",
        submit: "Ouvrir WhatsApp",
        feedback: "WhatsApp devrait s'ouvrir avec votre message prêt.",
        greeting: "Bonjour Forlan, je m'appelle {name}.",
      },
    },
    footer:
      "Ingénieur full-stack et DevOps à Douala. Je conçois et mets en ligne des produits web fiables.",
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

/**
 * Lines of the fake deploy terminal under "How I ship".
 * TODO: the numbers (12.4s, 48 passed) are illustrative. Replace them with real ones if Forlan gives them.
 */
export const deployLog = {
  title: "forlan@prod: ~/portfolio",
  illustrative: true,
  lines: [
    { kind: "cmd", text: "git push origin main" },
    { kind: "ok", label: "build", value: "12.4s" },
    { kind: "ok", label: "test", value: "48 passed" },
    { kind: "ok", label: "deploy", value: "nkforlan.tech" },
    { kind: "live", text: "live" },
  ],
} as const;
