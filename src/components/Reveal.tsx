"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

/**
 * Scroll-triggered reveal. Fades + slides children in once when they enter
 * the viewport. Honors prefers-reduced-motion automatically.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  amount = 0.3,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered container — pair with <RevealItem> children to cascade a grid/list.
 */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.1,
  delayChildren = 0,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  direction = "up",
  duration = 0.65,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offset[direction] },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
