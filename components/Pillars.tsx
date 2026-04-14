import { brand } from "@/lib/brand";

export function Pillars() {
  return (
    <section className="relative py-28 md:py-36 px-8 md:px-14">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="eyebrow">Section 04 · Rule of Three</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-y border-gold/20">
          {brand.pillars.map((p, i) => (
            <div
              key={p.label}
              className={`p-10 md:p-14 relative ${i < 2 ? "md:border-r border-gold/20" : ""}`}
            >
              <div className="display-wide text-[10px] text-gold mb-6">0{i + 1}</div>
              <h3 className="display text-3xl md:text-4xl lg:text-5xl text-lime mb-6 leading-none">
                {p.label}
              </h3>
              <div className="w-10 h-px bg-gold/60 mb-6" />
              <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-soft-dim leading-relaxed max-w-xs">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
