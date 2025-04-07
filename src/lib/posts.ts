import fs from 'fs/promises';
import path from 'path';
import { ReactElement } from 'react';
import matter from 'gray-matter';
import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import MDXComponents from '@/components/MDXComponents';
import { getThumbnailAndBlur } from '@/lib/images';
import { compareDatesDesc } from '@/utils/dateUtils';

export interface PostInfo {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  tags: string[];
  slug: string;
  blurDataURL: string;
}

export interface PostData {
  postInfo: PostInfo;
  mdxSource: ReactElement<MDXRemoteProps>;
  headings: Heading[];
  summary: string;
  prevPost?: PostInfo | null;
  nextPost?: PostInfo | null;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export const getAllPosts = async (): Promise<PostInfo[]> => {
  const postsDir = path.join(process.cwd(), 'public', 'posts');

  try {
    const postFolders = await fs.readdir(postsDir);

    const posts = await Promise.all(
      postFolders.map(async (folderName) => {
        const filePath = path.join(postsDir, folderName, 'index.mdx');

        try {
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContents);
          const { thumbnailURL, blurDataURL } = await getThumbnailAndBlur(
            data.thumbnail
          );

          return {
            title: data.title,
            description: data.description,
            date: data.date,
            thumbnail: thumbnailURL,
            tags: data.tags,
            slug: folderName,
            blurDataURL,
          } as PostInfo;
        } catch {
          return null;
        }
      })
    );

    return posts
      .filter((post): post is PostInfo => post !== null)
      .sort((a, b) => compareDatesDesc(a.date, b.date));
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getAllTags = async (): Promise<string[]> => {
  const posts = await getAllPosts();
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

export const getPost = async (slug: string): Promise<PostData> => {
  const postDir = path.join(process.cwd(), 'public', 'posts', slug);
  const filePath = path.join(postDir, 'index.mdx');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const { headings, updatedMdx } = parseHeadings(content);

  const { content: mdxSource } = await compileMDX<MDXRemoteProps>({
    source: updatedMdx,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: {
                light: 'github-light',
                dark: 'one-dark-pro',
              },
              keepBackground: false,
              lineNumbers: true,
            },
          ],
        ],
      },
    },
    components: MDXComponents,
  });

  const summary = extractParagraphs(content, 150);
  const { thumbnailURL, blurDataURL } = await getThumbnailAndBlur(
    data.thumbnail
  );

  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);
  const prevPost = allPosts[currentIndex + 1] || null;
  const nextPost = allPosts[currentIndex - 1] || null;

  return {
    postInfo: {
      ...data,
      slug,
      thumbnail: thumbnailURL,
      blurDataURL,
    } as PostInfo,
    mdxSource: mdxSource as ReactElement<MDXRemoteProps>,
    headings,
    summary,
    prevPost,
    nextPost,
  };
};

export const parseHeadings = (mdxContent: string) => {
  const headings: Heading[] = [];

  const updatedMdx = mdxContent.replace(
    /^(#{1,3})\s+(.*)/gm,
    (match, hashes, text) => {
      const id = text.trim().replace(/\s+/g, '-').toLowerCase();

      headings.push({ id, text, level: hashes.length });

      return `${hashes} ${text} <span id="${id}"></span>`;
    }
  );

  return { headings, updatedMdx };
};

export const extractParagraphs = (
  mdxContent: string,
  limit: number = 150
): string => {
  const paragraphs = mdxContent
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => line.trim());

  let combinedText = '';

  for (const paragraph of paragraphs) {
    if (combinedText.length + paragraph.length > limit) {
      combinedText += ' ' + paragraph.substring(0, limit - combinedText.length);

      break;
    }

    combinedText += ' ' + paragraph;
  }

  return combinedText.trim() + '...';
};
