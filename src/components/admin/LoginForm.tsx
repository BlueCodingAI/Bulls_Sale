"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed.");
        setBusy(false);
      }
    } catch {
      setError("Something went wrong. Try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="pw" className="block text-sm font-medium text-ink/70">
          Password
        </label>
        <input
          id="pw"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-ink/20 bg-white px-3 py-2.5 text-ink outline-none focus:border-rust focus:ring-2 focus:ring-rust/20"
        />
      </div>
      {error && <p className="text-sm text-rust">{error}</p>}
      <button
        type="submit"
        disabled={busy || !password}
        className="w-full rounded-lg bg-rust px-4 py-2.5 font-semibold text-cream transition-colors hover:bg-rust-deep disabled:opacity-50"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
