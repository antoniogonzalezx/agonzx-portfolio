'use client';

import { useRef, useEffect, useState } from 'react';
import SectionBlob from './SectionBlob';

interface Props { wa: string; }

const LINKS_L = [
  { label: 'Sobre mí',     href: '#sobre' },
  { label: 'Portfolio',    href: '/' },
  { label: 'Privacidad',   href: '/privacidad' },
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
      await navigator.clipboard.writeText('contacto@axlab.es');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {/* noop */}
  };

  return (
    <section
      ref={sectionRef}
      data-servicios-section="footer"
      className="s-snap-section s-footer-section"
      style={{
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        /* Navy bg edge-to-edge — the CTA area carries its own light
           background as a card, but the section itself lands on navy
           so the bottom never bleeds the page bg through (the "white
           bar" we used to see on mobile when the address bar moved). */
        background:    '#23335C',
        overflow:      'hidden',
        position:      'relative',
      }}
    >
      <SectionBlob size="60vw" top="5%" left="20%" opacity={0.6} />

      {/* ── CTA área ── */}
      <div
        className="s-footer-cta"
        style={{
          flex:           1,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            'clamp(1.75rem, 4vw, 2.5rem)',
          padding:        'clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 5vw, 3rem)',
          background:     'var(--s-bg)',
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
            padding:              'clamp(10px, 1.4vw, 12px) clamp(10px, 1.4vw, 12px) clamp(10px, 1.4vw, 12px) clamp(22px, 3vw, 28px)',
            borderRadius:         9999,
            background:           'rgba(255,255,255,0.68)',
            backdropFilter:       'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            border:               '1px solid rgba(255,255,255,0.60)',
            boxShadow:            '0 8px 32px rgba(11,15,20,0.09), inset 0 1px 0 rgba(255,255,255,0.85)',
            textDecoration:       'none',
            cursor:               'pointer',
            marginTop:            'clamp(0.5rem, 1.5vw, 1rem)',
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
            a<span style={{ color:'var(--s-accent)' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>lab
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
        <div className="s-footer-contact" style={{ display:'flex', gap:'1rem 1.25rem', alignItems:'center', flexWrap:'wrap', justifyContent:'center', marginTop:'clamp(0.5rem, 1.5vw, 1rem)' }}>
          <button
            onClick={copyEmail}
            title="Copiar email"
            style={{
              fontFamily:    'Safiro, sans-serif',
              fontSize:      '0.85rem',
              fontWeight:    500,
              color:         copied ? 'var(--s-accent)' : 'var(--s-ink-2)',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              padding:        0,
              transition:    'color 0.2s ease',
              letterSpacing: '-0.005em',
            }}
          >
            {copied ? 'Copiado ✓' : 'contacto@axlab.es'}
          </button>
          <span style={{ color:'var(--s-ink-3)', fontFamily:'Safiro, sans-serif', fontSize:'0.85rem' }}>·</span>
          <a
            href="tel:+34711514735"
            style={{
              fontFamily:    'Safiro, sans-serif',
              fontSize:      '0.85rem',
              fontWeight:    500,
              color:         'var(--s-ink-2)',
              textDecoration:'none',
              letterSpacing: '-0.005em',
            }}
          >
            +34 711 514 735
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="s-footer-bottom" style={{ position:'relative', zIndex:1, background:'var(--s-bg)' }}>
        {/* Links row — sits on the light surface, gets generous breathing room */}
        <div
          className="s-footer-links-row"
          style={{
            display:       'flex',
            justifyContent:'space-between',
            alignItems:    'center',
            borderBottom:  '1px solid var(--s-line)',
            flexWrap:      'wrap',
            gap:           '0.75rem 2.5rem',
            padding:       'clamp(1.25rem, 3vw, 2rem) clamp(1.5rem,5vw,5rem)',
          }}
        >
          <nav aria-label="Footer" className="s-footer-nav" style={{ display:'flex', gap:'1.25rem 2rem', flexWrap:'wrap' }}>
            {LINKS_L.map(l => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  /* In-page anchors need to scroll the snap container,
                   * not the window — the native anchor jump targets the
                   * window which doesn't scroll on /servicios. */
                  if (l.href.startsWith('#')) {
                    const target = document.querySelector(`[data-servicios-section="${l.href.slice(1)}"]`);
                    const scroller = document.querySelector('.s-snap-container') as HTMLElement | null;
                    if (target && scroller) {
                      e.preventDefault();
                      const r = target.getBoundingClientRect();
                      scroller.scrollTo({ top: scroller.scrollTop + r.top, behavior: 'smooth' });
                    }
                  }
                }}
                style={{
                  fontFamily:    'Nohemi, sans-serif',
                  fontSize:      '0.78rem',
                  fontWeight:    500,
                  color:         'var(--s-ink-3)',
                  textDecoration:'none',
                  letterSpacing: '-0.01em',
                  transition:    'color 0.15s ease',
                  cursor:        'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--s-ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--s-ink-3)')}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <span
            style={{
              fontFamily:    'Nohemi, sans-serif',
              fontSize:      '0.78rem',
              fontWeight:    500,
              color:         'var(--s-ink-3)',
              letterSpacing: '-0.01em',
            }}
          >
            Antonio González · 2026
          </span>
        </div>

        {/* Monumental wordmark — axlab on the navy band.
         * The section already paints navy underneath, so the band's
         * own bg is redundant but kept so the wordmark crops cleanly
         * (overflow:hidden) and we can change the fill independently
         * if we ever want a brand variant. */}
        <div
          style={{
            position:    'relative',
            background:  '#23335C',
            overflow:    'hidden',
            padding:     'clamp(0.4rem, 1vw, 0.7rem) clamp(1.5rem,5vw,5rem) 0',
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
                fontSize:      '24vw',
                letterSpacing: '-0.04em',
                lineHeight:    0.8,
                color:         '#FAFBFD',
                userSelect:    'none',
                whiteSpace:    'nowrap',
              }}
            >
              a<span style={{ color:'var(--s-accent)' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>lab
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
