import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BullsGallery } from "@/components/BullsGallery";
import { getBullsSorted, resolveImage } from "@/lib/content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Bulls",
  description:
    "Browse Rocking C Cattle's registered Lim-Flex and Limousin herd sires. Available and recently sold bulls — newest first.",
};

export default async function BullsPage() {
  const bulls = await getBullsSorted();

  return (
    <>
      <PageHeader
        eyebrow="The Gallery"
        title="Our Bulls"
        intro="Available and coming-soon bulls sit at the top; sold bulls stay in the gallery so you can see the kind of cattle we raise. Search by name or filter by status."
        image={await resolveImage("bulls-header")}
        imageAlt="Rocking C Cattle bulls grazing in an East Texas pasture"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Our Bulls", href: "/bulls" },
        ]}
      />

      <section className="bg-bone py-16 sm:py-20">
        <div className="container-edge">
          <BullsGallery bulls={bulls} />
        </div>
      </section>

      {/* Reassurance / contact nudge */}
      <section className="border-t border-ink/8 bg-cream py-16">
        <div className="container-edge flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-pretty text-lg text-ink/70">
            Nothing is sold through this website — it&apos;s here so you can get to know
            our cattle. When you see a bull you like, reach out and we&apos;ll talk.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="font-display text-xl italic text-rust underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </div>
      </section>
    </>
  );
}
