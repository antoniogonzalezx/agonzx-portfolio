'use client';

import { useRef, useEffect, useState } from 'react';

const SERVICES = [
  {
    num:   '01',
    title: 'Automatización interna',
    body:  'Tu equipo no debería pelearse con un Excel para fichar ni con un SaaS que no entiende cómo trabajáis. Monto una herramienta propia, cumple la normativa española y la mantengo yo cada mes.',
    items: [
      'Fichaje digital conforme al RD 8/2019',
      'Gestión de vacaciones, bajas y horarios',
      'Panel para gerencia, sin licencias por usuario',
      'Subvencionable vía Kit Digital',
    ],
  },
  {
    num:   '02',
    title: 'Atención al cliente con IA',
    body:  'Chatbot propio integrado en tu web o WhatsApp Business. Responde dudas habituales las 24 h, precualifica consultas y gestiona citas automáticamente. Sin operador para cada mensaje rutinario.',
    items: [
      'Chatbot entrenado con tu negocio concreto',
      'Reservas y citas sin llamada',
      'Integración con tu web y WA Business actual',
      'Sin suscripciones a plataformas genéricas',
    ],
  },
  {
    num:   '03',
    title: 'Herramientas a medida',
    body:  'Ese proceso en papel, en Excel o en WhatsApp. Digitalizado. Si no encaja en ningún software comercial, construyo exactamente lo que necesitas. Nada más.',
    items: [
      'Digitalización de procesos específicos de tu sector',
      'Formularios, aprobaciones y notificaciones',
      'Sin dependencia de terceros tras la entrega',
      'Mantenimiento y mejora continua incluidos',
    ],
  },
];

function ServiceCard({ svc, delay }: { svc: typeof SERVICES[0]; delay: number }) {
  const ref           = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el  = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity:   show ? 1 : 0,
        transform: show ? 'none' : 'translateY(24px)',
        transition:`opacity 0.7s ${delay}s var(--s-ease), transform 0.7s ${delay}s var(--s-ease)`,
        display:   'flex',
        flexDirection:'column',
        gap:       '1.25rem',
        paddingTop:'2rem',
        borderTop: '1px solid var(--s-line)',
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily:   'Nohemi, sans-serif',
          fontSize:     '0.75rem',
          fontWeight:   600,
          color:        'var(--s-ink-3)',
          letterSpacing:'-0.01em',
        }}
      >
        {svc.num}
      </span>

      {/* Title */}
      <h2
        style={{
          fontFamily:   'Nohemi, sans-serif',
          fontSize:     'clamp(1.5rem,2vw,2rem)',
          fontWeight:   600,
          letterSpacing:'-0.025em',
          lineHeight:    1.1,
          color:        'var(--s-ink)',
          margin:        0,
        }}
      >
        {svc.title}
      </h2>

      {/* Body */}
      <p
        style={{
          fontFamily:'Safiro, sans-serif',
          fontSize:  'clamp(0.9rem,1.1vw,1rem)',
          lineHeight: 1.65,
          color:     'var(--s-ink-2)',
          margin:     0,
        }}
      >
        {svc.body}
      </p>

      {/* Items */}
      <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'0.5rem' }}>
        {svc.items.map(item => (
          <li
            key={item}
            style={{
              fontFamily:   'Martian Mono, monospace',
              fontSize:     '0.72rem',
              lineHeight:    1.55,
              color:        'var(--s-ink-2)',
              display:      'flex',
              gap:          '0.5rem',
              alignItems:   'flex-start',
            }}
          >
            <span style={{ color:'var(--s-ink-3)', flexShrink:0 }}>—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiciosGrid() {
  return (
    <section
      id="servicios"
      className="s-snap-section"
      style={{
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'center',
        padding:       'clamp(1.5rem,4vw,3.5rem) clamp(1.5rem,5vw,5rem)',
        background:    'var(--s-bg)',
      }}
    >
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap:                 'clamp(1.5rem,3vw,3rem)',
          position:            'relative',
          zIndex:               1,
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.num} svc={s} delay={i * 0.1} />
        ))}
      </div>

      {/* Mobile: single column */}
      <style>{`
        @media (max-width: 900px) {
          #servicios > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
