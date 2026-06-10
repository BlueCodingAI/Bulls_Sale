import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading, ButtonLink, Eyebrow } from "@/components/ui";
import { BullCard } from "@/components/BullCard";
import { CountUp } from "@/components/CountUp";
import { Orbs } from "@/components/Orbs";
import { getFeaturedBulls } from "@/data/bulls";
import { site } from "@/data/site";
import { ArrowRight } from "@/components/icons";
import { Star, Longhorn, Horseshoe, Wheat, Steer, OrnateDivider } from "@/components/motifs";

const pillars = [
  {
    Icon: Horseshoe,
    title: "Calving Ease",
    body: "Lim-Flex bulls deliver some of the lowest birth weights in the business — 60–65 lb calves that wean off at 700–800 lb. Low risk at birth, big growth after.",
  },
  {
    Icon: Steer,
    title: "Carcass & Cutout",
    body: "We strive for heavy carcass weight without giving up marbling and quality — the Limousin growth and yield that pays at the rail.",
  },
  {
    Icon: Star,
    title: "Exceptional Docility",
    body: "This is where our herd really stands out. Our bulls take cubes from your hand and load like gentlemen. Calm genetics, calm cattle.",
  },
];

const stats = [
  { Icon: Horseshoe, display: "60–65", unit: "lb", label: "Birth weights" },
  { Icon: Wheat, display: "700–800", unit: "lb", label: "Weaning weights" },
  { Icon: Longhorn, display: "1,400–1,600", unit: "lb", label: "Two-year-old bulls" },
  { Icon: Star, value: 3, unit: "gen", label: "Generations of ranchers" },
];

export default function HomePage() {
  const featured = getFeaturedBulls();

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
              forty average cows than to chase the opposite. That single decision
              shapes your calf crop for years.
            </p>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-ink/75">
              The best investment you can make for your herd is a good bull — and
              that&apos;s the only thing we raise.
            </p>

            <div className="mt-10 space-y-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="group flex gap-5 rounded-sm border border-ink/15 bg-cream/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-rust/40 hover:bg-cream hover:shadow-soft"
                >
                  <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-rust/25 bg-rust/10 text-rust transition-transform duration-300 group-hover:scale-110">
                    <p.Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink/65">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-ink/10">
              <Image
                src="/bulls/lebron/1.jpg"
                alt="A black Lim-Flex herd sire standing broadside in an East Texas pasture"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            {/* floating stat card */}
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-ink p-6 text-cream shadow-card sm:block">
              <p className="font-display text-4xl leading-none text-gold-soft">100%</p>
              <p className="mt-2 max-w-[10rem] text-xs leading-snug text-cream/70">
                AI-bred with handpicked straws — every match chosen on purpose.
              </p>
            </div>
            <div className="absolute -right-3 -top-3 hidden h-20 w-20 rounded-full border border-rust/30 lg:block float-slow" />
          </Reveal>
        </div>
      </section>

      {/* ── Stat band ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-field py-16 text-cream">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <RevealGroup className="container-edge relative grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label} className="group text-center">
              <div className="mb-3 flex justify-center text-gold-soft transition-transform duration-300 group-hover:-translate-y-1">
                <s.Icon className="h-8 w-8" />
              </div>
              <p className="font-display text-3xl leading-none text-gold-soft sm:text-[2.4rem]">
                <CountUp value={s.value} display={s.display} />
                <span className="ml-1 font-condensed text-base font-normal text-cream/60">{s.unit}</span>
              </p>
              <p className="mt-3 font-condensed text-xs uppercase tracking-[0.18em] text-cream/65">
                {s.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
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
              <Image
                src="/gallery/herd-1.jpg"
                alt="A group of Rocking C Cattle bulls at the feeder in an East Texas pasture"
                fill
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
              in East Texas. Papa and Gooey, their son Bruce and daughter-in-law
              Victoria, and our CEO &amp; BRO Kimber all work together to share the
              knowledge — and the love of the land — that&apos;s been in our family for
              generations.
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
            <Longhorn className="mt-12 h-16 w-auto text-cream/30" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
