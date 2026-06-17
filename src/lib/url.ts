import { SITE_CONFIG } from '@/constants';

const SITE_ORIGIN = new URL(SITE_CONFIG.url);

export const toAbsoluteUrl = (url: string): string => {
  if (url.startsWith('//')) {
    throw new Error(`Protocol-relative URLs are not supported: ${url}`);
  }

  const absoluteUrl = new URL(url, SITE_ORIGIN);

  if (!['http:', 'https:'].includes(absoluteUrl.protocol)) {
    throw new Error(`Unsupported URL protocol: ${absoluteUrl.protocol}`);
  }

  return absoluteUrl.toString();
};

export const toSameOriginUrl = (path: string): string => {
  if (!path.startsWith('/') || path.startsWith('//')) {
    throw new Error(`Expected a site-relative path: ${path}`);
  }

  const absoluteUrl = new URL(path, SITE_ORIGIN);

  if (absoluteUrl.origin !== SITE_ORIGIN.origin) {
    throw new Error(`Expected a same-origin URL: ${path}`);
  }

  return absoluteUrl.toString();
};
