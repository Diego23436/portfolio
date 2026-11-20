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
      eyebrow: "Full-Stack & DevOps Engineer · Douala, Cameroon",
      title: "I build and ship reliable web products, from data model to production server.",
      intro:
        "React and Next.js on the front end. NestJS and Supabase on the back end. PostgreSQL for data. Docker and CI/CD to deliver.",
      availability: "Open to full-time roles, freelance projects and remote collaboration.",
      badge: "Available for work",
      cardLabel: "Portfolio",
    },
    // TODO: confirm these stats with Forlan before publishing.
    stats: [
      { value: "7", label: "Projects for real clients, teams and businesses" },
      { value: "EN / FR", label: "Bilingual delivery" },
      { value: "Full-stack + DevOps", label: "From data model to server" },
    ],
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
        { icon: "lucide:file-text", short: false, title: "Requirements & specifications", proof: "I write specifications (cahiers des charges) and ERDs that clients approve before coding." },
        { icon: "lucide:layout-dashboard", short: false, title: "Agile, ticket-based delivery", proof: "Sprints, boards, small merge requests and clear definitions of done." },
        { icon: "lucide:git-pull-request", short: true, title: "Code review & Git discipline", proof: "Rebase before merge, CI must pass, quality gates." },
        { icon: "lucide:flask-conical", short: false, title: "Test-first development", proof: "Tests written with or before the feature." },
        { icon: "lucide:users", short: true, title: "Technical leadership", proof: "I lead small teams, split work and unblock teammates (Stocky, Devops003, the clinic website)." },
        { icon: "lucide:languages", short: false, title: "Client communication (EN/FR)", proof: "I turn business needs into working software and explain the tech in simple words." },
        { icon: "lucide:rocket", short: true, title: "Production mindset", proof: "Deployment, domains, servers and monitoring. A project is done when it is online." },
      ],
    },
    projects: {
      title: "Featured Projects",
      intro:
        "Four main products, from SaaS to DevOps. Some client code is private, so each project has a case study that explains the problem, the stack and my role.",
      allTitle: "Project Case Studies",
      allIntro:
        "Each project page explains the problem, the solution, my role and what I learned.",
      moreTitle: "More projects",
      moreIntro: "Smaller projects and client work.",
    },
    projectDetail: {
      role: "My role",
      team: "Team",
      status: "Status",
      stack: "Stack",
      confidential: "Client project, code private",
      nextProject: "Next project",
      caseStudy: "Case study",
      problem: "Problem",
      solution: "Solution",
      highlights: "Highlights",
      learning: "Learning",
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
      eyebrow: "Ingénieur Full-Stack & DevOps · Douala, Cameroun",
      title: "Je conçois et mets en ligne des produits web fiables, du modèle de données au serveur de production.",
      intro:
        "React et Next.js côté front. NestJS et Supabase côté back. PostgreSQL pour les données. Docker et CI/CD pour livrer.",
      availability: "Ouvert aux postes à temps plein, aux missions freelance et à la collaboration à distance.",
      badge: "Disponible",
      cardLabel: "Portfolio",
    },
    // TODO: confirm these stats with Forlan before publishing.
    stats: [
      { value: "7", label: "Projets pour de vrais clients, équipes et entreprises" },
      { value: "EN / FR", label: "Livraison bilingue" },
      { value: "Full-stack + DevOps", label: "Du modèle de données au serveur" },
    ],
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
        { icon: "lucide:file-text", short: false, title: "Besoins & spécifications", proof: "Je rédige des cahiers des charges et des ERD que les clients valident avant le code." },
        { icon: "lucide:layout-dashboard", short: false, title: "Livraison agile par tickets", proof: "Sprints, tableaux, petites merge requests et critères de fin clairs." },
        { icon: "lucide:git-pull-request", short: true, title: "Revue de code & rigueur Git", proof: "Rebase avant merge, CI au vert obligatoire, quality gates." },
        { icon: "lucide:flask-conical", short: false, title: "Développement test-first", proof: "Tests écrits avec la fonctionnalité, ou avant." },
        { icon: "lucide:users", short: true, title: "Leadership technique", proof: "Je dirige de petites équipes, découpe le travail et débloque mes coéquipiers (Stocky, Devops003, site de la clinique)." },
        { icon: "lucide:languages", short: false, title: "Communication client (EN/FR)", proof: "Je transforme un besoin métier en logiciel qui fonctionne et j'explique la technique avec des mots simples." },
        { icon: "lucide:rocket", short: true, title: "Esprit production", proof: "Déploiement, domaines, serveurs et supervision. Un projet est terminé quand il est en ligne." },
      ],
    },
    projects: {
      title: "Projets en avant",
      intro:
        "Quatre produits principaux, du SaaS au DevOps. Une partie du code client est privée : chaque projet a donc une étude de cas qui explique le problème, la stack et mon rôle.",
      allTitle: "Études de cas",
      allIntro:
        "Chaque page projet explique le problème, la solution, mon rôle et ce que j'ai appris.",
      moreTitle: "Autres projets",
      moreIntro: "Des projets plus petits et du travail pour des clients.",
    },
    projectDetail: {
      role: "Mon rôle",
      team: "Équipe",
      status: "Statut",
      stack: "Stack",
      confidential: "Projet client, code privé",
      nextProject: "Projet suivant",
      caseStudy: "Étude de cas",
      problem: "Problème",
      solution: "Solution",
      highlights: "Points forts",
      learning: "Apprentissage",
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
