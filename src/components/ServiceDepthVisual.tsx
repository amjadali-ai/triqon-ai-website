import { useReducedMotion } from "framer-motion";

interface ServiceDepthVisualProps {
  serviceId: string;
}

/**
 * Lightweight, zero-WebGL isometric 3D micro-scenes for service cards.
 * Uses pure SVG/CSS 3D transforms, respects prefers-reduced-motion, and is hidden from screen readers.
 */
export function ServiceDepthVisual({ serviceId }: ServiceDepthVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  const hoverShift = prefersReducedMotion
    ? ""
    : "transition-transform duration-300 ease-out group-hover:-translate-y-1";

  if (serviceId === "ai-automation") {
    return (
      <div
        aria-hidden="true"
        className="w-24 h-16 shrink-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 112 72" className="w-full h-full overflow-visible" fill="none">
          {/* Bottom workflow plane */}
          <polygon
            points="56,42 96,56 56,70 16,56"
            fill="#EBF0E8"
            stroke="#2D483F"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          {/* Mid connector plane */}
          <g className={hoverShift}>
            <polygon
              points="56,26 96,40 56,54 16,40"
              fill="#FAF8F3"
              stroke="#2D483F"
              strokeOpacity="0.45"
              strokeWidth="1.1"
            />
            <path
              d="M36 40 L56 33 L76 40"
              stroke="#B86449"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="36" cy="40" r="2.5" fill="#2D483F" />
            <circle cx="56" cy="33" r="2.5" fill="#B86449" />
            <circle cx="76" cy="40" r="2.5" fill="#2D483F" />
          </g>
          {/* Top automation layer */}
          <polygon
            points="56,10 88,21 56,32 24,21"
            fill="#2D483F"
            fillOpacity="0.12"
            stroke="#2D483F"
            strokeWidth="1.2"
            className={
              prefersReducedMotion
                ? ""
                : "transition-transform duration-300 ease-out group-hover:-translate-y-2"
            }
          />
        </svg>
      </div>
    );
  }

  if (serviceId === "generative-ai") {
    return (
      <div
        aria-hidden="true"
        className="w-24 h-16 shrink-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 112 72" className="w-full h-full overflow-visible" fill="none">
          {/* Isometric knowledge prism */}
          <polygon
            points="56,44 92,58 56,70 20,58"
            fill="#F7EAE5"
            stroke="#B86449"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          {/* Floating RAG retrieval cube */}
          <g
            className={
              prefersReducedMotion
                ? ""
                : "transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
            }
          >
            {/* Top face */}
            <polygon
              points="56,10 80,21 56,32 32,21"
              fill="#FAF8F3"
              stroke="#B86449"
              strokeWidth="1.2"
            />
            {/* Left face */}
            <polygon
              points="32,21 56,32 56,54 32,43"
              fill="#F7EAE5"
              stroke="#B86449"
              strokeOpacity="0.7"
              strokeWidth="1.1"
            />
            {/* Right face */}
            <polygon
              points="80,21 56,32 56,54 80,43"
              fill="#2D483F"
              fillOpacity="0.14"
              stroke="#2D483F"
              strokeOpacity="0.55"
              strokeWidth="1.1"
            />
            {/* Subtle vector node */}
            <circle cx="56" cy="21" r="3" fill="#B86449" />
          </g>
        </svg>
      </div>
    );
  }

  if (serviceId === "data-science") {
    return (
      <div
        aria-hidden="true"
        className="w-24 h-16 shrink-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 112 72" className="w-full h-full overflow-visible" fill="none">
          {/* Base grid */}
          <polygon
            points="56,44 98,58 56,70 14,58"
            fill="#EBF0E8"
            stroke="#6D7D69"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          {/* Isometric 3D analytical columns */}
          <g className={hoverShift}>
            {/* Short column */}
            <polygon points="34,42 44,46 34,50 24,46" fill="#FAF8F3" stroke="#2D483F" strokeWidth="1" />
            <polygon points="24,46 34,50 34,60 24,56" fill="#EBF0E8" stroke="#2D483F" strokeOpacity="0.5" strokeWidth="1" />
            <polygon points="44,46 34,50 34,60 44,56" fill="#6D7D69" fillOpacity="0.35" stroke="#2D483F" strokeOpacity="0.5" strokeWidth="1" />

            {/* Mid column */}
            <polygon points="56,30 66,34 56,38 46,34" fill="#FAF8F3" stroke="#2D483F" strokeWidth="1" />
            <polygon points="46,34 56,38 56,60 46,56" fill="#EBF0E8" stroke="#2D483F" strokeOpacity="0.6" strokeWidth="1" />
            <polygon points="66,34 56,38 56,60 66,56" fill="#2D483F" fillOpacity="0.24" stroke="#2D483F" strokeOpacity="0.6" strokeWidth="1" />

            {/* Tall column */}
            <polygon points="78,16 88,20 78,24 68,20" fill="#F7EAE5" stroke="#B86449" strokeWidth="1.1" />
            <polygon points="68,20 78,24 78,56 68,52" fill="#F7EAE5" stroke="#B86449" strokeOpacity="0.65" strokeWidth="1" />
            <polygon points="88,20 78,24 78,56 88,52" fill="#B86449" fillOpacity="0.32" stroke="#B86449" strokeOpacity="0.65" strokeWidth="1" />
          </g>
        </svg>
      </div>
    );
  }

  // Digital Marketing: rising isometric growth steps + reach trajectory
  return (
    <div
      aria-hidden="true"
      className="w-24 h-16 shrink-0 flex items-center justify-center"
    >
      <svg viewBox="0 0 112 72" className="w-full h-full overflow-visible" fill="none">
        <polygon
          points="56,46 96,59 56,70 16,59"
          fill="#F7EAE5"
          stroke="#B86449"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <g className={hoverShift}>
          <polygon
            points="36,42 56,49 36,56 16,49"
            fill="#FAF8F3"
            stroke="#2D483F"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          <polygon
            points="58,30 78,37 58,44 38,37"
            fill="#FAF8F3"
            stroke="#2D483F"
            strokeOpacity="0.65"
            strokeWidth="1.1"
          />
          <polygon
            points="78,16 98,23 78,30 58,23"
            fill="#B86449"
            fillOpacity="0.16"
            stroke="#B86449"
            strokeWidth="1.2"
          />
          <path
            d="M34 48 Q56 26 78 22"
            stroke="#2D483F"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
          <circle cx="78" cy="22" r="3" fill="#B86449" />
        </g>
      </svg>
    </div>
  );
}
