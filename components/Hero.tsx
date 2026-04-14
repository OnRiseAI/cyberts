"use client";
import { Shield } from "./Shield";

export function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="scanline-sweep" />

      <div className="absolute left-0 top-0 bottom-0 w-px vbar opacity-60" />
      <div className="absolute left-10 top-10 flex items-center gap-3 z-10">
        <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
        <span className="eyebrow">AOF Group · UK</span>
      </div>
      <div className="absolute right-10 top-10 flex items-center gap-3 z-10">
        <span className="eyebrow">CTS / 01</span>
        <div className="w-10 h-px bg-gold/60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 grid md:grid-cols-[1.3fr_1fr] gap-16 items-center pt-28 md:pt-20 pb-24">
        <div>
          <p className="eyebrow mb-8">— Proactive Data Defence</p>

          <h1 className="display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-soft">
            How visible
            <br />
            <span className="text-lime">is your</span>
            <br />
            business<span className="text-gold">?</span>
          </h1>

          <div className="hairline my-10 max-w-md" />

          <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-soft-dim max-w-lg leading-relaxed">
            End-to-end cyber security for high-risk sectors.
            <span className="text-soft"> You won&apos;t see the breach.</span>{" "}
            <span className="text-lime">We will.</span>
          </p>

          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <button onClick={onCta} className="cta-primary">
              Get Your Cyber Risk Review
              <span className="text-lg leading-none">→</span>
            </button>
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-soft-dim">
              <div className="w-8 h-px bg-gold/60" />
              Protect · Prevent · Assure
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-lime/5 blur-3xl rounded-full" />
          <div className="relative">
            <Shield size={340} />
            <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-gold" />
            <div className="absolute -top-4 -right-4 w-6 h-6 border-t border-r border-gold" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b border-l border-gold" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-gold" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between z-10">
        <span className="eyebrow">Scroll</span>
        <div className="flex-1 h-px mx-6 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <span className="eyebrow">Defence-Grade</span>
      </div>
    </section>
  );
}
