'use client';
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: 'Automatización interna',
    desc: 'Fichaje digital, gestión de vacaciones y control horario adaptado exactamente a tu empresa. Cumple la normativa española sin pagar licencias de software genérico. Tú pones el proceso, nosotros lo digitalizamos.',
    bg: 'https://images.pexels.com/photos/8438879/pexels-photo-8438879.jpeg',
  },
  {
    title: 'Atención al cliente con IA',
    desc: 'Asistente inteligente que responde dudas frecuentes, precualifica pacientes o clientes y gestiona citas sin intervención humana. Disponible 24/7, integrado directamente en tu web o app existente.',
    bg: 'https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Herramientas a medida',
    desc: 'Si tienes un proceso manual que te quita tiempo, lo digitalizamos. Rápido, funcional y con tu identidad de marca. Sin atajos ni plantillas genéricas — cada solución pensada para cómo trabaja tu negocio.',
    bg: 'https://images.unsplash.com/photo-1532186773960-85649e5cb70b?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const PROJECTS = [
  {
    name: 'Soccer Manager',
    desc: 'Gestión completa de pedidos, cobros y entregas de material deportivo. Panel de administración con historial y notificaciones en tiempo real.',
    stack: ['Next.js', 'Supabase', 'Vercel'],
    device: 'desktop' as const,
    screenshots: ['/screenshots/soccermanager1.png', '/screenshots/soccermanager2.png'],
    bg: '#0a1118',
    accent: '#3DF2E0',
  },
  {
    name: 'Torrenueva Futsal',
    desc: 'PWA móvil para gestión de multas y convocatorias del equipo. Los jugadores consultan su balance e historial directamente desde el teléfono, sin instalación.',
    stack: ['HTML', 'JavaScript', 'Supabase'],
    device: 'mobile' as const,
    screenshots: ['/screenshots/torrenuevafutsal1.png', '/screenshots/torrenuevafutsal2.png'],
    bg: '#0b1015',
    accent: '#3DF2E0',
  },
];

const HERO_WORDS = ['SOLUCIONES', 'DIGITALES', 'A MEDIDA', 'PARA EMPRESAS'];

// ─── Flip Card ───────────────────────────────────────────────────────────────

