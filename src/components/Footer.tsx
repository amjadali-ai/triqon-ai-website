import { Linkedin, Github, Mail, MessageCircle, Phone } from "lucide-react";
import { NAV_LINKS } from "@/data/siteData";
import { useSiteContent } from "@/lib/contentLoader";

export function Footer() {
  const { company, founders } = useSiteContent();

  return (
    <footer className="bg-ivory py-12 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-ivory-border">
          <div className="md:col-span-4 space-y-4 min-w-0">
            <a href="#home" className="inline-flex items-center gap-3">
              <img
                src="/images/triqon-emblem.png"
                alt={`${company.name} logo`}
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-9 h-9 object-contain shrink-0"
              />
              <span className="font-display font-bold text-lg text-ink">
                TRIQON <span className="font-semibold text-forest">AI</span>
              </span>
            </a>

            <p className="text-sm text-ink-secondary leading-relaxed max-w-sm">
              {company.footerSummary}
            </p>

            <div className="pt-2 space-y-1.5">
              <p className="text-xs font-mono tracking-[0.12em] text-ink-muted">
                General Company Contact
              </p>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center gap-2 text-sm font-mono font-medium text-forest hover:text-terracotta-dark transition-colors break-all"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                {company.email}
              </a>
            </div>

            <p className="text-xs font-mono tracking-[0.12em] text-terracotta-dark pt-1">
              {company.tagline}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 min-w-0">
            <h3 className="text-xs font-mono tracking-[0.12em] text-ink-muted">
              Navigation
            </h3>
            <ul className="space-y-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center min-h-[40px] sm:min-h-[32px] text-sm text-ink-secondary hover:text-forest transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#feedback"
                  className="inline-flex items-center min-h-[40px] sm:min-h-[32px] text-sm text-ink-secondary hover:text-forest transition-colors"
                >
                  Website Feedback
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5 space-y-3 min-w-0">
            <h3 className="text-xs font-mono tracking-[0.12em] text-ink-muted">
              Founders &amp; Direct Channels
            </h3>
            <div className="space-y-3">
              {founders.map((founder) => (
                <div
                  key={founder.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-ivory-border/70 last:border-b-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{founder.name}</p>
                    <p className="text-xs font-mono text-ink-muted tabular-nums">
                      {founder.phone}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-ink-secondary">
                    <a
                      href={`https://wa.me/${founder.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Message ${founder.name} on WhatsApp`}
                      title="WhatsApp"
                      className="min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px] inline-flex items-center justify-center rounded-lg border border-transparent hover:border-ivory-border hover:bg-ivory-light hover:text-forest transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <a
                      href={`tel:${founder.phone.replace(/\s+/g, "")}`}
                      aria-label={`Call ${founder.name}`}
                      title="Phone"
                      className="min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px] inline-flex items-center justify-center rounded-lg border border-transparent hover:border-ivory-border hover:bg-ivory-light hover:text-forest transition-colors"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                    </a>
                    {founder.email && (
                      <a
                        href={`mailto:${founder.email}`}
                        aria-label={`Email ${founder.name} at ${founder.email}`}
                        title="Email"
                        className="min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px] inline-flex items-center justify-center rounded-lg border border-transparent hover:border-ivory-border hover:bg-ivory-light hover:text-forest transition-colors"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${founder.name} on LinkedIn`}
                      title="LinkedIn"
                      className="min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px] inline-flex items-center justify-center rounded-lg border border-transparent hover:border-ivory-border hover:bg-ivory-light hover:text-forest transition-colors"
                    >
                      <Linkedin className="w-4 h-4" aria-hidden="true" />
                    </a>
                    {founder.github && (
                      <a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} on GitHub`}
                        title="GitHub"
                        className="min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px] inline-flex items-center justify-center rounded-lg border border-transparent hover:border-ivory-border hover:bg-ivory-light hover:text-forest transition-colors"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="font-mono">
            AI Automation · Generative AI · Data Science · Digital Marketing
          </p>
        </div>
      </div>
    </footer>
  );
}
