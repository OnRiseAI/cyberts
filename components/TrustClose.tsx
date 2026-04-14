"use client";
import { Shield } from "./Shield";

export function TrustClose({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative py-32 md:py-48 px-8 md:px-14 overflow-hidden">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.22) 0%, rgba(10, 31, 68, 0.8) 45%, #0A1F44 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0, transparent 40px, rgba(212, 175, 55, 0.08) 40px, rgba(212, 175, 55, 0.08) 41px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold" />
          <span className="eyebrow">Section 07 · Trust</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>

        <div className="flex justify-center mb-10">
          <Shield size={140} />
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-6 mb-10 flex-wrap">
          {["Trust", "Compliance", "Resilience", "Control"].map((w, i) => (
            <span key={w} className="flex items-center gap-3 md:gap-6">
              <span className="display-wide text-xs md:text-sm text-gold">{w}</span>
              {i < 3 && <span className="text-gold/60">·</span>}
            </span>
          ))}
        </div>

        <h2 className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-4 text-soft">
          Secure today.
        </h2>
        <h2 className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-4 text-lime">
          Prevent tomorrow.
        </h2>
        <h2 className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-12">
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Assure always.
          </span>
        </h2>

        <div className="hairline my-12 max-w-sm mx-auto" />

        <button onClick={onCta} className="cta-gold">
          Get Your Cyber Risk Review
          <span className="text-lg leading-none">→</span>
        </button>

        <p className="font-[family-name:var(--font-inter)] text-xs text-soft-dim mt-8 tracking-[0.2em] uppercase">
          CyberTS · AOF Group · United Kingdom
        </p>
      </div>
    </section>
  );
}
