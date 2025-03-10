import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import { remark } from 'remark';
import html from 'remark-html';
import { compareDatesDesc } from '@/utils/dateUtils';

export interface PostInfo {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  tags: string[];
  slug: string;
}

export interface PostData {
  postInfo: PostInfo;
  contentHtml: string;
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
        const filePath = path.join(postsDir, folderName, 'index.md');

        try {
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data } = matter(fileContents);

          return {
            title: data.title,
            description: data.description,
            date: data.date,
            thumbnail: data.thumbnail,
            tags: data.tags,
            slug: folderName,
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
  const filePath = path.join(postDir, 'index.md');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    postInfo: { ...data, slug } as PostInfo,
    contentHtml,
  };
};

export const extractHeadings = (html: string): Heading[] => {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const headings: Heading[] = [];

  document.querySelectorAll('h1, h2, h3').forEach((heading: Element, idx) => {
    const id =
      heading.id ||
      heading.textContent?.trim().replace(/\s+/g, '-').toLowerCase() ||
      `heading-${idx}`;

    heading.id = id;

    headings.push({
      id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.replace('H', ''), 10),
    });
  });

  return headings;
};

export const processHeadings = (html: string) => {
  const headings = extractHeadings(html);

  const updatedHtml = html.replace(
    /<h([1-3])>(.*?)<\/h\1>/g,
    (match, level, text) => {
      const id = text.trim().replace(/\s+/g, '-').toLowerCase();

      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  return { headings, updatedHtml };
};

export const extractParagraphs = (html: string, limit: number = 150) => {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const paragraphs = Array.from(document.querySelectorAll('p'))
    .map((p) => (p.textContent ?? '').trim())
    .filter((text) => text.length > 0);

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
