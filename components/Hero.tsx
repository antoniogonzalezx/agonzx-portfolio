'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Wordmark from './servicios/Wordmark';

/* ─────────────────────────────────────────────────────────────────
 * Home hero — dark mirror of /lab.
 *
 * Atmosphere = the same recipe /lab uses, inverted:
 *   1) two soft radial blobs anchored to opposite corners (single
 *      electric-blue family, no animation — calm)
 *   2) a cursor-tracked spotlight in the same blue
 *   3) a grain overlay to break digital flatness
 *
 * Composition: monumental `agonz{x}` wordmark full-bleed at top
 * (matching /lab's anchor exactly). Below: a 2-line Nohemi tagline
 * and a short Safiro paragraph, then two CTAs. The `{x}lab` link
 * to the studio lives only in the navbar — the hero stays clean.
 *
 * Retained signature: Swift-keyword cursor trail (only on pointer:
 * fine, only inside this section). It's the home's quiet wink — /lab
 * has its own cursor system (ServiciosCursor).
 * ───────────────────────────────────────────────────────────────── */

const SWIFT_KEYWORDS: { text: string; color: string }[] = [
  { text: '@State',        color: '#FC5FA3' },
  { text: '@Binding',      color: '#FC5FA3' },
  { text: '@Observable',   color: '#FC5FA3' },
  { text: '@MainActor',    color: '#FC5FA3' },
  { text: '@Environment',  color: '#FC5FA3' },
  { text: '@Published',    color: '#FC5FA3' },
  { text: '@ViewBuilder',  color: '#FC5FA3' },
  { text: '#Preview',      color: '#FFA14F' },
  { text: '#available',    color: '#FFA14F' },
  { text: 'async',         color: '#FC5FA3' },
  { text: 'await',         color: '#FC5FA3' },
  { text: 'guard',         color: '#FC5FA3' },
  { text: 'throws',        color: '#FC5FA3' },
  { text: 'struct',        color: '#FC5FA3' },
  { text: 'protocol',      color: '#FC5FA3' },
  { text: 'actor',         color: '#FC5FA3' },
  { text: 'some',          color: '#FC5FA3' },
  { text: 'let',           color: '#FC5FA3' },
  { text: 'var',           color: '#FC5FA3' },
  { text: 'return',        color: '#FC5FA3' },
  { text: 'nil',           color: '#FC5FA3' },
  { text: 'try',           color: '#FC5FA3' },
  { text: 'catch',         color: '#FC5FA3' },
  { text: 'import',        color: '#FC5FA3' },
  { text: 'extension',     color: '#FC5FA3' },
  { text: 'override',      color: '#FC5FA3' },
  { text: 'static',        color: '#FC5FA3' },
  { text: 'Task',          color: '#5DD8FF' },
  { text: 'View',          color: '#5DD8FF' },
  { text: 'String',        color: '#5DD8FF' },
  { text: 'Bool',          color: '#5DD8FF' },
  { text: 'Int',           color: '#5DD8FF' },
  { text: 'Double',        color: '#5DD8FF' },
  { text: 'Optional',      color: '#5DD8FF' },
  { text: 'Never',         color: '#5DD8FF' },
  { text: 'Self',          color: '#5DD8FF' },
  { text: 'URLSession',    color: '#5DD8FF' },
  { text: 'withAnimation', color: '#67B7A4' },
  { text: '.sink',         color: '#67B7A4' },
  { text: '.map',          color: '#67B7A4' },
  { text: '.filter',       color: '#67B7A4' },
  { text: '.store',        color: '#67B7A4' },
];

