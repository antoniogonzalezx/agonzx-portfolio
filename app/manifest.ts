import type { MetadataRoute } from 'next';

/* PWA manifest — primarily for iOS / Android "Add to home screen".
 * Theme color matches the dark hero so the iOS status bar blends in
 * when the site is launched standalone.  /lab visitors see the dark
 * mark too (same brand family); the lab apple-icon overrides per
 * route via the file-based convention.                               */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'agonz{x} — iOS Engineer',
    short_name:       'agonzx',
    description:      'Antonio González · iOS Engineer · agonzx.dev',
    start_url:        '/',
    display:          'standalone',
    background_color: '#0B0F1A',
    theme_color:      '#0B0F1A',
    icons: [
      { src: '/icon.svg',          type: 'image/svg+xml', sizes: 'any'      },
      { src: '/apple-icon',        type: 'image/png',     sizes: '180x180'  },
    ],
  };
}
