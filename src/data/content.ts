export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
  fr: { label: "Français", short: "FR" },
};

export const profile = {
  name: "Kuitchouo Djelakoun James",
  shortName: "James",
  initials: "KD",
  title: "Junior Software Engineer",
  email: "lewisdjelakoun@gmail.com",
  phoneDisplay: "+237 674 958 168",
  whatsappNumber: "237674958168",
  whatsappUrl:
    "https://wa.me/237674958168?text=Hello%20James%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20talk.",
  github: "https://github.com/KD-James-Lewis",
  linkedin: "https://www.linkedin.com/in/kd-james-lewis-b30029333",
  currentPortfolio: "https://portfolio-rust-psi-37.vercel.app",
  resume: {
    en: "/resume/EN1_CV_KUITCHOUO_DJELAKOUN_JAMES.pdf",
    fr: "/resume/FR1_CV_KUITCHOUO_DJELAKOUN_JAMES.pdf",
  },
  photos: {
    portrait: {
      src: "/images/profile/james-professional-portrait.jpg",
      alt: {
        en: "Professional portrait of James in a navy suit",
        fr: "Portrait professionnel de James en costume bleu marine",
      },
    },
    headshot: {
      src: "/images/profile/james-event-headshot.jpg",
      alt: {
        en: "Close portrait of James during a formal event",
        fr: "Portrait rapproche de James pendant un evenement formel",
      },
    },
    fullBody: {
      src: "/images/profile/james-formal-fullbody.jpg",
      alt: {
        en: "Full-body formal photo of James",
        fr: "Photo formelle de James en pied",
      },
    },
  },
};

