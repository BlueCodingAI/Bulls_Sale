import Image from "next/image";
import Link from "next/link";
import type { Bull } from "@/lib/types";
import { ageFromBorn } from "@/lib/format";
import { StatusBadge, SoldStamp } from "@/components/StatusBadge";
import { Tilt } from "@/components/Tilt";
import { ArrowRight } from "@/components/icons";
import { Longhorn } from "@/components/motifs";

export function BullCard({
  bull,
  priority = false,
}: {
  bull: Bull;
  priority?: boolean;
}) {
  const sold = bull.status === "sold";
  const age = ageFromBorn(bull.bornISO);
  const meta = [bull.breed, bull.color, age].filter(Boolean).join(" · ");

  return (
    <Link href={`/bulls/${bull.slug}`} className="group relative block">
      <Tilt max={6}>
        {/* Wanted-poster parchment card */}
        <div className="relative flex h-full flex-col rounded-sm bg-cream p-3 shadow-card ring-1 ring-ink/15 transition-all duration-500 group-hover:-translate-y-1 group-hover:ring-rust/40">
          {/* inner double-rule frame around the photo */}
          <div className="shine-hover relative aspect-[4/5] overflow-hidden rounded-sm border border-ink/25 bg-ink-2">
            <Image
              src={bull.photos[0].src}
              alt={bull.photos[0].alt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              priority={priority}
              className="photo-vintage object-cover group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/5 to-transparent" />
            {sold && <div className="absolute inset-0 bg-ink/35" />}
            {sold && <SoldStamp />}

            <div className="absolute left-3 top-3">
              <StatusBadge status={bull.status} />
            </div>

            {/* name plate over photo */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-tight text-cream drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {bull.name}
                </h3>
                {bull.registeredName && (
                  <p className="mt-1 truncate font-condensed text-[0.68rem] uppercase tracking-[0.18em] text-cream/75">
                    {bull.registeredName}
                  </p>
                )}
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/40 bg-cream/15 text-cream backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-rust group-hover:bg-rust">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          {/* footer plate */}
          <div className="flex items-center justify-between gap-3 px-1.5 pb-1 pt-3.5">
            <p className="flex items-center gap-2 font-condensed text-[0.74rem] uppercase tracking-[0.1em] text-ink/65">
              <Longhorn className="h-4 w-7 text-rust" />
              {meta}
            </p>
            {bull.polled && (
              <span className="rounded-sm border border-field/30 px-2 py-0.5 font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-field">
                Polled
              </span>
            )}
          </div>
        </div>
      </Tilt>
    </Link>
  );
}
