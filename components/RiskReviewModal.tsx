"use client";
import { useState, useEffect } from "react";
import { brand } from "@/lib/brand";

export function RiskReviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [form, setForm] = useState({ name: "", company: "", sector: "", email: "", phone: "", note: "" });

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setForm({ name: "", company: "", sector: "", email: "", phone: "", note: "" });
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/risk-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(6, 15, 36, 0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto frame-gold p-8 md:p-12"
        style={{ background: "#0A1F44" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 border border-gold/50 text-gold hover:bg-gold hover:text-navy transition-colors flex items-center justify-center"
        >
          ×
        </button>

        <span className="eyebrow">Confidential Enquiry</span>
        <h3 className="display text-2xl md:text-3xl mt-4 mb-2">
          Cyber Risk Review<span className="text-lime">.</span>
        </h3>
        <p className="text-xs text-soft-dim leading-relaxed mb-8 max-w-sm">
          A CyberTS analyst will contact you within one business day. All information is treated under NDA.
        </p>

        {status === "ok" ? (
          <div className="py-10 text-center">
            <div className="w-14 h-14 mx-auto mb-6 border border-gold flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 48 48" className="text-gold">
                <path d="M 10 24 L 20 34 L 38 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="display text-lg text-lime mb-2">Request received.</p>
            <p className="text-xs text-soft-dim">You will hear from us within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
            <div>
              <label className="block eyebrow mb-2">Sector</label>
              <select
                required
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
                className="w-full bg-transparent border-b border-gold/40 py-3 text-soft text-sm focus:border-lime focus:outline-none transition-colors"
              >
                <option value="" className="bg-navy">Select —</option>
                {brand.sectors.map((s) => (
                  <option key={s.id} value={s.name} className="bg-navy">{s.name}</option>
                ))}
                <option value="Other" className="bg-navy">Other</option>
              </select>
            </div>
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <div>
              <label className="block eyebrow mb-2">Brief</label>
              <textarea
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full bg-transparent border-b border-gold/40 py-3 text-soft text-sm focus:border-lime focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="cta-primary w-full justify-center disabled:opacity-60"
              >
                {status === "sending" ? "Transmitting…" : "Submit Request"}
                {status !== "sending" && <span className="text-lg leading-none">→</span>}
              </button>
              {status === "error" && (
                <p className="text-xs text-red-400 mt-4 text-center">
                  Submission failed. Please try again or email direct.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", required,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block eyebrow mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-gold/40 py-3 text-soft text-sm focus:border-lime focus:outline-none transition-colors"
      />
    </div>
  );
}
