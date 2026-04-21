export function Insignia({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7dd85" />
          <stop offset="55%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6b1d" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="44" stroke="url(#goldG)" strokeWidth="1.5" opacity="0.55" />
      <circle cx="48" cy="48" r="36" stroke="url(#goldG)" strokeWidth="0.8" opacity="0.35" />
      <path
        d="M48 18 L56 40 L80 40 L60 54 L68 78 L48 64 L28 78 L36 54 L16 40 L40 40 Z"
        fill="url(#goldG)"
        opacity="0.95"
      />
      <path
        d="M48 18 L56 40 L80 40 L60 54 L68 78 L48 64 L28 78 L36 54 L16 40 L40 40 Z"
        stroke="#2a1f05"
        strokeWidth="0.6"
      />
    </svg>
  );
}
