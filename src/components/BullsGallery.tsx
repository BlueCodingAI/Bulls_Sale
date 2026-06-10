"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Bull, BullStatus } from "@/lib/types";
import { BullCard } from "@/components/BullCard";
import { SearchIcon, CloseIcon } from "@/components/icons";

type Filter = "all" | BullStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available" },
  { key: "coming-soon", label: "Coming Soon" },
  { key: "sold", label: "Sold" },
];

export function BullsGallery({ bulls }: { bulls: Bull[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: bulls.length,
      available: 0,
      "coming-soon": 0,
      sold: 0,
    };
    for (const b of bulls) c[b.status] += 1;
    return c;
  }, [bulls]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bulls.filter((b) => {
      if (filter !== "all" && b.status !== filter) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        (b.registeredName ?? "").toLowerCase().includes(q) ||
        b.breed.toLowerCase().includes(q)
      );
    });
  }, [bulls, filter, query]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`relative rounded-sm border px-5 py-2.5 font-condensed text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
                  active ? "border-ink text-cream" : "border-ink/25 text-ink/65 hover:border-ink/50 hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-sm bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {f.label}
                  <span
                    className={`rounded-sm px-1.5 py-0.5 text-[0.65rem] font-bold ${
                      active ? "bg-cream/20 text-cream" : "bg-ink/10 text-ink/55"
                    }`}
                  >
                    {counts[f.key]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name…"
            aria-label="Search bulls by name"
            className="w-full rounded-sm border border-ink/25 bg-cream py-3 pl-11 pr-10 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-ink/40 focus:border-rust/60 focus:ring-2 focus:ring-rust/15"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink/45 hover:bg-ink/8 hover:text-ink"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10">
        <AnimatePresence mode="popLayout">
          {results.length > 0 ? (
            <motion.div
              layout
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {results.map((bull, i) => (
                  <motion.div
                    key={bull.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <BullCard bull={bull} priority={i < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 py-24 text-center"
            >
              <p className="font-display text-2xl text-ink">No bulls found</p>
              <p className="mt-2 max-w-sm text-sm text-ink/60">
                {query
                  ? `We couldn't find a bull matching "${query}". Try another name or clear your search.`
                  : "There are no bulls in this category right now — check back soon."}
              </p>
              {(query || filter !== "all") && (
                <button
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                  className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-2"
                >
                  Reset filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
