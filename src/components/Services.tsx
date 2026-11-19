import { motion } from "framer-motion";
import { Workflow, Sparkles, BarChart3, Megaphone, Check, ArrowRight } from "lucide-react";
import { useSiteContent } from "@/lib/contentLoader";
import { ServiceDepthVisual } from "@/components/ServiceDepthVisual";

const ICON_MAP = {
  "ai-automation": Workflow,
  "generative-ai": Sparkles,
  "data-science": BarChart3,
  "digital-marketing": Megaphone,
};

const ACCENT_CLASSES = {
  forest: "bg-forest/10 text-forest border-forest/20",
  terracotta: "bg-terracotta/12 text-terracotta-dark border-terracotta/25",
  sage: "bg-sage/20 text-forest border-sage/35",
};

interface ServicesProps {
  onSelectTopic?: (topic: string) => void;
}

export function Services({ onSelectTopic }: ServicesProps) {
  const { services } = useSiteContent();

  const handleDiscuss = (topicLabel: string) => {
    onSelectTopic?.(topicLabel);
    const contactEl = document.getElementById("contact");
    contactEl?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 border-b border-ivory-border bg-ivory-light/60 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl space-y-4 mb-10 sm:mb-14">
          <p className="text-xs font-mono tracking-[0.14em] text-terracotta-dark font-medium">
            Services &amp; Focus Areas
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink text-balance">
            Four pillars of applied AI and digital growth.
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[62ch]">
            Our services span AI workflow automation, generative AI, data science,
            and digital marketing—structured to help organizations operate cleanly
            and reach more customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, idx) => {
            const Icon = ICON_MAP[service.id as keyof typeof ICON_MAP] || Workflow;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group rounded-xl border border-ivory-border bg-ivory p-6 sm:p-7 flex flex-col justify-between hover:border-forest/45 hover:-translate-y-0.5 transition-[transform,border-color] duration-200"
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 ${
                          ACCENT_CLASSES[service.accent]
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs text-ink-muted tabular-nums">
                        {service.number}
                      </span>
                    </div>
                    <ServiceDepthVisual serviceId={service.id} />
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                      {service.number}. {service.title}
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
                        <Check
                          className="w-4 h-4 text-forest shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-6 border-t border-ivory-border">
                  <button
                    type="button"
                    onClick={() => handleDiscuss(service.topicLabel)}
                    className="min-h-[44px] sm:min-h-[36px] text-xs font-mono tracking-wide text-forest hover:text-terracotta-dark transition-colors inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded"
                  >
                    Discuss {service.title}
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
