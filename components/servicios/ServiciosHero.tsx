'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionBlob from './SectionBlob';

interface Props { wa: string; }

export default function ServiciosHero({ wa }: Props) {
  const sectionRef  = useRef<HTMLElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);

  /* Fit wordmark to ~92% of container width */
  useEffect(() => {
    const fit = () => {
      const c = logoRef.current;
      const t = logoTextRef.current;
      if (!c || !t) return;
      t.style.fontSize = '18vw';
      requestAnimationFrame(() => {
        if (!c || !t) return;
        const ratio = (c.clientWidth * 0.92) / t.scrollWidth;
        t.style.fontSize = `${18 * ratio}vw`;
      });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  /* Entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, bodyRef.current], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(logoRef.current, { opacity: 1, y: 0,   duration: 1.0, clearProps: 'transform' }, 0)
        .fromTo(logoRef.current,
          { y: 32 },
          { y: 0,  duration: 1.0 }, 0)
        .to(bodyRef.current,  { opacity: 1, y: 0,  duration: 0.85 }, 0.25)
        .fromTo(bodyRef.current,
          { y: 24 },
          { y: 0,  duration: 0.85 }, 0.25);
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
        justifyContent: 'center',
        padding:        'clamp(1.5rem,4vw,3.5rem) clamp(1.5rem,5vw,5rem)',
        background:     'var(--s-bg)',
        overflow:       'hidden',
      }}
    >
      <SectionBlob size="55vw"  top="-15%"  left="-10%"  opacity={0.9} />
      <SectionBlob size="45vw"  bottom="-20%" right="-8%"  opacity={0.7} />

      {/* ── Wordmark ── */}
      <div
        ref={logoRef}
        style={{ width:'100%', lineHeight:0.88, marginBottom:'clamp(2rem,4vw,3.5rem)', position:'relative', zIndex:1 }}
      >
        <span
          ref={logoTextRef}
          style={{
            display:      'inline-block',
            fontFamily:   'Nohemi, sans-serif',
            fontWeight:   600,
            letterSpacing:'-0.03em',
            lineHeight:    0.88,
            color:        'var(--s-ink)',
            userSelect:   'none',
            whiteSpace:   'nowrap',
          }}
        >
          agonz<span style={{ color:'var(--s-accent)' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>
        </span>
      </div>

      {/* ── Body: headline + subtitle + CTAs ── */}
      <div
        ref={bodyRef}
        style={{
          position:       'relative',
          zIndex:          1,
          display:        'flex',
          flexDirection:  'column',
          gap:            'clamp(1rem,2vw,1.5rem)',
          maxWidth:       720,
        }}
      >
        <h1
          style={{
            fontFamily:   'Nohemi, sans-serif',
            fontSize:     'clamp(1.75rem,3.8vw,3.6rem)',
            fontWeight:   600,
            letterSpacing:'-0.025em',
            lineHeight:    1.05,
            color:        'var(--s-ink)',
            margin:        0,
          }}
        >
          Software a medida para tu empresa.{' '}
          <br />
          Sin agencias, sin sorpresas.
        </h1>

        <p
          style={{
            fontFamily: 'Safiro, sans-serif',
            fontSize:   'clamp(1rem,1.4vw,1.1rem)',
            lineHeight:  1.6,
            color:      'var(--s-ink-2)',
            margin:      0,
            maxWidth:    560,
          }}
        >
          Construyo e itero las herramientas internas que tu negocio necesita
          cada mes. Automatización, IA e integraciones a medida — con un único
          responsable técnico de confianza.
        </p>

        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', paddingTop:'0.25rem' }}>
          {/* Primary CTA */}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:       'inline-block',
              fontFamily:    'Safiro, sans-serif',
              fontSize:      '0.95rem',
              fontWeight:    500,
              letterSpacing: '-0.01em',
              color:         '#FFFFFF',
              background:    '#0B0F14',
              padding:       '12px 24px',
              borderRadius:  9999,
              textDecoration:'none',
              transition:    'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1E2B3C')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0B0F14')}
          >
            Hablemos →
          </a>
          {/* Secondary CTA */}
          <a
            href="#servicios"
            style={{
              display:       'inline-block',
              fontFamily:    'Safiro, sans-serif',
              fontSize:      '0.95rem',
              fontWeight:    500,
              letterSpacing: '-0.01em',
              color:         'var(--s-ink)',
              background:    'transparent',
              padding:       '12px 24px',
              borderRadius:  9999,
              textDecoration:'none',
              border:        '1px solid var(--s-line)',
              transition:    'border-color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--s-ink-3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--s-line)')}
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
