'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Check } from '@phosphor-icons/react';
import {
  SolarStethoscope,
  SolarFootball,
  SolarShop,
  SolarFolder,
  SolarBuildings,
  SolarWineGlass,
  type SolarIcon,
} from './SolarIcons';

/* ─────────────────────────────────────────────────────────────────
 * ServiciosDiagnostico — Diagnóstico express
 * Stage CTA · Centered "Elige tu sector"
 * Stage split · sticky rail (Diagnóstico express + stepper) + right
 *   right step 0 · bento de sectores
 *   right step 1 · procesos + nota libre
 *   right thinking · {x} GSAP loop
 *   right step 2 · propuesta + CTA WhatsApp
 * ───────────────────────────────────────────────────────────────── */

interface Props { wa: string; }

type Industry = {
  id:       string;
  name:     string;
  short:    string;
  blurb:    string;
  kickerTarget: string; // e.g. "tu clínica" — used in proposal kicker copy
  Icon:     SolarIcon;
  pains:    string[];
  proposal: { headline: string; deliverables: string[] };
};

const INDUSTRIES: Industry[] = [
  {
    id:    'clinicas',
    name:  'Clínicas y consultas',
    short: 'Clínicas',
    blurb: 'Médicos, dentistas, fisioterapeutas.',
    kickerTarget: 'tu clínica',
    Icon:   SolarStethoscope,
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
    id:    'clubs',
    name:  'Clubs y asociaciones deportivas',
    short: 'Clubs',
    blurb: 'Deportivos y sociales.',
    kickerTarget: 'tu club',
    Icon:   SolarFootball,
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
    id:    'retail',
    name:  'Tiendas y e-commerce',
    short: 'Tiendas',
    blurb: 'Físicas y online.',
    kickerTarget: 'tu tienda',
    Icon:   SolarShop,
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
    id:    'gestorias',
    name:  'Gestorías y asesorías',
    short: 'Gestorías',
    blurb: 'Fiscal y laboral.',
    kickerTarget: 'tu gestoría',
    Icon:   SolarFolder,
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
    id:    'inmo',
    name:  'Inmobiliarias',
    short: 'Inmobiliarias',
    blurb: 'Agencias y promotoras.',
    kickerTarget: 'tu inmobiliaria',
    Icon:   SolarBuildings,
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
    id:    'horeca',
    name:  'Hostelería y restauración',
    short: 'Hostelería',
    blurb: 'Restaurantes, cafés y bares.',
    kickerTarget: 'tu negocio de hostelería',
    Icon:   SolarWineGlass,
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

/* ─── {x} brand mark — same paths as FloatingPill (Nohemi SemiBold) ─── */
const D_OPEN =
  'M8.639 2.367H7.988Q6.958 2.367 6.467 2.923Q5.976 3.479 5.976 4.615V6.379Q5.976 7.024 5.864 7.627Q5.751 8.231 5.482 8.710Q5.213 9.189 4.766 9.506Q4.320 9.822 3.651 9.905Q4.331 9.982 4.778 10.293Q5.225 10.604 5.491 11.083Q5.757 11.562 5.867 12.169Q5.976 12.775 5.976 13.450V15.213Q5.976 16.320 6.470 16.876Q6.964 17.432 7.988 17.432H8.639V20.107H7.438Q4.970 20.107 3.728 18.879Q2.485 17.651 2.485 15.201V13.284Q2.485 12.781 2.396 12.420Q2.308 12.059 2.118 11.825Q1.929 11.592 1.636 11.482Q1.343 11.373 0.935 11.373H0.639V8.426H0.935Q1.349 8.426 1.642 8.320Q1.935 8.213 2.121 7.982Q2.308 7.751 2.396 7.388Q2.485 7.024 2.485 6.515V4.598Q2.485 2.124 3.716 0.908Q4.947 -0.308 7.438 -0.308H8.639Z';
const D_X =
  'M19.083 9.802L23.669 16.423H19.550L16.349 11.547L13.237 16.423H9.343L13.728 9.849L9.391 3.376H13.509L16.467 8.151L19.373 3.376H23.266Z';
const D_CLOSE =
  'M24.267 17.431H24.918Q25.947 17.431 26.438 16.875Q26.929 16.319 26.929 15.183V13.419Q26.929 12.775 27.042 12.171Q27.154 11.567 27.423 11.088Q27.693 10.609 28.139 10.292Q28.586 9.976 29.255 9.893Q28.574 9.816 28.128 9.505Q27.681 9.195 27.415 8.716Q27.148 8.236 27.039 7.630Q26.929 7.023 26.929 6.349V4.586Q26.929 3.479 26.435 2.923Q25.941 2.367 24.918 2.367H24.267V-0.308H25.468Q27.935 -0.308 29.178 0.920Q30.420 2.148 30.420 4.598V6.515Q30.420 7.017 30.509 7.378Q30.598 7.739 30.787 7.973Q30.976 8.207 31.269 8.316Q31.562 8.426 31.970 8.426H32.266V11.372H31.970Q31.556 11.372 31.263 11.479Q30.971 11.585 30.784 11.816Q30.598 12.047 30.509 12.411Q30.420 12.775 30.420 13.283V15.201Q30.420 17.674 29.190 18.890Q27.959 20.105 25.468 20.105H24.267Z';

const THINKING_COPY = [
  'Leyendo tu sector',
  'Analizando tus procesos',
  'Cocinando tu respuesta',
];
const THINKING_DURATION_MS = 12000;
/* Copy switches roughly aligned with the progress-bar bursts (~33 / 67 / 100).
 * Slightly shorter than perfect thirds so each new label lands JUST before
 * its burst, giving the user time to read it while the bar fills.        */
const THINKING_STEPS_MS = [0, 3800, 7600];

/* ──────────────────────── Component ──────────────────────── */

export default function ServiciosDiagnostico({ wa }: Props) {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const [started,       setStarted]       = useState(false);
  const [step,          setStep]          = useState<0 | 1 | 2>(0);
  const [industryId,    setIndustryId]    = useState<string | null>(null);
  const [selectedPains, setSelectedPains] = useState<Set<number>>(new Set());
  const [note,          setNote]          = useState('');
  const [thinking,      setThinking]      = useState(false);

  const industry = useMemo(
    () => INDUSTRIES.find(i => i.id === industryId) ?? null,
    [industryId],
  );

  const beginDiagnostic = () => setStarted(true);

  const pickIndustry = (id: string) => {
    setIndustryId(id);
    setSelectedPains(new Set());
    setNote('');
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
    setNote('');
    setThinking(false);
  };

  const goToProposal = () => {
    if (reduceMotion) { setStep(2); return; }
    setThinking(true);
    window.setTimeout(() => {
      setStep(2);
      setThinking(false);
    }, THINKING_DURATION_MS);
  };

  const waHref = useMemo(() => {
    if (step !== 2 || !industry) return wa;
    const checked = Array.from(selectedPains).map(i => `• ${industry.pains[i]}`).join('\n');
    const extra = note.trim() ? `\n\nContexto:\n${note.trim()}` : '';
    const body = `Hola Antonio. Tengo ${industry.name.toLowerCase()} y me interesa: ${industry.proposal.headline}\n\nLo que me suena familiar:\n${checked}${extra}`;
    return `${wa}?text=${encodeURIComponent(body)}`;
  }, [wa, step, industry, selectedPains, note]);

  const promptText =
    thinking      ? 'Cruzando lo que me has contado…'
    : step === 0  ? 'Empecemos por aquí: elige el sector que mejor te describe. Un solo clic.'
    : step === 1  ? 'Marca los puntos que reconozcas. Uno, dos o todos — cuanto más claro, mejor afino la propuesta.'
    :               'Esto es lo que te montaría. Pásate por WhatsApp y cerramos plazo y precio.';

  return (
    <section
      data-servicios-section="diagnostico"
      className="s-snap-section s-diag"
    >
      <div ref={sectionRef} style={{ position:'absolute', inset:0, pointerEvents:'none' }} aria-hidden />

      {/* Ambient {x} — positioned at the section level (not stage) so it
          spans the full viewport, not just the 1280-wide content box. */}
      {!started && (
        <div className="s-diag-cta-visual" aria-hidden>
          <svg viewBox="0 0 32.91 22" focusable="false">
            <path d={D_OPEN}  fill="var(--s-accent)" />
            <path d={D_X}     fill="var(--s-accent)" />
            <path d={D_CLOSE} fill="var(--s-accent)" />
          </svg>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {!started ? (
          /* ───────── Stage CTA · centered ───────── */
          <motion.div
            key="cta"
            className="s-diag-stage s-diag-stage-cta"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="s-diag-cta-inner">
              <h2 className="s-diag-title s-diag-title-cta">
                Diagnóstico.
                <br />
                <span className="s-diag-title-muted">Tres preguntas.</span>
                <br />
                Una propuesta concreta.
              </h2>
              <p className="s-diag-sub s-diag-sub-cta">
                Conoce en menos de un minuto cómo puedo ayudarte a ganar tiempo y clientes.
              </p>
              <button
                type="button"
                onClick={beginDiagnostic}
                className="s-diag-cta-btn"
              >
                ¿Cuál es tu sector?
                <ArrowRight size={20} weight="bold" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* ───────── Stage split · rail + right ───────── */
          <motion.div
            key="split"
            className="s-diag-stage"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="s-diag-wizard">
              {/* ── LEFT rail ── */}
              <aside className="s-diag-left">
                <h2 className="s-diag-rail-title">
                  Diagnóstico
                  <br />
                  <span>express.</span>
                </h2>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={thinking ? 'thinking' : step}
                    className="s-diag-rail-prompt"
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {promptText}
                  </motion.p>
                </AnimatePresence>

                {/* Stepper · big Nohemi numerals, no lines */}
                <ol className="s-diag-stepper" aria-hidden>
                  {[0, 1, 2].map(i => {
                    const state = i === step ? 'current' : i < step ? 'done' : 'todo';
                    return (
                      <li key={i} className="s-diag-step" data-state={state}>
                        <span className="s-diag-step-num">{i + 1}</span>
                        <span className="s-diag-step-label">
                          {i === 0 ? 'Sector' : i === 1 ? 'Procesos' : 'Propuesta'}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                {step > 0 && (
                  <button type="button" onClick={restart} className="s-diag-restart">
                    ← Cambiar sector
                  </button>
                )}
              </aside>

              {/* ── RIGHT panel ── */}
              <div className="s-diag-right">
                <AnimatePresence mode="wait">
                  {thinking ? (
                    <motion.div
                      key="thinking"
                      className="s-diag-thinking"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ThinkingMark />
                    </motion.div>
                  ) : step === 0 ? (
                    <motion.div
                      key="step-0-bento"
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="s-diag-bento" role="list">
                        {/* Uneven bento · 4-col × 3-row grid, spans sum to 4 per row.
                         * Row 1: Clínicas(2) · Hostelería(2)
                         * Row 2: Clubs(1)    · Inmobiliarias(3)
                         * Row 3: Gestorías(3)· Tiendas(1)                          */}
                        {([
                          { idx: 0, span: 2 }, // Clínicas
                          { idx: 5, span: 2 }, // Hostelería
                          { idx: 1, span: 1 }, // Clubs
                          { idx: 4, span: 3 }, // Inmobiliarias
                          { idx: 3, span: 3 }, // Gestorías
                          { idx: 2, span: 1 }, // Tiendas
                        ] as const).map(({ idx, span }, i) => {
                          const it   = INDUSTRIES[idx];
                          const Icon = it.Icon;
                          return (
                            <button
                              key={it.id}
                              type="button"
                              role="listitem"
                              className="s-diag-tile"
                              data-span={span}
                              onClick={() => pickIndustry(it.id)}
                              style={{
                                animationDelay: `${0.05 + i * 0.05}s`,
                              }}
                            >
                              <span className="s-diag-tile-icon" aria-hidden>
                                <Icon size="100%" weight="duotone" />
                              </span>

                              <span className="s-diag-tile-body">
                                <span className="s-diag-tile-title">{it.short}</span>
                                <span className="s-diag-tile-sub">{it.blurb}</span>
                              </span>

                              <span className="s-diag-tile-arrow" aria-hidden>
                                <ArrowRight size={16} weight="bold" />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : step === 1 && industry ? (
                    <motion.div
                      key={`step-1-${industry.id}`}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="s-diag-panel"
                    >
                      <div className="s-diag-panel-eyebrow">
                        <span className="s-diag-panel-eyebrow-label">Sector seleccionado</span>
                        <span className="s-diag-panel-eyebrow-chip">
                          <industry.Icon size={16} weight="duotone" />
                          {industry.name}
                        </span>
                      </div>

                      <ul className="s-diag-pains">
                        {industry.pains.map((p, i) => {
                          const on = selectedPains.has(i);
                          return (
                            <li key={i}>
                              <button
                                type="button"
                                onClick={() => togglePain(i)}
                                className="s-diag-pain"
                                aria-pressed={on}
                              >
                                <span className="s-diag-pain-box" data-on={on || undefined}>
                                  {on && <Check size={14} weight="bold" />}
                                </span>
                                <span className="s-diag-pain-text" data-on={on || undefined}>{p}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>

                      <label className="s-diag-note">
                        <span className="s-diag-note-label">¿Algo más? Cuéntamelo en tus palabras</span>
                        <textarea
                          className="s-diag-note-field"
                          placeholder="Ej. Usamos tres Excels distintos y el equipo de sala no sabe qué mesa está libre…"
                          value={note}
                          onChange={e => setNote(e.target.value)}
                          rows={3}
                          maxLength={400}
                        />
                        <span className="s-diag-note-count">{note.length}/400</span>
                      </label>

                      <div className="s-diag-panel-footer">
                        <button
                          type="button"
                          onClick={goToProposal}
                          disabled={selectedPains.size === 0 && note.trim().length === 0}
                          className="s-diag-next"
                        >
                          Ver mi propuesta
                          {selectedPains.size > 0 && <span className="s-diag-next-count">({selectedPains.size})</span>}
                        </button>
                        <span className="s-diag-hint">
                          Puedes marcar las que quieras.
                        </span>
                      </div>
                    </motion.div>
                  ) : step === 2 && industry ? (
                    <motion.div
                      key={`step-2-${industry.id}`}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="s-diag-panel"
                    >
                      <p className="s-diag-proposal-kicker">
                        Cómo mejoraría los procesos de {industry.kickerTarget}.
                      </p>

                      <h3 className="s-diag-proposal-title">
                        {industry.proposal.headline}
                      </h3>

                      <ul className="s-diag-deliverables">
                        {industry.proposal.deliverables.map((d, i) => (
                          <li key={i}>
                            <span className="s-diag-deliverable-badge" aria-hidden>
                              <Check size={12} weight="bold" />
                            </span>
                            <span className="s-diag-deliverable-text">{d}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="s-diag-panel-footer">
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="s-diag-next"
                        >
                          Hablemos por WhatsApp
                          <ArrowRight size={14} weight="bold" />
                        </a>
                        <button type="button" onClick={restart} className="s-diag-secondary">
                          Probar otro sector
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────────────────── Thinking mark ─────────────────────
 * GSAP timeline · whole logo translates L→R while x rotates 360° CW,
 * then R→L while x rotates 360° CCW. Brackets fade as it sways.
 * ─────────────────────────────────────────────────────── */
function ThinkingMark() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const markRef   = useRef<HTMLDivElement>(null);
  const xRef      = useRef<SVGPathElement>(null);
  const haloRef   = useRef<HTMLDivElement>(null);
  const [copyIdx, setCopyIdx] = useState(0);

  /* Copy advances at handcrafted timestamps that line up with the
   * jerky progress-bar bursts (rather than equal-spaced ticks). */
  useEffect(() => {
    const timers = THINKING_STEPS_MS.map((ms, i) =>
      window.setTimeout(() => setCopyIdx(i), ms),
    );
    return () => { timers.forEach(window.clearTimeout); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(xRef.current,    { transformOrigin: '50% 50%' });
      gsap.set(markRef.current, { x: 0 });

      const SWAY = 22;

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

      // Phase 1 · logo glides L→R while x rotates 360° clockwise
      tl.fromTo(markRef.current,
        { x: -SWAY },
        { x:  SWAY, duration: 1.8 }, 0,
      )
      .fromTo(xRef.current,
        { rotate: 0   },
        { rotate: 360, duration: 1.8, ease: 'none' }, 0,
      )
      // Phase 2 · logo glides R→L while x rotates 360° counter-clockwise
      .fromTo(markRef.current,
        { x:  SWAY },
        { x: -SWAY, duration: 1.8 }, 1.8,
      )
      .fromTo(xRef.current,
        { rotate: 360 },
        { rotate: 0,   duration: 1.8, ease: 'none' }, 1.8,
      );

      if (haloRef.current) {
        gsap.to(haloRef.current, {
          scale: 1.35,
          opacity: 0.1,
          duration: 1.6,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ display:'contents' }}>
      <div ref={markRef} className="s-diag-thinking-mark">
        <div ref={haloRef} className="s-diag-thinking-halo" aria-hidden />
        <svg viewBox="0 0 32.91 22" aria-hidden focusable="false">
          <path d={D_OPEN}  fill="var(--s-accent)" />
          <path ref={xRef} d={D_X} fill="var(--s-accent)" />
          <path d={D_CLOSE} fill="var(--s-accent)" />
        </svg>
      </div>

      <div className="s-diag-thinking-copy">
        <span className="s-diag-thinking-line">
          <AnimatePresence mode="wait">
            <motion.span
              key={copyIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {THINKING_COPY[copyIdx]}
            </motion.span>
          </AnimatePresence>
          <span className="s-diag-thinking-ellipsis" aria-hidden>
            <i /><i /><i />
          </span>
        </span>
        <span className="s-diag-thinking-sub">
          Un segundo, montando la imagen mental de tu negocio.
        </span>

        <div
          className="s-diag-thinking-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Generando propuesta"
        >
          <div
            className="s-diag-thinking-progress-fill"
            style={{ animationDuration: `${THINKING_DURATION_MS}ms` }}
          />
          <div className="s-diag-thinking-progress-ticks" aria-hidden>
            {THINKING_COPY.map((_, i) => (
              <span
                key={i}
                className="s-diag-thinking-tick"
                data-active={i <= copyIdx || undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
