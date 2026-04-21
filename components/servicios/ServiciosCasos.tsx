'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const CASES = [
  {
    id:      'soccer',
    client:  'Soccer Manager',
    title:   'Gestión de pedidos para 4 clubs. Sin llamadas, sin Excel perdidos.',
    body:    'Centralicé pedidos de material deportivo, cobros y entregas para cuatro equipos. Panel con historial completo y estados en tiempo real. Antes: todo por WhatsApp.',
    tags:    ['Next.js', 'Supabase', 'Vercel'],
    metric:  '2 temporadas en producción',
    img:     '/screenshots/soccermanager1.png',
    imgAlt:  'Panel de gestión de pedidos de Soccer Manager',
    bg:      '#E8EFF7',
    device:  'desktop',
    reverse: false,
  },
  {
    id:      'futsal',
    client:  'Torrenueva Futsal',
    title:   'Los socios consultan su saldo sin llamar al tesorero.',
    body:    'PWA instalable en móvil. Cada miembro ve su estado de pagos, sanciones e historial en tiempo real. El tesorero dejó de gestionar 50 consultas manuales al mes.',
    tags:    ['JavaScript', 'PWA', 'GitHub Pages'],
    metric:  '50+ jugadores activos',
    img:     '/screenshots/torrenuevafutsal1.png',
    imgAlt:  'PWA de Torrenueva Futsal mostrando estado de pagos',
    bg:      '#EBF0E8',
    device:  'mobile',
    reverse: true,
  },
];

function CaseRow({ c, delay }: { c: typeof CASES[0]; delay: number }) {
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

  const textCol = (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.9rem', justifyContent:'center' }}>
      <span
        style={{
          fontFamily:   'Nohemi, sans-serif',
          fontSize:     '0.7rem',
          fontWeight:   600,
          color:        'var(--s-ink-3)',
          letterSpacing:'0.04em',
          textTransform:'uppercase',
        }}
      >
        {c.client}
      </span>

      <h3
        style={{
          fontFamily:   'Nohemi, sans-serif',
          fontSize:     'clamp(1.2rem,1.8vw,1.75rem)',
          fontWeight:   600,
          letterSpacing:'-0.025em',
          lineHeight:    1.1,
          color:        'var(--s-ink)',
          margin:        0,
        }}
      >
        {c.title}
      </h3>

      <p
        style={{
          fontFamily:'Safiro, sans-serif',
          fontSize:  'clamp(0.85rem,1vw,0.95rem)',
          lineHeight: 1.65,
          color:     'var(--s-ink-2)',
          margin:     0,
        }}
      >
        {c.body}
      </p>

      {/* Tags */}
      <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
        {c.tags.map(t => (
          <span
            key={t}
            style={{
              fontFamily:   'Martian Mono, monospace',
              fontSize:     '0.62rem',
              padding:      '4px 10px',
              borderRadius:  9999,
              border:       '1px solid var(--s-line)',
              color:        'var(--s-ink-2)',
            }}
          >
            {t}
          </span>
        ))}
        {/* Metric pill */}
        <span
          style={{
            fontFamily:   'Martian Mono, monospace',
            fontSize:     '0.62rem',
            padding:      '4px 10px',
            borderRadius:  9999,
            background:   'var(--s-accent-soft)',
            color:        '#0B6B62',
          }}
        >
          {c.metric}
        </span>
      </div>
    </div>
  );

  const imgCol = (
    <div
      style={{
        background:   c.bg,
        borderRadius: 20,
        overflow:     'hidden',
        position:     'relative',
        height:       '100%',
        minHeight:    180,
        display:      'flex',
        alignItems:   'center',
        justifyContent:'center',
        padding:      c.device === 'mobile' ? '1.5rem 2.5rem 0' : '0',
      }}
    >
      <Image
        src={c.img}
        alt={c.imgAlt}
        fill={c.device === 'desktop'}
        width={c.device === 'mobile' ? 200 : undefined}
        height={c.device === 'mobile' ? 360 : undefined}
        style={{
          objectFit:     c.device === 'desktop' ? 'cover' : 'contain',
          objectPosition:'top',
        }}
        loading="lazy"
      />
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        display:       'grid',
        gridTemplateColumns: c.reverse ? '55fr 45fr' : '45fr 55fr',
        gap:           'clamp(1.5rem,3vw,3rem)',
        alignItems:    'center',
        opacity:       show ? 1 : 0,
        transform:     show ? 'none' : 'translateY(20px)',
        transition:    `opacity 0.7s ${delay}s var(--s-ease), transform 0.7s ${delay}s var(--s-ease)`,
      }}
    >
      {c.reverse ? (
        <>
          <div style={{ height:'100%' }}>{imgCol}</div>
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          <div style={{ height:'100%' }}>{imgCol}</div>
        </>
      )}
    </div>
  );
}

export default function ServiciosCasos() {
  return (
    <section
      className="s-snap-section"
      style={{
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'center',
        gap:           'clamp(1.5rem,3vw,2.5rem)',
        padding:       'clamp(1.5rem,4vw,3rem) clamp(1.5rem,5vw,5rem)',
        background:    'var(--s-bg)',
      }}
    >
      {CASES.map((c, i) => (
        <CaseRow key={c.id} c={c} delay={i * 0.12} />
      ))}

      {/* TODO: solicitar testimonio a Soccer Manager y Torrenueva Futsal */}

      <style>{`
        @media (max-width: 768px) {
          .caso-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
