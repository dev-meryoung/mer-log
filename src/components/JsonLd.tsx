import { SITE_CONFIG } from '@/constants';
import { toSameOriginUrl } from '@/lib/url';
import { PostInfo } from '@/types/post';

interface JsonLdProps {
  post: PostInfo;
  url: string;
}

const serializeJsonLd = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, '\\u003c');

const JsonLd: React.FC<JsonLdProps> = ({ post, url }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.thumbnail ? [toSameOriginUrl(post.thumbnail)] : [],
    datePublished: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.github,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.title,
      logo: {
        '@type': 'ImageObject',
        url: toSameOriginUrl(SITE_CONFIG.logo.light),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags,
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
};

export default JsonLd;
