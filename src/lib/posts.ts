import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface PostMetadata {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  tags: string[];
}

export interface PostData {
  metadata: PostMetadata;
  contentHtml: string;
}

export function getAllPosts(): PostMetadata[] {
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
    };
  });

  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return posts;
}

export function getAllTags(): string[] {
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
}
