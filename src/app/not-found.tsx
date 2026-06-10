import Link from "next/link";
import { BrandMark } from "@/components/Logo";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-20" />
      <div className="container-edge relative flex flex-col items-center text-center">
        <BrandMark className="h-16 w-16 text-gold-soft" />
        <p className="eyebrow mt-8 text-gold-soft">Lost in the pasture</p>
        <h1 className="mt-4 font-display text-6xl font-semibold text-cream sm:text-7xl">
          404
        </h1>
        <p className="mt-4 max-w-md text-pretty text-cream/70">
          We couldn&apos;t find that page. The bull you&apos;re looking for may have moved on —
          let&apos;s get you back to the herd.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary" withArrow>
            Back home
          </ButtonLink>
          <Link
            href="/bulls"
            className="inline-flex items-center justify-center rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            View our bulls
          </Link>
        </div>
      </div>
    </section>
  );
}
