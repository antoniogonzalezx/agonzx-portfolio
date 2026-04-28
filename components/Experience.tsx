'use client';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { EXPERIENCE } from './data';

gsap.registerPlugin(useGSAP);

/* ─────────────────────────────────────────────────────────────────
 * Experience — Editorial timeline (desktop) + stacked cards (mobile)
 *
 * DESKTOP composition · "Option A — Editorial timeline"
 *   - One snap-section (single ParallaxScroller step → one dot in
 *     the right rail).  No internal scroll; roles cycle in place.
 *   - Left rail: fixed vertical timeline with year + company per role.
 *     The active marker is a vertical bar that translates between
 *     rows on a 700 ms power3.out — never jumps, always glides.
 *   - Right stage: large logo · role · date+badge · context · desc ·
 *     clients.  Each transition runs a hand-tuned GSAP timeline
 *     (out → swap → in) with char-staggered role title, scale-pop
 *     logo, and a 60 ms stagger across the client logos.
 *   - Roles cycle every 9 s by default; hover anywhere on the section
 *     pauses the timer; clicking a rail entry jumps + resets it.
 *
 * MOBILE composition · stacked cards (unchanged from prior pass).
 * ───────────────────────────────────────────────────────────────── */

/* ── Shared helpers ──────────────────────────────────────────────── */

function clientFilter(c: { alt?: string; noFilter?: boolean; multiColor?: boolean }) {
  if (c.noFilter)        return 'none';
  if (c.alt === 'Sky')   return 'brightness(0) invert(1)';
  if (c.multiColor)      return 'grayscale(1) brightness(1.9) contrast(0.9)';
  return 'brightness(0) invert(1)';
}

function CompanyLogo({ exp, height }: { exp: typeof EXPERIENCE[number]; height: string }) {
  if (exp.logoType === 'text') {
    return (
      <span className="exp-text-logo" style={{ fontSize: `calc(${height} * 0.78)` }}>
        {exp.company}
      </span>
    );
  }
  return (
    <img
      src={exp.logoSrc}
      alt={exp.company}
      style={{
        height,
        width:     'auto',
        maxWidth:  '100%',
        objectFit: 'contain',
        filter:    (exp as any).logoFilter ?? 'brightness(0) invert(1)',
      }}
    />
  );
}

function shortName(name: string) { return name.split(' (')[0]; }

/* "Oct 2022 — Feb 2026" → "2022 · 2026"; "Feb 2026 — Present" → "2026 · Now" */
function yearRange(date: string): string {
  const parts = date.split('—').map(s => s.trim());
  const left  = parts[0]?.match(/\d{4}/)?.[0] ?? parts[0];
  const right = parts[1]?.match(/\d{4}/)?.[0]
             ?? (parts[1]?.toLowerCase().includes('present') ? 'Now' : parts[1])
             ?? '';
  return `${left} · ${right}`;
}

/* Split a string into per-character spans so GSAP can stagger them. */
function splitChars(text: string) {
  return text.split('').map((ch, i) => (
    <span key={i} className="exp-char" style={{ display: 'inline-block', willChange: 'transform, opacity' }}>
      {ch === ' ' ? ' ' : ch}
    </span>
  ));
}

/* ── Mobile · improved card stack (unchanged) ─────────────────────── */

