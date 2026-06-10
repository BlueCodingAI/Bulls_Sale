"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Subtle 3D tilt-on-hover that follows the pointer. Wrap any card.
 * Disabled for touch devices and reduced-motion users.
 */
export function Tilt({
  children,
  className = "",
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    if (glare && glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 55%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div className={`tilt-perspective ${className}`} onMouseMove={onMove} onMouseLeave={reset}>
      <div ref={ref} className="tilt-inner relative h-full">
        {children}
        {glare && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