function useSwiftCursorTrail(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    let lastX = 0, lastY = 0, lastTime = 0, idx = 0;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 55 || now - lastTime < 100) return;
      lastX = e.clientX; lastY = e.clientY; lastTime = now;

      const { text, color } = SWIFT_KEYWORDS[idx % SWIFT_KEYWORDS.length];
      idx++;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top + (Math.random() - 0.5) * 24;

      const el = document.createElement('span');
      el.textContent = text;
      el.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        font-family: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace;
        font-size: 0.68rem;
        font-weight: 500;
        color: ${color};
        pointer-events: none;
        z-index: 4;
        white-space: nowrap;
        animation: swiftKw 1.6s ease forwards;
      `;
      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };

    container.addEventListener('mousemove', onMove);
    return () => container.removeEventListener('mousemove', onMove);
  }, [containerRef]);
}

export default function Hero() {
  const heroRef     = useRef<HTMLElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const spotRef     = useRef<HTMLDivElement>(null);

  useSwiftCursorTrail(heroRef);

  /* Cursor-tracked spotlight — same recipe /lab uses, inverted to
     glow electric blue against the navy ground. rAF-throttled. */
  useEffect(() => {
    const section = heroRef.current;
    const spot    = spotRef.current;
    if (!section || !spot) return;

    let raf = 0;
    let tx = 50, ty = 35;
    let cx = 50, cy = 35;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width)  * 100;
      ty = ((e.clientY - rect.top)  / rect.height) * 100;
    };

    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      spot.style.background =
        `radial-gradient(640px circle at ${cx}% ${cy}%, rgba(107,107,255,0.22), rgba(107,107,255,0.06) 40%, transparent 70%)`;
      raf = requestAnimationFrame(tick);
    };

    section.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Entrance — wordmark fades up, headline + body cascade in */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, headlineRef.current, bodyRef.current], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(logoRef.current,     { y: 24 }, { y: 0, opacity: 1, duration: 1.0 }, 0)
        .fromTo(headlineRef.current, { y: 16 }, { y: 0, opacity: 1, duration: 0.8 }, 0.30)
        .fromTo(bodyRef.current,     { y: 12 }, { y: 0, opacity: 1, duration: 0.8 }, 0.50);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="snap-section"
      data-home-section="hero"
      style={{
        minHeight:     '100dvh',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
        overflow:      'hidden',
        background:    'var(--bg)',
      }}
    >
      {/* ── Two soft static blobs, single accent family ── */}
      <div
        aria-hidden
        style={{
          position:     'absolute',
          top:          '-18%',
          left:         '-12%',
          width:        '55vw',
          height:       '55vw',
          background:   'radial-gradient(circle, rgba(107,107,255,0.18), transparent 62%)',
          borderRadius: '43% 57% 61% 39% / 51% 44% 56% 49%',
          filter:       'blur(60px)',
          pointerEvents:'none',
          zIndex:        0,
        }}
      />
      <div
        aria-hidden
        style={{
          position:     'absolute',
          bottom:       '-22%',
          right:        '-10%',
          width:        '48vw',
          height:       '48vw',
          background:   'radial-gradient(circle, rgba(107,107,255,0.12), transparent 62%)',
          borderRadius: '57% 43% 39% 61% / 44% 51% 49% 56%',
          filter:       'blur(60px)',
          pointerEvents:'none',
          zIndex:        0,
        }}
      />

      {/* ── Cursor-tracked spotlight ── */}
      <div
        ref={spotRef}
        aria-hidden
        style={{
          position:      'absolute',
          inset:          0,
          zIndex:         1,
          pointerEvents: 'none',
          background:    'radial-gradient(640px circle at 50% 35%, rgba(107,107,255,0.22), rgba(107,107,255,0.06) 40%, transparent 70%)',
          mixBlendMode:  'screen',
        }}
      />

      {/* ── Grain overlay ── */}
      <div
        aria-hidden
        className="hero-grain"
        style={{
          position:           'absolute',
          inset:              0,
          zIndex:              2,
          pointerEvents:      'none',
          opacity:             0.07,
          mixBlendMode:       'overlay',
          backgroundRepeat:   'repeat',
          backgroundSize:     '180px 180px',
          backgroundImage:    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Monumental wordmark — full-bleed, no sub-mark below ── */}
      <div
        ref={logoRef}
        style={{ width:'100%', lineHeight:0, position:'relative', zIndex:3, padding:'8px 0' }}
      >
        <Wordmark main="var(--white)" accent="var(--accent)" width="100%" />
      </div>

      {/* ── Body: headline + CTAs ── (mirrors /lab/axlab — title only) */}
      <div
        style={{
          flex:            1,
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'center',
          gap:             'clamp(1.25rem, 2.5vw, 2rem)',
          padding:         'clamp(1rem,2.5vw,2.5rem) clamp(1.5rem,4vw,3.5rem)',
          position:        'relative',
          zIndex:           3,
          maxWidth:        'min(94vw, 1180px)',
        }}
      >
        <h1
          ref={headlineRef}
          style={{
            fontFamily:    'Nohemi, sans-serif',
            fontSize:      'clamp(1.85rem,7vw,6rem)',
            fontWeight:    600,
            letterSpacing: '-0.04em',
            lineHeight:     0.92,
            color:         'var(--white)',
            margin:         0,
            textWrap:       'balance',
          }}
        >
          <span style={{ display: 'block' }}>Senior iOS engineer.</span>
          <span style={{ display: 'block', color: 'var(--t3)', fontWeight: 400 }}>
            Remote from Spain.
          </span>
        </h1>

        <div ref={bodyRef} className="hero-ctas" style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', paddingTop:'0.5rem' }}>
          <a
            href="#contact"
            className="hero-cta-primary"
            style={{
              display:       'inline-block',
              fontFamily:    'Safiro, sans-serif',
              fontSize:      '1rem',
              fontWeight:    500,
              letterSpacing: '-0.01em',
              color:         '#FFFFFF',
              background:    'var(--accent)',
              padding:       '14px 28px',
              borderRadius:  9999,
              textDecoration:'none',
              transition:    'transform 0.25s var(--ease), box-shadow 0.25s var(--ease)',
              boxShadow:     '0 8px 24px rgba(107,107,255,0.20)',
              textAlign:     'center',
            }}
          >
            Get in touch →
          </a>
          <a
            href="#projects"
            className="hero-cta-ghost"
            style={{
              display:        'inline-block',
              fontFamily:     'Safiro, sans-serif',
              fontSize:       '1rem',
              fontWeight:     500,
              letterSpacing:  '-0.01em',
              color:          'var(--white)',
              background:     'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              border:         '1px solid rgba(255,255,255,0.10)',
              padding:        '14px 28px',
              borderRadius:   9999,
              textDecoration: 'none',
              transition:     'border-color 0.25s var(--ease), background 0.25s var(--ease)',
              textAlign:      'center',
            }}
          >
            See work
          </a>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .hero-cta-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 34px rgba(107,107,255,0.32); }
        .hero-cta-ghost:hover   { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.20); }

        /* Mobile: full-bleed CTAs — same pattern as axlab hero so both
           home pages share a single mobile composition language. */
        @media (max-width: 700px) {
          .hero-ctas a { flex: 1 1 100%; }
        }
      `}</style>
    </section>
  );
}
