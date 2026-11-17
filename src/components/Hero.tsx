import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-ivory-border editorial-grid"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <p className="text-xs font-mono tracking-[0.14em] text-terracotta font-medium">
              TRIQON AI · Intelligence · Innovation · Impact
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-ink leading-[1.08] text-balance">
              Building Intelligence.{" "}
              <span className="text-forest">Creating Possibilities.</span>
            </h1>

            <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-2xl">
              We build practical AI software, generative AI systems, workflow
              automation, and digital marketing solutions that help businesses grow.
            </p>

            <p className="text-base text-ink-muted leading-relaxed max-w-xl">
              TRIQON AI is a newly launched technology company founded by three
              co-founders—combining CEO Faizan Haider&apos;s production AI engineering
              background with modern software and digital growth.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                <MessageCircle className="w-4 h-4" />
                Start a Direct Conversation
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-ink/20 bg-ivory-light text-ink text-sm font-semibold hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <div className="w-full rounded-xl border border-ivory-border bg-ivory-light p-7 sm:p-9 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-ivory-border pb-4">
                <span className="text-xs font-mono tracking-[0.12em] text-ink-muted">
                  Core Service Pillars
                </span>
                <span className="text-xs font-mono text-forest font-medium">
                  TRIQON AI
                </span>
              </div>

              <div className="flex justify-center py-7">
                <img
                  src="/images/triqon-full-logo.png"
                  alt="TRIQON AI Official Logo"
                  referrerPolicy="no-referrer"
                  className="w-56 sm:w-64 h-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-4 pt-5 border-t border-ivory-border">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-forest tabular-nums">01</span>
                  <p className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                    AI Automation
                  </p>
                </div>
                <div className="space-y-1 border-l border-ivory-border pl-4">
                  <span className="font-mono text-xs text-terracotta tabular-nums">02</span>
                  <p className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                    Generative AI
                  </p>
                </div>
                <div className="space-y-1 pt-2 border-t border-ivory-border">
                  <span className="font-mono text-xs text-sage tabular-nums">03</span>
                  <p className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                    Data Science
                  </p>
                </div>
                <div className="space-y-1 pt-2 border-t border-l border-ivory-border pl-4">
                  <span className="font-mono text-xs text-terracotta tabular-nums">04</span>
                  <p className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                    Digital Marketing
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory-border grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-baseline justify-between sm:block space-y-1">
            <p className="text-xs font-mono text-ink-muted tabular-nums">01 · Services</p>
            <p className="text-sm font-semibold text-ink">
              AI Automation, GenAI, Data Science &amp; Digital Marketing
            </p>
          </div>
          <div className="flex items-baseline justify-between sm:block space-y-1">
            <p className="text-xs font-mono text-ink-muted tabular-nums">02 · Founding Team</p>
            <p className="text-sm font-semibold text-ink">
              New Venture · Led by 3 Co-Founders
            </p>
          </div>
          <div className="flex items-baseline justify-between sm:block space-y-1">
            <p className="text-xs font-mono text-ink-muted tabular-nums">03 · Direct Access</p>
            <p className="text-sm font-semibold text-ink">
              Instant WhatsApp, Phone &amp; Email Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
