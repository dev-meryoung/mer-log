import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DEFAULT_TITLE = 'mer-log';
const DEFAULT_DESCRIPTION =
  '함께하고 싶은 프론트엔드 개발자가 되어가는 과정을 기록하는 기술 블로그, mer-log';
const DEFAULT_KEYWORDS = [
  '프론트엔드',
  '개발자',
  '기술 블로그',
  'Web',
  'Frontend',
  'Developer',
  'Next.js',
  'React',
  'Markdown',
  'Blog',
];

const DEFAULT_IMAGE = {
  url: `${BASE_URL}/images/thumbnail.png`,
  width: 1200,
  height: 630,
  alt: 'thumbnail',
};

export const defaultMetadata = ({
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
}): Metadata => ({
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
});
