'use client';
import { useRef, useCallback, useEffect, useReducer, useState } from 'react';
import dynamic from 'next/dynamic';
import { STACK_ITEMS } from './data';
import type { StackItem } from './data';

// Lobehub Mono icons (no @lobehub/ui needed)
const GithubCopilotMono = dynamic(() => import('@lobehub/icons/es/GithubCopilot/components/Mono'), { ssr: false });
const CursorMono        = dynamic(() => import('@lobehub/icons/es/Cursor/components/Mono'),        { ssr: false });
const CodexMono         = dynamic(() => import('@lobehub/icons/es/Codex/components/Mono'),         { ssr: false });
const CodexText         = dynamic(() => import('@lobehub/icons/es/Codex/components/Text'),         { ssr: false });

const lobeComponents: Record<string, { Mono?: any; Text?: any }> = {
  GithubCopilot: { Mono: GithubCopilotMono },
  Cursor:        { Mono: CursorMono },
  CodexCombine:  { Mono: CodexMono, Text: CodexText },
};

const COLS        = 12;
const ROWS        = 5;
const MOBILE_COLS = 4;
const MOBILE_ROWS = 6;
const GAP         = 6; // px

// Shadow tokens
const SHADOW_BASE       = '0 2px 6px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)';
const SHADOW_HOVER      = '0 8px 24px rgba(0,0,0,0.45), 0 3px 8px rgba(0,0,0,0.3),  inset 0 1px 0 rgba(255,255,255,0.13)';
const SHADOW_HERO       = '0 4px 20px rgba(13,188,170,0.25), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)';
const SHADOW_HERO_HOVER = '0 10px 36px rgba(13,188,170,0.4), 0 4px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.16)';

function getSpan(gridStr: string): number {
  const m = gridStr.match(/span\s+(\d+)/);
  return m ? parseInt(m[1]) : 1;
}

// ── BentoCard ────────────────────────────────────────────────────────────────

