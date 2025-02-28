import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
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

export interface Heading {
  id: string;
  text: string;
  level: number;
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

  posts.sort((a, b) => compareDatesDesc(a.date, b.date));

  return posts;
};

export const getAllTags = (): string[] => {
  const posts = getAllPosts();
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
  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    metadata: { ...data, slug } as PostMetadata,
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
