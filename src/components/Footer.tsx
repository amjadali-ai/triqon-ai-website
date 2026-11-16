import { Linkedin, Github, Mail } from "lucide-react";
import { NAV_LINKS } from "@/data/siteData";

export function Footer() {
  return (
    <footer className="bg-ivory py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-ivory-border">
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-3">
              <img
                src="/images/triqon-emblem.png"
                alt="TRIQON AI Logo"
                className="w-9 h-9 object-contain shrink-0"
              />
              <span className="font-display font-bold text-lg text-ink">
                TRIQON <span className="font-normal text-forest">AI</span>
              </span>
            </a>
            <p className="text-sm text-ink-secondary leading-relaxed max-w-sm">
              An emerging AI technology company building practical, accessible
              intelligent solutions for businesses and individuals.
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-terracotta">
              Intelligence. Innovation. Impact.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.14em] text-ink-muted">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
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

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.14em] text-ink-muted">
              Founders &amp; Channels
            </h3>
            <ul className="space-y-2 text-sm text-ink-secondary">
              <li>
                <a
                  href="mailto:itsamajdali.67@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-forest transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Amjad Ali (Email)
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/amjad-ali-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-forest transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Amjad Ali (LinkedIn)
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/faizan-haider998/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-forest transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Faizan Haider (LinkedIn)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Faizanhaider013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-forest transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  Faizan Haider (GitHub)
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/zia-ur-rehman-854381354/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-forest transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Zia Ur Rehman (LinkedIn)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} TRIQON AI. All rights reserved.</p>
          <p className="font-mono">Built for Vercel Deployment</p>
        </div>
      </div>
    </footer>
  );
}
