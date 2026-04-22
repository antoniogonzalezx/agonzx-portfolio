'use client';

import { useRef, useEffect, useState, memo } from 'react';

/* ─────────────────────────────────────────────────────────────────
 * ServiciosGrid — Editorial Bento (asymmetric 2fr · 1fr · 1fr)
 * No cards. 1px dividers. Each cell has its own micro-animation.
 * ───────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    num:   '01',
    title: 'Atención al cliente con IA',
    body:  'Chatbot propio integrado en tu web o WhatsApp Business. Responde 24 h, precualifica consultas y gestiona citas sin operador para cada mensaje rutinario.',
  },
  {
    num:   '02',
    title: 'Automatización interna',
    body:  'Tu equipo no debería pelearse con un Excel para fichar ni con un SaaS que no entiende cómo trabajáis. Monto una herramienta propia, conforme a la normativa española.',
  },
  {
    num:   '03',
    title: 'Herramientas a medida',
    body:  'Ese proceso que vive en papel, en Excel o en WhatsApp — digitalizado. Si no encaja en ningún software comercial, construyo exactamente lo que necesitas.',
  },
];

/* ───────────────────────────── Shared ──────────────────────────── */

/* Sign-in / sign-out icons (colored via currentColor) */
function IconIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}
function IconOut() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function LogRow({
  icon, color, label, time, show,
}: { icon: React.ReactNode; color: string; label: string; time: string; show: boolean }) {
  return (
    <div
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:         12,
        opacity:     show ? 1 : 0,
        transform:   show ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.5s var(--s-ease), transform 0.5s var(--s-ease)',
      }}
    >
      <span style={{ color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </span>
      <span
        style={{
          fontFamily:   'Safiro, sans-serif',
          fontSize:      13,
          fontWeight:    500,
          letterSpacing:'-0.01em',
          color:        'var(--s-ink)',
          flex:          1,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily:   'Martian Mono, monospace',
          fontSize:      12,
          color:        'var(--s-ink-2)',
          letterSpacing:'-0.01em',
        }}
      >
        {time}
      </span>
    </div>
  );
}

/* ── Fichaje log — entrada / salida rows appearing in sequence ── */
function FichajeLog() {
  const [phase, setPhase] = useState(0); // 0 empty | 1 entrada | 2 entrada+salida

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    const loop = () => {
      setPhase(0);
      t1 = setTimeout(() => setPhase(1), 700);
      t2 = setTimeout(() => setPhase(2), 2300);
      t3 = setTimeout(loop, 6000);
    };
    loop();
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:            14,
        marginTop:     'auto',
        paddingTop:    '1.5rem',
        minHeight:      100,
      }}
    >
      <LogRow icon={<IconIn />}  color="var(--s-accent)" label="Entrada" time="09:02" show={phase >= 1} />
      <LogRow icon={<IconOut />} color="#E54D40"          label="Salida"  time="18:14" show={phase >= 2} />
    </div>
  );
}

/* ── Cell 02 anim — infinite chat scrolling upwards ── */
const CHAT_MESSAGES: { text: string; from: 'user' | 'bot' }[] = [
  { text: 'Hola, ¿tenéis disponibilidad esta semana?',             from: 'user' },
  { text: 'Sí, nos queda sitio el jueves y el viernes por la noche. ¿Te cuadra alguno?', from: 'bot'  },
  { text: 'El jueves sobre las 21, para dos personas.',            from: 'user' },
  { text: 'Perfecto, te reservo mesa a las 21:00 y te confirmo por email en un minuto.', from: 'bot'  },
  { text: '¿Tenéis opciones sin gluten en la carta?',              from: 'user' },
  { text: 'Sí, todos los platos aptos están marcados. Te paso el menú por aquí.',        from: 'bot'  },
];