function MobileStack() {
  return (
    <section id="experience-mobile" className="snap-section exp-mobile">
      <h2 className="exp-mobile-title">Experience</h2>

      <div className="exp-mobile-stack">
        {EXPERIENCE.map((exp, i) => (
          <article key={i} className="exp-mobile-card">
            <div className="exp-mobile-card-eyebrow">
              <span className="exp-mobile-card-date">{exp.date}</span>
              {exp.badge && <span className="exp-mobile-card-badge">{exp.badge}</span>}
            </div>

            <div className="exp-mobile-card-logo">
              <CompanyLogo exp={exp} height="64px" />
            </div>

            <h3 className="exp-mobile-card-role">{exp.role}</h3>

            <p className="exp-mobile-card-desc">{exp.desc}</p>

            {exp.clients && exp.clients.length > 0 && (
              <footer className="exp-mobile-card-clients">
                <span className="exp-mobile-card-clients-label">Clientes</span>
                <div className="exp-mobile-card-clients-row">
                  {exp.clients.map((c: any, k: number) => (
                    <img
                      key={k}
                      src={c.src}
                      alt={c.alt}
                      style={{ height: 16, filter: clientFilter(c) }}
                    />
                  ))}
                </div>
              </footer>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Desktop · editorial timeline ────────────────────────────────── */

function DesktopExperience() {
  const containerRef   = useRef<HTMLElement>(null);
  const stepRefs       = useRef<(HTMLLIElement | null)[]>([]);
  const markerRef      = useRef<HTMLSpanElement>(null);
  const isAnimating    = useRef(false);
  const transitionRef  = useRef<(next: number) => void>(() => {});

  /* `activeIdx` updates immediately on a wheel/click — drives
   * the rail UI.  `displayIdx` updates AFTER the stage's exit
   * animation completes, so the entry animation runs against the
   * new role's content.  Splitting them is what gives the role
   * change its layered "morph in place" feel.                      */
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);

  const exp = EXPERIENCE[displayIdx];

  /* ── Stage transition · OUT → swap → IN ──
   * Stored on a ref so the wheel-event listener (registered once)
   * always reads the latest closure with the latest activeIdx.   */
  transitionRef.current = (next: number) => {
    if (isAnimating.current || next === activeIdx) return;
    isAnimating.current = true;
    setActiveIdx(next);

    const ctx = containerRef.current;
    if (!ctx) { setDisplayIdx(next); isAnimating.current = false; return; }

    /* OUT — quick, all elements at once with a tight stagger so the
     * stage clears in ~280 ms total; the eye barely registers a "blank
     * frame" before the IN animation lights it back up.              */
    gsap.to(ctx.querySelectorAll('.exp-stage-content > *'), {
      opacity: 0,
      y:      -8,
      duration: 0.28,
      ease:    'power2.in',
      stagger: 0.025,
      onComplete: () => {
        setDisplayIdx(next);
        isAnimating.current = false;
      },
    });
  };
  const transitionTo = (next: number) => transitionRef.current(next);

  /* ── Marker glide on the timeline rail ── */
  useGSAP(() => {
    const target = stepRefs.current[activeIdx];
    const marker = markerRef.current;
    if (!target || !marker) return;
    gsap.to(marker, {
      y:       target.offsetTop,
      height:  target.offsetHeight,
      opacity: 1,
      duration: 0.7,
      ease:    'power3.out',
    });
  }, { scope: containerRef, dependencies: [activeIdx] });

  /* ── Stage IN animation (runs whenever the rendered role changes) ── */
  useGSAP(() => {
    const ctx = containerRef.current;
    if (!ctx) return;

    /* Reset the elements that will animate in.  Using gsap.set rather
     * than CSS so the visual state is consistent on initial mount and
     * on every subsequent role swap — no FOUC, no flicker.
     *
     * The role-title PARENT must be reset to opacity 1 / y 0 because
     * the OUT tween moves every direct child of .exp-stage-content
     * (which includes the parent <h3>) to opacity 0 / y -8 — without
     * this reset the chars animate in but their parent stays hidden.
     */
    gsap.set(ctx.querySelector('.exp-stage-logo'),         { opacity: 0, scale: 0.96, y: 0 });
    gsap.set(ctx.querySelector('.exp-stage-role-title'),   { opacity: 1, y: 0 });
    gsap.set(ctx.querySelectorAll('.exp-stage-role-title .exp-char'), { opacity: 0, y: 10 });
    gsap.set(ctx.querySelector('.exp-stage-meta'),         { opacity: 0, y: 8  });
    gsap.set(ctx.querySelector('.exp-stage-context'),      { opacity: 0, y: 12 });
    gsap.set(ctx.querySelector('.exp-stage-desc'),         { opacity: 0, y: 12 });
    gsap.set(ctx.querySelector('.exp-stage-clients'),      { opacity: 1, y: 0 });
    gsap.set(ctx.querySelectorAll('.exp-stage-clients > *'), { opacity: 0, y: 8  });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(ctx.querySelector('.exp-stage-logo'),
        { opacity: 1, scale: 1, duration: 0.7 }, 0.05)
      .to(ctx.querySelectorAll('.exp-stage-role-title .exp-char'),
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.022 }, 0.20)
      .to(ctx.querySelector('.exp-stage-meta'),
        { opacity: 1, y: 0, duration: 0.5 }, 0.40)
      .to(ctx.querySelector('.exp-stage-context'),
        { opacity: 1, y: 0, duration: 0.55 }, 0.50)
      .to(ctx.querySelector('.exp-stage-desc'),
        { opacity: 1, y: 0, duration: 0.55 }, 0.60)
      .to(ctx.querySelectorAll('.exp-stage-clients > *'),
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.75);
  }, { scope: containerRef, dependencies: [displayIdx] });

  /* ── Wheel/keyboard/touch driven role advance ──
   *   ParallaxScroller dispatches `parallax-internal-step` whenever
   *   the user scrolls within a section that has data-internal-steps.
   *   We listen for events with id="experience" (matching our section
   *   attr) and run the transition.                                   */
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ id: string; step: number }>;
      if (ev.detail.id !== 'experience') return;
      transitionRef.current(ev.detail.step);
    };
    window.addEventListener('parallax-internal-step', handler);
    return () => window.removeEventListener('parallax-internal-step', handler);
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="snap-section exp-host"
      /* data-internal-steps: ParallaxScroller reads this and treats
       *   the section as N internal beats, dispatching
       *   parallax-internal-step events as the user scrolls.  The
       *   track stays put — the BG is fixed, only the content
       *   morphs between roles.
       * data-internal-step-id: routes the events to this component. */
      data-internal-steps={EXPERIENCE.length}
      data-internal-step-id="experience"
    >
      <h2 className="exp-host-title">Experience</h2>

      {/* ── Left rail · timeline ── */}
      <aside className="exp-host-rail">
        <span className="exp-host-eyebrow">
          0{activeIdx + 1} <span className="exp-host-eyebrow-dim">/ 0{EXPERIENCE.length}</span>
        </span>

        <div className="exp-host-timeline-wrap">
          <span ref={markerRef} className="exp-host-marker" aria-hidden />

          <ol className="exp-host-timeline">
            {EXPERIENCE.map((s, i) => (
              <li
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="exp-host-step"
                data-state={i === activeIdx ? 'active' : i < activeIdx ? 'past' : 'todo'}
                onClick={() => transitionTo(i)}
              >
                <span className="exp-host-step-year">{yearRange(s.date)}</span>
                <span className="exp-host-step-name">{shortName(s.company)}</span>
              </li>
            ))}
          </ol>
        </div>

        <span className="exp-host-hint" aria-hidden>
          Scroll to advance
        </span>
      </aside>

      {/* ── Right stage ── */}
      <div className="exp-host-stage">
        <div className="exp-stage-content">
          <div className="exp-stage-logo">
            <CompanyLogo exp={exp} height="clamp(80px, 9vw, 140px)" />
          </div>

          <h3 className="exp-stage-role-title">{splitChars(exp.role)}</h3>

          <div className="exp-stage-meta">
            <span>{exp.date}</span>
            {exp.badge && <span className="exp-stage-badge">{exp.badge}</span>}
          </div>

          <p className="exp-stage-context">{exp.context}</p>
          <p className="exp-stage-desc">{exp.desc}</p>

          {exp.clients && exp.clients.length > 0 && (
            <div className="exp-stage-clients">
              <span className="exp-stage-clients-label">Clients</span>
              {exp.clients.map((c: any, k: number) => (
                <img
                  key={k}
                  src={c.src}
                  alt={c.alt}
                  style={{ height: c.height ?? 22, filter: clientFilter(c) }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Experience() {
  return (
    <>
      <MobileStack />
      <DesktopExperience />
    </>
  );
}
