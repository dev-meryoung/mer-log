import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';
import type { PostInfo, PostSearchData } from '@/types/post';

export const getAllPosts = cache(async (): Promise<PostInfo[]> => {
  const cachePath = path.join(
    process.cwd(),
    'public',
    'data',
    'post-cache.json'
  );

  try {
    const fileContents = await fs.readFile(cachePath, 'utf8');
    const posts: PostInfo[] = JSON.parse(fileContents);
    return posts;
  } catch (error) {
    console.error('Failed to load post cache:', error);
    return [];
  }
});

export const getAllSearchPosts = cache(async (): Promise<PostSearchData[]> => {
  const cachePath = path.join(
    process.cwd(),
    'public',
    'data',
    'search-index.json'
  );

  try {
    const fileContents = await fs.readFile(cachePath, 'utf8');
    const posts: PostSearchData[] = JSON.parse(fileContents);
    return posts;
  } catch (error) {
    console.error('Failed to load search index:', error);
    return [];
  }
});

export const getAllTags = (posts: PostInfo[]): string[] => {
  const tagFrequency: Record<string, number> = {};

  posts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
      });
    }
  });

  const sortedTags = Object.keys(tagFrequency).sort((a, b) => {
    const freqDiff = tagFrequency[b] - tagFrequency[a];
    if (freqDiff !== 0) return freqDiff;
    return a.localeCompare(b);
  });

  return sortedTags;
};
