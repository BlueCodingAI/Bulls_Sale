"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { type ImageSlot, resolveSlotSrc } from "@/lib/imageSlots";
import { uploadImage } from "@/components/admin/upload";

export function ImagesManager({
  slots,
  initialOverrides,
}: {
  slots: ImageSlot[];
  initialOverrides: Record<string, string>;
}) {
  const [overrides, setOverrides] = useState<Record<string, string>>(initialOverrides);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const groups = useMemo(() => {
    const m = new Map<string, ImageSlot[]>();
    for (const s of slots) {
      const arr = m.get(s.group) ?? [];
      arr.push(s);
      m.set(s.group, arr);
    }
    return [...m.entries()];
  }, [slots]);

  async function saveOverrides(next: Record<string, string>, msg: string) {
    setError("");
    setNotice("");
    const res = await fetch("/api/admin/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ overrides: next }),
    });
    const data = await res.json().catch(() => ({ ok: false }));
    if (!data.ok) {
      setError(data.error || "Could not save.");
      return false;
    }
    setOverrides(next);
    setNotice(msg);
    return true;
  }

  async function replace(slotId: string, file: File | undefined) {
    if (!file) return;
    setBusyId(slotId);
    try {
      const src = await uploadImage(file);
      await saveOverrides({ ...overrides, [slotId]: src }, "Photo updated — live within a minute or two.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function reset(slotId: string) {
    setBusyId(slotId);
    const next = { ...overrides };
    delete next[slotId];
    await saveOverrides(next, "Reset to the original photo.");
    setBusyId(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-ink">Site photos</h1>
        <p className="mt-1 text-ink/60">
          Swap any photo on the site without touching the layout — upload a new one and it
          replaces the old. (For example, drop in your family photo on the About page when it&apos;s ready.)
        </p>
      </div>

      {notice && <p className="rounded-lg border border-field/30 bg-field/10 px-4 py-2.5 text-sm text-field">{notice}</p>}
      {error && <p className="rounded-lg border border-rust/30 bg-rust/5 px-4 py-2.5 text-sm text-rust">{error}</p>}

      {groups.map(([group, groupSlots]) => (
        <section key={group}>
          <h2 className="mb-3 font-display text-xl text-ink">{group}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groupSlots.map((slot) => {
              const src = resolveSlotSrc(slot.id, overrides);
              const overridden = Boolean(overrides[slot.id]);
              return (
                <div key={slot.id} className="overflow-hidden rounded-xl border border-ink/10 bg-white">
                  <div className="relative aspect-[4/3] bg-ink/5">
                    {src && <Image src={src} alt={slot.label} fill sizes="320px" className="object-cover" />}
                    {overridden && (
                      <span className="absolute left-2 top-2 rounded bg-field px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-cream">
                        Custom
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-ink">{slot.label}</p>
                    <p className="text-xs text-ink/45">Best shape: {slot.ratioHint}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <label className="cursor-pointer rounded-md bg-rust px-3 py-1.5 text-xs font-semibold text-cream hover:bg-rust-deep">
                        {busyId === slot.id ? "Uploading…" : "Upload new"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={busyId === slot.id}
                          onChange={(e) => replace(slot.id, e.target.files?.[0])}
                        />
                      </label>
                      {overridden && (
                        <button
                          onClick={() => reset(slot.id)}
                          disabled={busyId === slot.id}
                          className="rounded-md border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink/70 hover:bg-ink/5 disabled:opacity-50"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
