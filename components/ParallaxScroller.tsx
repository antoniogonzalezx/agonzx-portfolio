'use client';
import { useEffect, useRef, useState, useCallback, ReactNode } from 'react';

function isMobile() { return typeof window !== 'undefined' && window.innerWidth <= 700; }

export default function ParallaxScroller({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const currentIdx = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [total, setTotal] = useState(0);
  const targetY = useRef(0);
  const animY = useRef(0);
  const raf = useRef<number>();
  const lastNav = useRef(0);
  const vh = useRef(0);

  const refresh = useCallback(() => {
    vh.current = window.innerHeight;
    // Filter out sections hidden via CSS (e.g. about-desktop on mobile, about-mobile-* on desktop)
    sectionsRef.current = Array.from(
      trackRef.current?.querySelectorAll('.snap-section') ?? []
    ).filter(el => window.getComputedStyle(el as HTMLElement).display !== 'none') as HTMLElement[];
    setTotal(sectionsRef.current.length);
  }, []);

  const goTo = useCallback((idx: number) => {
    const len = sectionsRef.current.length;
    const clamped = Math.max(0, Math.min(len - 1, idx));
    if (clamped === currentIdx.current) return;
    // Reset horizontal scroller of target section so it starts at card 1
    const hs = sectionsRef.current[clamped]?.querySelector('.proj-horiz-scroller') as HTMLElement | null;
    if (hs) hs.scrollLeft = 0;
    currentIdx.current = clamped;
    targetY.current = -clamped * vh.current;
    setActiveIdx(clamped);
    const el = sectionsRef.current[clamped];
    const id = el?.id || el?.getAttribute('data-nav-id');
    if (id) history.replaceState(null, '', '#' + id);
  }, []);

  // Lerp animation loop
  useEffect(() => {
    refresh();

    const tick = () => {
      const mobile = isMobile();
      const lerpFactor = mobile ? 0.13 : 0.085;

      const diff = targetY.current - animY.current;
      animY.current += diff * lerpFactor;
      if (Math.abs(diff) < 0.3) animY.current = targetY.current;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateY(${animY.current}px)`;
      }

      // Parallax disabled on mobile — sections snap cleanly without drift
      if (!mobile) {
        const progress = -animY.current / vh.current;
        sectionsRef.current.forEach((section, i) => {
          const dist = i - progress;
          section.style.transform = `translateY(${dist * 35}px)`;
          const bg = section.querySelector('[data-parallax-bg]') as HTMLElement | null;
          if (bg) bg.style.transform = `translateY(${dist * vh.current * 0.25}px)`;
        });
      } else {
        // Reset any lingering transforms when switching to mobile
        sectionsRef.current.forEach((section) => {
          section.style.transform = '';
          const bg = section.querySelector('[data-parallax-bg]') as HTMLElement | null;
          if (bg) bg.style.transform = '';
        });
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [refresh]);

  // Navigation event listeners
  useEffect(() => {
    const navigate = (dir: number) => {
      const now = Date.now();
      if (now - lastNav.current < 850) return;
      lastNav.current = now;
      goTo(currentIdx.current + dir);
    };

    const getNestedScroller = () => {
      const section = sectionsRef.current[currentIdx.current];
      return section?.querySelector('.scroll-stack-scroller') as HTMLElement | null;
    };
    const getHorizScroller = () => {
      const section = sectionsRef.current[currentIdx.current];
      return section?.querySelector('.proj-horiz-scroller') as HTMLElement | null;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) <= 5) return;
      const dir = e.deltaY > 0 ? 1 : -1;

      // Vertical nested scroller (mobile ScrollStack)
      const ns = getNestedScroller();
      if (ns) {
        const atTop    = ns.scrollTop <= 10;
        const atBottom = ns.scrollTop + ns.clientHeight >= ns.scrollHeight - 10;
        if ((dir === 1 && !atBottom) || (dir === -1 && !atTop)) return;
      }

      // Horizontal scroller (desktop projects)
      const hs = getHorizScroller();
      if (hs) {
        const atLeft  = hs.scrollLeft <= 10;
        const atRight = hs.scrollLeft + hs.clientWidth >= hs.scrollWidth - 10;
        if ((dir === 1 && !atRight) || (dir === -1 && !atLeft)) {
          const now = Date.now();
          if (now - lastNav.current < 850) return;
          lastNav.current = now;
          // Scroll by ~one card width (440px) for stacking effect; fall back to viewport
          const cardStep = Math.min(440, hs.clientWidth);
          hs.scrollBy({ left: dir * cardStep, behavior: 'smooth' });
          return;
        }
      }

      navigate(dir);
    };

    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); navigate(1); }
      if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); navigate(-1); }
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) <= 50) return;
      const dir = dy > 0 ? 1 : -1;
      const ns = getNestedScroller();
      if (ns) {
        const atTop    = ns.scrollTop <= 10;
        const atBottom = ns.scrollTop + ns.clientHeight >= ns.scrollHeight - 10;
        if ((dir === 1 && !atBottom) || (dir === -1 && !atTop)) return;
      }
      navigate(dir);
    };

    // Intercept anchor clicks from Nav
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      if (!href.startsWith('#')) return;
      const id = href.slice(1);
      if (!id) { e.preventDefault(); goTo(0); return; }
      const idx = sectionsRef.current.findIndex(s => s.id === id || s.getAttribute('data-nav-id') === id);
      if (idx !== -1) { e.preventDefault(); goTo(idx); }
    };

    const onResize = () => {
      refresh();
      const newLen = sectionsRef.current.length;
      if (currentIdx.current >= newLen) {
        currentIdx.current = Math.max(0, newLen - 1);
        setActiveIdx(currentIdx.current);
      }
      vh.current = window.innerHeight;
      animY.current = -currentIdx.current * vh.current;
      targetY.current = animY.current;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', onClick);
    };
  }, [goTo]);

  return (
    <>
      {/* Fixed scroll container — owns the viewport */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 1 }}>
        <div ref={trackRef} style={{ willChange: 'transform' }}>
          {children}
        </div>
      </div>

      {/* Side navigation dots — hidden on mobile via .parallax-dots CSS class */}
      <div className="parallax-dots" style={{
        position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
        zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to section ${i + 1}`}
            style={{
              width: 3,
              height: activeIdx === i ? 22 : 8,
              borderRadius: 4,
              background: activeIdx === i ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'height 0.4s var(--ease), background 0.4s var(--ease)',
              boxShadow: activeIdx === i ? '0 0 8px rgba(61,242,224,0.5)' : 'none',
            }}
          />
        ))}
      </div>
    </>
  );
}
