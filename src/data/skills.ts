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
      { name: "React", icon: "simple-icons:react", level: "expert" },
      { name: "Next.js", icon: "simple-icons:nextdotjs", level: "advanced" },
      { name: "TypeScript", icon: "simple-icons:typescript", level: "advanced" },
      { name: "JavaScript", icon: "simple-icons:javascript", level: "expert" },
      { name: "Tailwind CSS", icon: "simple-icons:tailwindcss", level: "expert" },
      { name: "Vite", icon: "simple-icons:vite", level: "advanced" },
      { name: "HTML/CSS", icon: "simple-icons:html5", level: "expert" },
    ],
  },
  {
    id: "backend",
    title: { en: "Backend", fr: "Backend" },
    featured: true,
    items: [
      { name: "NestJS", icon: "simple-icons:nestjs", level: "advanced" },
      { name: "Node.js", icon: "simple-icons:nodedotjs", level: "advanced" },
      { name: "REST API design", nameFr: "Conception d'API REST", icon: "lucide:webhook", level: "advanced" },
      { name: "Prisma ORM", icon: "simple-icons:prisma", level: "advanced" },
      { name: "Supabase", icon: "simple-icons:supabase", level: "advanced" },
      { name: "FastAPI", icon: "simple-icons:fastapi", level: "working" },
      {
        name: "Auth & role-based access",
        nameFr: "Authentification & accès par rôles",
        icon: "lucide:shield-check",
        level: "advanced",
      },
      {
        name: "Mobile Money integration (CinetPay)",
        nameFr: "Intégration Mobile Money (CinetPay)",
        icon: "lucide:smartphone",
        level: "working",
      },
    ],
  },
  {
    id: "mobile",
    title: { en: "Mobile", fr: "Mobile" },
    featured: false,
    items: [{ name: "Flutter / Dart", icon: "simple-icons:flutter", level: "working" }],
  },
  {
    id: "data",
    title: { en: "Data", fr: "Données" },
    featured: true,
    items: [
      { name: "PostgreSQL", icon: "simple-icons:postgresql", level: "advanced" },
      { name: "Data modelling / ERD", nameFr: "Modélisation de données / ERD", icon: "lucide:network", level: "expert" },
      { name: "Row-Level Security & triggers", icon: "lucide:lock", level: "advanced" },
      { name: "MinIO object storage", nameFr: "Stockage objet MinIO", icon: "simple-icons:minio", level: "working" },
    ],
  },
  {
    id: "devops",
    title: { en: "DevOps & Cloud", fr: "DevOps & Cloud" },
    featured: true,
    items: [
      { name: "Docker", icon: "simple-icons:docker", level: "advanced" },
      { name: "Git & Git workflows", nameFr: "Git & workflows Git", icon: "simple-icons:git", level: "expert" },
      { name: "GitLab CI/CD", icon: "simple-icons:gitlab", level: "advanced" },
      { name: "SonarQube", icon: "simple-icons:sonarqubeserver", level: "working" },
      { name: "Linux VPS", nameFr: "VPS Linux", icon: "simple-icons:linux", level: "advanced" },
      { name: "Domains, DNS & SSL", nameFr: "Domaines, DNS & SSL", icon: "lucide:globe", level: "advanced" },
      { name: "Cloudflare Pages", icon: "simple-icons:cloudflarepages", level: "advanced" },
      { name: "Kubernetes", icon: "simple-icons:kubernetes", level: "working" },
      { name: "Networking & monitoring", nameFr: "Réseaux & supervision", icon: "lucide:activity", level: "working" },
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
        level: "expert",
      },
      { name: "Multi-agent workflows", nameFr: "Workflows multi-agents", icon: "lucide:workflow", level: "advanced" },
      { name: "Prompt engineering", icon: "lucide:message-square-text", level: "expert" },
    ],
  },
  {
    id: "creative",
    title: { en: "Creative & Docs", fr: "Création & documentation" },
    featured: false,
    items: [
      { name: "Motion design with GSAP", nameFr: "Motion design avec GSAP", icon: "simple-icons:greensock", level: "advanced" },
      {
        name: "Video narration with ElevenLabs",
        nameFr: "Narration vidéo avec ElevenLabs",
        icon: "simple-icons:elevenlabs",
        level: "working",
      },
      {
        name: "Technical writing: specs, ERD, docs",
        nameFr: "Rédaction technique : cahiers des charges, ERD, docs",
        icon: "lucide:file-text",
        level: "expert",
      },
      { name: "LaTeX", icon: "simple-icons:latex", level: "advanced" },
    ],
  },
];
