/** Upload one image file to the admin upload endpoint; returns its public src. */
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({ ok: false, error: "Upload failed." }));
  if (!data.ok) throw new Error(data.error || "Upload failed.");
  return data.src as string;
}
