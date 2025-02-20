import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { compareDatesDesc } from '@/utils/dateUtils';

export interface PostMetadata {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  tags: string[];
  slug: string;
}

export interface PostData {
  metadata: PostMetadata;
  contentHtml: string;
}

export const getAllPosts = (): PostMetadata[] => {
  const postsDir = path.join(process.cwd(), 'public', 'posts');
  const postFolders = fs.readdirSync(postsDir);
  const posts: PostMetadata[] = postFolders.map((folderName) => {
    const filePath = path.join(postsDir, folderName, 'index.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      title: data.title,
      description: data.description,
      date: data.date,
      thumbnail: data.thumbnail,
      tags: data.tags,
      slug: folderName,
    };
  });

  posts.sort((a, b) => {
    return compareDatesDesc(a.date, b.date);
  });

  return posts;
};

export const getAllTags = (): string[] => {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        return tagSet.add(tag);
      });
    }
  });

  return Array.from(tagSet);
};

export const getPost = async (slug: string): Promise<PostData> => {
  const postDir = path.join(process.cwd(), 'public', 'posts', slug);
  const filePath = path.join(postDir, 'index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    metadata: { ...data, slug } as PostMetadata,
    contentHtml,
  };
};
