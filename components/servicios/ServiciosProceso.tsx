'use client';

import { useRef, useEffect, useState } from 'react';
import SectionBlob from './SectionBlob';

interface Props { wa: string; }

const STEPS = [
  {
    num:   '01',
    label: 'Diagnóstico',
    body:  'Una llamada de 30 min. Sin compromiso. Te digo si puedo ayudarte o no.',
  },
  {
    num:   '02',
    label: 'Build',
    body:  'Primera versión operativa en 2–4 semanas. Trabajo iterativo con tu equipo.',
  },
  {
    num:   '03',
    label: 'Iteración mensual',
    body:  'Mejoras continuas, soporte directo y tranquilidad de tener un responsable técnico único.',
  },
];

export default function ServiciosProceso({ wa }: Props) {
  const ref           = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section
      className="s-snap-section"
      style={{
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'center',
        padding:       'clamp(1.5rem,4vw,3.5rem) clamp(1.5rem,5vw,5rem)',
        background:    'var(--s-bg)',
        overflow:      'hidden',
      }}
    >
      <SectionBlob size="50vw" bottom="-20%" right="-10%" opacity={0.65} />

      <div
        ref={ref}
        style={{
          position:  'relative',
          zIndex:     1,
          opacity:   show ? 1 : 0,
          transform: show ? 'none' : 'translateY(24px)',
          transition:'opacity 0.7s var(--s-ease), transform 0.7s var(--s-ease)',
          display:   'flex',
          flexDirection:'column',
          gap:       'clamp(2rem,4vw,3.5rem)',
        }}
      >
        {/* Headline */}
        <div style={{ maxWidth:640 }}>
          <h2
            style={{
              fontFamily:   'Nohemi, sans-serif',
              fontSize:     'clamp(2rem,4.5vw,4.25rem)',
              fontWeight:   600,
              letterSpacing:'-0.03em',
              lineHeight:    1.0,
              color:        'var(--s-ink)',
              margin:       '0 0 0.75rem',
            }}
          >
            Un retainer, no un proyecto.
          </h2>
          <p
            style={{
              fontFamily:'Safiro, sans-serif',
              fontSize:  'clamp(1rem,1.3vw,1.1rem)',
              lineHeight: 1.55,
              color:     'var(--s-ink-2)',
              margin:     0,
            }}
          >
            Te montas un equipo técnico externo por menos de lo que cuesta
            contratar a un junior.
          </p>
        </div>

        {/* Steps */}
        <div
          className="proceso-steps"
          style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'clamp(1rem,3vw,3rem)' }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              style={{
                opacity:   show ? 1 : 0,
                transform: show ? 'none' : 'translateY(20px)',
                transition:`opacity 0.65s ${0.1 + i * 0.12}s var(--s-ease), transform 0.65s ${0.1 + i * 0.12}s var(--s-ease)`,
                display:  'flex',
                flexDirection:'column',
                gap:      '0.75rem',
                paddingTop:'1.5rem',
                borderTop:'1px solid var(--s-line)',
              }}
            >
              <span
                style={{
                  fontFamily:   'Nohemi, sans-serif',
                  fontSize:     'clamp(2rem,3.5vw,3rem)',
                  fontWeight:   600,
                  letterSpacing:'-0.04em',
                  lineHeight:    1,
                  color:        'var(--s-ink-3)',
                }}
              >
                {s.num}
              </span>
              <strong
                style={{
                  fontFamily:   'Nohemi, sans-serif',
                  fontSize:     'clamp(1rem,1.4vw,1.2rem)',
                  fontWeight:   600,
                  letterSpacing:'-0.02em',
                  color:        'var(--s-ink)',
                }}
              >
                {s.label}
              </strong>
              <p
                style={{
                  fontFamily:'Safiro, sans-serif',
                  fontSize:  '0.9rem',
                  lineHeight: 1.6,
                  color:     'var(--s-ink-2)',
                  margin:     0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div
          style={{
            borderTop: '1px solid var(--s-line)',
            paddingTop:'clamp(1.5rem,3vw,2.5rem)',
            display:   'flex',
            alignItems:'center',
            gap:       'clamp(2rem,5vw,6rem)',
            flexWrap:  'wrap',
          }}
        >
          <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
            <span
              style={{
                fontFamily:   'Nohemi, sans-serif',
                fontSize:     'clamp(1.4rem,2.5vw,2.2rem)',
                fontWeight:   600,
                letterSpacing:'-0.03em',
                lineHeight:    1.1,
                color:        'var(--s-ink)',
              }}
            >
              Retainer mensual.
              <br />Sin permanencia.
            </span>
            <span
              style={{
                fontFamily:'Safiro, sans-serif',
                fontSize:  '0.88rem',
                lineHeight: 1.6,
                color:     'var(--s-ink-3)',
              }}
            >
              Empieza con lo que necesitas. Escala cuando funcione.
            </span>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                display:       'inline-block',
                fontFamily:    'Safiro, sans-serif',
                fontSize:      '0.95rem',
                fontWeight:    500,
                letterSpacing: '-0.01em',
                color:         '#FFFFFF',
                background:    ctaHovered ? '#1E2B3C' : '#0B0F14',
                padding:       '13px 26px',
                borderRadius:  9999,
                textDecoration:'none',
                transition:    'background 0.2s ease',
              }}
            >
              Diagnóstico gratuito por WhatsApp →
            </a>
            <span
              style={{
                fontFamily:'Safiro, sans-serif',
                fontSize:  '0.78rem',
                color:     'var(--s-ink-3)',
              }}
            >
              Te respondo en menos de 24 h. Siempre yo.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .proceso-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
