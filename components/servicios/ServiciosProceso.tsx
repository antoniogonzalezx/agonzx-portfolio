'use client';

import { useRef, useEffect, useState, memo } from 'react';
import Image from 'next/image';
import Wordmark from './Wordmark';
import {
  WhatsappLogo,
  Database,
  Cursor,
  CalendarDots,
  Tag as TagIcon,
  ListChecks,
  TrendUp,
} from '@phosphor-icons/react';

type Stat =
  | { kind: 'text'; text: string; label: string }
  | { kind: 'icon'; name: IconName; label: string };

type Step = {
  num:   string;
  lead:  string;
  muted: string;
  body:  string;
  stats: Stat[];
};

/* ────────── Icon system · Phosphor base + accent-blue narrative overlay ──
 * Same icon family (@phosphor-icons/react) for consistent aesthetic.
 * For "pure marketing" moments (database, cursor, checklist, trend) we
 * layer a second SVG on top with accent-colored circles/pulses that animate
 * forever via keyframes in styles/servicios.css.
 * Static icons (whatsapp, calendar, tag) render only the Phosphor base.
 * ──────────────────────────────────────────────────────────────────────── */

type IconName =
  | 'whatsapp' | 'database' | 'cursor'
  | 'calendar' | 'tag'      | 'checklist'
  | 'trend';

const PH_SIZE = { size: '100%' } as const;

function Icon({ name }: { name: IconName }) {
  if (name === 'whatsapp') return <WhatsappLogo {...PH_SIZE} weight="fill" />;
  if (name === 'calendar') return <CalendarDots {...PH_SIZE} weight="regular" />;
  if (name === 'tag')      return <TagIcon      {...PH_SIZE} weight="regular" />;

  if (name === 'database') {
    return (
      <>
        <Database {...PH_SIZE} weight="regular" />
        <svg className="s-ph-overlay" viewBox="0 0 256 256" aria-hidden>
          <circle className="s-ph-drop s-ph-drop-1" cx="96"  cy="28" r="8" />
          <circle className="s-ph-drop s-ph-drop-2" cx="128" cy="28" r="8" />
          <circle className="s-ph-drop s-ph-drop-3" cx="160" cy="28" r="8" />
        </svg>
      </>
    );
  }

  if (name === 'cursor') {
    return (
      <>
        <Cursor {...PH_SIZE} weight="regular" />
        <svg className="s-ph-overlay" viewBox="0 0 256 256" aria-hidden>
          <circle
            className="s-ph-ripple"
            cx="72" cy="72"
            r="22"
            fill="none"
            strokeWidth="10"
          />
        </svg>
      </>
    );
  }

  if (name === 'checklist') {
    return (
      <>
        <ListChecks {...PH_SIZE} weight="regular" />
        <svg className="s-ph-overlay" viewBox="0 0 256 256" aria-hidden>
          <circle className="s-ph-pulse s-ph-pulse-1" cx="44" cy="72"  r="14" />
          <circle className="s-ph-pulse s-ph-pulse-2" cx="44" cy="128" r="14" />
          <circle className="s-ph-pulse s-ph-pulse-3" cx="44" cy="184" r="14" />
        </svg>
      </>
    );
  }

  /* trend */
  return (
    <>
      <TrendUp {...PH_SIZE} weight="regular" />
      <svg className="s-ph-overlay" viewBox="0 0 256 256" aria-hidden>
        <circle className="s-ph-sparkle" cx="208" cy="80" r="12" />
      </svg>
    </>
  );
}

/* ────────── Step data ────────── */