const ChatInfinite = memo(function ChatInfinite() {
  return (
    <div
      style={{
        position:       'relative',
        marginTop:      'auto',
        paddingTop:     '1.25rem',
        height:          160,
        overflow:       'hidden',
        maskImage:      'linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)',
        WebkitMaskImage:'linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)',
      }}
    >
      <div
        style={{
          display:       'flex',
          flexDirection: 'column',
          gap:            8,
          animation:     's-chat-scroll 14s linear infinite',
        }}
      >
        {[...CHAT_MESSAGES, ...CHAT_MESSAGES].map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.from === 'bot' ? 'flex-end' : 'flex-start',
              maxWidth: '82%',
              padding:  '7px 12px',
              borderRadius: 16,
              borderBottomLeftRadius:  m.from === 'user' ? 4 : 16,
              borderBottomRightRadius: m.from === 'bot'  ? 4 : 16,
              background: m.from === 'bot' ? 'var(--s-ink)' : 'rgba(255,255,255,0.75)',
              color:      m.from === 'bot' ? '#FFFFFF'      : 'var(--s-ink)',
              border:     m.from === 'user' ? '1px solid rgba(11,15,20,0.08)' : 'none',
              fontFamily:'Safiro, sans-serif',
              fontSize:   12,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              boxShadow: m.from === 'bot'
                ? '0 2px 6px rgba(11,15,20,0.12)'
                : 'inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
});

/* ── Cell 03 anim — browser bar with cyclic typewriter path ── */
const PATHS = ['/pedidos', '/facturas', '/almacen', '/fichaje'];

function BrowserTyper() {
  const [pathIdx, setPathIdx] = useState(0);
  const [typed, setTyped]     = useState('');
  const [dir, setDir]         = useState<'type' | 'erase' | 'hold'>('type');

  useEffect(() => {
    const target = PATHS[pathIdx];
    let t: ReturnType<typeof setTimeout>;

    if (dir === 'type') {
      if (typed.length < target.length) {
        t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 70);
      } else {
        t = setTimeout(() => setDir('hold'), 1400);
      }
    } else if (dir === 'hold') {
      t = setTimeout(() => setDir('erase'), 300);
    } else {
      if (typed.length > 0) {
        t = setTimeout(() => setTyped(typed.slice(0, -1)), 35);
      } else {
        setPathIdx((pathIdx + 1) % PATHS.length);
        setDir('type');
      }
    }
    return () => clearTimeout(t);
  }, [typed, dir, pathIdx]);

  return (
    <div
      style={{
        display:             'flex',
        alignItems:          'center',
        gap:                  8,
        marginTop:           'auto',
        padding:             '10px 14px',
        borderRadius:         12,
        background:          'rgba(255,255,255,0.55)',
        backdropFilter:      'blur(16px) saturate(180%)',
        WebkitBackdropFilter:'blur(16px) saturate(180%)',
        border:              '1px solid rgba(11,15,20,0.08)',
        boxShadow:           'inset 0 1px 0 rgba(255,255,255,0.9)',
        fontFamily:          'Martian Mono, monospace',
        fontSize:             11.5,
        color:               'var(--s-ink-2)',
        letterSpacing:       '-0.01em',
        overflow:            'hidden',
      }}
    >
      {/* dots */}
      <span style={{ display: 'inline-flex', gap: 4, flexShrink: 0 }}>
        <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#FF5F57' }} />
        <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#FEBC2E' }} />
        <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#28C840' }} />
      </span>
      <span style={{ color: 'var(--s-ink-3)' }}>app.tuempresa.es</span>
      <span style={{ color: 'var(--s-ink)', whiteSpace: 'nowrap' }}>{typed}</span>
      <span
        aria-hidden
        style={{
          display:      'inline-block',
          width:         1.5,
          height:        12,
          background:   'var(--s-ink)',
          animation:    's-caret 1s steps(1) infinite',
          marginLeft:   -2,
        }}
      />
    </div>
  );
}

/* ───────────────────────── Cell wrapper ────────────────────────── */

function Cell({
  children, delay, borderRight = false, flagship = false,
}: {
  children:     React.ReactNode;
  delay:        number;
  borderRight?: boolean;
  flagship?:    boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow]   = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
      className="s-cell"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position:       'relative',
        display:        'flex',
        flexDirection:  'column',
        gap:            flagship ? '1rem' : '0.85rem',
        padding:        'clamp(1.25rem,2.2vw,2rem)',
        height:         '100%',
        borderRight:    borderRight ? '1px solid var(--s-line)' : undefined,
        background:     hover ? 'rgba(255,255,255,0.55)' : 'transparent',
        transition:     'background 0.35s var(--s-ease)',
        opacity:         show ? 1 : 0,
        transform:       show ? 'translateY(0)' : 'translateY(16px)',
        transitionProperty: 'opacity, transform, background',
        transitionDelay:    `${delay}s, ${delay}s, 0s`,
        transitionDuration: '0.7s, 0.7s, 0.35s',
        transitionTimingFunction: 'var(--s-ease)',
      }}
    >
      {/* Teal hair on hover — scaleX from left */}
      <span
        aria-hidden
        style={{
          position:        'absolute',
          top:              0, left: 0, right: 0,
          height:           1,
          background:      'var(--s-accent)',
          transform:        hover ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition:      'transform 0.5s var(--s-ease)',
        }}
      />
      {children}
    </div>
  );
}

