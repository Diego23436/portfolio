export type Localized<T = string> = { en: T; fr: T };

export type Category = "saas" | "client" | "team" | "devops";

export type ArchNode = {
  id: string;
  label: Localized;
  /** "simple-icons:..." for brands, "lucide:..." for general icons. */
  icon: string;
  /** Position on a 0-100 grid (x to the right, y down). */
  x: number;
  y: number;
};

export type Architecture = {
  nodes: readonly ArchNode[];
  /** [from id, to id] */
  edges: readonly (readonly [string, string])[];
};

export type Project = {
  slug: string;
  /** "main" projects get a full case study. "more" projects get a short card and page. */
  tier: "main" | "more";
  title: string;
  /** One line, 14 words max. */
  hook: Localized;
  /** Kind of project, shown above the title. */
  kind: Localized;
  /** Small mono tag, for example "SaaS · 2026". */
  tag: Localized;
  /** null = unknown (TODO), hidden in the UI. */
  year: string | null;
  categories: readonly Category[];
  role: Localized;
  /** Short role for the meta row, for example "Lead developer". */
  roleShort: Localized;
  /** null = unknown, the team line is hidden. */
  team: Localized | null;
  /** true = client project: hide the repository button and show a "code private" label. */
  confidential: boolean;
  /** Own label next to a hidden repo. null = the default "Client project, code private" from content.ts. */
  privateLabel?: Localized | null;
  /** null = unknown (TODO), the status badge is hidden. */
  status: Localized | null;
  problem: Localized | null;
  solution: Localized | null;
  /** Only true facts. null = hidden. */
  result: Localized | null;
  /** 4 items max, 12 words each. */
  highlights: Localized<readonly string[]>;
  learning: Localized | null;
  /** Only true numbers. Max 3. Empty = the strip is hidden. */
  metrics: readonly { value: string; label: Localized }[];
  /** null = no diagram. */
  architecture: Architecture | null;
  /** Empty = unknown (TODO), the stack chips are hidden. */
  stack: readonly string[];
  /** Three icons for the hover strip on the tile. */
  stackIcons: readonly string[];
  /** Address shown in the browser frame. null = nkforlan.tech/projects/<slug>. */
  frameUrl: string | null;
  /** Swap the .svg for a .webp screenshot later. */
  image: string;
  imageAlt: Localized;
  repoUrl: string | null;
  demoUrl: string | null;
};

const same = (value: string): Localized => ({ en: value, fr: value });