function BentoCard({ item, unit, isMobile }: { item: StackItem; unit: number; isMobile: boolean }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);

  const gridCol  = isMobile && item.mobileGridCol ? item.mobileGridCol : item.gridCol;
  const gridRow  = isMobile && item.mobileGridRow ? item.mobileGridRow : item.gridRow;

  const colSpan  = getSpan(gridCol);
  const rowSpan  = getSpan(gridRow);
  const isBig    = colSpan >= 2 && rowSpan >= 2;
  const isTall   = colSpan === 1 && rowSpan >= 2;
  const isWide   = colSpan >= 2 && rowSpan === 1;
  const isHero   = item.isHero === true;
  const iconDark = item.iconDark === true;
  const noFilter = item.noFilter === true;
  const scale    = item.iconScale ?? 1.0;

  // Physical cell dimensions (px)
  const cellW = unit * colSpan + GAP * (colSpan - 1);
  const cellH = unit * rowSpan + GAP * (rowSpan - 1);
  const pad   = isHero ? 20 : 10;

  // Icon size
  const availH = cellH - pad * 2;
  const availW = cellW - pad * 2;
  const rawSize = Math.max(14, Math.round(
    isHero  ? Math.min(availH * 0.52, availW * 0.52) :
    isBig   ? Math.min(availH * 0.48, availW * 0.48) :
    isTall  ? Math.min(availH * 0.44, availW * 0.80) :
    isWide  ? Math.min(availH * 0.50, availW * 0.30) :
              Math.min(availH * 0.48, availW * 0.48)
  ));
  const iconSize = Math.round(rawSize * scale);

  // Label font size
  const labelFontSize = unit === 0 ? 11 : Math.max(10, Math.min(30, Math.round(
    isHero  ? cellH * 0.075 :
    isBig   ? cellH * 0.08  :
    isTall  ? cellH * 0.07  :
    isWide  ? cellH * 0.22  :
              cellH * 0.18
  )));

  // Popup font sizes
  const popupLabel = Math.max(8, Math.min(14, Math.round(cellH * 0.13)));
  const popupInfo  = Math.max(7, Math.min(10, Math.round(cellH * 0.10)));

  // ── 3-D tilt + hover shadow ────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'box-shadow 0.25s ease';
    card.style.boxShadow  = isHero ? SHADOW_HERO_HOVER : SHADOW_HOVER;
    setShowInfo(true);
  }, [isHero]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card  = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;
    const r  = card.getBoundingClientRect();
    const x  = e.clientX - r.left;
    const y  = e.clientY - r.top;
    const rx = ((y - r.height / 2) / (r.height / 2)) * -5;
    const ry = ((x - r.width  / 2) / (r.width  / 2)) *  5;
    card.style.transition = 'box-shadow 0.25s ease';
    card.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x / r.width) * 100}% ${(y / r.height) * 100}%, rgba(255,255,255,0.1) 0%, transparent 65%)`;
      shine.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card  = cardRef.current;
    const shine = shineRef.current;
    if (card) {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease';
      card.style.transform  = '';
      card.style.boxShadow  = isHero ? SHADOW_HERO : SHADOW_BASE;
    }
    if (shine) shine.style.opacity = '0';
    setShowInfo(false);
  }, [isHero]);

  // Mobile: click to toggle popup
  const handleClick = useCallback(() => {
    if (isMobile) setShowInfo(v => !v);
  }, [isMobile]);

  // Close popup when switching between mobile/desktop
  useEffect(() => { setShowInfo(false); }, [isMobile]);

  // ── Icon ───────────────────────────────────────────────────────────────
  const renderIcon = () => {
    if ((item.type === 'wiki-img' || item.type === 'wiki-gray') && item.src) {
      let cls: string;
      if (noFilter) {
        cls = 'bento-icon';
      } else if (iconDark) {
        cls = `bento-icon ${item.type === 'wiki-gray' ? 'icon-dark-gray' : 'icon-dark'}`;
      } else {
        cls = `bento-icon ${item.type === 'wiki-gray' ? 'icon-gray' : 'icon-white'}${isHero ? ' icon-hero' : ''}`;
      }
      return (
        <img
          src={item.src}
          alt={item.label}
          className={cls}
          style={{
            maxHeight: iconSize,
            maxWidth: Math.min(availW * 0.92, iconSize * 5),
            height: 'auto',
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
            display: 'block',
          }}
        />
      );
    }
    if (item.type === 'lobehub' && item.lobeName) {
      const entry = lobeComponents[item.lobeName];
      const LIcon = entry?.Mono;
      const LText = entry?.Text;
      if (!LIcon) return null;

      if (LText) {
        return (
          <div
            className={`bento-icon ${iconDark ? 'icon-lobe-dark' : 'icon-lobe'}`}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: Math.round(iconSize * 0.3) }}
          >
            <LIcon size={iconSize} />
            <LText size={Math.round(iconSize * 0.65)} />
          </div>
        );
      }

      return (
        <div className={`bento-icon ${iconDark ? 'icon-lobe-dark' : 'icon-lobe'}`} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <LIcon size={iconSize} />
        </div>
      );
    }
    return null;
  };

  const icon      = renderIcon();
  const hasIcon   = icon !== null;
  const showLabel = item.showLabel !== false;

  const labelEl = showLabel ? (
    <span
      className={`bento-label${iconDark ? ' label-dark' : ''}`}
      style={{
        fontFamily: 'Nohemi,sans-serif',
        fontSize: labelFontSize,
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: labelFontSize > 16 ? '0.06em' : '0.1em',
        textAlign: 'center' as const,
        lineHeight: 1.2,
      }}
    >
      {item.label}
    </span>
  ) : null;

  // ── Layout ─────────────────────────────────────────────────────────────
  const gap = isBig || isTall ? '0.65rem' : '0.45rem';
  let inner: React.ReactNode;

  if (isBig || isTall) {
    inner = (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap, height:'100%', width:'100%' }}>
        {icon}{labelEl}
      </div>
    );
  } else if (isWide && hasIcon && showLabel) {
    inner = (
      <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', gap, height:'100%', width:'100%', padding:'0 0.3rem' }}>
        {icon}{labelEl}
      </div>
    );
  } else if (isWide && hasIcon) {
    inner = (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', width:'100%' }}>
        {icon}
      </div>
    );
  } else if (isWide) {
    inner = (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', width:'100%' }}>
        {labelEl}
      </div>
    );
  } else if (hasIcon && showLabel) {
    inner = (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap, height:'100%', width:'100%' }}>
        {icon}{labelEl}
      </div>
    );
  } else if (hasIcon) {
    inner = (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', width:'100%' }}>
        {icon}
      </div>
    );
  } else {
    inner = (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', width:'100%', textAlign:'center', padding:'0 0.3rem' }}>
        {labelEl}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`bento-cell${isHero ? ' bento-hero' : ''}`}
      style={{
        gridColumn: gridCol,
        gridRow:    gridRow,
        background: item.bg ?? '#075e55',
        borderRadius: 14,
        padding: `${pad}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        boxShadow: isHero ? SHADOW_HERO : SHADOW_BASE,
        transition: 'box-shadow 0.4s ease',
        overflow: 'hidden',
        minWidth: 0,
        minHeight: 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Cursor-follow shine */}
      <div ref={shineRef} style={{ position:'absolute', inset:0, borderRadius:'inherit', pointerEvents:'none', opacity:0, transition:'opacity 0.3s', zIndex:2 }} />

      {/* Content */}
      <div style={{ position:'relative', zIndex:3, width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {inner}
      </div>

      {/* Info popup overlay — desktop: shows on hover; mobile: click to toggle */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        background: 'rgba(11,15,20,0.90)',
        backdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0.4rem',
        zIndex: 20,
        opacity: showInfo ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity 0.18s ease',
      }}>
        <span style={{
          fontFamily: 'Nohemi,sans-serif',
          fontSize: popupLabel,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--accent)',
          textAlign: 'center',
          lineHeight: 1.2,
          display: 'block',
        }}>
          {item.label}
        </span>
        {item.info && cellH > 52 && (
          <span style={{
            fontFamily: 'Safiro,sans-serif',
            fontSize: popupInfo,
            color: 'var(--t2)',
            textAlign: 'center',
            lineHeight: 1.3,
            display: 'block',
            marginTop: '0.25rem',
            padding: '0 0.1rem',
          }}>
            {item.info}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Stack section ────────────────────────────────────────────────────────────

export default function Stack() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const unitRef     = useRef(0);
  const isMobileRef = useRef(false);
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const grid    = gridRef.current;
      if (!wrapper || !grid) return;

      const w       = wrapper.clientWidth;
      const h       = wrapper.clientHeight;
      const mobile  = w < 700;
      const cols    = mobile ? MOBILE_COLS : COLS;
      const rows    = mobile ? MOBILE_ROWS : ROWS;
      const unitW   = (w - (cols - 1) * GAP) / cols;
      const unitH   = (h - (rows - 1) * GAP) / rows;
      const unit    = Math.min(unitW, unitH);

      if (Math.abs(unit - unitRef.current) < 0.5 && mobile === isMobileRef.current) return;
      unitRef.current    = unit;
      isMobileRef.current = mobile;

      grid.style.gridTemplateColumns = `repeat(${cols}, ${unit}px)`;
      grid.style.gridAutoRows        = `${unit}px`;
      grid.style.width               = `${cols * unit + (cols - 1) * GAP}px`;

      forceUpdate();
    };

    update();
    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="stack"
      className="snap-section stack-section"
      suppressHydrationWarning
      style={{
        background: 'var(--bg2)',
        display: 'flex',
        flexDirection: 'column',
        padding: '8rem 2rem 1rem',
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Static title just below nav */}
      <div style={{
        position: 'absolute',
        top: '4.5rem',
        left: '2rem',
        fontFamily: 'Nohemi,sans-serif',
        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
        color: 'var(--white)',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        Tech Stack
      </div>

      <div
        ref={wrapperRef}
        style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          ref={gridRef}
          className="bento-grid"
          suppressHydrationWarning
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gap: `${GAP}px`,
          }}
        >
          {STACK_ITEMS.filter(item => !(isMobileRef.current && item.mobileHidden)).map((item, i) => (
            <BentoCard key={i} item={item} unit={unitRef.current} isMobile={isMobileRef.current} />
          ))}
        </div>
      </div>
    </section>
  );
}
