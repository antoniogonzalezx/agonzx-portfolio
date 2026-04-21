'use client';
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/* ══ ICONS ═══════════════════════════════════════════════════════════════════ */
const IcoClock    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IcoCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoUser     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcoLoop     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3"/></svg>;
const IcoChart    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IcoPuzzle   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
const IcoHeart    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const IcoHotel    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcoWrench   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
const IcoBriefcase= () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const IcoTruck    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--accent)'}}><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;

/* ══ DATA ════════════════════════════════════════════════════════════════════ */
const SERVICES = [
  { num: '01', category: 'Automatización de procesos',
    title: 'REDUCE EL **TIEMPO PERDIDO**\nEN TAREAS QUE HACÉIS A MANO.',
    desc: 'Identifico las tareas repetitivas que más tiempo consumen — avisos, registros, documentos — y construyo flujos automáticos que se ejecutan solos. Tu equipo deja de hacer trabajo mecánico.',
    tags: ['Automatización','Flujos','APIs','Integraciones'],
    gain: 'Más capacidad operativa sin aumentar plantilla. Menos errores manuales.' },
  { num: '02', category: 'Herramientas internas a medida',
    title: 'SOFTWARE QUE **ENCAJA** CON\nCÓMO TRABAJÁIS DE VERDAD.',
    desc: 'Aplicaciones internas adaptadas a los procesos de tu empresa: control de presencia, permisos, seguimiento de casos. Diseñadas para las personas que las van a usar.',
    tags: ['Web App','Base de datos','Roles','A medida'],
    gain: 'Tu equipo trabaja con herramientas que encajan, sin dar rodeos.' },
  { num: '03', category: 'Paneles y cuadros de mando',
    title: '**VISIBILIDAD REAL** DE\nLO QUE PASA EN TU NEGOCIO.',
    desc: 'Si para saber el estado de algo hay que llamar o buscar en varios sitios, hay un problema de visibilidad. Construyo dashboards que centralizan lo que importa.',
    tags: ['Dashboard','KPIs','Tiempo real','Filtros'],
    gain: 'Decisiones más rápidas con menos ruido. Visibilidad en tiempo real.' },
  { num: '04', category: 'Seguimiento y operativa',
    title: '**CONTROL COMPLETO:**\nCLIENTE, ESTADO, HISTORIAL.',
    desc: 'Sistemas ligeros de seguimiento adaptados a cómo trabaja tu equipo. Clientes, expedientes, pedidos. Con historial, notas y estados que cualquiera puede consultar.',
    tags: ['CRM ligero','Historial','Estados','Notas'],
    gain: 'Menos cosas que se pierden. Claridad sobre cada caso.' },
  { num: '05', category: 'Flujos, formularios y aprobaciones',
    title: '**DIGITALIZA** LO QUE HOY VIVE\nEN PAPEL O WHATSAPP.',
    desc: 'Solicitudes de vacaciones, partes de trabajo, formularios de admisión. Digitalizados para que tengan registro, sean rastreables y lleguen a quien tiene que actuar.',
    tags: ['Formularios','Aprobaciones','Notificaciones','Registro'],
    gain: 'Procesos que se completan y dejan rastro. Nadie esperando.' },
];

const PAIN_POINTS = [
  { span: 2, icon: <IcoClock />,    heading: 'Control horario sin sistema',       body: 'Fichajes en papel, Excel o WhatsApp. Sin trazabilidad real. Nadie sabe con certeza las horas trabajadas ni quién ha fichado.' },
  { span: 1, icon: <IcoCalendar />, heading: 'Vacaciones y permisos caóticos',    body: 'Solicitudes verbales, aprobaciones por mensaje y conflictos de agenda que aparecen cuando ya es tarde.' },
  { span: 1, icon: <IcoUser />,     heading: 'Clientes sin orden',                body: 'El historial vive en emails o en la cabeza de quien lleva el caso. Si esa persona no está, el conocimiento se pierde.' },
  { span: 2, icon: <IcoLoop />,     heading: 'Tareas repetitivas cada día',       body: 'Copiar datos, enviar avisos, actualizar registros, generar documentos. Siempre a mano, siempre con riesgo de error.' },
  { span: 1, icon: <IcoChart />,    heading: 'Sin visibilidad',                   body: 'Para saber el estado de un pedido o una cita hay que preguntar. La información no está centralizada.' },
  { span: 2, icon: <IcoPuzzle />,   heading: 'Herramientas que no encajan',       body: 'Usáis un software con cosas de más y le faltan las que necesitáis. O varias herramientas que no se hablan entre sí.' },
];

const SECTORS = [
  { icon: <IcoHeart />,     title: 'Clínicas y salud',         examples: ['Seguimiento de pacientes','Control de presencia','Formularios de admisión','Historiales del equipo'] },
  { icon: <IcoHotel />,     title: 'Hoteles y alojamientos',   examples: ['Checklist del equipo','Gestión de incidencias','Sin WhatsApp para tareas','Partes de trabajo digitales'] },
  { icon: <IcoWrench />,    title: 'Talleres y servicios',     examples: ['Órdenes de trabajo','Historial por cliente','Control de inventario','Albaranes digitales'] },
  { icon: <IcoBriefcase />, title: 'Asesorías y despachos',    examples: ['Seguimiento de expedientes','Alertas por vencimiento','Documentación central','Comunicación ordenada'] },
  { icon: <IcoTruck />,     title: 'Operaciones y transporte', examples: ['Control de entregas','Partes en campo','Seguimiento de flota','Registro de incidencias'] },
];

const STEPS = [
  { num: '01', heading: 'Auditoría inicial',                body: 'Hablamos de tu negocio y dónde pierdes más tiempo. No hace falta que sepas qué necesitas. Sin compromiso, sin coste.' },
  { num: '02', heading: 'Diagnóstico y cuellos de botella', body: 'Identifico qué procesos generan más fricción y qué solución tendría mejor relación impacto-coste para tu caso concreto.' },
  { num: '03', heading: 'Propuesta concreta',               body: 'Solución técnica clara, alcance definido, precio cerrado y plazos realistas. Sin módulos extra que aparecen después.' },
  { num: '04', heading: 'Primera versión funcional',        body: 'Trabajo en iteraciones cortas con entregas visibles desde la primera semana. Siempre sabes en qué estoy.' },
  { num: '05', heading: 'Iteración y mejora continua',      body: 'El trabajo no termina cuando el código está listo — termina cuando la solución funciona de verdad en tu día a día.' },
];

const FAQS = [
  { q: '¿Tengo que cambiar todo el software que ya uso?',               a: 'No. La mayor parte de lo que construyo se integra con lo que ya tienes. No tiro lo que funciona — busco completar lo que falta o automatizar lo que no está cubierto.' },
  { q: '¿Esto es útil para una empresa pequeña?',                       a: 'Especialmente para pymes. Los procesos manuales pesan más cuando el equipo es pequeño, y ahí el impacto por euro invertido es mayor.' },
  { q: '¿Cuánto tarda un proyecto?',                                    a: 'Una herramienta sencilla puede estar funcionando en 2-4 semanas. Un sistema completo, 2-3 meses. Siempre con entregas incrementales.' },
  { q: '¿Trabajas solo con IA?',                                        a: 'No. Muchas veces la solución correcta no necesita IA: es una herramienta bien diseñada o una integración sencilla entre sistemas que ya usas.' },
  { q: '¿Y si no sé exactamente qué necesito?',                         a: 'Es lo más habitual. La auditoría inicial gratuita existe para eso — analizamos tus procesos juntos y te digo qué veo.' },
];

