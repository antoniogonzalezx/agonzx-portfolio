'use client';
import { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from './data';

/* ── Fixed timeline — rendered in page.tsx outside ParallaxScroller ──────── */
export function ExperienceTimeline() {
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    const handler = (e: Event) => setActiveIdx((e as CustomEvent<{ idx: number }>).detail.idx);
    window.addEventListener('exp-change', handler);
    return () => window.removeEventListener('exp-change', handler);
  }, []);

  const visible = activeIdx >= 0;

  return (
    <>
      {/* Fixed section title — gradient bg on mobile so it doesn't blend with content */}
      <div
        className="exp-timeline-fixed exp-timeline-title"
        style={{
          position: 'fixed',
          top: '4.5rem',
          left: '2.5rem',
          zIndex: 1000,
          fontFamily: 'Nohemi,sans-serif',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          color: 'var(--white)',
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        Experience
      </div>

      {/* Desktop: glass pill stepper (left side) */}
      <div
        className="exp-timeline-fixed exp-timeline-desktop"
        style={{
          position: 'fixed',
          left: 'clamp(1.2rem, 2.5vw, 2rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '14px 10px',
          borderRadius: 100,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        {EXPERIENCE.map((_, j) => {
          const isCur  = j === activeIdx;
          const isPast = j < activeIdx;
          return (
            <div key={j} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: isCur ? 9 : 5,
                height: isCur ? 9 : 5,
                borderRadius: '50%',
                background: isCur ? 'var(--accent)' : isPast ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)',
                boxShadow: isCur ? '0 0 10px rgba(61,242,224,0.7), 0 0 20px rgba(61,242,224,0.35)' : 'none',
                transition: 'all 0.5s var(--ease)',
              }} />
              {j < EXPERIENCE.length - 1 && <div style={{ height: 14 }} />}
            </div>
          );
        })}
      </div>

      {/* Mobile: parallax-dot style stepper (right side, same design as nav dots) */}
      <div
        className="exp-timeline-fixed exp-timeline-mobile"
        style={{
          position: 'fixed',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0.18,
          filter: visible ? 'none' : 'blur(1px)',
          transition: 'opacity 0.4s ease, filter 0.4s ease',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.45rem',
        }}
      >
        {EXPERIENCE.map((_, j) => {
          const isCur  = j === activeIdx;
          const isPast = j < activeIdx;
          return (
            <div
              key={j}
              style={{
                width: 3,
                height: isCur ? 22 : 8,
                borderRadius: 4,
                background: isCur ? 'var(--accent)' : isPast ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)',
                boxShadow: isCur ? '0 0 8px rgba(61,242,224,0.5)' : 'none',
                transition: 'height 0.4s var(--ease), background 0.4s var(--ease), box-shadow 0.4s var(--ease)',
              }}
            />
          );
        })}
      </div>
    </>
  );
}

