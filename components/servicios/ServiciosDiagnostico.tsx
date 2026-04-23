'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
 * ServiciosDiagnostico — Diagnóstico express en 3 pasos
 * 1 · Sector   2 · Dolores   3 · Propuesta a medida + CTA
 * ───────────────────────────────────────────────────────────────── */

interface Props { wa: string; }

type Industry = {
  id:        string;
  name:      string;
  Icon:      (props: { size?: number }) => JSX.Element;
  pains:     string[];
  proposal:  { headline: string; deliverables: string[] };
};

/* ─────────────────────────── Industry icons ───────────────────────────
 * Quiet line-art glyphs for the sector list. 1.5 stroke, rounded caps.
 * Inherit color from the row (ink-3 default → accent on hover).
 * ─────────────────────────────────────────────────────────────────────── */

const ICON_SVG = {
  width:        24,
  height:       24,
  viewBox:      '0 0 24 24',
  fill:         'none',
  stroke:       'currentColor',
  strokeWidth:  1.5,
  strokeLinecap:  'round' as const,
  strokeLinejoin: 'round' as const,
};

function IconClinicas({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...ICON_SVG} aria-hidden>
      <path d="M5 3v2" />
      <path d="M11 3v2" />
      <path d="M5 5c0 5 1 7 3.5 7.5" />
      <path d="M11 5c0 5-1 7-3.5 7.5" />
      <path d="M14 4v6a4 4 0 0 0 4 4" />
      <circle cx="18" cy="17" r="2.5" />
    </svg>
  );
}

function IconClubs({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...ICON_SVG} aria-hidden>
      <path d="M3 11h11a4 4 0 0 1 0 8H3z" />
      <path d="M7 8.5v2.5" />
      <circle cx="7" cy="7.5" r="1.2" />
    </svg>
  );
}

function IconRetail({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...ICON_SVG} aria-hidden>
      <path d="M3 13 12 4h7a1.5 1.5 0 0 1 1.5 1.5V13l-9 8z" />
      <circle cx="16" cy="8" r="1.5" />
    </svg>
  );
}

function IconGestorias({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...ICON_SVG} aria-hidden>
      <path d="M3 7h6l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
      <circle cx="14" cy="15" r="2.4" />
    </svg>
  );
}

function IconInmo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...ICON_SVG} aria-hidden>
      <circle cx="6.5" cy="12" r="3.5" />
      <path d="M10 12h11" />
      <path d="M18 12v3" />
      <path d="M15 12v2.2" />
    </svg>
  );
}

function IconHoreca({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} {...ICON_SVG} aria-hidden>
      <path d="M7 3h10l-1 5a4 4 0 0 1-8 0z" />
      <path d="M12 12v7" />
      <path d="M8.5 19h7" />
    </svg>
  );
}

