import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BullMedia } from "@/components/BullMedia";
import { BullCard } from "@/components/BullCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { CheckCircle, ArrowRight } from "@/components/icons";
import type { Bull } from "@/lib/types";
import { getBull, getBullsSorted, getAllBullSlugs } from "@/lib/content";
import { site } from "@/data/site";
import { formatDate, formatWeight, quickSpecs } from "@/lib/format";

export async function generateStaticParams() {
  return (await getAllBullSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bull = await getBull(slug);
  if (!bull) return { title: "Bull not found" };
  const status =
    bull.status === "sold" ? "Sold" : bull.status === "coming-soon" ? "Coming Soon" : "Available";
  return {
    title: `${bull.name} — ${bull.breed} ${status}`,
    description: `${bull.name}: ${bull.tagline} ${bull.breed}, ${bull.color}. ${bull.description.slice(0, 120)}`,
    openGraph: {
      title: `${bull.name} · ${site.name}`,
      description: bull.tagline,
      images: [{ url: bull.photos[0].src }],
    },
  };
}

const weightRows = (bull: Bull) =>
  [
    { label: "Birth weight", value: formatWeight(bull?.birthWeightLbs) },
    { label: "Weaning weight", value: formatWeight(bull?.weaningWeightLbs) },
    { label: "Current weight", value: formatWeight(bull?.currentWeightLbs) },
  ].filter((r) => r.value);

export default async function BullDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bull = await getBull(slug);
  if (!bull) notFound();

  const sold = bull.status === "sold";
  const specs = quickSpecs(bull);
  const weights = weightRows(bull);
  const related = (await getBullsSorted())
    .filter((b) => b.slug !== bull.slug)
    .slice(0, 3);

  const pedigree = [
    { label: "Registered name", value: bull.registeredName },
    { label: "Reg. number", value: bull.registrationNumber },
    { label: "Sire", value: bull.sire },
    { label: "Dam", value: bull.dam },
    { label: "Born", value: formatDate(bull.bornISO) },
  ].filter((r) => r.value);

  return (
    <article className="bg-bone">
      {/* spacer for fixed nav */}
      <div className="h-[4.6rem] bg-ink" />

      {/* Breadcrumb */}
      <div className="border-b border-ink/8 bg-ink/95">
        <nav
          aria-label="Breadcrumb"
          className="container-edge flex items-center gap-2 py-4 text-xs text-cream/55"
        >
          <Link href="/" className="hover:text-cream">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/bulls" className="hover:text-cream">Our Bulls</Link>
          <span aria-hidden>/</span>
          <span className="text-cream/85">{bull.name}</span>
        </nav>
      </div>

      {/* Hero / overview */}
      <section className="container-edge grid gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-20">
        <Reveal direction="right">
          <BullMedia
            name={bull.name}
            photos={bull.photos}
            videos={bull.videos}
            sold={sold}
          />
        </Reveal>

        <Reveal direction="left" delay={0.05}>
          <div className="lg:sticky lg:top-28">
            <StatusBadge status={bull.status} />
            <h1 className="mt-4 font-display text-5xl font-semibold leading-none text-ink sm:text-6xl">
              {bull.name}
            </h1>
            {bull.registeredName && (
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-rust">
                {bull.registeredName}
              </p>
            )}
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink/75">
              {bull.tagline}
            </p>

            {/* quick specs */}
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-4">
              {specs.map((s) => (
                <div key={s.label} className="bg-cream px-4 py-4">
                  <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-ink/45">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-lg text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {sold ? (
                <ButtonLink
                  href="/bulls"
                  variant="ghost"
                  withArrow
                  className="flex-1"
                >
                  See available bulls
                </ButtonLink>
              ) : (
                <ButtonLink
                  href={`/contact?bull=${encodeURIComponent(bull.name)}`}
                  variant="primary"
                  withArrow
                  className="flex-1"
                >
                  Contact us about {bull.name}
                </ButtonLink>
              )}
              <a
                href={site.phoneHref}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50 hover:bg-ink hover:text-cream"
              >
                Call us
              </a>
            </div>

            {sold && (
              <p className="mt-4 text-sm text-ink/55">
                {bull.name} has been sold{formatDate(bull.soldDateISO) ? ` (${formatDate(bull.soldDateISO)})` : ""}, but he stays here so you can see the kind of cattle we raise.
              </p>
            )}
          </div>
        </Reveal>
      </section>

      {/* Description + highlights */}
      <section className="border-t border-ink/8 bg-cream py-16 sm:py-20">
        <div className="container-edge grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl text-ink">About {bull.name}</h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink/75">
              {bull.description}
            </p>

            {weights.length > 0 && (
              <div className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                {weights.map((w) => (
                  <div key={w.label} className="bg-cream px-4 py-5 text-center">
                    <p className="font-display text-2xl text-rust">{w.value}</p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.1em] text-ink/50">
                      {w.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            {bull.highlights && bull.highlights.length > 0 && (
              <div className="rounded-2xl border border-ink/10 bg-bone p-7">
                <h3 className="eyebrow text-rust">Highlights</h3>
                <ul className="mt-5 space-y-4">
                  {bull.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-rust" />
                      <span className="text-pretty text-ink/80">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* EPDs + Pedigree/registration */}
      {(bull.epds?.length || pedigree.length > 0) && (
        <section className="bg-bone py-16 sm:py-20">
          <div className="container-edge grid gap-12 lg:grid-cols-2 lg:gap-16">
            {bull.epds && bull.epds.length > 0 && (
              <Reveal>
                <h2 className="font-display text-3xl text-ink">EPDs</h2>
                <p className="mt-2 text-sm text-ink/55">
                  Expected Progeny Differences. Sample figures shown — full
                  registration data available on request.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {bull.epds.map((e) => (
                    <div
                      key={e.label}
                      className="rounded-xl border border-ink/10 bg-cream px-4 py-5 text-center"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/45">
                        {e.label}
                      </p>
                      <p className="mt-1.5 font-display text-2xl text-ink">{e.value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl text-ink">Registration &amp; Pedigree</h2>
              <p className="mt-2 text-sm text-ink/55">
                Registered with the {site.nalf.name}.
              </p>
              <dl className="mt-6 divide-y divide-ink/10 overflow-hidden rounded-2xl border border-ink/10 bg-cream">
                {pedigree.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-4">
                    <dt className="text-sm text-ink/55">{row.label}</dt>
                    <dd className="text-right font-medium text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={site.nalf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rust hover:text-rust-deep"
              >
                Learn more at {site.nalf.abbr}.org
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-ink/8 bg-cream py-20">
          <div className="container-edge">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">More from the herd</h2>
              <Link
                href="/bulls"
                className="hidden items-center gap-2 text-sm font-semibold text-rust hover:text-rust-deep sm:inline-flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((b) => (
                <BullCard key={b.slug} bull={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
