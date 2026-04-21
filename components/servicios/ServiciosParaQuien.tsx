'use client';

import { useRef, useEffect, useState } from 'react';

const PROFILES = [
  {
    industry: 'Clínicas y consultas',
    pain:     'Citas por WhatsApp, recordatorios manuales, ficha del paciente en papel.',
  },
  {
    industry: 'Clubs y asociaciones deportivas',
    pain:     'Cuotas y multas en Excel, convocatorias por grupo de WhatsApp.',
  },
  {
    industry: 'Tiendas y e-commerce',
    pain:     'Pedidos, stock y entregas coordinados entre correo y hoja de cálculo.',
  },
  {
    industry: 'Agencias y estudios',
    pain:     'Onboarding de clientes y seguimiento de proyectos sin sistema propio.',
  },
  {
    industry: 'Inmobiliarias y gestorías',
    pain:     'Seguimiento de leads y documentación repartidos entre varios programas.',
  },
  {
    industry: 'Hostelería y restauración',
    pain:     'Reservas, pedidos a proveedor y turnos gestionados sin integración.',
  },
];

export default function ServiciosParaQuien() {
  const ref            = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
      <div
        ref={ref}
        style={{
          display:   'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:       'clamp(2rem,6vw,8rem)',
          alignItems:'start',
          position:  'relative',
          zIndex:     1,
          opacity:   show ? 1 : 0,
          transform: show ? 'none' : 'translateY(24px)',
          transition:'opacity 0.7s var(--s-ease), transform 0.7s var(--s-ease)',
        }}
      >
        {/* Left — editorial headline */}
        <div style={{ display:'flex', flexDirection:'column', gap:'clamp(1rem,2vw,1.75rem)', position:'sticky', top:0 }}>
          <h2
            style={{
              fontFamily:   'Nohemi, sans-serif',
              fontSize:     'clamp(2.2rem,4vw,3.8rem)',
              fontWeight:   600,
              letterSpacing:'-0.03em',
              lineHeight:    1.0,
              color:        'var(--s-ink)',
              margin:        0,
            }}
          >
            Tu empresa ha crecido.
            <br />
            <span style={{ color:'var(--s-ink-3)' }}>¿Ha crecido tu software?</span>
          </h2>
          <p
            style={{
              fontFamily:'Safiro, sans-serif',
              fontSize:  'clamp(0.95rem,1.2vw,1.05rem)',
              lineHeight: 1.65,
              color:     'var(--s-ink-2)',
              margin:     0,
              maxWidth:   420,
            }}
          >
            Trabajo con PYMES que ya tienen tracción y quieren dejar de hacer
            las cosas a mano. Si te reconoces en alguna de estas situaciones,
            podemos hablar.
          </p>
        </div>

        {/* Right — profile list */}
        <div style={{ display:'flex', flexDirection:'column' }}>
          {PROFILES.map((p, i) => (
            <div
              key={p.industry}
              style={{
                paddingTop:   'clamp(1rem,1.5vw,1.5rem)',
                paddingBottom:'clamp(1rem,1.5vw,1.5rem)',
                borderTop:    '1px solid var(--s-line)',
                display:      'flex',
                flexDirection:'column',
                gap:          '0.35rem',
                opacity:      show ? 1 : 0,
                transform:    show ? 'none' : 'translateY(16px)',
                transition:   `opacity 0.55s ${0.08 + i * 0.07}s var(--s-ease), transform 0.55s ${0.08 + i * 0.07}s var(--s-ease)`,
              }}
            >
              <span
                style={{
                  fontFamily:   'Nohemi, sans-serif',
                  fontSize:     'clamp(0.95rem,1.2vw,1.1rem)',
                  fontWeight:   600,
                  letterSpacing:'-0.015em',
                  color:        'var(--s-ink)',
                }}
              >
                {p.industry}
              </span>
              <span
                style={{
                  fontFamily:'Safiro, sans-serif',
                  fontSize:  'clamp(0.8rem,0.95vw,0.88rem)',
                  lineHeight: 1.55,
                  color:     'var(--s-ink-3)',
                  fontStyle: 'italic',
                }}
              >
                {p.pain}
              </span>
            </div>
          ))}
          {/* Last border */}
          <div style={{ borderTop:'1px solid var(--s-line)' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .s-snap-section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
