import Image from "next/image";
import { site } from "@/data/site";

/**
 * The "Rocking C" brand mark — the client's logo artwork (a serif C seated on a
 * rocker curve inside a roping-circle badge), saved as a transparent PNG at
 * `public/logo.png`.
 *
 * `tone="natural"` shows the artwork in its own rust-brown color — use it on
 * light backgrounds. `tone="light"` paints the logo shape with `currentColor`
 * via a CSS mask, so it reads as a light gold/cream reverse on dark
 * backgrounds (the brown would otherwise disappear). Pass the color through
 * `className` (e.g. `text-gold-soft`) for the light tone.
 */
export function BrandMark({
  className = "",
  tone = "natural",
}: {
  className?: string;
  tone?: "natural" | "light";
}) {
  if (tone === "light") {
    return (
      <span
        role="img"
        aria-label={`${site.name} logo`}
        className={className}
        style={{
          backgroundColor: "currentColor",
          WebkitMaskImage: "url(/logo.png)",
          maskImage: "url(/logo.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    );
  }
  return (
    <Image
      src="/logo.png"
      alt={`${site.name} logo`}
      width={40}
      height={40}
      priority
      className={`object-contain ${className}`}
    />
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
  const onDark = variant === "light";
  const textColor = onDark ? "text-cream" : "text-ink";
  const subColor = onDark ? "text-gold-soft" : "text-rust";
  const size = markClassName || "h-10 w-10";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {onDark ? (
        <BrandMark tone="light" className={`text-gold-soft ${size}`} />
      ) : (
        <BrandMark tone="natural" className={size} />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.32rem] font-semibold tracking-tight ${textColor}`}
        >
          Rocking&nbsp;C
        </span>
        <span
          className={`eyebrow mt-1 text-[0.55rem] tracking-[0.34em] ${subColor}`}
        >
          Cattle
        </span>
      </span>
    </span>
  );
}
