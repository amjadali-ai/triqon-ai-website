import { motion } from "framer-motion";
import { useSiteContent } from "@/lib/contentLoader";

export function WhyTriqon() {
  const { principles } = useSiteContent();

  return (
    <section
      id="principles"
      className="py-16 sm:py-20 lg:py-24 border-b border-ivory-border scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24 min-w-0">
            <p className="text-xs font-mono tracking-[0.14em] text-terracotta-dark font-medium">
              Why TRIQON AI?
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink text-balance">
              Principles that guide how we build.
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[54ch]">
              We value clarity, honest engineering, and steady progress—focusing on
              what makes intelligent systems genuinely dependable.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-ivory-border border-y border-ivory-border min-w-0">
            {principles.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="py-5 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-1 font-mono text-xs text-terracotta-dark font-semibold tabular-nums">
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
