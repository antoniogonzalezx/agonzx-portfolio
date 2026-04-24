'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Wordmark from './Wordmark';

/* ─────────────────────────────────────────────────────────────────
 * ServiciosSobre — "Detrás de agonzx"
 * - Section is 220svh; inner stage is sticky (pinned to viewport)
 *   while the rest of the height drives a scroll choreography.
 * - Photo enters the section already visible at the bottom and rises
 *   to overlap the bio text as the user scrolls (Apple-style pin).
 * - Photo is a 3D ID card: front = portrait, back = {x} brand mark.
 *   Drag horizontally to flip; on release it snaps to the nearest
 *   side (0° or 180°). Pure CSS perspective + transform-style.
 * ───────────────────────────────────────────────────────────────── */

function lerp(progress: number, stops: number[], values: number[]): number {
  if (progress <= stops[0]) return values[0];
  if (progress >= stops[stops.length - 1]) return values[values.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (progress >= stops[i] && progress <= stops[i + 1]) {
      const t = (progress - stops[i]) / (stops[i + 1] - stops[i]);
      return values[i] + t * (values[i + 1] - values[i]);
    }
  }
  return values[values.length - 1];
}

export default function ServiciosSobre() {
  const sectionRef   = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  /* ── Scroll progress (0 → 1 across the section's sticky range) ── */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const sec      = sectionRef.current;
    const scroller = document.querySelector('.s-snap-container') as HTMLElement | null;
    if (!sec || !scroller) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const r     = sec.getBoundingClientRect();
      const vh    = window.innerHeight;
      const total = sec.clientHeight - vh;
      if (total <= 0) { setProgress(0); return; }
      const p = Math.max(0, Math.min(1, -r.top / total));
      setProgress(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
    compute();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', compute);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  /* ── 3D card — user drag/click adds an OFFSET on top of the
   * scroll-driven rotation so both can coexist. ── */
  const [userRotation, setUserRotation] = useState(0); // user-driven Y offset
  const [tilt,         setTilt]         = useState(0); // X axis (cursor)
  const drag = useRef({ active: false, startX: 0, baseRotation: 0, moved: false });

  const onCardPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    drag.current = { active: true, startX: e.clientX, baseRotation: userRotation, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onCardPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const card = e.currentTarget;
    const r    = card.getBoundingClientRect();
    /* Hologram tracking — drives CSS vars on the front face for
     * cursor-aware shine/glare (ReactBits ProfileCard pattern). */
    card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width)  * 100}%`);
    card.style.setProperty('--my', `${((e.clientY - r.top)  / r.height) * 100}%`);
    card.style.setProperty('--shine-opacity', '1');
    card.style.setProperty('--glare-opacity', '1');

    if (!drag.current.active) {
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      setTilt(dy * -10);
      return;
    }
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    setUserRotation(drag.current.baseRotation + dx * 0.6);
  };
  const onCardPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (drag.current.active) {
      drag.current.active = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      setUserRotation(prev => Math.round(prev / 180) * 180);
    }
  };
  const onCardLeave: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setTilt(0);
    e.currentTarget.style.setProperty('--shine-opacity', '0');
    e.currentTarget.style.setProperty('--glare-opacity', '0');
  };
  const onCardClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!drag.current.moved) setUserRotation(prev => prev + 180);
  };

  /* ── Choreography (3 phases, flip = section transition) ──
   *  0.00 → 0.35: card rises from below into centred overlay position,
   *               text stays put (no lift — background stays continuous).
   *  0.35 → 0.55: card centred pinned over the text; text fades behind
   *               until fully invisible at 0.55.
   *  0.55 → 1.00: card flips 180°.  The flip ends exactly when the
   *               sticky stage releases — the back face appearing IS
   *               the cue that "3 formas" is about to scroll into view.
   * After progress reaches 1 the sticky unpins and the next section
   * slides in from below; proximity snap engages at the grid boundary. */
  const photoY     = lerp(progress, [0, 0.35], [260, 0]);
  const photoScale = lerp(progress, [0, 0.35, 0.55, 1], [0.94, 1.0, 1.02, 1.02]);

  /* Text fades out just before the flip starts, so by the time the
     card rotates the background behind it is empty — nothing competes
     with the rotation.  Fully invisible at 0.55. */
  const titleOpacity = lerp(progress, [0, 0.25, 0.55], [1, 1, 0]);
  const logosOpacity = lerp(progress, [0, 0.25, 0.55], [1, 1, 0]);
  const bioOpacity   = lerp(progress, [0, 0.25, 0.55], [1, 1, 0]);
  const textLift     = 0;

  /* Flip spans the entire tail of the section — it lands at progress 1
     (sticky release), so completing the 180° IS the handoff to the
     next section. */
  const scrollRot    = lerp(progress, [0.55, 1.0], [0, 180]);

  const cardTransform = `rotateY(${scrollRot + userRotation}deg) rotateX(${tilt}deg)`;

  /* Hologram visibility · DNI-style reveal.
     At rest, perpendicular view (rotation = 0°) → holograms invisible.
     As the card rotates away from 0° the iridescent grainy {x}s fade
     in, peaking just before the front face goes backface-hidden (~90°).
     Hover adds the same boost the shine uses, so both effects share
     the "reveal on interaction" language. */
  const totalRot   = scrollRot + userRotation;
  const normRot    = ((totalRot % 360) + 360) % 360;
  const rotDist    = Math.min(normRot, 360 - normRot);   /* 0..180, 0 = front-straight */
  const rotOpacity = Math.min(1, rotDist / 55);          /* ramps 0→1 across 0°..55° */

  return (
    <section
      ref={sectionRef}
      data-servicios-section="sobre"
      id="sobre"
      className="s-snap-section s-sobre"
    >
      <div className="s-sobre-stage">
        {/* Text wrapper carries the shared lift so all text moves
            together with the card once they overlap. Stage stays
            sticky-pinned (transform on stage would break sticky). */}
        <div
          className="s-sobre-text"
          style={{ transform: `translateY(${textLift}px)` }}
        >
          <h2 className="s-sobre-title" style={{ opacity: titleOpacity }}>
            ¿Quién hay detrás?
            <br />
            <span className="s-sobre-name">Antonio González.</span>
          </h2>

          <div
            className="s-sobre-logos"
            aria-label="Empresas con las que he trabajado"
            style={{ opacity: logosOpacity }}
          >
            <Image
              className="s-sobre-logo s-sobre-logo--ut"
              src="/logos/usertesting-wordmark.svg"
              alt="UserTesting"
              width={140}
              height={36}
              priority={false}
            />
            <Image
              className="s-sobre-logo s-sobre-logo--xing"
              src="/logos/xing-wordmark.svg"
              alt="XING"
              width={80}
              height={36}
              priority={false}
            />
          </div>

          <div className="s-sobre-body" style={{ opacity: bioOpacity }}>
          <p>
            Llevo <strong>6 años</strong> construyendo apps que usan millones
            de personas a diario — en sitios como UserTesting o XING, donde
            la calidad no es un objetivo, es el punto de partida.
          </p>
          <p>
            Lo que más me motiva: convertir el lío del día a día de un negocio
            en herramientas que la gente <em>quiere</em> usar, no que tiene
            que aguantar.
          </p>
        </div>
        </div>

        <figure
          className="s-sobre-photo"
          style={{
            transform: `translateX(-50%) translateY(${photoY}px) scale(${photoScale})`,
          }}
          aria-label="Antonio González — tarjeta interactiva (arrastra para girar)"
        >
          <div
            className="s-sobre-card"
            style={{
              transform: cardTransform,
              ['--rot-opacity' as string]: rotOpacity,
            }}
            onPointerDown={onCardPointerDown}
            onPointerMove={onCardPointerMove}
            onPointerUp={onCardPointerUp}
            onPointerCancel={onCardPointerUp}
            onPointerLeave={onCardLeave}
            onClick={onCardClick}
          >
            {/* Depth slabs — N copies of the card silhouette stacked along
                the Z axis between front (+d/2) and back (−d/2) faces.  Each
                slab inherits the card border-radius so the 3D thickness
                follows the rounded-corner curvature.  Card-depth is now a
                realistic 5px (ID-card thin) so 10 slabs give a perfectly
                smooth extrusion without striping. */}
            {Array.from({ length: 10 }, (_, i) => {
              const t = (i + 0.5) / 10;
              const z = (t - 0.5) * 5;           // −2.25 → +2.25 px
              return (
                <div
                  key={i}
                  className="s-sobre-card-slab"
                  style={{ transform: `translateZ(${z}px)` }}
                  aria-hidden
                />
              );
            })}
            <div className="s-sobre-card-face s-sobre-card-front">
              <Image
                src="/profile.jpg"
                alt="Antonio González"
                width={720}
                height={454}
                priority={false}
              />
              {/* Holographic {x} foil pattern — iridescent tiled glyphs */}
              <div className="s-sobre-card-holo" aria-hidden />
              {/* Holographic foil — diagonal rainbow shimmer */}
              <div className="s-sobre-card-shine" />
              {/* Cursor-tracked light bloom */}
              <div className="s-sobre-card-glare" />
              {/* Brand watermark — subtle {x} in corner like real ID card */}
              <div className="s-sobre-card-mark" aria-hidden>
                <Wordmark main="rgba(255,255,255,0.85)" accent="rgba(255,255,255,0.85)" width="100%" />
              </div>
            </div>
            <div className="s-sobre-card-face s-sobre-card-back" aria-hidden>
              <div className="s-sobre-card-back-wordmark">
                <Wordmark main="#FAFBFD" accent="#4F4FFF" width="68%" />
              </div>
              {/* Cursor-tracked shine — same mechanic as the front face,
                  so both sides reveal a moving highlight on hover. */}
              <div className="s-sobre-card-back-shine" />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