const STEPS: Step[] = [
  {
    num:   '1',
    lead:  'Asesoría',
    muted: 'gratuita.',
    body:  'Charlamos 30 minutos. Me cuentas tu negocio, qué te está frenando y cómo trabajas hoy. Te digo si puedo ayudarte — y cómo — sin rodeos.',
    stats: [
      { kind: 'text', text: '30', label: 'Minutos contigo'                },
      { kind: 'text', text: '0€', label: 'Sin coste, sin compromiso'      },
      { kind: 'text', text: '24', label: 'Horas o menos para responderte' },
    ],
  },
  {
    num:   '2',
    lead:  'Demo',
    muted: 'con tus datos.',
    body:  'Te enseño cómo quedaría tu herramienta usando tus datos y tu forma de trabajar. La ves funcionando antes de contratar.',
    stats: [
      { kind: 'icon', name: 'database', label: 'Con tus datos reales' },
      { kind: 'icon', name: 'cursor',   label: 'Navegable en vivo'    },
      { kind: 'icon', name: 'calendar', label: 'Lista en días, no meses' },
    ],
  },
  {
    num:   '3',
    lead:  'Entrega',
    muted: 'del proyecto.',
    body:  'Construyo tu herramienta a medida, migro tus datos, formo a tu equipo y la dejo lista desde el primer día. Precio y plazo cerrados por escrito.',
    stats: [
      { kind: 'icon', name: 'tag',       label: 'Precio fijo cerrado'    },
      { kind: 'icon', name: 'checklist', label: 'Formación incluida'      },
      { kind: 'text', text: '1',         label: 'Operativo desde el día 1' },
    ],
  },
  {
    num:   '4',
    lead:  'Soporte',
    muted: 'directo.',
    body:  'Cuando tu herramienta está en marcha, sigo a tu lado. Mejoras, cambios o dudas: me escribes a mí, no a un call center.',
    stats: [
      { kind: 'icon', name: 'whatsapp', label: 'WhatsApp directo conmigo'   },
      { kind: 'text', text: '24',       label: 'Horas o menos para responder' },
      { kind: 'icon', name: 'trend',    label: 'Mejoras continuas'          },
    ],
  },
];

/* ────────── Mock data ────────── */

const THREAD_01 = [
  { from: 'user', text: 'Hola, tengo una clínica y estoy hasta arriba gestionando citas.' },
  { from: 'bot',  text: '¿Cómo las llevas ahora? ¿Agenda de papel, Excel, WhatsApp…?' },
  { from: 'user', text: 'Entre WhatsApp y una agenda de papel, un lío.' },
  { from: 'bot',  text: 'Se puede automatizar. ¿Mañana 30 min para verlo?' },
] as const;

const THREAD_04 = [
  { from: 'user', text: 'Antonio, ¿podríamos añadir un filtro por proveedor al listado?' },
  { from: 'bot',  text: 'Lo veo, te confirmo en un rato.' },
  { from: 'bot',  text: 'Listo. Subido a producción, pruébalo cuando puedas.' },
  { from: 'user', text: 'Funciona perfecto. Otra cosa: ¿se podrían exportar las facturas a Excel?' },
  { from: 'bot',  text: 'Sí, lo añado mañana al listado de facturas. Mismo formato que ya manejas.' },
  { from: 'user', text: 'Genial, gracias 🙌' },
] as const;

type StatusKey = 'cobrada' | 'emitida' | 'entregado' | 'preparando' | 'al-dia' | 'pendiente';

const TABS: {
  key: string;
  label: string;
  rows: { id: string; name: string; status: string; statusKey: StatusKey }[];
}[] = [
  {
    key:   'pedidos',
    label: 'Pedidos',
    rows: [
      { id: '#2148', name: 'Panadería Luna',     status: 'Entregado',  statusKey: 'entregado' },
      { id: '#2147', name: 'Café Central',       status: 'Preparando', statusKey: 'preparando' },
      { id: '#2146', name: 'Clínica Dr. Aranda', status: 'Entregado',  statusKey: 'entregado' },
    ],
  },
  {
    key:   'clientes',
    label: 'Clientes',
    rows: [
      { id: 'C-118', name: 'Torrenueva Futsal', status: 'Al día',    statusKey: 'al-dia' },
      { id: 'C-117', name: 'Restaurante Pinar', status: 'Al día',    statusKey: 'al-dia' },
      { id: 'C-116', name: 'Óptica Vista',      status: 'Pendiente', statusKey: 'pendiente' },
    ],
  },
  {
    key:   'facturas',
    label: 'Facturas',
    rows: [
      { id: 'F-2026/042', name: 'Soccer Manager',     status: 'Cobrada', statusKey: 'cobrada' },
      { id: 'F-2026/041', name: 'Café Central',       status: 'Emitida', statusKey: 'emitida' },
      { id: 'F-2026/040', name: 'Clínica Dr. Aranda', status: 'Cobrada', statusKey: 'cobrada' },
    ],
  },
];

const CHECKLIST = [
  { label: 'Código desplegado',   meta: 'v1.0.0'          },
  { label: 'Datos migrados',      meta: '2.480 registros' },
  { label: 'Formación al equipo', meta: '2 h'             },
  { label: 'Manual de uso',       meta: 'PDF · 12 pág.'   },
  { label: 'Accesos activados',   meta: '8 usuarios'      },
];