const INDUSTRIES: Industry[] = [
  {
    id:   'clinicas',
    name: 'Clínicas y consultas',
    Icon: IconClinicas,
    pains: [
      'Cito por WhatsApp y recuerdo a los pacientes a mano.',
      'La ficha del paciente vive en papel o en un Word.',
      'Los cobros y tickets no quedan registrados digitalmente.',
      'Los pacientes repiten sus datos en cada visita.',
    ],
    proposal: {
      headline: 'Panel de citas y ficha digital, todo conectado a WhatsApp.',
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
    Icon: IconClubs,
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
    Icon: IconRetail,
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
    id:   'gestorias',
    name: 'Gestorías y asesorías',
    Icon: IconGestorias,
    pains: [
      'Pido documentación al cliente por email, una y otra vez.',
      'Los expedientes viven entre Drive, Dropbox y carpetas locales.',
      'No hay portal donde el cliente vea el estado de sus trámites.',
      'Las facturas y vencimientos los persigo a mano.',
    ],
    proposal: {
      headline: 'Portal del cliente con expediente, documentos y trámites.',
      deliverables: [
        'Subida de documentación guiada por el propio cliente',
        'Expediente único con estado y fechas clave',
        'Facturación recurrente con avisos de vencimiento',
      ],
    },
  },
  {
    id:   'inmo',
    name: 'Inmobiliarias',
    Icon: IconInmo,
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
    Icon: IconHoreca,
    pains: [
      'Las reservas llegan por teléfono, Instagram y Google.',
      'Los pedidos a proveedor se piden por WhatsApp.',
      'Los turnos del equipo se cuadran en papel.',
      'Cambiar una carta o un precio tarda días en llegar a sala.',
    ],
    proposal: {
      headline: 'Reservas centralizadas y carta dinámica para sala.',
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

export default function ServiciosDiagnostico({ wa }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const [show, setShow]                   = useState(false);
  const [started, setStarted]             = useState(false);
  const [step, setStep]                   = useState<0 | 1 | 2>(0);
  const [industryId, setIndustryId]       = useState<string | null>(null);
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
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const restart = () => {
    setStep(0);
    setIndustryId(null);
    setSelectedPains(new Set());
  };

  const closePoster = () => {
    setStarted(false);
    setStep(0);
    setIndustryId(null);
    setSelectedPains(new Set());
  };

  const stepLabel =
    step === 0 ? 'Cuéntame a qué te dedicas.'
  : step === 1 ? 'Señala lo que te suena familiar.'
               : 'Esto es lo que montaría para ti.';

  /* WhatsApp URL — composes the message contextually when reaching step 2 */
  const waHref = useMemo(() => {
    if (step !== 2 || !industry) return wa;
    const checked = Array.from(selectedPains).map(i => `• ${industry.pains[i]}`).join('\n');
    const body = `Hola Antonio. Tengo ${industry.name.toLowerCase()} y me interesa: ${industry.proposal.headline}\n\nLo que me suena familiar:\n${checked}`;
    return `${wa}?text=${encodeURIComponent(body)}`;
  }, [wa, step, industry, selectedPains]);

  return (
    <section
      data-servicios-section="diagnostico"
      className="s-snap-section s-diag"
      style={{
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        'clamp(1.5rem,4vw,3.5rem) clamp(1.5rem,5vw,5rem)',
        background:     'var(--s-bg)',
        overflow:       'hidden',
        position:       'relative',
      }}
    >
      <div ref={sectionRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }} aria-hidden />

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="poster"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              textAlign:      'center',
              gap:            'clamp(1.25rem,2.5vw,2rem)',
              padding:        'clamp(2rem,5vw,4rem) 0',
              maxWidth:        780,
              margin:         '0 auto',
            }}
          >
            <span
              style={{
                fontFamily:    'Safiro, sans-serif',
                fontSize:       13,
                letterSpacing: '-0.01em',
                color:         'var(--s-ink-3)',
              }}
            >
              Diagnóstico express · 60 segundos
            </span>

            <h2
              style={{
                fontFamily:   'Nohemi, sans-serif',
                fontSize:     'clamp(2.4rem,6vw,5.5rem)',
                fontWeight:    600,
                letterSpacing:'-0.04em',
                lineHeight:    0.95,
                color:        'var(--s-ink)',
                margin:        0,
              }}
            >
              Diagnóstico.
              <br />
              <span style={{ color:'var(--s-ink-3)', fontWeight: 400 }}>Tres preguntas.</span>
              <br />
              Una propuesta concreta.
            </h2>

            <p
              style={{
                fontFamily:   'Safiro, sans-serif',
                fontSize:     'clamp(1rem,1.2vw,1.1rem)',
                lineHeight:    1.55,
                color:        'var(--s-ink-2)',
                margin:        0,
                maxWidth:      520,
                letterSpacing:'-0.005em',
              }}
            >
              Cuéntame a qué te dedicas y qué te suena familiar. Te devuelvo qué montaría para ti, sin compromiso.
            </p>

            <button
              type="button"
              onClick={() => setStarted(true)}
              className="s-cta-primary"
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:            10,
                marginTop:     '0.5rem',
                fontFamily:    'Safiro, sans-serif',
                fontSize:       15,
                fontWeight:     500,
                letterSpacing: '-0.01em',
                color:          '#FFFFFF',
                padding:       '16px 32px',
                borderRadius:   9999,
                cursor:        'pointer',
              }}
            >
              Empezar
              <IconArrow size={16} />
            </button>
          </motion.div>
        ) : (
      <motion.div
        key="wizard"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display:             'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
          gap:                 'clamp(2rem,6vw,7rem)',
          alignItems:          'start',
        }}
      >
        {/* ── LEFT · headline + step indicator ── */}
        <div
          className="s-diag-left"
          style={{
            position:       'sticky',
            top:             0,
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
                    fontFamily:     'Nohemi, sans-serif',
                    fontSize:        12,
                    fontWeight:      500,
                    color:           i === step ? 'var(--s-accent)' : (i < step ? 'var(--s-ink)' : 'var(--s-ink-3)'),
                    background:      i === step ? 'var(--s-accent-soft)' : 'transparent',
                    border:          `1px solid ${i === step ? 'var(--s-accent)' : (i < step ? 'var(--s-ink)' : 'var(--s-line)')}`,
                    transition:     'all 0.35s var(--s-ease)',
                  }}
                >
                  {i + 1}
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

          <div style={{ display:'flex', gap:'1.25rem', marginTop:'0.25rem' }}>
            <button
              type="button"
              onClick={closePoster}
              style={{
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
              ← Cerrar
            </button>
            {step > 0 && (
              <button
                type="button"
                onClick={restart}
                style={{
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
                  className="s-diag-industries"
                  style={{ listStyle:'none', margin:0, padding:0, display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}
                >
                  {INDUSTRIES.map((it, i) => {
                    const Icon = it.Icon;
                    return (
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
                        className="s-diag-row"
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
                        <span style={{ display:'flex', alignItems:'center', gap:'0.85rem' }}>
                          <span className="s-diag-row-icon" style={{ color:'var(--s-ink-3)', display:'flex', transition:'color 0.3s var(--s-ease), transform 0.3s var(--s-ease)' }}>
                            <Icon />
                          </span>
                          <span>{it.name}</span>
                        </span>
                        <span className="s-diag-arrow" aria-hidden>
                          <IconArrow />
                        </span>
                      </button>
                    </li>
                    );
                  })}
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
                          className="s-diag-pain"
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
                              border:          `1.5px solid ${on ? 'var(--s-accent)' : 'var(--s-line)'}`,
                              color:           '#FFFFFF',
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
                          color:          '#FFFFFF',
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
                    href={waHref}
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
      </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .s-diag-row:hover { background: rgba(35,51,92,0.03); padding-left: 1.4rem !important; }
        .s-diag-row:hover .s-diag-arrow { transform: translateX(4px); }
        .s-diag-row:hover .s-diag-row-icon { color: var(--s-accent); transform: scale(1.05); }
        .s-diag-arrow { transition: transform 0.3s var(--s-ease); }
        .s-diag-pain:hover { background: rgba(11,15,20,0.02); }

        @media (max-width: 768px) {
          .s-diag-grid { grid-template-columns: 1fr !important; gap: clamp(1.5rem, 4vw, 2.5rem) !important; }
          .s-diag-left { position: static !important; }
          .s-diag-industries { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
