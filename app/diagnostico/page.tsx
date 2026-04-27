'use client';

import '@/styles/servicios.css';

import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react';
import ServiciosDiagnostico from '@/components/servicios/ServiciosDiagnostico';

const WA = 'https://wa.me/34711514735';

/* Standalone diagnostic wizard.
 *
 * Why a separate route: on phones the inline wizard (rendered as
 * step 4 of /lab) was visually fenced inside a snap-section, which
 * cropped the long step-1 pain checklist and the proposal step.
 * Pulling the wizard onto its own URL gives it the full viewport,
 * a sticky iOS-pattern header with back button, and a shareable
 * link the user can pass around.
 *
 * Desktop visitors who land here directly still get the experience,
 * but the canonical desktop path is the inline /lab section — the
 * gateway CTA on /lab intercepts clicks and stays inline there. */
export default function DiagnosticoPage() {
  return (
    <div className="s-page s-diag-page">
      <header className="s-diag-page-header">
        <Link href="/lab" className="s-diag-page-back" aria-label="Volver a axlab">
          <ArrowLeft size={18} weight="bold" />
          <span>Volver</span>
        </Link>
        <span className="s-diag-page-title">
          <span style={{ color: 'var(--s-ink)', fontWeight: 600 }}>Diagnóstico</span>
          <span style={{ color: 'var(--s-ink-3)' }}> express</span>
        </span>
        <span className="s-diag-page-spacer" aria-hidden />
      </header>

      <main className="s-diag-page-main">
        <ServiciosDiagnostico wa={WA} defaultStarted />
      </main>
    </div>
  );
}
