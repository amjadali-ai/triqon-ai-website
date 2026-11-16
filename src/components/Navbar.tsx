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
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-ivory/92 backdrop-blur-md border-b border-ivory-border"
          : "bg-ivory/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between py-3.5">
        <a
          href="#home"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-md"
        >
          <img
            src="/images/triqon-emblem.png"
            alt="TRIQON AI Official Logo"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold tracking-tight text-lg text-ink">
              TRIQON <span className="font-normal text-forest">AI</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-ink-muted mt-0.5 hidden sm:block">
              Intelligence · Innovation · Impact
            </span>
          </div>
        </a>

        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-secondary hover:text-forest transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest text-ivory text-sm font-medium hover:bg-forest-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Let&apos;s Talk
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-lg border border-ivory-border text-ink hover:bg-ivory-light transition-colors"
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
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-forest text-ivory text-sm font-medium hover:bg-forest-dark transition-colors"
            >
              Let&apos;s Talk
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
