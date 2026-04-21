'use client';

import '@/styles/servicios.css';

import FloatingPill     from '@/components/servicios/FloatingPill';
import ServiciosNav     from '@/components/servicios/ServiciosNav';
import ServiciosHero    from '@/components/servicios/ServiciosHero';
import ServiciosGrid    from '@/components/servicios/ServiciosGrid';
import ServiciosProceso from '@/components/servicios/ServiciosProceso';
import ServiciosCasos   from '@/components/servicios/ServiciosCasos';
import ServiciosFooter  from '@/components/servicios/ServiciosFooter';

const WA = 'https://wa.me/34711514735';

export default function Servicios() {
  return (
    <div className="s-page">
      {/* Fixed overlays — outside snap container */}
      <ServiciosNav  wa={WA} />
      <FloatingPill />

      {/* Scroll-snap main */}
      <main className="s-snap-container" aria-label="Contenido de servicios">
        <ServiciosHero    wa={WA} />        {/* sec 1 — hero           */}
        <ServiciosGrid />                    {/* sec 2 — 3 servicios    */}
        <ServiciosProceso wa={WA} />        {/* sec 3 — proceso        */}
        <ServiciosCasos />                  {/* sec 4 — casos reales   */}
        <ServiciosFooter  wa={WA} />        {/* sec 5 — CTA + footer   */}
      </main>
    </div>
  );
}