/* ── Small number tag ── */
function NumTag({ num }: { num: string }) {
  return (
    <div
      style={{
        fontFamily:   'Nohemi, sans-serif',
        fontSize:      12,
        fontWeight:    500,
        letterSpacing:'-0.01em',
        color:        'var(--s-ink-3)',
      }}
    >
      {num}
    </div>
  );
}

/* ────────────────────────────── View ───────────────────────────── */

export default function ServiciosGrid() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleIn, setTitleIn] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTitleIn(true); obs.disconnect(); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="servicios"
      data-servicios-section="servicios"
      className="s-snap-section"
      style={{
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'center',
        padding:       'clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,5rem)',
        background:    'var(--s-bg)',
        gap:           'clamp(2rem,4vw,3.5rem)',
      }}
    >
      {/* ── Section title ── */}
      <div
        ref={titleRef}
        style={{
          opacity:    titleIn ? 1 : 0,
          transform:  titleIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.9s var(--s-ease), transform 0.9s var(--s-ease)',
          maxWidth:  '960px',
        }}
      >
        <h2
          className="s-grid-title"
          style={{
            fontFamily:   'Nohemi, sans-serif',
            fontSize:     'clamp(1.85rem,5vw,4rem)',
            fontWeight:   600,
            letterSpacing:'-0.03em',
            lineHeight:    0.96,
            margin:        0,
          }}
        >
          <span style={{ color: 'var(--s-ink)', fontWeight: 600, display: 'block' }}>
            Tres formas
          </span>
          <span style={{ color: 'var(--s-ink-3)', fontWeight: 400, display: 'block' }}>
            de no perder tiempo.
          </span>
        </h2>
      </div>

      {/* ── Bento grid ── */}
      <div
        className="s-grid-bento"
        style={{
          display:             'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)',
          borderTop:           '1px solid var(--s-line)',
          borderBottom:        '1px solid var(--s-line)',
          minHeight:           'clamp(340px, 44vh, 500px)',
        }}
      >
        {/* 01 flagship — Atención al cliente con IA */}
        <Cell delay={0} borderRight flagship>
          <NumTag num={SERVICES[0].num} />
          <h3 className="s-cell-title" style={titleBig}>{SERVICES[0].title}</h3>
          <p style={bodyBig}>{SERVICES[0].body}</p>
          <ChatInfinite />
        </Cell>

        {/* 02 — Automatización interna */}
        <Cell delay={0.12} borderRight>
          <NumTag num={SERVICES[1].num} />
          <h3 className="s-cell-title" style={titleSmall}>{SERVICES[1].title}</h3>
          <p style={bodySmall}>{SERVICES[1].body}</p>
          <FichajeLog />
        </Cell>

        {/* 03 */}
        <Cell delay={0.24}>
          <NumTag num={SERVICES[2].num} />
          <h3 className="s-cell-title" style={titleSmall}>{SERVICES[2].title}</h3>
          <p style={bodySmall}>{SERVICES[2].body}</p>
          <BrowserTyper />
        </Cell>
      </div>
    </section>
  );
}

/* ── Shared text styles ── */
const titleBig: React.CSSProperties = {
  fontFamily:   'Nohemi, sans-serif',
  fontSize:     'clamp(1.75rem,2.6vw,2.5rem)',
  fontWeight:    600,
  letterSpacing:'-0.03em',
  lineHeight:    1.05,
  color:        'var(--s-ink)',
  margin:        0,
};
const titleSmall: React.CSSProperties = {
  fontFamily:   'Nohemi, sans-serif',
  fontSize:     'clamp(1.25rem,1.7vw,1.625rem)',
  fontWeight:    600,
  letterSpacing:'-0.025em',
  lineHeight:    1.1,
  color:        'var(--s-ink)',
  margin:        0,
};
const bodyBig: React.CSSProperties = {
  fontFamily:'Safiro, sans-serif',
  fontSize:   15,
  lineHeight: 1.55,
  color:     'var(--s-ink-2)',
  margin:     0,
  maxWidth:  '52ch',
};
const bodySmall: React.CSSProperties = {
  fontFamily:'Safiro, sans-serif',
  fontSize:   14,
  lineHeight: 1.55,
  color:     'var(--s-ink-2)',
  margin:     0,
};
