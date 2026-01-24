import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants';

const DEFAULT_KEYWORDS = [
  '프론트엔드',
  '개발자',
  '기술 블로그',
  '머영',
  'Web',
  'Frontend',
  'Developer',
  'Next.js',
  'React',
  'Markdown',
  'Blog',
  'merlog',
  'mer-log',
];

const DEFAULT_IMAGE = {
  url: `${SITE_CONFIG.url}${SITE_CONFIG.image}`,
  width: 1200,
  height: 630,
  alt: 'thumbnail',
};

interface DefaultMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export const defaultMetadata = ({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  keywords = [],
  image = DEFAULT_IMAGE.url,
  url = SITE_CONFIG.url,
}: DefaultMetadataProps): Metadata => ({
  title,
  description,
  keywords: [...DEFAULT_KEYWORDS, ...keywords],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title,
    description,
    url,
    siteName: SITE_CONFIG.title,
    images: [image ? { ...DEFAULT_IMAGE, url: image } : DEFAULT_IMAGE],
  },
  robots: 'index, follow',
  alternates: {
    canonical: url,
  },
  metadataBase: new URL(SITE_CONFIG.url),
});
