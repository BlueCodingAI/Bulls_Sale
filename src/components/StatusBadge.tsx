import type { BullStatus } from "@/lib/types";
import { statusLabel } from "@/lib/format";

/** Small condensed pill used on cards & the detail header. */
export function StatusBadge({
  status,
  className = "",
}: {
  status: BullStatus;
  className?: string;
}) {
  const styles: Record<BullStatus, string> = {
    available: "bg-field text-cream ring-1 ring-gold-soft/30",
    "coming-soon": "bg-gold text-ink ring-1 ring-ink/20",
    sold: "bg-rust-deep text-cream ring-1 ring-cream/15",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1 font-condensed text-[0.68rem] font-semibold uppercase tracking-[0.18em] backdrop-blur ${styles[status]} ${className}`}
    >
      {status === "available" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cream" />
        </span>
      )}
      {statusLabel[status]}
    </span>
  );
}

/**
 * The transparent SOLD stamp overlay — a rotated, weathered "branded" mark that
 * sits over a sold bull's photo while keeping him fully visible in the gallery.
 */
export function SoldStamp({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex items-end justify-center pb-[22%] ${className}`}
      aria-hidden
    >
      <span className="-rotate-[13deg] select-none rounded-sm border-4 border-double border-cream/85 px-7 py-2 font-display text-3xl uppercase tracking-[0.12em] text-cream/90 shadow-[0_6px_24px_rgba(0,0,0,0.4)] sm:text-4xl">
        Sold
      </span>
    </div>
  );
}
