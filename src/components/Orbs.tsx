/**
 * Decorative, blurred gradient "aurora" orbs that drift slowly in the
 * background. Purely presentational — drop into a `relative` section.
 */
export function Orbs({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const colors =
    variant === "dark"
      ? ["bg-rust/25", "bg-gold/20", "bg-field/30"]
      : ["bg-rust/15", "bg-gold/20", "bg-field/10"];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className={`orb drift ${colors[0]} -left-20 top-10 h-72 w-72`} />
      <div className={`orb drift-slow ${colors[1]} right-0 top-1/3 h-80 w-80`} />
      <div className={`orb drift ${colors[2]} bottom-0 left-1/3 h-64 w-64`} style={{ animationDelay: "-6s" }} />
    </div>
  );
}
