import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.merlog.kr';
  const posts = await getAllPosts();

  const urls = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
  }));

  urls.unshift({
    url: baseUrl,
    lastModified: new Date().toISOString(),
  });

  return urls;
}
