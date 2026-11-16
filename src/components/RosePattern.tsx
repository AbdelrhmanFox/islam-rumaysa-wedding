/**
 * Decorative wedding + rose SVG components.
 * – RosePatternLayer  : full-bleed repeating tile behind gradient scrim
 * – RoseDivider       : single rose between sections
 * – RoseBorderFrame   : full-page fixed corner-rose + edge-line frame
 */

/* ─── Shared rose SVG symbol ──────────────────────────────────────────── */
export function RoseSvg({
  size,
  color,
  opacity = 1,
}: {
  size: number;
  color: string;
  opacity?: number;
}) {
  const r = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', opacity }}
    >
      <g transform={`translate(${r},${r})`} fill={color}>
        {/* Outer petals — 8 rounded ellipses */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <ellipse
            key={deg}
            cx={0}
            cy={-r * 0.55}
            rx={r * 0.22}
            ry={r * 0.42}
            transform={`rotate(${deg})`}
            opacity={0.92}
          />
        ))}
        {/* Inner petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
          <ellipse
            key={deg}
            cx={0}
            cy={-r * 0.36}
            rx={r * 0.15}
            ry={r * 0.28}
            transform={`rotate(${deg})`}
            opacity={0.65}
          />
        ))}
        {/* Centre */}
        <circle cx={0} cy={0} r={r * 0.14} opacity={0.55} />
      </g>
    </svg>
  );
}

/* ─── Fixed full-page border frame ───────────────────────────────────── */
export interface RoseBorderFrameProps {
  /** Rose + line color */
  color?: string;
  /** Rose size in px (corner ornament) */
  roseSize?: number;
  /** Rose opacity */
  roseOpacity?: number;
  /** Line opacity */
  lineOpacity?: number;
  /** Distance from edge in px */
  margin?: number;
  /** 'fixed' (default, full viewport) or 'absolute' (inside relative container) */
  position?: 'fixed' | 'absolute';
}

/**
 * A decorative fixed-position frame that wraps the whole viewport:
 * roses at all four corners, thin lines along all four edges,
 * small diamond ornaments at edge midpoints.
 */
export function RoseBorderFrame({
  color       = '#8B1A3A',
  roseSize    = 52,
  roseOpacity = 0.70,
  lineOpacity = 0.30,
  margin      = 14,
  position    = 'fixed',
}: RoseBorderFrameProps) {
  const half = roseSize / 2;

  /* Position each corner rose so its visual centre sits at the margin point */
  const cornerStyle = (v: 'top' | 'bottom', h: 'left' | 'right') =>
    ({
      position: 'absolute' as const,
      [v]: margin - half,
      [h]: margin - half,
    });

  /* Thin edge line (horizontal or vertical) */
  const hLine = (vEdge: 'top' | 'bottom') => ({
    position: 'absolute' as const,
    [vEdge]: margin - 0.5,
    left:  margin + half - 4,
    right: margin + half - 4,
    height: 1,
    background: `linear-gradient(90deg, transparent, ${color} 12%, ${color} 88%, transparent)`,
    opacity: lineOpacity,
  });

  const vLine = (hEdge: 'left' | 'right') => ({
    position: 'absolute' as const,
    [hEdge]: margin - 0.5,
    top:    margin + half - 4,
    bottom: margin + half - 4,
    width: 1,
    background: `linear-gradient(180deg, transparent, ${color} 12%, ${color} 88%, transparent)`,
    opacity: lineOpacity,
  });

  /* Small diamond at edge midpoints */
  const Diamond = ({ style }: { style: React.CSSProperties }) => (
    <svg
      width={10}
      height={10}
      viewBox="0 0 10 10"
      aria-hidden="true"
      style={{ position: 'absolute', ...style, opacity: lineOpacity + 0.1 }}
    >
      <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={color} />
    </svg>
  );

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
      {/* ── Corner roses ── */}
      <div style={cornerStyle('top',    'left')}>
        <RoseSvg size={roseSize} color={color} opacity={roseOpacity} />
      </div>
      <div style={cornerStyle('top',    'right')}>
        <RoseSvg size={roseSize} color={color} opacity={roseOpacity} />
      </div>
      <div style={cornerStyle('bottom', 'left')}>
        <RoseSvg size={roseSize} color={color} opacity={roseOpacity} />
      </div>
      <div style={cornerStyle('bottom', 'right')}>
        <RoseSvg size={roseSize} color={color} opacity={roseOpacity} />
      </div>

      {/* ── Edge lines ── */}
      <div style={hLine('top')}    />
      <div style={hLine('bottom')} />
      <div style={vLine('left')}   />
      <div style={vLine('right')}  />

      {/* ── Midpoint diamonds ── */}
      <Diamond style={{ top: margin - 5,      left: '50%', transform: 'translateX(-50%)' }} />
      <Diamond style={{ bottom: margin - 5,   left: '50%', transform: 'translateX(-50%)' }} />
      <Diamond style={{ left: margin - 5,     top: '50%',  transform: 'translateY(-50%)' }} />
      <Diamond style={{ right: margin - 5,    top: '50%',  transform: 'translateY(-50%)' }} />
    </div>
  );
}

/**
 * Decorative wedding + rose SVG pattern.
 * Used as a background layer in the hero and as section dividers.
 * Sits at low opacity — text always lives on a scrim above it.
 */