/* ────────── Mocks ────────── */

function Avatar() {
  return (
    <div className="s-proc-wa-avatar">
      <Image src="/profile.jpg" alt="Antonio González" width={48} height={48} />
    </div>
  );
}

/* Straight-line check (sharp, no curves) */
function CheckMark() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden>
      <path
        d="M2.5 6.5 L5 9 L9.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

const WhatsAppThread = memo(function WhatsAppThread({
  script,
}: {
  script: readonly { from: string; text: string }[];
}) {
  const [phase, setPhase]   = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const loop = () => {
      setPhase(0);
      setTyping(false);
      script.forEach((m, i) => {
        if (m.from === 'bot') {
          timers.push(setTimeout(() => setTyping(true),                        i * 1500 + 300));
          timers.push(setTimeout(() => { setTyping(false); setPhase(i + 1); }, i * 1500 + 1100));
        } else {
          timers.push(setTimeout(() => setPhase(i + 1), i * 1500 + 400));
        }
      });
      timers.push(setTimeout(loop, script.length * 1500 + 2500));
    };
    loop();
    return () => { timers.forEach(clearTimeout); };
  }, [script]);

  return (
    <div className="s-proc-wa">
      <div className="s-proc-wa-header">
        <Avatar />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <span className="s-proc-wa-name">Antonio · agonzx</span>
        </div>
      </div>

      <div className="s-proc-wa-body">
        {script.slice(0, phase).map((m, i) => (
          <div key={i} className="s-proc-wa-bubble" data-from={m.from}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="s-proc-wa-typing" aria-hidden>
            <i /><i /><i />
          </div>
        )}
      </div>
    </div>
  );
});

const DemoBrowser = memo(function DemoBrowser() {
  const [tabIdx, setTabIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTabIdx(t => (t + 1) % TABS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const tab = TABS[tabIdx];
  return (
    <div className="s-proc-demo">
      <div className="s-proc-br-tabs">
        {TABS.map((t, i) => (
          <span key={t.key} className="s-proc-br-tab" data-active={i === tabIdx || undefined}>
            {t.label}
          </span>
        ))}
      </div>
      <div className="s-proc-br-content" key={tab.key}>
        {tab.rows.map((r, i) => (
          <div
            key={r.id}
            className="s-proc-br-row"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span>{r.name}</span>
            <small>{r.id}</small>
            <em data-status={r.statusKey}>{r.status}</em>
          </div>
        ))}
      </div>
    </div>
  );
});

const LaunchChecklist = memo(function LaunchChecklist() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const loop = () => {
      setDone(0);
      CHECKLIST.forEach((_, i) => {
        timers.push(setTimeout(() => setDone(i + 1), 500 + i * 450));
      });
      timers.push(setTimeout(loop, 500 + CHECKLIST.length * 450 + 3000));
    };
    loop();
    return () => { timers.forEach(clearTimeout); };
  }, []);

  const allDone = done >= CHECKLIST.length;
  return (
    <div className="s-proc-launch">
      {CHECKLIST.map((it, i) => (
        <div key={it.label} className="s-proc-launch-item" data-done={i < done || undefined}>
          <span className="s-proc-launch-check" aria-hidden>
            {i < done ? <CheckMark /> : null}
          </span>
          <span>{it.label}</span>
          <span className="s-proc-launch-meta">{it.meta}</span>
        </div>
      ))}
      {allDone && (
        <div className="s-proc-launch-banner">
          <strong>En marcha</strong>
          <small>desde {new Date().toISOString().slice(0, 10)}</small>
        </div>
      )}
    </div>
  );
});

function Mock({ index }: { index: number }) {
  if (index === 0) return <WhatsAppThread script={THREAD_01} />;
  if (index === 1) return <DemoBrowser />;
  if (index === 2) return <LaunchChecklist />;
  return <WhatsAppThread script={THREAD_04} />;
}

/* ────────── App icon (closed state) ────────── */

function AppIcon() {
  return (
    <div className="s-proc-app-icon" aria-hidden>
      <Wordmark main="#FFFFFF" accent="#4F4FFF" width="76%" />
    </div>
  );
}

