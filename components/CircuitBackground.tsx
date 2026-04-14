export function CircuitBackground() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.14] z-0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1600 900"
      aria-hidden
    >
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#A4FF00" strokeWidth="0.4" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0A1F44" stopOpacity="0" />
          <stop offset="100%" stopColor="#0A1F44" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#grid)" />
      <rect width="1600" height="900" fill="url(#fade)" />
      {[
        [180, 140], [1400, 220], [320, 760], [1260, 680], [880, 420], [680, 180],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3" fill="#A4FF00">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r="18" fill="none" stroke="#A4FF00" strokeWidth="0.6" opacity="0.4" />
        </g>
      ))}
      <path d="M 180 140 L 680 180 L 880 420 L 1260 680" stroke="#A4FF00" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M 320 760 L 880 420 L 1400 220" stroke="#00FF88" strokeWidth="0.5" fill="none" opacity="0.35" />
    </svg>
  );
}
