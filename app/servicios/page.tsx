'use client';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICIOS — long-form landing page
   Same visual language as main portfolio: dark bg, teal accent, Nohemi/Safiro.
   Continuous scroll (no snap) — designed for B2B clients to read top to bottom.
───────────────────────────────────────────────────────────────────────────── */

/* ── Reveal hook — fade+rise when element enters viewport ─────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, threshold]);
  return { ref, visible };
}

/* ── Section label ─────────────────────────────────────────────────────────── */
function Label({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 500,
      color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
      display: 'block', marginBottom: '1.5rem',
    }}>
      {children}
    </span>
  );
}

/* ── Section heading ───────────────────────────────────────────────────────── */
function Heading({ children, size = 'lg' }: { children: React.ReactNode; size?: 'sm' | 'lg' }) {
  return (
    <h2 style={{
      fontFamily: 'Nohemi,sans-serif',
      fontSize: size === 'lg' ? 'clamp(2.2rem,5vw,4rem)' : 'clamp(1.6rem,3vw,2.4rem)',
      fontWeight: 900, textTransform: 'uppercase',
      letterSpacing: '-0.025em', lineHeight: 1.05,
      color: 'var(--white)', margin: 0,
    }}>
      {children}
    </h2>
  );
}

/* ── Thin divider ──────────────────────────────────────────────────────────── */
function Divider() {
  return <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.06)', margin: '0' }} />;
}

