function Stroke({ d, size = 22, width = 2.6 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronIcon({ dir = 'right' }) {
  return <Stroke d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />;
}

export function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon() {
  return <Stroke d="M4 7h16M4 12h16M4 17h16" />;
}

export function CloseIcon() {
  return <Stroke d="M6 6l12 12M18 6L6 18" />;
}

export function ArrowDownIcon() {
  return <Stroke d="M12 5v14M19 12l-7 7-7-7" size={20} />;
}

export function ArrowUpIcon() {
  return <Stroke d="M12 19V5M5 12l7-7 7 7" size={20} />;
}

export function PhoneIcon({ size = 20 }) {
  return (
    <Stroke
      size={size}
      width={2.2}
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    />
  );
}
