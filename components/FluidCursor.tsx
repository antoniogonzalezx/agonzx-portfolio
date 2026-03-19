'use client';
import { useEffect, useRef, useState } from 'react';

export default function FluidCursor() {
  const lens = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, dx: 0, dy: 0 });
  const [hide, setHide] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window) { setHide(true); return; }

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    let raf: number;
    const tick = () => {
      const p = pos.current;
      p.dx += (p.mx - p.dx) * 0.12;
      p.dy += (p.my - p.dy) * 0.12;
      if (lens.current) {
        lens.current.style.transform = `translate(${p.dx}px, ${p.dy}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, [hide]);

  if (hide) return null;

  const size = pressed ? 40 : 28;

  return (
    <div
      ref={lens}
      style={{
        position: 'fixed',
        top: -size / 2,
        left: -size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        transition: 'width 0.3s var(--ease), height 0.3s var(--ease), box-shadow 0.3s var(--ease)',
        background: 'radial-gradient(circle, rgba(61,242,224,0.12) 0%, rgba(61,242,224,0.04) 50%, transparent 70%)',
        border: '1px solid rgba(61,242,224,0.25)',
        boxShadow: pressed
          ? '0 0 20px rgba(61,242,224,0.2), inset 0 0 10px rgba(61,242,224,0.1)'
          : '0 0 12px rgba(61,242,224,0.1), inset 0 0 6px rgba(61,242,224,0.05)',
        backdropFilter: 'blur(1px) brightness(1.15)',
        WebkitBackdropFilter: 'blur(1px) brightness(1.15)',
        mixBlendMode: 'screen',
      }}
    />
  );
}