/* ── Service panel ─────────────────────────────────────────────────────────── */
function ServicePanel({
  num, title, desc, tags, delay = 0,
}: {
  num: string; title: string; desc: string; tags: string[]; delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        padding: 'clamp(3rem,6vw,5rem) 0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 720 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--t3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {num}
        </span>
        <h3 style={{
          fontFamily: 'Nohemi,sans-serif', fontSize: 'clamp(1.6rem,3.5vw,2.6rem)',
          fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em',
          color: 'var(--white)', lineHeight: 1.05, margin: 0,
        }}>
          {title}
        </h3>
        <p style={{ fontFamily: 'Safiro,sans-serif', fontSize: '1rem', lineHeight: 1.75, color: 'var(--t2)', margin: 0 }}>
          {desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {tags.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '0.22rem 0.65rem',
              border: '1px solid rgba(61,242,224,0.18)',
              borderRadius: 4, color: 'rgba(61,242,224,0.65)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Differentiator item ───────────────────────────────────────────────────── */
function WhyItem({ heading, body, delay = 0 }: { heading: string; body: string; delay?: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        padding: '2.5rem 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <h3 style={{
        fontFamily: 'Nohemi,sans-serif', fontSize: 'clamp(1.1rem,2vw,1.5rem)',
        fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.015em',
        color: 'var(--white)', margin: '0 0 1rem 0',
      }}>
        {heading}
      </h3>
      <p style={{ fontFamily: 'Safiro,sans-serif', fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--t2)', margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

/* ── Process step ──────────────────────────────────────────────────────────── */
function Step({ num, heading, body, delay = 0 }: { num: string; heading: string; body: string; delay?: number }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        display: 'grid', gridTemplateColumns: '3rem 1fr', gap: '0 2rem',
        padding: '2.5rem 0', borderTop: '1px solid rgba(255,255,255,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', paddingTop: '0.15rem', lineHeight: 1 }}>
        {num}
      </span>
      <div>
        <h3 style={{
          fontFamily: 'Nohemi,sans-serif', fontSize: 'clamp(1.1rem,2vw,1.4rem)',
          fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.015em',
          color: 'var(--white)', margin: '0 0 0.75rem 0',
        }}>
          {heading}
        </h3>
        <p style={{ fontFamily: 'Safiro,sans-serif', fontSize: '0.92rem', lineHeight: 1.75, color: 'var(--t2)', margin: 0 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/* ── Screenshot carousel ───────────────────────────────────────────────────── */
function ScreenshotCarousel({ shots, device }: { shots: string[]; device: 'desktop' | 'mobile' }) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const isMobile = device === 'mobile';
  const pausedRef = useRef(false);

  useEffect(() => {
    if (shots.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) {
        const next = (activeRef.current + 1) % shots.length;
        activeRef.current = next;
        setActive(next);
      }
    }, 3600);
    return () => clearInterval(id);
  }, [shots.length]);

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {shots.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: isMobile ? 'contain' : 'cover',
            objectPosition: 'top',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.8s ease',
            pointerEvents: 'none',
          }}
        />
      ))}
      {/* Dot indicators */}
      {shots.length > 1 && (
        <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '0.4rem', zIndex: 2 }}>
          {shots.map((_, i) => (
            <button
              key={i}
              onClick={() => { activeRef.current = i; setActive(i); }}
              style={{
                width: i === active ? 20 : 6, height: 6,
                borderRadius: 3, border: 'none',
                background: i === active ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.3s ease', padding: 0, cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Project card ──────────────────────────────────────────────────────────── */
function ProjectCard({
  name, desc, stack, shots, device, delay = 0,
}: {
  name: string; desc: string; stack: string[]; shots: string[]; device: 'desktop' | 'mobile'; delay?: number;
}) {
  const { ref, visible } = useReveal(0.08);
  const isMobileDevice = device === 'mobile';

  return (
    <div
      ref={ref}
      data-cursor="view"
      style={{
        background: 'var(--card)',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* Screenshot */}
      <div style={{
        height: isMobileDevice ? 320 : 260,
        background: 'var(--bg2)',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobileDevice ? '1.5rem 3rem 0' : '0',
      }}>
        <ScreenshotCarousel shots={shots} device={device} />
      </div>
      {/* Info */}
      <div style={{ padding: '2rem 2rem 2.2rem' }}>
        <h3 style={{
          fontFamily: 'Nohemi,sans-serif', fontSize: '1.3rem', fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '-0.02em',
          color: 'var(--white)', margin: '0 0 0.75rem 0',
        }}>
          {name}
        </h3>
        <p style={{ fontFamily: 'Safiro,sans-serif', fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--t2)', margin: '0 0 1.2rem 0' }}>
          {desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {stack.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '0.2rem 0.55rem',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4, color: 'var(--t3)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function Servicios() {
  const whatsapp = 'https://wa.me/34600000000?text=Hola%20Antonio%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto';
  const email = 'mailto:antoniogonzalezvaldepenas.jobs@gmail.com?subject=Proyecto';

  // Hero section reveal refs
  const heroLabelRef   = useRef<HTMLDivElement>(null);
  const heroHeadRef    = useRef<HTMLDivElement>(null);
  const heroSubRef     = useRef<HTMLDivElement>(null);
  const heroCtaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [heroLabelRef, heroHeadRef, heroSubRef, heroCtaRef];
    els.forEach((r, i) => {
      if (!r.current) return;
      r.current.style.opacity    = '0';
      r.current.style.transform  = 'translateY(36px)';
      r.current.style.transition = `opacity 0.85s ${i * 0.12 + 0.1}s cubic-bezier(0.16,1,0.3,1), transform 0.85s ${i * 0.12 + 0.1}s cubic-bezier(0.16,1,0.3,1)`;
      setTimeout(() => {
        if (!r.current) return;
        r.current.style.opacity   = '1';
        r.current.style.transform = 'translateY(0)';
      }, 50);
    });
  }, []);

  const { ref: servRef, visible: servVisible } = useReveal(0.05);
  const { ref: whyRef,  visible: whyVisible  } = useReveal(0.05);
  const { ref: projRef, visible: projVisible  } = useReveal(0.05);
  const { ref: procRef, visible: procVisible  } = useReveal(0.05);
  const { ref: ctaRef,  visible: ctaVisible   } = useReveal(0.1);

  const fadeIn = (visible: boolean, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--white)', overflowX: 'hidden' }}>

      {/* ── Grain overlay (same as hero) ──────────────────────────────────── */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        opacity: 0.07, mixBlendMode: 'overlay',
        backgroundRepeat: 'repeat', backgroundSize: '180px 180px',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      }} />

      {/* ── NAV ───────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, padding: '0.7rem 1.4rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        width: 'min(92vw, 820px)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 100,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        {/* Logo */}
        <a href="/" style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '1rem', fontWeight: 600, display: 'flex', textDecoration: 'none' }}>
          <span style={{ color: 'var(--white)' }}>agonz</span>
          <span style={{ color: 'var(--accent)' }}>{'{x}'}</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <a href="/" style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '0.78rem', fontWeight: 500, color: 'var(--t2)', textDecoration: 'none' }}>
            ← Portfolio
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Nohemi,sans-serif', fontSize: '0.78rem', fontWeight: 600,
              color: '#0B0F14',
              background: 'var(--accent)',
              padding: '0.45rem 1.1rem',
              borderRadius: 100, textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100dvh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
        padding: 'clamp(6rem,10vw,9rem) clamp(1.5rem,7vw,7rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Blob background */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', filter: 'blur(100px)', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', width: '60vw', height: '60vw', top: '-10%', right: '-10%',
            background: 'radial-gradient(circle, rgba(61,242,224,0.18) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute', width: '40vw', height: '40vw', bottom: '-5%', left: '-5%',
            background: 'radial-gradient(circle, rgba(61,242,224,0.10) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
          <div ref={heroLabelRef}>
            <Label>Soluciones digitales · Antonio González</Label>
          </div>

          <div ref={heroHeadRef}>
            <h1 style={{
              fontFamily: 'Nohemi,sans-serif',
              fontSize: 'clamp(3rem,8vw,7rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.03em', lineHeight: 0.95,
              color: 'var(--white)', margin: '0 0 2rem 0',
            }}>
              Soluciones<br />
              digitales que<br />
              <span style={{ color: 'var(--accent)' }}>funcionan.</span>
            </h1>
          </div>

          <div ref={heroSubRef}>
            <p style={{
              fontFamily: 'Safiro,sans-serif', fontSize: 'clamp(1rem,1.8vw,1.25rem)',
              lineHeight: 1.7, color: 'var(--t2)',
              maxWidth: 560, margin: '0 0 3rem 0',
            }}>
              Desarrollo iOS nativo, automatización con IA y herramientas a medida.
              Para equipos que quieren ir más rápido sin sacrificar calidad.
            </p>
          </div>

          <div ref={heroCtaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={whatsapp}
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'Nohemi,sans-serif', fontSize: '0.9rem', fontWeight: 700,
                color: '#0B0F14', background: 'var(--accent)',
                padding: '0.85rem 2rem', borderRadius: 100, textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Hablemos →
            </a>
            <a
              href="#servicios"
              style={{
                fontFamily: 'Nohemi,sans-serif', fontSize: '0.9rem', fontWeight: 600,
                color: 'var(--white)',
                padding: '0.85rem 2rem', borderRadius: 100, textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(61,242,224,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }}>
          <div style={{
            width: 28, height: 46, borderRadius: 14,
            border: '1.5px solid var(--accent)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 7,
          }}>
            <div style={{
              width: 4, height: 8, borderRadius: 2,
              background: 'var(--accent)',
              animation: 'scrollDot 2s ease-in-out infinite',
            }} />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="servicios" style={{ padding: 'clamp(5rem,8vw,9rem) clamp(1.5rem,7vw,7rem)' }}>
        <div ref={servRef} style={fadeIn(servVisible)}>
          <Label>Qué puedo hacer</Label>
          <Heading>Tres áreas.<br />Un punto de contacto.</Heading>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Divider />
          <ServicePanel
            num="01 · iOS"
            title="Apps nativas que tus usuarios van a amar"
            desc="SwiftUI, Swift Concurrency, integración con cualquier API o servicio externo. Diseño de arquitectura, desarrollo completo y publicación en App Store. Sin frameworks genéricos, sin atajos — código nativo que funciona exactamente como iOS espera."
            tags={['Swift', 'SwiftUI', 'Xcode', 'App Store', 'Swift Concurrency']}
            delay={0}
          />
          <Divider />
          <ServicePanel
            num="02 · IA"
            title="Flujos que trabajan mientras tú duermes"
            desc="Implemento agentes con Claude API y OpenAI Codex que automatizan tareas repetitivas de tu empresa: clasificar emails, generar documentos, procesar datos, responder consultas. Flujos agénticos que se ejecutan solos, aprenden del contexto y escalan sin esfuerzo."
            tags={['Claude API', 'OpenAI Codex', 'Agentic AI', 'Automatización', 'Workflows']}
            delay={0.08}
          />
          <Divider />
          <ServicePanel
            num="03 · Herramientas"
            title="El sistema que necesitas, construido para ti"
            desc="Dashboards de administración, CRMs internos, sistemas de gestión de pedidos o inventario. Construido con el stack que mejor resuelve tu problema — Next.js, Supabase, integraciones con herramientas que ya usas. Sin tecnología de moda que no encaja."
            tags={['Next.js', 'Supabase', 'React', 'APIs REST', 'Bases de datos']}
            delay={0.16}
          />
          <Divider />
        </div>
      </section>

      {/* ── WHY ME ────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem,8vw,9rem) clamp(1.5rem,7vw,7rem)', background: 'var(--bg2)' }}>
        <div ref={whyRef} style={fadeIn(whyVisible)}>
          <Label>Por qué trabajar conmigo</Label>
          <Heading>Lo que me hace<br /><span style={{ color: 'var(--accent)' }}>diferente.</span></Heading>
        </div>

        <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0 6rem' }}>
          <div>
            <WhyItem
              heading="Programación agéntica nativa"
              body="Uso Claude Code y OpenAI Codex en mi flujo de trabajo diario. Automatizo mi propio proceso de desarrollo — lo que a otros les lleva semanas, a mí me lleva días. Y puedo implementar esas mismas capacidades en tu empresa."
              delay={0}
            />
            <WhyItem
              heading="Experiencia en producto real"
              body="Más de 5 años construyendo apps que usa gente de verdad: desde un SDK de streaming con clientes como HBO y Sky hasta la app de empleo de XING, usada por más de 20 millones de personas. Sé qué funciona cuando hay presión real."
              delay={0.08}
            />
          </div>
          <div>
            <WhyItem
              heading="Un solo punto de contacto"
              body="Hablas directamente con quien diseña, desarrolla y entrega. Sin gestores de proyecto de por medio. Sin reuniones que podrían haber sido un email. Solo trabajo real, comunicación directa y decisiones rápidas."
              delay={0.04}
            />
            <WhyItem
              heading="iOS + Web + IA, sin cuellos de botella"
              body="La mayoría de desarrolladores eligen un carril. Yo conozco los tres. Eso significa que puedo ver el problema completo y elegir la solución que realmente lo resuelve, no la que más se parece a mis últimos proyectos."
              delay={0.12}
            />
          </div>
        </div>
      </section>

      {/* ── REAL PROJECTS ─────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem,8vw,9rem) clamp(1.5rem,7vw,7rem)' }}>
        <div ref={projRef} style={fadeIn(projVisible)}>
          <Label>Trabajo real</Label>
          <Heading>Algunos proyectos<br />recientes.</Heading>
          <p style={{ fontFamily: 'Safiro,sans-serif', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--t2)', marginTop: '1.5rem', maxWidth: 520 }}>
            Proyectos construidos y en uso — no mockups, no demos. Gente real usándolos cada semana.
          </p>
        </div>

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <ProjectCard
            name="Soccer Manager"
            desc="Gestión completa de pedidos, cobros y entregas de material deportivo. Panel de administración con historial y notificaciones en tiempo real."
            stack={['Next.js', 'Supabase', 'Vercel']}
            shots={['/screenshots/soccermanager1.png', '/screenshots/soccermanager2.png']}
            device="desktop"
            delay={0}
          />
          <ProjectCard
            name="Torrenueva Futsal"
            desc="App web para gestión de sanciones económicas del equipo de fútbol sala. Los jugadores consultan su saldo e historial en tiempo real."
            stack={['JavaScript', 'Web App', 'GitHub Pages']}
            shots={['/screenshots/torrenuevafutsal1.png', '/screenshots/torrenuevafutsal2.png']}
            device="mobile"
            delay={0.1}
          />
        </div>
      </section>

      <Divider />

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem,8vw,9rem) clamp(1.5rem,7vw,7rem)', background: 'var(--bg2)' }}>
        <div ref={procRef} style={fadeIn(procVisible)}>
          <Label>Cómo trabajamos</Label>
          <Heading>El proceso,<br />sin sorpresas.</Heading>
        </div>

        <div style={{ marginTop: '3rem', maxWidth: 720 }}>
          <Step
            num="01"
            heading="Hablamos"
            body="Sin compromiso. Entiendo tu problema y te doy mi opinión honesta sobre si puedo ayudarte y de qué forma. Si no soy la persona adecuada, te lo digo."
            delay={0}
          />
          <Step
            num="02"
            heading="Propuesta"
            body="Solución técnica detallada, timeline claro y precio cerrado. Sin módulos extra que aparecen después. Sin sorpresas."
            delay={0.06}
          />
          <Step
            num="03"
            heading="Desarrollo"
            body="Trabajo en iteraciones cortas con entregas visibles cada semana. Siempre sabes en qué estoy y puedes dar feedback en tiempo real."
            delay={0.12}
          />
          <Step
            num="04"
            heading="Lanzamiento y soporte"
            body="Te acompaño el día del lanzamiento y las semanas siguientes. El trabajo no termina cuando el código está listo — termina cuando la solución funciona en producción."
            delay={0.18}
          />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '60dvh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
        padding: 'clamp(5rem,10vw,9rem) clamp(1.5rem,7vw,7rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Accent blob */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          filter: 'blur(120px)',
        }}>
          <div style={{
            position: 'absolute', width: '50vw', height: '50vw', top: '-10%', right: '-10%',
            background: 'radial-gradient(circle, rgba(61,242,224,0.14) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
        </div>

        <div ref={ctaRef} style={{ ...fadeIn(ctaVisible), position: 'relative', zIndex: 1 }}>
          <Label>Siguiente paso</Label>
          <h2 style={{
            fontFamily: 'Nohemi,sans-serif',
            fontSize: 'clamp(2.5rem,7vw,6rem)',
            fontWeight: 900, textTransform: 'uppercase',
            letterSpacing: '-0.03em', lineHeight: 0.95,
            color: 'var(--white)', margin: '0 0 2rem 0',
          }}>
            ¿Tienes un<br />
            <span style={{ color: 'var(--accent)' }}>proyecto?</span>
          </h2>
          <p style={{
            fontFamily: 'Safiro,sans-serif', fontSize: 'clamp(0.95rem,1.6vw,1.15rem)',
            lineHeight: 1.7, color: 'var(--t2)',
            maxWidth: 460, margin: '0 0 3rem 0',
          }}>
            La primera consulta es gratis y sin compromiso. Cuéntame qué necesitas y vemos si encajamos.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={whatsapp}
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'Nohemi,sans-serif', fontSize: '0.9rem', fontWeight: 700,
                color: '#0B0F14', background: 'var(--accent)',
                padding: '0.9rem 2.2rem', borderRadius: 100, textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              WhatsApp →
            </a>
            <a
              href={email}
              style={{
                fontFamily: 'Nohemi,sans-serif', fontSize: '0.9rem', fontWeight: 600,
                color: 'var(--white)',
                padding: '0.9rem 2.2rem', borderRadius: 100, textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(61,242,224,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
            >
              Email
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{
        padding: '2rem clamp(1.5rem,7vw,7rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '0.95rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--white)' }}>agonz</span>
          <span style={{ color: 'var(--accent)' }}>{'{x}'}</span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--t3)', letterSpacing: '0.08em' }}>
          © 2026 · Antonio González
        </span>
      </footer>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1 }
          60%  { transform: translateY(16px); opacity: 0 }
          61%  { transform: translateY(0);    opacity: 0 }
          100% { transform: translateY(0);    opacity: 1 }
        }
        @media (max-width: 700px) {
          nav { left: 1rem !important; transform: none !important; width: auto !important; right: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
