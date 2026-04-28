'use client';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { List, Sparkle, Stop, Play, Plus } from '@phosphor-icons/react';
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
  ['Sky · HBO · Vodafone · Bell Media', 'Multi-camera SDK',            'First iOS role'            ],
];

/* The "current focus" shown as the last segment of the Xcode
 * breadcrumb — pulled from each manifest's most interesting field. */
const BREADCRUMB_FOCUS = ['workflow', 'metrics', 'clients', 'shippedIn'];

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
  const className = file.replace(/\.swift$/, '');
  const focus     = BREADCRUMB_FOCUS[activeIdx];

  return (
    <div className="exp-xcode" aria-label={`Xcode · ${file}`}>
      {/* ── Toolbar · traffic lights · sidebar/assistant icons ·
       *    stop/run · scheme pill · status                       */}
      <div className="exp-xcode-toolbar">
        <div className="exp-xcode-traffic" aria-hidden>
          <span className="exp-xcode-light" data-c="r" />
          <span className="exp-xcode-light" data-c="y" />
          <span className="exp-xcode-light" data-c="g" />
        </div>

        <button type="button" className="exp-xcode-tool-btn" aria-label="Toggle navigator" tabIndex={-1}>
          <List size={14} weight="regular" />
        </button>
        <button type="button" className="exp-xcode-tool-btn" aria-label="Coding intelligence" tabIndex={-1}>
          <Sparkle size={14} weight="fill" />
        </button>

        <span className="exp-xcode-toolbar-divider" />

        <button type="button" className="exp-xcode-tool-btn" aria-label="Stop" tabIndex={-1}>
          <Stop size={11} weight="fill" />
        </button>
        <button type="button" className="exp-xcode-tool-btn exp-xcode-run" aria-label="Run" tabIndex={-1}>
          <Play size={11} weight="fill" />
        </button>

        <span className="exp-xcode-toolbar-spacer" />

        <div className="exp-xcode-scheme" aria-hidden>
          <span className="exp-xcode-scheme-mark">{'{x}'}</span>
          <span className="exp-xcode-scheme-name">agonzx</span>
          <span className="exp-xcode-scheme-sep">›</span>
          <span className="exp-xcode-scheme-device">iPhone 17 Pro</span>
        </div>

        <span className="exp-xcode-toolbar-spacer" />

        <span className="exp-xcode-status" aria-hidden>
          <span className="exp-xcode-status-dot" />
          Ready
        </span>
      </div>

      {/* ── Tab strip · pill-shaped tabs, active fills with subtle bg ── */}
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
            <span className="exp-xcode-tab-icon" aria-hidden />
            <span className="exp-xcode-tab-label">{m.file}</span>
          </button>
        ))}
        <button type="button" className="exp-xcode-tab-add" aria-label="New tab" tabIndex={-1}>
          <Plus size={11} weight="bold" />
        </button>
      </div>

      {/* ── Breadcrumb · file path with chevron separators ── */}
      <div className="exp-xcode-breadcrumb" aria-hidden>
        <span className="exp-xcode-tab-icon exp-xcode-tab-icon--sm" />
        <span>agonzx</span>
        <span className="exp-xcode-breadcrumb-sep">›</span>
        <span>Experience</span>
        <span className="exp-xcode-breadcrumb-sep">›</span>
        <span>{className}</span>
        <span className="exp-xcode-breadcrumb-sep">›</span>
        <span className="exp-xcode-breadcrumb-active">{focus}</span>
      </div>

      {/* ── Code body · gutter + colourised lines ── */}
      <div className="exp-xcode-body">
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

  /* Stage transition · OUT → swap → IN.
   *
   * The flash bug we used to have ("new content appears, disappears,
   * then types in") came from React rendering the next role's content
   * after OUT but BEFORE useGSAP's set() call ran.  Fix here: the OUT
   * tween animates code lines back to clip-path inset(0 100% 0 0) AND
   * left items to opacity 0 — both stay in that state through the
   * React swap thanks to the matching CSS defaults on .exp-xcode-line
   * and .exp-host-left > *.  When the new lines mount, they inherit
   * the closed clip-path from CSS, so the IN typewriter starts from
   * an empty stage every time.  No flash, no flicker.                */
  transitionRef.current = (next: number) => {
    if (isAnimating.current || next === activeIdx) return;
    isAnimating.current = true;
    setActiveIdx(next);

    const ctx = containerRef.current;
    if (!ctx) { setDisplayIdx(next); isAnimating.current = false; return; }

    const tlOut = gsap.timeline({
      onComplete: () => {
        setDisplayIdx(next);
        isAnimating.current = false;
      },
    });

    /* Left column · fade out logo/date/tagline/chips. */
    tlOut.to(ctx.querySelectorAll('.exp-host-left > *'),
      { opacity: 0, y: -8, duration: 0.26, ease: 'power2.in', stagger: 0.025 }, 0);

    /* Code lines · collapse clip-path back to closed (right edge wipes
     * left to clear the editor), so when the new lines mount they
     * land in the same closed state and the IN typewriter starts
     * from an empty editor — no fragment of the old code visible. */
    tlOut.to(ctx.querySelectorAll('.exp-xcode-line'),
      { clipPath: 'inset(0 100% 0 0)', duration: 0.2, ease: 'power2.in', stagger: 0.012 }, 0);
  };
  const transitionTo = (next: number) => transitionRef.current(next);

  /* ── Stage IN animation runs whenever displayIdx changes ── */
  useGSAP(() => {
    const ctx = containerRef.current;
    if (!ctx) return;

    /* Reset to entry state.  CSS already handles this for new mounts
     * via the defaults on .exp-host-left > * / .exp-xcode-line, but
     * we set it again here for elements that survived React's
     * reconciliation (so old inline styles don't linger).             */
    gsap.set(ctx.querySelectorAll('.exp-host-left > *'),
      { opacity: 0, y: 8 });
    gsap.set(ctx.querySelectorAll('.exp-xcode-line'),
      { clipPath: 'inset(0 100% 0 0)' });

    /* Left column · stagger the date/logo/tagline/chips in. */
    gsap.to(ctx.querySelectorAll('.exp-host-left > *'),
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.06, delay: 0.05 });

    /* Type-on, line by line, sequential.  Using a single timeline
     * with the default position param means each line waits for the
     * previous to finish, so the eye reads "type → enter → type →
     * enter" rather than parallel revealing.  Per-char duration
     * tuned so the slowest line still finishes in ≈ 0.6 s.            */
    const lines = ctx.querySelectorAll<HTMLDivElement>('.exp-xcode-line');
    const tlType = gsap.timeline({ delay: 0.4 });
    lines.forEach((line) => {
      const charCount = (line.textContent || '').length;
      if (charCount === 0) {
        /* Blank line · still let the rhythm continue.  Reveal it
         * instantly and add a small gap so the cadence stays steady. */
        tlType.set(line, { clipPath: 'inset(0 0% 0 0)' });
        tlType.to({}, { duration: 0.05 });
        return;
      }
      tlType.to(line, {
        clipPath: 'inset(0 0% 0 0)',
        duration: Math.max(0.08, charCount * 0.013),
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
          <span className="exp-host-date">
            <span className="exp-host-date-dot" aria-hidden />
            {exp.date}
          </span>
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
