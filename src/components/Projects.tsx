import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Info } from "lucide-react";
import { PROFESSIONAL_PROJECTS, GITHUB_REPOSITORIES } from "@/data/siteData";

type FilterType = "all" | "professional" | "opensource";

export function Projects() {
  const [filter, setFilter] = useState<FilterType>("all");

  const showProfessional = filter === "all" || filter === "professional";
  const showOpenSource = filter === "all" || filter === "opensource";

  return (
    <section id="projects" className="py-20 sm:py-24 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-mono tracking-[0.14em] text-terracotta font-medium">
              Projects &amp; Technical Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink text-balance">
              Engineering experience and open-source builds.
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed">
              Production AI systems from Faizan Haider&apos;s professional work alongside
              open-source builds from Amjad Ali&apos;s GitHub focused on AI automation,
              generative AI, and digital solutions—presented with clear attribution.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects"
            className="inline-flex flex-wrap p-1 rounded-lg border border-ivory-border bg-ivory-light self-start gap-1"
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
                className={`px-3.5 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
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

        <div className="mb-10 py-3.5 px-4 rounded-lg border border-sage/35 bg-sage-tint/50 flex items-start gap-3">
          <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            <strong className="text-ink font-semibold">Attribution Note:</strong>{" "}
            TRIQON AI is a new AI and digital solutions company. The systems below
            highlight co-founder{" "}
            <strong className="text-ink">
              Faizan Haider&apos;s 4 years of individual AI engineering experience
            </strong>{" "}
            alongside{" "}
            <strong className="text-ink">Amjad Ali&apos;s open-source builds</strong>{" "}
            (including this website).
          </p>
        </div>

        {showProfessional && (
          <div className="mb-14">
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="font-display text-lg font-bold text-ink">
                Production Systems · Individual Experience
              </h3>
              <span className="text-xs font-mono text-ink-muted">
                Faizan Haider
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {PROFESSIONAL_PROJECTS.map((project, idx) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-7 flex flex-col justify-between hover:border-forest/45 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-ink-muted font-mono">
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

                    <ul className="space-y-1.5 pt-2">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-xs text-ink-secondary flex items-start gap-2"
                        >
                          <span className="text-forest font-bold shrink-0">–</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-5 border-t border-ivory-border">
                    <p className="text-[11px] font-mono text-ink-secondary leading-relaxed">
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
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-ink">
                Open Source &amp; GitHub Repositories
              </h3>
              <span className="text-xs font-mono text-ink-muted">
                github.com/amjadali-ai
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GITHUB_REPOSITORIES.map((repo, idx) => (
                <motion.a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="group rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-7 hover:border-forest transition-colors flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-forest">
                        <GitBranch className="w-3.5 h-3.5 shrink-0" />
                        <span>{repo.owner}</span>
                        <span aria-hidden="true" className="text-ink-muted">·</span>
                        <span className="text-ink-muted">{repo.language}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-ink-muted group-hover:text-forest transition-colors shrink-0" />
                    </div>

                    <h4 className="font-display text-xl font-bold text-ink group-hover:text-forest transition-colors">
                      {repo.name}
                    </h4>

                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {repo.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ivory-border flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-ink-muted">
                      {repo.topics.join(" · ")}
                    </span>
                    <span className="text-xs font-medium text-forest whitespace-nowrap shrink-0">
                      View Repository
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <p className="text-xs font-mono text-terracotta font-medium">
                  Explore Full Profiles
                </p>
                <h4 className="font-display text-lg font-bold text-ink">
                  Browse all open-source repositories on GitHub
                </h4>
                <p className="text-sm text-ink-secondary">
                  Follow ongoing AI, LLM, RAG, and full-stack software repositories from
                  our founders.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href="https://github.com/amjadali-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-forest text-ivory text-xs sm:text-sm font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                >
                  github.com/amjadali-ai
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Faizanhaider013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-ivory-border bg-ivory text-ink text-xs sm:text-sm font-semibold hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                >
                  github.com/Faizanhaider013
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
