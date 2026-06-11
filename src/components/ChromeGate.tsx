"use client";

import { usePathname } from "next/navigation";

/** Hides the marketing chrome (navbar/footer) on the /admin area. */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
