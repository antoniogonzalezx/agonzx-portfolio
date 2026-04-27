import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:          'https://agonzx.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority:     1,
    },
    {
      url:          'https://agonzx.dev/lab',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority:     0.9,
    },
    {
      url:          'https://agonzx.dev/cv',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority:     0.8,
    },
    {
      url:          'https://agonzx.dev/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority:     0.3,
    },
    {
      url:          'https://agonzx.dev/privacidad',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority:     0.3,
    },
  ];
}
