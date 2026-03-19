'use client';
import { useEffect, useState } from 'react';
import ScrollStack, { ScrollStackItem } from './reactbits/ScrollStack/ScrollStack';
import HorizScrollStack, { HorizStackItem } from './HorizScrollStack';
import { PROJECTS } from './data';

type Project = typeof PROJECTS[number];

/* ── Bento teal palette (same as Stack section) ──────────────────────────── */
const CARD_BGS = ['#075e55', '#032f2b', '#0a8d80', '#0dbcaa'];
// Cards 0,1,2 are dark → white icons/text; card 3 is light → dark icons/text
const isDarkCard = (i: number) => ['#075e55','#032f2b','#0a8d80'].includes(CARD_BGS[i % CARD_BGS.length]);

/* ── Project icons — exact user-provided SVGs, color only changed ─────────── */
function WeatherIcon({ dark }: { dark?: boolean }) {
  const c = dark ? '#0B0F14' : '#ffffff';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '100%', height: '100%' }}>
      <path fill={c} d="M25.996 15.998c6.337 0 9.932 4.194 10.454 9.26h.16c4.078 0 7.384 3.297 7.384 7.365c0 4.067-3.306 7.365-7.384 7.365H15.38c-4.077 0-7.383-3.298-7.383-7.365c0-4.068 3.306-7.365 7.384-7.365h.16c.526-5.1 4.117-9.26 10.455-9.26ZM7.569 24.19a1.75 1.75 0 0 1-.499 2.3l-.142.09l-1.299.75a1.75 1.75 0 0 1-1.892-2.94l.142-.09l1.3-.75a1.75 1.75 0 0 1 2.39.64Zm14.136-9.54c-3.801 1.22-6.509 4.091-7.62 7.922l-.094.34l-.116.476l-.412.077a9.276 9.276 0 0 0-3.342 1.43A7.883 7.883 0 0 1 21.705 14.65Zm-16.2-.671l.132.055l1.36.634a1.75 1.75 0 0 1-1.347 3.227l-.132-.055l-1.36-.634a1.75 1.75 0 0 1 1.347-3.227Zm19.11-5.763a1.75 1.75 0 0 1 .508 2.317l-.078.12l-.86 1.23a1.75 1.75 0 0 1-2.945-1.887l.078-.121l.86-1.229a1.75 1.75 0 0 1 2.438-.43Zm-10.291-.419l.065.156l.513 1.41a1.75 1.75 0 0 1-3.224 1.352l-.065-.156l-.513-1.41a1.75 1.75 0 0 1 3.224-1.352Z"/>
    </svg>
  );
}

function TripsIcon({ dark }: { dark?: boolean }) {
  const c = dark ? '#0B0F14' : '#ffffff';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '100%', height: '100%' }}>
      <path fill={c} fillRule="evenodd" d="m308.209 85.336l8.783 2.972l138.667 46.934l13.674 4.629v67.6c-11.815-12.515-26.353-22.432-42.666-28.803v-13.01l-85.334-28.882v41.892c-16.313 6.371-30.851 16.288-42.666 28.803v-75.958l-85.334 37.547v146.941c17.629-7.069 37.995-14.979 53.585-20.261a116.7 116.7 0 0 0 8.719 37.337c-14.943 5.312-33.613 12.641-49.9 19.221a2696 2696 0 0 0-32.453 13.367l-2.015.848l-.516.218l-.128.055l-.031.013l-9.001 3.813l-9.087-3.635l-117.334-46.934l-12.505-5.003V86.062l30.16 12.064l108.069 43.228l118.897-52.315zM85.333 144.373l85.334 34.133v146.492l-85.334-34.134zm298.66 68.963c43.201 0 78.222 35.021 78.222 78.222c0 14.25-3.799 27.601-10.467 39.116c-6.668 11.514-67.755 117.329-67.755 117.329s-61.087-105.815-67.755-117.329c-6.668-11.515-10.467-24.866-10.467-39.116c0-43.201 35.021-78.222 78.222-78.222m33.523 78.222c0 18.515-15.01 33.524-33.524 33.524s-33.524-15.009-33.524-33.524c0-18.514 15.009-33.524 33.524-33.524c18.514 0 33.524 15.01 33.524 33.524"/>
    </svg>
  );
}

