import type { Bull, BullStatus } from "@/lib/types";

export const statusLabel: Record<BullStatus, string> = {
  available: "Available",
  "coming-soon": "Coming Soon",
  sold: "Sold",
};

/**
 * Age in whole months from an ISO birth date, e.g. "23 mos" / "1 mo".
 * We talk about bulls in months, not years. Pass `asOfISO` to freeze the count
 * at a point in time — used for sold bulls so their age stops climbing (a bull
 * sold at 24 months keeps reading "24 mos", not "138 mos" years later).
 */
export function ageInMonths(bornISO?: string, asOfISO?: string): string | null {
  if (!bornISO) return null;
  const born = new Date(bornISO);
  if (Number.isNaN(born.getTime())) return null;
  const asOf = asOfISO ? new Date(asOfISO) : new Date();
  if (Number.isNaN(asOf.getTime())) return null;
  let months =
    (asOf.getFullYear() - born.getFullYear()) * 12 +
    (asOf.getMonth() - born.getMonth());
  if (asOf.getDate() < born.getDate()) months -= 1;
  if (months < 0) months = 0;
  return `${months} mo${months === 1 ? "" : "s"}`;
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
  if (bull.registrationNumber) {
    rows.push({ label: "Reg. #", value: bull.registrationNumber });
  }
  // A sold bull's age freezes at his sold date so it stops counting up.
  const asOf = bull.status === "sold" ? bull.soldDateISO : undefined;
  const age = ageInMonths(bull.bornISO, asOf);
  if (age) rows.push({ label: "Age", value: age });
  return rows;
}
