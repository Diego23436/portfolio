/**
 * Tech stack data. Change a level here and the site updates everywhere.
 *
 * Levels:
 *  - "expert":   daily use in production
 *  - "advanced": shipped real projects with it
 *  - "working":  used in course or side projects
 */
export type SkillLevel = "expert" | "advanced" | "working";

export type Skill = {
  name: string;
  /** French name, only when it differs from `name`. */
  nameFr?: string;
  /** "simple-icons:..." for brand logos, "lucide:..." for general icons. */
  icon: string;
  level: SkillLevel;
  /** Slugs of the projects where it was used (from projects.ts). Empty = unknown, nothing is invented. */
  usedIn: readonly string[];
};

export type SkillGroup = {
  id: string;
  title: { en: string; fr: string };
  /** Featured groups appear in the compact view on the home page. */
  featured: boolean;
  items: readonly Skill[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "frontend",
    title: { en: "Frontend", fr: "Frontend" },
    featured: true,
    items: [
      { name: "React", icon: "simple-icons:react", level: "expert", usedIn: ["oasis-doc","clinique-la-bienveillance"] },
      { name: "Next.js", icon: "simple-icons:nextdotjs", level: "advanced", usedIn: ["stocky","easy-klin"] },
      { name: "TypeScript", icon: "simple-icons:typescript", level: "advanced", usedIn: ["stocky"] },
      { name: "JavaScript", icon: "simple-icons:javascript", level: "expert", usedIn: [] },
      { name: "Tailwind CSS", icon: "simple-icons:tailwindcss", level: "expert", usedIn: ["oasis-doc"] },
      { name: "Vite", icon: "simple-icons:vite", level: "advanced", usedIn: ["oasis-doc","clinique-la-bienveillance"] },
      { name: "HTML/CSS", icon: "simple-icons:html5", level: "expert", usedIn: ["clinique-la-bienveillance"] },
    ],
  },
  {
    id: "backend",
    title: { en: "Backend", fr: "Backend" },
    featured: true,
    items: [
      { name: "NestJS", icon: "simple-icons:nestjs", level: "advanced", usedIn: ["stocky","easy-klin"] },
      { name: "Node.js", icon: "simple-icons:nodedotjs", level: "advanced", usedIn: ["stocky","easy-klin"] },
      { name: "REST API design", nameFr: "Conception d'API REST", icon: "lucide:webhook", level: "advanced", usedIn: ["stocky","easy-klin"] },
      { name: "Prisma ORM", icon: "simple-icons:prisma", level: "advanced", usedIn: ["stocky"] },
      { name: "Supabase", icon: "simple-icons:supabase", level: "advanced", usedIn: ["oasis-doc"] },
      { name: "FastAPI", icon: "simple-icons:fastapi", level: "working", usedIn: [] },
      {
        name: "Auth & role-based access",
        nameFr: "Authentification & accès par rôles",
        icon: "lucide:shield-check",
        level: "advanced", usedIn: ["stocky","easy-klin","pdv-leadex-quiz"],
      },
      {
        name: "Mobile Money integration (CinetPay)",
        nameFr: "Intégration Mobile Money (CinetPay)",
        icon: "lucide:smartphone",
        level: "working", usedIn: [],
      },
    ],
  },
  {
    id: "mobile",
    title: { en: "Mobile", fr: "Mobile" },
    featured: false,
    items: [{ name: "Flutter / Dart", icon: "simple-icons:flutter", level: "working", usedIn: ["easy-klin"] }],
  },
  {
    id: "data",
    title: { en: "Data", fr: "Données" },
    featured: true,
    items: [
      { name: "PostgreSQL", icon: "simple-icons:postgresql", level: "advanced", usedIn: ["stocky","oasis-doc"] },
      { name: "Data modelling / ERD", nameFr: "Modélisation de données / ERD", icon: "lucide:network", level: "expert", usedIn: ["stocky","oasis-doc"] },
      { name: "Row-Level Security & triggers", icon: "lucide:lock", level: "advanced", usedIn: ["oasis-doc"] },
      { name: "MinIO object storage", nameFr: "Stockage objet MinIO", icon: "simple-icons:minio", level: "working", usedIn: [] },
    ],
  },
  {
    id: "devops",
    title: { en: "DevOps & Cloud", fr: "DevOps & Cloud" },
    featured: true,
    items: [
      { name: "Docker", icon: "simple-icons:docker", level: "advanced", usedIn: ["smartqueue"] },
      { name: "Git & Git workflows", nameFr: "Git & workflows Git", icon: "simple-icons:git", level: "expert", usedIn: ["stocky","easy-klin","smartqueue","clinique-la-bienveillance"] },
      { name: "GitLab CI/CD", icon: "simple-icons:gitlab", level: "advanced", usedIn: ["easy-klin"] },
      { name: "SonarQube", icon: "simple-icons:sonarqubeserver", level: "working", usedIn: ["easy-klin"] },
      { name: "Linux VPS", nameFr: "VPS Linux", icon: "simple-icons:linux", level: "advanced", usedIn: ["stocky"] },
      { name: "Domains, DNS & SSL", nameFr: "Domaines, DNS & SSL", icon: "lucide:globe", level: "advanced", usedIn: ["stocky"] },
      { name: "Cloudflare Pages", icon: "simple-icons:cloudflarepages", level: "advanced", usedIn: ["oasis-doc"] },
      { name: "Kubernetes", icon: "simple-icons:kubernetes", level: "working", usedIn: [] },
      { name: "Networking & monitoring", nameFr: "Réseaux & supervision", icon: "lucide:activity", level: "working", usedIn: [] },
    ],
  },
  {
    id: "ai",
    title: { en: "AI & Productivity", fr: "IA & productivité" },
    featured: false,
    items: [
      {
        name: "AI-assisted development with Claude Code",
        nameFr: "Développement assisté par IA avec Claude Code",
        icon: "simple-icons:claude",
        level: "expert", usedIn: ["stocky"],
      },
      { name: "Multi-agent workflows", nameFr: "Workflows multi-agents", icon: "lucide:workflow", level: "advanced", usedIn: ["stocky"] },
      { name: "Prompt engineering", icon: "lucide:message-square-text", level: "expert", usedIn: [] },
    ],
  },
  {
    id: "creative",
    title: { en: "Creative & Docs", fr: "Création & documentation" },
    featured: false,
    items: [
      { name: "Motion design with GSAP", nameFr: "Motion design avec GSAP", icon: "simple-icons:greensock", level: "advanced", usedIn: ["oasis-doc"] },
      {
        name: "Video narration with ElevenLabs",
        nameFr: "Narration vidéo avec ElevenLabs",
        icon: "simple-icons:elevenlabs",
        level: "working", usedIn: [],
      },
      {
        name: "Technical writing: specs, ERD, docs",
        nameFr: "Rédaction technique : cahiers des charges, ERD, docs",
        icon: "lucide:file-text",
        level: "expert", usedIn: ["oasis-doc","pdv-leadex-quiz","clinique-la-bienveillance"],
      },
      { name: "LaTeX", icon: "simple-icons:latex", level: "advanced", usedIn: [] },
    ],
  },
];