function FlipCard({ service, isMobileDevice }: { service: typeof SERVICES[0]; isMobileDevice: boolean }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const flippedRef = useRef(false);

  const flipTo = (state: boolean) => {
    gsap.to(innerRef.current, {
      rotationY: state ? 180 : 0,
      duration: 0.68,
      ease: state ? 'back.out(1.1)' : 'power3.inOut',
    });
  };

  const handleMouseEnter = () => { if (!isMobileDevice) flipTo(true); };
  const handleMouseLeave = () => { if (!isMobileDevice) flipTo(false); };
  const handleClick = () => {
    if (isMobileDevice) {
      flippedRef.current = !flippedRef.current;
      flipTo(flippedRef.current);
    }
  };

  return (
    <div
      data-cursor="view"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        cursor: isMobileDevice ? 'pointer' : 'default',
        height: 'clamp(280px, 38vh, 420px)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20, overflow: 'hidden',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
        }}>
          <img
            src={service.bg}
            alt=""
            draggable={false}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(155deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.9) 100%)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(61,242,224,0.055), transparent)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
            <h3 style={{
              fontFamily: 'Nohemi,sans-serif',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
              fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: 0,
            }}>
              {service.title}
            </h3>
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20, overflow: 'hidden',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'rgba(14,18,25,0.98)',
          border: '1px solid rgba(61,242,224,0.12)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '2rem',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '2rem', right: '2rem', height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(61,242,224,0.4), transparent)',
          }} />
          <div>
            <h3 style={{
              fontFamily: 'Nohemi,sans-serif',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2,
            }}>
              {service.title}
            </h3>
            <p style={{
              fontFamily: 'Safiro,sans-serif',
              fontSize: 'clamp(0.82rem, 1.3vw, 0.92rem)',
              lineHeight: 1.8, color: 'var(--t2)',
            }}>
              {service.desc}
            </p>
          </div>
          <div style={{ width: 36, height: 2, background: '#3DF2E0', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Screenshot carousel ─────────────────────────────────────────────────────

function ScreenshotCarousel({
  screenshots,
  name,
  deviceType,
  onExpand,
}: {
  screenshots: string[];
  name: string;
  deviceType: 'desktop' | 'mobile';
  onExpand: (src: string) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const imgEls = useRef<(HTMLImageElement | null)[]>([]);
  const isPaused = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const crossfadeTo = useCallback((next: number) => {
    const prev = activeIdxRef.current;
    if (prev === next) return;
    const prevEl = imgEls.current[prev];
    const nextEl = imgEls.current[next];
    if (prevEl) gsap.to(prevEl, { opacity: 0, duration: 0.55, ease: 'power2.inOut' });
    if (nextEl) gsap.fromTo(nextEl, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.inOut' });
    activeIdxRef.current = next;
    setActiveIdx(next);
  }, []);

  useEffect(() => {
    if (screenshots.length <= 1) return;
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        const next = (activeIdxRef.current + 1) % screenshots.length;
        crossfadeTo(next);
      }
    }, 3800);
    return () => clearInterval(intervalRef.current);
  }, [screenshots.length, crossfadeTo]);

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      {/* Stacked images — GSAP crossfades between them */}
      {screenshots.map((src, i) => (
        <img
          key={i}
          ref={el => { imgEls.current[i] = el; }}
          src={src}
          alt={`${name} screenshot ${i + 1}`}
          onClick={() => onExpand(src)}
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            borderRadius: deviceType === 'mobile' ? 18 : 12,
            cursor: 'zoom-in',
            opacity: i === 0 ? 1 : 0,
            display: 'block',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        />
      ))}

      {/* Dot indicators */}
      {screenshots.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '-1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.45rem',
          alignItems: 'center',
        }}>
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); crossfadeTo(i); }}
              style={{
                width: i === activeIdx ? 22 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activeIdx ? '#3DF2E0' : 'rgba(255,255,255,0.28)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Full-screen project card ─────────────────────────────────────────────────

function ProjectShowcase({
  project,
  cardRef,
  onExpand,
}: {
  project: typeof PROJECTS[0];
  cardRef: React.RefObject<HTMLDivElement>;
  onExpand: (src: string) => void;
}) {
  const isMobile = project.device === 'mobile';

  return (
    <div
      ref={cardRef}
      style={{
        position: 'absolute',
        inset: 0,
        background: project.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient accent glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '60%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 500,
        background: 'radial-gradient(ellipse, rgba(61,242,224,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: '4rem',
        width: '100%',
        maxWidth: 1060,
        padding: '5rem 3rem 3rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left: info */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {project.stack.map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.63rem',
                color: '#3DF2E0', background: 'rgba(61,242,224,0.08)',
                border: '1px solid rgba(61,242,224,0.18)',
                borderRadius: 6, padding: '0.22rem 0.55rem',
              }}>
                {s}
              </span>
            ))}
          </div>

          <h2 style={{
            fontFamily: 'Nohemi,sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 900, textTransform: 'uppercase',
            letterSpacing: '-0.025em', lineHeight: 1,
            color: '#E8ECF0', marginBottom: '1.25rem',
          }}>
            {project.name}
          </h2>

          <p style={{
            fontFamily: 'Safiro,sans-serif',
            fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
            lineHeight: 1.75, color: 'var(--t2)',
            marginBottom: '2rem',
          }}>
            {project.desc}
          </p>

          <div style={{ width: 40, height: 2, background: '#3DF2E0', borderRadius: 2 }} />
        </div>

        {/* Right: auto-playing carousel */}
        <div style={{
          position: 'relative',
          paddingBottom: '2.5rem', // room for dots
        }}>
          {isMobile ? (
            // Mobile (Torrenueva): two portrait screenshots side by side, each in its own carousel slot
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', justifyContent: 'center' }}>
              {project.screenshots.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.name} ${i + 1}`}
                  onClick={() => onExpand(src)}
                  draggable={false}
                  style={{
                    height: 'clamp(240px, 34vh, 400px)',
                    width: 'auto',
                    objectFit: 'contain',
                    borderRadius: 18,
                    cursor: 'zoom-in',
                    display: 'block',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
                    transition: 'transform 0.25s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'translateY(-6px) scale(1.02)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = ''; }}
                />
              ))}
            </div>
          ) : (
            // Desktop: auto-playing crossfade carousel — full image, no crop
            <div style={{
              position: 'relative',
              height: 'clamp(300px, 42vh, 460px)',
              width: '100%',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            }}>
              <ScreenshotCarousel
                screenshots={project.screenshots}
                name={project.name}
                deviceType={project.device}
                onExpand={onExpand}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom project index indicator */}
      <div style={{
        position: 'absolute',
        bottom: '1.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
      }}>
        {PROJECTS.indexOf(project) + 1} / {PROJECTS.length}
      </div>
    </div>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.out' });
    gsap.fromTo(imgRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' });
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(5,8,12,0.94)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', cursor: 'zoom-out',
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt=""
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw', maxHeight: '90vh',
          objectFit: 'contain', borderRadius: 16,
          boxShadow: '0 32px 100px rgba(0,0,0,0.8)',
          cursor: 'default', display: 'block',
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          width: '2.5rem', height: '2.5rem', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.07)',
          color: '#fff', fontSize: '1.3rem', lineHeight: 1,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)', transition: 'background 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.16)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)'; }}
      >
        ×
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ServiciosPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIdx = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const animY = useRef(0);
  const targetY = useRef(0);
  const raf = useRef<number>();
  const lastNav = useRef(0);
  const vh = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Inner card state for examples section (0 = Soccer Manager, 1 = Torrenueva)
  const innerCardRef = useRef(0);
  const projectCard1Ref = useRef<HTMLDivElement>(null);
  const projectCard2Ref = useRef<HTMLDivElement>(null);

  // GSAP targets
  const heroWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const servicesTitleRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<HTMLDivElement>(null);
  const ctaHeadRef = useRef<HTMLDivElement>(null);
  const ctaBodyRef = useRef<HTMLDivElement>(null);

  // ── Mobile detection ──────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Desktop lerp animation loop ───────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    vh.current = window.innerHeight;
    const tick = () => {
      const diff = targetY.current - animY.current;
      animY.current += diff * 0.085;
      if (Math.abs(diff) < 0.3) animY.current = targetY.current;
      if (trackRef.current) trackRef.current.style.transform = `translateY(${animY.current}px)`;
      const progress = -animY.current / vh.current;
      trackRef.current?.querySelectorAll<HTMLElement>('.sv-section').forEach((sec, i) => {
        sec.style.transform = `translateY(${(i - progress) * 28}px)`;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [isMobile]);

  // ── goTo ──────────────────────────────────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(3, idx));
    if (clamped === currentIdx.current) return;
    currentIdx.current = clamped;
    vh.current = window.innerHeight;
    targetY.current = -clamped * vh.current;
    setActiveIdx(clamped);
  }, []);

  // ── navigate (with inner card logic) ─────────────────────────────────────
  const navigate = useCallback((dir: number) => {
    const now = Date.now();
    if (now - lastNav.current < 900) return;

    // Inner card navigation inside examples section
    if (currentIdx.current === 2) {
      const newInner = innerCardRef.current + dir;
      if (newInner >= 0 && newInner <= 1) {
        lastNav.current = now;
        innerCardRef.current = newInner;
        if (dir === 1) {
          gsap.to(projectCard2Ref.current, { y: '0%', duration: 0.78, ease: 'power3.out' });
          gsap.to(projectCard1Ref.current, { scale: 0.93, duration: 0.78, ease: 'power3.out' });
        } else {
          gsap.to(projectCard2Ref.current, { y: '100%', duration: 0.65, ease: 'power3.inOut' });
          gsap.to(projectCard1Ref.current, { scale: 1, duration: 0.65, ease: 'power3.inOut' });
        }
        return;
      }
    }

    // Set inner card state when entering examples section
    const next = currentIdx.current + dir;
    if (next === 2) {
      if (dir === 1) {
        innerCardRef.current = 0;
        gsap.set(projectCard2Ref.current, { y: '100%' });
        gsap.set(projectCard1Ref.current, { scale: 1 });
      } else {
        innerCardRef.current = 1;
        gsap.set(projectCard2Ref.current, { y: '0%' });
        gsap.set(projectCard1Ref.current, { scale: 0.93 });
      }
    }

    lastNav.current = now;
    goTo(next);
  }, [goTo]);

  // ── Wheel / Key / Touch ────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) <= 5) return;
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); navigate(1); }
      if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); navigate(-1); }
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) <= 50) return;
      navigate(dy > 0 ? 1 : -1);
    };
    const onResize = () => {
      vh.current = window.innerHeight;
      animY.current = -currentIdx.current * vh.current;
      targetY.current = animY.current;
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobile, navigate]);

  // ── GSAP animation triggers ───────────────────────────────────────────────
  const animatedSections = useRef<Set<number>>(new Set());

  const triggerAnimation = useCallback((idx: number, delay = 0) => {
    if (animatedSections.current.has(idx)) return;
    animatedSections.current.add(idx);

    if (idx === 0) {
      const words = heroWordRefs.current.filter(Boolean);
      gsap.fromTo(heroBadgeRef.current,
        { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay }
      );
      gsap.fromTo(words,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.95, ease: 'power4.out', delay: delay + 0.15 }
      );
      gsap.fromTo(heroSubRef.current,
        { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: delay + 0.65 }
      );
      gsap.fromTo(heroCTARef.current,
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: delay + 0.88 }
      );
    } else if (idx === 1) {
      if (servicesTitleRef.current) {
        gsap.fromTo(Array.from(servicesTitleRef.current.children),
          { y: 36, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out', delay }
        );
      }
      if (serviceCardsRef.current) {
        gsap.fromTo(Array.from(serviceCardsRef.current.children),
          { y: 55, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.13, duration: 0.85, ease: 'power3.out', delay: delay + 0.25 }
        );
      }
    } else if (idx === 2) {
      gsap.fromTo(projectCard1Ref.current,
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay }
      );
    } else if (idx === 3) {
      if (ctaHeadRef.current) {
        gsap.fromTo(Array.from(ctaHeadRef.current.children),
          { y: 52, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.09, duration: 0.9, ease: 'power4.out', delay }
        );
      }
      gsap.fromTo(ctaBodyRef.current,
        { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: delay + 0.55 }
      );
    }
  }, []);

  useEffect(() => {
    if (!isMobile) triggerAnimation(activeIdx, activeIdx === 0 ? 0.05 : 0.1);
  }, [activeIdx, isMobile, triggerAnimation]);

  useEffect(() => {
    if (!isMobile) return;
    const sections = document.querySelectorAll<HTMLElement>('.sv-section');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(sections).indexOf(entry.target as HTMLElement);
          if (idx !== -1) triggerAnimation(idx, 0.05);
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [isMobile, triggerAnimation]);

  // ─── Section base styles ──────────────────────────────────────────────────

  const SEC: React.CSSProperties = {
    minHeight: '100dvh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const INNER: React.CSSProperties = {
    width: '100%',
    maxWidth: 1100,
    padding: '6rem 2rem 4rem',
    position: 'relative',
    zIndex: 1,
  };

  // ─── Sections JSX ─────────────────────────────────────────────────────────

  const sections = (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="sv-section" style={{ ...SEC, background: 'var(--bg)' }}>
        <div style={{
          position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 700, height: 500,
          background: 'radial-gradient(ellipse, rgba(61,242,224,0.055) 0%, transparent 68%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }} />

        <div style={{ ...INNER, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Mini brand */}
          <div ref={heroBadgeRef} style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2.5rem', opacity: 0 }}>
            <span style={{
              fontFamily: 'Nohemi,sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 700, letterSpacing: '-0.02em',
              color: 'var(--white)', display: 'flex',
            }}>
              agonz<span style={{ color: '#3DF2E0' }}>{'{x}'}</span>
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'Nohemi,sans-serif',
            fontSize: 'clamp(2.6rem, 7.5vw, 6rem)',
            fontWeight: 900, textTransform: 'uppercase',
            lineHeight: 1.0, letterSpacing: '-0.03em',
            color: 'var(--white)',
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: '0 0.3em',
            maxWidth: 860,
          }}>
            {HERO_WORDS.map((word, i) => (
              <span
                key={i}
                ref={el => { heroWordRefs.current[i] = el; }}
                style={{
                  display: 'inline-block', opacity: 0,
                  color: i === 1 ? '#3DF2E0' : 'var(--white)',
                  whiteSpace: 'nowrap',
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p ref={heroSubRef} style={{
            fontFamily: 'Safiro,sans-serif',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            lineHeight: 1.75, color: 'var(--t2)',
            marginTop: '2rem', maxWidth: 580, opacity: 0,
          }}>
            Construyo herramientas digitales con IA adaptadas exactamente a cómo trabaja tu negocio — sin complejidades innecesarias.
          </p>

          <div ref={heroCTARef} style={{
            marginTop: '2.5rem', display: 'flex',
            gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', opacity: 0,
          }}>
            <a
              href="https://wa.me/34697403912"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'Nohemi,sans-serif', fontSize: '0.95rem', fontWeight: 700,
                padding: '0.9rem 2rem', borderRadius: 100,
                background: '#3DF2E0', color: '#000', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 4px 28px rgba(61,242,224,0.28)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 40px rgba(61,242,224,0.5)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 28px rgba(61,242,224,0.28)';
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              Hablamos →
            </a>
            <a
              href="#"
              onClick={e => { e.preventDefault(); navigate(1); }}
              style={{
                fontFamily: 'Nohemi,sans-serif', fontSize: '0.95rem', fontWeight: 600,
                padding: '0.9rem 2rem', borderRadius: 100,
                background: 'rgba(255,255,255,0.04)', color: 'var(--white)',
                border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backdropFilter: 'blur(12px)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
            >
              Ver servicios ↓
            </a>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.35,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--t2)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>scroll</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--t2), transparent)' }} />
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="sv-section" style={{ ...SEC, background: 'var(--bg2)' }}>
        <div style={{
          position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(61,242,224,0.18), transparent)',
        }} />

        <div style={{ ...INNER }}>
          <div ref={servicesTitleRef}>
            <h2 style={{
              fontFamily: 'Nohemi,sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.025em', color: 'var(--white)',
              lineHeight: 1, marginBottom: '0.5rem',
            }}>
              ¿Qué hacemos?
            </h2>
            <p style={{
              fontFamily: 'Safiro,sans-serif',
              fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
              color: 'var(--t2)', lineHeight: 1.7,
              maxWidth: 480, marginBottom: '3rem',
            }}>
              Explora cada tarjeta para descubrir cómo podemos ayudarte.
            </p>
          </div>

          <div
            ref={serviceCardsRef}
            className="sv-services-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
          >
            {SERVICES.map((s, i) => (
              <div key={i} style={{ opacity: 0 }}>
                <FlipCard service={s} isMobileDevice={isMobile} />
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        }} />
      </section>

      {/* ── EXAMPLES ─────────────────────────────────────────────────────── */}
      <section
        className="sv-section sv-examples"
        style={{
          ...SEC,
          background: PROJECTS[0].bg,
          ...(isMobile ? { minHeight: 'auto' } : {}),
        }}
      >
        {/* Section title — sits above both cards */}
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: '3rem',
          zIndex: 20,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'rgba(255,255,255,0.32)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginBottom: '0.35rem',
          }}>
            03
          </div>
          <h2 style={{
            fontFamily: 'Nohemi,sans-serif',
            fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1,
          }}>
            Casos reales
          </h2>
        </div>

        {isMobile ? (
          // Mobile: two cards stacked vertically in flow
          <div style={{ width: '100%' }}>
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ position: 'relative', height: '100dvh', width: '100%', background: p.bg }}>
                <ProjectShowcase project={p} cardRef={i === 0 ? projectCard1Ref : projectCard2Ref} onExpand={setLightboxSrc} />
              </div>
            ))}
          </div>
        ) : (
          // Desktop: stacked absolute cards, second slides up on inner scroll
          <>
            <ProjectShowcase project={PROJECTS[0]} cardRef={projectCard1Ref} onExpand={setLightboxSrc} />
            <div
              ref={projectCard2Ref}
              style={{
                position: 'absolute', inset: 0,
                transform: 'translateY(100%)',
                willChange: 'transform',
              }}
            >
              <ProjectShowcase project={PROJECTS[1]} cardRef={{ current: null }} onExpand={setLightboxSrc} />
            </div>
          </>
        )}
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="sv-section" style={{ ...SEC, background: 'var(--bg2)' }}>
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(61,242,224,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(61,242,224,0.18), transparent)',
        }} />

        <div style={{ ...INNER, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div ref={ctaHeadRef}>
            <h2 style={{
              fontFamily: 'Nohemi,sans-serif',
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.03em', lineHeight: 1.0,
              color: 'var(--white)', marginBottom: 0, opacity: 0,
            }}>
              ¿Tienes algo
            </h2>
            <h2 style={{
              fontFamily: 'Nohemi,sans-serif',
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.03em', lineHeight: 1.0,
              color: '#3DF2E0', marginBottom: '1.5rem', opacity: 0,
            }}>
              en mente?
            </h2>
          </div>

          <div ref={ctaBodyRef} style={{ opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <p style={{
              fontFamily: 'Safiro,sans-serif',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: 'var(--t2)', lineHeight: 1.75, maxWidth: 460,
            }}>
              Me cuentas qué necesitas y veo si puedo ayudarte. Respondo en menos de 24 horas.
            </p>
            <a
              href="https://wa.me/34697403912"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: 'Nohemi,sans-serif', fontSize: '1.05rem', fontWeight: 700,
                padding: '1.1rem 2.8rem', borderRadius: 100,
                background: '#3DF2E0', color: '#000', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                boxShadow: '0 4px 36px rgba(61,242,224,0.32)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 48px rgba(61,242,224,0.55)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 36px rgba(61,242,224,0.32)';
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: '#000', flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hablamos →
            </a>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--t3)',
            }}>
              agonz{'{x}'} · Antonio González · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </section>
    </>
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--white)' }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 1001, padding: '0.7rem 1.8rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        width: 'min(90vw, 800px)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 100,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        <a href="/" style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '1.05rem', fontWeight: 600, display: 'flex', textDecoration: 'none' }}>
          <span style={{ color: 'var(--white)' }}>agonz</span>
          <span style={{ color: '#3DF2E0' }}>{'{x}'}</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href="/"
            style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '0.78rem', fontWeight: 500, color: 'var(--t2)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--white)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--t2)'; }}
          >
            ← Portfolio
          </a>
          <a
            href="https://wa.me/34697403912"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: 'Nohemi,sans-serif', fontSize: '0.78rem', fontWeight: 700,
              color: '#000', background: '#3DF2E0', borderRadius: 100, padding: '0.38rem 1rem',
              textDecoration: 'none', boxShadow: '0 2px 12px rgba(61,242,224,0.25)',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(61,242,224,0.45)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(61,242,224,0.25)';
              (e.currentTarget as HTMLElement).style.transform = '';
            }}
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* Snap wrapper */}
      {!isMobile ? (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 1 }}>
          <div ref={trackRef} style={{ willChange: 'transform' }}>
            {sections}
          </div>
        </div>
      ) : (
        <div>{sections}</div>
      )}

      {/* Side nav dots */}
      {!isMobile && (
        <div style={{
          position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 1002, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
        }}>
          {(['Hero', 'Servicios', 'Ejemplos', 'Contacto'] as const).map((label, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={label}
              style={{
                width: 3, height: activeIdx === i ? 22 : 8,
                borderRadius: 4,
                background: activeIdx === i ? '#3DF2E0' : 'rgba(255,255,255,0.18)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: activeIdx === i ? '0 0 10px rgba(61,242,224,0.6)' : 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </div>
  );
}
