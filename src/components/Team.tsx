import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  Phone,
  MessageCircle,
  Send,
} from "lucide-react";
import { FOUNDERS } from "@/data/siteData";

interface TeamProps {
  onSelectFounder?: (founderId: string) => void;
}

export function Team({ onSelectFounder }: TeamProps) {
  const featuredFounder = FOUNDERS.find((f) => f.featured);
  const coFounders = FOUNDERS.filter((f) => !f.featured);

  const handleMessageFounder = (founderId: string) => {
    onSelectFounder?.(founderId);
    const contactEl = document.getElementById("contact");
    contactEl?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="team"
      className="py-20 sm:py-24 border-b border-ivory-border bg-ivory-light/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl space-y-4 mb-14">
          <p className="text-xs font-mono tracking-[0.14em] text-terracotta font-medium">
            Meet Our Founders
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink text-balance">
            Three founders. One shared focus.
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed">
            TRIQON AI is led by CEO &amp; Co-founder Faizan Haider alongside
            co-founders Amjad Ali and Zia Ur Rehman—combining production AI
            engineering experience with software development and digital growth.
          </p>
        </div>

        {featuredFounder && (
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="rounded-xl border border-forest/30 bg-ivory p-7 sm:p-9 mb-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <p className="text-xs font-mono text-terracotta-dark font-medium mb-1.5">
                    Leadership · AI Engineering
                  </p>
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
                      <Briefcase className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <span>{featuredFounder.currentRole}</span>
                    </div>
                  )}
                  {featuredFounder.education && (
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                      <span>{featuredFounder.education}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 font-mono text-ink">
                    <Phone className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span className="tabular-nums">{featuredFounder.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={`https://wa.me/${featuredFounder.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${featuredFounder.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                  {featuredFounder.email && (
                    <a
                      href={`mailto:${featuredFounder.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </a>
                  )}
                  <a
                    href={featuredFounder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                  {featuredFounder.github && (
                    <a
                      href={featuredFounder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-ivory-border lg:pl-8">
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {featuredFounder.bio}
                </p>

                {featuredFounder.expertise && (
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-mono tracking-[0.12em] text-ink-muted">
                      Technical Expertise
                    </h4>
                    <p className="text-xs sm:text-sm font-mono text-ink leading-relaxed">
                      {featuredFounder.expertise.join(" · ")}
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleMessageFounder(featuredFounder.id)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-forest hover:text-terracotta transition-colors whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Message Faizan Directly
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        )}

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

                {founder.education && (
                  <div className="flex items-start gap-2 text-xs text-ink-secondary">
                    <GraduationCap className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{founder.education}</span>
                  </div>
                )}

                <p className="text-sm text-ink-secondary leading-relaxed">
                  {founder.bio}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-ink pt-1">
                  <Phone className="w-3.5 h-3.5 text-forest shrink-0" />
                  <span className="tabular-nums">{founder.phone}</span>
                  <span aria-hidden="true" className="text-ink-muted">·</span>
                  <span className="text-ink-muted">Phone &amp; WhatsApp</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-ivory-border">
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${founder.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${founder.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                  {founder.email && (
                    <a
                      href={`mailto:${founder.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </a>
                  )}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                  {founder.github && (
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleMessageFounder(founder.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-forest hover:text-terracotta transition-colors whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  Message {founder.name.split(" ")[0]} Directly
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
