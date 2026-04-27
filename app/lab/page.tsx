'use client';

import '@/styles/servicios.css';

import { useEffect } from 'react';

import FloatingPill         from '@/components/servicios/FloatingPill';
import ServiciosCursor      from '@/components/servicios/ServiciosCursor';
import ServiciosHero        from '@/components/servicios/ServiciosHero';
import ServiciosGrid        from '@/components/servicios/ServiciosGrid';
import ServiciosDiagnostico from '@/components/servicios/ServiciosDiagnostico';
import ServiciosProceso     from '@/components/servicios/ServiciosProceso';
import ServiciosSobre       from '@/components/servicios/ServiciosSobre';
import ServiciosFooter      from '@/components/servicios/ServiciosFooter';

const WA = 'https://wa.me/34711514735';

export default function Servicios() {
  /* Two-mode snap scroll ───────────────────────────────────────────
   * Hero + Sobre need free continuous scroll so the card choreography
   * (rise → overlap → flip → exit) reads without the browser tugging
   * the user off-beat.  Everything from the "3 formas" grid onward
   * benefits from firm snapping — each section is a discrete beat.
   *
   * Instead of the coarse `y proximity` we had on the container, we
   * now toggle `y mandatory` on/off depending on scroll position:
   *   - Before we're close to the grid  → `y proximity` (gentle,
   *     barely engages — hero/sobre flow freely).
   *   - From the grid's top onward      → `y mandatory` kicks in,
   *     so grid / diagnóstico / proceso / footer snap cleanly.
   * On scroll back above the grid the flag is removed so sobre
   * regains its continuous feel.  Pure CSS couldn't express this
   * cleanly because `scroll-snap-align: none` on sobre is not enough
   * to stop mandatory mode from yanking the user past it. */
  useEffect(() => {
    const container = document.querySelector('.s-snap-container') as HTMLElement | null;
    if (!container) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const grid = document.querySelector('[data-servicios-section="servicios"]') as HTMLElement | null;
      if (!grid) return;
      /* Arm mandatory a short pull distance BEFORE grid's top —
       * this makes the snap into grid feel decisive without
       * interfering with the last beat of sobre's flip. */
      const armAt = grid.offsetTop - window.innerHeight * 0.2;
      container.classList.toggle('s-snap-firm', container.scrollTop >= armAt);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="s-page">
      {/* Fixed overlays — outside snap container.
          The navbar was dropped: the FloatingPill carries the brand
          mark and the primary CTA (WhatsApp), the footer carries the
          link nav. No top chrome competing with the hero wordmark. */}
      <ServiciosCursor />
      <FloatingPill />

      {/* Scroll-snap main */}
      <main className="s-snap-container" aria-label="Contenido de servicios">
        <ServiciosHero        wa={WA} />   {/* sec 1 — hero            */}
        <ServiciosSobre />                   {/* sec 2 — sobre Antonio   */}
        <ServiciosGrid />                    {/* sec 3 — 3 servicios     */}
        <ServiciosDiagnostico wa={WA} />     {/* sec 4 — diagnóstico     */}
        <ServiciosProceso />                 {/* sec 5 — proceso         */}
        <ServiciosFooter      wa={WA} />   {/* sec 6 — CTA + footer    */}
      </main>
    </div>
  );
}
