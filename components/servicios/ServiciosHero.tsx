'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionBlob from './SectionBlob';
/* Hero now renders the axlab wordmark inline (a + {x} brace
 * monogram + lab) instead of the agonzx path-data SVG. axlab is the
 * studio brand; the personal portfolio at /, the studio brand here. */

interface Props { wa: string; }

/* Split a line into letter-spans, each inside a mask row for GSAP stagger */
function Line({
  text, color, weight, family,
}: { text: string; color: string; weight: number; family?: string }) {
  return (
    <span
      style={{
        display:    'block',
        overflow:   'hidden',
        padding:    '0.18em 0 0.08em 0',
        marginTop:  '-0.12em',
        whiteSpace: 'nowrap',
      }}
    >
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="s-char"
          style={{
            display:     'inline-block',
            willChange:  'transform, opacity',
            color,
            fontWeight:  weight,
            fontFamily:  family ?? 'inherit',
            whiteSpace:  ch === ' ' ? 'pre' : 'normal',
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function ServiciosHero({ wa }: Props) {
  const sectionRef  = useRef<HTMLElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const spotRef     = useRef<HTMLDivElement>(null);

  /* Spotlight — radial teal gradient follows cursor (rAF-throttled) */
  useEffect(() => {
    const section = sectionRef.current;
    const spot    = spotRef.current;
    if (!section || !spot) return;

    let raf = 0;
    let tx = 50, ty = 30;
    let cx = 50, cy = 30;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      spot.style.background =
        `radial-gradient(520px circle at ${cx}% ${cy}%, rgba(79,79,255,0.22), rgba(79,79,255,0.06) 40%, transparent 70%)`;
      raf = requestAnimationFrame(tick);
    };

    section.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Fade + lift the wordmark as the hero scrolls away */
  useEffect(() => {
    const section = sectionRef.current;
    const logo    = logoRef.current;
    if (!section || !logo) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const snapEl   = document.querySelector('.s-snap-container') as HTMLElement | null;
    /* On mobile .s-snap-container has overflow:visible and doesn't scroll — listen on window. */
    const target: HTMLElement | Window = isMobile ? window : (snapEl ?? window);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const h    = section.clientHeight || 1;
        const progress = Math.min(Math.max(-rect.top / h, 0), 1);
        const t = Math.min(Math.max((progress - 0.05) / 0.45, 0), 1);
        logo.style.opacity = `${1 - t}`;
        /* Desktop lifts the wordmark; mobile stays pinned (sticky feel). */
        logo.style.transform = isMobile ? '' : `translateY(${-t * 28}px)`;
      });
    };

    /* Delay attaching the listener so GSAP entrance can finish cleanly */
    const timer = setTimeout(() => {
      (target as HTMLElement).addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }, 1100);

    return () => {
      clearTimeout(timer);
      (target as HTMLElement).removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Entrance animation — letter-by-letter build */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, bodyRef.current], { opacity: 0 });

      const chars = headlineRef.current?.querySelectorAll<HTMLElement>('.s-char') ?? [];
      gsap.set(chars, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(logoRef.current, { opacity: 1, duration: 1.0 }, 0)
        .fromTo(logoRef.current, { y: 24 }, { y: 0, duration: 1.0, clearProps: 'transform' }, 0)
        .to(bodyRef.current, { opacity: 1, duration: 0.9 }, 0.35)
        /* Typewriter: each char pops in, no fade blur */
        .to(chars, { opacity: 1, duration: 0.01, stagger: 0.038, ease: 'steps(1)' }, 0.45);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-servicios-section="hero"
      className="s-snap-section"
      style={{
        display:        'flex',
        flexDirection:  'column',
        padding:         0,
        background:     'var(--s-bg)',
        overflow:       'hidden',
      }}
    >
      <SectionBlob size="55vw"  top="-15%"  left="-10%"  opacity={0.9} />
      <SectionBlob size="45vw"  bottom="-20%" right="-8%"  opacity={0.7} />

      {/* ── Grainy gradient spotlight — follows cursor ── */}
      <div
        ref={spotRef}
        aria-hidden
        style={{
          position:       'absolute',
          inset:          0,
          zIndex:          0,
          pointerEvents:  'none',
          background:     'radial-gradient(520px circle at 50% 30%, rgba(79,79,255,0.22), rgba(79,79,255,0.06) 40%, transparent 70%)',
          mixBlendMode:   'multiply',
        }}
      />

      {/* ── Grain overlay ── */}
      <div
        aria-hidden
        style={{
          position:           'absolute',
          inset:              0,
          zIndex:              0,
          pointerEvents:      'none',
          opacity:             0.11,
          mixBlendMode:       'multiply',
          backgroundRepeat:   'repeat',
          backgroundSize:     '180px 180px',
          backgroundImage:    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── axlab monumental wordmark (full-bleed) ── */}
      <div
        ref={logoRef}
        className="s-hero-logo"
        style={{
          width:        '100%',
          lineHeight:    0.85,
          position:     'relative',
          zIndex:        1,
          padding:      'clamp(0.8rem, 2vw, 1.4rem) clamp(1rem, 3vw, 2rem)',
          textAlign:    'left',
        }}
      >
        <span
          style={{
            display:       'inline-block',
            fontFamily:    'Nohemi, sans-serif',
            fontWeight:    600,
            fontSize:      'clamp(6rem, 24vw, 22rem)',
            letterSpacing: '-0.05em',
            lineHeight:     0.85,
            color:         '#23335C',
            userSelect:    'none',
            whiteSpace:    'nowrap',
          }}
        >
          a<span style={{ color: '#4F4FFF' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>lab
        </span>
      </div>

      {/* ── Body: headline + CTAs ── */}
      <div
        ref={bodyRef}
        style={{
          position:       'relative',
          zIndex:          1,
          flex:            1,
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          gap:            'clamp(1rem,2vw,1.5rem)',
          padding:        'clamp(1rem,2.5vw,2.5rem) clamp(1.5rem,4vw,3.5rem)',
        }}
      >
        <h1
          ref={headlineRef}
          className="s-hero-headline"
          style={{
            fontFamily:   'Nohemi, sans-serif',
            fontSize:     'clamp(1.85rem,7vw,6rem)',
            fontWeight:   600,
            letterSpacing:'-0.04em',
            lineHeight:    0.9,
            color:        'var(--s-ink)',
            margin:        0,
          }}
        >
          {/* Desktop: single inline phrase */}
          <span className="s-hero-row s-hero-row-desktop">
            <Line text="Software a medida." color="var(--s-ink)" weight={600} />
          </span>
          {/* Mobile: stacked into two lines */}
          <span className="s-hero-row s-hero-row-mobile">
            <Line text="Software"  color="var(--s-ink)" weight={600} />
            <Line text="a medida." color="var(--s-ink)" weight={600} />
          </span>
          <Line text="Sin rodeos." color="var(--s-ink-3)" weight={400} />
        </h1>

        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', paddingTop:'0.5rem' }}>
          {/* Primary CTA */}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="s-cta-primary"
            style={{
              display:       'inline-block',
              fontFamily:    'Safiro, sans-serif',
              fontSize:      '1rem',
              fontWeight:    500,
              letterSpacing: '-0.01em',
              color:         '#FFFFFF',
              padding:       '14px 28px',
              borderRadius:  9999,
              textDecoration:'none',
            }}
          >
            Hablemos →
          </a>
          {/* Secondary CTA — glass */}
          <a
            href="#servicios"
            className="s-cta-ghost"
            style={{
              display:        'inline-block',
              fontFamily:     'Safiro, sans-serif',
              fontSize:       '1rem',
              fontWeight:     500,
              letterSpacing:  '-0.01em',
              color:          'var(--s-ink)',
              padding:        '14px 28px',
              borderRadius:   9999,
              textDecoration: 'none',
            }}
          >
            Ver servicios
          </a>
        </div>
      </div>

    </section>
  );
}
