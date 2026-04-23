'use client';

import { useRef, useEffect, useState } from 'react';
import SectionBlob from './SectionBlob';

interface Props { wa: string; }

const LINKS_L = [
  { label: 'Inicio',       href: '/' },
  { label: 'Sobre mí',     href: '/#about' },
  { label: 'Servicios',    href: '/servicios' },
  { label: '@agonzx',      href: 'https://instagram.com/agonzx' },
  { label: 'LinkedIn',     href: 'https://www.linkedin.com/in/antoniogonzalezvaldepenas' },
  { label: 'GitHub',       href: 'https://github.com/antoniogonzalezx' },
];

export default function ServiciosFooter({ wa }: Props) {
  const sectionRef   = useRef<HTMLElement>(null);
  const wordmarkRef  = useRef<HTMLDivElement>(null);
  const wordmarkText = useRef<HTMLSpanElement>(null);
  const [copied,  setCopied]  = useState(false);

  /* Fit wordmark to full section width */
  useEffect(() => {
    const fit = () => {
      const c = wordmarkRef.current;
      const t = wordmarkText.current;
      if (!c || !t) return;
      t.style.fontSize = '18vw';
      requestAnimationFrame(() => {
        if (!c || !t) return;
        const ratio = c.clientWidth / t.scrollWidth;
        t.style.fontSize = `${18 * Math.min(ratio, 1.08)}vw`;
      });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contacto@agonzx.dev');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {/* noop */}
  };

  return (
    <section
      ref={sectionRef}
      data-servicios-section="footer"
      className="s-snap-section"
      style={{
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        background:    'var(--s-bg)',
        overflow:      'hidden',
        position:      'relative',
      }}
    >
      <SectionBlob size="60vw" top="5%" left="20%" opacity={0.6} />

      {/* ── CTA área ── */}
      <div
        style={{
          flex:           1,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '1.5rem',
          padding:        'clamp(1.5rem,4vw,4rem) clamp(1.5rem,5vw,5rem) 0',
          position:       'relative',
          zIndex:          1,
          textAlign:      'center',
        }}
      >
        <h2
          style={{
            fontFamily:   'Nohemi, sans-serif',
            fontSize:     'clamp(3rem,9vw,9rem)',
            fontWeight:   600,
            letterSpacing:'-0.035em',
            lineHeight:    0.95,
            color:        'var(--s-ink)',
            margin:        0,
          }}
        >
          ¿Hablamos?
        </h2>

        <p
          style={{
            fontFamily:'Safiro, sans-serif',
            fontSize:  'clamp(1rem,1.3vw,1.1rem)',
            color:     'var(--s-ink-2)',
            margin:     0,
          }}
        >
          Te respondo en menos de 24 h.
        </p>

        {/* WhatsApp pill — larger version of the floating one */}
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hablar por WhatsApp con Antonio"
          className="s-footer-wa"
          style={{
            display:              'flex',
            alignItems:           'center',
            gap:                  10,
            padding:              '9px 9px 9px 22px',
            borderRadius:         9999,
            background:           'rgba(255,255,255,0.68)',
            backdropFilter:       'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            border:               '1px solid rgba(255,255,255,0.60)',
            boxShadow:            '0 8px 32px rgba(11,15,20,0.09), inset 0 1px 0 rgba(255,255,255,0.85)',
            textDecoration:       'none',
            cursor:               'pointer',
            marginTop:            '0.25rem',
          }}
        >
          <span
            style={{
              fontFamily:   'Nohemi, sans-serif',
              fontSize:     '0.88rem',
              fontWeight:   600,
              letterSpacing:'-0.01em',
              color:        'var(--s-ink)',
              padding:      '0 6px',
            }}
          >
            agonz<span style={{ color:'var(--s-accent)' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>
          </span>
          <span
            className="s-footer-wa-pill"
            style={{
              display:       'block',
              color:         '#FFFFFF',
              borderRadius:  9999,
              padding:       '12px 24px',
              fontFamily:    'Safiro, sans-serif',
              fontSize:      15,
              fontWeight:    500,
              letterSpacing: '-0.01em',
              lineHeight:    1,
              transition:    'background 0.2s ease',
            }}
          >
            Hablemos por WhatsApp →
          </span>
        </a>

        {/* Contact details */}
        <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap', justifyContent:'center' }}>
          <button
            onClick={copyEmail}
            title="Copiar email"
            style={{
              fontFamily:    'Martian Mono, monospace',
              fontSize:      '0.72rem',
              color:         copied ? 'var(--s-accent)' : 'var(--s-ink-3)',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              padding:        0,
              transition:    'color 0.2s ease',
              letterSpacing: '0.02em',
            }}
          >
            {copied ? 'Copiado ✓' : 'contacto@agonzx.dev'}
          </button>
          <span style={{ color:'var(--s-line)', fontFamily:'Martian Mono, monospace', fontSize:'0.72rem' }}>·</span>
          <a
            href="tel:+34711514735"
            style={{
              fontFamily:   'Martian Mono, monospace',
              fontSize:     '0.72rem',
              color:        'var(--s-ink-3)',
              textDecoration:'none',
              letterSpacing:'0.02em',
            }}
          >
            +34 711 514 735
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ position:'relative', zIndex:1 }}>
        {/* Links row */}
        <div
          style={{
            display:       'flex',
            justifyContent:'space-between',
            alignItems:    'flex-end',
            paddingBottom: '0.75rem',
            borderBottom:  '1px solid var(--s-line)',
            flexWrap:      'wrap',
            gap:           '0.5rem 2rem',
            padding:       '0 clamp(1.5rem,5vw,5rem) 0.75rem',
          }}
        >
          <nav aria-label="Footer" style={{ display:'flex', gap:'1.25rem', flexWrap:'wrap' }}>
            {LINKS_L.map(l => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily:    'Martian Mono, monospace',
                  fontSize:      '0.65rem',
                  color:         'var(--s-ink-3)',
                  textDecoration:'none',
                  letterSpacing: '0.03em',
                  transition:    'color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--s-ink-2)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--s-ink-3)')}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <span
            style={{
              fontFamily:   'Martian Mono, monospace',
              fontSize:     '0.65rem',
              color:        'var(--s-ink-3)',
              letterSpacing:'0.03em',
            }}
          >
            Antonio González · 2026
          </span>
        </div>

        {/* Monumental wordmark — dark background like main portfolio */}
        <div
          style={{
            background:  '#23335C',
            overflow:    'hidden',
            padding:     '0.2rem clamp(1.5rem,5vw,5rem) 0',
            lineHeight:  0.8,
          }}
        >
          <div ref={wordmarkRef} style={{ overflow:'hidden', lineHeight:0.8 }}>
            <span
              ref={wordmarkText}
              style={{
                display:       'inline-block',
                fontFamily:    'Nohemi, sans-serif',
                fontWeight:    600,
                fontSize:      '18vw',
                letterSpacing: '-0.04em',
                lineHeight:    0.8,
                color:         '#FAFBFD',
                userSelect:    'none',
                whiteSpace:    'nowrap',
              }}
            >
              agonz<span style={{ color:'var(--s-accent)' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
