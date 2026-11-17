import { Linkedin, Github, Mail, MessageCircle, Phone } from "lucide-react";
import { NAV_LINKS, FOUNDERS } from "@/data/siteData";

export function Footer() {
  return (
    <footer className="bg-ivory py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-ivory-border">
          <div className="md:col-span-4 space-y-4">
            <a href="#home" className="inline-flex items-center gap-3">
              <img
                src="/images/triqon-emblem.png"
                alt="TRIQON AI Logo"
                referrerPolicy="no-referrer"
                className="w-9 h-9 object-contain shrink-0"
              />
              <span className="font-display font-bold text-lg text-ink">
                TRIQON <span className="font-semibold text-forest">AI</span>
              </span>
            </a>
            <p className="text-sm text-ink-secondary leading-relaxed max-w-sm">
              An emerging AI technology company building practical, accessible
              intelligent solutions for businesses and individuals.
            </p>
            <p className="text-xs font-mono tracking-[0.12em] text-terracotta">
              Intelligence · Innovation · Impact
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono tracking-[0.12em] text-ink-muted">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-secondary hover:text-forest transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xs font-mono tracking-[0.12em] text-ink-muted">
              Founders &amp; Direct Channels
            </h3>
            <div className="space-y-3">
              {FOUNDERS.map((founder) => (
                <div
                  key={founder.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-ivory-border/70 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{founder.name}</p>
                    <p className="text-xs font-mono text-ink-muted tabular-nums">
                      {founder.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-ink-secondary">
                    <a
                      href={`https://wa.me/${founder.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${founder.name} WhatsApp`}
                      className="hover:text-forest transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${founder.phone.replace(/\s+/g, "")}`}
                      aria-label={`Call ${founder.name}`}
                      className="hover:text-forest transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    {founder.email && (
                      <a
                        href={`mailto:${founder.email}`}
                        aria-label={`Email ${founder.name}`}
                        className="hover:text-forest transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${founder.name} LinkedIn`}
                      className="hover:text-forest transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    {founder.github && (
                      <a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} GitHub`}
                        className="hover:text-forest transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} TRIQON AI. All rights reserved.</p>
          <p className="font-mono">AI Automation · Generative AI · Data Science · Digital Marketing</p>
        </div>
      </div>
    </footer>
  );
}
