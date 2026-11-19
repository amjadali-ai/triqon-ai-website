import { type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useSiteContent } from "@/lib/contentLoader";

export function TriqonPrism3D() {
  const { hero, services, company } = useSiteContent();
  const prefersReducedMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 170, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 170, damping: 24 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(xRatio * 10);
    rawRotateX.set(-yRatio * 10);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const accentTextClass = {
    forest: "text-forest",
    terracotta: "text-terracotta-dark",
    sage: "text-sage",
  };

  return (
    <div style={{ perspective: 1100 }} className="w-full flex">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          prefersReducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className="relative w-full rounded-xl border border-ivory-border bg-ivory-light p-6 sm:p-8 flex flex-col justify-between shadow-[0_18px_40px_-28px_rgba(36,38,33,0.34)]"
      >
        {/* Subtle depth backdrop layer */}
        <div
          aria-hidden="true"
          style={
            prefersReducedMotion
              ? undefined
              : { transform: "translateZ(-16px)" }
          }
          className="pointer-events-none absolute inset-3 rounded-lg border border-forest/[0.06] bg-gradient-to-br from-sage-tint/35 via-transparent to-terracotta-tint/30"
        />

        <div
          style={prefersReducedMotion ? undefined : { transform: "translateZ(10px)" }}
          className="relative flex items-center justify-between border-b border-ivory-border pb-4 gap-3"
        >
          <span className="text-xs font-mono tracking-[0.12em] text-ink-muted">
            {hero.cardHeader}
          </span>
          <span className="text-xs font-mono text-forest font-medium shrink-0">
            {company.name}
          </span>
        </div>

        {/* Lightweight GPU-accelerated 3D geometric triad stage framing the official logo */}
        <div
          style={
            prefersReducedMotion
              ? undefined
              : { transformStyle: "preserve-3d" }
          }
          className="relative flex items-center justify-center py-7 sm:py-9 my-1"
        >
          {/* Rear wireframe triad ring */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 280 240"
            animate={
              prefersReducedMotion
                ? undefined
                : { rotate: [0, 3, 0, -3, 0] }
            }
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={
              prefersReducedMotion
                ? undefined
                : { transform: "translateZ(8px)" }
            }
            className="pointer-events-none absolute w-60 sm:w-64 h-auto text-forest/15"
            fill="none"
          >
            <polygon
              points="140,14 260,214 20,214"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <polygon
              points="140,38 238,200 42,200"
              stroke="#B86449"
              strokeOpacity="0.28"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
            <circle cx="140" cy="14" r="3" fill="#2D483F" fillOpacity="0.35" />
            <circle cx="260" cy="214" r="3" fill="#B86449" fillOpacity="0.45" />
            <circle cx="20" cy="214" r="3" fill="#6D7D69" fillOpacity="0.45" />
          </motion.svg>

          {/* Mid translucent glass triad plate */}
          <div
            aria-hidden="true"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    transform: "translateZ(18px) rotateX(8deg)",
                  }
            }
            className="pointer-events-none absolute w-48 h-48 sm:w-52 sm:h-52 rounded-full border border-forest/10 bg-ivory/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
          />

          {/* Foreground floating logo plane */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -4, 0] }
            }
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={
              prefersReducedMotion
                ? undefined
                : { transform: "translateZ(36px)" }
            }
            className="relative"
          >
            <img
              src="/images/triqon-full-logo.png"
              alt="TRIQON AI official logo"
              width={643}
              height={588}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-44 sm:w-52 md:w-56 h-auto object-contain select-none drop-shadow-[0_12px_18px_rgba(45,72,63,0.14)]"
            />
          </motion.div>
        </div>

        <div
          style={prefersReducedMotion ? undefined : { transform: "translateZ(12px)" }}
          className="relative grid grid-cols-2 gap-x-4 gap-y-4 pt-5 border-t border-ivory-border"
        >
          {services.slice(0, 4).map((service, index) => (
            <div
              key={service.id}
              className={`space-y-1 min-w-0 ${
                index % 2 === 1 ? "border-l border-ivory-border pl-4" : ""
              } ${index >= 2 ? "pt-3 border-t border-ivory-border" : ""}`}
            >
              <span
                className={`font-mono text-xs tabular-nums font-medium ${
                  accentTextClass[service.accent]
                }`}
              >
                {service.number}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                {service.title === "AI Solutions & Automation"
                  ? "AI Automation"
                  : service.title}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
