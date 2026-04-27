'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

/* ─────────────────────────────────────────────────────────────────
 * Stack — infinite horizontal logo marquee.
 *
 * Two rows scrolling in opposite directions at slightly different
 * speeds. The track is the logo set duplicated (× 2) so the loop
 * resets seamlessly at -50% translateX. Hover pauses both rows.
 *
 * Edge-fade gradients on left/right hide the seams of the loop.
 * Single accent colour on hover underline. No card chrome — like
 * the original spec, simpler and calmer than a bento.
 * ───────────────────────────────────────────────────────────────── */

const GithubCopilotMono = dynamic(() => import('@lobehub/icons/es/GithubCopilot/components/Mono'), { ssr: false });
const CursorMono        = dynamic(() => import('@lobehub/icons/es/Cursor/components/Mono'),        { ssr: false });
const CodexMono         = dynamic(() => import('@lobehub/icons/es/Codex/components/Mono'),         { ssr: false });

type LogoKind = 'wiki-img' | 'wiki-gray' | 'lobehub';

interface Logo {
  label:    string;
  kind:     LogoKind;
  src?:     string;
  lobeName?:'GithubCopilot' | 'Cursor' | 'Codex';
  noFilter?:boolean;
  width?:   number; // visual width budget so wordmark logos read at the right size
}

const ROW_A: Logo[] = [
  // Swift opens the row; SwiftUI lives in row B so the bird and the
  // hexagonal "S" don't sit side by side.
  { label:'Swift',     kind:'wiki-img',  src:'/logos/swift-bird.svg',                                                                    width: 32 },
  { label:'Xcode',     kind:'wiki-img',  src:'/logos/xcode-svgrepo-com.svg',                                                              width: 32 },
  { label:'Apple',     kind:'wiki-img',  src:'/logos/apple-black-logo-svgrepo-com.svg',                                                  width: 28 },
  { label:'App Store', kind:'wiki-img',  src:'/logos/appstore-white.svg',     noFilter:true,                                              width: 90 },
  { label:'Cursor',    kind:'wiki-img',  src:'/logos/cursor-lockup.svg',     noFilter:true,                                               width: 88 },
  { label:'Claude',    kind:'wiki-gray', src:'https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg',                  width: 32 },
  { label:'Codex',     kind:'lobehub',   lobeName:'Codex',                                                                                width: 32 },
  { label:'Copilot',   kind:'lobehub',   lobeName:'GithubCopilot',                                                                         width: 32 },
  // Kotlin uses the white-invert filter so the wordmark text doesn't
  // come out black against navy. (wiki-gray was leaving the "Kotlin"
  // label dark on the dark bg.)
  { label:'Kotlin',    kind:'wiki-img',  src:'https://upload.wikimedia.org/wikipedia/commons/7/76/Kotlin_logo_%282021-present%29.svg',   width: 96 },
];

const ROW_B: Logo[] = [
  { label:'OpenAI',    kind:'wiki-img',  src:'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',               width: 32 },
  { label:'Firebase',  kind:'wiki-gray', src:'https://upload.wikimedia.org/wikipedia/commons/0/0b/New_Firebase_logo.svg',         width: 32 },
  { label:'SwiftUI',   kind:'wiki-img',  src:'/logos/swiftui.svg',                                                                width: 32 },
  { label:'GraphQL',   kind:'wiki-gray', src:'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg',              width: 32 },
  { label:'Datadog',   kind:'wiki-img',  src:'/logos/datadog-wordmark.svg',                                                       width: 96 },
  { label:'Git',       kind:'wiki-img',  src:'https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg',                  width: 64 },
  { label:'GitHub',    kind:'wiki-img',  src:'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',      width: 32 },
  { label:'Jira',      kind:'wiki-gray', src:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Jira_Logo.svg',                 width: 32 },
  { label:'Figma',     kind:'wiki-gray', src:'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',                width: 24 },
  { label:'Notion',    kind:'wiki-img',  src:'/logos/notion-white.svg',     noFilter:true,                                        width: 80 },
];

const SIZE = 48; // logo height in px — all logos render at this exact height; width follows natural aspect ratio

function LogoChip({ logo }: { logo: Logo }) {
  const [hovered, setHovered] = useState(false);

  const rendered = (() => {
    if (logo.kind === 'lobehub' && logo.lobeName) {
      const Icon =
        logo.lobeName === 'GithubCopilot' ? GithubCopilotMono :
        logo.lobeName === 'Cursor'        ? CursorMono :
                                             CodexMono;
      return (
        <span
          style={{
            display:    'inline-flex',
            alignItems: 'center',
            color:      hovered ? 'var(--white)' : 'rgba(255,255,255,0.42)',
            transition: 'color 0.3s var(--ease)',
          }}
        >
          <Icon size={SIZE} />
        </span>
      );
    }
    if (logo.noFilter) {
      return (
        <img
          src={logo.src}
          alt={logo.label}
          style={{
            height:     SIZE,
            width:      'auto',
            opacity:     hovered ? 1 : 0.55,
            transition: 'opacity 0.3s var(--ease)',
            display:    'block',
            objectFit:  'contain',
          }}
        />
      );
    }
    const filter = logo.kind === 'wiki-gray'
      ? `grayscale(1) brightness(${hovered ? '2.6' : '1.85'})`
      : `brightness(0) invert(1)`;
    return (
      <img
        src={logo.src}
        alt={logo.label}
        style={{
          height:     SIZE,
          width:      'auto',
          objectFit:  'contain',
          opacity:    hovered ? 1 : 0.55,
          filter,
          transition: 'opacity 0.3s var(--ease), filter 0.3s var(--ease)',
          display:    'block',
        }}
      />
    );
  })();

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={logo.label}
      style={{
        flex:       '0 0 auto',
        display:    'inline-flex',
        alignItems: 'center',
        padding:    '0 clamp(1.5rem, 3vw, 2.5rem)',
      }}
    >
      {rendered}
    </span>
  );
}

