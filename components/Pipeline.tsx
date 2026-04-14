"use client";
import { brand } from "@/lib/brand";

const icons: Record<string, React.ReactNode> = {
  audit: (
    <g>
      <circle cx="22" cy="22" r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <line x1="30" y1="30" x2="40" y2="40" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  secure: (
    <g>
      <path d="M 24 8 L 40 14 L 40 26 Q 40 36 24 42 Q 8 36 8 26 L 8 14 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </g>
  ),
  certify: (
    <g>
      <circle cx="24" cy="22" r="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M 18 22 L 22 26 L 30 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 14 32 L 18 42 L 24 38 L 30 42 L 34 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  ),
  insure: (
    <g>
      <path d="M 24 8 L 40 14 L 40 26 Q 40 36 24 42 Q 8 36 8 26 L 8 14 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="18" y="22" width="12" height="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 20 22 L 20 18 Q 20 14 24 14 Q 28 14 28 18 L 28 22" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
  monitor: (
    <g>
      <path d="M 4 24 Q 24 6 44 24 Q 24 42 4 24 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </g>
  ),
};

export function Pipeline() {
  return (
    <section className="relative py-28 md:py-40 px-8 md:px-14 bg-gradient-to-b from-navy via-navy-deep to-navy">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-14">
          <span className="eyebrow">Section 03 · The System</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        <h2 className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-6 max-w-4xl">
          A closed loop of
          <br />
          <span className="text-lime">continuous defence.</span>
        </h2>

        <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-soft-dim max-w-2xl leading-relaxed mb-20">
          Each stage reinforces the next. No gaps. No hand-offs. No blind spots between the audit and the incident response.
        </p>

        <div className="relative hidden md:block">
          <svg className="absolute top-[38px] left-0 w-full h-4 z-0" viewBox="0 0 1200 20" preserveAspectRatio="none">
            <line x1="60" y1="10" x2="1140" y2="10" stroke="#A4FF00" strokeWidth="1.2" className="pipeline-line" />
          </svg>

          <div className="grid grid-cols-5 gap-6 relative z-10">
            {brand.pipeline.map((step, i) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div className="w-[76px] h-[76px] rounded-full border border-gold/60 bg-navy flex items-center justify-center relative transition-all duration-500 group-hover:border-lime">
                  <svg width="44" height="44" viewBox="0 0 48 48" className="text-lime">
                    {icons[step.id]}
                  </svg>
                  <span className="absolute -top-2 -right-2 display-wide text-[9px] text-gold bg-navy px-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="display text-base mt-6 text-soft">{step.label}</h3>
                <p className="font-[family-name:var(--font-inter)] text-xs text-soft-dim mt-2 max-w-[140px] leading-relaxed">
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden space-y-8 relative">
          <div className="absolute left-[38px] top-0 bottom-0 w-px bg-gradient-to-b from-lime via-gold/40 to-lime" />
          {brand.pipeline.map((step, i) => (
            <div key={step.id} className="flex items-center gap-6 relative">
              <div className="w-[76px] h-[76px] rounded-full border border-gold/60 bg-navy flex items-center justify-center shrink-0">
                <svg width="40" height="40" viewBox="0 0 48 48" className="text-lime">{icons[step.id]}</svg>
              </div>
              <div>
                <span className="display-wide text-[9px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-lg text-soft">{step.label}</h3>
                <p className="font-[family-name:var(--font-inter)] text-xs text-soft-dim">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
