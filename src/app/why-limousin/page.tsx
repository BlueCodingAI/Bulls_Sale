import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading, Eyebrow } from "@/components/ui";
import { CheckCircle, ArrowRight } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Why Lim-Flex",
  description:
    "Lim-Flex pairs the size, muscle, and high carcass yield of Limousin with Angus marbling and quality — bred for easy calving and explosive growth. Here's why it makes a superior herd sire.",
};

const limflexPoints = [
  "Angus marbling & quality",
  "Limousin growth & high yield",
  "Maximum feed efficiency",
  "Low birth weights, big returns",
];

const limousinPoints = [
  "Large-framed and heavily muscled",
  "Superior carcass yield",
  "Incredible feed efficiency",
  "Eye-catching size and muscling",
];

export default function WhyLimFlexPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Breed"
        title="Why Lim-Flex?"
        intro="If you crunch numbers and want the biggest impact on your bottom line, the breed of your herd sire matters. Here's why we built our program around Lim-Flex genetics — with old-world Limousin in the mix for those who want it."
        image="/gallery/herd-2.jpg"
        imageAlt="Lim-Flex herd sires in an East Texas pasture"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Why Lim-Flex", href: "/why-limousin" },
        ]}
      />

      {/* Lim-Flex — the main attraction */}
      <section className="bg-bone py-24 sm:py-32">
        <div className="container-edge grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <SectionHeading
              divider
              eyebrow="The numbers bull"
              title={
                <>
                  Lim-Flex: built for <span className="italic text-rust">your bottom line.</span>
                </>
              }
            />
            <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-ink/75">
              <p>
                If you&apos;re a cattle producer that crunches numbers and wants the
                largest impact to your bottom line, Lim-Flex (Limousin × Angus) is the
                herd sire you need.
              </p>
              <p>
                Lim-Flex was developed to mix the larger, longer, and deeper Limousin
                frame that has exceptional muscling with the benefits of Angus. We
                review generations of genetic information to find matches that result
                in easy calving and explosive growth. We value maternal traits such as
                birth weight, milk, and stayability — as well as the carcass traits and
                high yield that buyers want to see at the sale barn.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {limflexPoints.map((p) => (
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
                src="/bulls/lebron/1.jpg"
                alt="A black Lim-Flex herd sire in the pasture"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Limousin — the old-world option underneath */}
      <section className="relative overflow-hidden bg-field py-24 text-cream sm:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-edge relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right" className="order-2 lg:order-1 relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-cream/10">
              <Image
                src="/bulls/marvin/1.jpg"
                alt="A red old-world Limousin showing breed size and muscling"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="order-1 lg:order-2">
            <Eyebrow variant="gold" className="mb-5">
              The old-world option
            </Eyebrow>
            <h2 className="font-display text-balance text-[2rem] leading-[1.1] text-cream sm:text-[2.7rem]">
              Limousin: size and muscle, done right.
            </h2>
            <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-cream/80">
              <p>
                Some producers still prefer the original Limousin, and we keep a few on
                hand for them. Limousin are known for being large-framed, muscular beef
                cattle that provide superior carcass yield with incredible feed
                efficiency. If you&apos;re looking for size and eye-catching muscling,
                Limousin is the way to go.
              </p>
              <p>
                Our Limousin lines are from the UK and selectively AI&apos;d to fullblood
                sires to maximize the old-world features.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {limousinPoints.map((p) => (
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
              thirty average cows than to buy thirty high-end cows and turn out an
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
                    to read more about Lim-Flex and the benefits they offer. NALF has
                    fantastic studies and research showing how Lim-Flex can outperform
                    other breeds as a herd sire.
                  </p>
                </div>

                <RevealGroup className="grid gap-4" stagger={0.1}>
                  {[
                    { stat: "Top", label: "High carcass yield" },
                    { stat: "Low", label: "Birth weights, big growth" },
                    { stat: "Max", label: "Feed efficiency" },
                  ].map((b) => (
                    <RevealItem
                      key={b.label}
                      className="flex items-center justify-between gap-4 rounded-xl bg-ink px-6 py-6 text-cream"
                    >
                      <span className="font-display text-3xl text-gold-soft sm:text-4xl">{b.stat}</span>
                      <span className="text-right text-base font-medium text-cream/85 sm:text-lg">{b.label}</span>
                    </RevealItem>
                  ))}
                  <a
                    href={site.nalf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-6 py-4 text-base font-semibold text-ink transition-colors hover:border-rust hover:text-rust sm:text-lg"
                  >
                    Visit {site.nalf.abbr}.org
                    <ArrowRight className="h-5 w-5" />
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
