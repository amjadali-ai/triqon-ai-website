import { motion } from "framer-motion";
import { Workflow, Sparkles, BarChart3, Check } from "lucide-react";
import { SERVICES } from "@/data/siteData";

const ICON_MAP = {
  "ai-automation": Workflow,
  "generative-ai": Sparkles,
  "data-science": BarChart3,
};

const ACCENT_CLASSES = {
  forest: "bg-forest/10 text-forest border-forest/20",
  terracotta: "bg-terracotta/12 text-terracotta border-terracotta/25",
  sage: "bg-sage/20 text-forest border-sage/35",
};

export function Services() {
  return (
    <section
      id="services"
      className="py-20 sm:py-24 border-b border-ivory-border bg-ivory-light/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl space-y-4 mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-terracotta font-medium">
            Our Services &amp; Focus Areas
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Three pillars of applied intelligence.
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            Our core engineering disciplines span workflow automation, generative AI,
            and data science—designed to help organizations adopt AI thoughtfully as we
            grow our solutions practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.id as keyof typeof ICON_MAP] || Workflow;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group rounded-xl border border-ivory-border bg-ivory p-7 flex flex-col justify-between hover:border-forest/40 transition-colors"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-lg border flex items-center justify-center ${
                        ACCENT_CLASSES[service.accent]
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-ink-muted">
                      {service.number}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl font-bold text-ink">
                      {service.title}
                    </h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-ivory-border">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2.5 text-sm text-ink"
                      >
                        <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-ivory-border">
                  <a
                    href="#contact"
                    className="text-xs font-mono uppercase tracking-wider text-forest hover:text-terracotta transition-colors inline-flex items-center gap-1.5"
                  >
                    Discuss {service.title} →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
