"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/lib/brand";
import { ease } from "@/lib/motion";

type Status = "idle" | "sending" | "ok" | "error";
type FormState = { name: string; company: string; sector: string; email: string; phone: string; note: string };
const EMPTY: FormState = { name: "", company: "", sector: "", email: "", phone: "", note: "" };
const NOTCH_BG = "#050608";

export function RiskReviewModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setStep(1);
      setTouched({});
      setForm(EMPTY);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const step1Valid = !!(form.name.trim() && form.company.trim() && emailValid);
  const step2Valid = !!form.sector;
  const canSubmit = step1Valid && step2Valid && status !== "sending";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
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
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(2, 4, 10, 0.94)", backdropFilter: "blur(10px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <motion.div
            className="relative w-full max-w-xl max-h-[88vh] frame-gold flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.5, ease }}
          >
            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="flex-1 overflow-y-auto premium-scroll"
                >
                  <SuccessTakeover
                    firstName={form.name.trim().split(/\s+/)[0] || "there"}
                    onClose={onClose}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <header className="relative px-8 md:px-12 pt-8 md:pt-10 pb-5 border-b border-gold/15 shrink-0">
                    <CloseButton onClose={onClose} />
                    <span className="eyebrow">Confidential Enquiry</span>
                    <h3 className="display text-2xl md:text-3xl mt-3 mb-2">
                      Cyber Risk Review<span className="text-lime">.</span>
                    </h3>
                    <p className="text-soft/70 text-xs leading-relaxed max-w-sm mb-5">
                      A CyberTS analyst will contact you within one business day. All information is treated under NDA.
                    </p>
                    <ProgressBar step={step} status={status} />
                  </header>

                  <div className="flex-1 overflow-y-auto premium-scroll px-8 md:px-12 py-8">
                    <form id="risk-form" onSubmit={submit}>
                      <AnimatePresence mode="wait">
                        {step === 1 ? (
                          <StepOne
                            key="s1"
                            form={form}
                            setForm={setForm}
                            touched={touched}
                            setTouched={setTouched}
                            emailValid={emailValid}
                          />
                        ) : (
                          <StepTwo key="s2" form={form} setForm={setForm} />
                        )}
                      </AnimatePresence>
                    </form>
                  </div>

                  <footer className="px-8 md:px-12 py-5 border-t border-gold/15 shrink-0" style={{ background: "rgba(5, 6, 8, 0.55)" }}>
                    <div className="flex items-center gap-3">
                      {step === 2 ? (
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="eyebrow text-gold/70 hover:text-gold transition-colors py-2"
                        >
                          ← Back
                        </button>
                      ) : (
                        <span className="text-[10px] tracking-[0.25em] uppercase text-soft/40">
                          NDA protected · No obligation
                        </span>
                      )}
                      <div className="flex-1" />
                      {step === 1 ? (
                        <button
                          type="button"
                          onClick={() => step1Valid && setStep(2)}
                          disabled={!step1Valid}
                          className="cta-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Continue
                          <span className="text-lg leading-none">→</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          form="risk-form"
                          disabled={!canSubmit}
                          className="cta-primary disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {status === "sending" ? "Transmitting…" : "Submit Request"}
                          {status !== "sending" && <span className="text-lg leading-none">→</span>}
                        </button>
                      )}
                    </div>
                    <TrustStrip />
                    {status === "error" && (
                      <p className="text-xs text-red-400 mt-3 text-center">
                        Submission failed. Please try again, or email us direct.
                      </p>
                    )}
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------- Steps ----------------

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  exit: { opacity: 0 },
};
const row = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

function StepOne({
  form, setForm, touched, setTouched, emailValid,
}: {
  form: FormState;
  setForm: (f: FormState) => void;
  touched: Record<string, boolean>;
  setTouched: (t: Record<string, boolean>) => void;
  emailValid: boolean;
}) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" exit="exit">
      <motion.span variants={row} className="eyebrow text-soft/50 text-[10px] block mb-4">
        About you
      </motion.span>
      <motion.div variants={row}>
        <Field
          label="Full name"
          icon={<UserIcon />}
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          onBlur={() => setTouched({ ...touched, name: true })}
          required
        />
      </motion.div>
      <motion.div variants={row} className="mt-5">
        <Field
          label="Company"
          icon={<BuildingIcon />}
          value={form.company}
          onChange={(v) => setForm({ ...form, company: v })}
          onBlur={() => setTouched({ ...touched, company: true })}
          required
        />
      </motion.div>
      <motion.div variants={row} className="mt-5">
        <Field
          label="Work email"
          type="email"
          icon={<EnvelopeIcon />}
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          onBlur={() => setTouched({ ...touched, email: true })}
          required
          valid={form.email ? emailValid : undefined}
          error={touched.email && form.email && !emailValid ? "Please enter a valid email address." : undefined}
        />
      </motion.div>
    </motion.div>
  );
}

