import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title:       'agonz{x} - iOS Engineer',
  description: 'Antonio González · iOS Engineer',
  manifest:    '/manifest.webmanifest',
  /* Open Graph / Twitter — what LinkedIn / X / Slack render when an
   * agonzx.dev URL is shared. The image lives at /marketing/og-agonzx.svg
   * and matches the dark hero composition. */
  openGraph: {
    title:       'agonzx.dev · Antonio González — Senior iOS Engineer',
    description: 'iOS Engineer focused on shipping consumer products. Remote from Spain.',
    url:         'https://agonzx.dev',
    siteName:    'agonzx',
    images: [{ url: '/marketing/og-agonzx.svg', width: 1200, height: 630, alt: 'agonzx.dev — Antonio González · Senior iOS Engineer' }],
    locale:      'en_US',
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'agonzx.dev · Antonio González — Senior iOS Engineer',
    description: 'iOS Engineer focused on shipping consumer products. Remote from Spain.',
    images:      ['/marketing/og-agonzx.svg'],
  },
};

/* `interactiveWidget: 'resizes-content'` keeps mobile layout stable while
 * the iOS / Chrome address bar collapses — without it, anything sized to
 * `100vh` jumps on every scroll direction change, which is what surfaces
 * as "scroll a saltos" on phones. Combined with our 100dvh sections this
 * produces a continuous feel.                                            */
export const viewport: Viewport = {
  themeColor:        '#0B0F1A',
  viewportFit:       'cover',
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
