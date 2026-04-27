'use client';
import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from './data';

/* ─────────────────────────────────────────────────────────────────
 * Projects — bento grid.
 *
 * 2-col × 3-row grid. The studio card (a{x}lab) anchors the left
 * column as a featured 1×3 cell with the accent gradient surface;
 * the three other projects stack on the right.
 *
 * Cards carry only the essentials: project name + description +
 * glass CTA button (iOS 26 style — translucent, blurred, with an
 * inset highlight). No pills, no eyebrows, no role/year micro-copy
 * — the visual hierarchy carries the meaning.
 *
 * A spotlight layer follows the cursor on each card via CSS custom
 * properties updated in rAF, painting an accent radial that fades
 * on hover.
 *
 * Mobile (≤780px) collapses to a single-column stack.
 * ───────────────────────────────────────────────────────────────── */

function useSpotlight(targetRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width)  * 100;
        const y = ((e.clientY - r.top)  / r.height) * 100;
        el.style.setProperty('--mx', `${x}%`);
        el.style.setProperty('--my', `${y}%`);
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
    };
  }, [targetRef]);
}

interface CardProps {
  p:        typeof PROJECTS[number];
  featured?: boolean;
  area?:    string;
}

function ProjectCard({ p, featured = false, area }: CardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  useSpotlight(cardRef);

  const isWip    = p.kind === 'wip';
  const isStudio = p.kind === 'studio';
  const hasLink  = p.href && p.href !== '#';

  // Per-kind surface tokens (CTA styling lives next to the buttons below)
  const surface = (() => {
    if (isStudio) return {
      background: 'linear-gradient(135deg, #4F4FFF 0%, #6B6BFF 50%, #2C2CCF 100%)',
      border:     '1px solid rgba(255,255,255,0.16)',
      titleColor: '#FFFFFF',
      bodyColor:  'rgba(255,255,255,0.82)',
    };
    if (isWip) return {
      background: 'rgba(255,255,255,0.02)',
      border:     '1px dashed rgba(255,255,255,0.20)',
      titleColor: 'var(--white)',
      bodyColor:  'var(--t2)',
    };
    return {
      background: 'linear-gradient(135deg, var(--card), var(--bg2))',
      border:     '1px solid rgba(255,255,255,0.06)',
      titleColor: 'var(--white)',
      bodyColor:  'var(--t2)',
    };
  })();

  const Wrapper: React.ElementType = hasLink ? 'a' : 'div';
  const wrapperProps = hasLink
    ? {
        href:   p.href,
        target: p.href.startsWith('http') ? '_blank' : undefined,
        rel:    p.href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {};

  const title = isStudio ? (
    // Render the wordmark a{x}lab inline — `a` and `lab` text plus the
    // brand monogram in white.
    <>
      a<span style={{ position: 'relative' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>lab
    </>
  ) : (
    p.name
  );

  return (
    <Wrapper
      ref={cardRef as React.Ref<HTMLAnchorElement & HTMLDivElement>}
      {...wrapperProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="proj-cell"
      style={{
        position:       'relative',
        gridArea:       area,
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        background:     surface.background,
        border:         surface.border,
        borderRadius:    24,
        padding:        featured ? 'clamp(1.6rem, 2.4vw, 2.2rem)' : 'clamp(1.1rem, 1.6vw, 1.45rem)',
        textDecoration: 'none',
        color:          'inherit',
        overflow:       'hidden',
        cursor:          hasLink ? 'pointer' : 'default',
        transition:     'transform 0.4s var(--ease)',
        transform:       hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Cursor-tracked spotlight */}
      <span
        aria-hidden
        style={{
          position:       'absolute',
          inset:           0,
          borderRadius:   'inherit',
          background:      isStudio
            ? 'radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.18), transparent 50%)'
            : 'radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(107,107,255,0.18), transparent 50%)',
          opacity:         hovered ? 1 : 0,
          transition:     'opacity 0.4s var(--ease)',
          pointerEvents:  'none',
          zIndex:          0,
        }}
      />

      {/* Content top: title + description */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <h3
          style={{
            fontFamily:    'Nohemi, sans-serif',
            fontSize:      featured
              ? 'clamp(2.6rem, 4.5vw, 3.8rem)'
              : 'clamp(1.4rem, 2vw, 1.85rem)',
            fontWeight:    600,
            letterSpacing: '-0.04em',
            lineHeight:     0.96,
            color:          surface.titleColor,
            margin:          0,
          }}
        >
          {title}
        </h3>

        {p.desc && (
          <p
            style={{
              fontFamily:    'Safiro, sans-serif',
              fontSize:      featured
                ? 'clamp(0.95rem, 1.05vw, 1.05rem)'
                : 'clamp(0.82rem, 0.9vw, 0.9rem)',
              fontWeight:    400,
              lineHeight:    1.5,
              color:          surface.bodyColor,
              margin:          0,
              maxWidth:        featured ? 540 : '100%',
              textWrap:       'pretty',
            }}
          >
            {p.desc}
          </p>
        )}
      </div>

      {/* Glass CTA — iOS 26 style. Featured (studio) gets a richer
          treatment: solid white-ink fill with electric-blue text +
          stronger shadow on hover, the way an Apple "Continue" button
          reads on a coloured surface. The other cards keep the subtler
          translucent glass. */}
      {hasLink && !isWip && isStudio && (
        <div
          style={{
            position:    'relative',
            zIndex:       1,
            display:     'flex',
            justifyContent: 'flex-start',
            marginTop:   'clamp(1.2rem, 2vw, 1.8rem)',
          }}
        >
          <span
            style={{
              display:              'inline-flex',
              alignItems:           'center',
              gap:                  '0.6rem',
              padding:              '13px 26px',
              borderRadius:          9999,
              background:            hovered ? '#FFFFFF' : 'rgba(255,255,255,0.92)',
              border:               '1px solid rgba(255,255,255,0.55)',
              boxShadow:             hovered
                ? '0 18px 40px -12px rgba(11,15,26,0.55), 0 0 0 6px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,1)'
                : '0 8px 24px -10px rgba(11,15,26,0.45), inset 0 1px 0 rgba(255,255,255,1)',
              fontFamily:           'Nohemi, sans-serif',
              fontSize:             '0.95rem',
              fontWeight:           600,
              letterSpacing:        '-0.015em',
              color:                 '#4F4FFF',
              transition:           'transform 0.35s var(--ease), background 0.3s var(--ease), box-shadow 0.4s var(--ease)',
              transform:             hovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
            }}
          >
            <span
              aria-hidden
              style={{
                width:          8,
                height:         8,
                borderRadius:   '50%',
                background:    '#4F4FFF',
                boxShadow:     '0 0 0 3px rgba(79,79,255,0.18)',
              }}
            />
            Go to lab
          </span>
        </div>
      )}

      {hasLink && !isWip && !isStudio && (
        <div
          style={{
            position:    'relative',
            zIndex:       1,
            display:     'flex',
            justifyContent: 'flex-start',
            marginTop:   '1rem',
          }}
        >
          <span
            style={{
              display:              'inline-flex',
              alignItems:           'center',
              padding:              '9px 18px',
              borderRadius:          9999,
              background:            hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)',
              border:               `1px solid ${hovered ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.14)'}`,
              backdropFilter:       'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              boxShadow:             hovered
                ? '0 14px 32px -12px rgba(11,15,26,0.55), inset 0 1px 0 rgba(255,255,255,0.20)'
                : '0 6px 18px -10px rgba(11,15,26,0.35), inset 0 1px 0 rgba(255,255,255,0.10)',
              fontFamily:           'Nohemi, sans-serif',
              fontSize:             '0.82rem',
              fontWeight:           500,
              letterSpacing:        '-0.01em',
              color:                 'var(--white)',
              transition:           'transform 0.3s var(--ease), background 0.3s var(--ease), border-color 0.3s var(--ease), box-shadow 0.4s var(--ease)',
              transform:             hovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            View project
          </span>
        </div>
      )}

      {/* WIP cards (Ratta) — no button, just the In progress chip with hourglass */}
      {isWip && (
        <div
          style={{
            position:    'relative',
            zIndex:       1,
            marginTop:   '1rem',
            display:     'inline-flex',
            alignItems:  'center',
            gap:         '0.5rem',
            alignSelf:   'flex-start',
            fontFamily:  'Nohemi, sans-serif',
            fontSize:    '0.78rem',
            fontWeight:  500,
            letterSpacing:'-0.01em',
            color:        'var(--t2)',
          }}
        >
          {/* Hourglass icon — Phosphor-style, single accent stroke */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 2h12" />
            <path d="M6 22h12" />
            <path d="M6 2c0 4 6 6 6 10s-6 6-6 10" />
            <path d="M18 2c0 4-6 6-6 10s6 6 6 10" />
          </svg>
          In progress
        </div>
      )}
    </Wrapper>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth <= 780);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const studio = PROJECTS.find((p) => p.kind === 'studio');
  const others = PROJECTS.filter((p) => p.kind !== 'studio');

  // Grid: 2 columns × 3 rows.
  // ┌──────────────┬──────┐
  // │              │ o[0] │
  // │   studio     ├──────┤
  // │   (a{x}lab)  │ o[1] │
  // │              ├──────┤
  // │              │ o[2] │
  // └──────────────┴──────┘
  const AREAS = [
    'studio o0',
    'studio o1',
    'studio o2',
  ].join('"\n"');

  return (
    <section
      id="projects"
      ref={sectionRef}
      data-home-section="projects"
      className="snap-section"
      style={{
        background:    'var(--bg)',
        position:      'relative',
        overflow:      'hidden',
        padding:       'clamp(2.5rem,4vh,3.6rem) clamp(1.5rem,4vw,3.5rem)',
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'center',
      }}
    >
      <div
        aria-hidden
        style={{
          position:     'absolute',
          top:          '-25%',
          right:        '-12%',
          width:        '50vw',
          height:       '50vw',
          background:   'radial-gradient(circle, rgba(107,107,255,0.08), transparent 62%)',
          borderRadius: '57% 43% 39% 61% / 44% 51% 49% 56%',
          filter:       'blur(80px)',
          pointerEvents:'none',
          zIndex:        0,
        }}
      />

      {/* Header — tight: title only, no eyebrow / count */}
      <header
        style={{
          position:     'relative',
          zIndex:        1,
          maxWidth:     1200,
          margin:       '0 auto clamp(1rem, 1.6vw, 1.4rem)',
          width:        '100%',
        }}
      >
        <h2
          style={{
            fontFamily:    'Nohemi, sans-serif',
            fontSize:      'clamp(2rem, 5vw, 3.6rem)',
            fontWeight:    600,
            letterSpacing: '-0.035em',
            lineHeight:     0.95,
            color:         'var(--white)',
            margin:         0,
          }}
        >
          Things I made.
        </h2>
      </header>

      {/* Bento */}
      <div
        className="proj-bento"
        style={{
          position:     'relative',
          zIndex:        1,
          maxWidth:     1200,
          margin:       '0 auto',
          width:        '100%',
          display:      'grid',
          gap:          'clamp(0.7rem, 1vw, 1rem)',
          gridTemplateColumns: isNarrow ? '1fr' : '1.6fr 1fr',
          gridTemplateRows:    isNarrow ? 'auto' : 'repeat(3, minmax(120px, 1fr))',
          gridTemplateAreas:   isNarrow ? undefined : `"${AREAS}"`,
        }}
      >
        {studio && <ProjectCard p={studio} featured area={isNarrow ? undefined : 'studio'} />}
        {others.map((p, i) => (
          <ProjectCard key={p.name} p={p} area={isNarrow ? undefined : `o${i}`} />
        ))}
      </div>
    </section>
  );
}