export function RosePatternDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* Repeating tile: 120×120 with a stylised rose + leaves */}
        <pattern id="rosePattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          {/* Central rose bloom */}
          <g transform="translate(60,60)">
            {/* Outer petals */}
            <ellipse cx="0"  cy="-22" rx="7" ry="13" fill="currentColor" opacity="0.9" transform="rotate(0)"   />
            <ellipse cx="0"  cy="-22" rx="7" ry="13" fill="currentColor" opacity="0.9" transform="rotate(45)"  />
            <ellipse cx="0"  cy="-22" rx="7" ry="13" fill="currentColor" opacity="0.9" transform="rotate(90)"  />
            <ellipse cx="0"  cy="-22" rx="7" ry="13" fill="currentColor" opacity="0.9" transform="rotate(135)" />
            <ellipse cx="0"  cy="-22" rx="7" ry="13" fill="currentColor" opacity="0.9" transform="rotate(180)" />
            <ellipse cx="0"  cy="-22" rx="7" ry="13" fill="currentColor" opacity="0.9" transform="rotate(225)" />
            <ellipse cx="0"  cy="-22" rx="7" ry="13" fill="currentColor" opacity="0.9" transform="rotate(270)" />
            <ellipse cx="0"  cy="-22" rx="7" ry="13" fill="currentColor" opacity="0.9" transform="rotate(315)" />
            {/* Inner petals */}
            <ellipse cx="0"  cy="-14" rx="5" ry="9"  fill="currentColor" opacity="0.7" transform="rotate(22.5)"  />
            <ellipse cx="0"  cy="-14" rx="5" ry="9"  fill="currentColor" opacity="0.7" transform="rotate(67.5)"  />
            <ellipse cx="0"  cy="-14" rx="5" ry="9"  fill="currentColor" opacity="0.7" transform="rotate(112.5)" />
            <ellipse cx="0"  cy="-14" rx="5" ry="9"  fill="currentColor" opacity="0.7" transform="rotate(157.5)" />
            <ellipse cx="0"  cy="-14" rx="5" ry="9"  fill="currentColor" opacity="0.7" transform="rotate(202.5)" />
            <ellipse cx="0"  cy="-14" rx="5" ry="9"  fill="currentColor" opacity="0.7" transform="rotate(247.5)" />
            <ellipse cx="0"  cy="-14" rx="5" ry="9"  fill="currentColor" opacity="0.7" transform="rotate(292.5)" />
            <ellipse cx="0"  cy="-14" rx="5" ry="9"  fill="currentColor" opacity="0.7" transform="rotate(337.5)" />
            {/* Centre circle */}
            <circle cx="0" cy="0" r="5" fill="currentColor" opacity="0.5" />
          </g>
          {/* Corner leaves — top-left */}
          <path d="M 5,5 Q 15,0 20,15 Q 10,20 5,5 Z" fill="currentColor" opacity="0.4" />
          {/* Corner leaves — bottom-right */}
          <path d="M 115,115 Q 105,120 100,105 Q 110,100 115,115 Z" fill="currentColor" opacity="0.4" />
          {/* Small diamond ornament — top-right */}
          <path d="M 110,10 L 115,16 L 110,22 L 105,16 Z" fill="currentColor" opacity="0.3" />
          {/* Small diamond ornament — bottom-left */}
          <path d="M 10,98 L 15,104 L 10,110 L 5,104 Z" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>
    </svg>
  );
}

/** Full-bleed pattern layer. Place behind gradient scrim. */
export function RosePatternLayer({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        color: '#8B1A3A',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <RosePatternDefs />
      <svg width="100%" height="100%" style={{ animation: 'floatPattern 18s ease-in-out infinite' }}>
        <rect width="100%" height="100%" fill="url(#rosePattern)" opacity={opacity} />
      </svg>
    </div>
  );
}

/** Single rose ornament used as section divider */
export function RoseDivider() {
  return (
    <div
      aria-hidden="true"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '0.25rem 0' }}
    >
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--clr-border))' }} />
      <svg width="24" height="24" viewBox="0 0 60 60" fill="none" aria-hidden>
        <g transform="translate(30,30)">
          <ellipse cx="0" cy="-12" rx="5" ry="9" fill="var(--clr-accent)" opacity="0.5" transform="rotate(0)"   />
          <ellipse cx="0" cy="-12" rx="5" ry="9" fill="var(--clr-accent)" opacity="0.5" transform="rotate(45)"  />
          <ellipse cx="0" cy="-12" rx="5" ry="9" fill="var(--clr-accent)" opacity="0.5" transform="rotate(90)"  />
          <ellipse cx="0" cy="-12" rx="5" ry="9" fill="var(--clr-accent)" opacity="0.5" transform="rotate(135)" />
          <ellipse cx="0" cy="-12" rx="5" ry="9" fill="var(--clr-accent)" opacity="0.5" transform="rotate(180)" />
          <ellipse cx="0" cy="-12" rx="5" ry="9" fill="var(--clr-accent)" opacity="0.5" transform="rotate(225)" />
          <ellipse cx="0" cy="-12" rx="5" ry="9" fill="var(--clr-accent)" opacity="0.5" transform="rotate(270)" />
          <ellipse cx="0" cy="-12" rx="5" ry="9" fill="var(--clr-accent)" opacity="0.5" transform="rotate(315)" />
          <circle cx="0" cy="0" r="4" fill="var(--clr-accent)" opacity="0.4" />
        </g>
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--clr-border), transparent)' }} />
    </div>
  );
}
