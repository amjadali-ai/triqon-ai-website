import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/siteData";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-md border-b border-ivory-border"
          : "bg-ivory/85 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-8 py-3.5">
        <a
          href="#home"
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-md"
        >
          <img
            src="/images/triqon-emblem.png"
            alt="TRIQON AI Official Logo"
            referrerPolicy="no-referrer"
            className="w-9 h-9 object-contain shrink-0"
          />
          <span className="font-display font-bold tracking-tight text-lg text-ink whitespace-nowrap">
            TRIQON <span className="font-semibold text-forest">AI</span>
          </span>
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-secondary hover:text-forest transition-colors py-1 whitespace-nowrap shrink-0 border-b border-transparent hover:border-forest/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Message Us
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-ivory-border text-ink hover:bg-ivory-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-ivory-border bg-ivory-light px-5 py-5 space-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-base font-medium text-ink-secondary hover:text-forest hover:bg-ivory transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-ivory-border">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors"
            >
              Message Us
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