function FutsalIcon({ dark }: { dark?: boolean }) {
  const c = dark ? '#0B0F14' : '#ffffff';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '100%', height: '100%' }}>
      <path fill={c} d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48Zm143 304h-45.22a8 8 0 0 1-6.91-4l-16.14-27.68a8 8 0 0 1-.86-6l14.86-59.92a8 8 0 0 1 4.65-5.45l28.1-11.9a8 8 0 0 1 8.34 1.3l41.63 35.82a8 8 0 0 1 2.69 7.26a174.75 174.75 0 0 1-24.28 66.68A8 8 0 0 1 399 352ZM134.52 237.13l28.1 11.9a8 8 0 0 1 4.65 5.45l14.86 59.92a8 8 0 0 1-.86 6L165.13 348a8 8 0 0 1-6.91 4H113a8 8 0 0 1-6.82-3.81a174.75 174.75 0 0 1-24.28-66.68a8 8 0 0 1 2.69-7.26l41.63-35.82a8 8 0 0 1 8.3-1.3Zm256.94-87.24l-18.07 51.38A8 8 0 0 1 369 206l-29.58 12.53a8 8 0 0 1-8.26-1.24L274.9 170.1a8 8 0 0 1-2.9-6.1v-33.58a8 8 0 0 1 3.56-6.65l42.83-28.54a8 8 0 0 1 7.66-.67A176.92 176.92 0 0 1 390 142a8 8 0 0 1 1.46 7.89ZM193.6 95.23l42.84 28.54a8 8 0 0 1 3.56 6.65V164a8 8 0 0 1-2.86 6.13l-56.26 47.19a8 8 0 0 1-8.26 1.24L143 206a8 8 0 0 1-4.43-4.72L120.5 149.9a8 8 0 0 1 1.5-7.9a176.92 176.92 0 0 1 64-47.48a8 8 0 0 1 7.6.71Zm17.31 327.46L191.18 373a8 8 0 0 1 .52-7l15.17-26a8 8 0 0 1 6.91-4h84.44a8 8 0 0 1 6.91 4l15.18 26a8 8 0 0 1 .53 7l-19.59 49.67a8 8 0 0 1-5.69 4.87a176.58 176.58 0 0 1-79 0a8 8 0 0 1-5.65-4.85Z"/>
    </svg>
  );
}

function CafecitaIcon({ dark }: { dark?: boolean }) {
  const c = dark ? '#0B0F14' : '#ffffff';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
      <g fill="none" stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M3 14c.83.642 2.077 1.017 3.5 1c1.423.017 2.67-.358 3.5-1c.83-.642 2.077-1.017 3.5-1c1.423-.017 2.67.358 3.5 1M8 3a2.4 2.4 0 0 0-1 2a2.4 2.4 0 0 0 1 2m4-4a2.4 2.4 0 0 0-1 2a2.4 2.4 0 0 0 1 2"/>
        <path d="M3 10h14v5a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-5z"/>
        <path d="M16.746 16.726a3 3 0 1 0 .252-5.555"/>
      </g>
    </svg>
  );
}

const PROJECT_ICONS = [WeatherIcon, TripsIcon, FutsalIcon, CafecitaIcon];

