export function CityBackdrop() {
  return (
    <svg
      className="fixed bottom-0 left-0 w-full pointer-events-none z-0 opacity-[0.22]"
      viewBox="0 0 1600 280"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="city" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0b0f" stopOpacity="0" />
          <stop offset="40%" stopColor="#0a0b0f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#050608" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#c9a14a" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#c9a14a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="280" fill="url(#glow)" />

      <path
        d="M 0 280 L 0 220 L 60 220 L 60 180 L 100 180 L 100 210 L 140 210 L 140 150 L 180 150 L 180 120 L 220 120 L 220 170 L 260 170 L 260 200 L 300 200 L 300 140 L 340 140 L 340 110 L 380 110 L 380 90 L 420 90 L 420 130 L 460 130 L 460 170 L 500 170 L 500 100 L 540 100 L 540 60 L 580 60 L 580 120 L 620 120 L 620 180 L 660 180 L 660 140 L 700 140 L 700 80 L 740 80 L 740 50 L 780 50 L 780 100 L 820 100 L 820 160 L 860 160 L 860 120 L 900 120 L 900 70 L 940 70 L 940 110 L 980 110 L 980 150 L 1020 150 L 1020 90 L 1060 90 L 1060 60 L 1100 60 L 1100 130 L 1140 130 L 1140 170 L 1180 170 L 1180 110 L 1220 110 L 1220 80 L 1260 80 L 1260 140 L 1300 140 L 1300 190 L 1340 190 L 1340 150 L 1380 150 L 1380 100 L 1420 100 L 1420 170 L 1460 170 L 1460 200 L 1500 200 L 1500 160 L 1540 160 L 1540 210 L 1600 210 L 1600 280 Z"
        fill="url(#city)"
      />

      <g fill="#e6c878" opacity="0.85">
        {[
          [62, 190], [104, 195], [142, 160], [222, 135], [302, 155], [382, 100],
          [422, 140], [502, 115], [542, 75], [622, 135], [702, 95], [782, 65],
          [862, 135], [902, 85], [982, 125], [1062, 75], [1102, 140], [1182, 125],
          [1262, 95], [1342, 160], [1422, 115], [1502, 175],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="2" height="2">
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${2.5 + (i % 4) * 0.5}s`}
              begin={`${(i * 0.15) % 3}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
    </svg>
  );
}
