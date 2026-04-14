export function CircuitBackground() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.06] z-0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1600 900"
      aria-hidden
    >
      <defs>
        <pattern id="grid" width="96" height="96" patternUnits="userSpaceOnUse">
          <path d="M 96 0 L 0 0 0 96" fill="none" stroke="#c9a14a" strokeWidth="0.4" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#050608" stopOpacity="0" />
          <stop offset="100%" stopColor="#050608" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#grid)" />
      <rect width="1600" height="900" fill="url(#fade)" />
      {[
        [180, 140], [1400, 220], [320, 760], [1260, 680], [880, 420], [680, 180],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="2" fill="#c9a14a">
            <animate attributeName="opacity" values="0.2;0.85;0.2" dur="4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r="14" fill="none" stroke="#c9a14a" strokeWidth="0.4" opacity="0.25" />
        </g>
      ))}
      <path d="M 180 140 L 680 180 L 880 420 L 1260 680" stroke="#c9a14a" strokeWidth="0.4" fill="none" opacity="0.3" />
      <path d="M 320 760 L 880 420 L 1400 220" stroke="#e8d79c" strokeWidth="0.4" fill="none" opacity="0.2" />
    </svg>
  );
}
