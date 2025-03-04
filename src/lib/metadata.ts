import type { Metadata } from 'next';

const BASE_URL = 'https://www.merlog.kr';
const DEFAULT_TITLE = 'mer-log';
const DEFAULT_DESCRIPTION =
  '웹 프론트엔드 개발자 meryoung의 기술 블로그, mer-log입니다.';
const DEFAULT_KEYWORDS = [
  '프론트엔드',
  '개발',
  '기술 블로그',
  'Web',
  'Frontend',
  'Blog',
  'Junior',
  'Developer',
];

const DEFAULT_IMAGE = {
  url: `${BASE_URL}/images/thumbnail.png`,
  width: 1200,
  height: 630,
  alt: 'thumbnail',
};

export function defaultMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = DEFAULT_IMAGE.url,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  return {
    title: title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: BASE_URL,
      siteName: 'mer-log',
      images: [image ? { ...DEFAULT_IMAGE, url: image } : DEFAULT_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@mer-log',
      creator: '@meryoung',
      images: [image],
    },
    robots: 'index, follow',
    alternates: {
      canonical: BASE_URL,
    },
  };
}
