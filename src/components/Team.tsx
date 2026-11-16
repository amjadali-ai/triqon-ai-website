import { motion } from "framer-motion";
import { Mail, Linkedin, Github, GraduationCap, Building2 } from "lucide-react";
import { FOUNDERS } from "@/data/siteData";

export function Team() {
  const featuredFounder = FOUNDERS.find((f) => f.featured);
  const coFounders = FOUNDERS.filter((f) => !f.featured);

  return (
    <section
      id="team"
      className="py-20 sm:py-24 border-b border-ivory-border bg-ivory-light/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl space-y-4 mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-terracotta font-medium">
            Meet Our Founders
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Three founders. One shared focus.
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            TRIQON AI is led by CEO &amp; Co-founder Faizan Haider alongside
            co-founders Amjad Ali and Zia Ur Rehman—combining production AI
            engineering experience with continuous learning and software development.
          </p>
        </div>

        {/* Featured Profile: Faizan Haider (CEO & Co-founder) */}
        {featuredFounder && (
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-forest/30 bg-ivory p-7 sm:p-9 mb-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-5">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-terracotta-tint text-terracotta-dark text-[11px] font-mono font-medium mb-2">
                    Leadership · AI Engineering
                  </span>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {featuredFounder.name}
                  </h3>
                  <p className="text-sm font-medium text-forest mt-0.5">
                    {featuredFounder.role}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-ivory-border text-xs text-ink-secondary">
                  {featuredFounder.currentRole && (
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <span>{featuredFounder.currentRole}</span>
                    </div>
                  )}
                  {featuredFounder.education && (
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                      <span>{featuredFounder.education}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {featuredFounder.email && (
                    <a
                      href={`mailto:${featuredFounder.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </a>
                  )}
                  <a
                    href={featuredFounder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                  {featuredFounder.github && (
                    <a
                      href={featuredFounder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-forest text-ivory text-xs font-medium hover:bg-forest-dark transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5 lg:border-l lg:border-ivory-border lg:pl-8">
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {featuredFounder.bio}
                </p>

                {featuredFounder.expertise && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-[0.14em] text-ink-muted">
                      Technical Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {featuredFounder.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-md bg-ivory-light border border-ivory-border text-xs font-mono text-ink"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        )}

        {/* Co-Founders Grid: Amjad Ali & Zia Ur Rehman */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coFounders.map((founder, idx) => (
            <motion.article
              key={founder.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="rounded-xl border border-ivory-border bg-ivory p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-medium text-forest mt-0.5">
                    {founder.role}
                  </p>
                </div>

                <p className="text-sm text-ink-secondary leading-relaxed">
                  {founder.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-ivory-border">
                {founder.email && (
                  <a
                    href={`mailto:${founder.email}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {founder.email}
                  </a>
                )}
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn Profile
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
