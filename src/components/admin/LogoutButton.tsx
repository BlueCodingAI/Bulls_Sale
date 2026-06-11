"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      onClick={async () => {
        setBusy(true);
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      }}
      disabled={busy}
      className="rounded-md border border-cream/30 px-3 py-1.5 text-sm text-cream/85 transition-colors hover:bg-cream/10 disabled:opacity-50"
    >
      {busy ? "…" : "Log out"}
    </button>
  );
}
