import { brand } from "@/lib/brand";

export function CommercialValue() {
  return (
    <section className="relative py-28 md:py-40 px-8 md:px-14">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-14">
          <span className="eyebrow">Section 06 · Commercial Value</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div className="md:sticky md:top-24">
            <h2 className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-8">
              Why CyberTS
              <br />
              <span className="text-lime">stands apart.</span>
            </h2>
            <div className="hairline my-8 max-w-xs" />
            <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-soft-dim leading-relaxed max-w-sm">
              Detect faster. Respond smarter. Defend stronger. Seven commitments that define how we operate — every engagement, every sector, every threat.
            </p>
          </div>

          <ul className="space-y-0 border-t border-gold/20">
            {brand.value.map((v, i) => (
              <li
                key={v}
                className="group flex items-center gap-6 py-6 border-b border-gold/20 transition-all duration-300 hover:pl-4"
              >
                <span className="display-wide text-[10px] text-gold w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-8 h-px bg-lime/60 group-hover:w-14 transition-all duration-300 shrink-0" />
                <span className="display text-lg md:text-2xl text-soft group-hover:text-lime transition-colors flex-1">
                  {v}
                </span>
                <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
