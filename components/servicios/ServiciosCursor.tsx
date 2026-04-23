'use client';

import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
 * ServiciosCursor — premium cursor for /servicios
 * Layer 1: 6px solid dot, follows pointer 1:1
 * Layer 2: 28px ring with lag-trail (lerp ~0.18)
 * On clickables: ring grows to 44px and fills with accent at low alpha
 * Hidden on touch devices and when prefers-reduced-motion is set
 * ───────────────────────────────────────────────────────────────── */

export default function ServiciosCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch  = matchMedia('(hover: none)').matches;
    const isReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduce) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* hide native cursor only while ours is mounted */
    document.documentElement.classList.add('s-cursor-on');

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
      ring.classList.toggle('is-hover', hovering);
      dot.classList.toggle('is-hover', hovering);
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
      document.documentElement.classList.remove('s-cursor-on');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="s-cursor-ring" aria-hidden />
      <div ref={dotRef}  className="s-cursor-dot"  aria-hidden />
    </>
  );
}
