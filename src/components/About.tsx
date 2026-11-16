import { motion } from "framer-motion";
import { Target, Compass, Layers, Users } from "lucide-react";

const AUDIENCES = [
  {
    title: "Businesses Adopting AI",
    detail:
      "Organizations seeking practical automation, workflow optimization, and internal knowledge assistants.",
  },
  {
    title: "Startups & Entrepreneurs",
    detail:
      "Founders building AI-native products who need clean engineering, RAG pipelines, and rapid iteration.",
  },
  {
    title: "Individuals Exploring AI",
    detail:
      "Learners, builders, and professionals looking for accessible, real-world intelligent tools.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-terracotta font-medium">
              About TRIQON AI
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
              An emerging AI company built on practical engineering.
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed">
              TRIQON AI brings together three co-founders united by a shared focus:
              bridging the gap between rapidly advancing AI research and dependable,
              everyday software that people and organizations can actually use.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-forest">
                <Users className="w-4 h-4 text-terracotta" />
                <span>Built for businesses, startups, and individuals</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl border border-ivory-border bg-ivory-light space-y-3">
                <div className="w-9 h-9 rounded-lg bg-forest/10 text-forest flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">Our Vision</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  An AI company building intelligent solutions for businesses and
                  individuals.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-ivory-border bg-ivory-light space-y-3">
                <div className="w-9 h-9 rounded-lg bg-terracotta/12 text-terracotta flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">Our Mission</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  To make intelligent technology more accessible by developing practical
                  AI solutions that solve real-world problems.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-ivory-border bg-ivory-light space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sage/20 text-forest flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">
                  Our Approach &amp; Commitment
                </h3>
              </div>
              <p className="text-sm text-ink-secondary leading-relaxed">
                We start with the problem, not the hype. By combining continuous
                learning, disciplined software architecture, and transparent AI design,
                we focus on building tools that fit cleanly into real workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {AUDIENCES.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg border border-ivory-border bg-ivory"
                >
                  <h4 className="text-sm font-semibold text-ink mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
