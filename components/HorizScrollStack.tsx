'use client';
import { useLayoutEffect, useRef, useCallback } from 'react';

export const HorizStackItem = ({ children, itemClassName = '' }: { children: React.ReactNode; itemClassName?: string }) => (
  <div className={`hstack-card ${itemClassName}`.trim()}>{children}</div>
);

interface HorizScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
}

export default function HorizScrollStack({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.03,
  itemStackDistance = 28,
  stackPosition = '18%',
  scaleEndPosition = '8%',
  baseScale = 0.86,
}: HorizScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLElement[]>([]);
  const rafRef     = useRef<number>();

  const parsePercentage = (value: string | number, size: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * size;
    }
    return parseFloat(value as string);
  };

  const updateTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const sl  = scroller.scrollLeft;
    const cw  = scroller.clientWidth;
    const spx = parsePercentage(stackPosition, cw);
    const sep = parsePercentage(scaleEndPosition, cw);

    const endEl   = scroller.querySelector('.hstack-end') as HTMLElement | null;
    const endLeft = endEl ? endEl.offsetLeft : scroller.scrollWidth;
    const pinEnd  = endLeft - cw / 2;

    cardsRef.current.forEach((card, i) => {
      const cl       = card.offsetLeft;
      const pinStart = cl - spx - itemStackDistance * i;
      const scaleEnd = cl - sep;

      const sp = sl <= pinStart ? 0 : sl >= scaleEnd ? 1 : (sl - pinStart) / (scaleEnd - pinStart);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - Math.min(1, Math.max(0, sp)) * (1 - targetScale);

      let tx = 0;
      if (sl >= pinStart && sl <= pinEnd) {
        tx = sl - cl + spx + itemStackDistance * i;
      } else if (sl > pinEnd) {
        tx = pinEnd - cl + spx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(${Math.round(tx * 10) / 10}px, 0, 0) scale(${Math.round(scale * 1000) / 1000})`;
      card.style.zIndex    = String(i + 1);
    });
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.hstack-card')) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginRight = `${itemDistance}px`;
      card.style.willChange        = 'transform';
      card.style.transformOrigin   = 'left center';
      card.style.backfaceVisibility = 'hidden';
      card.style.position          = 'relative';
    });

    const tick = () => { updateTransforms(); rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cardsRef.current = [];
    };
  }, [itemDistance, updateTransforms]);

  return (
    <div
      ref={scrollerRef}
      className={`proj-horiz-scroller ${className}`.trim()}
      style={{
        position: 'absolute', inset: 0,
        overflowX: 'scroll', overflowY: 'hidden',
        scrollbarWidth: 'none',
        display: 'flex', alignItems: 'center',
        paddingLeft: '18%',
      }}
    >
      {children}
      <div className="hstack-end" style={{ minWidth: '50vw', flexShrink: 0, height: 1 }} />
    </div>
  );
}
