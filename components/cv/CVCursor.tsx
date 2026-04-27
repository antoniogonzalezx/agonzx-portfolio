'use client';

import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
 * CVCursor — same recipe as ServiciosCursor (the /lab cursor):
 *   - 6px white dot + 28px white ring
 *   - mix-blend-mode: difference so it always contrasts the
 *     surface beneath (paper, navy band, accent button)
 *   - ring grows + dims when hovering an interactive element
 *   - hidden on touch devices and when prefers-reduced-motion
 *
 * Inline styles here so /cv stays self-contained — no import of
 * styles/servicios.css needed.
 * ───────────────────────────────────────────────────────────────── */

export default function CVCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch  = matchMedia('(hover: none)').matches;
    const isReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduce) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('cv-cursor-on');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;
    let visible = false;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    };

    const isClickable = (el: Element | null): boolean => {
      let cur: Element | null = el;
      while (cur && cur !== document.body) {
        const tag = cur.tagName;
        if (tag === 'A' || tag === 'BUTTON') return true;
        if ((cur as HTMLElement).getAttribute?.('role') === 'button') return true;
        if (getComputedStyle(cur as HTMLElement).cursor === 'pointer') return true;
        cur = cur.parentElement;
      }
      return false;
    };

    const onOver = (e: PointerEvent) => {
      const wantHover = isClickable(e.target as Element);
      if (wantHover === hovering) return;
      hovering = wantHover;
      if (hovering) {
        ring.style.width      = '44px';
        ring.style.height     = '44px';
        ring.style.marginLeft = '-8px';
        ring.style.marginTop  = '-8px';
        ring.style.background = 'rgba(255,255,255,0.18)';
      } else {
        ring.style.width      = '28px';
        ring.style.height     = '28px';
        ring.style.marginLeft = '0';
        ring.style.marginTop  = '0';
        ring.style.background = 'transparent';
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform  = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cv-cursor-on');
    };
  }, []);

  const sharedStyle: React.CSSProperties = {
    position:       'fixed',
    top:            0,
    left:           0,
    pointerEvents: 'none',
    zIndex:         9999,
    opacity:        0,
    mixBlendMode:  'difference',
    transition:    'opacity 0.25s cubic-bezier(0.16,1,0.3,1), width 0.22s cubic-bezier(0.16,1,0.3,1), height 0.22s cubic-bezier(0.16,1,0.3,1), background 0.22s cubic-bezier(0.16,1,0.3,1), margin 0.22s cubic-bezier(0.16,1,0.3,1)',
    willChange:    'transform, width, height',
  };

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          ...sharedStyle,
          width:         28,
          height:        28,
          borderRadius:  9999,
          border:        '1px solid #FFFFFF',
          background:   'transparent',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          ...sharedStyle,
          width:         6,
          height:        6,
          borderRadius:  9999,
          background:    '#FFFFFF',
        }}
      />
      <style suppressHydrationWarning>{`
        html.cv-cursor-on,
        html.cv-cursor-on body,
        html.cv-cursor-on a,
        html.cv-cursor-on button,
        html.cv-cursor-on [role="button"],
        html.cv-cursor-on input,
        html.cv-cursor-on textarea {
          cursor: none;
        }
      `}</style>
    </>
  );
}
