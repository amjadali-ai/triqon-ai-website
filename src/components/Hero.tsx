import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/lib/contentLoader";
import { TriqonPrism3D } from "@/components/TriqonPrism3D";

export function Hero() {
  const { hero, company } = useSiteContent();

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-ivory-border editorial-grid scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6 min-w-0"
          >
            <p className="text-xs font-mono tracking-[0.12em] text-terracotta-dark font-medium">
              {hero.eyebrow}
            </p>

            <h1 className="font-display text-[2rem] sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-ink leading-[1.09] text-balance">
              {hero.headlinePrefix}{" "}
              <span className="text-forest">{hero.headlineAccent}</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-ink-secondary leading-relaxed max-w-[60ch]">
              {hero.lead}
            </p>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-[58ch]">
              {hero.sublead}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#contact"
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                {hero.primaryCta}
              </a>
              <a
                href="#projects"
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-ink/20 bg-ivory-light text-ink text-sm font-semibold hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                {hero.secondaryCta}
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs text-ink-muted pt-1">
              General inquiries:{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-mono text-forest hover:text-terracotta-dark underline underline-offset-4 transition-colors break-all"
              >
                {company.email}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <TriqonPrism3D />
          </motion.div>
        </div>

        <div className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-ivory-border grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {hero.highlights.map((item) => (
            <div key={item.label} className="space-y-1 min-w-0">
              <p className="text-xs font-mono text-ink-muted tabular-nums">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-ink leading-snug">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
