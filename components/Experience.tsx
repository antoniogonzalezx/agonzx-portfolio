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
      {/* Fixed section title */}
      <div
        className="exp-timeline-fixed"
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

      {/* Fixed stepper — liquid glass pill */}
      <div
        className="exp-timeline-fixed"
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
              {/* Dot */}
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
    </>
  );
}

/* ── Experience sections ─────────────────────────────────────────────────── */
export default function Experience() {
  const stepRefs   = useRef<(HTMLElement | null)[]>([]);
  const [visibleIdx, setVisibleIdx] = useState(-1);
  const visibleSet = useRef(new Set<number>());

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
      {EXPERIENCE.map((exp, i) => {
        const isVis = visibleIdx === i;
        return (
          <section
            key={i}
            id={i === 0 ? 'experience' : undefined}
            ref={(el) => { stepRefs.current[i] = el; }}
            className="snap-section"
            style={{
              minHeight: '100vh',
              background: 'var(--bg2)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Background company logo */}
            {exp.logoType === 'img' && exp.logoSrc ? (
              <img
                aria-hidden="true"
                src={exp.logoSrc}
                alt=""
                className="exp-bg-num"
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
              <div className="exp-bg-num" style={{
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
            )}

            {/* Accent line */}
            <div style={{
              position: 'absolute', left: 0, top: '22%', width: '100%', height: 1,
              background: 'linear-gradient(to right, transparent, rgba(61,242,224,0.05) 20%, rgba(61,242,224,0.05) 80%, transparent)',
              pointerEvents: 'none', zIndex: 0,
            }} />

            {/* Content */}
            <div className="exp-content" style={{
              marginLeft: 'clamp(10rem, 15vw, 16rem)',
              paddingRight: 'clamp(1.5rem, 4vw, 4rem)',
              maxWidth: 720, width: '100%',
              position: 'relative', zIndex: 1,
            }}>
              {/* Context */}
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 400,
                color: 'var(--t3)', letterSpacing: '0.06em', textTransform: 'uppercase',
                marginBottom: '1.5rem',
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(12px)',
                transition: 'all 0.7s 0.05s var(--ease)',
              }}>
                {exp.context}
              </p>

              {/* Logo + badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem',
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s 0.1s var(--ease)',
              }}>
                <div style={{ height: 64, display: 'flex', alignItems: 'center' }}>
                  {exp.logoType === 'text' ? (
                    <span style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '2.4rem', fontWeight: 700, color: '#fff' }}>
                      {exp.company}
                    </span>
                  ) : (
                    <img src={exp.logoSrc} alt={exp.company} style={{
                      height: 64, width: 'auto', maxWidth: 220, objectFit: 'contain',
                      filter: (exp as any).logoFilter ?? 'brightness(0) invert(1)',
                    }} />
                  )}
                </div>
              </div>

              {/* Role */}
              <h2 style={{
                fontFamily: 'Nohemi,sans-serif',
                fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 800,
                color: 'var(--accent)', textTransform: 'uppercase', lineHeight: 1.1,
                marginBottom: '0.3rem',
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s 0.15s var(--ease)',
              }}>
                {exp.role}
              </h2>

              {/* Date + badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.8rem',
                marginBottom: '2rem',
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s 0.2s var(--ease)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 400,
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
                fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', lineHeight: 1.8,
                color: 'var(--t2)', maxWidth: 600,
                opacity: isVis ? 1 : 0, transform: isVis ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s 0.25s var(--ease)',
              }}>
                {exp.desc}
              </p>

              {/* Client logos — no label, smaller images */}
              {exp.clients && exp.clients.length > 0 && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1.4rem',
                  marginTop: '2.5rem', paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.04)',
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