/* ── Experience sections ─────────────────────────────────────────────────── */
export default function Experience() {
  const stepRefs   = useRef<(HTMLElement | null)[]>([]);
  const [visibleIdx, setVisibleIdx] = useState(-1);
  const visibleSet = useRef(new Set<number>());
  const [isMobile, setIsMobile] = useState(false);
  const [expTitleVisible, setExpTitleVisible] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Mobile sticky-title: show as soon as the first section approaches the nav bar
  useEffect(() => {
    if (!isMobile) return;
    let rafId: number;
    const update = () => {
      const first = stepRefs.current[0];
      const last  = stepRefs.current[stepRefs.current.length - 1];
      if (!first || !last) return;
      setExpTitleVisible(
        first.getBoundingClientRect().top <= 72 &&
        last.getBoundingClientRect().bottom > 0
      );
    };
    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = stepRefs.current.indexOf(entry.target as HTMLElement);
          if (idx === -1) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            visibleSet.current.add(idx);
            setVisibleIdx(idx);
            window.dispatchEvent(new CustomEvent('exp-change', { detail: { idx } }));
          } else {
            visibleSet.current.delete(idx);
            if (visibleSet.current.size === 0) {
              window.dispatchEvent(new CustomEvent('exp-change', { detail: { idx: -1 } }));
            }
          }
        });
      },
      { threshold: 0.4 }
    );
    stepRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => {
      observer.disconnect();
      window.dispatchEvent(new CustomEvent('exp-change', { detail: { idx: -1 } }));
    };
  }, []);

  return (
    <>
      {/* Mobile fixed title — top:0 so background fills from viewport top, padding-top clears nav */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%',
          zIndex: 500, pointerEvents: 'none',
          opacity: expTitleVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          paddingTop: '4.5rem', paddingLeft: '2.5rem', paddingRight: '3rem', paddingBottom: '1.2rem',
          background: 'linear-gradient(to bottom, var(--bg2) 65%, transparent)',
          fontFamily: 'Nohemi,sans-serif',
          fontSize: 'clamp(1.8rem, 5vw, 2.2rem)',
          fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em',
          color: 'var(--white)',
        }}>
          Experience
        </div>
      )}

      {EXPERIENCE.map((exp, i) => {
        const isVis = visibleIdx === i;
        const isDimmed = isMobile && visibleIdx >= 0 && !isVis;
        return (
          <section
            key={i}
            id={i === 0 ? 'experience' : undefined}
            ref={(el) => { stepRefs.current[i] = el; }}
            className="snap-section exp-section"
            style={{
              minHeight: '100vh',
              background: 'var(--bg2)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              opacity: isDimmed ? 0.2 : 1,
              filter: isDimmed ? 'blur(3px)' : 'none',
              transition: 'opacity 0.5s var(--ease), filter 0.5s var(--ease)',
            }}
          >
            {/* Background company logo — desktop only */}
            {!isMobile && (exp.logoType === 'img' && exp.logoSrc ? (
              <img
                aria-hidden="true"
                src={exp.logoSrc}
                alt=""
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1) sepia(1) hue-rotate(140deg) saturate(3) brightness(1.1)',
                  opacity: 0.05,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
            ) : (
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'Nohemi,sans-serif',
                fontSize: 'clamp(8rem, 18vw, 14rem)',
                fontWeight: 900,
                color: '#ffffff',
                opacity: 0.05,
                lineHeight: 0.8,
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0,
                whiteSpace: 'nowrap',
              }}>
                {exp.company}
              </div>
            ))}

            {/* Accent line — desktop only */}
            {!isMobile && (
              <div style={{
                position: 'absolute', left: 0, top: '22%', width: '100%', height: 1,
                background: 'linear-gradient(to right, transparent, rgba(61,242,224,0.05) 20%, rgba(61,242,224,0.05) 80%, transparent)',
                pointerEvents: 'none', zIndex: 0,
              }} />
            )}

            {/* Mobile bottom fade */}
            {isMobile && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '6rem',
                background: 'linear-gradient(to bottom, transparent, var(--bg2))',
                pointerEvents: 'none', zIndex: 2,
              }} />
            )}

            {/* Content */}
            <div className="exp-content" style={{
              marginLeft: 'clamp(10rem, 15vw, 16rem)',
              paddingRight: 'clamp(1.5rem, 4vw, 4rem)',
              maxWidth: 720, width: '100%',
              position: 'relative', zIndex: 1,
            }}>
              {/* Context */}
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: isMobile ? '0.68rem' : '0.62rem',
                fontWeight: 400,
                color: 'var(--t3)', letterSpacing: '0.06em', textTransform: 'uppercase',
                marginBottom: isMobile ? '1.2rem' : '1.5rem',
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(12px)',
                transition: 'all 0.7s 0.05s var(--ease)',
              }}>
                {exp.context}
              </p>

              {/* Logo + badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                marginBottom: isMobile ? '1rem' : '1.2rem',
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s 0.1s var(--ease)',
              }}>
                <div style={{ height: isMobile ? 48 : 64, display: 'flex', alignItems: 'center' }}>
                  {exp.logoType === 'text' ? (
                    <span style={{ fontFamily: 'Nohemi,sans-serif', fontSize: isMobile ? '2rem' : '2.4rem', fontWeight: 700, color: '#fff' }}>
                      {exp.company}
                    </span>
                  ) : (
                    <img src={exp.logoSrc} alt={exp.company} style={{
                      height: isMobile ? 48 : 64, width: 'auto', maxWidth: isMobile ? 180 : 220, objectFit: 'contain',
                      filter: (exp as any).logoFilter ?? 'brightness(0) invert(1)',
                    }} />
                  )}
                </div>
              </div>

              {/* Role */}
              <h2 style={{
                fontFamily: 'Nohemi,sans-serif',
                fontSize: isMobile ? 'clamp(2rem, 7vw, 2.8rem)' : 'clamp(1.6rem, 4vw, 2.8rem)',
                fontWeight: 800,
                color: 'var(--accent)', textTransform: 'uppercase', lineHeight: 1.1,
                marginBottom: '0.4rem',
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s 0.15s var(--ease)',
              }}>
                {exp.role}
              </h2>

              {/* Date + badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.8rem',
                marginBottom: isMobile ? '1.4rem' : '2rem',
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s 0.2s var(--ease)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.75rem' : '0.72rem', fontWeight: 400,
                  color: 'var(--t3)', letterSpacing: '0.04em',
                }}>
                  {exp.date}
                </span>
                {exp.badge && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 500,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    padding: '0.15rem 0.6rem',
                    background: 'var(--accent-s)', color: 'var(--accent)',
                    border: '1px solid rgba(61,242,224,0.2)', borderRadius: 20,
                  }}>
                    {exp.badge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'Safiro,sans-serif',
                fontSize: isMobile ? '0.95rem' : 'clamp(0.9rem, 1.8vw, 1.05rem)',
                lineHeight: isMobile ? 1.75 : 1.8,
                color: 'var(--t2)', maxWidth: 600,
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s 0.25s var(--ease)',
              }}>
                {exp.desc}
              </p>

              {/* Client logos */}
              {exp.clients && exp.clients.length > 0 && (
                <div className="exp-clients" style={{
                  display: 'flex', alignItems: 'center', gap: '1.4rem',
                  marginTop: isMobile ? '1.8rem' : '2.5rem',
                  paddingTop: isMobile ? '1.2rem' : '1.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'all 0.7s 0.35s var(--ease)',
                }}>
                  {exp.clients.map((c: any, k: number) => (
                    <img key={k} src={c.src} alt={c.alt} style={{
                      height: c.height ?? 22, width: 'auto', opacity: 0.7,
                      filter: c.noFilter
                        ? 'none'
                        : c.alt === 'Sky'
                          ? 'brightness(0) invert(1)'
                          : c.multiColor
                            ? 'grayscale(1) brightness(1.9) contrast(0.9)'
                            : 'brightness(0) invert(1)',
                    }} />
                  ))}
                </div>
              )}
            </div>

          </section>
        );
      })}
    </>
  );
}
