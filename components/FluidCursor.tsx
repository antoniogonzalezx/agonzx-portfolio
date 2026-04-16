'use client';
import { useEffect, useRef, useState } from 'react';

export default function FluidCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  // Step 1: detect device — only activate on pointer:fine (mouse) devices
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || !window.matchMedia('(pointer:fine)').matches;
    if (isTouch) return;
    document.documentElement.style.cursor = 'none';
    setReady(true);
  }, []);

  // Step 2: interactions — set up only after elements are in the DOM
  useEffect(() => {
    if (!ready) return;

    const mouse   = { x: -200, y: -200 };
    const dotPos  = { x: -200, y: -200 };
    const ringPos = { x: -200, y: -200 };
    // Lerped values — all updated inside RAF, no React state
    let ringSize         = 40;
    let targetSize       = 40;
    let labelOpacity     = 0;
    let targetLabelOpacity = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Detect cursor context
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el && ringRef.current) {
        const isView  = !!el.closest('[data-cursor="view"]') || !!el.closest('.proj-card');
        const isHover = !!el.closest('a') || !!el.closest('button') || !!el.closest('[role="button"]');

        if (isView) {
          targetSize         = 80;
          targetLabelOpacity = 1;
          ringRef.current.style.borderColor = 'rgba(61,242,224,0.55)';
          ringRef.current.style.background  = 'rgba(61,242,224,0.07)';
        } else if (isHover) {
          targetSize         = 54;
          targetLabelOpacity = 0;
          ringRef.current.style.borderColor = 'rgba(61,242,224,0.4)';
          ringRef.current.style.background  = 'transparent';
        } else {
          targetSize         = 40;
          targetLabelOpacity = 0;
          ringRef.current.style.borderColor = 'rgba(61,242,224,0.22)';
          ringRef.current.style.background  = 'transparent';
        }
      }

      // Magnetic effect — applies to any element with [data-magnetic]
      document.querySelectorAll('[data-magnetic]').forEach(magEl => {
        const rect = magEl.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = e.clientX - cx;
        const dy   = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const htmlEl = magEl as HTMLElement;
        if (dist < 90) {
          const f = (1 - dist / 90) * 0.28;
          htmlEl.style.transform  = `translate(${dx * f}px,${dy * f}px)`;
          htmlEl.style.transition = 'transform 0.15s ease';
        } else {
          htmlEl.style.transform  = '';
          htmlEl.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        }
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    let raf: number;
    const tick = () => {
      // Positions — different lerp speeds for lag effect
      dotPos.x  += (mouse.x - dotPos.x)  * 0.20;
      dotPos.y  += (mouse.y - dotPos.y)  * 0.20;
      ringPos.x += (mouse.x - ringPos.x) * 0.08;
      ringPos.y += (mouse.y - ringPos.y) * 0.08;

      // Size + label — smooth transitions without CSS (avoids transform conflicts)
      ringSize     += (targetSize         - ringSize)     * 0.12;
      labelOpacity += (targetLabelOpacity - labelOpacity) * 0.10;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${dotPos.x}px,${dotPos.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.width     = `${ringSize}px`;
        ringRef.current.style.height    = `${ringSize}px`;
        ringRef.current.style.transform =
          `translate(${ringPos.x}px,${ringPos.y}px) translate(-50%,-50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.opacity = String(labelOpacity);
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = '';
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      {/* Inner dot — fast, tight tracking */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 5, height: 5, borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none', zIndex: 10001,
          willChange: 'transform',
        }}
      />

      {/* Outer ring — slow trailing, lerped size */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40, borderRadius: '50%',
          border: '1px solid rgba(61,242,224,0.22)',
          pointerEvents: 'none', zIndex: 10000,
          willChange: 'transform',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: 'Nohemi,sans-serif',
            fontSize: '0.52rem', fontWeight: 700,
            color: 'var(--accent)', letterSpacing: '0.14em',
            textTransform: 'uppercase', userSelect: 'none',
            opacity: 0, pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          VIEW
        </span>
      </div>
    </>
  );
}
