/**
 * Self-hosted, privacy-light marketing analytics.
 * Page views + contact inquiries are appended to JSONL files on disk and
 * aggregated for the admin dashboard. No third-party scripts, no cookies, no
 * IP storage — just counts of what's getting attention.
 *
 * SERVER ONLY.
 */
import { appendJSONL, readJSONL } from "@/lib/store";

const EVENTS_FILE = "events.jsonl";
const INQUIRIES_FILE = "inquiries.jsonl";

export interface ViewEvent {
  t: "view";
  path: string;
  ref: string; // referrer hostname, or "" for direct
  ts: number;
}

export interface InquiryRecord {
  name: string;
  email: string;
  interest: string;
  ts: number;
}

const DAY = 86_400_000;

export function recordView(path: string, ref: string): Promise<void> {
  return appendJSONL(EVENTS_FILE, {
    t: "view",
    path: path.slice(0, 200),
    ref: ref.slice(0, 100),
    ts: Date.now(),
  } satisfies ViewEvent);
}

export function recordInquiry(
  rec: Omit<InquiryRecord, "ts">,
): Promise<void> {
  return appendJSONL(INQUIRIES_FILE, { ...rec, ts: Date.now() } satisfies InquiryRecord);
}

function dayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

export interface DashboardStats {
  totalViews: number;
  views7: number;
  views30: number;
  perDay: { day: string; count: number }[];
  topPages: { path: string; label: string; count: number }[];
  topReferrers: { ref: string; count: number }[];
  totalInquiries: number;
  inquiries7: number;
  recentInquiries: InquiryRecord[];
}

/** Make a path human-friendly for the dashboard. */
function labelForPath(p: string): string {
  if (p === "/") return "Home";
  if (p === "/bulls") return "Bulls gallery";
  if (p === "/cows") return "Cows";
  if (p === "/about") return "About";
  if (p === "/why-limousin") return "Why Lim-Flex";
  if (p === "/contact") return "Contact";
  const m = p.match(/^\/bulls\/(.+)$/);
  if (m) return `Bull: ${decodeURIComponent(m[1])}`;
  return p;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [events, inquiries] = await Promise.all([
    readJSONL<ViewEvent>(EVENTS_FILE),
    readJSONL<InquiryRecord>(INQUIRIES_FILE),
  ]);
  const now = Date.now();
  const since7 = now - 7 * DAY;
  const since30 = now - 30 * DAY;

  const views = events.filter((e) => e.t === "view");
  const pageCounts = new Map<string, number>();
  const refCounts = new Map<string, number>();
  const dayCounts = new Map<string, number>();

  for (const v of views) {
    pageCounts.set(v.path, (pageCounts.get(v.path) ?? 0) + 1);
    if (v.ref) refCounts.set(v.ref, (refCounts.get(v.ref) ?? 0) + 1);
    if (v.ts >= since30) dayCounts.set(dayKey(v.ts), (dayCounts.get(dayKey(v.ts)) ?? 0) + 1);
  }

  // Last 14 days, oldest → newest, zero-filled.
  const perDay: { day: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const key = dayKey(now - i * DAY);
    perDay.push({ day: key, count: dayCounts.get(key) ?? 0 });
  }

  const topPages = [...pageCounts.entries()]
    .map(([path, count]) => ({ path, label: labelForPath(path), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const topReferrers = [...refCounts.entries()]
    .map(([ref, count]) => ({ ref, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    totalViews: views.length,
    views7: views.filter((v) => v.ts >= since7).length,
    views30: views.filter((v) => v.ts >= since30).length,
    perDay,
    topPages,
    topReferrers,
    totalInquiries: inquiries.length,
    inquiries7: inquiries.filter((i) => i.ts >= since7).length,
    recentInquiries: inquiries.sort((a, b) => b.ts - a.ts).slice(0, 25),
  };
}
