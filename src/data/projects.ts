export type Localized<T = string> = { en: T; fr: T };

export type Project = {
  slug: string;
  /** "main" projects get a full case study. "more" projects get a short card and page. */
  tier: "main" | "more";
  title: string;
  kind: Localized;
  summary: Localized;
  role: Localized;
  /** null = unknown, the team line is hidden. */
  team: Localized | null;
  /** true = client project: hide the repository button and show a "code private" label. */
  confidential: boolean;
  /** null = unknown, the status badge is hidden. */
  status: Localized | null;
  problem: Localized | null;
  solution: Localized | null;
  highlights: Localized<readonly string[]>;
  learning: Localized | null;
  /** Empty = unknown, the stack chips are hidden. */
  stack: readonly string[];
  /** Swap the .svg for a .webp screenshot later. */
  image: string;
  imageAlt: Localized;
  repoUrl: string | null;
  demoUrl: string | null;
};

export const projects: readonly Project[] = [
  // ---------------------------------------------------------------- MAIN
  {
    slug: "stocky",
    tier: "main",
    title: "Stocky",
    kind: { en: "SaaS for electronics shops", fr: "SaaS pour boutiques d'électronique" },
    summary: {
      en: "A multi-tenant SaaS for phone, laptop and accessory shops: stock, sales, trade-ins, returns, repairs and subscriptions.",
      fr: "Un SaaS multi-tenant pour boutiques de téléphones, ordinateurs et accessoires : stock, ventes, reprises, retours, réparations et abonnements.",
    },
    role: {
      en: "Lead developer in a team of 3. I did the architecture and data model, authentication, the audit log, subscriptions, and the domain and server setup.",
      fr: "Développeur principal dans une équipe de 3. J'ai réalisé l'architecture et le modèle de données, l'authentification, le journal d'audit, les abonnements, ainsi que le domaine et le serveur.",
    },
    team: { en: "Team of 3", fr: "Équipe de 3" },
    confidential: false,
    // TODO: ask Forlan for the status (In production / Beta / In development).
    status: null,
    problem: {
      en: "Phone, laptop and accessory shops in Cameroon track stock, sales, trade-ins and repairs on paper or in Excel. They lose items and money.",
      fr: "Les boutiques de téléphones, d'ordinateurs et d'accessoires au Cameroun suivent leur stock, leurs ventes, leurs reprises et leurs réparations sur papier ou sur Excel. Elles perdent des articles et de l'argent.",
    },
    solution: {
      en: "A multi-tenant SaaS: one platform, many shops, and each shop has its own separate data. It handles stock, sales, trade-ins, returns, repairs and SaaS subscriptions.",
      fr: "Un SaaS multi-tenant : une seule plateforme, plusieurs boutiques, et chaque boutique a ses propres données séparées. Il gère le stock, les ventes, les reprises, les retours, les réparations et les abonnements SaaS.",
    },
    highlights: {
      en: [
        "Multi-tenant design with separate data for each shop",
        "Audit log and SaaS subscriptions",
        "Deployed on a Hostinger VPS with its own domain, stocky.host",
        "GitHub Projects board with 28 tickets",
        "AI-assisted development with Claude Code (builder and reviewer agents)",
        "My internship project at Fast and Sure Travel. The three of us decide together.",
      ],
      fr: [
        "Conception multi-tenant avec des données séparées pour chaque boutique",
        "Journal d'audit et abonnements SaaS",
        "Déployé sur un VPS Hostinger avec son propre domaine, stocky.host",
        "Tableau GitHub Projects avec 28 tickets",
        "Développement assisté par IA avec Claude Code (agents constructeur et relecteur)",
        "Mon projet de stage chez Fast and Sure Travel. Nous décidons à trois.",
      ],
    },
    // Draft text, based on the facts above. Forlan to review.
    learning: {
      en: "Leading with shared decisions, a ticket board and a data model drawn first kept a small team moving fast. Putting the product on a real server and domain showed me what \"done\" means.",
      fr: "Décider ensemble, avec un tableau de tickets et un modèle de données dessiné d'abord, a permis à une petite équipe d'avancer vite. Mettre le produit sur un vrai serveur avec un domaine m'a montré ce que « terminé » veut dire.",
    },
    stack: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "TypeScript", "Hostinger VPS"],
    image: "/images/projects/stocky.svg",
    imageAlt: {
      en: "Stocky cover: stacked boxes icon on a navy background",
      fr: "Couverture de Stocky : icône de boîtes empilées sur fond bleu marine",
    },
    // TODO: add the repository link (or mark the project private).
    repoUrl: null,
    // TODO: confirm with Forlan that https://stocky.host is live, then set demoUrl.
    demoUrl: null,
  },
  {
    slug: "oasis-doc",
    tier: "main",
    title: "Oasis-Doc",
    kind: { en: "Document services marketplace", fr: "Marketplace de services de documents" },
    summary: {
      en: "A bilingual (FR/EN) marketplace for official document services, with a cart, checkout and a WhatsApp payment handoff.",
      fr: "Une marketplace bilingue (FR/EN) de services de documents officiels, avec panier, paiement et transfert vers WhatsApp.",
    },
    role: {
      en: "Solo developer, built for a client.",
      fr: "Développeur unique, projet réalisé pour un client.",
    },
    team: { en: "Solo", fr: "Seul" },
    confidential: false,
    // TODO: ask Forlan for the status.
    status: null,
    problem: {
      en: "People who need official documents (legalisation, getting a document, certified translation, diploma equivalence) must move between offices and get no clear tracking.",
      fr: "Les personnes qui ont besoin de documents officiels (légalisation, obtention d'un document, traduction certifiée, équivalence de diplôme) se déplacent entre plusieurs bureaux sans suivi clair.",
    },
    solution: {
      en: "A bilingual marketplace for document services, with a cart, a checkout and a payment handoff on WhatsApp. Diploma equivalence is the flagship service.",
      fr: "Une marketplace bilingue de services de documents, avec panier, paiement et transfert vers WhatsApp. L'équivalence de diplôme est le service phare.",
    },
    highlights: {
      en: [
        "Each order has a UUID and a human-readable reference",
        "Data model of 8 entities, designed as an ERD first",
        "Cart, checkout and WhatsApp payment handoff",
        "A GSAP motion-design promo video made for the product",
      ],
      fr: [
        "Chaque commande a un UUID et une référence lisible",
        "Modèle de données de 8 entités, dessiné d'abord en ERD",
        "Panier, paiement et transfert de paiement vers WhatsApp",
        "Une vidéo promo en motion design GSAP réalisée pour le produit",
      ],
    },
    // Draft text, based on the facts above. Forlan to review.
    learning: {
      en: "Designing the 8-entity data model before writing screens made the cart, orders and references simple to build. A human-readable reference makes support easier for the client.",
      fr: "Dessiner le modèle de 8 entités avant les écrans a rendu le panier, les commandes et les références simples à construire. Une référence lisible facilite le support pour le client.",
    },
    stack: ["React", "Vite", "Tailwind CSS", "Supabase", "Cloudflare Pages"],
    image: "/images/projects/oasis-doc.svg",
    imageAlt: {
      en: "Oasis-Doc cover: document icon on a navy background",
      fr: "Couverture d'Oasis-Doc : icône de document sur fond bleu marine",
    },
    repoUrl: "https://github.com/Dk202020-web/Oasis-Doc",
    demoUrl: "https://oasis-doc.pages.dev",
  },
  {
    slug: "easy-klin",
    tier: "main",
    title: "Easy Klin",
    kind: { en: "Multi-agency laundry platform", fr: "Plateforme de pressing multi-agences" },
    summary: {
      en: "A mobile app, web admin and API for laundry businesses with several branches. A team project, where I worked on the backend.",
      fr: "Une application mobile, une administration web et une API pour des pressings avec plusieurs agences. Un projet d'équipe, sur lequel j'ai travaillé côté backend.",
    },
    role: {
      en: "Backend developer in a team, on the NestJS API (ek-api). This is a team project. I did not build the whole platform.",
      fr: "Développeur backend dans une équipe, sur l'API NestJS (ek-api). C'est un projet d'équipe. Je n'ai pas construit toute la plateforme.",
    },
    team: { en: "Team project", fr: "Projet d'équipe" },
    confidential: true,
    status: null,
    problem: {
      en: "Laundry and pressing businesses with several branches cannot follow orders, staff and prices across branches.",
      fr: "Les pressings avec plusieurs agences ne peuvent pas suivre les commandes, le personnel et les prix d'une agence à l'autre.",
    },
    solution: {
      en: "A mobile app plus a web admin and an API, with 4 roles: customer, agency staff, agency manager and administrator.",
      fr: "Une application mobile, une administration web et une API, avec 4 rôles : client, personnel d'agence, responsable d'agence et administrateur.",
    },
    highlights: {
      en: [
        "Ticket-based sprints on a self-hosted GitLab",
        "Merge requests with rebase, and green quality gates (SonarQube)",
        "Tests written for each feature, test-first",
        "My tickets: customer profile with addresses, catalogue service-combination logic, and sales counting",
      ],
      fr: [
        "Sprints par tickets sur un GitLab auto-hébergé",
        "Merge requests avec rebase, et quality gates au vert (SonarQube)",
        "Tests écrits pour chaque fonctionnalité, en test-first",
        "Mes tickets : profil client avec adresses, logique de combinaison de services du catalogue, et comptage des ventes",
      ],
    },
    // Draft text, based on the facts above. Forlan to review.
    learning: {
      en: "Working inside a strict team process taught me to keep changes small, rebase before review, and let the pipeline and the quality gate decide when code is ready.",
      fr: "Travailler dans un processus d'équipe strict m'a appris à garder des changements courts, à faire un rebase avant la revue, et à laisser le pipeline et la quality gate décider quand le code est prêt.",
    },
    stack: ["NestJS", "Next.js", "Flutter", "GitLab (self-hosted)", "CI/CD", "SonarQube"],
    image: "/images/projects/easy-klin.svg",
    imageAlt: {
      en: "Easy Klin cover: washing machine icon on a navy background",
      fr: "Couverture d'Easy Klin : icône de machine à laver sur fond bleu marine",
    },
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: "smartqueue",
    tier: "main",
    title: "SmartQueue (Devops003)",
    kind: { en: "Smart queue system", fr: "Système de file d'attente intelligent" },
    summary: {
      en: "A ticket-based smart queue system built as microservices, by a 4-member DevOps group that I formulated and administered.",
      fr: "Un système de file d'attente intelligent à tickets, construit en microservices par un groupe DevOps de 4 membres que j'ai formulé et administré.",
    },
    role: {
      en: "Project formulator and admin of the group. I defined the problem, split the work into tickets, ran code reviews and helped blocked members.",
      fr: "Formulateur du projet et administrateur du groupe. J'ai défini le problème, découpé le travail en tickets, mené les revues de code et aidé les membres bloqués.",
    },
    team: { en: "Team of 4", fr: "Équipe de 4" },
    confidential: false,
    // TODO: ask Forlan for the status.
    status: null,
    problem: {
      en: "Queues in clinics, banks and town halls are long and unfair.",
      fr: "Les files d'attente dans les cliniques, les banques et les mairies sont longues et injustes.",
    },
    solution: {
      en: "A ticket-based smart queue system built as microservices (small independent services, each doing one job).",
      fr: "Un système de file d'attente à tickets, construit en microservices (de petits services indépendants, chacun avec une seule mission).",
    },
    highlights: {
      en: [
        "Microservices architecture",
        "DevOps focus: containers, a pipeline and deployment",
        "I chose a lighter setup than full Kubernetes so the team could deliver",
        "Work split into tickets, with code reviews",
      ],
      fr: [
        "Architecture en microservices",
        "Accent DevOps : conteneurs, pipeline et déploiement",
        "J'ai choisi une configuration plus légère que Kubernetes complet pour que l'équipe puisse livrer",
        "Travail découpé en tickets, avec revues de code",
      ],
    },
    // Draft text, based on the facts above. Forlan to review.
    learning: {
      en: "Leading a group is mostly about scope: a lighter setup that the team could finish and understand beat a heavier one that nobody could ship.",
      fr: "Diriger un groupe, c'est surtout maîtriser le périmètre : une configuration plus légère que l'équipe pouvait terminer et comprendre valait mieux qu'une plus lourde que personne ne pouvait livrer.",
    },
    // TODO: ask Forlan for the stack (backend language, database, Docker, CI tool).
    stack: [],
    image: "/images/projects/smartqueue.svg",
    imageAlt: {
      en: "SmartQueue cover: people in a queue icon on a navy background",
      fr: "Couverture de SmartQueue : icône de personnes en file sur fond bleu marine",
    },
    // TODO: ask Forlan for the repository link.
    repoUrl: null,
    demoUrl: null,
  },
  // ---------------------------------------------------------------- MORE
  {
    slug: "oasis-management",
    tier: "more",
    title: "Oasis-management",
    kind: { en: "Immigration agency back office", fr: "Back-office d'agence d'immigration" },
    summary: {
      en: "An internal back-office web app for an immigration agency, with its own visual identity.",
      fr: "Une application web de back-office interne pour une agence d'immigration, avec sa propre identité visuelle.",
    },
    role: {
      en: "Full-stack developer, for a client.",
      fr: "Développeur full-stack, pour un client.",
    },
    // TODO: confirm the team size.
    team: null,
    confidential: true,
    status: null,
    problem: null,
    solution: null,
    highlights: {
      en: ["Internal tool for the agency's staff", "Its own visual identity"],
      fr: ["Outil interne pour le personnel de l'agence", "Sa propre identité visuelle"],
    },
    learning: null,
    // TODO: ask Forlan for the stack.
    stack: [],
    image: "/images/projects/oasis-management.svg",
    imageAlt: {
      en: "Oasis-management cover: dashboard icon on a navy background",
      fr: "Couverture d'Oasis-management : icône de tableau de bord sur fond bleu marine",
    },
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: "pdv-leadex-quiz",
    tier: "more",
    title: "PDV Leadex Quiz",
    kind: { en: "Exam-practice quiz platform", fr: "Plateforme de quiz d'entraînement" },
    summary: {
      en: "An exam-practice quiz platform with 3 roles: Student, Teacher and Administrator.",
      fr: "Une plateforme de quiz d'entraînement aux examens avec 3 rôles : Étudiant, Enseignant et Administrateur.",
    },
    role: {
      en: "Full-stack developer. I also wrote its formal \"Roles & Capabilities Guide\".",
      fr: "Développeur full-stack. J'ai aussi rédigé son « Guide des rôles et capacités » formel.",
    },
    // TODO: confirm the team size.
    team: null,
    confidential: false,
    status: null,
    problem: null,
    solution: null,
    highlights: {
      en: ["3 roles: Student, Teacher, Administrator", "Formal Roles & Capabilities Guide"],
      fr: ["3 rôles : Étudiant, Enseignant, Administrateur", "Guide formel des rôles et capacités"],
    },
    learning: null,
    // TODO: ask Forlan for the stack.
    stack: [],
    image: "/images/projects/pdv-leadex-quiz.svg",
    imageAlt: {
      en: "PDV Leadex Quiz cover: question mark icon on a navy background",
      fr: "Couverture de PDV Leadex Quiz : icône de point d'interrogation sur fond bleu marine",
    },
    // TODO: ask Forlan for the links.
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: "clinique-la-bienveillance",
    tier: "more",
    title: "Clinique La Bienveillance",
    kind: { en: "Clinic showcase website", fr: "Site vitrine de clinique" },
    summary: {
      en: "A bilingual (FR/EN) showcase website for a clinic, built with React, Vite and plain CSS.",
      fr: "Un site vitrine bilingue (FR/EN) pour une clinique, construit avec React, Vite et du CSS simple.",
    },
    role: {
      en: "Front-end lead with a team of 3 developers. Each developer owned separate pages to avoid Git conflicts. I also wrote the specification (cahier des charges) in English and French.",
      fr: "Responsable front-end avec une équipe de 3 développeurs. Chaque développeur avait ses propres pages pour éviter les conflits Git. J'ai aussi rédigé le cahier des charges en anglais et en français.",
    },
    team: { en: "Team of 3 developers", fr: "Équipe de 3 développeurs" },
    confidential: false,
    status: null,
    problem: null,
    solution: null,
    highlights: {
      en: [
        "Bilingual (FR/EN) website",
        "Separate pages per developer to avoid Git conflicts",
        "Specification written in English and French",
      ],
      fr: [
        "Site bilingue (FR/EN)",
        "Pages séparées par développeur pour éviter les conflits Git",
        "Cahier des charges rédigé en anglais et en français",
      ],
    },
    learning: null,
    stack: ["React", "Vite", "CSS"],
    image: "/images/projects/clinique-la-bienveillance.svg",
    imageAlt: {
      en: "Clinique La Bienveillance cover: medical cross icon on a navy background",
      fr: "Couverture de Clinique La Bienveillance : icône de croix médicale sur fond bleu marine",
    },
    // TODO: ask Forlan for the links.
    repoUrl: null,
    demoUrl: null,
  },
];
