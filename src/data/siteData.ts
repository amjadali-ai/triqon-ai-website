import rawContent from "@/content/siteContent.json";

export interface CompanyInfo {
  name: string;
  tagline: string;
  email: string;
  websiteUrl: string;
  footerSummary: string;
}

export interface HeroHighlight {
  label: string;
  value: string;
}

export interface HeroContent {
  eyebrow: string;
  headlinePrefix: string;
  headlineAccent: string;
  lead: string;
  sublead: string;
  primaryCta: string;
  secondaryCta: string;
  cardHeader: string;
  highlights: HeroHighlight[];
}

export interface AudienceItem {
  title: string;
  detail: string;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  description: string;
  audienceTag: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  approachTitle: string;
  approachText: string;
  audiences: AudienceItem[];
}

export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  topicLabel: string;
  summary: string;
  capabilities: string[];
  accent: "forest" | "sage" | "terracotta";
}

export interface ProfessionalProject {
  id: string;
  title: string;
  organization: string;
  attribution: string;
  category: "Professional Experience";
  description: string;
  stack: string[];
  highlights: string[];
}

export interface GitHubRepository {
  name: string;
  owner: string;
  url: string;
  description: string;
  language: string;
  topics: string[];
}

export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  featured?: boolean;
  initials: string;
  bio: string;
  education?: string;
  currentRole?: string;
  expertise?: string[];
  phone: string;
  whatsapp: string;
  email?: string;
  linkedin: string;
  github?: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export interface SiteContent {
  company: CompanyInfo;
  hero: HeroContent;
  about: AboutContent;
  services: ServiceCategory[];
  professionalProjects: ProfessionalProject[];
  githubRepositories: GitHubRepository[];
  founders: FounderProfile[];
  principles: PrincipleItem[];
}

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Founders", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const DEFAULT_SITE_CONTENT: SiteContent = rawContent as SiteContent;

export const COMPANY_INFO = DEFAULT_SITE_CONTENT.company;
export const SERVICES = DEFAULT_SITE_CONTENT.services;
export const PROFESSIONAL_PROJECTS = DEFAULT_SITE_CONTENT.professionalProjects;
export const GITHUB_REPOSITORIES = DEFAULT_SITE_CONTENT.githubRepositories;
export const FOUNDERS = DEFAULT_SITE_CONTENT.founders;
export const PRINCIPLES = DEFAULT_SITE_CONTENT.principles;
