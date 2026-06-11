import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SiteImage } from "@/components/SiteImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading, ButtonLink } from "@/components/ui";
import { resolveImage } from "@/lib/content";
import { team, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Rocking C Cattle is a three-generation, family-owned ranch in East Texas raising registered Lim-Flex and Limousin bulls — bred for calving ease, carcass quality, and docility.",
};

const breedingFor = [
  {
    title: "Birth weight & calving ease",
    body: "Lim-Flex bulls give some of the lowest birth weights out there. People worry that hurts growth — it doesn't. Limousin genetics mean BIG, so our 60–65 lb calves still wean at 700–800 lb, and our two-year-olds run 1,400–1,600 lb.",
  },
  {
    title: "Carcass weight & yield",
    body: "We strive to maintain a high carcass yield without sacrificing the quality. These traits keep buyers coming back.",
  },
  {
    title: "Docility",
    body: "This is where our herd really stands out. We specifically breed to maximize this trait, enabling us to offer some of the easiest handling bulls in the state.",
  },
];

export default async function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Family"
        title="Three generations, one passion for good cattle."
        intro="We're a small, family-owned operation that saw a need for good quality Lim-Flex bulls in the East Texas area — and set out to raise them right."
        image={await resolveImage("about-header")}
        imageAlt="Rocking C Cattle in an East Texas pasture"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />

      {/* Story */}
      <section className="bg-bone py-24 sm:py-32">
        <div className="container-edge grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <SectionHeading eyebrow={`Est. ${site.established}`} divider title="A long family lineage in the cattle business." />
            <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-ink/75">
              <p>
                We started this journey in {site.established}, but cattle have been in
                our family for generations. The team is three generations working
                side by side — sharing knowledge, swapping stories, and chasing the
                same goal: the best bulls we can possibly raise for our customers.
              </p>
              <p>
                We run both Lim-Flex and old-world red Limousin, so no matter what
                your goals are for your herd, we have a bull for you. Our herd is AI&apos;d
                with handpicked straws to bring out the best genetic match for each
                and every cow, and we&apos;re constantly working to improve our genetics
                generation after generation.
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-ink/10">
              <SiteImage
                slot="about-story"
                alt="Rocking C Cattle bulls in the pasture"
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-edge relative">
          <Reveal>
            <SectionHeading
              light
              align="center"
              divider
              eyebrow="Meet the team"
              title="The people behind the brand"
              intro="Three generations — and one very important dog — make Rocking C Cattle what it is."
              className="mx-auto"
            />
          </Reveal>

          <RevealGroup className="mx-auto mt-16 grid max-w-4xl gap-7 md:grid-cols-2" stagger={0.12}>
            {team.map((member) => (
              <RevealItem
                key={member.name}
                className="group flex flex-col rounded-sm border border-cream/15 border-t-2 border-t-gold-soft/50 bg-cream/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-soft/40 hover:bg-cream/[0.07]"
              >
                <h3 className="font-display text-2xl text-cream">{member.name}</h3>
                <p className="mt-1.5 font-condensed text-xs uppercase tracking-[0.16em] text-gold-soft">
                  {member.role}
                </p>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-cream/70">
                  {member.blurb}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* What we breed for */}
      <section className="bg-bone py-24 sm:py-32">
        <div className="container-edge">
          <Reveal>
            <SectionHeading
              eyebrow="Our standards"
              divider
              title="What we breed for"
              intro="Every genetic aspect is considered, but a few traits get extra attention in our program."
            />
          </Reveal>

          <RevealGroup className="mt-14 grid gap-7 md:grid-cols-3" stagger={0.12}>
            {breedingFor.map((item, i) => (
              <RevealItem
                key={item.title}
                className="rounded-sm border border-ink/15 bg-cream p-8 shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="font-display text-5xl text-rust/30">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-ink/70">
                  {item.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-16 flex flex-col items-center gap-6 text-center">
            <p className="max-w-2xl text-balance font-display text-2xl italic leading-snug text-ink sm:text-3xl">
              &ldquo;The best investment you can make for your herd is a good quality
              bull. He&apos;s 50% responsible for everything that comes out of your
              pasture.&rdquo;
            </p>
            <ButtonLink href="/bulls" withArrow>
              See our bulls
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
