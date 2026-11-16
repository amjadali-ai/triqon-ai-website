import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-ivory-border editorial-grid"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-7"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-mono uppercase tracking-[0.14em] text-forest">
              <span className="w-2 h-2 rounded-full bg-terracotta" />
              TRIQON AI · Intelligence. Innovation. Impact.
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-ink leading-[1.08]">
              Building Intelligence.{" "}
              <span className="text-forest">Creating Possibilities.</span>
            </h1>

            <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-2xl">
              We build intelligent AI solutions that help businesses and individuals
              turn complex challenges into meaningful opportunities.
            </p>

            <p className="text-base text-ink-muted leading-relaxed max-w-xl">
              TRIQON AI is an emerging artificial intelligence company focused on
              practical automation, generative AI systems, and applied data science—making
              modern intelligence accessible and useful in the real world.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-ink/20 bg-ivory-light text-ink text-sm font-semibold hover:border-forest hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                Let&apos;s Connect
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-ivory-border pb-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-ink-muted">
                  Core Focus Triad
                </span>
                <span className="text-xs font-mono text-terracotta font-medium">
                  TRIQON AI
                </span>
              </div>

              <div className="flex justify-center py-5">
                <img
                  src="/images/triqon-full-logo.png"
                  alt="TRIQON AI Official Logo"
                  className="w-56 sm:w-64 h-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-ivory-border mt-6">
                <div className="p-3 rounded-lg bg-ivory border border-ivory-border">
                  <span className="block w-2.5 h-2.5 rounded-sm bg-forest mb-2" />
                  <p className="text-xs font-semibold text-ink leading-snug">
                    AI Automation
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-ivory border border-ivory-border">
                  <span className="block w-2.5 h-2.5 rounded-sm bg-terracotta mb-2" />
                  <p className="text-xs font-semibold text-ink leading-snug">
                    Generative AI
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-ivory border border-ivory-border">
                  <span className="block w-2.5 h-2.5 rounded-sm bg-sage mb-2" />
                  <p className="text-xs font-semibold text-ink leading-snug">
                    Data Science
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
