import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { recordInquiry } from "@/lib/analytics";

/**
 * Contact form handler.
 *
 * Out of the box this validates the submission. To actually deliver email,
 * add a free Resend account (resend.com) and set these environment variables
 * in your hosting dashboard (e.g. Vercel → Settings → Environment Variables):
 *
 *   RESEND_API_KEY   your Resend API key
 *   CONTACT_TO       where inquiries should be delivered (your email)
 *   CONTACT_FROM     a verified sender, e.g. "Rocking C <victoria@rockingccattle.com>"
 *
 * If no key is configured, the API responds with { notConfigured: true } and
 * the form gracefully falls back to opening the visitor's email app instead —
 * so the site is always usable.
 */

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const interest = String(data.interest ?? "").trim();
  const message = String(data.message ?? "").trim();
  const honeypot = String(data.company ?? "").trim(); // hidden anti-spam field

  // Bots love filling hidden fields — silently accept and drop.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, email, and a message." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Log the inquiry for the marketing dashboard (even if email isn't configured).
  try {
    await recordInquiry({ name, email, interest });
  } catch (err) {
    console.error("Inquiry log failed:", err);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM ?? `Rocking C Cattle <onboarding@resend.dev>`;

  // Not configured for delivery yet → let the client fall back to mailto.
  if (!apiKey) {
    return NextResponse.json({ ok: false, notConfigured: true });
  }

  const subject = interest
    ? `New inquiry about ${interest} — ${name}`
    : `New website inquiry — ${name}`;

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#191310">
      <h2 style="color:#a8431f">New inquiry from ${site.domain}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${interest ? `<p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html, reply_to: email }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please email us directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please email us directly." },
      { status: 500 },
    );
  }
}
