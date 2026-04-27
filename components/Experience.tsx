'use client';
import { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from './data';

/* ─────────────────────────────────────────────────────────────────
 * Experience — split rendering by viewport
 *
 *   Desktop (>700px) · pinned stage with cross-fade
 *     - 4 transparent trigger sections live inside ParallaxScroller
 *       so the wheel/snap UX still ticks once per role.
 *     - A fixed stage rendered OUTSIDE ParallaxScroller paints the
 *       title + rail + role content full-bleed.  As ParallaxScroller
 *       advances, an IntersectionObserver on the triggers picks the
 *       active idx; the stage cross-fades between roles in place.
 *     - When the user leaves the experience zone (scrolling into
 *       Projects or back to About), the stage fades out by setting
 *       idx = -1 — no fixed-overlay bleed into other sections.
 *
 *   Mobile (≤700px) · stacked cards
 *     - One section, four glass cards.  Eyebrow with date + badge,
 *       big logo, role title, description, client logos at the foot.
 *     - No sticky title, no parallax dots.
 *
 * Both variants live in the DOM.  CSS hides the irrelevant one and
 * ParallaxScroller filters out display:none snap-sections so the
 * step count stays correct.
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

/* ── Mobile · improved card stack ────────────────────────────────── */

function MobileStack() {
  return (
    <section id="experience" className="snap-section exp-mobile">
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

/* ── Desktop · transparent triggers ──────────────────────────────── */

function DesktopTriggers() {
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  /* Pick the trigger with the largest visible-area-ratio as active.
   * IntersectionObserver fires on threshold crossings; on every fire,
   * we recompute every trigger's visible ratio so the active idx is
   * always whichever beat dominates the viewport.
   *
   * Going to idx=-1 only when NO trigger has even 5% visibility kills
   * the flicker we used to get during ParallaxScroller's transition
   * (where two triggers briefly straddle the threshold). */
  useEffect(() => {
    const compute = () => {
      let bestIdx   = -1;
      let bestRatio =  0;
      const vh      = window.innerHeight || 1;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r       = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
        const ratio   = visible / vh;
        if (ratio > bestRatio) {
          bestIdx   = i;
          bestRatio = ratio;
        }
      });
      const idx = bestRatio > 0.05 ? bestIdx : -1;
      window.dispatchEvent(new CustomEvent('exp-change', { detail: { idx } }));
    };

    const obs = new IntersectionObserver(compute, {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
    });
    stepRefs.current.forEach((el) => { if (el) obs.observe(el); });

    /* ParallaxScroller transforms the track via rAF instead of native
     * scroll, so IO doesn't always fire at the right moment.  A short
     * interval keeps the active idx accurate during the lerp.  The
     * cost is trivial — one rect read per trigger every 100 ms. */
    const tick = window.setInterval(compute, 100);
    compute();

    return () => {
      obs.disconnect();
      clearInterval(tick);
      window.dispatchEvent(new CustomEvent('exp-change', { detail: { idx: -1 } }));
    };
  }, []);

  return (
    <>
      {EXPERIENCE.map((_, i) => (
        <section
          key={i}
          id={i === 0 ? 'experience' : undefined}
          ref={(el) => { stepRefs.current[i] = el; }}
          className="snap-section exp-desktop-trigger"
          aria-hidden="true"
        />
      ))}
    </>
  );
}

/* ── Desktop · fixed pinned stage (rendered OUTSIDE ParallaxScroller) ── */

export function ExperienceStage() {
  const [idx, setIdx] = useState(-1);

  useEffect(() => {
    const handler = (e: Event) =>
      setIdx((e as CustomEvent<{ idx: number }>).detail.idx);
    window.addEventListener('exp-change', handler);
    return () => window.removeEventListener('exp-change', handler);
  }, []);

  const visible = idx >= 0;
  const safeIdx = visible ? idx : 0;

  return (
    <div
      className={`exp-stage${visible ? ' is-visible' : ''}`}
      aria-hidden={!visible}
    >
      <h2 className="exp-stage-title">Experience</h2>

      <aside className="exp-stage-rail">
        <span className="exp-stage-rail-eyebrow">
          0{safeIdx + 1} / 0{EXPERIENCE.length}
        </span>
        <ol className="exp-stage-rail-steps">
          {EXPERIENCE.map((s, i) => (
            <li
              key={i}
              data-state={i === safeIdx ? 'active' : i < safeIdx ? 'past' : 'todo'}
            >
              <span className="exp-stage-rail-dot" />
              <span className="exp-stage-rail-label">{shortName(s.company)}</span>
            </li>
          ))}
        </ol>
      </aside>

      <div className="exp-stage-content">
        {EXPERIENCE.map((exp, i) => (
          <div
            key={i}
            className="exp-stage-role"
            data-active={i === safeIdx || undefined}
          >
            <div className="exp-stage-logo">
              <CompanyLogo exp={exp} height="clamp(80px, 9vw, 140px)" />
            </div>

            <h3 className="exp-stage-role-title">{exp.role}</h3>

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
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <>
      <MobileStack />
      <DesktopTriggers />
    </>
  );
}
