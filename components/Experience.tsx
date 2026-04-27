'use client';
import { EXPERIENCE } from './data';

/* ─────────────────────────────────────────────────────────────────
 * Experience — split rendering by viewport
 *
 *   Desktop (>700px) · "stage per role" timeline
 *     - 4 snap-sections, each a full viewport beat
 *     - Left rail: 4-step indicator with current highlighted
 *     - Right stage: BIG company logo · role · date · context · desc
 *       · client logos
 *     - Each section renders ONLY its own state — no fixed/sticky
 *       overlays.  When ParallaxScroller leaves the experience zone
 *       there is nothing to bleed into Projects, by construction.
 *
 *   Mobile (≤700px) · stacked cards
 *     - One section.  Title at top, four glass cards below.
 *     - Big logo header, role, date, description, small client logos.
 *     - Reads top-down at conversation pace; no stepper, no parallax.
 *
 * Both variants render in the DOM.  CSS hides the irrelevant one;
 * ParallaxScroller filters out `display: none` snap-sections so the
 * step count is correct on both breakpoints.
 * ───────────────────────────────────────────────────────────────── */

/* Logo filter rules shared between desktop + mobile.  Most company /
 * client SVGs come in as black-on-transparent so we invert them to
 * white over the navy background.  Some come pre-coloured (`noFilter`)
 * or in brand colour (`multiColor`) so they need different recipes. */
function clientFilter(c: { alt?: string; noFilter?: boolean; multiColor?: boolean }) {
  if (c.noFilter)              return 'none';
  if (c.alt === 'Sky')         return 'brightness(0) invert(1)';
  if (c.multiColor)            return 'grayscale(1) brightness(1.9) contrast(0.9)';
  return 'brightness(0) invert(1)';
}

function CompanyLogo({ exp, height }: { exp: typeof EXPERIENCE[number]; height: string }) {
  if (exp.logoType === 'text') {
    return (
      <span
        className="exp-text-logo"
        style={{ fontSize: `calc(${height} * 0.78)` }}
      >
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
        width:      'auto',
        maxWidth:   '100%',
        objectFit:  'contain',
        filter:     (exp as any).logoFilter ?? 'brightness(0) invert(1)',
      }}
    />
  );
}

/* ── Mobile · stacked cards ──────────────────────────────────────── */
function MobileStack() {
  return (
    <section
      id="experience"
      className="snap-section exp-mobile"
    >
      <h2 className="exp-mobile-title">Experience</h2>

      <div className="exp-mobile-stack">
        {EXPERIENCE.map((exp, i) => (
          <article key={i} className="exp-mobile-card">
            <header className="exp-mobile-card-logo">
              <CompanyLogo exp={exp} height="56px" />
            </header>

            <div className="exp-mobile-card-meta">
              <span className="exp-mobile-card-role">{exp.role}</span>
              <span className="exp-mobile-card-date">{exp.date}</span>
              {exp.badge && <span className="exp-mobile-card-badge">{exp.badge}</span>}
            </div>

            <p className="exp-mobile-card-desc">{exp.desc}</p>

            {exp.clients && exp.clients.length > 0 && (
              <div className="exp-mobile-card-clients">
                {exp.clients.map((c: any, k: number) => (
                  <img
                    key={k}
                    src={c.src}
                    alt={c.alt}
                    style={{ height: c.height ? Math.min(c.height, 18) : 18, filter: clientFilter(c) }}
                  />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Desktop · stage per role ────────────────────────────────────── */
function DesktopTimeline() {
  return (
    <>
      {EXPERIENCE.map((exp, i) => (
        <section
          key={i}
          id={i === 0 ? 'experience' : undefined}
          className="snap-section exp-desktop"
        >
          {/* ── Stepper rail ── */}
          <aside className="exp-desktop-rail" aria-hidden>
            <span className="exp-desktop-rail-eyebrow">
              Experience · 0{i + 1} / 0{EXPERIENCE.length}
            </span>
            <ol className="exp-desktop-rail-steps">
              {EXPERIENCE.map((s, j) => (
                <li
                  key={j}
                  className="exp-desktop-rail-step"
                  data-state={j === i ? 'active' : j < i ? 'past' : 'todo'}
                >
                  <span className="exp-desktop-rail-step-dot" />
                  <span className="exp-desktop-rail-step-label">{shortName(s.company)}</span>
                </li>
              ))}
            </ol>
          </aside>

          {/* ── Stage ── */}
          <div className="exp-desktop-stage">
            <div className="exp-desktop-logo">
              <CompanyLogo exp={exp} height="clamp(72px, 9vw, 132px)" />
            </div>

            <h3 className="exp-desktop-role">{exp.role}</h3>

            <div className="exp-desktop-meta">
              <span>{exp.date}</span>
              {exp.badge && <span className="exp-desktop-meta-badge">{exp.badge}</span>}
            </div>

            <p className="exp-desktop-context">{exp.context}</p>
            <p className="exp-desktop-desc">{exp.desc}</p>

            {exp.clients && exp.clients.length > 0 && (
              <div className="exp-desktop-clients">
                <span className="exp-desktop-clients-label">Clients</span>
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
        </section>
      ))}
    </>
  );
}

/* Trim long company names for the rail label.  "XING (New Work SE)"
 * → "XING" so the rail stays one column wide.                          */
function shortName(name: string) {
  return name.split(' (')[0];
}

export default function Experience() {
  return (
    <>
      <MobileStack />
      <DesktopTimeline />
    </>
  );
}
