import { brand } from "@/lib/brand";

const sectorIcons: Record<string, React.ReactNode> = {
  medical: (
    <g>
      <circle cx="24" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 18 22 Q 24 34 30 22 M 12 30 Q 24 44 36 30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 24 10 Q 16 6 10 12 M 24 10 Q 32 6 38 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  ),
  legal: (
    <g>
      <line x1="24" y1="8" x2="24" y2="42" stroke="currentColor" strokeWidth="1.4" />
      <line x1="12" y1="14" x2="36" y2="14" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 16 14 L 10 30 Q 10 34 16 34 Q 22 34 22 30 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M 32 14 L 26 30 Q 26 34 32 34 Q 38 34 38 30 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="16" y1="42" x2="32" y2="42" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
  defence: (
    <g>
      <path d="M 24 6 L 30 18 L 42 20 L 33 28 L 35 40 L 24 34 L 13 40 L 15 28 L 6 20 L 18 18 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  ),
  banking: (
    <g>
      <line x1="6" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="1.4" />
      <line x1="8" y1="36" x2="40" y2="36" stroke="currentColor" strokeWidth="1.4" />
      <path d="M 24 6 L 42 16 L 6 16 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="12" y1="20" x2="12" y2="34" stroke="currentColor" strokeWidth="1.4" />
      <line x1="20" y1="20" x2="20" y2="34" stroke="currentColor" strokeWidth="1.4" />
      <line x1="28" y1="20" x2="28" y2="34" stroke="currentColor" strokeWidth="1.4" />
      <line x1="36" y1="20" x2="36" y2="34" stroke="currentColor" strokeWidth="1.4" />
    </g>
  ),
};

export function Sectors() {
  return (
    <section className="relative py-28 md:py-40 px-8 md:px-14 bg-gradient-to-b from-navy to-navy-deep">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-14">
          <span className="eyebrow">Section 05 · High-Risk Environments</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 mb-20 items-end">
          <h2 className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] max-w-2xl">
            Where the cost of
            <br />
            <span className="text-lime">a breach is measured</span>
            <br />
            in <span className="text-gold">decades of trust.</span>
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-base text-soft-dim leading-relaxed max-w-md">
            CyberTS protects the sectors where one incident rewrites a company&apos;s future — where IP theft, patient data loss, or payment compromise is not recoverable with a press release.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brand.sectors.map((sector, i) => (
            <div
              key={sector.id}
              className={`frame-gold p-7 md:p-8 min-h-[260px] flex flex-col justify-between ${i % 2 === 1 ? "md:mt-10" : ""}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <svg width="44" height="44" viewBox="0 0 48 48" className="text-lime">
                    {sectorIcons[sector.id]}
                  </svg>
                  <span className="display-wide text-[9px] text-gold">0{i + 1}</span>
                </div>
                <h3 className="display text-lg md:text-xl text-soft leading-tight mb-4">
                  {sector.name}
                </h3>
              </div>
              <div>
                <div className="w-8 h-px bg-gold/50 mb-4" />
                <p className="font-[family-name:var(--font-inter)] text-xs md:text-sm text-soft-dim leading-relaxed">
                  {sector.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
