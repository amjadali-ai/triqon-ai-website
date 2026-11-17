import { motion } from "framer-motion";
import { PRINCIPLES } from "@/data/siteData";

export function WhyTriqon() {
  return (
    <section id="principles" className="py-20 sm:py-24 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            <p className="text-xs font-mono tracking-[0.14em] text-terracotta font-medium">
              Why TRIQON AI?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink text-balance">
              Principles that guide how we build.
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed">
              We value clarity, honest engineering, and steady progress—focusing on
              what makes intelligent systems genuinely dependable.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-ivory-border border-y border-ivory-border">
            {PRINCIPLES.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-1 font-mono text-xs text-terracotta font-semibold tabular-nums">
                  {item.number}
                </div>
                <h3 className="sm:col-span-4 font-display text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="sm:col-span-7 text-sm text-ink-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
