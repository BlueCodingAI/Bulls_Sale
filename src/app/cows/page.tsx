import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { BullCard } from "@/components/BullCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { SocialLinks } from "@/components/SocialLinks";
import { cows } from "@/data/cows";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Cows",
  description:
    "Rocking C Cattle offers registered Lim-Flex and Limousin cows and heifers from time to time as we advance our genetic lines. Reach out or check back for current availability.",
};

export default function CowsPage() {
  const available = cows.filter((c) => c.status === "available");

  return (
    <>
      <PageHeader
        eyebrow="The Herd"
        title="Cows & Heifers"
        intro="We will have cows and heifers available from time to time as we advance our genetic lines. Reach out or check back to see if we have anything currently available."
        image="/gallery/herd-1.jpg"
        imageAlt="Rocking C Cattle cows in an East Texas pasture"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Cows", href: "/cows" },
        ]}
      />

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-edge">
          {available.length > 0 ? (
            <RevealGroup className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {available.map((cow, i) => (
                <RevealItem key={cow.slug}>
                  <BullCard bull={cow} priority={i < 3} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Reveal className="mx-auto flex max-w-2xl flex-col items-center rounded-[1.75rem] border border-dashed border-ink/20 bg-cream/60 px-8 py-20 text-center">
              <p className="font-display text-3xl text-ink sm:text-4xl">
                Nothing available right now
              </p>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-ink/70">
                We don&apos;t have any cows or heifers offered at the moment — but that
                changes as our genetic lines advance. Reach out or check back soon, and
                follow along on Facebook and TikTok to see what&apos;s coming.
              </p>
              <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
                <ButtonLink href="/contact" withArrow>
                  Reach out
                </ButtonLink>
                <SocialLinks />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Reassurance / contact nudge */}
      <section className="border-t border-ink/8 bg-cream py-16">
        <div className="container-edge flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-pretty text-lg text-ink/70">
            Nothing is sold through this website — it&apos;s here so you can get to know
            our cattle. When you see something you like, reach out and we&apos;ll talk.
          </p>
          <Link
            href={`mailto:${site.email}`}
            className="font-display text-xl italic text-rust underline-offset-4 hover:underline"
          >
            {site.email}
          </Link>
        </div>
      </section>
    </>
  );
}
