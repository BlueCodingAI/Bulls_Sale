import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading, ButtonLink, Eyebrow } from "@/components/ui";
import { CheckCircle, ArrowRight } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Why Limousin & Lim-Flex",
  description:
    "Limousin cattle bring size, muscle, and carcass yield with great feed efficiency. Lim-Flex pairs Angus marbling with Limousin growth. Learn why they make superior herd sires.",
};

const limousinPoints = [
  "Large-framed and heavily muscled",
  "Superior carcass yield",
  "Incredible feed efficiency",
  "Eye-catching size and muscling",
];

const limflexPoints = [
  "Angus marbling & quality",
  "Limousin growth & cutout",
  "Maximum feed efficiency",
  "Low birth weights, big returns",
];

export default function WhyLimousinPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Breed"
        title="Why Limousin & Lim-Flex?"
        intro="If you crunch numbers and want the biggest impact on your bottom line, the breed of your herd sire matters. Here's why we built our program around Limousin genetics."
        image="/gallery/herd-2.jpg"
        imageAlt="Limousin-influenced bulls in an East Texas pasture"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Why Limousin", href: "/why-limousin" },
        ]}
      />

      {/* Limousin */}
      <section className="bg-bone py-24 sm:py-32">
        <div className="container-edge grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <SectionHeading
              divider
              eyebrow="Old-world power"
              title={
                <>
                  Limousin: size and muscle, <span className="italic text-rust">done right.</span>
                </>
              }
            />
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink/75">
              Limousin are known for being large-framed, muscular beef cattle. They
              provide superior carcass yield with incredible feed efficiency. If
              you&apos;re looking for size and eye-catching muscling, Limousin is the way
              to go.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {limousinPoints.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-xl border border-ink/10 bg-cream px-4 py-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-rust" />
                  <span className="text-sm text-ink/80">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-ink/10">
              <Image
                src="/bulls/marvin/1.jpg"
                alt="A red Limousin bull showing breed size and muscling"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lim-Flex */}
      <section className="relative overflow-hidden bg-field py-24 text-cream sm:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-edge relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right" className="order-2 lg:order-1 relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-cream/10">
              <Image
                src="/bulls/lebron/1.jpg"
                alt="A black Lim-Flex herd sire in the pasture"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="order-1 lg:order-2">
            <Eyebrow variant="gold" className="mb-5">
              The numbers bull
            </Eyebrow>
            <h2 className="font-display text-balance text-[2rem] leading-[1.1] text-cream sm:text-[2.7rem]">
              Lim-Flex: built for your bottom line.
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/80">
              If you&apos;re a cattle producer that crunches numbers and wants the largest
              impact to your bottom line, Lim-Flex (Limousin × Angus) is the herd
              sire you need. Lim-Flex was developed to capitalize on the marbling and
              quality of Angus and the growth and cutout of Limousin — with maximum
              feed efficiency.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {limflexPoints.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-xl border border-cream/15 bg-cream/[0.06] px-4 py-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-gold-soft" />
                  <span className="text-sm text-cream/85">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The 50% argument */}
      <section className="bg-ink py-24 text-cream sm:py-28">
        <div className="container-edge">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow variant="gold" className="mb-6 justify-center">
              The smart math
            </Eyebrow>
            <p className="text-balance font-display text-[1.7rem] leading-snug text-cream sm:text-4xl">
              It&apos;s far more reasonable to put one high-performing, quality bull on
              forty average cows than to buy forty high-end cows and turn out an
              average bull on them.
            </p>
            <p className="mt-6 text-cream/65">
              That&apos;s the difference a herd sire makes — and why the right bull is the
              best investment in your operation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* NALF */}
      <section className="bg-bone py-24 sm:py-32">
        <div className="container-edge">
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream shadow-soft">
              <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                <div>
                  <Eyebrow className="mb-5">Proud Members</Eyebrow>
                  <h2 className="font-display text-3xl text-ink sm:text-4xl">
                    North American Limousin Foundation
                  </h2>
                  <p className="mt-5 text-pretty text-lg leading-relaxed text-ink/75">
                    We&apos;re proud members of the {site.nalf.name} and we encourage you
                    to read more about Lim-Flex and the benefits they offer. NALF
                    links to fantastic studies and research showing how Lim-Flex can
                    outperform other breeds as a herd sire.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={site.nalf.limflexUrl} variant="primary" withArrow external>
                      About Lim-Flex
                    </ButtonLink>
                    <ButtonLink href={site.nalf.researchUrl} variant="outline" external>
                      Research & Studies
                    </ButtonLink>
                  </div>
                </div>

                <RevealGroup className="grid gap-4" stagger={0.1}>
                  {[
                    { stat: "Top", label: "Carcass yield & cutout" },
                    { stat: "Low", label: "Birth weights, big growth" },
                    { stat: "Max", label: "Feed efficiency" },
                  ].map((b) => (
                    <RevealItem
                      key={b.label}
                      className="flex items-center justify-between rounded-xl bg-ink px-6 py-5 text-cream"
                    >
                      <span className="font-display text-2xl text-gold-soft">{b.stat}</span>
                      <span className="text-sm text-cream/75">{b.label}</span>
                    </RevealItem>
                  ))}
                  <a
                    href={site.nalf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-6 py-4 text-sm font-semibold text-ink transition-colors hover:border-rust hover:text-rust"
                  >
                    Visit {site.nalf.abbr}.org
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </RevealGroup>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
