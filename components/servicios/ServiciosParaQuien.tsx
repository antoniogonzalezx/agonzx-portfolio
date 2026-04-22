'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
 * ServiciosParaQuien — Interactive diagnostic
 * Step 0 · Pick industry   Step 1 · Mark pain points   Step 2 · Tailored proposal
 * ───────────────────────────────────────────────────────────────── */

interface Props { wa: string; }

type Industry = {
  id:        string;
  name:      string;
  pains:     string[];
  proposal:  { headline: string; deliverables: string[] };
};

const INDUSTRIES: Industry[] = [
  {
    id:   'clinicas',
    name: 'Clínicas y consultas',
    pains: [
      'Cito por WhatsApp y recuerdo a los pacientes a mano.',
      'La ficha del paciente vive en papel o en un Word.',
      'Los cobros y tickets no quedan registrados digitalmente.',
      'Los pacientes repiten sus datos en cada visita.',
    ],
    proposal: {
      headline: 'Panel de citas + ficha digital, todo conectado a WhatsApp.',
      deliverables: [
        'Agenda compartida con recordatorios automáticos',
        'Ficha del paciente con historial y documentos',
        'Cobros trazados, con ticket y factura al momento',
      ],
    },
  },
  {
    id:   'clubs',
    name: 'Clubs y asociaciones deportivas',
    pains: [
      'Las cuotas y multas las llevo en un Excel.',
      'Convoco entrenos y partidos por grupos de WhatsApp.',
      'Las inscripciones se apuntan en papel o Google Forms.',
      'No tengo histórico de jugadores, equipos ni resultados.',
    ],
    proposal: {
      headline: 'Portal del socio con cuotas, convocatorias y calendario.',
      deliverables: [
        'Cobro recurrente de cuotas, sin perseguir pagos',
        'Convocatorias y confirmaciones centralizadas',
        'Histórico de jugadores, temporadas y resultados',
      ],
    },
  },
  {
    id:   'retail',
    name: 'Tiendas y e-commerce',
    pains: [
      'El stock de la tienda y la web van desincronizados.',
      'Los pedidos llegan por email, WhatsApp e Instagram.',
      'Las facturas las genero a mano o con plantillas.',
      'Los proveedores viven en hojas sueltas y emails.',
    ],
    proposal: {
      headline: 'Hub unificado de pedidos, stock y facturación.',
      deliverables: [
        'Inventario sincronizado entre canales en tiempo real',
        'Bandeja única de pedidos (web, RRSS, mensajería)',
        'Facturación y albaranes generados automáticamente',
      ],
    },
  },
  {
    id:   'agencias',
    name: 'Agencias y estudios',
    pains: [
      'El onboarding de cliente se hace por email, uno a uno.',
      'No tengo un dashboard propio para que el cliente vea avances.',
      'Las horas y proyectos los llevo en Excel o Notion suelto.',
      'Los entregables se reparten entre Drive, Dropbox y WeTransfer.',
    ],
    proposal: {
      headline: 'Portal del cliente con entregables y tracking de horas.',
      deliverables: [
        'Onboarding guiado y repetible por proyecto',
        'Dashboard de avances y entregables para el cliente',
        'Registro de horas por proyecto, exportable a factura',
      ],
    },
  },
  {
    id:   'inmo',
    name: 'Inmobiliarias y gestorías',
    pains: [
      'Los leads se reparten entre CRM, email y WhatsApp.',
      'La documentación está en carpetas dispersas.',
      'La firma de contratos sigue siendo presencial.',
      'No hay portal para que el cliente consulte su expediente.',
    ],
    proposal: {
      headline: 'CRM propio con gestión documental y firma digital.',
      deliverables: [
        'Pipeline de leads con trazabilidad completa',
        'Expediente digital y firma remota con validez legal',
        'Portal del cliente para consultar documentos y estado',
      ],
    },
  },
  {
    id:   'horeca',
    name: 'Hostelería y restauración',
    pains: [
      'Las reservas llegan por teléfono, Instagram y Google.',
      'Los pedidos a proveedor se piden por WhatsApp.',
      'Los turnos del equipo se cuadran en papel.',
      'Cambiar una carta o un precio tarda días en llegar a sala.',
    ],
    proposal: {
      headline: 'Reservas centralizadas + pedidos y carta dinámica.',
      deliverables: [
        'Bandeja única de reservas (web, Google, RRSS)',
        'Pedidos a proveedor con histórico y recordatorios',
        'Carta digital actualizable al momento por el equipo',
      ],
    },
  },
];

