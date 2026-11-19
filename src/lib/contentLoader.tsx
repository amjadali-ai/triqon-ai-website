import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_SITE_CONTENT, type SiteContent } from "@/data/siteData";

const SiteContentContext = createContext<SiteContent>(DEFAULT_SITE_CONTENT);

function isNonEmptyArray<T>(value: unknown): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

function mergeSiteContent(remote: unknown): SiteContent {
  if (!remote || typeof remote !== "object") {
    return DEFAULT_SITE_CONTENT;
  }

  const candidate = remote as Partial<SiteContent>;

  return {
    company:
      candidate.company && typeof candidate.company === "object"
        ? { ...DEFAULT_SITE_CONTENT.company, ...candidate.company }
        : DEFAULT_SITE_CONTENT.company,
    hero:
      candidate.hero && typeof candidate.hero === "object"
        ? {
            ...DEFAULT_SITE_CONTENT.hero,
            ...candidate.hero,
            highlights: isNonEmptyArray(candidate.hero.highlights)
              ? candidate.hero.highlights
              : DEFAULT_SITE_CONTENT.hero.highlights,
          }
        : DEFAULT_SITE_CONTENT.hero,
    about:
      candidate.about && typeof candidate.about === "object"
        ? {
            ...DEFAULT_SITE_CONTENT.about,
            ...candidate.about,
            audiences: isNonEmptyArray(candidate.about.audiences)
              ? candidate.about.audiences
              : DEFAULT_SITE_CONTENT.about.audiences,
          }
        : DEFAULT_SITE_CONTENT.about,
    services: isNonEmptyArray(candidate.services)
      ? candidate.services
      : DEFAULT_SITE_CONTENT.services,
    professionalProjects: isNonEmptyArray(candidate.professionalProjects)
      ? candidate.professionalProjects
      : DEFAULT_SITE_CONTENT.professionalProjects,
    githubRepositories: isNonEmptyArray(candidate.githubRepositories)
      ? candidate.githubRepositories
      : DEFAULT_SITE_CONTENT.githubRepositories,
    founders: isNonEmptyArray(candidate.founders)
      ? candidate.founders
      : DEFAULT_SITE_CONTENT.founders,
    principles: isNonEmptyArray(candidate.principles)
      ? candidate.principles
      : DEFAULT_SITE_CONTENT.principles,
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    const cmsUrl = import.meta.env.VITE_CMS_CONTENT_URL?.trim();
    if (!cmsUrl) return;

    const controller = new AbortController();

    fetch(cmsUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`CMS request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        const payload =
          data && typeof data === "object" && "result" in data
            ? (data as { result: unknown }).result
            : data;
        setContent(mergeSiteContent(payload));
      })
      .catch(() => {
        // Keep bundled fallback content silently so public site stays available.
      });

    return () => controller.abort();
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContent {
  return useContext(SiteContentContext);
}
