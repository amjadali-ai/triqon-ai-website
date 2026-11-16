export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
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
  email?: string;
  linkedin: string;
  github?: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES: ServiceCategory[] = [
  {
    id: "ai-automation",
    number: "01",
    title: "AI Solutions & Automation",
    summary:
      "Designing practical automation systems that connect language models with existing operational tools and reduce manual bottlenecks.",
    capabilities: [
      "Intelligent business workflows",
      "AI-powered automation",
      "AI assistants and agents",
      "Business process optimization",
    ],
    accent: "forest",
  },
  {
    id: "generative-ai",
    number: "02",
    title: "Generative AI",
    summary:
      "Building grounded, domain-aware generative applications that reason over private knowledge bases with reliable retrieval.",
    capabilities: [
      "Large Language Model applications",
      "Retrieval-Augmented Generation (RAG)",
      "AI chatbots and intelligent assistants",
      "AI-powered applications",
    ],
    accent: "terracotta",
  },
  {
    id: "data-science",
    number: "03",
    title: "Data Science",
    summary:
      "Turning structured and operational datasets into clear analytical models, forecasts, and decision-ready software.",
    capabilities: [
      "Data analysis",
      "Predictive modeling",
      "Machine learning applications",
      "Data-driven insights",
    ],
    accent: "sage",
  },
];

export const PROFESSIONAL_PROJECTS: ProfessionalProject[] = [
  {
    id: "vortex",
    title: "Vortex",
    organization: "The Buildwick Inc",
    attribution: "Individual Professional Experience — Faizan Haider",
    category: "Professional Experience",
    description:
      "An AI-powered enterprise phone system and revenue-cycle-management platform for dental practices, using Amazon Connect and LLMs.",
    stack: ["Amazon Connect", "LLMs", "AWS", "Voice AI", "Revenue Cycle Management"],
    highlights: [
      "Enterprise telephony routing and automated voice workflows via Amazon Connect",
      "LLM-assisted call handling tailored to dental practice revenue-cycle operations",
    ],
  },
  {
    id: "cliniqflow",
    title: "CliniqFlow",
    organization: "Healthcare SaaS",
    attribution: "Individual Professional Experience — Faizan Haider",
    category: "Professional Experience",
    description:
      "A clinic and pharmacy SaaS platform designed for the Pakistani healthcare market.",
    stack: ["SaaS Architecture", "Healthcare Workflows", "Pharmacy Operations", "Web Platform"],
    highlights: [
      "Unified clinic and pharmacy management tailored to local healthcare workflows",
      "Built for day-to-day operational reliability across clinical and dispensary teams",
    ],
  },
  {
    id: "techlabz-rag",
    title: "Enterprise RAG Chatbot",
    organization: "Techlabz",
    attribution: "Individual Professional Experience — Faizan Haider",
    category: "Professional Experience",
    description:
      "A production retrieval system using Groq, Pinecone, and Google embeddings to answer company and product queries over internal documentation.",
    stack: ["Groq", "Pinecone", "Google Embeddings", "RAG", "Internal Docs"],
    highlights: [
      "Low-latency inference with Groq paired with Pinecone vector indexing",
      "Grounded question-answering over internal company and product documentation",
    ],
  },
];

/**
 * Add verified public repositories from https://github.com/Faizanhaider013
 * as needed. Left empty until directly fetched/verified so no repo names are invented.
 */
export const GITHUB_REPOSITORIES: GitHubRepository[] = [];

export const FOUNDERS: FounderProfile[] = [
  {
    id: "amjad-ali",
    name: "Amjad Ali",
    role: "Co-founder",
    initials: "AA",
    bio: "Technology enthusiast and AI student focused on AI engineering, generative AI, and modern software development—building practical tools and learning how intelligent systems create everyday value.",
    email: "itsamajdali.67@gmail.com",
    linkedin: "https://www.linkedin.com/in/amjad-ali-ai/",
  },
  {
    id: "faizan-haider",
    name: "Faizan Haider",
    role: "CEO & Co-founder | AI Engineer",
    featured: true,
    initials: "FH",
    currentRole: "AI Engineer at AbbasAi solution (4 years experience)",
    education: "B.S. in Data Science (AI Engineering track), UMT Lahore",
    bio: "AI Engineer with 4 years of experience building and shipping production AI systems powered by LLMs, Retrieval-Augmented Generation, and agentic frameworks. Currently working full-time at AbbasAi solution. His experience includes designing end-to-end AI systems, RAG pipelines, multi-agent workflows, scalable FastAPI backends, and cloud-native serverless architectures on AWS.",
    expertise: [
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Pinecone",
      "Groq",
      "FastAPI",
      "n8n",
      "React / Next.js",
      "AWS Lambda",
      "API Gateway",
      "S3",
      "DynamoDB",
      "Amazon Connect",
    ],
    email: "faizanhaider998@gmail.com",
    linkedin: "https://www.linkedin.com/in/faizan-haider998/",
    github: "https://github.com/Faizanhaider013",
  },
  {
    id: "zia-ur-rehman",
    name: "Zia Ur Rehman",
    role: "Co-founder",
    initials: "ZR",
    bio: "Co-founder of TRIQON AI, collaborating with the founding team to shape the company's direction and build accessible, real-world AI solutions.",
    linkedin: "https://www.linkedin.com/in/zia-ur-rehman-854381354/",
  },
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    number: "01",
    title: "Practical Innovation",
    description:
      "We focus on AI that solves real operational problems cleanly, prioritizing measurable usefulness over hype.",
  },
  {
    number: "02",
    title: "Intelligent Problem Solving",
    description:
      "Every system starts with clear problem framing—combining retrieval, automation, and software engineering where each fits best.",
  },
  {
    number: "03",
    title: "Continuous Learning",
    description:
      "AI evolves rapidly. We stay grounded in ongoing research, experimentation, and hands-on engineering discipline.",
  },
  {
    number: "04",
    title: "Collaborative Development",
    description:
      "We work closely with businesses, startups, and individuals to shape solutions around actual workflows and needs.",
  },
  {
    number: "05",
    title: "Responsible Technology",
    description:
      "We believe intelligent tools should be transparent, reliable, and built with clear accountability.",
  },
];
