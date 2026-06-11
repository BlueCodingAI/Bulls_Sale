import type { DashboardStats } from "@/lib/analytics";

function Kpi({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-1 font-display text-3xl text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink/50">{sub}</p>}
    </div>
  );
}

function fmtDay(iso: string) {
  const [, m, d] = iso.split("-");
  return `${m}/${d}`;
}

function fmtWhen(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function DashboardView({ stats }: { stats: DashboardStats }) {
  const maxDay = Math.max(1, ...stats.perDay.map((d) => d.count));
  const maxPage = Math.max(1, ...stats.topPages.map((p) => p.count));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-ink">Marketing dashboard</h1>
        <p className="mt-1 text-ink/60">
          Anonymous on-site numbers — how many people are looking, what they look at, and who&apos;s reaching out.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Views · last 7 days" value={stats.views7} />
        <Kpi label="Views · last 30 days" value={stats.views30} />
        <Kpi label="Views · all time" value={stats.totalViews} />
        <Kpi label="Inquiries · last 7 days" value={stats.inquiries7} sub={`${stats.totalInquiries} all time`} />
      </div>

      {/* 14-day trend */}
      <div className="rounded-xl border border-ink/10 bg-white p-5">
        <h2 className="font-display text-xl text-ink">Page views · last 14 days</h2>
        {stats.totalViews === 0 ? (
          <p className="mt-4 text-sm text-ink/55">
            No views recorded yet. Numbers appear here as people visit the site.
          </p>
        ) : (
          <div className="mt-5 flex h-40 items-end gap-1.5">
            {stats.perDay.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t bg-rust/80"
                    style={{ height: `${(d.count / maxDay) * 100}%` }}
                    title={`${d.count} views`}
                  />
                </div>
                <span className="text-[0.6rem] text-ink/45">{fmtDay(d.day)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top pages */}
        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <h2 className="font-display text-xl text-ink">Most-viewed pages</h2>
          {stats.topPages.length === 0 ? (
            <p className="mt-4 text-sm text-ink/55">Nothing yet.</p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {stats.topPages.map((p) => (
                <li key={p.path}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink/80">{p.label}</span>
                    <span className="font-semibold text-ink">{p.count}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-ink/10">
                    <div className="h-full rounded-full bg-field" style={{ width: `${(p.count / maxPage) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Referrers */}
        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <h2 className="font-display text-xl text-ink">Where traffic comes from</h2>
          {stats.topReferrers.length === 0 ? (
            <p className="mt-4 text-sm text-ink/55">
              No external referrers yet (or visitors came directly).
            </p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {stats.topReferrers.map((r) => (
                <li key={r.ref} className="flex items-center justify-between text-sm">
                  <span className="text-ink/80">{r.ref}</span>
                  <span className="font-semibold text-ink">{r.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent inquiries */}
      <div className="rounded-xl border border-ink/10 bg-white p-5">
        <h2 className="font-display text-xl text-ink">Recent inquiries</h2>
        {stats.recentInquiries.length === 0 ? (
          <p className="mt-4 text-sm text-ink/55">No contact-form inquiries yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/45">
                  <th className="py-2 pr-4 font-semibold">When</th>
                  <th className="py-2 pr-4 font-semibold">Name</th>
                  <th className="py-2 pr-4 font-semibold">Email</th>
                  <th className="py-2 font-semibold">Interested in</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentInquiries.map((q, i) => (
                  <tr key={i} className="border-b border-ink/5">
                    <td className="py-2 pr-4 whitespace-nowrap text-ink/60">{fmtWhen(q.ts)}</td>
                    <td className="py-2 pr-4 text-ink/85">{q.name}</td>
                    <td className="py-2 pr-4 text-ink/70">
                      <a className="hover:text-rust" href={`mailto:${q.email}`}>{q.email}</a>
                    </td>
                    <td className="py-2 text-ink/70">{q.interest || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
