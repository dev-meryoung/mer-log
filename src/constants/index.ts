export const SITE_CONFIG = {
  title: 'merlog',
  description:
    '함께하고 싶은 개발자가 되어가는 과정을 기록하는 기술 블로그, merlog',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.merlog.kr',
  author: {
    name: 'meryoung',
    github: 'https://github.com/meryoung',
  },
  logo: {
    light: '/images/logo-light.svg',
    dark: '/images/logo-dark.svg',
  },
  image: '/images/thumbnail.png',
} as const;
