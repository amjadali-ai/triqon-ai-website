import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/siteData";
import { useSiteContent } from "@/lib/contentLoader";

export function Navbar() {
  const { company } = useSiteContent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? "bg-ivory/95 backdrop-blur-md border-b border-ivory-border"
          : "bg-ivory/85 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 sm:gap-8 py-3">
        <a
          href="#home"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory rounded-md"
        >
          <img
            src="/images/triqon-emblem.png"
            alt={`${company.name} emblem`}
            width={36}
            height={36}
            decoding="async"
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
              className="text-sm font-medium text-ink-secondary hover:text-forest transition-colors py-1.5 whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-forest/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-sm"
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
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-ivory-border bg-ivory-light text-ink hover:border-forest hover:text-forest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-x-0 top-[61px] bottom-0 bg-ink/25 backdrop-blur-[1px] lg:hidden z-40"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            id="mobile-nav-menu"
            aria-label="Mobile Navigation"
            className="relative z-50 lg:hidden border-t border-ivory-border bg-ivory-light px-4 sm:px-6 py-4 space-y-1 shadow-lg"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center min-h-[44px] px-3.5 rounded-lg text-base font-medium text-ink hover:text-forest hover:bg-ivory transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#feedback"
              onClick={() => setMobileOpen(false)}
              className="flex items-center min-h-[44px] px-3.5 rounded-lg text-base font-medium text-ink-secondary hover:text-forest hover:bg-ivory transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              Website Feedback
            </a>
            <div className="pt-3 mt-2 border-t border-ivory-border space-y-2.5">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors"
              >
                Message Us
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${company.email}`}
                className="w-full min-h-[44px] inline-flex items-center justify-center px-4 py-2 rounded-lg border border-ivory-border bg-ivory text-xs font-mono text-ink-secondary hover:border-forest hover:text-forest transition-colors"
              >
                {company.email}
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
