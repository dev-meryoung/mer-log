import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DEFAULT_TITLE = 'mer-log';
const DEFAULT_DESCRIPTION = '프론트엔드 기술 블로그, mer-log';
const DEFAULT_KEYWORDS = [
  '프론트엔드',
  '기술 블로그',
  'Web',
  'Junior',
  'Frontend',
  'Developer',
  'Blog',
];

const DEFAULT_IMAGE = {
  url: `${BASE_URL}/images/thumbnail.png`,
  width: 1200,
  height: 630,
  alt: 'thumbnail',
};

export function defaultMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = DEFAULT_IMAGE.url,
  url = BASE_URL,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}): Metadata {
  return {
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      title,
      description,
      url,
      siteName: 'mer-log',
      images: [image ? { ...DEFAULT_IMAGE, url: image } : DEFAULT_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@mer-log',
      creator: '@meryoung',
      title,
      description,
      images: [image ? { ...DEFAULT_IMAGE, url: image } : DEFAULT_IMAGE],
    },
    robots: 'index, follow',
    alternates: {
      canonical: url,
    },
  };
}
