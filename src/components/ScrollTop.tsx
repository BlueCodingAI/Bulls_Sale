"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "@/components/icons";

/** Floating "back to top" button that fades in after scrolling down. */
export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream shadow-card ring-1 ring-gold/30 transition-colors hover:bg-rust"
        >
          <ArrowRight className="h-5 w-5 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
