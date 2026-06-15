"use client";

import { useState } from "react";
import Image from "next/image";
import type { Bull, BullStatus } from "@/lib/types";
import { uploadImage } from "@/components/admin/upload";

const inputCls =
  "mt-1 w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-rust focus:ring-2 focus:ring-rust/15";
const labelCls = "block text-xs font-semibold uppercase tracking-wide text-ink/50";

const STATUS_LABEL: Record<BullStatus, string> = {
  available: "Available",
  "coming-soon": "Coming soon",
  sold: "Sold",
};
const STATUS_CLS: Record<BullStatus, string> = {
  available: "bg-field text-cream",
  "coming-soon": "bg-gold text-ink",
  sold: "bg-rust text-cream",
};

function emptyBull(): Bull {
  return {
    slug: "",
    name: "",
    status: "available",
    breed: "Lim-Flex",
    color: "Black",
    tagline: "",
    description: "",
    photos: [],
  };
}

const today = () => new Date().toISOString().slice(0, 10);

export function BullManager({
  kind,
  initialItems,
}: {
  kind: "bulls" | "cows";
  initialItems: Bull[];
}) {
  const noun = kind === "cows" ? "cow" : "bull";
  const [items, setItems] = useState<Bull[]>(initialItems);
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [draft, setDraft] = useState<Bull>(emptyBull());
  const [highlightsText, setHighlightsText] = useState("");
  const [epdsText, setEpdsText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function openNew() {
    setDraft(emptyBull());
    setHighlightsText("");
    setEpdsText("");
    setEditing("new");
    setError("");
    setNotice("");
  }
  function openEdit(i: number) {
    const b = items[i];
    setDraft(JSON.parse(JSON.stringify(b)));
    setHighlightsText((b.highlights ?? []).join("\n"));
    setEpdsText((b.epds ?? []).map((e) => `${e.label} ${e.value}`).join("\n"));
    setEditing(i);
    setError("");
    setNotice("");
  }
  function cancel() {
    setEditing(null);
    setError("");
  }

  function patch(p: Partial<Bull>) {
    setDraft((d) => ({ ...d, ...p }));
  }

  async function onPickPhotos(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const added: { src: string; alt: string }[] = [];
      for (const f of Array.from(files)) {
        const src = await uploadImage(f);
        added.push({ src, alt: draft.name ? `${draft.name}` : "" });
      }
      patch({ photos: [...draft.photos, ...added] });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  function removePhoto(idx: number) {
    patch({ photos: draft.photos.filter((_, i) => i !== idx) });
  }
  function setPhotoAlt(idx: number, alt: string) {
    patch({ photos: draft.photos.map((p, i) => (i === idx ? { ...p, alt } : p)) });
  }

  function buildItem(): Bull {
    const highlights = highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const epds = epdsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, ...rest] = line.split(/\s+/);
        return { label, value: rest.join(" ") };
      })
      .filter((e) => e.label);
    return {
      ...draft,
      highlights: highlights.length ? highlights : undefined,
      epds: epds.length ? epds : undefined,
      soldDateISO:
        draft.status === "sold" ? draft.soldDateISO || today() : undefined,
    };
  }

  async function persist(nextItems: Bull[], successMsg: string) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/bulls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, items: nextItems }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Could not save.");
      // Re-sync from server (handles slug generation / de-duping).
      const fresh = await fetch("/api/admin/bulls").then((r) => r.json());
      setItems(fresh[kind] ?? nextItems);
      setNotice(successMsg);
      setEditing(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!draft.name.trim()) return setError("Please enter a name.");
    if (draft.photos.length === 0) return setError("Please add at least one photo.");
    const item = buildItem();
    const next = editing === "new" ? [item, ...items] : items.map((b, i) => (i === editing ? item : b));
    await persist(next, `Saved “${item.name}”.`);
  }

  async function remove(i: number) {
    if (!confirm(`Delete ${items[i].name}? This can't be undone.`)) return;
    await persist(items.filter((_, idx) => idx !== i), "Deleted.");
  }

  async function quickSold(i: number) {
    const next = items.map((b, idx) =>
      idx === i ? { ...b, status: "sold" as BullStatus, soldDateISO: b.soldDateISO || today() } : b,
    );
    await persist(next, `Marked ${items[i].name} as sold.`);
  }

  async function quickAvailable(i: number) {
    const next = items.map((b, idx) =>
      idx === i ? { ...b, status: "available" as BullStatus, soldDateISO: undefined } : b,
    );
    await persist(next, `${items[i].name} is now available.`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-ink capitalize">{kind}</h1>
          <p className="mt-1 text-ink/60">
            Add a {noun}, upload photos, edit details, or mark one sold. Changes go live within a minute or two.
          </p>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-rust px-4 py-2.5 font-semibold text-cream transition-colors hover:bg-rust-deep"
        >
          + Add {noun}
        </button>
      </div>

      {notice && (
        <p className="rounded-lg border border-field/30 bg-field/10 px-4 py-2.5 text-sm text-field">{notice}</p>
      )}

      {/* List */}
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ink/20 bg-white px-4 py-10 text-center text-ink/55">
          No {kind} yet. Click “Add {noun}” to post your first one.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b, i) => (
            <li key={b.slug || i} className="overflow-hidden rounded-xl border border-ink/10 bg-white">
              <div className="relative aspect-[4/3] bg-ink/5">
                {b.photos[0]?.src && (
                  <Image src={b.photos[0].src} alt={b.photos[0].alt || b.name} fill sizes="320px" className="object-cover" />
                )}
                <span className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${STATUS_CLS[b.status]}`}>
                  {STATUS_LABEL[b.status]}
                </span>
              </div>
              <div className="p-3">
                <p className="font-display text-lg text-ink">{b.name}</p>
                <p className="text-xs text-ink/50">{[b.breed, b.color].filter(Boolean).join(" · ")}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => openEdit(i)} className="rounded-md border border-ink/20 px-2.5 py-1 text-xs font-medium text-ink hover:bg-ink/5">
                    Edit
                  </button>
                  {b.status !== "available" && (
                    <button onClick={() => quickAvailable(i)} disabled={busy} className="rounded-md border border-field/50 px-2.5 py-1 text-xs font-medium text-field hover:bg-field/5 disabled:opacity-50">
                      Make available
                    </button>
                  )}
                  {b.status !== "sold" && (
                    <button onClick={() => quickSold(i)} disabled={busy} className="rounded-md border border-rust/40 px-2.5 py-1 text-xs font-medium text-rust hover:bg-rust/5 disabled:opacity-50">
                      Mark sold
                    </button>
                  )}
                  <button onClick={() => remove(i)} disabled={busy} className="rounded-md border border-ink/15 px-2.5 py-1 text-xs text-ink/55 hover:bg-ink/5 disabled:opacity-50">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Editor */}
      {editing !== null && (
        <div className="rounded-xl border border-ink/15 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-ink">
              {editing === "new" ? `New ${noun}` : `Edit ${draft.name || noun}`}
            </h2>
            <button onClick={cancel} className="text-sm text-ink/55 hover:text-ink">✕ Close</button>
          </div>

          {/* Photos */}
          <div className="mt-5">
            <span className={labelCls}>Photos</span>
            <div className="mt-2 flex flex-wrap gap-3">
              {draft.photos.map((p, idx) => (
                <div key={idx} className="w-32">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-ink/10">
                    <Image src={p.src} alt={p.alt} fill sizes="128px" className="object-cover" />
                    <button onClick={() => removePhoto(idx)} className="absolute right-1 top-1 rounded bg-ink/70 px-1.5 text-xs text-cream hover:bg-rust" title="Remove">✕</button>
                  </div>
                  <input value={p.alt} onChange={(e) => setPhotoAlt(idx, e.target.value)} placeholder="Describe photo" className="mt-1 w-full rounded border border-ink/15 px-2 py-1 text-[0.7rem] text-ink outline-none focus:border-rust" />
                </div>
              ))}
              <label className="flex aspect-square w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink/25 text-center text-xs text-ink/50 hover:border-rust hover:text-rust">
                {busy ? "Uploading…" : "+ Add photos"}
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onPickPhotos(e.target.files)} disabled={busy} />
              </label>
            </div>
            <p className="mt-1 text-xs text-ink/45">JPG/PNG/WEBP. The first photo is the cover.</p>
          </div>

          {/* Core fields */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Name</label>
              <input value={draft.name} onChange={(e) => patch({ name: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Registered name</label>
              <input value={draft.registeredName ?? ""} onChange={(e) => patch({ registeredName: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select value={draft.status} onChange={(e) => patch({ status: e.target.value as BullStatus })} className={inputCls}>
                <option value="available">Available</option>
                <option value="coming-soon">Coming soon</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            {draft.status === "sold" && (
              <div>
                <label className={labelCls}>Sold date</label>
                <input type="date" value={draft.soldDateISO ?? ""} onChange={(e) => patch({ soldDateISO: e.target.value })} className={inputCls} />
              </div>
            )}
            <div>
              <label className={labelCls}>Breed</label>
              <select value={draft.breed} onChange={(e) => patch({ breed: e.target.value as Bull["breed"] })} className={inputCls}>
                <option value="Lim-Flex">Lim-Flex</option>
                <option value="Limousin">Limousin</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Color</label>
              <select value={draft.color} onChange={(e) => patch({ color: e.target.value as Bull["color"] })} className={inputCls}>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Born (date)</label>
              <input type="date" value={draft.bornISO ?? ""} onChange={(e) => patch({ bornISO: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Registration #</label>
              <input value={draft.registrationNumber ?? ""} onChange={(e) => patch({ registrationNumber: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Sire</label>
              <input value={draft.sire ?? ""} onChange={(e) => patch({ sire: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Dam</label>
              <input value={draft.dam ?? ""} onChange={(e) => patch({ dam: e.target.value })} className={inputCls} />
            </div>
            <div className="flex items-end gap-5">
              <label className="flex items-center gap-2 text-sm text-ink/75">
                <input type="checkbox" checked={Boolean(draft.featured)} onChange={(e) => patch({ featured: e.target.checked })} />
                Feature on home
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className={labelCls}>Tagline (one line)</label>
            <input value={draft.tagline} onChange={(e) => patch({ tagline: e.target.value })} className={inputCls} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Highlights (one per line)</label>
              <textarea value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} rows={4} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>EPDs (one per line: “CE 12”)</label>
              <textarea value={epdsText} onChange={(e) => setEpdsText(e.target.value)} rows={4} className={inputCls} />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-rust">{error}</p>}

          <div className="mt-5 flex gap-3">
            <button onClick={save} disabled={busy} className="rounded-lg bg-rust px-5 py-2.5 font-semibold text-cream transition-colors hover:bg-rust-deep disabled:opacity-50">
              {busy ? "Saving…" : "Save"}
            </button>
            <button onClick={cancel} disabled={busy} className="rounded-lg border border-ink/20 px-5 py-2.5 font-medium text-ink hover:bg-ink/5">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
