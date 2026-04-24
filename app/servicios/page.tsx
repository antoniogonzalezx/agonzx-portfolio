'use client';

import '@/styles/servicios.css';

import FloatingPill         from '@/components/servicios/FloatingPill';
import ServiciosCursor      from '@/components/servicios/ServiciosCursor';
import ServiciosNav         from '@/components/servicios/ServiciosNav';
import ServiciosHero        from '@/components/servicios/ServiciosHero';
import ServiciosGrid        from '@/components/servicios/ServiciosGrid';
import ServiciosDiagnostico from '@/components/servicios/ServiciosDiagnostico';
import ServiciosProceso     from '@/components/servicios/ServiciosProceso';
import ServiciosSobre       from '@/components/servicios/ServiciosSobre';
import ServiciosFooter      from '@/components/servicios/ServiciosFooter';

const WA = 'https://wa.me/34711514735';

export default function Servicios() {
  return (
    <div className="s-page">
      {/* Fixed overlays — outside snap container */}
      <ServiciosCursor />
      <ServiciosNav  wa={WA} />
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