/* ── Card content (no button, no counter) ────────────────────────────────── */
function CardContent({ p, i, compact }: { p: Project; i: number; compact?: boolean }) {
  const Icon = PROJECT_ICONS[i % PROJECT_ICONS.length];
  const dark = !isDarkCard(i);
  const textColor = isDarkCard(i) ? '#E8ECF0' : '#0B0F14';
  const subColor = isDarkCard(i) ? 'rgba(232,236,240,0.55)' : 'rgba(11,15,20,0.55)';
  const tagBg = isDarkCard(i) ? 'rgba(255,255,255,0.08)' : 'rgba(11,15,20,0.08)';
  const tagColor = isDarkCard(i) ? 'rgba(232,236,240,0.5)' : 'rgba(11,15,20,0.5)';
  const badgeBg = isDarkCard(i) ? 'rgba(255,255,255,0.08)' : 'rgba(11,15,20,0.08)';
  const badgeColor = isDarkCard(i) ? 'rgba(232,236,240,0.75)' : 'rgba(11,15,20,0.65)';
  const iconSize = compact ? 36 : 52;

  return (
    <>
      <div style={{ width: iconSize, height: iconSize, marginBottom: compact ? '1rem' : '1.6rem' }}>
        <Icon dark={dark} />
      </div>

      {'badge' in p && p.badge && (
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)', fontSize: '0.52rem', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '0.18rem 0.6rem',
          background: badgeBg, color: badgeColor,
          borderRadius: 20,
          marginBottom: compact ? '0.4rem' : '0.7rem',
        }}>
          {p.badge}
        </span>
      )}

      <h2 style={{
        fontFamily: 'Nohemi,sans-serif',
        fontSize: compact ? 'clamp(1.8rem, 7vw, 2.2rem)' : 'clamp(2.2rem, 3.5vw, 3.2rem)',
        fontWeight: 900, textTransform: 'uppercase',
        color: textColor, lineHeight: 1,
        marginBottom: compact ? '0.6rem' : '1rem',
        letterSpacing: '-0.02em',
      }}>
        {p.name}
      </h2>

      {'desc' in p && p.desc && (
        <p style={{
          fontFamily: 'Safiro,sans-serif',
          fontSize: compact ? '0.78rem' : '0.88rem',
          lineHeight: 1.7, color: subColor,
          marginBottom: compact ? '0.9rem' : '1.2rem',
        }}>
          {p.desc}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        {p.tags.map((t, j) => (
          <span key={j} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: compact ? '0.5rem' : '0.54rem',
            fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: compact ? '0.2rem 0.5rem' : '0.22rem 0.6rem',
            background: tagBg, borderRadius: 20, color: tagColor,
          }}>
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

/* ── Bottom glass panel — matches .pc-user-info from ProfileCard ─────────── */
function BottomPanel({ p, i, compact, cardRadius = 30 }: { p: Project; i: number; compact?: boolean; cardRadius?: number }) {
  if (!p.href || p.href === '#') return null;
  const inset = compact ? 14 : 20;
  // Concentric radius: cardRadius - inset + bias (matches pc-user-info formula)
  const panelRadius = 100;
  const glassBg = isDarkCard(i) ? 'rgba(255,255,255,0.1)' : 'rgba(11,15,20,0.1)';
  const glassBorder = isDarkCard(i) ? 'rgba(255,255,255,0.1)' : 'rgba(11,15,20,0.1)';
  const glassBorderHover = isDarkCard(i) ? 'rgba(255,255,255,0.35)' : 'rgba(11,15,20,0.35)';
  const textCol = isDarkCard(i) ? 'rgba(232,236,240,0.9)' : 'rgba(11,15,20,0.85)';

  return (
    <a
      href={p.href}
      target={p.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        position: 'absolute',
        bottom: inset, left: inset, right: inset,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: glassBg,
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: `1px solid ${glassBorder}`,
        borderRadius: panelRadius,
        padding: compact ? '10px 14px' : '12px 14px',
        color: textCol,
        fontFamily: 'Nohemi,sans-serif',
        fontSize: compact ? '0.68rem' : '0.72rem',
        fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease',
        zIndex: 2,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = glassBorderHover; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = glassBorder; }}
    >
      <span>View Project</span>
      <span style={{ fontSize: '1.1em' }}>→</span>
    </a>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="projects"
      className="snap-section"
      style={{ background: CARD_BGS[0], position: 'relative', height: '100vh', overflow: 'hidden' }}
    >
      {/* Static title just below nav */}
      <div style={{
        position: 'absolute', top: '4.5rem', left: '2.5rem',
        fontFamily: 'Nohemi,sans-serif',
        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
        fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em',
        color: 'rgba(232,236,240,0.9)', zIndex: 10, pointerEvents: 'none',
      }}>
        Projects
      </div>

      {isMobile ? (
        /* ── Mobile: vertical ScrollStack ───────────────────────────────── */
        <ScrollStack
          className="projects-stack"
          stackPosition="22%"
          itemDistance={60}
          itemScale={0.03}
          itemStackDistance={18}
          baseScale={0.88}
          scaleEndPosition="8%"
          onStackComplete={() => {}}
        >
          {PROJECTS.map((p, i) => (
            <ScrollStackItem key={i}>
              <div style={{
                width: '100%', height: '100%',
                background: CARD_BGS[i % CARD_BGS.length],
                borderRadius: 30, overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}>
                <div style={{ padding: '1.6rem 1.4rem 5rem' }}>
                  <CardContent p={p} i={i} compact />
                </div>
                <BottomPanel p={p} i={i} compact />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      ) : (
        /* ── Desktop: horizontal ScrollStack ────────────────────────────── */
        <HorizScrollStack
          itemDistance={40}
          itemScale={0.025}
          itemStackDistance={24}
          stackPosition="16%"
          scaleEndPosition="6%"
          baseScale={0.88}
        >
          {PROJECTS.map((p, i) => (
            <HorizStackItem key={i}>
              <div style={{
                width: 380,
                aspectRatio: '0.718',
                background: CARD_BGS[i % CARD_BGS.length],
                borderRadius: 30, overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
                flexShrink: 0,
              }}>
                <div style={{ padding: '2.2rem 2rem 6rem' }}>
                  <CardContent p={p} i={i} />
                </div>
                <BottomPanel p={p} i={i} />
              </div>
            </HorizStackItem>
          ))}
        </HorizScrollStack>
      )}
    </section>
  );
}