export const projects: readonly Project[] = [
  // ---------------------------------------------------------------- MAIN
  {
    slug: "stocky",
    tier: "main",
    title: "Stocky",
    hook: {
      en: "Stock, sales and repairs for electronics shops. One platform, separate data per shop.",
      fr: "Stock, ventes et réparations pour boutiques d'électronique. Une plateforme, des données séparées par boutique.",
    },
    kind: { en: "SaaS for electronics shops", fr: "SaaS pour boutiques d'électronique" },
    tag: same("SaaS · 2026"),
    year: "2026",
    categories: ["saas", "team", "devops"],
    roleShort: { en: "Lead developer", fr: "Développeur principal" },
    role: {
      en: "Internship project at Fast and Sure Travel. Lead developer in a team of 3: architecture, data model, auth, audit log, subscriptions, server and domain.",
      fr: "Projet de stage chez Fast and Sure Travel. Développeur principal dans une équipe de 3 : architecture, modèle de données, authentification, journal d'audit, abonnements, serveur et domaine.",
    },
    team: { en: "Team of 3", fr: "Équipe de 3" },
    confidential: true,
    privateLabel: { en: "Internship & personal project · code private", fr: "Projet de stage et personnel · code privé" },
    // TODO: ask Forlan for the status (In production / Beta / In development).
    status: null,
    problem: {
      en: "Phone, laptop and accessory shops in Cameroon track stock, sales, trade-ins and repairs on paper or in Excel. They lose items and money.",
      fr: "Les boutiques de téléphones, d'ordinateurs et d'accessoires au Cameroun suivent stock, ventes, reprises et réparations sur papier ou Excel. Elles perdent des articles et de l'argent.",
    },
    solution: {
      en: "One multi-tenant platform for many shops, each with separate data: stock, sales, trade-ins, returns, repairs and subscriptions.",
      fr: "Une plateforme multi-tenant pour plusieurs boutiques, chacune avec ses données séparées : stock, ventes, reprises, retours, réparations et abonnements.",
    },
    result: {
      en: "Deployed on a Hostinger VPS with its own domain, stocky.host. Built from a 28-ticket board by three developers.",
      fr: "Déployé sur un VPS Hostinger avec son propre domaine, stocky.host. Construit à trois à partir d'un tableau de 28 tickets.",
    },
    highlights: {
      en: [
        "Multi-tenant design: separate data for each shop",
        "Audit log and SaaS subscriptions",
        "28 tickets on a GitHub Projects board",
        "Built with Claude Code builder and reviewer agents",
      ],
      fr: [
        "Conception multi-tenant : données séparées par boutique",
        "Journal d'audit et abonnements SaaS",
        "28 tickets sur un tableau GitHub Projects",
        "Construit avec des agents Claude Code constructeur et relecteur",
      ],
    },
    // Draft text, based on the facts above. Forlan to review.
    learning: {
      en: "A shared ticket board and a data model drawn first kept three developers moving fast. A real server and domain showed me what done means.",
      fr: "Un tableau de tickets partagé et un modèle de données dessiné d'abord ont gardé trois développeurs rapides. Un vrai serveur avec un domaine m'a montré ce que « terminé » veut dire.",
    },
    metrics: [
      { value: "28", label: { en: "tickets on the board", fr: "tickets sur le tableau" } },
      { value: "3", label: { en: "developers", fr: "développeurs" } },
    ],
    architecture: {
      nodes: [
        { id: "browser", label: { en: "Browser", fr: "Navigateur" }, icon: "lucide:monitor", x: 0, y: 28 },
        { id: "web", label: same("Next.js"), icon: "simple-icons:nextdotjs", x: 33, y: 28 },
        { id: "api", label: same("NestJS API"), icon: "simple-icons:nestjs", x: 66, y: 28 },
        { id: "db", label: same("PostgreSQL · Prisma"), icon: "simple-icons:postgresql", x: 100, y: 28 },
        { id: "domain", label: same("stocky.host"), icon: "lucide:globe", x: 33, y: 74 },
        { id: "vps", label: same("Hostinger VPS"), icon: "lucide:server", x: 66, y: 74 },
      ],
      edges: [
        ["browser", "web"],
        ["web", "api"],
        ["api", "db"],
        ["domain", "vps"],
        ["vps", "api"],
      ],
    },
    stack: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "TypeScript", "Hostinger VPS"],
    stackIcons: ["simple-icons:nestjs", "simple-icons:nextdotjs", "simple-icons:postgresql"],
    frameUrl: "stocky.host",
    image: "/images/projects/stocky.svg",
    imageAlt: {
      en: "Stocky cover: a stock dashboard with a sidebar, sales figures and a bar chart",
      fr: "Couverture de Stocky : un tableau de bord de stock avec menu, chiffres de ventes et histogramme",
    },
    // TODO: add the repository link (or mark the project private).
    // Repository is private on purpose (internship project, no button).
    repoUrl: null,
    // stocky.host answered 200 on 2026-11-22.
    demoUrl: "https://stocky.host",
  },
  {
    slug: "oasis-doc",
    tier: "main",
    title: "Oasis-Doc",
    hook: {
      en: "Official documents, ordered online. Diploma equivalence is the flagship service.",
      fr: "Des documents officiels commandés en ligne. L'équivalence de diplôme en est le service phare.",
    },
    kind: { en: "Document services marketplace", fr: "Marketplace de services de documents" },
    tag: { en: "Client · Solo", fr: "Client · Seul" },
    year: "2026",
    categories: ["client", "saas"],
    roleShort: { en: "Solo developer", fr: "Développeur unique" },
    role: {
      en: "Solo developer, for a client.",
      fr: "Développeur unique, pour un client.",
    },
    team: { en: "Solo", fr: "Seul" },
    confidential: false,
    status: { en: "Live", fr: "En ligne" },
    problem: {
      en: "People who need official documents (legalisation, certified translation, diploma equivalence) run between offices and get no clear tracking.",
      fr: "Ceux qui ont besoin de documents officiels (légalisation, traduction certifiée, équivalence de diplôme) courent entre les bureaux sans suivi clair.",
    },
    solution: {
      en: "A bilingual FR/EN marketplace with cart, checkout and a payment handoff on WhatsApp. Every order has a UUID and a readable reference.",
      fr: "Une marketplace bilingue FR/EN avec panier, paiement et transfert vers WhatsApp. Chaque commande a un UUID et une référence lisible.",
    },
    result: {
      en: "Online at oasis-doc.pages.dev, on an 8-entity data model, with a GSAP motion-design promo video.",
      fr: "En ligne sur oasis-doc.pages.dev, sur un modèle de 8 entités, avec une vidéo promo en motion design GSAP.",
    },
    highlights: {
      en: [
        "8-entity data model, drawn as an ERD first",
        "UUID plus a human-readable reference on every order",
        "Cart, checkout and WhatsApp payment handoff",
        "Motion-design promo video made with GSAP",
      ],
      fr: [
        "Modèle de 8 entités, dessiné d'abord en ERD",
        "UUID et référence lisible sur chaque commande",
        "Panier, paiement et transfert vers WhatsApp",
        "Vidéo promo en motion design réalisée avec GSAP",
      ],
    },
    // Draft text, based on the facts above. Forlan to review.
    learning: {
      en: "Drawing the 8-entity model before any screen kept the cart and the orders simple.",
      fr: "Dessiner le modèle de 8 entités avant tout écran a gardé le panier et les commandes simples.",
    },
    metrics: [
      { value: "8", label: { en: "entities in the ERD", fr: "entités dans l'ERD" } },
      { value: "2", label: { en: "languages, FR and EN", fr: "langues, FR et EN" } },
    ],
    architecture: {
      nodes: [
        { id: "browser", label: { en: "Browser", fr: "Navigateur" }, icon: "lucide:monitor", x: 0, y: 30 },
        { id: "web", label: { en: "React + Vite · Cloudflare Pages", fr: "React + Vite · Cloudflare Pages" }, icon: "simple-icons:react", x: 50, y: 30 },
        { id: "supabase", label: { en: "Supabase · Auth, Postgres, RLS", fr: "Supabase · Auth, Postgres, RLS" }, icon: "simple-icons:supabase", x: 100, y: 30 },
        { id: "whatsapp", label: { en: "WhatsApp handoff", fr: "Transfert WhatsApp" }, icon: "simple-icons:whatsapp", x: 50, y: 78 },
      ],
      edges: [
        ["browser", "web"],
        ["web", "supabase"],
        ["web", "whatsapp"],
      ],
    },
    stack: ["React", "Vite", "Tailwind CSS", "Supabase", "Cloudflare Pages"],
    stackIcons: ["simple-icons:react", "simple-icons:supabase", "simple-icons:cloudflarepages"],
    frameUrl: "oasis-doc.pages.dev",
    image: "/images/projects/oasis-doc.svg",
    imageAlt: {
      en: "Oasis-Doc cover: order cards, a cart and a certified document",
      fr: "Couverture d'Oasis-Doc : cartes de commande, panier et document certifié",
    },
    repoUrl: "https://github.com/Dk202020-web/Oasis-Doc",
    demoUrl: "https://oasis-doc.pages.dev",
  },
  {
    slug: "easy-klin",
    tier: "main",
    title: "Easy Klin",
    hook: {
      en: "Laundry platform for multi-branch businesses. I built parts of the NestJS API.",
      fr: "Plateforme de pressing multi-agences. J'ai construit une partie de l'API NestJS.",
    },
    kind: { en: "Multi-agency laundry platform", fr: "Plateforme de pressing multi-agences" },
    tag: { en: "Team · Backend", fr: "Équipe · Backend" },
    // TODO: exact start and end dates.
    year: "2026",
    categories: ["team", "saas"],
    roleShort: { en: "Backend developer", fr: "Développeur backend" },
    role: {
      en: "Backend developer in a team, on the NestJS API (ek-api). Team project: I did not build the whole platform.",
      fr: "Développeur backend dans une équipe, sur l'API NestJS (ek-api). Projet d'équipe : je n'ai pas construit toute la plateforme.",
    },
    team: { en: "Team project", fr: "Projet d'équipe" },
    confidential: true,
    privateLabel: { en: "Team project · code private", fr: "Projet d'équipe · code privé" },
    status: { en: "In progress", fr: "En cours" },
    problem: {
      en: "Laundry businesses with several branches cannot follow orders, staff and prices across branches.",
      fr: "Les pressings avec plusieurs agences ne peuvent pas suivre commandes, personnel et prix d'une agence à l'autre.",
    },
    solution: {
      en: "A mobile app, a web admin and an API with 4 roles: customer, agency staff, agency manager and administrator.",
      fr: "Une application mobile, une administration web et une API avec 4 rôles : client, personnel d'agence, responsable d'agence et administrateur.",
    },
    result: {
      en: "My tickets shipped with tests: customer profile with addresses, catalogue service combinations, sales counting. Quality gates stayed green.",
      fr: "Mes tickets livrés avec leurs tests : profil client avec adresses, combinaisons de services du catalogue, comptage des ventes. Quality gates au vert.",
    },
    highlights: {
      en: [
        "Ticket-based sprints on a self-hosted GitLab",
        "Rebase, then merge request, then review",
        "CI pipelines and a SonarQube quality gate",
        "Tests written with every feature",
      ],
      fr: [
        "Sprints par tickets sur un GitLab auto-hébergé",
        "Rebase, puis merge request, puis revue",
        "Pipelines CI et quality gate SonarQube",
        "Tests écrits avec chaque fonctionnalité",
      ],
    },
    // Draft text, based on the facts above. Forlan to review.
    learning: {
      en: "A strict process taught me small changes, rebase before review, and trust in the pipeline.",
      fr: "Un processus strict m'a appris les petits changements, le rebase avant la revue et la confiance dans le pipeline.",
    },
    metrics: [
      { value: "4", label: { en: "user roles", fr: "rôles utilisateur" } },
      { value: "3", label: { en: "apps: mobile, web, API", fr: "applis : mobile, web, API" } },
    ],
    architecture: {
      nodes: [
        { id: "mobile", label: { en: "Flutter app", fr: "App Flutter" }, icon: "simple-icons:flutter", x: 0, y: 15 },
        { id: "admin", label: { en: "Next.js admin", fr: "Admin Next.js" }, icon: "simple-icons:nextdotjs", x: 0, y: 55 },
        { id: "api", label: same("NestJS API"), icon: "simple-icons:nestjs", x: 50, y: 35 },
        // TODO: ask Forlan which database Easy Klin uses. Generic until then.
        { id: "db", label: { en: "Database", fr: "Base de données" }, icon: "lucide:database", x: 100, y: 35 },
        { id: "ci", label: same("GitLab CI"), icon: "simple-icons:gitlab", x: 50, y: 85 },
        { id: "sonar", label: same("SonarQube"), icon: "simple-icons:sonarqubeserver", x: 100, y: 85 },
      ],
      edges: [
        ["mobile", "api"],
        ["admin", "api"],
        ["api", "db"],
        ["api", "ci"],
        ["ci", "sonar"],
      ],
    },
    stack: ["NestJS", "Next.js", "Flutter", "GitLab (self-hosted)", "CI/CD", "SonarQube"],
    stackIcons: ["simple-icons:nestjs", "simple-icons:flutter", "simple-icons:gitlab"],
    frameUrl: "private",
    image: "/images/projects/easy-klin.svg",
    imageAlt: {
      en: "Easy Klin cover: a mobile app next to an admin table of laundry orders",
      fr: "Couverture d'Easy Klin : une application mobile à côté d'un tableau d'administration des commandes",
    },
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: "smartqueue",
    tier: "main",
    title: "SmartQueue",
    hook: {
      en: "Smart queue system in microservices. I framed the project and led a team of 4.",
      fr: "File d'attente intelligente en microservices. J'ai cadré le projet et dirigé une équipe de 4.",
    },
    kind: { en: "Smart queue system (Devops003)", fr: "Système de file d'attente (Devops003)" },
    tag: { en: "DevOps · Team of 4", fr: "DevOps · Équipe de 4" },
    year: "2026",
    categories: ["devops", "team"],
    roleShort: { en: "Project lead", fr: "Chef de projet" },
    role: {
      en: "Project formulator and admin of a 4-member DevOps group. I defined the problem, split the work into tickets, ran code reviews and unblocked teammates.",
      fr: "Formulateur du projet et administrateur d'un groupe DevOps de 4 membres. J'ai défini le problème, découpé le travail en tickets, mené les revues de code et débloqué mes coéquipiers.",
    },
    team: { en: "Team of 4", fr: "Équipe de 4" },
    confidential: false,
    status: { en: "In progress", fr: "En cours" },
    problem: {
      en: "Queues in clinics, banks and town halls are long and unfair.",
      fr: "Les files d'attente dans les cliniques, les banques et les mairies sont longues et injustes.",
    },
    solution: {
      en: "A ticket-based smart queue built as microservices: small independent services, each doing one job.",
      fr: "Une file d'attente à tickets construite en microservices : de petits services indépendants, chacun avec une seule mission.",
    },
    result: {
      en: "A lighter setup than full Kubernetes, chosen so the team of 4 could deliver.",
      fr: "Une configuration plus légère que Kubernetes complet, choisie pour que l'équipe de 4 puisse livrer.",
    },
    highlights: {
      en: [
        "Microservices: small services, one job each",
        "DevOps focus: containers, a pipeline, deployment",
        "Work split into tickets, checked in code review",
        "Lighter than Kubernetes on purpose, so we could ship",
      ],
      fr: [
        "Microservices : de petits services, une mission chacun",
        "Accent DevOps : conteneurs, pipeline, déploiement",
        "Travail découpé en tickets, vérifié en revue de code",
        "Plus léger que Kubernetes, pour pouvoir livrer",
      ],
    },
    // Draft text, based on the facts above. Forlan to review.
    learning: {
      en: "Leading is mostly scope. A setup the team can finish beats a heavy one nobody ships.",
      fr: "Diriger, c'est surtout tenir le périmètre. Une configuration que l'équipe peut finir vaut mieux qu'une lourde que personne ne livre.",
    },
    metrics: [{ value: "4", label: { en: "team members", fr: "membres d'équipe" } }],
    // TODO: ask Forlan for the real stack. Labels are generic until then.
    architecture: {
      nodes: [
        { id: "client", label: { en: "Client", fr: "Client" }, icon: "lucide:users", x: 0, y: 50 },
        { id: "gateway", label: { en: "API gateway", fr: "Passerelle API" }, icon: "lucide:network", x: 30, y: 50 },
        { id: "queue", label: { en: "Queue service", fr: "File d'attente" }, icon: "lucide:list-ordered", x: 65, y: 20 },
        { id: "ticket", label: { en: "Ticket service", fr: "Tickets" }, icon: "lucide:ticket", x: 65, y: 50 },
        { id: "notify", label: { en: "Notifications", fr: "Notifications" }, icon: "lucide:bell", x: 65, y: 80 },
        { id: "db", label: { en: "Database", fr: "Base de données" }, icon: "lucide:database", x: 100, y: 50 },
      ],
      edges: [
        ["client", "gateway"],
        ["gateway", "queue"],
        ["gateway", "ticket"],
        ["gateway", "notify"],
        ["ticket", "db"],
      ],
    },
    // TODO: ask Forlan for the stack.
    stack: [],
    stackIcons: ["simple-icons:docker", "lucide:workflow", "lucide:rocket"],
    frameUrl: null,
    image: "/images/projects/smartqueue.svg",
    imageAlt: {
      en: "SmartQueue cover: a queue of tickets moving through three services",
      fr: "Couverture de SmartQueue : une file de tickets qui traverse trois services",
    },
    // TODO: ask Forlan for the repository link.
    // Repository is private on purpose.
    repoUrl: null,
    demoUrl: null,
  },
  // ---------------------------------------------------------------- MORE
  {
    slug: "oasis-management",
    tier: "more",
    title: "Oasis-management",
    hook: {
      en: "Back office for an immigration agency, with its own visual identity.",
      fr: "Back-office d'une agence d'immigration, avec sa propre identité visuelle.",
    },
    kind: { en: "Immigration agency back office", fr: "Back-office d'agence d'immigration" },
    tag: { en: "Client · Back office", fr: "Client · Back-office" },
    year: null,
    categories: ["client"],
    roleShort: { en: "Full-stack developer", fr: "Développeur full-stack" },
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
    result: null,
    highlights: {
      en: ["Internal tool for the agency's staff", "Its own visual identity"],
      fr: ["Outil interne pour le personnel de l'agence", "Sa propre identité visuelle"],
    },
    learning: null,
    metrics: [],
    architecture: null,
    // TODO: ask Forlan for the stack.
    stack: [],
    stackIcons: [],
    frameUrl: "private",
    image: "/images/projects/oasis-management.svg",
    imageAlt: {
      en: "Oasis-management cover: a back-office table of cases with filters",
      fr: "Couverture d'Oasis-management : un tableau de dossiers de back-office avec filtres",
    },
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: "pdv-leadex-quiz",
    tier: "more",
    title: "PDV Leadex National Quiz",
    hook: {
      en: "GCE exam practice and timed exams, with student, teacher and admin roles.",
      fr: "Entraînement aux examens GCE et épreuves chronométrées, avec rôles élève, enseignant et admin.",
    },
    kind: { en: "GCE exam-practice quiz platform", fr: "Plateforme de quiz d'entraînement au GCE" },
    tag: { en: "Education · Live", fr: "Éducation · En ligne" },
    year: null,
    categories: ["client"],
    roleShort: { en: "Full-stack developer", fr: "Développeur full-stack" },
    role: {
      en: "Full-stack developer. I also wrote its Roles & Capabilities Guide.",
      fr: "Développeur full-stack. J'ai aussi rédigé son Guide des rôles et capacités.",
    },
    // TODO: confirm the team size.
    team: null,
    confidential: false,
    status: { en: "Live", fr: "En ligne" },
    problem: {
      en: "GCE students lack a simple place to practise under real exam timing.",
      fr: "Les élèves du GCE manquent d'un endroit simple pour s'entraîner dans les conditions réelles de temps d'examen.",
    },
    solution: {
      en: "A quiz platform with a practice mode, timed exams and 3 roles: Student, Teacher and Administrator.",
      fr: "Une plateforme de quiz avec un mode entraînement, des examens chronométrés et 3 rôles : élève, enseignant et administrateur.",
    },
    result: null,
    highlights: {
      en: ["Practice mode and timed exams", "3 roles: Student, Teacher, Administrator", "I also wrote its formal Roles & Capabilities Guide"],
      fr: ["Mode entraînement et examens chronométrés", "3 rôles : élève, enseignant, administrateur", "J'ai aussi rédigé son Guide formel des rôles et capacités"],
    },
    learning: null,
    metrics: [{ value: "3", label: { en: "user roles", fr: "rôles utilisateur" } }],
    architecture: null,
    // TODO: ask Forlan for the stack.
    stack: [],
    stackIcons: [],
    frameUrl: "leadexquizapp.online",
    image: "/images/projects/pdv-leadex-quiz.svg",
    imageAlt: {
      en: "PDV Leadex National Quiz cover: a quiz question with four answer options",
      fr: "Couverture de PDV Leadex National Quiz : une question de quiz avec quatre réponses",
    },
    // Stack, team size and year are unknown: hidden on purpose (TODO in data).
    repoUrl: null,
    demoUrl: "https://leadexquizapp.online",
  },
  {
    slug: "clinique-la-bienveillance",
    tier: "more",
    title: "Clinique La Bienveillance",
    hook: {
      en: "Bilingual FR/EN clinic website. I led the front-end with 3 developers.",
      fr: "Site de clinique bilingue FR/EN. J'ai dirigé le front-end avec 3 développeurs.",
    },
    kind: { en: "Clinic showcase website", fr: "Site vitrine de clinique" },
    tag: { en: "Website · Live", fr: "Site web · En ligne" },
    year: null,
    categories: ["client", "team"],
    roleShort: { en: "Front-end lead", fr: "Responsable front-end" },
    role: {
      en: "Front-end lead, team of 3. Each developer owned separate pages to avoid Git conflicts. I wrote the specification in English and French.",
      fr: "Responsable front-end, équipe de 3. Chaque développeur avait ses pages pour éviter les conflits Git. J'ai rédigé le cahier des charges en anglais et en français.",
    },
    team: { en: "Team of 3 developers", fr: "Équipe de 3 développeurs" },
    confidential: false,
    status: { en: "Live", fr: "En ligne" },
    problem: null,
    solution: null,
    result: null,
    highlights: {
      en: [
        "Bilingual FR/EN website",
        "Separate pages per developer, no Git conflicts",
        "Specification written in English and French",
      ],
      fr: [
        "Site bilingue FR/EN",
        "Pages séparées par développeur, sans conflits Git",
        "Cahier des charges rédigé en anglais et en français",
      ],
    },
    learning: null,
    metrics: [
      { value: "2", label: { en: "languages, FR and EN", fr: "langues, FR et EN" } },
      { value: "3", label: { en: "developers", fr: "développeurs" } },
    ],
    architecture: null,
    stack: ["React", "Vite", "CSS"],
    stackIcons: ["simple-icons:react", "simple-icons:vite", "simple-icons:css"],
    frameUrl: null,
    image: "/images/projects/clinique-la-bienveillance.svg",
    imageAlt: {
      en: "Clinique La Bienveillance cover: a clinic website home page with a medical cross",
      fr: "Couverture de Clinique La Bienveillance : page d'accueil d'un site de clinique avec une croix médicale",
    },
    repoUrl: null,
    demoUrl: "https://cliniquelabienveillance.com",
  },
];
