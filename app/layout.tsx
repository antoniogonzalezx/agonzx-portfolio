import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title:       'agonz{x} - iOS Engineer',
  description: 'Antonio González · iOS Engineer',
  manifest:    '/manifest.webmanifest',
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
