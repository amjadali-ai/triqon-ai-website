import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Info } from "lucide-react";
import { useSiteContent } from "@/lib/contentLoader";

type FilterType = "all" | "professional" | "opensource";

export function Projects() {
  const { professionalProjects, githubRepositories } = useSiteContent();
  const [filter, setFilter] = useState<FilterType>("all");

  const showProfessional = filter === "all" || filter === "professional";
  const showOpenSource = filter === "all" || filter === "opensource";

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24 border-b border-ivory-border scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-mono tracking-[0.14em] text-terracotta-dark font-medium">
              Projects &amp; Technical Work
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink text-balance">
              Engineering experience and open-source builds.
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[62ch]">
              Production AI systems from Faizan Haider&apos;s prior individual work
              alongside open-source repositories from Amjad Ali&apos;s GitHub—presented
              with clear ownership and attribution.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects"
            className="flex flex-wrap sm:inline-flex p-1 rounded-lg border border-ivory-border bg-ivory-light self-start gap-1 w-full sm:w-auto"
          >
            {(
              [
                { id: "all", label: "All Work" },
                { id: "professional", label: "Professional Experience" },
                { id: "opensource", label: "GitHub & Open Source" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex-1 sm:flex-none min-h-[44px] sm:min-h-[38px] px-3.5 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                  filter === tab.id
                    ? "bg-forest text-ivory"
                    : "text-ink-secondary hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 sm:mb-10 py-3.5 px-4 rounded-lg border border-sage/35 bg-sage-tint/55 flex items-start gap-3">
          <Info
            className="w-4 h-4 text-forest shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            <strong className="text-ink font-semibold">Attribution Note:</strong>{" "}
            TRIQON AI is a newly founded company. The production systems below
            represent{" "}
            <strong className="text-ink">
              Faizan Haider&apos;s individual professional experience
            </strong>{" "}
            (not client deliveries by TRIQON AI), while the GitHub repositories
            below represent{" "}
            <strong className="text-ink">Amjad Ali&apos;s open-source builds</strong>{" "}
            (including this website).
          </p>
        </div>

        {showProfessional && (
          <div className="mb-12 sm:mb-14">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
              <h3 className="font-display text-lg font-bold text-ink">
                Production Systems · Individual Experience
              </h3>
              <span className="text-xs font-mono text-ink-muted">
                Faizan Haider · Prior Individual Work
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {professionalProjects.map((project, idx) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-7 flex flex-col justify-between hover:border-forest/45 hover:-translate-y-0.5 transition-[transform,border-color] duration-200 min-w-0"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted font-mono">
                      <span className="text-terracotta-dark font-medium">
                        {project.attribution}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.organization}</span>
                    </div>

                    <h4 className="font-display text-xl font-bold text-ink">
                      {project.title}
                    </h4>

                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {project.description}
                    </p>

                    <ul className="space-y-1.5 pt-1">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-xs sm:text-sm text-ink-secondary flex items-start gap-2 leading-relaxed"
                        >
                          <span className="text-forest font-bold shrink-0" aria-hidden="true">
                            –
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-5 border-t border-ivory-border">
                    <p className="text-xs font-mono text-ink-secondary leading-relaxed">
                      {project.stack.join(" · ")}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {showOpenSource && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-ink">
                Open Source &amp; GitHub Repositories
              </h3>
              <span className="text-xs font-mono text-ink-muted">
                github.com/amjadali-ai
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {githubRepositories.map((repo, idx) => (
                <motion.a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-7 hover:border-forest hover:-translate-y-0.5 transition-[transform,border-color] duration-200 flex flex-col justify-between space-y-5 min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-forest min-w-0">
                        <GitBranch className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{repo.owner}</span>
                        <span aria-hidden="true" className="text-ink-muted">
                          ·
                        </span>
                        <span className="text-ink-muted">{repo.language}</span>
                      </div>
                      <ExternalLink
                        className="w-4 h-4 text-ink-muted group-hover:text-forest transition-colors shrink-0"
                        aria-hidden="true"
                      />
                    </div>

                    <h4 className="font-display text-xl font-bold text-ink group-hover:text-forest transition-colors break-words">
                      {repo.name}
                    </h4>

                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {repo.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ivory-border flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-mono text-ink-muted">
                      {repo.topics.join(" · ")}
                    </span>
                    <span className="text-xs font-semibold text-forest whitespace-nowrap shrink-0">
                      View on GitHub
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-mono text-terracotta-dark font-medium">
                  GitHub Profiles
                </p>
                <h4 className="font-display text-lg font-bold text-ink">
                  Browse founder repositories on GitHub
                </h4>
                <p className="text-sm text-ink-secondary max-w-[56ch]">
                  Explore public AI engineering, RAG, automation, and web application
                  repositories maintained by our founders.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 shrink-0">
                <a
                  href="https://github.com/amjadali-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-forest text-ivory text-xs sm:text-sm font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap"
                >
                  github.com/amjadali-ai
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/Faizanhaider013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-ivory-border bg-ivory text-ink text-xs sm:text-sm font-semibold hover:border-forest hover:text-forest transition-colors whitespace-nowrap"
                >
                  github.com/Faizanhaider013
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
