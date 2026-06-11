const DEFAULT_ITEMS = [
  "Registered Lim-Flex",
  "Old-World Limousin",
  "Calving Ease",
  "Carcass & High Yield",
  "Exceptional Docility",
  "AI-Bred Herd",
  "NALF Member",
  "East Texas Raised",
];

export function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y-2 border-gold/30 bg-ink py-4 text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center" aria-hidden={i >= items.length}>
            <span className="px-7 font-condensed text-sm font-medium uppercase tracking-[0.22em] text-cream/85">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
