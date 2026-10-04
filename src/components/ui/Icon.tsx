type IconProps = { name: string; className?: string }

const PATHS: Record<string, React.ReactNode> = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />,
  flame: <path d="M12 2c1 3-2 4-2 7a2 2 0 0 0 4 0c2 2 3 4 3 6a5 5 0 1 1-10 0c0-4 4-6 5-13Z" />,
  wifi: (
    <>
      <path d="M2 8.5a16 16 0 0 1 20 0" />
      <path d="M5 12a11 11 0 0 1 14 0" />
      <path d="M8.5 15.5a6 6 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9 12 4l9 5" />
      <path d="M5 9v8M19 9v8M9 9v8M15 9v8" />
      <path d="M3 20h18" />
    </>
  ),
  car: (
    <>
      <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" />
      <circle cx="7" cy="16" r="1" />
      <circle cx="17" cy="16" r="1" />
    </>
  ),
  plane: <path d="M10 2 9 9 2 13v2l7-2 1 5-2 2v1l3-1 3 1v-1l-2-2 1-5 7 2v-2l-7-4-1-7a1.5 1.5 0 0 0-3 0Z" />,
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M2 10h20M6 15h4" />
    </>
  ),
  paw: (
    <>
      <circle cx="7" cy="9" r="1.6" />
      <circle cx="12" cy="7" r="1.6" />
      <circle cx="17" cy="9" r="1.6" />
      <path d="M12 12c-3 0-5 2-5 4.5 0 1.5 1.3 2.5 3 2.5h4c1.7 0 3-1 3-2.5C17 14 15 12 12 12Z" />
    </>
  ),
  home: (
    <>
      <path d="M3 11 12 3l9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  tooth: <path d="M12 3c-2-1-5-1-6 1.5C5 7 6 10 7 14c.5 2 .8 5 2 5s1.3-3 1.5-4.5S11 12 12 12s1.3 1 1.5 2.5S14.8 19 16 19s1.5-3 2-5c1-4 2-7 1-9.5C18 2 14 2 12 3Z" />,
  piggy: (
    <>
      <path d="M4 12a7 6 0 0 1 13-3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1 7 6 0 0 1-3 3v2h-3v-1H9v1H6v-2a7 6 0 0 1-2-4Z" />
      <circle cx="15" cy="11" r="0.8" />
      <path d="M9 7l2-1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4-4" />
    </>
  ),
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />,
  star: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z" />,
  check: <path d="m4 12 5 5L20 6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  trophy: (
    <>
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5a2 2 0 0 0 0 4h3M16 6h3a2 2 0 0 1 0 4h-3" />
      <path d="M12 12v4M9 20h6M10 16h4v4h-4z" />
    </>
  ),
  filter: <path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="2.5" y="13" width="4" height="7" rx="1.5" />
      <rect x="17.5" y="13" width="4" height="7" rx="1.5" />
      <path d="M20 20a3 3 0 0 1-3 3h-3" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  heart: <path d="M12 20s-7-4.3-9.2-8.3C1.2 8.5 3 5 6.2 5 8 5 9.3 6 12 8.7 14.7 6 16 5 17.8 5 21 5 22.8 8.5 21.2 11.7 19 15.7 12 20 12 20Z" />,
  laptop: (
    <>
      <rect x="3" y="5" width="18" height="11" rx="2" />
      <path d="M2 20h20" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  tablet: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  swap: (
    <>
      <path d="M7 4 3 8l4 4M3 8h13" />
      <path d="m17 20 4-4-4-4M21 16H8" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20a7 7 0 0 1 14 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M22 20a7 7 0 0 0-5-6.7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.spark}
    </svg>
  )
}

export function StarRating({ value, className }: { value: number; className?: string }) {
  return (
    <span className={`stars ${className ?? ''}`} aria-label={`${value} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={i <= Math.round(value) ? 'on' : ''} aria-hidden="true">
          <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9L12 3Z" />
        </svg>
      ))}
    </span>
  )
}