function MarqueeRow({ logos, durationS, reverse }: { logos: Logo[]; durationS: number; reverse?: boolean }) {
  // The track contains the same logo array twice, so the animation can
  // translate to -50% and loop seamlessly. We hard-code the keyframes
  // inline (template literal) so each row gets a unique animation name
  // when reversed.
  const animName = reverse ? 'stkMarqRev' : 'stkMarq';

  return (
    <div
      className="stk-marq-track"
      style={{
        display:        'flex',
        flexShrink:      0,
        alignItems:     'center',
        width:          'max-content',
        animation:      `${animName} ${durationS}s linear infinite`,
        willChange:     'transform',
      }}
    >
      {/* Render the set THREE times. The keyframes translate by exactly
          one set-width (-33.333%), so on loop reset the visible viewport
          shows the second set in place of the first — pixel-perfect
          seamless, no rounding glitch on the wrap. */}
      {[...logos, ...logos, ...logos].map((logo, i) => (
        <LogoChip logo={logo} key={`${logo.label}-${i}`} />
      ))}
    </div>
  );
}

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="stack"
      ref={sectionRef}
      data-home-section="stack"
      className="snap-section"
      style={{
        background:    'var(--bg)',
        position:      'relative',
        overflow:      'hidden',
        padding:       'clamp(3rem,5vh,4.5rem) 0',
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'center',
      }}
    >
      {/* Header — kept inside container padding */}
      <div
        style={{
          position:     'relative',
          zIndex:        1,
          maxWidth:     1200,
          margin:       '0 auto clamp(2rem, 4vw, 3rem)',
          width:        '100%',
          padding:      '0 clamp(1.5rem,4vw,3.5rem)',
        }}
      >
        <header>
          <h2
            style={{
              fontFamily:    'Nohemi, sans-serif',
              fontSize:      'clamp(2rem, 5vw, 3.6rem)',
              fontWeight:    600,
              letterSpacing: '-0.035em',
              lineHeight:     0.95,
              color:         'var(--white)',
              margin:         0,
            }}
          >
            What I use.
          </h2>
        </header>
      </div>

      {/* Marquee container — full bleed with edge fades */}
      <div
        style={{
          position:     'relative',
          width:        '100%',
          maxWidth:     '100vw',
          overflow:     'hidden',
          padding:      '1.5rem 0',
        }}
      >
        {/* Edge fade gradients */}
        <div
          aria-hidden
          style={{
            position:      'absolute',
            top:            0,
            bottom:         0,
            left:           0,
            width:         'clamp(60px, 10vw, 140px)',
            background:    'linear-gradient(to right, var(--bg), transparent)',
            zIndex:         2,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position:      'absolute',
            top:            0,
            bottom:         0,
            right:          0,
            width:         'clamp(60px, 10vw, 140px)',
            background:    'linear-gradient(to left, var(--bg), transparent)',
            zIndex:         2,
            pointerEvents: 'none',
          }}
        />

        <div
          className="stk-marq-rows"
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '2.5rem',
          }}
        >
          <MarqueeRow logos={ROW_A} durationS={56} />
          <MarqueeRow logos={ROW_B} durationS={64} reverse />
        </div>
      </div>

      <style suppressHydrationWarning>{`
        @keyframes stkMarq {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-33.3333%, 0, 0); }
        }
        @keyframes stkMarqRev {
          from { transform: translate3d(-33.3333%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        /* Pause both rows on section hover */
        section[data-home-section="stack"]:hover .stk-marq-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .stk-marq-track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
