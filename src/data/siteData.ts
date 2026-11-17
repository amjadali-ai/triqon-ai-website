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

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES: ServiceCategory[] = [
  {
    id: "ai-automation",
    number: "01",
    title: "AI Solutions & Automation",
    topicLabel: "AI Solutions & Automation",
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
    topicLabel: "Generative AI & RAG",
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
    topicLabel: "Data Science & ML",
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
  {
    id: "digital-marketing",
    number: "04",
    title: "Digital Marketing",
    topicLabel: "Digital Marketing & Growth",
    summary:
      "Growing brand reach and qualified leads through modern digital marketing strategies, search optimization, and AI-assisted content workflows.",
    capabilities: [
      "Social media & brand growth",
      "SEO & search visibility",
      "AI-assisted content & campaigns",
      "Lead generation & conversion strategy",
    ],
    accent: "terracotta",
  },
];

export const PROFESSIONAL_PROJECTS: ProfessionalProject[] = [
  {
    id: "vortex",
    title: "Vortex",
    organization: "The Buildwick Inc",
    attribution: "Faizan Haider",
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
    attribution: "Faizan Haider",
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
    attribution: "Faizan Haider",
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

export const GITHUB_REPOSITORIES: GitHubRepository[] = [
  {
    name: "My-AI-Mentor",
    owner: "Amjad Ali",
    url: "https://github.com/amjadali-ai/My-AI-Mentor",
    description:
      "AI-powered personal mentor and productivity automation app built with Google Gemini, React, TypeScript, and IndexedDB for smart goal tracking and daily workflows.",
    language: "TypeScript · React",
    topics: ["AI Automation", "Generative AI", "Google Gemini", "React"],
  },
  {
    name: "triqon-ai-website",
    owner: "Amjad Ali",
    url: "https://github.com/amjadali-ai/triqon-ai-website",
    description:
      "Official TRIQON AI company website built with React, TypeScript, Tailwind CSS, and Vite to present our AI automation, generative AI, data science, and digital marketing services.",
    language: "TypeScript · React",
    topics: ["TRIQON AI", "React", "Digital Marketing", "Vite"],
  },
];

export const FOUNDERS: FounderProfile[] = [
  {
    id: "faizan-haider",
    name: "Faizan Haider",
    role: "CEO & Co-founder | AI Engineer",
    featured: true,
    initials: "FH",
    currentRole: "4 years of experience in AI Engineering",
    bio: "AI Engineer with 4 years of experience building and shipping production AI systems powered by LLMs, Retrieval-Augmented Generation, and agentic frameworks. His background spans designing end-to-end AI systems, RAG pipelines, multi-agent workflows, scalable FastAPI backends, and cloud-native serverless architectures on AWS.",
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
    phone: "+92 326 7979974",
    whatsapp: "923267979974",
    email: "faizanhaider998@gmail.com",
    linkedin: "https://www.linkedin.com/in/faizan-haider998/",
    github: "https://github.com/Faizanhaider013",
  },
  {
    id: "amjad-ali",
    name: "Amjad Ali",
    role: "Co-founder",
    initials: "AA",
    bio: "Co-founder focused on AI engineering, generative AI, and modern software development—building practical tools like My AI Mentor and intelligent web applications that deliver everyday business value.",
    phone: "+92 329 5280316",
    whatsapp: "923295280316",
    email: "itsamajdali.67@gmail.com",
    linkedin: "https://www.linkedin.com/in/amjad-ali-ai/",
    github: "https://github.com/amjadali-ai",
  },
  {
    id: "zia-ur-rehman",
    name: "Zia Ur Rehman",
    role: "Co-founder",
    initials: "ZR",
    bio: "Co-founder of TRIQON AI, collaborating with the founding team to shape company strategy, client partnerships, and accessible real-world AI and digital growth solutions.",
    phone: "+92 336 9972771",
    whatsapp: "923369972771",
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
