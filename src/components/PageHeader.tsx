import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui";

/**
 * Interior page banner. Optionally renders a background image with a dark
 * overlay; otherwise a clean ink panel. Includes an optional breadcrumb.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  breadcrumb,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  breadcrumb?: { label: string; href: string }[];
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink-2 via-ink to-ink" />
      )}
      <div className="grain pointer-events-none absolute inset-0 opacity-20" />

      <div
        className={`container-edge relative flex flex-col pb-16 pt-36 sm:pt-40 ${
          centered ? "items-center text-center" : "items-start"
        }`}
      >
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-cream/55"
          >
            {breadcrumb.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                <Link href={c.href} className="transition-colors hover:text-cream">
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <Eyebrow variant="gold" className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.05] text-balance sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {intro && (
          <p
            className={`mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream/75 ${
              centered ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
