import type { Bull, BullStatus } from "@/lib/types";

export const statusLabel: Record<BullStatus, string> = {
  available: "Available",
  "coming-soon": "Coming Soon",
  sold: "Sold",
};

/** Whole-number age like "2 yrs" / "11 mos" from an ISO birth date. */
export function ageFromBorn(bornISO?: string): string | null {
  if (!bornISO) return null;
  const born = new Date(bornISO);
  if (Number.isNaN(born.getTime())) return null;
  const now = new Date();
  let months =
    (now.getFullYear() - born.getFullYear()) * 12 +
    (now.getMonth() - born.getMonth());
  if (now.getDate() < born.getDate()) months -= 1;
  if (months < 0) months = 0;
  if (months < 24) return `${months} mo${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  return `${years} yr${years === 1 ? "" : "s"}`;
}

export function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export function formatWeight(lbs?: number): string | null {
  if (!lbs) return null;
  return `${lbs.toLocaleString("en-US")} lbs`;
}

/** Compact quick-spec rows for a bull card / detail header. */
export function quickSpecs(bull: Bull): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  rows.push({ label: "Breed", value: bull.breed });
  rows.push({ label: "Color", value: bull.color });
  const age = ageFromBorn(bull.bornISO);
  if (age) rows.push({ label: "Age", value: age });
  if (bull.polled) rows.push({ label: "Polled", value: "Yes" });
  return rows;
}