/* ────────── Step card (left) ────────── */

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  return (
    <li className="s-proc-stat" style={{ animationDelay: `${delay}s` }}>
      {stat.kind === 'text' ? (
        <span className="s-proc-stat-hero-text">{stat.text}</span>
      ) : (
        <span className="s-proc-stat-hero-icon" data-icon={stat.name}>
          <Icon name={stat.name} />
        </span>
      )}
      <span className="s-proc-stat-label">{stat.label}</span>
    </li>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <article className="s-proc-card" key={`card-${step.num}`}>
      <div className="s-proc-card-row">
        <span className="s-proc-card-num" style={{ animationDelay: '0.02s' }}>
          {step.num}
        </span>
        <h2 className="s-h2 s-proc-card-title" style={{ animationDelay: '0.08s' }}>
          <span className="s-h2-lead">{step.lead}</span>
          <span className="s-h2-muted">{step.muted}</span>
        </h2>
      </div>

      <p className="s-proc-card-body" style={{ animationDelay: '0.16s' }}>
        {step.body}
      </p>

      <ul className="s-proc-stats">
        {step.stats.map((s, i) => (
          <StatItem key={s.label} stat={s} delay={0.24 + i * 0.08} />
        ))}
      </ul>
    </article>
  );
}

/* ────────── Main component ────────── */

export default function ServiciosProceso() {
  const wrapRef   = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const beatRefs  = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx,      setActiveIdx]      = useState(0);
  const [textVisible,    setTextVisible]    = useState(false);
  const [iconVisible,    setIconVisible]    = useState(false);
  const [opened,         setOpened]         = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  /* Step detection */
  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>('.s-snap-container');
    if (!scroller) return;

    let ticking = false;
    const recompute = () => {
      ticking = false;
      const vh = window.innerHeight;
      let next = 0;
      for (let i = 0; i < beatRefs.current.length; i++) {
        const beat = beatRefs.current[i];
        if (!beat) continue;
        const r = beat.getBoundingClientRect();
        if (r.top <= vh * 0.45) next = i;
      }
      setActiveIdx(prev => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(recompute);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recompute);
    recompute();
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recompute);
    };
  }, []);

  /* First-view sequence — staged so each beat lands cleanly:
     0ms     text card slides in (immediately on enter)
     350ms   app icon fades in (right side)
     1850ms  icon "click" → window expands
     2750ms  window content (mock) mounts and fades in */
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const timers: number[] = [];
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTextVisible(true);
          timers.push(window.setTimeout(() => setIconVisible(true),    350));
          timers.push(window.setTimeout(() => setOpened(true),        1850));
          timers.push(window.setTimeout(() => setContentVisible(true), 2750));
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  const step = STEPS[activeIdx];

  return (
    <section
      ref={wrapRef}
      data-servicios-section="proceso"
      className="s-proc-wrap"
    >
      <div className="s-proc-ambient" aria-hidden />

      <div
        ref={stickyRef}
        className="s-proc-sticky"
        data-text-visible={textVisible || undefined}
        data-icon-visible={iconVisible || undefined}
        data-opened={opened || undefined}
        data-content-visible={contentVisible || undefined}
      >
        <div className="s-proc-inner">
          <div className="s-proc-grid">
            <StepCard step={step} />

            <div className="s-proc-window" aria-hidden>
              <AppIcon />

              <div className="s-proc-window-frame">
                <div className="s-proc-window-chrome">
                  <span className="s-proc-window-dots">
                    <i style={{ background: '#FF5F57' }} />
                    <i style={{ background: '#FEBC2E' }} />
                    <i style={{ background: '#28C840' }} />
                  </span>
                  <span className="s-proc-window-url">
                    <span className="s-proc-window-url-mark">{'{x}'}</span>
                    agonzx.app
                  </span>
                </div>

                <div className="s-proc-window-content" key={`mk-${activeIdx}`}>
                  {contentVisible && <Mock index={activeIdx} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {STEPS.map((s, i) => (
        <div
          key={s.num}
          ref={el => { beatRefs.current[i] = el; }}
          className="s-proc-beat"
          data-idx={i}
        />
      ))}

      <div className="s-proc-mobile">
        {STEPS.map((s) => (
          <article className="s-proc-mobile-card" key={`m-${s.num}`}>
            <div className="s-proc-card-row">
              <span className="s-proc-card-num">{s.num}</span>
              <h3 className="s-h2 s-proc-card-title">
                <span className="s-h2-lead">{s.lead}</span>
                <span className="s-h2-muted">{s.muted}</span>
              </h3>
            </div>
            <p className="s-proc-card-body">{s.body}</p>
            <ul className="s-proc-stats">
              {s.stats.map((st, i) => (
                <StatItem key={st.label} stat={st} delay={0.05 * i} />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