function StepTwo({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" exit="exit">
      <motion.span variants={row} className="eyebrow text-soft/50 text-[10px] block mb-4">
        About your concern
      </motion.span>
      <motion.div variants={row}>
        <SectorListbox value={form.sector} onChange={(v) => setForm({ ...form, sector: v })} />
      </motion.div>
      <motion.div variants={row} className="mt-5">
        <Field
          label="Direct phone"
          type="tel"
          icon={<PhoneIcon />}
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
        />
      </motion.div>
      <motion.div variants={row} className="mt-5">
        <TextareaField
          label="Brief (optional)"
          icon={<DocumentIcon />}
          value={form.note}
          onChange={(v) => setForm({ ...form, note: v })}
          placeholder="A few lines on what prompted this enquiry — a recent incident, an upcoming audit, a specific system you are worried about…"
        />
      </motion.div>
    </motion.div>
  );
}

// ---------------- Field primitives ----------------

function Field({
  label, value, onChange, onBlur, type = "text", required, icon, valid, error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  icon?: React.ReactNode;
  valid?: boolean;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;
  const borderClass = error
    ? "border-red-500/60"
    : focused
      ? "border-gold-hi"
      : "border-gold/25 hover:border-gold/50";

  return (
    <div>
      <div
        className={`relative flex items-center border transition-all ${borderClass}`}
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        {icon && (
          <span
            className={`pl-4 pr-3 transition-colors shrink-0 ${
              focused || value ? "text-gold-hi" : "text-gold/45"
            }`}
          >
            {icon}
          </span>
        )}
        <div className="relative flex-1">
          <label
            className={`absolute pointer-events-none transition-all duration-200 font-[var(--font-exo)] tracking-[0.2em] uppercase ${
              float
                ? "-top-2 left-0 text-[9px] text-gold px-1.5"
                : "top-1/2 -translate-y-1/2 left-0 text-[13px] tracking-normal normal-case text-soft/40"
            }`}
            style={float ? { background: NOTCH_BG } : undefined}
          >
            {label}
            {required && float && <span className="text-gold-hi ml-0.5">*</span>}
          </label>
          <input
            type={type}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur?.();
            }}
            className="w-full bg-transparent py-4 pr-4 text-soft text-[14px] focus:outline-none"
            style={{ caretColor: "#e6c878" }}
          />
        </div>
        {valid === true && (
          <span className="pr-4 text-gold-hi shrink-0">
            <CheckIcon />
          </span>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-400 mt-1.5 pl-4"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextareaField({
  label, value, onChange, icon, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;
  return (
    <div>
      <div
        className={`relative flex border transition-all ${
          focused ? "border-gold-hi" : "border-gold/25 hover:border-gold/50"
        }`}
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        {icon && (
          <span
            className={`pl-4 pr-3 pt-4 transition-colors shrink-0 ${
              focused || value ? "text-gold-hi" : "text-gold/45"
            }`}
          >
            {icon}
          </span>
        )}
        <div className="relative flex-1">
          <label
            className={`absolute pointer-events-none transition-all duration-200 tracking-[0.2em] uppercase ${
              float
                ? "-top-2 left-0 text-[9px] text-gold px-1.5"
                : "top-4 left-0 text-[13px] tracking-normal normal-case text-soft/40"
            }`}
            style={float ? { background: NOTCH_BG } : undefined}
          >
            {label}
          </label>
          <textarea
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={float ? placeholder : undefined}
            className="w-full bg-transparent py-4 pr-4 text-soft text-[14px] focus:outline-none resize-none placeholder:text-soft/25"
            style={{ caretColor: "#e6c878" }}
          />
        </div>
      </div>
    </div>
  );
}

// ---------------- Custom Sector Listbox ----------------

type SectorOption = { name: string; regulations: string; threat?: string };

function SectorListbox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const float = focused || open || value.length > 0;

  const options: SectorOption[] = [
    ...brand.sectors.map((s) => ({ name: s.name, regulations: s.regulations, threat: s.threat })),
    { name: "Other", regulations: "Case-by-case review", threat: "We will scope the engagement to your specific regulatory context." },
  ];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        className={`w-full flex items-center border transition-all ${
          open || focused ? "border-gold-hi" : "border-gold/25 hover:border-gold/50"
        }`}
        style={{ background: "rgba(255,255,255,0.02)" }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`pl-4 pr-3 transition-colors shrink-0 ${open || value ? "text-gold-hi" : "text-gold/45"}`}>
          <TagIcon />
        </span>
        <div className="relative flex-1 text-left">
          <span
            className={`absolute pointer-events-none transition-all duration-200 tracking-[0.2em] uppercase ${
              float
                ? "-top-2 left-0 text-[9px] text-gold px-1.5"
                : "top-1/2 -translate-y-1/2 left-0 text-[13px] tracking-normal normal-case text-soft/40"
            }`}
            style={float ? { background: NOTCH_BG } : undefined}
          >
            Sector<span className="text-gold-hi ml-0.5">*</span>
          </span>
          <span className={`block py-4 pr-2 text-[14px] ${value ? "text-soft" : "text-transparent select-none"}`}>
            {value || "placeholder"}
          </span>
        </div>
        <motion.span
          className="pr-4 text-gold/70 shrink-0"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease }}
        >
          <ChevronIcon />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }}
            className="absolute left-0 right-0 top-full mt-2 z-20 border border-gold/30 max-h-72 overflow-y-auto premium-scroll"
            style={{
              background: "#060a13",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(230,200,120,0.08)",
            }}
          >
            {options.map((opt) => {
              const selected = value === opt.name;
              return (
                <li key={opt.name} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.name);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3.5 border-b border-gold/10 last:border-b-0 transition-colors group ${
                      selected ? "bg-gold/10" : "hover:bg-gold/5"
                    }`}
                  >
                    {/* TODO(human): compose how each sector option is rendered inside the listbox.
                        Right now only `opt.name` is shown — the dropdown looks functional but
                        unremarkable, which wastes the data you already have in brand.sectors.
                        Available on each option:
                          - opt.name        e.g. "Medical & Biotech"
                          - opt.regulations e.g. "NHS DSP Toolkit · UK GDPR · ISO 27001 · MHRA GxP"
                          - opt.threat      e.g. "Ransomware that halts clinical trials…"
                        Compose a 2–3-line option that shows depth without being noisy.
                        Use existing tokens: text-soft (primary), text-gold (accent), text-soft/50
                        (supporting). Each option should feel like a consultant pre-empting the
                        visitor's concern, not a plain <option>. Keep the height compact so 5
                        options fit without scrolling the dropdown. */}
                    <div className="text-sm text-soft">{opt.name}</div>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- Chrome ----------------

function ProgressBar({ step, status }: { step: 1 | 2; status: Status }) {
  const pct = status === "sending" ? 100 : step === 1 ? 50 : 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] tracking-[0.28em] uppercase text-gold/70 font-medium shrink-0">
        Step {step} of 2
      </span>
      <div className="flex-1 h-[2px] bg-gold/12 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #c9a14a 0%, #e6c878 100%)" }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease }}
        />
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <p className="text-[9px] tracking-[0.28em] uppercase text-gold/45 text-center mt-4 font-medium">
      {brand.credentials.join("  ·  ")}
    </p>
  );
}

function SuccessTakeover({ firstName, onClose }: { firstName: string; onClose: () => void }) {
  const caseRef = useMemo(() => {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, "0");
    const d = String(now.getUTCDate()).padStart(2, "0");
    const hex = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");
    return `CRR-${y}${m}${d}-${hex}`;
  }, []);

  const steps = [
    { n: "01", title: "NDA dispatched", copy: "A mutual NDA will arrive in your inbox within minutes." },
    { n: "02", title: "Analyst assigned", copy: "Matched to a specialist in your sector — not a ticket queue." },
    { n: "03", title: "Private discovery call", copy: "A 30-minute confidential briefing on your actual attack surface." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease }}
      className="relative flex flex-col items-center text-center px-8 md:px-14 py-14 md:py-16"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(230, 200, 120, 0.22) 0%, rgba(201, 161, 74, 0.08) 30%, transparent 60%)",
        }}
      />

      <div className="absolute top-5 right-5 z-20">
        <CloseButton onClose={onClose} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.15 }}
        className="relative z-10 mb-8"
      >
        <svg width="128" height="128" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <linearGradient id="shieldStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e6c878" />
              <stop offset="100%" stopColor="#c9a14a" />
            </linearGradient>
            <radialGradient id="shieldFill" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(230, 200, 120, 0.18)" />
              <stop offset="100%" stopColor="rgba(201, 161, 74, 0)" />
            </radialGradient>
          </defs>
          <motion.path
            d="M 50 6 L 92 26 L 92 58 L 50 94 L 8 58 L 8 26 Z"
            fill="url(#shieldFill)"
            stroke="url(#shieldStroke)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
            style={{ filter: "drop-shadow(0 0 24px rgba(230, 200, 120, 0.35))" }}
          />
          <motion.path
            d="M 30 50 L 44 64 L 70 36"
            fill="none"
            stroke="url(#shieldStroke)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 1.25 }}
          />
        </svg>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.75, ease }}
        className="eyebrow relative z-10"
      >
        Confidential Enquiry Received
      </motion.span>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.85, ease }}
        className="display text-3xl md:text-4xl mt-3 relative z-10"
      >
        Thank you, {firstName}
        <span className="text-lime">.</span>
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.95, ease }}
        className="text-soft/70 text-sm mt-3 max-w-md leading-relaxed relative z-10"
      >
        Your brief is now with our UK SOC. A named analyst will be in touch within one business day,
        under NDA.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.1, ease }}
        className="mt-7 inline-flex items-center gap-3 px-4 py-2.5 border border-gold/40 relative z-10"
        style={{ background: "rgba(201, 161, 74, 0.06)", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)" }}
      >
        <span className="text-[9px] tracking-[0.32em] uppercase text-gold/60">Case File</span>
        <span className="w-px h-3 bg-gold/30" />
        <span className="text-xs tracking-[0.18em] text-gold-hi font-mono">{caseRef}</span>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.14, delayChildren: 2.35 } },
        }}
        className="mt-10 w-full max-w-md relative z-10"
      >
        <div className="text-[10px] tracking-[0.28em] uppercase text-soft/40 mb-4 text-left flex items-center gap-3">
          <span>What happens next</span>
          <span className="flex-1 h-px bg-gold/15" />
        </div>
        <ul className="space-y-3 text-left">
          {steps.map((s) => (
            <motion.li
              key={s.n}
              variants={{
                hidden: { opacity: 0, x: -12 },
                show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
              }}
              className="flex gap-4 items-start py-2"
            >
              <div className="text-gold/60 text-[11px] tracking-[0.18em] shrink-0 mt-0.5 font-mono">
                {s.n}
              </div>
              <div className="flex-1">
                <div className="text-soft text-sm">{s.title}</div>
                <div className="text-soft/50 text-xs mt-0.5 leading-relaxed">{s.copy}</div>
              </div>
              <div className="text-gold-hi/70 shrink-0 mt-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5 10-11" />
                </svg>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.9, ease }}
        className="mt-10 relative z-10"
      >
        <button onClick={onClose} className="cta-primary">
          Close
          <span className="text-lg leading-none">→</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.1 }}
        className="relative z-10 mt-10 w-full pt-6 border-t border-gold/10"
      >
        <TrustStrip />
      </motion.div>
    </motion.div>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className="absolute top-5 right-5 w-10 h-10 rounded-full border border-gold/40 text-gold hover:text-base hover:bg-gold hover:border-gold-hi transition-all duration-300 flex items-center justify-center group"
    >
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-300 group-hover:rotate-90"
      >
        <path d="M2 2 L14 14 M14 2 L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </motion.svg>
    </button>
  );
}

// ---------------- Icons ----------------

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function UserIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg {...iconProps}>
      <rect x="4" y="3" width="16" height="18" rx="0.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
    </svg>
  );
}
function EnvelopeIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 4h4l2 5-2 2a12 12 0 0 0 6 6l2-2 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 12l-7 7a2 2 0 0 1-3 0L3 12V4h8z" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}
function DocumentIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5 10-11" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
