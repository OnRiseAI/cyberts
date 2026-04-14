const threats = [
  { n: "01", title: "Undetected Breaches", copy: "Intrusions operate silently for months. By the time a breach is visible, millions are already lost." },
  { n: "02", title: "Compliance Exposure", copy: "UK and EU regulators now impose penalties that eclipse the cost of prevention. Non-compliance is no longer survivable." },
  { n: "03", title: "Reputational Collapse", copy: "Trust, once broken, does not return. A single incident rewrites how clients, insurers, and boards see you." },
];

export function Problem() {
  return (
    <section className="relative py-28 md:py-40 px-8 md:px-14">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-14">
          <span className="eyebrow">Section 02</span>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        <h2 className="display text-3xl md:text-5xl lg:text-6xl leading-[0.95] mb-12 max-w-4xl">
          Cyber threats no longer
          <br />
          <span className="text-lime">announce their presence.</span>
        </h2>

        <p className="font-[family-name:var(--font-inter)] text-lg md:text-xl text-soft-dim max-w-2xl leading-relaxed mb-20">
          They lurk within systems, quietly siphoning value. You don&apos;t lose data first —
          <span className="text-soft"> you lose control.</span>
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-gold/20">
          {threats.map((t) => (
            <div key={t.n} className="bg-navy p-8 md:p-10 relative group transition-colors duration-500 hover:bg-navy-deep">
              <div className="flex items-start justify-between mb-6">
                <span className="display-wide text-xs text-gold">{t.n}</span>
                <div className="w-8 h-8 border border-gold/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-lime group-hover:bg-gold transition-colors" />
                </div>
              </div>
              <h3 className="display text-xl md:text-2xl text-soft mb-4 leading-tight">{t.title}</h3>
              <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-soft-dim leading-relaxed">{t.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
