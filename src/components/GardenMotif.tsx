import { useId, type CSSProperties } from 'react';

export function CrescentSvg({
  size = 72,
  color = 'currentColor',
  opacity = 1,
}: {
  size?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" style={{ opacity }}>
      <path
        d="M40 8a24 24 0 1 0 12 42 20 20 0 1 1-12-42z"
        fill={color}
      />
    </svg>
  );
}

export function GardenPatternLayer({ opacity = 0.12 }: { opacity?: number }) {
  const uid = useId().replace(/:/g, '');
  const patternId = `mashrabiya-${uid}`;
  return (
    <div
      aria-hidden="true"
      className="garden-pattern"
      style={{
        position: 'absolute',
        inset: 0,
        color: 'var(--clr-leaf)',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern id={patternId} x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M24 4 L28 16 L40 20 L28 24 L24 36 L20 24 L8 20 L20 16 Z"
              fill="currentColor"
              opacity="0.55"
            />
            <circle cx="8" cy="8" r="1.4" fill="currentColor" opacity="0.35" />
            <circle cx="40" cy="40" r="1.4" fill="currentColor" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity={opacity} />
      </svg>
    </div>
  );
}

export function GardenFrame({
  color = 'var(--clr-brass)',
  margin = 16,
  position = 'fixed' as const,
}: {
  color?: string;
  margin?: number;
  position?: 'fixed' | 'absolute';
}) {
  const corners: Array<[string, CSSProperties]> = [
    ['tl', { top: margin, left: margin, borderTopWidth: 2, borderLeftWidth: 2 }],
    ['tr', { top: margin, right: margin, borderTopWidth: 2, borderRightWidth: 2 }],
    ['bl', { bottom: margin, left: margin, borderBottomWidth: 2, borderLeftWidth: 2 }],
    ['br', { bottom: margin, right: margin, borderBottomWidth: 2, borderRightWidth: 2 }],
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position,
        inset: 0,
        pointerEvents: 'none',
        zIndex: position === 'fixed' ? 500 : 10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: margin,
          border: `1px solid ${color}`,
          opacity: 0.28,
        }}
      />
      {corners.map(([key, extra]) => (
        <div
          key={key}
          style={{
            position: 'absolute',
            width: 18,
            height: 18,
            borderColor: color,
            borderStyle: 'solid',
            borderWidth: 0,
            opacity: 0.55,
            ...extra,
          }}
        />
      ))}
    </div>
  );
}

export function OliveDivider() {
  return (
    <div className="olive-divider" aria-hidden="true">
      <span className="olive-divider-line" />
      <svg width="42" height="18" viewBox="0 0 42 18" fill="none">
        <path d="M4 9 C10 3, 14 3, 21 9 C28 15, 32 15, 38 9" stroke="var(--clr-brass)" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="6.5" rx="2.2" ry="3.4" fill="var(--clr-leaf)" opacity="0.85" transform="rotate(-28 12 6.5)" />
        <ellipse cx="21" cy="9" rx="2.4" ry="3.6" fill="var(--clr-leaf)" />
        <ellipse cx="30" cy="11.5" rx="2.2" ry="3.4" fill="var(--clr-leaf)" opacity="0.85" transform="rotate(28 30 11.5)" />
      </svg>
      <span className="olive-divider-line olive-divider-line--flip" />
    </div>
  );
}
