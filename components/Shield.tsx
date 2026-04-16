export function Shield({ size = 260 }: { size?: number }) {
  return (
    <svg
      className="shield-breathe"
      width={size}
      height={size}
      viewBox="0 0 260 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6c230" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#bf8900" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#050608" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="shieldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6c230" />
          <stop offset="100%" stopColor="#bf8900" />
        </linearGradient>
        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf8900" />
          <stop offset="100%" stopColor="#d9a010" />
        </linearGradient>
      </defs>

      <path
        d="M 130 10 L 240 50 L 240 160 Q 240 240 130 290 Q 20 240 20 160 L 20 50 Z"
        fill="url(#shieldFill)"
        stroke="url(#goldStroke)"
        strokeWidth="2"
      />
      <path
        d="M 130 24 L 226 60 L 226 160 Q 226 228 130 272 Q 34 228 34 160 L 34 60 Z"
        fill="none"
        stroke="url(#shieldStroke)"
        strokeWidth="1"
        opacity="0.55"
      />

      <g stroke="#bf8900" strokeWidth="0.7" opacity="0.55" fill="none">
        <path d="M 60 90 L 80 90 L 80 110 L 100 110" />
        <path d="M 200 90 L 180 90 L 180 110 L 160 110" />
        <path d="M 60 190 L 90 190 L 90 170" />
        <path d="M 200 190 L 170 190 L 170 170" />
        <circle cx="80" cy="90" r="2" fill="#e6c230" />
        <circle cx="180" cy="90" r="2" fill="#e6c230" />
        <circle cx="90" cy="190" r="2" fill="#bf8900" />
        <circle cx="170" cy="190" r="2" fill="#bf8900" />
      </g>

      <rect x="108" y="148" width="44" height="48" rx="3" fill="none" stroke="url(#shieldStroke)" strokeWidth="1.6" />
      <path d="M 116 148 L 116 134 Q 116 116 130 116 Q 144 116 144 134 L 144 148"
        fill="none" stroke="url(#shieldStroke)" strokeWidth="1.6" />
      <circle cx="130" cy="168" r="3.5" fill="#e6c230" />
      <line x1="130" y1="168" x2="130" y2="182" stroke="#e6c230" strokeWidth="2" />

      <text
        x="130" y="112"
        textAnchor="middle"
        fontFamily="var(--font-exo), sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="#e6c230"
        letterSpacing="1"
      >
        CyberTS
      </text>
    </svg>
  );
}
