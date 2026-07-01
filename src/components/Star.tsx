export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1d166" />
          <stop offset="50%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8c6b14" />
        </linearGradient>
        <linearGradient id="goldShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,.7)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="10" floodColor="#c9a227" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#softShadow)">
        <path
          d="M120 20 L148 88 L222 92 L165 137 L185 210 L120 170 L55 210 L75 137 L18 92 L92 88 Z"
          fill="url(#goldFill)"
          stroke="#d4ae38"
          strokeWidth="1.2"
        />
        <path
          d="M120 20 L148 88 L222 92 L165 137 L185 210 L120 170 L55 210 L75 137 L18 92 L92 88 Z"
          fill="url(#goldShine)"
        />
      </g>

      <path
        d="M120 55 L138 92 L178 95 L148 120 L158 158 L120 138 L82 158 L92 120 L62 95 L102 92 Z"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
