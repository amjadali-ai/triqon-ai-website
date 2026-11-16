import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Briefcase, Info } from "lucide-react";
import { PROFESSIONAL_PROJECTS, GITHUB_REPOSITORIES } from "@/data/siteData";

type FilterType = "all" | "professional" | "opensource";

export function Projects() {
  const [filter, setFilter] = useState<FilterType>("all");

  const showProfessional = filter === "all" || filter === "professional";
  const showOpenSource = filter === "all" || filter === "opensource";

  return (
    <section id="projects" className="py-20 sm:py-24 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-terracotta font-medium">
              Projects &amp; Technical Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              Engineering experience behind the team.
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed">
              Selected production systems and open-source engineering from co-founder
              Faizan Haider&apos;s individual professional experience—presented with
              clear attribution.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects"
            className="inline-flex p-1 rounded-lg border border-ivory-border bg-ivory-light self-start"
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
                className={`px-3.5 py-2 rounded-md text-xs font-medium transition-colors ${
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

        <div className="mb-8 p-4 rounded-lg border border-sage/40 bg-sage-tint/60 flex items-start gap-3">
          <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            <strong className="text-ink font-semibold">Attribution Note:</strong> The
            platforms below represent{" "}
            <strong className="text-ink">
              Faizan Haider&apos;s individual professional experience
            </strong>{" "}
            prior to or alongside his role at TRIQON AI, and are not claimed as
            projects delivered by TRIQON AI.
          </p>
        </div>

        {showProfessional && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {PROFESSIONAL_PROJECTS.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-7 flex flex-col justify-between hover:border-forest/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-terracotta-tint text-terracotta-dark text-[11px] font-mono font-medium">
                      <Briefcase className="w-3 h-3" />
                      Individual Experience
                    </span>
                    <span className="text-xs font-mono text-ink-muted">
                      {project.organization}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      {project.title}
                    </h3>
                    <p className="text-xs text-ink-muted mt-1">{project.attribution}</p>
                  </div>

                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-1.5 pt-2">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-xs text-ink-secondary flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-forest shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-5 mt-5 border-t border-ivory-border">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-ivory border border-ivory-border text-[11px] font-mono text-ink-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {showOpenSource && (
          <div className="space-y-5">
            {GITHUB_REPOSITORIES.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {GITHUB_REPOSITORIES.map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-ivory-border bg-ivory-light p-6 hover:border-forest transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-forest">
                          <GitBranch className="w-3.5 h-3.5" />
                          {repo.language}
                        </span>
                        <ExternalLink className="w-4 h-4 text-ink-muted" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink mb-2">
                        {repo.name}
                      </h3>
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {repo.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-ivory-border bg-ivory-light p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest">
                    <GitBranch className="w-4 h-4 text-terracotta" />
                    Public GitHub Repositories
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    Explore Faizan Haider&apos;s Open-Source Work on GitHub
                  </h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    Browse Faizan Haider&apos;s public repositories covering AI
                    engineering, LLM applications, RAG systems, and backend
                    development directly on GitHub.
                  </p>
                </div>
                <a
                  href="https://github.com/Faizanhaider013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shrink-0 self-start sm:self-center"
                >
                  github.com/Faizanhaider013
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
