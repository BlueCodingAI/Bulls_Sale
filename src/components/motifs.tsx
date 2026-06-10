import type { SVGProps } from "react";

/* ── Sheriff's five-point star ─────────────────────────────────────────── */
export function Star(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 1.6l2.95 6.36 6.95.78-5.16 4.7 1.42 6.84L12 17.9l-6.16 2.98 1.42-6.84L2.1 8.74l6.95-.78L12 1.6z" />
    </svg>
  );
}

/* ── Concho star (star inside a ring — saddle hardware) ────────────────── */
export function ConchoStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path
        d="M24 9l4.2 9.06 9.9 1.1-7.35 6.7 2.02 9.74L24 30.7l-8.77 4.25 2.02-9.74-7.35-6.7 9.9-1.1L24 9z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Longhorn bull head (front-facing, wide sweeping horns) ────────────────
   A bold, filled Texas-Longhorn silhouette that stays legible even at icon
   size. The horn + ear are drawn once on the left and mirrored; eyes and
   nostrils are cut as holes via the even-odd fill rule. */
export function Longhorn(props: SVGProps<SVGSVGElement>) {
  const FACE =
    "M46 58 C50 50 70 50 74 58 C84 62 90 73 88 84 C86 95 78 102 68 105 C64 107 56 107 52 105 C42 102 34 95 32 84 C30 73 36 62 46 58 Z";
  const HORN = "M47 55 C39 45 31 41 25 30 C27 41 38 51 54 56 Z";
  const EAR = "M37 72 C30 70 22 74 22 81 C28 83 35 79 40 73 Z";
  const EARIN = "M28 76 C30 78 33 78 35 77";
  const NOSTRIL = "M55 93 C53.5 94.5 53.5 96 55 97.5";
  const mirror = "translate(120 0) scale(-1 1)";
  return (
    <svg
      viewBox="16 24 88 89"
      fill="none"
      stroke="currentColor"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d={HORN} />
      <path d={HORN} transform={mirror} />
      <path d={EAR} />
      <path d={EAR} transform={mirror} />
      <path d={EARIN} />
      <path d={EARIN} transform={mirror} />
      <path d={FACE} />
      <rect x={44} y={86} width={32} height={19} rx={9.5} />
      <path d={NOSTRIL} />
      <path d={NOSTRIL} transform={mirror} />
      <circle cx={51} cy={74} r={4.4} fill="currentColor" stroke="none" />
      <circle cx={69} cy={74} r={4.4} fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Horseshoe (good luck) ─────────────────────────────────────────────── */
export function Horseshoe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden {...props}>
      <path d="M7 21v-7a5 5 0 0 1 10 0v7" />
      <circle cx="7" cy="21" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="17" cy="21" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="6.4" cy="13" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="17.6" cy="13" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Wheat sprig ───────────────────────────────────────────────────────── */
export function Wheat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 22V8" />
      <path d="M12 8c0-2.5 1.6-4.5 3.4-5.4C16 4.4 15 6.8 12 8ZM12 8c0-2.5-1.6-4.5-3.4-5.4C8 4.4 9 6.8 12 8Z" />
      <path d="M12 13c0-2 1.4-3.4 3-4.2.5 1.6-.4 3.6-3 4.2ZM12 13c0-2-1.4-3.4-3-4.2-.5 1.6.4 3.6 3 4.2Z" />
      <path d="M12 18c0-2 1.4-3.4 3-4.2.5 1.6-.4 3.6-3 4.2ZM12 18c0-2-1.4-3.4-3-4.2-.5 1.6.4 3.6 3 4.2Z" />
    </svg>
  );
}

/* ── Branding / fire (genetics, performance) ──────────────────────────── */
export function Steer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M5 7c-1.5 0-2.5-1-3-2 .3 2 1.4 3.4 3 4M19 7c1.5 0 2.5-1 3-2-.3 2-1.4 3.4-3 4" />
      <path d="M5 9c0-1 1-2 2.5-2h9C18 7 19 8 19 9c0 4-3 8-7 8s-7-4-7-8Z" />
      <path d="M9.5 12h5M12 12v3" />
      <circle cx="9" cy="10.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Ornate engraved divider — a center diamond/star flanked by thin double rules
 * with little curled flourishes. The rules draw themselves in on view.
 */
export function OrnateDivider({
  className = "",
  light = false,
  animate = true,
}: {
  className?: string;
  light?: boolean;
  animate?: boolean;
}) {
  const color = light ? "var(--color-gold-soft)" : "var(--color-rust)";
  const dash = animate ? "draw-path" : "";
  return (
    <svg
      viewBox="0 0 320 24"
      className={className}
      role="presentation"
      style={{ color }}
      fill="none"
      stroke="currentColor"
    >
      <g strokeWidth="1.4" strokeLinecap="round">
        <path className={dash} d="M150 12H40" />
        <path className={dash} d="M170 12h110" />
        {/* inner curls */}
        <path d="M40 12c-6 0-6-5-12-5M280 12c6 0 6-5 12-5" strokeWidth="1.2" opacity="0.8" />
        <circle cx="30" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="290" cy="12" r="1.6" fill="currentColor" stroke="none" />
      </g>
      {/* center diamond + star */}
      <path d="M160 2l8 10-8 10-8-10 8-10z" fill="currentColor" opacity="0.18" />
      <path
        d="M160 5.5l1.9 4.1 4.5.5-3.35 3.05.92 4.43L160 15.3l-4 2.28.92-4.43L153.6 10.1l4.5-.5L160 5.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* ── Corner flourish for poster frames ─────────────────────────────────── */
export function CornerFlourish(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden {...props}>
      <path d="M4 4h14M4 4v14" />
      <path d="M10 4c0 6-6 6-6 6M4 10c6 0 6-6 6-6" opacity="0.8" />
      <circle cx="13" cy="13" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