export const content = {
  en: {
    meta: {
      title: "Kuitchouo Djelakoun James | Software Engineering Portfolio",
      description:
        "Bilingual portfolio of Kuitchouo Djelakoun James, a software engineering student focused on backend-oriented web development, Laravel, databases, and practical software projects.",
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
    },
    hero: {
      eyebrow: "Software Engineering Student",
      title: "Backend-oriented web developer building practical digital products.",
      intro:
        "I am growing from a strong PHP and Laravel foundation into a broader software engineering path across APIs, databases, modern JavaScript backends, and future Python frameworks.",
      availability: "Open to internships, freelance work, and junior opportunities.",
    },
    stats: [
      { value: "2025", label: "Academic internship experience" },
      { value: "EN / FR", label: "Bilingual communication" },
      { value: "Laravel", label: "Current backend focus" },
    ],
    focus: {
      title: "Engineering Direction",
      intro:
        "The portfolio presents where I am strong today while leaving space for the stack I am actively building toward.",
      items: [
        {
          title: "Backend foundations",
          body: "PHP, Laravel, MySQL, MVC architecture, authentication flows, and database-backed applications.",
        },
        {
          title: "Full-stack growth",
          body: "Frontend fundamentals with HTML, CSS, JavaScript, React basics, Bootstrap, and UI thinking with Figma.",
        },
        {
          title: "Next learning path",
          body: "Modern JavaScript backend stacks, NoSQL databases, Python frameworks, and stronger API design.",
        },
      ],
    },
    aboutPreview: {
      title: "A student engineer with a practical builder mindset.",
      body:
        "I study software engineering and use projects to sharpen how I solve real problems. My goal is to become a professional engineer who can understand requirements, build maintainable systems, and communicate clearly with teams and clients.",
    },
    skills: {
      title: "Skills Snapshot",
      groups: [
        {
          title: "Backend",
          items: ["PHP", "Laravel", "Vanilla PHP", "MySQL", "MVC", "REST basics"],
        },
        {
          title: "Frontend",
          items: ["HTML", "CSS", "JavaScript", "React JSX", "Bootstrap", "Responsive UI"],
        },
        {
          title: "Tools",
          items: ["Git", "GitHub", "Figma", "Firebase", "VS Code"],
        },
        {
          title: "Soft Skills",
          items: [
            "Critical thinking",
            "Problem solving",
            "Communication",
            "Time management",
            "Adaptability",
          ],
        },
      ],
    },
    projects: {
      title: "Featured Projects",
      intro:
        "Some repositories are private for now, so the portfolio uses case studies, screenshots, and demo notes to show the problem, stack, and engineering decisions.",
      allTitle: "Project Case Studies",
      allIntro:
        "Each project page is structured to explain what the project does, how it was built, and what I learned from it.",
    },
    projectDetail: {
      visualLabel: "Case study",
      visualNote: "Architecture, features, and outcomes presented as a concise engineering story.",
      problem: "Problem",
      solution: "Solution",
      highlights: "Highlights",
      learning: "Learning",
    },
    journey: {
      title: "Education and Experience",
      items: [
        {
          period: "2025 - Present",
          title: "Software Engineering - Level Two",
          place: "Institut Universitaire de la Côte (IUC)",
          body: "Continuing software engineering studies with a stronger focus on building practical systems.",
        },
        {
          period: "June - September 2025",
          title: "Academic Intern as Junior Software Engineer",
          place: "AlloTraining",
          body: "Worked on basic management software, supported software development tasks, and collaborated with other interns.",
        },
        {
          period: "2024 - 2025",
          title: "Part-time Teacher",
          place: "Evening school",
          body: "Taught computer science, ICT, and mathematics while strengthening communication and organization skills.",
        },
      ],
    },
    services: {
      title: "What I Can Help With",
      intro:
        "Focused, practical support for web projects, backend workflows, and small software tools.",
      items: [
        "Laravel web applications",
        "Database-backed dashboards",
        "Website development",
        "Bug fixing and feature implementation",
        "Academic and small business software tools",
      ],
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
        "For internships, freelance projects, collaboration, or junior software engineering opportunities, email or WhatsApp is the fastest way to reach me.",
      responseNote: "I usually respond with context about availability, project fit, and next steps.",
      form: {
        title: "Send a Message",
        intro:
          "Write the message here and send it directly from the portfolio.",
        name: "Name",
        namePlaceholder: "Your full name",
        email: "Your Email",
        emailPlaceholder: "you@example.com",
        subject: "Subject",
        subjectPlaceholder: "Internship, freelance project, collaboration...",
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
      },
    },
    footer:
      "Software engineering student building practical software with a backend-first mindset.",
  },
  fr: {
    meta: {
      title: "Kuitchouo Djelakoun James | Portfolio Génie Logiciel",
      description:
        "Portfolio bilingue de Kuitchouo Djelakoun James, étudiant en génie logiciel orienté backend, Laravel, bases de données et projets logiciels pratiques.",
    },
    nav: {
      home: "Accueil",
      about: "A propos",
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
      viewCaseStudy: "Voir l'étude",
      viewLive: "Démo en ligne",
      viewRepo: "Dépôt",
      backToProjects: "Retour aux projets",
      emailMe: "Email",
      openMailApp: "Ouvrir l'app mail",
      openGmail: "Ouvrir Gmail",
      copyEmail: "Copier l'email",
      copiedEmail: "Email copie.",
      whatsapp: "WhatsApp",
      github: "GitHub",
      linkedin: "LinkedIn",
      theme: "Thème",
      menu: "Menu",
    },
    hero: {
      eyebrow: "Étudiant en génie logiciel",
      title: "Développeur web orienté backend qui construit des produits utiles.",
      intro:
        "Je développe actuellement une base solide en PHP et Laravel, tout en avançant vers un profil plus large en APIs, bases de données, backends JavaScript modernes et frameworks Python.",
      availability: "Ouvert aux stages, missions freelance et opportunités junior.",
    },
    stats: [
      { value: "2025", label: "Expérience de stage académique" },
      { value: "EN / FR", label: "Communication bilingue" },
      { value: "Laravel", label: "Focus backend actuel" },
    ],
    focus: {
      title: "Direction technique",
      intro:
        "Le portfolio montre mes forces actuelles tout en gardant de la place pour les stacks que je suis en train d'apprendre.",
      items: [
        {
          title: "Bases backend",
          body: "PHP, Laravel, MySQL, architecture MVC, authentification et applications liées aux bases de données.",
        },
        {
          title: "Progression full-stack",
          body: "HTML, CSS, JavaScript, bases de React, Bootstrap et réflexion UI avec Figma.",
        },
        {
          title: "Prochaine étape",
          body: "Backends JavaScript modernes, bases NoSQL, frameworks Python et meilleure conception d'API.",
        },
      ],
    },
    aboutPreview: {
      title: "Un étudiant ingénieur avec une mentalité de constructeur.",
      body:
        "J'étudie le génie logiciel et j'utilise les projets pour améliorer ma manière de résoudre des problèmes réels. Mon objectif est de devenir un ingénieur capable de comprendre les besoins, construire des systèmes maintenables et communiquer clairement.",
    },
    skills: {
      title: "Résumé des compétences",
      groups: [
        {
          title: "Backend",
          items: ["PHP", "Laravel", "PHP natif", "MySQL", "MVC", "Bases REST"],
        },
        {
          title: "Frontend",
          items: ["HTML", "CSS", "JavaScript", "React JSX", "Bootstrap", "UI responsive"],
        },
        {
          title: "Outils",
          items: ["Git", "GitHub", "Figma", "Firebase", "VS Code"],
        },
        {
          title: "Soft skills",
          items: [
            "Pensée critique",
            "Résolution de problèmes",
            "Communication",
            "Gestion du temps",
            "Adaptabilité",
          ],
        },
      ],
    },
    projects: {
      title: "Projets en avant",
      intro:
        "Certains dépôts sont privés pour le moment. Le portfolio utilise donc des études de cas, des captures et des notes de démo pour montrer le problème, la stack et les choix techniques.",
      allTitle: "Études de cas",
      allIntro:
        "Chaque page projet explique ce que le projet fait, comment il a été construit et ce que j'ai appris.",
    },
    projectDetail: {
      visualLabel: "Étude de cas",
      visualNote: "Architecture, fonctionnalités et résultats présentés comme une histoire technique concise.",
      problem: "Problème",
      solution: "Solution",
      highlights: "Points forts",
      learning: "Apprentissage",
    },
    journey: {
      title: "Formation et expérience",
      items: [
        {
          period: "2025 - Présent",
          title: "Génie logiciel - Niveau deux",
          place: "Parcours universitaire",
          body: "Poursuite des études en génie logiciel avec un accent plus fort sur les systèmes pratiques.",
        },
        {
          period: "Juin - Septembre 2025",
          title: "Stagiaire académique Junior Software Engineer",
          place: "AlloTraining",
          body: "Développement de logiciels de gestion de base, suivi de tâches de développement et collaboration avec d'autres stagiaires.",
        },
        {
          period: "2024 - 2025",
          title: "Enseignant à temps partiel",
          place: "Cours du soir",
          body: "Enseignement de l'informatique, des TIC et des mathématiques, avec renforcement de la communication et de l'organisation.",
        },
      ],
    },
    services: {
      title: "Ce que je peux apporter",
      intro:
        "Un accompagnement pratique pour les projets web, les workflows backend et les petits outils logiciels.",
      items: [
        "Applications web Laravel",
        "Tableaux de bord avec base de données",
        "Développement de sites web",
        "Correction de bugs et ajout de fonctionnalités",
        "Outils logiciels pour études et petites entreprises",
      ],
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
        "Pour un stage, une mission freelance, une collaboration ou une opportunité junior, l'email et WhatsApp sont les moyens les plus rapides pour me joindre.",
      responseNote:
        "Je réponds généralement avec des précisions sur ma disponibilité, le besoin et les prochaines étapes.",
      form: {
        title: "Envoyer un message",
        intro:
          "Ecrivez le message ici et envoyez-le directement depuis le portfolio.",
        name: "Nom",
        namePlaceholder: "Votre nom complet",
        email: "Votre email",
        emailPlaceholder: "vous@example.com",
        subject: "Sujet",
        subjectPlaceholder: "Stage, mission freelance, collaboration...",
        message: "Message",
        messagePlaceholder: "Expliquez ce que vous souhaitez discuter.",
        submit: "Envoyer le message",
        sending: "Envoi...",
        feedback: "Message envoye. Merci pour votre prise de contact.",
        error: "Le message n'a pas pu etre envoye. Veuillez reessayer ou utiliser le bouton email ci-dessus.",
      },
      whatsappForm: {
        title: "Preparer un message WhatsApp",
        intro:
          "Ecrivez votre message WhatsApp ici et ouvrez-le pret a envoyer.",
        name: "Nom",
        namePlaceholder: "Votre nom complet",
        message: "Message",
        messagePlaceholder: "Expliquez ce que vous souhaitez discuter sur WhatsApp.",
        submit: "Ouvrir WhatsApp",
        feedback: "WhatsApp devrait s'ouvrir avec votre message pret.",
      },
    },
    footer:
      "Étudiant en génie logiciel qui construit des logiciels pratiques avec une approche orientée backend.",
  },
} as const;

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
