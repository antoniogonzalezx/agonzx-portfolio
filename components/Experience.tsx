'use client';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { EXPERIENCE } from './data';

gsap.registerPlugin(useGSAP);

/* ─────────────────────────────────────────────────────────────────
 * Experience — "Stack manifest" pattern
 *
 * DESKTOP composition (mirrors axlab's Proceso section beat layout):
 *   - Title pinned top: "Experience. / From keyboard to App Store."
 *   - 2-col split:
 *       left  · big company logo + tagline + highlight chips
 *       right · simulated Xcode 26 window (rounded corners, glass
 *                traffic lights, file tabs as navigation indicator,
 *                code area with Swift syntax highlighting and a
 *                per-line type-on animation)
 *   - One snap-section with internal steps — ParallaxScroller's
 *     scroll-driven beats advance the role.  Background stays put,
 *     only the manifest content morphs.
 *
 * The code is the message: every role renders as a Swift `struct
 * Role: Experience { ... }` declaration, prefixed with `import
 * agonzx`.  Showing not telling — recruiters reading this for the
 * first time get the brand fit in a single glance.
 *
 * MOBILE composition · stacked cards (unchanged).
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
                    <img key={k} src={c.src} alt={c.alt}
                      style={{ height: 16, filter: clientFilter(c) }} />
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

/* ── Manifest data · per-role Swift snippets ───────────────────────
 * Each block is plain text; tokenize() at render time produces the
 * coloured spans.  Adding a new attribute to a manifest is a one-line
 * change here, no React refactor.
 * ──────────────────────────────────────────────────────────────── */

const MANIFEST: { file: string; code: string }[] = [
  {
    file: 'UserTesting.swift',
    code: `import agonzx

struct UserTesting: Experience {
  let role     = "Senior iOS Engineer"
  let team     = "Participant Experience · B2C"
  let surface  = "iOS apps people open to take a test"
  let stack    = ["Swift 6", "SwiftUI", "Modular SPM"]
  let workflow = AI.agentic(["Claude Code", "Codex", "Cursor"])
  let owns     = ["Component infra", "Shared libraries"]
  let dates    = "Feb 2026 — Present"
  // Embedded with PM, design and platform.
}`,
  },
  {
    file: 'XING.swift',
    code: `import agonzx

struct XING: Experience {
  let role     = "iOS Engineer"
  let surface  = "Jobs marketplace · 20M monthly users"
  let stack    = ["SwiftUI", "TCA", "Clean Arch", "Apollo GraphQL"]
  let owned    = "End-to-end job-application flow"
  let metrics  = Metrics(
    applyRate: "+120%",
    coverage:  "60% → 95%+",
    buildTime: "-40%"
  )
  let practices = ["A/B testing", "Swift 6", "Accessibility-first"]
  let dates    = "Oct 2022 — Feb 2026"
}`,
  },
  {
    file: 'Hiberus.swift',
    code: `import agonzx

struct Hiberus: Experience {
  let role    = "iOS Developer · Consulting"
  let stack   = ["Swift", "UIKit", "MVVM", "Combine"]
  let clients: [Client] = [
    .twentyMinutos,  // News app · iOS from scratch
    .xing,           // Pre-XING · rotation
    .bancaMarch      // Banking · short rotation
  ]
  let highlight = "Useful by week two on any codebase"
  let dates    = "May 2021 — Oct 2022"
}`,
  },
  {
    file: 'NexPlayer.swift',
    code: `import agonzx

struct NexPlayer: Experience {
  let role    = "Mobile Developer · Video streaming SDK"
  let stack   = ["Swift", "Kotlin", "AVFoundation", "ExoPlayer"]
  let shippedIn: [Broadcaster] = [
    .sky, .hbo, .vodafone, .bellMedia
  ]
  let features = [
    "Multi-camera synchronised playback",
    "Interactive video"
  ]
  let firstIOS = true
  let dates   = "Aug 2020 — May 2021"
}`,
  },
];

const HIGHLIGHTS: string[][] = [
  ['Senior · B2C iOS surface',  'AI agentic workflow',          'Swift 6 · SwiftUI · SPM'   ],
  ['+120% apply rate',          '60% → 95%+ test coverage',     '20M monthly active users'  ],
  ['20 Minutos · iOS from scratch', 'XING · Banca March rotations', 'Useful by week two'        ],
  ['Sky · HBO · Vodafone · Bell Media', 'Multi-camera SDK',            'First iOS · Aug 2020'      ],
];

