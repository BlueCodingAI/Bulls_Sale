"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";
import { CheckCircle, ArrowRight } from "@/components/icons";

type State = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-ink outline-none transition-colors duration-200 placeholder:text-ink/35 focus:border-rust/60 focus:ring-2 focus:ring-rust/15";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink/80";

export function ContactForm() {
  const params = useSearchParams();
  const bull = params.get("bull") ?? "";

  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    company: "", // honeypot
  });

  // Pre-fill when arriving from a specific bull's page.
  useEffect(() => {
    if (bull) {
      setForm((f) => ({
        ...f,
        interest: bull,
        message: f.message || `I'd like more information about ${bull}.`,
      }));
    }
  }, [bull]);

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const mailtoFallback = () => {
    const subject = form.interest
      ? `Inquiry about ${form.interest}`
      : "Website inquiry";
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.interest && `Interested in: ${form.interest}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.ok) {
        setState("success");
        return;
      }
      if (data.notConfigured) {
        // Email delivery isn't set up yet — open the visitor's mail app.
        mailtoFallback();
        setState("success");
        return;
      }
      setError(data.error ?? "Something went wrong.");
      setState("error");
    } catch {
      setError("Network error — please email us directly.");
      setState("error");
    }
  }

  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-bone p-6 shadow-soft sm:p-9">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-field/10 text-field">
              <CheckCircle className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl text-ink">Thank you!</h3>
            <p className="mt-2 max-w-sm text-pretty text-ink/65">
              Your message is on its way. We&apos;ll get back to you soon — usually within
              a day or two. In the meantime, follow along on social media.
            </p>
            <button
              onClick={() => {
                setForm({ name: "", email: "", phone: "", interest: "", message: "", company: "" });
                setState("idle");
              }}
              className="mt-7 text-sm font-semibold text-rust hover:text-rust-deep"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="space-y-5"
            noValidate
          >
            {/* honeypot */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={update("company")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelCls}>
                  Name <span className="text-rust">*</span>
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className={inputCls}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  Email <span className="text-rust">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@email.com"
                  className={inputCls}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className={labelCls}>
                  Phone <span className="font-normal text-ink/40">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="(000) 000-0000"
                  className={inputCls}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="interest" className={labelCls}>
                  Bull of interest <span className="font-normal text-ink/40">(optional)</span>
                </label>
                <input
                  id="interest"
                  value={form.interest}
                  onChange={update("interest")}
                  placeholder="e.g. Lebron"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelCls}>
                Message <span className="text-rust">*</span>
              </label>
              <textarea
                id="message"
                required
                value={form.message}
                onChange={update("message")}
                rows={5}
                placeholder="Tell us about your herd and what you're looking for…"
                className={`${inputCls} resize-y`}
              />
            </div>

            {state === "error" && (
              <p className="rounded-lg bg-rust/10 px-4 py-3 text-sm text-rust-deep">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-rust px-8 py-4 text-sm font-semibold text-cream shadow-soft transition-all duration-300 hover:bg-rust-deep hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {state === "submitting" ? "Sending…" : "Send inquiry"}
              {state !== "submitting" && (
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>

            <p className="text-xs text-ink/45">
              We&apos;ll only use your details to reply to your inquiry. Prefer to email?
              Write us at{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-rust hover:underline">
                {site.email}
              </a>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
