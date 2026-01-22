import { SITE_CONFIG } from '@/constants';
import { PostInfo } from '@/types/post';

interface JsonLdProps {
  post: PostInfo;
  url: string;
}

const JsonLd: React.FC<JsonLdProps> = ({ post, url }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.thumbnail ? [post.thumbnail] : [],
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
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo.light}`,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default JsonLd;
