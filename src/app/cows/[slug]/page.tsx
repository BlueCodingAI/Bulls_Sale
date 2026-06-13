import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BullMedia } from "@/components/BullMedia";
import { BullCard } from "@/components/BullCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import { getCow, getCowsSorted, getAllCowSlugs } from "@/lib/content";
import { site } from "@/data/site";
import { formatDate, quickSpecs } from "@/lib/format";

// Cows are added through /admin, so render any slug on demand.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllCowSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cow = await getCow(slug);
  if (!cow) return { title: "Not found" };
  const status =
    cow.status === "sold" ? "Sold" : cow.status === "coming-soon" ? "Coming Soon" : "Available";
  return {
    title: `${cow.name} — ${cow.breed} ${status}`,
    description: `${cow.name}: ${cow.tagline} ${cow.breed}, ${cow.color}. ${cow.description.slice(0, 120)}`,
    openGraph: {
      title: `${cow.name} · ${site.name}`,
      description: cow.tagline,
      images: [{ url: cow.photos[0].src }],
    },
  };
}

export default async function CowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cow = await getCow(slug);
  if (!cow) notFound();

  const sold = cow.status === "sold";
  const specs = quickSpecs(cow);
  const related = (await getCowsSorted())
    .filter((c) => c.slug !== cow.slug)
    .slice(0, 3);

  const pedigree = [
    { label: "Registered name", value: cow.registeredName },
    { label: "Reg. number", value: cow.registrationNumber },
    { label: "Sire", value: cow.sire },
    { label: "Dam", value: cow.dam },
    { label: "Born", value: formatDate(cow.bornISO) },
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
          <Link href="/cows" className="hover:text-cream">Cows</Link>
          <span aria-hidden>/</span>
          <span className="text-cream/85">{cow.name}</span>
        </nav>
      </div>

      {/* Hero / overview */}
      <section className="container-edge grid gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-20">
        <Reveal direction="right">
          <BullMedia
            name={cow.name}
            photos={cow.photos}
            videos={cow.videos}
            sold={sold}
          />
        </Reveal>

        <Reveal direction="left" delay={0.05}>
          <div className="lg:sticky lg:top-28">
            <StatusBadge status={cow.status} />
            <h1 className="mt-4 font-display text-5xl font-semibold leading-none text-ink sm:text-6xl">
              {cow.name}
            </h1>
            {cow.registeredName && (
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-rust">
                {cow.registeredName}
              </p>
            )}
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink/75">
              {cow.tagline}
            </p>

            {/* quick specs */}
            <dl
              className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10"
              style={{ gridTemplateColumns: `repeat(${specs.length}, minmax(0, 1fr))` }}
            >
              {specs.map((s) => (
                <div key={s.label} className="bg-cream px-4 py-4">
                  <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-ink/45">
                    {s.label}
                  </dt>
                  <dd className="mt-1 break-words font-display text-base text-ink sm:text-lg">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* CTA — a single button through to the contact page (phone numbers live there). */}
            <div className="mt-8">
              {sold ? (
                <ButtonLink href="/cows" variant="ghost" withArrow className="w-full sm:w-auto">
                  See available cows
                </ButtonLink>
              ) : (
                <ButtonLink
                  href={`/contact?bull=${encodeURIComponent(cow.name)}`}
                  variant="primary"
                  withArrow
                  className="w-full sm:w-auto"
                >
                  Contact us about {cow.name}
                </ButtonLink>
              )}
            </div>

            {sold && (
              <p className="mt-4 text-sm text-ink/55">
                {cow.name} has been sold{formatDate(cow.soldDateISO) ? ` (${formatDate(cow.soldDateISO)})` : ""}, but she stays here so you can see the kind of cattle we raise.
              </p>
            )}
          </div>
        </Reveal>
      </section>

      {/* EPDs + Pedigree/registration */}
      {(cow.epds?.length || pedigree.length > 0) && (
        <section className="bg-bone py-16 sm:py-20">
          <div className="container-edge grid gap-12 lg:grid-cols-2 lg:gap-16">
            {cow.epds && cow.epds.length > 0 && (
              <Reveal>
                <h2 className="font-display text-3xl text-ink">EPDs</h2>
                <p className="mt-2 text-sm text-ink/55">Expected Progeny Differences.</p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {cow.epds.map((e) => (
                    <div
                      key={e.label}
                      className="rounded-xl border border-ink/10 bg-cream px-4 py-5 text-center"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink/55">
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
                    <dt className="text-base text-ink/55">{row.label}</dt>
                    <dd className="text-right text-base font-medium text-ink">{row.value}</dd>
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
                href="/cows"
                className="hidden items-center gap-2 text-sm font-semibold text-rust hover:text-rust-deep sm:inline-flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <BullCard key={c.slug} bull={c} basePath="/cows" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
