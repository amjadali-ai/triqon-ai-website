import { motion } from "framer-motion";
import { Target, Compass, Layers, Users } from "lucide-react";
import { useSiteContent } from "@/lib/contentLoader";

export function About() {
  const { about } = useSiteContent();

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 border-b border-ivory-border scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 min-w-0">
            <p className="text-xs font-mono tracking-[0.14em] text-terracotta-dark font-medium">
              {about.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink leading-tight text-balance">
              {about.heading}
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[60ch]">
              {about.description}
            </p>
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-forest">
                <Users className="w-4 h-4 text-terracotta-dark shrink-0" aria-hidden="true" />
                <span>{about.audienceTag}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 sm:space-y-6 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl border border-ivory-border bg-ivory-light space-y-3">
                <div className="w-9 h-9 rounded-lg bg-forest/10 text-forest flex items-center justify-center">
                  <Compass className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {about.visionTitle}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {about.visionText}
                </p>
              </div>

              <div className="p-6 rounded-xl border border-ivory-border bg-ivory-light space-y-3">
                <div className="w-9 h-9 rounded-lg bg-terracotta/12 text-terracotta-dark flex items-center justify-center">
                  <Target className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {about.missionTitle}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {about.missionText}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-ivory-border bg-ivory-light space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sage/20 text-forest flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {about.approachTitle}
                </h3>
              </div>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {about.approachText}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 pt-4 border-t border-ivory-border">
              {about.audiences.map((item) => (
                <div key={item.title} className="space-y-1.5 min-w-0">
                  <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
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
