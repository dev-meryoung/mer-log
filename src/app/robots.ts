import type { MetadataRoute } from 'next';
import { toSameOriginUrl } from '@/lib/url';

export const dynamic = 'force-static';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
    },
  ],
  sitemap: toSameOriginUrl('/sitemap.xml'),
});

export default robots;