/* ══ SNAP SCROLLER CONTEXT ═══════════════════════════════════════════════════ */
interface SnapCtx { svcIdx: number; stepIdx: number; goSvc:(i:number)=>void; goStep:(i:number)=>void; }
const SnapCtx = createContext<SnapCtx>({ svcIdx:0, stepIdx:0, goSvc:()=>{}, goStep:()=>{} });

/* Section IDs — ORDER MATTERS (drives targetY offset) */
const SEC = ['hero','cred','pain','svc','sectors','proj0','proj1','proc','audit','faq','cta'] as const;
const SVC_IDX  = 3;
const PROC_IDX = 7;
const FAQ_IDX  = 9;

/* ══ SNAP SCROLLER ═══════════════════════════════════════════════════════════ */
function SnapScroller({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const trackRef   = useRef<HTMLDivElement>(null);
  const secRef     = useRef(0);
  const [curSec, setCurSec] = useState(0);
  const svcRef     = useRef(0);
  const [svcIdx, setSvcIdx] = useState(0);
  const stepRef    = useRef(0);
  const [stepIdx, setStepIdx] = useState(0);
  const targetY    = useRef(0);
  const animY      = useRef(0);
  const raf        = useRef<number>();
  const lastNav    = useRef(0);
  const vh         = useRef(0);
  const animating  = useRef(false);

  /* lerp tick */
  useEffect(() => {
    if (isMobile) return;
    vh.current = window.innerHeight;
    const tick = () => {
      const d = targetY.current - animY.current;
      animY.current += d * 0.09;
      if (Math.abs(d) < 0.4) { animY.current = targetY.current; animating.current = false; }
      else animating.current = true;
      if (trackRef.current) trackRef.current.style.transform = `translateY(${animY.current}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [isMobile]);

  const goSvc = useCallback((i: number) => {
    const now = Date.now();
    if (now - lastNav.current < 700) return;
    lastNav.current = now;
    svcRef.current = i; setSvcIdx(i);
  }, []);

  const goStep = useCallback((i: number) => {
    const now = Date.now();
    if (now - lastNav.current < 700) return;
    lastNav.current = now;
    stepRef.current = i; setStepIdx(i);
  }, []);

  const goSection = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(SEC.length - 1, idx));
    if (clamped === secRef.current) return;
    const now = Date.now();
    if (now - lastNav.current < 800) return;
    lastNav.current = now;
    secRef.current = clamped; setCurSec(clamped);
    targetY.current = -clamped * vh.current;
  }, []);

  /* nav logic */
  const navigate = useCallback((dir: number) => {
    const now = Date.now();
    if (now - lastNav.current < 700) return;
    const sec = secRef.current;

    if (sec === SVC_IDX) {
      const next = svcRef.current + dir;
      if (dir > 0 && next < SERVICES.length) { lastNav.current = now; svcRef.current = next; setSvcIdx(next); return; }
      if (dir < 0 && next >= 0)              { lastNav.current = now; svcRef.current = next; setSvcIdx(next); return; }
    }
    if (sec === PROC_IDX) {
      const next = stepRef.current + dir;
      if (dir > 0 && next < STEPS.length) { lastNav.current = now; stepRef.current = next; setStepIdx(next); return; }
      if (dir < 0 && next >= 0)           { lastNav.current = now; stepRef.current = next; setStepIdx(next); return; }
    }
    if (sec === FAQ_IDX) {
      const inner = trackRef.current?.children[FAQ_IDX]?.querySelector('[data-faq-scroll]') as HTMLElement | null;
      if (inner) {
        const atTop    = inner.scrollTop <= 10;
        const atBottom = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 10;
        if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) {
          lastNav.current = now; inner.scrollBy({ top: dir * 140, behavior: 'smooth' }); return;
        }
      }
    }
    goSection(sec + dir);
  }, [goSection]);

  useEffect(() => {
    if (isMobile) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) <= 4) return;
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown','PageDown'].includes(e.key)) { e.preventDefault(); navigate(1);  }
      if (['ArrowUp','PageUp'].includes(e.key))     { e.preventDefault(); navigate(-1); }
    };
    let ty = 0;
    const onTS = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTE = (e: TouchEvent) => {
      const d = ty - e.changedTouches[0].clientY;
      if (Math.abs(d) < 50) return;
      navigate(d > 0 ? 1 : -1);
    };
    const onResize = () => {
      vh.current = window.innerHeight;
      animY.current = -secRef.current * vh.current;
      targetY.current = animY.current;
    };
    window.addEventListener('wheel',      onWheel,  { passive: false });
    window.addEventListener('keydown',    onKey);
    window.addEventListener('touchstart', onTS,     { passive: true });
    window.addEventListener('touchend',   onTE,     { passive: true });
    window.addEventListener('resize',     onResize);
    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('keydown',    onKey);
      window.removeEventListener('touchstart', onTS);
      window.removeEventListener('touchend',   onTE);
      window.removeEventListener('resize',     onResize);
    };
  }, [isMobile, navigate]);

  if (isMobile) {
    return (
      <SnapCtx.Provider value={{ svcIdx, stepIdx, goSvc, goStep }}>
        <div style={{ overflowX: 'hidden' }}>{children}</div>
      </SnapCtx.Provider>
    );
  }

  return (
    <SnapCtx.Provider value={{ svcIdx, stepIdx, goSvc, goStep }}>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 1 }}>
        <div ref={trackRef} style={{ willChange: 'transform' }}>
          {children}
        </div>
      </div>
      {/* Dot nav */}
      <nav aria-label="Secciones" style={{ position:'fixed', right:'1.5rem', top:'50%', transform:'translateY(-50%)', zIndex:1000, display:'flex', flexDirection:'column', gap:'0.4rem' }}>
        {SEC.map((_, i) => (
          <button key={i} onClick={() => {
            lastNav.current = Date.now() - 900;
            secRef.current = i; setCurSec(i);
            targetY.current = -i * vh.current;
          }}
            style={{ width:3, height: curSec===i ? 22 : 8, borderRadius:4, border:'none', cursor:'pointer', padding:0, background: curSec===i ? 'var(--accent)' : 'rgba(255,255,255,0.18)', transition:'height 0.4s var(--ease),background 0.4s var(--ease)', boxShadow: curSec===i ? '0 0 8px rgba(61,242,224,0.5)' : 'none' }} />
        ))}
      </nav>
    </SnapCtx.Provider>
  );
}

/* ══ HELPERS ════════════════════════════════════════════════════════════════ */
function TitleHL({ s }: { s: string }) {
  return <>{s.split(/(\*\*[^*]+\*\*)/g).map((p,i) =>
    p.startsWith('**') ? <span key={i} style={{color:'var(--accent)'}}>{p.slice(2,-2)}</span> : <span key={i}>{p}</span>
  )}</>;
}

function useReveal(thr = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el || v) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: thr });
    obs.observe(el); return () => obs.disconnect();
  }, [v, thr]);
  return { ref, v };
}

const pad = 'clamp(2rem,7vw,7rem)';
const SEC_H: React.CSSProperties = { height:'100dvh', overflow:'hidden', position:'relative', display:'flex', flexDirection:'column', padding:`clamp(1.5rem,3vw,2.5rem) ${pad}` };

/* ══ HERO ═══════════════════════════════════════════════════════════════════ */
function HeroSection({ wa, email }: { wa: string; email: string }) {
  const logoRef = useRef<HTMLDivElement>(null);
  const h1Ref   = useRef<HTMLHeadingElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);

  /* 3D float + mouse tilt */
  useEffect(() => {
    const logo = logoRef.current; if (!logo) return;
    let tx = 0, ty = 0, fx = 0, fy = 0, flt = 0, id: number;
    const tick = (t: number) => {
      flt = Math.sin(t * 0.0008) * 6;
      fx += (tx - fx) * 0.06; fy += (ty - fy) * 0.06;
      logo.style.transform = `perspective(800px) rotateX(${fy}deg) rotateY(${fx}deg) translateY(${flt}px)`;
      id = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) *  10;
      ty = (e.clientY / window.innerHeight - 0.5) * -8;
    };
    window.addEventListener('mousemove', onMove);
    id = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(id); };
  }, []);

  /* entrance stagger */
  useEffect(() => {
    const els = [logoRef.current, h1Ref.current, subRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, delay: i * 0.14 + 0.1, ease: 'power3.out' });
    });
  }, []);

  return (
    <section style={{ ...SEC_H, justifyContent:'center', alignItems:'center', textAlign:'center', background:'var(--bg)' }}>
      {/* blobs */}
      <div aria-hidden style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', filter:'blur(100px)' }}>
        <div style={{ position:'absolute', width:'60vw', height:'60vw', top:'-20%', right:'-15%', background:'radial-gradient(circle, rgba(61,242,224,0.1) 0%, transparent 70%)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', width:'40vw', height:'40vw', bottom:'-10%', left:'-10%', background:'radial-gradient(circle, rgba(61,242,224,0.05) 0%, transparent 70%)', borderRadius:'50%' }} />
      </div>

      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center' }}>
        {/* 3D brand mark */}
        <div ref={logoRef} style={{ marginBottom:'2.5rem', display:'inline-block', willChange:'transform', cursor:'default', userSelect:'none' }}>
          <span style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(2.8rem,7vw,5.5rem)', fontWeight:900, letterSpacing:'-0.04em', textShadow:'0 0 60px rgba(61,242,224,0.25)' }}>
            <span style={{color:'var(--white)'}}>agonz</span>
            <span style={{color:'var(--accent)'}}>{'{'}x{'}'}</span>
          </span>
        </div>

        <h1 ref={h1Ref} style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(2rem,5.5vw,4.8rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.03em', lineHeight:0.95, color:'var(--white)', margin:'0 0 1.5rem 0' }}>
          Menos tareas.<br />
          Menos caos.<br />
          <span style={{color:'var(--accent)'}}>Más negocio.</span>
        </h1>

        <p ref={subRef} style={{ fontFamily:'Safiro,sans-serif', fontSize:'clamp(0.95rem,1.5vw,1.1rem)', lineHeight:1.8, color:'var(--t2)', maxWidth:480, margin:'0 0 2.5rem' }}>
          Software a medida y automatización de procesos para empresas que han crecido más rápido que sus herramientas.
        </p>

        <div ref={ctaRef} style={{ display:'flex', gap:'0.9rem', flexWrap:'wrap', justifyContent:'center' }}>
          <a href={wa} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.9rem', fontWeight:700, color:'#0B0F14', background:'var(--accent)', padding:'0.9rem 2rem', borderRadius:100, textDecoration:'none', boxShadow:'0 4px 24px rgba(61,242,224,0.3)', transition:'opacity 0.2s,transform 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-2px)';}}
            onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='';}}>
            Pide tu auditoría gratis →
          </a>
          <a href="#svc"
            style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.9rem', fontWeight:600, color:'var(--white)', padding:'0.9rem 2rem', borderRadius:100, textDecoration:'none', border:'1px solid rgba(255,255,255,0.1)', transition:'border-color 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(61,242,224,0.4)')}
            onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.1)')}>
            Ver servicios
          </a>
        </div>
      </div>

      {/* scroll hint */}
      <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', opacity:0.3 }}>
        <div style={{ width:26, height:42, borderRadius:13, border:'1.5px solid var(--accent)', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:6 }}>
          <div style={{ width:3, height:7, borderRadius:2, background:'var(--accent)', animation:'sDot 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}

/* ══ CREDIBILITY ════════════════════════════════════════════════════════════ */
function CredSection() {
  const { ref, v } = useReveal(0.05);
  return (
    <section style={{ ...SEC_H, justifyContent:'center', background:'var(--bg2)' }}>
      <div ref={ref} className="cred-grid" style={{ opacity:v?1:0, transform:v?'none':'translateY(32px)', transition:'all 0.75s var(--ease)' }}>
        <div>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--accent)', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:'1.5rem' }}>Quién hay detrás</p>
          <h2 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.025em', lineHeight:1.02, color:'var(--white)', margin:'0 0 2rem' }}>
            Experiencia real.<br /><span style={{color:'var(--accent)'}}>Enfoque directo.</span>
          </h2>
          <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'clamp(0.9rem,1.2vw,1rem)', lineHeight:1.85, color:'var(--t2)', maxWidth:520, margin:'0 0 1.25rem' }}>
            Software engineer con más de 5 años en empresas tecnológicas internacionales. He construido apps que usan millones de personas, sistemas de streaming, herramientas de producto.
          </p>
          <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'clamp(0.9rem,1.2vw,1rem)', lineHeight:1.85, color:'var(--t2)', maxWidth:520, margin:0 }}>
            Aplico esa experiencia a un problema diferente: ordenar la operativa interna de empresas con herramientas bien construidas. Sin agencias — hablas directamente con quien diseña y entrega.
          </p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'2.5rem', paddingTop:'0.5rem' }}>
          {[['5+','años construyendo software en producción'],['20M','usuarios en apps donde he trabajado'],['1','punto de contacto directo — sin intermediarios']].map(([val,lbl],i)=>(
            <div key={i}>
              <div style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(2.2rem,5vw,3.8rem)', fontWeight:900, color:'var(--accent)', letterSpacing:'-0.03em', lineHeight:1 }}>{val}</div>
              <div style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.85rem', color:'var(--t2)', lineHeight:1.55, marginTop:'0.4rem' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ PAIN BENTO ════════════════════════════════════════════════════════════ */
function PainCard({ item, delay }: { item: typeof PAIN_POINTS[0]; delay: number }) {
  const { ref, v } = useReveal(0.05);
  const cRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);
  const isWide = item.span === 2;

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const c=cRef.current,s=sRef.current; if(!c)return;
    const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    c.style.transform=`perspective(700px) rotateX(${((y-r.height/2)/r.height)*-6}deg) rotateY(${((x-r.width/2)/r.width)*6}deg) scale3d(1.015,1.015,1.015)`;
    c.style.transition='box-shadow 0.2s';
    c.style.boxShadow='0 12px 36px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)';
    if(s){s.style.background=`radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,255,255,0.09) 0%, transparent 65%)`;s.style.opacity='1';}
  }, []);
  const onLeave = useCallback(() => {
    const c=cRef.current,s=sRef.current;
    if(c){c.style.transition='transform 0.55s var(--ease),box-shadow 0.4s';c.style.transform='';c.style.boxShadow='';}
    if(s)s.style.opacity='0';
  }, []);

  return (
    <div ref={ref} style={{ gridColumn:`span ${item.span}`, opacity:v?1:0, transform:v?'none':'translateY(28px)', transition:`opacity 0.65s ${delay}s var(--ease),transform 0.65s ${delay}s var(--ease)` }}>
      <div ref={cRef} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ borderRadius:20, background:'var(--card)', border:'1px solid var(--brd)', position:'relative', overflow:'hidden', transformStyle:'preserve-3d', willChange:'transform', boxShadow:'0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
          height:'100%', minHeight: isWide ? 160 : 200,
          display:'flex', flexDirection: isWide ? 'row' : 'column', alignItems: isWide ? 'center' : 'flex-start',
          gap: isWide ? '2rem' : '1rem', padding: isWide ? '1.5rem 2rem' : '1.75rem' }}>
        <div ref={sRef} style={{ position:'absolute', inset:0, borderRadius:'inherit', pointerEvents:'none', opacity:0, transition:'opacity 0.3s' }} />
        {/* accent left bar */}
        <div style={{ position:'absolute', left:0, top:'20%', bottom:'20%', width:3, background:'var(--accent)', borderRadius:'0 3px 3px 0', opacity:0.5 }} />
        <div style={{ width:42, height:42, borderRadius:10, background:'rgba(61,242,224,0.06)', border:'1px solid rgba(61,242,224,0.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, position:'relative', zIndex:1 }}>
          {item.icon}
        </div>
        <div style={{ position:'relative', zIndex:1, flexGrow:1 }}>
          <h3 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(0.9rem,1.3vw,1.05rem)', fontWeight:800, letterSpacing:'-0.01em', color:'var(--white)', margin:'0 0 0.6rem', textTransform:'uppercase' }}>{item.heading}</h3>
          <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.84rem', lineHeight:1.7, color:'var(--t2)', margin:0 }}>{item.body}</p>
        </div>
      </div>
    </div>
  );
}

function PainSection() {
  const { ref, v } = useReveal(0.05);
  return (
    <section style={{ ...SEC_H, justifyContent:'center', background:'var(--bg)' }}>
      <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(28px)', transition:'all 0.7s var(--ease)', marginBottom:'2.5rem', flexShrink:0 }}>
        <h2 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.9rem,4.5vw,3.6rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.025em', lineHeight:1.02, color:'var(--white)', margin:0 }}>
          ¿Te suenan estos<br /><span style={{color:'var(--accent)'}}>problemas?</span>
        </h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.85rem', flex:1, alignContent:'start' }}>
        {PAIN_POINTS.map((p,i) => <PainCard key={i} item={p} delay={i*0.05} />)}
      </div>
    </section>
  );
}

/* ══ SERVICES (carousel, controlled by SnapScroller) ══════════════════════ */
function ServicesSection() {
  const { svcIdx, goSvc } = useContext(SnapCtx);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevIdx = useRef(0);

  useEffect(() => {
    const el = contentRef.current; if (!el) return;
    const dir = svcIdx > prevIdx.current ? 1 : -1;
    prevIdx.current = svcIdx;
    gsap.timeline()
      .to(el,  { opacity:0, y: dir*-24, duration:0.22, ease:'power2.in' })
      .set(el,  { y: dir*24 })
      .to(el,  { opacity:1, y:0, duration:0.44, ease:'power3.out' });
  }, [svcIdx]);

  const svc = SERVICES[svcIdx];

  return (
    <section id="svc" style={{ ...SEC_H, background:'var(--bg2)' }}>
      {/* progress bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'rgba(255,255,255,0.05)' }}>
        <div style={{ height:'100%', width:`${((svcIdx+1)/SERVICES.length)*100}%`, background:'var(--accent)', transition:'width 0.5s var(--ease)' }} />
      </div>

      {/* header row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'0.5rem', flexShrink:0, marginBottom:'clamp(1.5rem,3vw,2.5rem)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--accent)', letterSpacing:'0.14em', textTransform:'uppercase' }}>Servicios</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--t3)', letterSpacing:'0.1em' }}>{String(svcIdx+1).padStart(2,'0')} / {String(SERVICES.length).padStart(2,'0')}</span>
      </div>

      {/* content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minHeight:0, position:'relative' }}>
        {/* large dim number */}
        <div aria-hidden style={{ position:'absolute', right:'-0.05em', bottom:'-0.15em', fontFamily:'Nohemi,sans-serif', fontWeight:900, fontSize:'clamp(10rem,28vw,26rem)', letterSpacing:'-0.05em', lineHeight:1, color:'rgba(255,255,255,0.025)', pointerEvents:'none', userSelect:'none', zIndex:0 }}>
          {svc.num}
        </div>

        <div ref={contentRef} style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', justifyContent:'center', flex:1 }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--t3)', letterSpacing:'0.12em', textTransform:'uppercase', display:'block', marginBottom:'1rem' }}>
            {svc.num} · {svc.category}
          </span>
          <h2 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.8rem,4.2vw,3.8rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.025em', lineHeight:1.02, color:'var(--white)', margin:'0 0 1.5rem', whiteSpace:'pre-line', maxWidth:800 }}>
            <TitleHL s={svc.title} />
          </h2>
          <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'clamp(0.9rem,1.3vw,1rem)', lineHeight:1.82, color:'var(--t2)', maxWidth:560, marginBottom:'1.5rem' }}>
            {svc.desc}
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem', marginBottom:'1.75rem' }}>
            {svc.tags.map(t => <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'0.54rem', letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.22rem 0.65rem', border:'1px solid rgba(61,242,224,0.2)', borderRadius:4, color:'rgba(61,242,224,0.7)' }}>{t}</span>)}
          </div>
          <div style={{ display:'inline-flex', flexDirection:'column', gap:'0.4rem', padding:'1rem 1.5rem', background:'rgba(61,242,224,0.04)', border:'1px solid rgba(61,242,224,0.12)', borderRadius:12, alignSelf:'flex-start' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.54rem', color:'var(--accent)', letterSpacing:'0.12em', textTransform:'uppercase' }}>Resultado</span>
            <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.88rem', lineHeight:1.65, color:'var(--white)', margin:0 }}>{svc.gain}</p>
          </div>
        </div>
      </div>

      {/* dot nav */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0, paddingTop:'1rem' }}>
        <div style={{ display:'flex', gap:'0.4rem' }}>
          {SERVICES.map((_,i) => (
            <button key={i} onClick={() => goSvc(i)} style={{ width:i===svcIdx?22:6, height:6, borderRadius:3, border:'none', background:i===svcIdx?'var(--accent)':'rgba(255,255,255,0.15)', transition:'all 0.35s var(--ease)', cursor:'pointer', padding:0 }} />
          ))}
        </div>
        <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', color:'var(--t3)', letterSpacing:'0.1em', textTransform:'uppercase' }}>scroll</span>
          <button onClick={() => goSvc(Math.max(0,svcIdx-1))} disabled={svcIdx===0} style={{ width:38, height:38, borderRadius:'50%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', cursor:svcIdx===0?'not-allowed':'pointer', opacity:svcIdx===0?0.3:1, color:'var(--white)', fontSize:'0.9rem', display:'flex', alignItems:'center', justifyContent:'center', transition:'opacity 0.2s' }}>↑</button>
          <button onClick={() => goSvc(Math.min(SERVICES.length-1,svcIdx+1))} disabled={svcIdx===SERVICES.length-1} style={{ width:38, height:38, borderRadius:'50%', background:svcIdx===SERVICES.length-1?'rgba(255,255,255,0.04)':'var(--accent)', border:'none', cursor:svcIdx===SERVICES.length-1?'not-allowed':'pointer', opacity:svcIdx===SERVICES.length-1?0.3:1, color:svcIdx===SERVICES.length-1?'var(--white)':'#0B0F14', fontSize:'0.9rem', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>↓</button>
        </div>
      </div>
    </section>
  );
}

/* ══ SECTORS ═══════════════════════════════════════════════════════════════ */
function SectorCard({ s, delay }: { s: typeof SECTORS[0]; delay: number }) {
  const { ref, v } = useReveal(0.05);
  const cRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const c=cRef.current,sh=sRef.current; if(!c)return;
    const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    c.style.transform=`perspective(700px) rotateX(${((y-r.height/2)/r.height)*-5}deg) rotateY(${((x-r.width/2)/r.width)*5}deg) scale3d(1.02,1.02,1.02)`;
    c.style.transition='box-shadow 0.2s'; c.style.boxShadow='0 10px 30px rgba(0,0,0,0.5)';
    if(sh){sh.style.background=`radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,255,255,0.1) 0%, transparent 65%)`;sh.style.opacity='1';}
  }, []);
  const onLeave = useCallback(() => {
    const c=cRef.current,sh=sRef.current;
    if(c){c.style.transition='transform 0.55s var(--ease),box-shadow 0.4s';c.style.transform='';c.style.boxShadow='';}
    if(sh)sh.style.opacity='0';
  }, []);
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(28px)', transition:`opacity 0.65s ${delay}s var(--ease),transform 0.65s ${delay}s var(--ease)` }}>
      <div ref={cRef} onMouseMove={onMove} onMouseLeave={onLeave}
        style={{ borderRadius:16, background:'var(--elev)', border:'1px solid rgba(255,255,255,0.08)', position:'relative', overflow:'hidden', transformStyle:'preserve-3d', willChange:'transform', minHeight:260, display:'flex', flexDirection:'column', padding:'1.75rem', boxShadow:'0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
        <div ref={sRef} style={{ position:'absolute', inset:0, borderRadius:'inherit', pointerEvents:'none', opacity:0, transition:'opacity 0.3s' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ width:44, height:44, borderRadius:10, background:'rgba(61,242,224,0.06)', border:'1px solid rgba(61,242,224,0.13)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>{s.icon}</div>
          <h3 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.92rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'-0.01em', color:'var(--white)', margin:'0 0 1rem' }}>{s.title}</h3>
          <ul style={{ padding:0, margin:0, listStyle:'none', display:'flex', flexDirection:'column', gap:'0.4rem' }}>
            {s.examples.map((ex,i) => (
              <li key={i} style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.82rem', lineHeight:1.55, color:'var(--t2)', display:'flex', gap:'0.5rem', alignItems:'flex-start' }}>
                <span style={{ color:'var(--accent)', fontFamily:'var(--font-mono)', fontSize:'0.6rem', flexShrink:0, marginTop:'0.2rem' }}>—</span>{ex}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SectorsSection() {
  const { ref, v } = useReveal(0.05);
  return (
    <section style={{ ...SEC_H, justifyContent:'center', background:'var(--bg)' }}>
      <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(28px)', transition:'all 0.7s var(--ease)', marginBottom:'2.5rem', flexShrink:0 }}>
        <h2 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.9rem,4.5vw,3.6rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.025em', lineHeight:1.02, color:'var(--white)', margin:0 }}>
          Para quién <span style={{color:'var(--accent)'}}>trabajo.</span>
        </h2>
        <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'clamp(0.9rem,1.2vw,1rem)', lineHeight:1.78, color:'var(--t2)', marginTop:'1rem', maxWidth:460 }}>Negocios con procesos sin digitalizar o herramientas que no les sirven.</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'1rem', flex:1, alignContent:'start' }}>
        {SECTORS.map((s,i) => <SectorCard key={i} s={s} delay={i*0.07} />)}
      </div>
    </section>
  );
}

/* ══ PROJECT SECTION (each project = 1 full section) ═════════════════════ */
function TimingCarousel({ shots, device }: { shots: string[]; device: string }) {
  const [active, setActive] = useState(0);
  const aRef = useRef(0);
  const pausedRef = useRef(false);
  const INTER = 3800;
  useEffect(() => {
    if (shots.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) { const n=(aRef.current+1)%shots.length; aRef.current=n; setActive(n); }
    }, INTER);
    return () => clearInterval(id);
  }, [shots.length]);
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', borderRadius:16, overflow:'hidden' }}
      onMouseEnter={() => { pausedRef.current=true; }}
      onMouseLeave={() => { pausedRef.current=false; }}>
      {shots.map((src,i) => (
        <img key={src} src={src} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit: device==='mobile' ? 'contain' : 'cover', objectPosition:'top', opacity:i===active?1:0, transition:'opacity 0.9s ease', userSelect:'none', pointerEvents:'none' }} />
      ))}
      {/* timing bar */}
      {shots.length > 1 && (
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'rgba(255,255,255,0.1)' }}>
          <div key={`tb-${active}`} style={{ height:'100%', background:'var(--accent)', animation:`tbAnim ${INTER}ms linear forwards` }} />
        </div>
      )}
      {/* dots */}
      {shots.length > 1 && (
        <div style={{ position:'absolute', bottom:'0.85rem', left:0, right:0, display:'flex', justifyContent:'center', gap:'0.35rem', zIndex:2 }}>
          {shots.map((_,i) => (
            <button key={i} onClick={() => { aRef.current=i; setActive(i); }}
              style={{ width:i===active?20:6, height:6, borderRadius:3, border:'none', background:i===active?'var(--accent)':'rgba(255,255,255,0.25)', transition:'all 0.3s', padding:0, cursor:'pointer' }} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectSection({ project, bg }: { project: { label:string; name:string; desc:string; tags:string[]; shots:string[]; device:string; isPwa?:boolean }; bg: string }) {
  const { ref, v } = useReveal(0.05);
  return (
    <section style={{ ...SEC_H, justifyContent:'center', background: bg }}>
      <div ref={ref} className="proj-grid" style={{ opacity:v?1:0, transition:'opacity 0.75s var(--ease)', flex:1, display:'flex', alignItems:'center', gap:'4rem', minHeight:0 }}>
        {/* LEFT: info */}
        <div style={{ flex:'0 0 42%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.56rem', color:'var(--accent)', letterSpacing:'0.14em', textTransform:'uppercase', margin:'0 0 1.25rem' }}>{project.label}</p>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem', flexWrap:'wrap' }}>
            <h2 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.5rem,3vw,2.6rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.025em', lineHeight:1.02, color:'var(--white)', margin:0 }}>{project.name}</h2>
            {project.isPwa && <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.2rem 0.55rem', background:'rgba(61,242,224,0.1)', border:'1px solid rgba(61,242,224,0.25)', borderRadius:4, color:'var(--accent)', flexShrink:0 }}>PWA</span>}
          </div>
          <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'clamp(0.85rem,1.15vw,0.98rem)', lineHeight:1.82, color:'var(--t2)', margin:'0 0 1.5rem' }}>{project.desc}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.3rem' }}>
            {project.tags.map(t => <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'0.52rem', letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.2rem 0.55rem', background:'rgba(255,255,255,0.05)', borderRadius:4, color:'var(--t3)' }}>{t}</span>)}
          </div>
        </div>

        {/* RIGHT: gallery */}
        <div style={{ flex:1, height:'clamp(260px,55vh,480px)', background:'var(--card)', borderRadius:16, overflow:'hidden', border:'1px solid var(--brd)', padding: project.device==='mobile' ? '1.5rem 3rem 0' : '0' }}>
          <TimingCarousel shots={project.shots} device={project.device} />
        </div>
      </div>
    </section>
  );
}

/* ══ PROCESS (scroll-stepped, timeline nav) ══════════════════════════════ */
function ProcessSection() {
  const { stepIdx, goStep } = useContext(SnapCtx);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevIdx = useRef(0);

  useEffect(() => {
    const el = contentRef.current; if (!el) return;
    const dir = stepIdx > prevIdx.current ? 1 : -1;
    prevIdx.current = stepIdx;
    gsap.timeline()
      .to(el,  { opacity:0, x: dir*-20, duration:0.2, ease:'power2.in' })
      .set(el,  { x: dir*20 })
      .to(el,  { opacity:1, x:0, duration:0.42, ease:'power3.out' });
  }, [stepIdx]);

  const step = STEPS[stepIdx];

  return (
    <section style={{ ...SEC_H, background:'var(--bg2)' }}>
      {/* progress bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'rgba(255,255,255,0.05)' }}>
        <div style={{ height:'100%', width:`${((stepIdx+1)/STEPS.length)*100}%`, background:'var(--accent)', transition:'width 0.5s var(--ease)' }} />
      </div>

      {/* header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'0.5rem', flexShrink:0, marginBottom:'clamp(1.5rem,3vw,2.5rem)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--accent)', letterSpacing:'0.14em', textTransform:'uppercase' }}>El proceso</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--t3)', letterSpacing:'0.1em' }}>{String(stepIdx+1).padStart(2,'0')} / {String(STEPS.length).padStart(2,'0')}</span>
      </div>

      <div className="proc-grid" style={{ flex:1, display:'grid', gap:'4rem', minHeight:0, alignItems:'center' }}>
        {/* LEFT: timeline nav */}
        <div style={{ position:'relative', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          {/* line track */}
          <div style={{ position:'absolute', left:11, top:0, bottom:0, width:1, background:'rgba(255,255,255,0.08)' }} />
          {/* active line */}
          <div style={{ position:'absolute', left:11, top:0, height:`${(stepIdx/(STEPS.length-1))*100}%`, width:1, background:'var(--accent)', transition:'height 0.5s var(--ease)' }} />

          {STEPS.map((s,i) => (
            <button key={i} onClick={() => goStep(i)}
              style={{ display:'flex', alignItems:'center', gap:'1rem', background:'none', border:'none', cursor:'pointer', textAlign:'left', padding:'0.75rem 0', position:'relative', zIndex:1 }}>
              {/* dot */}
              <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0, border:`2px solid ${i<=stepIdx?'var(--accent)':'rgba(255,255,255,0.12)'}`, background:i===stepIdx?'var(--accent)':i<stepIdx?'rgba(61,242,224,0.15)':'var(--bg2)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.4s var(--ease)' }}>
                {i < stepIdx && <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', color:'var(--accent)' }}>✓</span>}
              </div>
              <span style={{ fontFamily:'Nohemi,sans-serif', fontSize:i===stepIdx?'0.92rem':'0.78rem', fontWeight:i===stepIdx?800:500, color:i<=stepIdx?'var(--white)':'var(--t3)', textTransform:'uppercase', letterSpacing:'-0.01em', transition:'all 0.35s var(--ease)', opacity:i>stepIdx?0.35:1 }}>
                {s.heading}
              </span>
            </button>
          ))}
        </div>

        {/* RIGHT: content */}
        <div ref={contentRef} style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
          {/* large step number watermark */}
          <div aria-hidden style={{ fontFamily:'Nohemi,sans-serif', fontWeight:900, fontSize:'clamp(6rem,18vw,16rem)', lineHeight:0.85, color:'rgba(255,255,255,0.025)', letterSpacing:'-0.05em', marginBottom:'-0.1em', userSelect:'none' }}>{step.num}</div>
          <h3 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.5rem,3vw,2.6rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.02em', lineHeight:1.02, color:'var(--white)', margin:'0 0 1.5rem' }}>
            {step.heading}
          </h3>
          <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'clamp(0.92rem,1.3vw,1.05rem)', lineHeight:1.85, color:'var(--t2)', margin:0, maxWidth:500 }}>
            {step.body}
          </p>
        </div>
      </div>

      {/* bottom nav */}
      <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.5rem', flexShrink:0, paddingTop:'1rem' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', color:'var(--t3)', letterSpacing:'0.1em', textTransform:'uppercase', alignSelf:'center', marginRight:'0.5rem' }}>scroll</span>
        <button onClick={() => goStep(Math.max(0,stepIdx-1))} disabled={stepIdx===0} style={{ width:38, height:38, borderRadius:'50%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', cursor:stepIdx===0?'not-allowed':'pointer', opacity:stepIdx===0?0.3:1, color:'var(--white)', display:'flex', alignItems:'center', justifyContent:'center', transition:'opacity 0.2s' }}>↑</button>
        <button onClick={() => goStep(Math.min(STEPS.length-1,stepIdx+1))} disabled={stepIdx===STEPS.length-1} style={{ width:38, height:38, borderRadius:'50%', background:stepIdx===STEPS.length-1?'rgba(255,255,255,0.04)':'var(--accent)', border:'none', cursor:stepIdx===STEPS.length-1?'not-allowed':'pointer', opacity:stepIdx===STEPS.length-1?0.3:1, color:stepIdx===STEPS.length-1?'var(--white)':'#0B0F14', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>↓</button>
      </div>
    </section>
  );
}

/* ══ AUDIT ══════════════════════════════════════════════════════════════════ */
function AuditSection({ wa, email }: { wa:string; email:string }) {
  const { ref, v } = useReveal(0.05);
  return (
    <section style={{ ...SEC_H, justifyContent:'center', background:'var(--bg)' }}>
      <div ref={ref} className="audit-grid" style={{ opacity:v?1:0, transform:v?'none':'translateY(28px)', transition:'all 0.75s var(--ease)', width:'100%', padding:'clamp(2rem,4vw,3.5rem)', border:'1px solid rgba(61,242,224,0.2)', borderRadius:20, background:'rgba(61,242,224,0.02)' }}>
        <div>
          <h2 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.6rem,3vw,2.6rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.025em', lineHeight:1.02, color:'var(--white)', margin:'0 0 1.25rem' }}>
            Auditoría inicial <span style={{color:'var(--accent)'}}>gratuita.</span>
          </h2>
          <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.95rem', lineHeight:1.85, color:'var(--t2)', margin:'0 0 1.5rem', maxWidth:460 }}>
            Reviso tus procesos, identifico los puntos de fricción reales y te digo qué veo con criterio técnico. Sin que tengas que saber de tecnología.
          </p>
          <ul style={{ padding:0, margin:'0 0 2rem', listStyle:'none', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {['Análisis de procesos que más tiempo consumen','Tareas con mayor potencial de automatización','Evaluación honesta de qué abordar primero','Propuesta orientada a impacto real'].map((item,i) => (
              <li key={i} style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.9rem', color:'var(--t2)', display:'flex', gap:'0.65rem', alignItems:'flex-start' }}>
                <span style={{ color:'var(--accent)', fontFamily:'var(--font-mono)', fontSize:'0.7rem', flexShrink:0, marginTop:'0.15rem' }}>✓</span>{item}
              </li>
            ))}
          </ul>
          <div style={{ display:'flex', gap:'0.9rem', flexWrap:'wrap' }}>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.9rem', fontWeight:700, color:'#0B0F14', background:'var(--accent)', padding:'0.9rem 2rem', borderRadius:100, textDecoration:'none', boxShadow:'0 4px 20px rgba(61,242,224,0.3)', transition:'opacity 0.2s,transform 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-2px)';}}
              onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='';}}>
              Solicitar auditoría →
            </a>
            <a href={email} style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.9rem', fontWeight:600, color:'var(--white)', padding:'0.9rem 2rem', borderRadius:100, textDecoration:'none', border:'1px solid rgba(255,255,255,0.1)', transition:'border-color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(61,242,224,0.4)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.1)')}>
              Escribir un email
            </a>
          </div>
        </div>
        <div style={{ background:'var(--card)', border:'1px solid var(--brd)', borderRadius:16, overflow:'hidden' }}>
          <div style={{ padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--brd)' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.54rem', color:'var(--t3)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Resultado habitual</span>
          </div>
          {[['4h / día','20 min','en tareas admin'],['WhatsApp','Dashboard','para gestión interna'],['Excel','Tiempo real','para seguimiento'],['Llamadas','Registro','para aprobaciones']].map(([from,to,lbl],i) => (
            <div key={i} style={{ padding:'1rem 1.5rem', borderBottom:i<3?'1px solid rgba(255,255,255,0.04)':'none', display:'flex', alignItems:'center', gap:'0.65rem', flexWrap:'wrap' }}>
              <span style={{ fontFamily:'Nohemi,sans-serif', fontWeight:700, color:'var(--t3)', fontSize:'0.85rem', textDecoration:'line-through', flexShrink:0 }}>{from}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--t3)' }}>→</span>
              <span style={{ fontFamily:'Nohemi,sans-serif', fontWeight:900, color:'var(--accent)', fontSize:'0.95rem', flexShrink:0 }}>{to}</span>
              <span style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.76rem', color:'var(--t2)' }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ FAQ ════════════════════════════════════════════════════════════════════ */
function FAQItem({ q, a }: { q:string; a:string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop:'1px solid var(--brd)' }}>
      <button onClick={() => setOpen(o=>!o)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1.5rem', padding:'1.5rem 0', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
        <span style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(0.9rem,1.6vw,1.05rem)', fontWeight:700, letterSpacing:'-0.01em', color:'var(--white)' }}>{q}</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'1.1rem', color:'var(--accent)', flexShrink:0, transition:'transform 0.25s var(--ease)', transform:open?'rotate(45deg)':'none' }}>+</span>
      </button>
      <div style={{ overflow:'hidden', maxHeight:open?'200px':'0', transition:'max-height 0.35s var(--ease)' }}>
        <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.92rem', lineHeight:1.78, color:'var(--t2)', margin:'0 0 1.5rem', maxWidth:580 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  const { ref, v } = useReveal(0.05);
  return (
    <section style={{ ...SEC_H, justifyContent:'center', background:'var(--bg2)' }}>
      <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(28px)', transition:'all 0.75s var(--ease)', marginBottom:'2.5rem', flexShrink:0 }}>
        <h2 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.7rem,3.5vw,3rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.025em', lineHeight:1.02, color:'var(--white)', margin:0 }}>
          <span style={{color:'var(--accent)'}}>Preguntas</span> frecuentes.
        </h2>
      </div>
      <div data-faq-scroll style={{ flex:1, overflowY:'auto', maxWidth:720, paddingRight:'0.5rem' }}>
        {FAQS.map((f,i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        <div style={{ borderTop:'1px solid var(--brd)' }} />
      </div>
    </section>
  );
}

/* ══ CTA + FOOTER ═══════════════════════════════════════════════════════════ */
function CTAFooter({ wa, email }: { wa:string; email:string }) {
  const { ref, v } = useReveal(0.05);
  const markRef = useRef<HTMLDivElement>(null);
  const markTextRef = useRef<HTMLSpanElement>(null);

  /* fit wordmark to container width */
  useEffect(() => {
    const fit = () => {
      const c = markRef.current; const t = markTextRef.current; if (!c || !t) return;
      t.style.fontSize = '16vw'; // reset
      requestAnimationFrame(() => {
        if (!c || !t) return;
        const scale = c.clientWidth / t.scrollWidth;
        t.style.fontSize = `${16 * Math.min(scale, 1.05)}vw`;
      });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <section style={{ ...SEC_H, justifyContent:'space-between', background:'var(--bg)', paddingBottom:'1.5rem' }}>
      {/* bg glow */}
      <div aria-hidden style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', filter:'blur(120px)' }}>
        <div style={{ position:'absolute', width:'50vw', height:'50vw', top:'-15%', right:'-10%', background:'radial-gradient(circle, rgba(61,242,224,0.08) 0%, transparent 70%)', borderRadius:'50%' }} />
      </div>

      <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(24px)', transition:'all 0.75s var(--ease)', position:'relative', zIndex:1, display:'flex', flexDirection:'column', flex:1 }}>

        {/* CTA area */}
        <div className="cta-flex" style={{ display:'flex', alignItems:'center', gap:'4rem', flex:1, paddingTop:'clamp(1rem,3vw,2.5rem)' }}>
          {/* text */}
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(2.2rem,5vw,4.5rem)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.03em', lineHeight:0.95, color:'var(--white)', margin:'0 0 1.5rem' }}>
              ¿Tienes un<br />negocio que<br /><span style={{color:'var(--accent)'}}>mejorar?</span>
            </h2>
            <p style={{ fontFamily:'Safiro,sans-serif', fontSize:'clamp(0.9rem,1.3vw,1rem)', lineHeight:1.8, color:'var(--t2)', maxWidth:380, margin:'0 0 2rem' }}>
              La primera conversación es gratis. Cuéntame cómo funciona tu negocio y te digo qué veo.
            </p>
            <div style={{ display:'flex', gap:'0.9rem', flexWrap:'wrap' }}>
              <a href={wa} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.9rem', fontWeight:700, color:'#0B0F14', background:'var(--accent)', padding:'0.95rem 2.1rem', borderRadius:100, textDecoration:'none', boxShadow:'0 4px 24px rgba(61,242,224,0.3)', transition:'opacity 0.2s,transform 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='';}}>
                Hablemos por WhatsApp →
              </a>
              <a href={email} style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.9rem', fontWeight:600, color:'var(--white)', padding:'0.95rem 2.1rem', borderRadius:100, textDecoration:'none', border:'1px solid rgba(255,255,255,0.12)', transition:'border-color 0.2s,transform 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(61,242,224,0.4)';e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.transform='';}}>
                Escribir un email
              </a>
            </div>
          </div>

          {/* photo */}
          <div className="cta-photo" style={{ flexShrink:0, position:'relative' }}>
            <div style={{ position:'absolute', inset:-3, borderRadius:'50%', background:'conic-gradient(from 0deg, var(--accent) 0%, transparent 40%, transparent 60%, var(--accent) 100%)', opacity:0.4, animation:'photoSpin 10s linear infinite' }} />
            <div style={{ position:'relative', width:'clamp(160px,18vw,260px)', height:'clamp(160px,18vw,260px)', borderRadius:'50%', overflow:'hidden', border:'2px solid rgba(61,242,224,0.2)' }}>
              <img src="/profile.jpg" alt="Antonio González" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} />
            </div>
          </div>
        </div>

        {/* divider */}
        <div style={{ height:1, background:'rgba(255,255,255,0.06)', margin:'clamp(1rem,2vw,2rem) 0 0' }} />

        {/* full-width wordmark */}
        <div ref={markRef} style={{ overflow:'hidden', marginTop:'clamp(0.75rem,1.5vw,1.5rem)', lineHeight:0.82 }}>
          <span ref={markTextRef} style={{ fontFamily:'Nohemi,sans-serif', fontWeight:900, fontSize:'16vw', letterSpacing:'-0.04em', whiteSpace:'nowrap', display:'inline-block', userSelect:'none' }}>
            <span style={{color:'var(--white)'}}>agonz</span>
            <span style={{color:'var(--accent)'}}>{'{'}x{'}'}</span>
          </span>
        </div>

        {/* footer bar */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'0.75rem', flexWrap:'wrap', gap:'0.75rem' }}>
          <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
            <a href="tel:+34711514735" style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--t3)', letterSpacing:'0.08em', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>(e.currentTarget.style.color='var(--t2)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--t3)')}>+34 711 514 735</a>
            <a href={email}           style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--t3)', letterSpacing:'0.08em', textDecoration:'none', transition:'color 0.2s' }} onMouseEnter={e=>(e.currentTarget.style.color='var(--t2)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--t3)')}>contacto@agonzx.dev</a>
          </div>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', color:'var(--t3)', letterSpacing:'0.08em' }}>© 2026</span>
        </div>
      </div>
    </section>
  );
}

/* ══ MAIN ═══════════════════════════════════════════════════════════════════ */
export default function Servicios() {
  const wa    = 'https://wa.me/34711514735?text=Hola%20Antonio%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20c%C3%B3mo%20mejorar%20la%20operativa%20de%20mi%20negocio';
  const email = 'mailto:contacto@agonzx.dev?subject=Consulta%20de%20servicios';

  return (
    <>
      {/* Grain */}
      <div aria-hidden style={{ position:'fixed', inset:0, zIndex:500, pointerEvents:'none', opacity:0.06, mixBlendMode:'overlay', backgroundRepeat:'repeat', backgroundSize:'180px 180px', backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Fixed nav */}
      <nav style={{ position:'fixed', top:'1rem', left:'50%', transform:'translateX(-50%)', zIndex:1000, padding:'0.65rem 1.3rem', display:'flex', justifyContent:'space-between', alignItems:'center', width:'min(92vw,820px)', background:'rgba(11,15,20,0.7)', backdropFilter:'blur(32px) saturate(200%)', WebkitBackdropFilter:'blur(32px) saturate(200%)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:100, boxShadow:'0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
        <a href="/" style={{ fontFamily:'Nohemi,sans-serif', fontSize:'1rem', fontWeight:900, textDecoration:'none', letterSpacing:'-0.03em' }}>
          <span style={{color:'var(--white)'}}>agonz</span><span style={{color:'var(--accent)'}}>{'{'}x{'}'}</span>
        </a>
        <div style={{ display:'flex', alignItems:'center', gap:'1.2rem' }}>
          <a href="/" style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.78rem', fontWeight:500, color:'var(--t2)', textDecoration:'none' }}>← Portfolio</a>
          <a href={wa} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.78rem', fontWeight:600, color:'#0B0F14', background:'var(--accent)', padding:'0.45rem 1.1rem', borderRadius:100, textDecoration:'none', transition:'opacity 0.2s' }}
            onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
            Contacto
          </a>
        </div>
      </nav>

      <SnapScroller>
        <HeroSection     wa={wa} email={email} />
        <CredSection />
        <PainSection />
        <ServicesSection />
        <SectorsSection />
        <ProjectSection bg="var(--bg2)" project={{ label:'Gestión operativa · Equipo deportivo', name:'Sistema de pedidos y cobros', desc:'Herramienta interna para centralizar pedidos de material, cobros y entregas. Panel de administración con historial completo y estados en tiempo real. Antes: todo por WhatsApp y Excel, sin trazabilidad.', tags:['Next.js','Supabase','Panel admin','Tiempo real'], shots:['/screenshots/soccermanager1.png','/screenshots/soccermanager2.png'], device:'desktop' }} />
        <ProjectSection bg="var(--bg)"  project={{ label:'Operativa interna · Club deportivo', name:'Gestión económica del equipo', isPwa:true, desc:'PWA instalable en móvil. Los miembros consultan su saldo, historial de sanciones y estado de pagos en tiempo real. Antes: el tesorero lo gestionaba todo a mano y las consultas llegaban sin parar.', tags:['JavaScript','Web App','GitHub Pages'], shots:['/screenshots/torrenuevafutsal1.png','/screenshots/torrenuevafutsal2.png'], device:'mobile' }} />
        <ProcessSection />
        <AuditSection    wa={wa} email={email} />
        <FAQSection />
        <CTAFooter       wa={wa} email={email} />
      </SnapScroller>

      <style>{`
        @keyframes sDot   { 0%{transform:translateY(0);opacity:1}60%{transform:translateY(14px);opacity:0}61%{transform:translateY(0);opacity:0}100%{transform:translateY(0);opacity:1} }
        @keyframes tbAnim { from{width:0%} to{width:100%} }
        @keyframes photoSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        /* Grids */
        .cred-grid  { display:grid; grid-template-columns:minmax(0,3fr) minmax(0,2fr); gap:4rem 6rem; align-items:start; }
        .proc-grid  { grid-template-columns:minmax(0,2fr) minmax(0,3fr); }
        .audit-grid { display:grid; grid-template-columns:minmax(0,3fr) minmax(0,2fr); gap:3rem 4rem; align-items:start; }
        .proj-grid  { }
        .cta-flex   { }

        @media (max-width:1000px) {
          .cred-grid  { grid-template-columns:1fr; gap:2.5rem; }
          .proc-grid  { grid-template-columns:1fr !important; }
          .proc-grid > div:first-child { display:none !important; }
        }
        @media (max-width:900px) {
          .audit-grid { grid-template-columns:1fr; gap:2rem; }
          .proj-grid  { flex-direction:column !important; }
          .cta-photo  { display:none !important; }
        }
        @media (max-width:768px) {
          .pain-bento-wide { grid-column:span 1 !important; }
          .sectors-grid    { grid-template-columns:repeat(2,1fr) !important; }
        }

        /* Scrollbar in FAQ */
        [data-faq-scroll]::-webkit-scrollbar { width:3px; }
        [data-faq-scroll]::-webkit-scrollbar-track { background:transparent; }
        [data-faq-scroll]::-webkit-scrollbar-thumb { background:var(--t3); border-radius:2px; }

        /* Nav mobile */
        @media (max-width:700px) {
          nav { left:1rem !important; transform:none !important; width:auto !important; right:4.5rem !important; }
        }
      `}</style>
    </>
  );
}
