import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading, ButtonLink, Eyebrow } from "@/components/ui";
import { BullCard } from "@/components/BullCard";
import { SiteImage } from "@/components/SiteImage";
import { Orbs } from "@/components/Orbs";
import { getFeaturedBulls } from "@/lib/content";
import { site } from "@/data/site";
import { ArrowRight } from "@/components/icons";

const pillars = [
  {
    title: "Calving Ease",
    body: "Lim-Flex bulls deliver some of the lowest birth weights in the business. Low risk at birth, big growth after.",
  },
  {
    title: "Carcass & Yield",
    body: "We strive for heavy carcass weight without giving up marbling and quality — the Limousin growth and high yield that pays at the rail.",
  },
  {
    title: "Exceptional Docility",
    body: "This is where our herd really stands out. We specifically breed to maximize this trait, enabling us to offer some of the easiest handling bulls in the state.",
  },
];

export default async function HomePage() {
  const featured = await getFeaturedBulls();

  return (
    <>
      <Hero />
      <Marquee />

      {/* ── Value proposition ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bone py-24 sm:py-32">
        <Orbs />
        <div className="container-edge relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <SectionHeading
              eyebrow="Why it matters"
              divider
              title={
                <>
                  Your bull is{" "}
                  <span className="italic text-rust">half your herd.</span>
                </>
              }
            />
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink/75">
              He&apos;s 50% responsible for everything that comes out of your pasture.
              It&apos;s far more reasonable to put one high-performing, quality bull on
              thirty average cows than to chase the opposite. That single decision
              shapes your calf crop for years.
            </p>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-ink/75">
              The best investment you can make for your herd is a good bull.
            </p>

            <div className="mt-10 space-y-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="group rounded-sm border border-ink/15 border-l-4 border-l-rust/60 bg-cream/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-rust/40 hover:border-l-rust hover:bg-cream hover:shadow-soft"
                >
                  <h3 className="font-display text-lg text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink/65">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-ink/10">
              <SiteImage
                slot="home-feature"
                alt="A black Lim-Flex herd sire standing broadside in an East Texas pasture"
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            <div className="absolute -right-3 -top-3 hidden h-20 w-20 rounded-full border border-rust/30 lg:block float-slow" />
          </Reveal>
        </div>
      </section>

      {/* ── Philosophy band ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-field py-20 text-cream sm:py-24">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <Reveal className="container-edge relative mx-auto max-w-3xl text-center">
          <p className="text-balance font-display text-[1.7rem] leading-snug text-gold-soft sm:text-[2.2rem]">
            Good bulls aren&apos;t rushed.
          </p>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-cream/80">
            We sell our virgin bulls at 22–24 months old to make sure they are
            mature enough to get straight to work. All our bulls are fully
            vaccinated, vet checked, and fertility tested.
          </p>
        </Reveal>
      </section>

      {/* ── Featured bulls ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bone py-24 sm:py-32">
        <Orbs />
        <div className="container-edge relative">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionHeading
                eyebrow="The herd"
                divider
                title="Bulls worth a closer look"
                intro="A few of our current and recent herd sires. The newest and available bulls are always at the top of the gallery."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ButtonLink href="/bulls" variant="outline" withArrow>
                View all bulls
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {featured.map((bull, i) => (
              <RevealItem key={bull.slug}>
                <BullCard bull={bull} priority={i === 0} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── About teaser ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-edge grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right" className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-cream/10">
              <SiteImage
                slot="home-about"
                alt="A group of Rocking C Cattle bulls at the feeder in an East Texas pasture"
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-rust p-6 text-cream shadow-card sm:block">
              <p className="font-display text-4xl leading-none">Est. {site.established}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/80">
                Family owned
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="order-1 lg:order-2">
            <Eyebrow variant="gold" className="mb-5">
              Our family
            </Eyebrow>
            <h2 className="font-display text-balance text-[1.8rem] leading-[1.12] text-cream sm:text-[2.5rem]">
              Three generations, one passion for good cattle.
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-cream/75">
              We&apos;re a small family operation that saw a need for good quality bulls
              in East Texas. We all work together in the day-to-day operations and
              share a love for exceptional beef cattle.
            </p>
            <div className="mt-9">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 font-display text-lg italic text-gold-soft"
              >
                Read our story
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
