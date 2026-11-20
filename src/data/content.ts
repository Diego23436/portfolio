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
  email: "nzokouforlan@gmail.com",
  phoneDisplay: "+237 690 409 736",
  whatsappNumber: "237690409736",
  whatsappGreeting: {
    en: "Hello Forlan, I visited your portfolio and would like to talk.",
    fr: "Bonjour Forlan, j'ai visité votre portfolio et j'aimerais discuter avec vous.",
  },
  github: "https://github.com/Diego23436",
  // No LinkedIn yet. Components only show the link when this is set.
  linkedin: null as string | null,
  // TODO: confirm the final URL once the site is deployed on Cloudflare Pages.
  siteUrl: "https://nk-forlan.pages.dev",
  resume: {
    en: "/resume/Nk%20Forlan%20CV%20EN.pdf",
    fr: "/resume/Nk%20Forlan%20CV%20FR.pdf",
  },
  photos: {
    portrait: {
      src: "/images/profile/forlan-portrait.jpg",
      alt: {
        en: "Portrait of Nk Forlan in a white shirt, smiling with a thumbs up on a village road",
        fr: "Portrait de Nk Forlan en chemise blanche, souriant, pouce levé, sur un chemin de terre",
      },
    },
    headshot: {
      src: "/images/profile/forlan-headshot.jpg",
      alt: {
        en: "Close portrait of Nk Forlan in a dark striped polo with a shoulder bag",
        fr: "Portrait rapproché de Nk Forlan en polo rayé sombre avec une sacoche",
      },
    },
    fullBody: {
      src: "/images/profile/forlan-fullbody.jpg",
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
      { value: "4", label: "Main products built and shipped" },
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
      // Interim list. Phase 5 replaces it with icons and levels.
      title: "Tech Stack",
      groups: [
        {
          title: "Frontend",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vite", "HTML/CSS"],
        },
        {
          title: "Backend",
          items: [
            "NestJS",
            "Node.js",
            "REST API design",
            "Prisma ORM",
            "Supabase",
            "FastAPI",
            "Auth & role-based access",
            "Mobile Money integration (CinetPay)",
          ],
        },
        { title: "Mobile", items: ["Flutter / Dart"] },
        {
          title: "Data",
          items: ["PostgreSQL", "Data modelling / ERD", "Row-Level Security & triggers", "MinIO object storage"],
        },
        {
          title: "DevOps & Cloud",
          items: [
            "Docker",
            "Git & Git workflows",
            "GitLab CI/CD",
            "SonarQube",
            "Linux VPS",
            "Domains, DNS & SSL",
            "Cloudflare Pages",
            "Kubernetes",
            "Networking & monitoring",
          ],
        },
        {
          title: "AI & Productivity",
          items: ["AI-assisted development with Claude Code", "Multi-agent workflows", "Prompt engineering"],
        },
        {
          title: "Creative & Docs",
          items: [
            "Motion design with GSAP",
            "Video narration with ElevenLabs",
            "Technical writing: specs, ERD, docs",
            "LaTeX",
          ],
        },
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
    },
    projectDetail: {
      visualLabel: "Case study",
      visualNote: "Architecture, features, and outcomes presented as a concise engineering story.",
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
      { value: "4", label: "Produits principaux conçus et livrés" },
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
      groups: [
        {
          title: "Frontend",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vite", "HTML/CSS"],
        },
        {
          title: "Backend",
          items: [
            "NestJS",
            "Node.js",
            "Conception d'API REST",
            "Prisma ORM",
            "Supabase",
            "FastAPI",
            "Authentification & accès par rôles",
            "Intégration Mobile Money (CinetPay)",
          ],
        },
        { title: "Mobile", items: ["Flutter / Dart"] },
        {
          title: "Données",
          items: [
            "PostgreSQL",
            "Modélisation de données / ERD",
            "Row-Level Security & triggers",
            "Stockage objet MinIO",
          ],
        },
        {
          title: "DevOps & Cloud",
          items: [
            "Docker",
            "Git & workflows Git",
            "GitLab CI/CD",
            "SonarQube",
            "VPS Linux",
            "Domaines, DNS & SSL",
            "Cloudflare Pages",
            "Kubernetes",
            "Réseaux & supervision",
          ],
        },
        {
          title: "IA & productivité",
          items: [
            "Développement assisté par IA avec Claude Code",
            "Workflows multi-agents",
            "Prompt engineering",
          ],
        },
        {
          title: "Création & documentation",
          items: [
            "Motion design avec GSAP",
            "Narration vidéo avec ElevenLabs",
            "Rédaction technique : cahiers des charges, ERD, docs",
            "LaTeX",
          ],
        },
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
    },
    projectDetail: {
      visualLabel: "Étude de cas",
      visualNote: "Architecture, fonctionnalités et résultats présentés comme une histoire technique concise.",
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

// NOTE: placeholder projects from the starter. Phase 4 replaces this array.
export const projects = [
  {
    slug: "mrbhms-hospital-management-system",
    stack: ["PHP", "Laravel 12", "MySQL", "Bootstrap", "Vite", "Railway"],
    repoUrl: "https://github.com/KD-James-Lewis/MRBHMS_INTERNSHIP_PROJECT",
    demoUrl: "https://mrbhmsinternshipproject-production.up.railway.app/",
    image: "/images/projects/mrbhms-logo.png",
    imageAlt: {
      en: "MRBHMS hospital management logo",
      fr: "Logo du système de gestion hospitalière MRBHMS",
    },
    repositoryStatus: {
      en: "Laravel internship project",
      fr: "Projet de stage Laravel",
    },
    title: {
      en: "MRBHMS Hospital Management System",
      fr: "Système de gestion hospitalière MRBHMS",
    },
    summary: {
      en: "A role-based hospital management system for staff, patients, medical records, documents, vitals, and lab test workflows.",
      fr: "Un système hospitalier par rôles pour gérer le personnel, les patients, les dossiers médicaux, les documents, les constantes et les examens de laboratoire.",
    },
    problem: {
      en: "Hospitals and small clinics can lose time when patient records, staff roles, lab requests, and documents are handled with scattered manual processes.",
      fr: "Les hôpitaux et petites cliniques perdent du temps lorsque les dossiers patients, rôles du personnel, demandes de laboratoire et documents sont gérés manuellement.",
    },
    solution: {
      en: "The application centralizes users, departments, dashboards, patient records, vital signs, medical documents, feedback, and lab test requests in a Laravel web system.",
      fr: "L'application centralise utilisateurs, départements, tableaux de bord, dossiers patients, constantes, documents médicaux, feedback et examens de laboratoire dans Laravel.",
    },
    highlights: {
      en: [
        "Role-based dashboards for admin, doctor, nurse, receptionist, patient, lab technician, and pharmacist",
        "Staff, patient, and department management workflows",
        "Medical records with vitals, diagnoses, consultations, prescriptions, and file downloads",
        "Lab test request, upload, pending-status, and result-download flow",
      ],
      fr: [
        "Tableaux de bord par rôles : admin, médecin, infirmier, réceptionniste, patient, laborantin et pharmacien",
        "Gestion du personnel, des patients et des départements",
        "Dossiers médicaux avec constantes, diagnostics, consultations, prescriptions et téléchargements",
        "Flux de demande, dépôt, statut et téléchargement des résultats de laboratoire",
      ],
    },
    learning: {
      en: "This project strengthened my Laravel MVC practice, role-based authorization thinking, database modeling, and deployment workflow for a real management system.",
      fr: "Ce projet a renforcé ma pratique de Laravel MVC, la gestion des rôles, la modélisation de base de données et le déploiement d'un vrai système de gestion.",
    },
  },
  {
    slug: "hnd-mentorship-registration",
    stack: ["HTML", "CSS", "JavaScript", "Firebase Firestore", "QRCode.js", "html2canvas"],
    repoUrl: "https://github.com/KD-James-Lewis/HND-MENTORSHIP",
    demoUrl: "https://hnd-mentorship.vercel.app/",
    image: "/images/projects/hnd-mentorship.webp",
    imageAlt: {
      en: "HND Mentorship event registration visual",
      fr: "Visuel d'inscription HND Mentorship",
    },
    repositoryStatus: {
      en: "Firebase registration tool",
      fr: "Outil d'inscription Firebase",
    },
    title: {
      en: "HND Mentorship Registration",
      fr: "Inscription HND Mentorship",
    },
    summary: {
      en: "A web registration form that stores participant data in Firestore and generates a downloadable QR-code entrance ticket.",
      fr: "Un formulaire web qui enregistre les participants dans Firestore et génère un ticket d'entrée téléchargeable avec QR code.",
    },
    problem: {
      en: "Manual event registration makes it difficult to avoid duplicate entries and produce simple proof of registration for attendees.",
      fr: "L'inscription manuelle à un événement rend difficile l'évitement des doublons et la génération d'une preuve d'inscription simple.",
    },
    solution: {
      en: "The form validates required fields, checks existing emails in Firestore, saves registration data, and generates a ticket with a QR code and download option.",
      fr: "Le formulaire valide les champs, vérifie les emails existants dans Firestore, enregistre les données et génère un ticket avec QR code téléchargeable.",
    },
    highlights: {
      en: [
        "Participant form with speciality and level selection",
        "Duplicate email check before saving",
        "Firestore-backed registration storage",
        "QR-code ticket generation and image download",
      ],
      fr: [
        "Formulaire participant avec spécialité et niveau",
        "Vérification des emails déjà inscrits",
        "Stockage des inscriptions avec Firestore",
        "Génération de ticket QR code et téléchargement en image",
      ],
    },
    learning: {
      en: "This project helped me connect frontend form behavior with a cloud database and think through the event-registration experience from submission to ticket delivery.",
      fr: "Ce projet m'a aidé à relier un formulaire frontend à une base cloud et à penser l'expérience d'inscription depuis l'envoi jusqu'au ticket.",
    },
  },
  {
    slug: "collisways-luggage-sharing-platform",
    stack: ["HTML", "CSS", "Bootstrap", "JavaScript", "PHP", "PDO", "MySQL"],
    repoUrl: "https://github.com/KD-James-Lewis/PROJECT_Z",
    demoUrl: "https://project-z-rmqa.vercel.app/",
    image: "/images/projects/collisways-logo.png",
    imageAlt: {
      en: "CollisWays luggage sharing logo",
      fr: "Logo CollisWays de partage de bagages",
    },
    repositoryStatus: {
      en: "Travel logistics prototype",
      fr: "Prototype logistique voyage",
    },
    title: {
      en: "CollisWays Luggage Sharing Platform",
      fr: "Plateforme de partage de bagages CollisWays",
    },
    summary: {
      en: "A prototype platform connecting travelers with unused luggage capacity to people who need to send packages to a destination.",
      fr: "Un prototype qui connecte les voyageurs ayant des kilos libres avec des personnes voulant envoyer des colis vers une destination.",
    },
    problem: {
      en: "Sending small packages across destinations can be expensive, while many travelers have unused luggage space during their trips.",
      fr: "L'envoi de petits colis peut coûter cher alors que beaucoup de voyageurs disposent encore d'espace libre dans leurs bagages.",
    },
    solution: {
      en: "The project presents a marketplace-style experience with landing pages, traveler discovery, authentication, registration, and dashboard screens.",
      fr: "Le projet propose une expérience de type marketplace avec pages de présentation, recherche de voyageurs, authentification, inscription et tableaux de bord.",
    },
    highlights: {
      en: [
        "Multi-page landing experience with about, contact, how-it-works, and traveler pages",
        "PHP/PDO authentication and registration flow",
        "Dashboard screens for profile, messages, notifications, and home",
        "Bootstrap-based responsive UI with travel-focused visual direction",
      ],
      fr: [
        "Expérience multipage avec à propos, contact, fonctionnement et voyageurs",
        "Flux d'authentification et d'inscription en PHP/PDO",
        "Écrans de tableau de bord : profil, messages, notifications et accueil",
        "Interface responsive avec Bootstrap et direction visuelle orientée voyage",
      ],
    },
    learning: {
      en: "This prototype helped me think through platform flows, user onboarding, database-backed authentication, and how landing pages support a product idea.",
      fr: "Ce prototype m'a aidé à réfléchir aux parcours plateforme, à l'onboarding, à l'authentification liée à une base et au rôle des pages marketing.",
    },
  },
  {
    slug: "car-rental-website-prototype",
    stack: ["HTML", "CSS", "JavaScript", "Boxicons", "Responsive Design"],
    repoUrl: "https://github.com/KD-James-Lewis/CAR-WEBSITE-PROTO-2",
    demoUrl: "https://car-website-proto-2.vercel.app/",
    image: "/images/projects/car-rental-hero.png",
    imageAlt: {
      en: "Car rental website hero visual",
      fr: "Visuel hero du site de location de voitures",
    },
    repositoryStatus: {
      en: "Frontend prototype",
      fr: "Prototype frontend",
    },
    title: {
      en: "Car Rental Website Prototype",
      fr: "Prototype de site de location de voitures",
    },
    summary: {
      en: "A responsive car-rental landing page prototype with booking inputs, service cards, sign-in/sign-up pages, reviews, and newsletter sections.",
      fr: "Un prototype responsive de location de voitures avec formulaire de réservation, cartes services, pages connexion/inscription, avis et newsletter.",
    },
    problem: {
      en: "A car-rental business needs a clear first-page experience that presents the offer, guides booking intent, and builds trust quickly.",
      fr: "Une entreprise de location automobile a besoin d'une page claire qui présente l'offre, guide la réservation et crée rapidement la confiance.",
    },
    solution: {
      en: "The prototype organizes the experience into a hero booking form, three-step rental flow, featured cars, about section, testimonials, and authentication pages.",
      fr: "Le prototype organise l'expérience avec un formulaire hero, un parcours en trois étapes, des voitures en avant, une section à propos, des avis et des pages d'authentification.",
    },
    highlights: {
      en: [
        "Responsive landing-page structure",
        "Booking-oriented hero form",
        "Vehicle service cards and testimonials",
        "Separate sign-in and sign-up page prototypes",
      ],
      fr: [
        "Structure responsive de landing page",
        "Formulaire hero orienté réservation",
        "Cartes véhicules et témoignages",
        "Prototypes de pages connexion et inscription",
      ],
    },
    learning: {
      en: "This project strengthened my frontend layout skills, section planning, responsive CSS practice, and early interaction design.",
      fr: "Ce projet a renforcé mes compétences en mise en page frontend, organisation de sections, CSS responsive et premières interactions.",
    },
  },
] as const;
