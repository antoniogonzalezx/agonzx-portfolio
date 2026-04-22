'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import SectionBlob from './SectionBlob';

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
  const [ctaHover, setCtaHover] = useState(false);

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
        `radial-gradient(520px circle at ${cx}% ${cy}%, rgba(61,242,224,0.32), rgba(61,242,224,0.08) 40%, transparent 70%)`;
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
          background:     'radial-gradient(520px circle at 50% 30%, rgba(61,242,224,0.32), rgba(61,242,224,0.08) 40%, transparent 70%)',
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

      {/* ── Wordmark (full-bleed, flush to the top of the viewport) ── */}
      <div
        ref={logoRef}
        className="s-hero-logo"
        style={{ width:'100%', lineHeight:0, position:'relative', zIndex:1, padding:'8px 0' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/agonzx-wordmark.svg"
          alt="agonzx"
          draggable={false}
          style={{
            width:       '100%',
            height:      'auto',
            display:     'block',
            userSelect:  'none',
            aspectRatio: '4.295 / 1',
          }}
        />
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
          <span className="s-hero-row" style={{ display:'flex', flexDirection:'row', gap:'0.28em', flexWrap:'nowrap' }}>
            <Line text="Software"   color="var(--s-ink)" weight={600} />
            <Line text="a medida."  color="var(--s-ink)" weight={600} />
          </span>
          <Line text="Sin rodeos." color="var(--s-ink-3)" weight={400} />
        </h1>

        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', paddingTop:'0.5rem' }}>
          {/* Primary CTA — teal + ink + ink border + lift on hover */}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              display:       'inline-block',
              fontFamily:    'Safiro, sans-serif',
              fontSize:      '1rem',
              fontWeight:    500,
              letterSpacing: '-0.01em',
              color:         ctaHover ? 'var(--s-ink)' : '#FFFFFF',
              background:    ctaHover ? 'var(--s-accent)' : '#0B0F14',
              padding:       '14px 28px',
              borderRadius:  9999,
              textDecoration:'none',
              border:        `1px solid ${ctaHover ? 'var(--s-ink)' : '#0B0F14'}`,
              transform:     ctaHover ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow:     ctaHover
                ? '0 10px 24px rgba(61,242,224,0.35), 0 2px 6px rgba(11,15,20,0.12)'
                : '0 1px 2px rgba(11,15,20,0.08)',
              transition:    'background 0.22s var(--s-ease), color 0.22s var(--s-ease), border-color 0.22s var(--s-ease), transform 0.22s var(--s-ease), box-shadow 0.22s var(--s-ease)',
            }}
          >
            Hablemos →
          </a>
          {/* Secondary CTA — glass */}
          <a
            href="#servicios"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(11,15,20,0.2)';
              e.currentTarget.style.background  = 'rgba(255,255,255,0.75)';
              e.currentTarget.style.transform   = 'translateY(-2px)';
              e.currentTarget.style.boxShadow   = '0 10px 24px rgba(11,15,20,0.08), inset 0 1px 0 rgba(255,255,255,0.95)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(11,15,20,0.08)';
              e.currentTarget.style.background  = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.transform   = 'translateY(0)';
              e.currentTarget.style.boxShadow   = 'inset 0 1px 0 rgba(255,255,255,0.85)';
            }}
            style={{
              display:              'inline-block',
              fontFamily:           'Safiro, sans-serif',
              fontSize:             '1rem',
              fontWeight:           500,
              letterSpacing:        '-0.01em',
              color:                'var(--s-ink)',
              background:           'rgba(255,255,255,0.5)',
              backdropFilter:       'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              padding:              '14px 28px',
              borderRadius:         9999,
              textDecoration:       'none',
              border:               '1px solid rgba(11,15,20,0.08)',
              boxShadow:            'inset 0 1px 0 rgba(255,255,255,0.85)',
              transition:           'background 0.22s var(--s-ease), border-color 0.22s var(--s-ease), transform 0.22s var(--s-ease), box-shadow 0.22s var(--s-ease)',
            }}
          >
            Ver servicios
          </a>
        </div>
      </div>

    </section>
  );
}