/* ──────────────────────────── Icons ──────────────────────────── */

function IconArrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function IconCheck({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ──────────────────────── Component ──────────────────────── */

export default function ServiciosParaQuien({ wa }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const [show, setShow]                 = useState(false);
  const [step, setStep]                 = useState<0 | 1 | 2>(0);
  const [industryId, setIndustryId]     = useState<string | null>(null);
  const [selectedPains, setSelectedPains] = useState<Set<number>>(new Set());

  const industry = useMemo(
    () => INDUSTRIES.find(i => i.id === industryId) ?? null,
    [industryId],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pickIndustry = (id: string) => {
    setIndustryId(id);
    setSelectedPains(new Set());
    setStep(1);
  };

  const togglePain = (i: number) => {
    setSelectedPains(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const restart = () => {
    setStep(0);
    setIndustryId(null);
    setSelectedPains(new Set());
  };

  const stepLabel =
    step === 0 ? 'Cuéntame a qué te dedicas.'
  : step === 1 ? 'Señala lo que te suena familiar.'
               : 'Esto es lo que montaría para ti.';

  return (
    <section
      data-servicios-section="para-quien"
      className="s-snap-section s-pq"
      style={{
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        'clamp(1.5rem,4vw,3.5rem) clamp(1.5rem,5vw,5rem)',
        background:     'var(--s-bg)',
        overflow:       'hidden',
      }}
    >
      <div
        ref={sectionRef}
        className="s-pq-grid"
        style={{
          display:             'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
          gap:                 'clamp(2rem,6vw,7rem)',
          alignItems:          'start',
          opacity:              show ? 1 : 0,
          transform:            show ? 'none' : 'translateY(24px)',
          transition:          'opacity 0.7s var(--s-ease), transform 0.7s var(--s-ease)',
        }}
      >
        {/* ── LEFT · editorial headline + progress ── */}
        <div
          className="s-pq-left"
          style={{
            position:       'sticky',
            top:            0,
            display:        'flex',
            flexDirection:  'column',
            gap:            'clamp(1.25rem,2vw,2rem)',
          }}
        >
          <h2
            style={{
              fontFamily:   'Nohemi, sans-serif',
              fontSize:     'clamp(2rem,3.8vw,3.5rem)',
              fontWeight:    600,
              letterSpacing:'-0.03em',
              lineHeight:    1.0,
              color:        'var(--s-ink)',
              margin:        0,
            }}
          >
            Diagnóstico
            <br />
            <span style={{ color:'var(--s-ink-3)' }}>express.</span>
          </h2>

          {/* animated sub-instruction — changes per step */}
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Safiro, sans-serif',
                fontSize:   'clamp(0.95rem,1.1vw,1.05rem)',
                lineHeight:  1.6,
                color:      'var(--s-ink-2)',
                margin:      0,
                maxWidth:    360,
              }}
            >
              {stepLabel}
            </motion.p>
          </AnimatePresence>

          {/* step indicator */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginTop:'0.5rem' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                <div
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    width:           28,
                    height:          28,
                    borderRadius:    9999,
                    fontFamily:     'Martian Mono, monospace',
                    fontSize:        11,
                    fontWeight:      500,
                    color:           i <= step ? 'var(--s-ink)'     : 'var(--s-ink-3)',
                    background:      i === step ? 'var(--s-accent)' : 'transparent',
                    border:          `1px solid ${i <= step ? 'var(--s-ink)' : 'var(--s-line)'}`,
                    transition:     'all 0.35s var(--s-ease)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                {i < 2 && (
                  <div
                    style={{
                      width:       24,
                      height:      1,
                      background: i < step ? 'var(--s-ink)' : 'var(--s-line)',
                      transition:'background 0.35s var(--s-ease)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {step > 0 && (
            <button
              type="button"
              onClick={restart}
              style={{
                alignSelf:      'flex-start',
                marginTop:      '0.25rem',
                padding:         0,
                background:     'none',
                border:         'none',
                cursor:         'pointer',
                fontFamily:     'Safiro, sans-serif',
                fontSize:        13,
                color:          'var(--s-ink-3)',
                letterSpacing:  '-0.01em',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              Empezar de nuevo
            </button>
          )}
        </div>

        {/* ── RIGHT · step content ── */}
        <div style={{ minHeight: 360, position: 'relative' }}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ul
                  className="s-pq-industries"
                  style={{ listStyle:'none', margin:0, padding:0, display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}
                >
                  {INDUSTRIES.map((it, i) => (
                    <li
                      key={it.id}
                      style={{
                        borderTop:    '1px solid var(--s-line)',
                        borderBottom: i >= INDUSTRIES.length - 2 ? '1px solid var(--s-line)' : undefined,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => pickIndustry(it.id)}
                        className="s-pq-row"
                        style={{
                          display:        'flex',
                          alignItems:     'center',
                          justifyContent: 'space-between',
                          gap:             '1rem',
                          width:           '100%',
                          padding:         'clamp(1rem,1.5vw,1.4rem) clamp(0.6rem,1.2vw,1.2rem)',
                          background:     'none',
                          border:         'none',
                          cursor:         'pointer',
                          textAlign:      'left',
                          fontFamily:     'Nohemi, sans-serif',
                          fontSize:       'clamp(0.95rem,1.15vw,1.1rem)',
                          fontWeight:      500,
                          letterSpacing:  '-0.015em',
                          color:          'var(--s-ink)',
                          transition:     'background 0.3s var(--s-ease), padding 0.3s var(--s-ease)',
                        }}
                      >
                        <span>{it.name}</span>
                        <span className="s-pq-arrow" aria-hidden>
                          <IconArrow />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {step === 1 && industry && (
              <motion.div
                key={`step-1-${industry.id}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}
              >
                <div
                  style={{
                    fontFamily:   'Nohemi, sans-serif',
                    fontSize:      13,
                    letterSpacing:'-0.01em',
                    color:        'var(--s-ink-3)',
                  }}
                >
                  Sector seleccionado · <span style={{ color:'var(--s-ink)' }}>{industry.name}</span>
                </div>

                <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column' }}>
                  {industry.pains.map((p, i) => {
                    const on = selectedPains.has(i);
                    return (
                      <li key={i} style={{ borderTop: '1px solid var(--s-line)' }}>
                        <button
                          type="button"
                          onClick={() => togglePain(i)}
                          className="s-pq-pain"
                          aria-pressed={on}
                          style={{
                            display:        'flex',
                            alignItems:     'center',
                            gap:             '1rem',
                            width:           '100%',
                            padding:         '1rem 0.4rem',
                            background:     'none',
                            border:         'none',
                            cursor:         'pointer',
                            textAlign:      'left',
                            transition:    'background 0.3s var(--s-ease)',
                          }}
                        >
                          {/* checkbox */}
                          <span
                            aria-hidden
                            style={{
                              flexShrink:      0,
                              display:        'flex',
                              alignItems:     'center',
                              justifyContent: 'center',
                              width:           22,
                              height:          22,
                              borderRadius:    6,
                              background:      on ? 'var(--s-accent)' : 'transparent',
                              border:          `1.5px solid ${on ? 'var(--s-ink)' : 'var(--s-line)'}`,
                              color:           'var(--s-ink)',
                              transition:     'background 0.25s var(--s-ease), border-color 0.25s var(--s-ease)',
                            }}
                          >
                            {on && <IconCheck />}
                          </span>
                          <span
                            style={{
                              fontFamily:   'Safiro, sans-serif',
                              fontSize:     'clamp(0.95rem,1.1vw,1.02rem)',
                              lineHeight:    1.5,
                              color:         on ? 'var(--s-ink)' : 'var(--s-ink-2)',
                              letterSpacing:'-0.01em',
                              transition:   'color 0.25s var(--s-ease)',
                            }}
                          >
                            {p}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                  <li style={{ borderTop: '1px solid var(--s-line)' }} />
                </ul>

                <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', alignItems:'center', paddingTop:'0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={selectedPains.size === 0}
                    style={{
                      fontFamily:    'Safiro, sans-serif',
                      fontSize:       14,
                      fontWeight:     500,
                      letterSpacing: '-0.01em',
                      color:         selectedPains.size === 0 ? 'var(--s-ink-3)' : '#FFFFFF',
                      background:    selectedPains.size === 0 ? 'rgba(11,15,20,0.08)' : 'var(--s-ink)',
                      padding:       '12px 22px',
                      borderRadius:   9999,
                      border:        `1px solid ${selectedPains.size === 0 ? 'transparent' : 'var(--s-ink)'}`,
                      cursor:        selectedPains.size === 0 ? 'not-allowed' : 'pointer',
                      transition:   'background 0.25s var(--s-ease), color 0.25s var(--s-ease)',
                    }}
                  >
                    Ver mi propuesta {selectedPains.size > 0 && <span style={{ opacity: 0.7, marginLeft: 6 }}>({selectedPains.size})</span>}
                  </button>
                  <span style={{ fontFamily:'Safiro, sans-serif', fontSize:13, color:'var(--s-ink-3)' }}>
                    Puedes marcar las que quieras.
                  </span>
                </div>
              </motion.div>
            )}

            {step === 2 && industry && (
              <motion.div
                key={`step-2-${industry.id}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}
              >
                <div
                  style={{
                    fontFamily:   'Nohemi, sans-serif',
                    fontSize:      13,
                    letterSpacing:'-0.01em',
                    color:        'var(--s-ink-3)',
                  }}
                >
                  Para {industry.name} · {selectedPains.size} {selectedPains.size === 1 ? 'proceso detectado' : 'procesos detectados'}
                </div>

                <h3
                  style={{
                    fontFamily:   'Nohemi, sans-serif',
                    fontSize:     'clamp(1.5rem,2.3vw,2.1rem)',
                    fontWeight:    600,
                    letterSpacing:'-0.025em',
                    lineHeight:    1.1,
                    color:        'var(--s-ink)',
                    margin:        0,
                  }}
                >
                  {industry.proposal.headline}
                </h3>

                <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                  {industry.proposal.deliverables.map((d, i) => (
                    <li
                      key={i}
                      style={{
                        display:     'flex',
                        alignItems:  'flex-start',
                        gap:          '0.85rem',
                        padding:      '0.6rem 0',
                        borderTop:    i === 0 ? '1px solid var(--s-line)' : undefined,
                        borderBottom: '1px solid var(--s-line)',
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          flexShrink:      0,
                          marginTop:        4,
                          display:        'inline-flex',
                          alignItems:     'center',
                          justifyContent: 'center',
                          width:           20,
                          height:          20,
                          borderRadius:    9999,
                          background:     'var(--s-accent)',
                          color:          'var(--s-ink)',
                        }}
                      >
                        <IconCheck size={12} />
                      </span>
                      <span
                        style={{
                          fontFamily:   'Safiro, sans-serif',
                          fontSize:     'clamp(0.95rem,1.1vw,1.02rem)',
                          lineHeight:    1.5,
                          color:        'var(--s-ink)',
                          letterSpacing:'-0.01em',
                        }}
                      >
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>

                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem', paddingTop:'0.5rem' }}>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:       'inline-flex',
                      alignItems:    'center',
                      gap:            8,
                      fontFamily:    'Safiro, sans-serif',
                      fontSize:       14,
                      fontWeight:     500,
                      letterSpacing: '-0.01em',
                      color:          '#FFFFFF',
                      background:    'var(--s-ink)',
                      padding:       '12px 22px',
                      borderRadius:   9999,
                      textDecoration:'none',
                      border:        '1px solid var(--s-ink)',
                    }}
                  >
                    Hablemos por WhatsApp <IconArrow size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={restart}
                    style={{
                      fontFamily:    'Safiro, sans-serif',
                      fontSize:       14,
                      fontWeight:     500,
                      letterSpacing: '-0.01em',
                      color:         'var(--s-ink)',
                      background:    'transparent',
                      padding:       '12px 22px',
                      borderRadius:   9999,
                      border:        '1px solid rgba(11,15,20,0.12)',
                      cursor:        'pointer',
                    }}
                  >
                    Probar otro sector
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
