import { site } from "@/data/site";

/**
 * The "Rocking C" brand mark — a serif C seated on a rocker curve inside a
 * roping-circle badge. Renders as a self-contained SVG so it stays crisp
 * anywhere and inherits `currentColor`.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${site.name} brand`}
      className={className}
      fill="none"
    >
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      <circle cx="50" cy="50" r="40.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* The C */}
      <path
        d="M67 36.5c-3.9-4.6-9.8-7.5-16.4-7.5C38.4 29 28.5 38.4 28.5 50S38.4 71 50.6 71c6.6 0 12.5-2.9 16.4-7.5"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* The rocker */}
      <path
        d="M30 79c4.8 4.2 11.6 6.8 20 6.8S65.2 83.2 70 79"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Full horizontal lockup: mark + wordmark. Used in the header & footer.
 */
export function Logo({
  className = "",
  markClassName = "",
  variant = "dark",
}: {
  className?: string;
  markClassName?: string;
  /** "dark" text on light bg, "light" text on dark bg. */
  variant?: "dark" | "light";
}) {
  const textColor = variant === "light" ? "text-cream" : "text-ink";
  const subColor = variant === "light" ? "text-gold-soft" : "text-rust";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <BrandMark className={`${markColor(variant)} ${markClassName || "h-10 w-10"}`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.32rem] font-semibold tracking-tight ${textColor}`}
        >
          Rocking&nbsp;C
        </span>
        <span
          className={`eyebrow mt-1 text-[0.55rem] tracking-[0.34em] ${subColor}`}
        >
          Cattle Co.
        </span>
      </span>
    </span>
  );
}

function markColor(variant: "dark" | "light") {
  return variant === "light" ? "text-gold-soft" : "text-rust";
}