const TAGLINE: string[] = [
  'Building the apps participants use to actually run a UserTesting test — embedded with product, design and platform.',
  'Owned the apply flow on a 20M-MAU jobs marketplace; metrics speak for themselves.',
  'iOS consulting rotations across XING, 20 Minutos and Banca March — built the 20 Minutos app from scratch.',
  'First iOS role, on a video streaming SDK that ended up inside Sky, HBO, Vodafone and Bell Media.',
];

/* ── Tokenizer · simple Swift-aware lexer ──────────────────────── */

type TokenType = 'kw' | 'ty' | 'str' | 'num' | 'cm' | 'prop' | 'plain';
interface Token { text: string; type: TokenType }
type CodeLine = Token[];

const KEYWORDS = new Set([
  'import','struct','class','let','var','func','enum','return','if','else',
  'for','in','guard','true','false','nil','as','is',
]);
const TYPES = new Set([
  'Experience','String','Int','Double','Bool','Date','AI','Client','Broadcaster',
  'Stack','Metrics',
]);

function tokenize(line: string): Token[] {
  const out: Token[] = [];
  let rest = line;
  const push = (t: Token) => { if (t.text.length > 0) out.push(t); };
  while (rest.length > 0) {
    let m: RegExpMatchArray | null;
    if ((m = rest.match(/^\/\/.*/)))                       { push({ text: m[0], type: 'cm'    }); break; }
    if ((m = rest.match(/^"[^"]*"/)))                      { push({ text: m[0], type: 'str'   }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^-?\d+(\.\d+)?%?/)))              { push({ text: m[0], type: 'num'   }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^\.[a-zA-Z_][a-zA-Z0-9_]*/)))     { push({ text: m[0], type: 'prop'  }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^[a-zA-Z_][a-zA-Z0-9_]*/))) {
      const w = m[0];
      let type: TokenType = 'plain';
      if (KEYWORDS.has(w))                                    type = 'kw';
      else if (TYPES.has(w) || /^[A-Z]/.test(w))              type = 'ty';
      push({ text: w, type });
      rest = rest.slice(w.length);
      continue;
    }
    if ((m = rest.match(/^\s+/))) { push({ text: m[0], type: 'plain' }); rest = rest.slice(m[0].length); continue; }
    push({ text: rest[0], type: 'plain' });
    rest = rest.slice(1);
  }
  return out;
}

function parseCode(text: string): CodeLine[] {
  return text.split('\n').map(tokenize);
}

/* ── Xcode window ──────────────────────────────────────────────── */

function XcodeWindow({
  activeIdx,
  onSelect,
}: {
  activeIdx: number;
  onSelect: (idx: number) => void;
}) {
  const { file, code } = MANIFEST[activeIdx];
  const lines = parseCode(code);

  return (
    <div className="exp-xcode" aria-label={`Xcode window · ${file}`}>
      {/* Title bar with traffic lights + filename */}
      <div className="exp-xcode-bar">
        <div className="exp-xcode-traffic" aria-hidden>
          <span className="exp-xcode-light" data-c="r" />
          <span className="exp-xcode-light" data-c="y" />
          <span className="exp-xcode-light" data-c="g" />
        </div>
        <span className="exp-xcode-filename">{file}</span>
        <span className="exp-xcode-spacer" aria-hidden />
      </div>

      {/* Tabs · double up as the role-navigation indicator */}
      <div className="exp-xcode-tabs" role="tablist">
        {MANIFEST.map((m, i) => (
          <button
            key={m.file}
            type="button"
            role="tab"
            aria-selected={i === activeIdx}
            onClick={() => onSelect(i)}
            className="exp-xcode-tab"
            data-active={i === activeIdx || undefined}
          >
            <span className="exp-xcode-tab-dot" aria-hidden />
            {m.file}
          </button>
        ))}
      </div>

      {/* Code body · gutter + colorised lines */}
      <div className="exp-xcode-body" key={activeIdx /* re-mount per role to retrigger type-on */}>
        <div className="exp-xcode-gutter" aria-hidden>
          {lines.map((_, i) => (
            <div key={i} className="exp-xcode-lineno">{i + 1}</div>
          ))}
        </div>
        <div className="exp-xcode-code">
          {lines.map((line, i) => (
            <div key={i} className="exp-xcode-line">
              {line.length === 0
                ? <span>&nbsp;</span>
                : line.map((tok, j) => (
                    <span key={j} className={`exp-xcode-tok exp-xcode-tok--${tok.type}`}>
                      {tok.text}
                    </span>
                  ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Desktop · stack manifest ──────────────────────────────────── */

function DesktopExperience() {
  const containerRef = useRef<HTMLElement>(null);
  const isAnimating  = useRef(false);
  const transitionRef = useRef<(next: number) => void>(() => {});

  const [activeIdx,  setActiveIdx]  = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);

  const exp = EXPERIENCE[displayIdx];

  /* Stage transition · OUT (left side fades out) → swap → IN (typewriter
   * runs on the new code).  Stored on a ref so the wheel-event handler
   * (registered once) always reads the latest closure.                */
  transitionRef.current = (next: number) => {
    if (isAnimating.current || next === activeIdx) return;
    isAnimating.current = true;
    setActiveIdx(next);

    const ctx = containerRef.current;
    if (!ctx) { setDisplayIdx(next); isAnimating.current = false; return; }

    /* OUT — fade the left column items + dim the existing code body so
     * the swap doesn't feel jarring.                                  */
    gsap.to(ctx.querySelectorAll('.exp-host-left > *, .exp-xcode-body > *'), {
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

  /* ── Stage IN animation runs whenever displayIdx changes ── */
  useGSAP(() => {
    const ctx = containerRef.current;
    if (!ctx) return;

    gsap.set(ctx.querySelectorAll('.exp-host-left > *'), { opacity: 0, y: 8 });
    gsap.set(ctx.querySelectorAll('.exp-xcode-body > *'), { opacity: 0, y: 8 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* Left column · stagger the logo/tagline/chips in. */
    tl.to(ctx.querySelectorAll('.exp-host-left > *'),
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, 0);

    /* Right column · gutter + code area appear together, then per-line
     * type-on does the heavy lifting.                                  */
    tl.to(ctx.querySelectorAll('.exp-xcode-body > *'),
        { opacity: 1, y: 0, duration: 0.4 }, 0.15);

    /* Type-on per line · clip-path inset shrinks left-to-right with a
     * `steps(N)` ease so each char "appears" one frame at a time, the
     * classic typewriter look without over-engineering.               */
    const lines = ctx.querySelectorAll<HTMLDivElement>('.exp-xcode-line');
    lines.forEach((line, i) => {
      const charCount = (line.textContent || '').length;
      gsap.set(line, { clipPath: 'inset(0 100% 0 0)' });
      if (charCount === 0) {
        gsap.set(line, { clipPath: 'inset(0 0% 0 0)' });
        return;
      }
      gsap.to(line, {
        clipPath: 'inset(0 0% 0 0)',
        duration: Math.max(0.18, charCount * 0.018),
        delay:    0.55 + i * 0.08,
        ease:     `steps(${charCount})`,
      });
    });
  }, { scope: containerRef, dependencies: [displayIdx] });

  /* ── Listen for ParallaxScroller's scroll-driven beats ── */
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
      data-internal-steps={EXPERIENCE.length}
      data-internal-step-id="experience"
    >
      <header className="exp-host-header">
        <h2 className="exp-host-title">
          <span className="exp-host-title-lead">Experience.</span>
          <span className="exp-host-title-muted">From keyboard to App Store.</span>
        </h2>
      </header>

      <div className="exp-host-grid">
        {/* LEFT · company info */}
        <aside className="exp-host-left">
          <div className="exp-host-logo">
            <CompanyLogo exp={exp} height="clamp(72px, 8vw, 110px)" />
          </div>
          <p className="exp-host-tagline">{TAGLINE[displayIdx]}</p>
          <ul className="exp-host-highlights" aria-label="Highlights">
            {HIGHLIGHTS[displayIdx].map((h, i) => (
              <li key={i} className="exp-host-chip">
                <span className="exp-host-chip-dot" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </aside>

        {/* RIGHT · Xcode window */}
        <div className="exp-host-right">
          <XcodeWindow activeIdx={activeIdx} onSelect={transitionTo} />
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
