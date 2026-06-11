import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";
import { OrnateDivider } from "@/components/motifs";

type Variant = "primary" | "ghost" | "outline" | "light";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-md px-8 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[0.13em] transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rust/60 border";

const variants: Record<Variant, string> = {
  primary:
    "bg-rust text-cream border-ink/40 shadow-soft shadow-[inset_0_1px_0_rgba(245,236,211,0.22)] hover:bg-rust-deep hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "bg-ink text-cream border-ink hover:bg-ink-2 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "bg-transparent border-ink/45 text-ink hover:bg-ink hover:text-cream hover:border-ink",
  light:
    "bg-transparent border-cream/40 text-cream hover:bg-cream hover:text-ink",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  external?: boolean;
}) {
  const cls = `shine-hover ${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Eyebrow({
  children,
  className = "",
  variant = "rust",
}: {
  children: ReactNode;
  className?: string;
  variant?: "rust" | "gold" | "muted";
}) {
  const color =
    variant === "gold"
      ? "text-gold-soft"
      : variant === "muted"
        ? "text-ink/50"
        : "text-rust";
  return (
    <span className={`eyebrow inline-flex items-center gap-2.5 ${color} ${className}`}>
      {children}
      <span className="h-px w-7 bg-current opacity-40" aria-hidden />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  eyebrowVariant,
  divider = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  eyebrowVariant?: "rust" | "gold" | "muted";
  divider?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  const alignment = centered ? "items-center text-center mx-auto" : "items-start";
  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Eyebrow variant={eyebrowVariant ?? (light ? "gold" : "rust")} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={`font-display text-balance text-[1.85rem] leading-[1.08] sm:text-[2.4rem] md:text-[2.85rem] ${
          light ? "text-cream" : "text-ink letterpress"
        }`}
      >
        {title}
      </h2>
      {divider && (
        <OrnateDivider
          light={light}
          className={`mt-6 h-5 w-64 ${centered ? "" : "self-start"}`}
        />
      )}
      {intro && (
        <p
          className={`mt-5 max-w-xl text-pretty text-[1.06rem] leading-relaxed ${
            light ? "text-cream/75" : "text-ink/70"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
