"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires a lightweight page-view beacon on every route change, for the
 * self-hosted marketing dashboard. No cookies; sends only the path + referrer.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const body = JSON.stringify({ path: pathname, ref: document.referrer || "" });
    // Prefer sendBeacon so it doesn't delay navigation.
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
