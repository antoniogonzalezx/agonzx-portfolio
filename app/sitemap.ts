import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

/* Dynamic sitemap — each host gets only the URLs that belong to its
 * brand. agonzx.dev never lists /lab (it 301s to axlab.es). axlab.es
 * never lists /privacy (English privacy lives on the personal brand).
 * This forces the dynamic option for the route, which is fine — the
 * sitemap is requested by crawlers, not in the visitor critical path. */
export default function sitemap(): MetadataRoute.Sitemap {
  const host = headers().get('host') ?? 'agonzx.dev';
  const isAxlab = host.includes('axlab.es');

  if (isAxlab) {
    return [
      {
        url:             'https://axlab.es',
        lastModified:     new Date(),
        changeFrequency: 'monthly',
        priority:         1,
      },
      {
        url:             'https://axlab.es/privacidad',
        lastModified:     new Date(),
        changeFrequency: 'yearly',
        priority:         0.3,
      },
    ];
  }

  return [
    {
      url:             'https://agonzx.dev',
      lastModified:     new Date(),
      changeFrequency: 'monthly',
      priority:         1,
    },
    {
      url:             'https://agonzx.dev/cv',
      lastModified:     new Date(),
      changeFrequency: 'monthly',
      priority:         0.8,
    },
    {
      url:             'https://agonzx.dev/privacy',
      lastModified:     new Date(),
      changeFrequency: 'yearly',
      priority:         0.3,
    },
  ];
}
