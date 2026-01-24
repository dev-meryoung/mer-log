import { existsSync, readFileSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import pLimit from 'p-limit';
import { getPlaiceholder } from 'plaiceholder';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { PostMeta, PostSearchData } from '@/types/post';

type CachedPost = PostMeta & {
  __mtime?: string;
  __content?: string;
};

const POSTS_DIR = path.join(process.cwd(), 'public', 'posts');
const DATA_DIR = path.join(process.cwd(), 'public', 'data');
const CACHE_FILE_PATH = path.join(DATA_DIR, 'post-cache.json');
const SEARCH_INDEX_PATH = path.join(DATA_DIR, 'search-index.json');
const CONCURRENCY_LIMIT = 10;

async function generateBlurDataForImage(imagePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), 'public', imagePath);

  try {
    const fileBuffer = await fs.readFile(fullPath);
    const { base64 } = await getPlaiceholder(fileBuffer, { size: 32 });
    return base64;
  } catch {
    const defaultPath = path.join(
      process.cwd(),
      'public',
      'images',
      'thumbnail.png'
    );
    try {
      const fileBuffer = await fs.readFile(defaultPath);
      const { base64 } = await getPlaiceholder(fileBuffer, { size: 32 });
      return base64;
    } catch {
      return '';
    }
  }
}

async function processPost(
  folderName: string,
  existingCache: Record<string, CachedPost>
): Promise<CachedPost | null> {
  const itemPath = path.join(POSTS_DIR, folderName);

  try {
    const stats = await fs.stat(itemPath);
    if (!stats.isDirectory()) return null;

    const filePath = path.join(itemPath, 'index.mdx');
    const fileStats = await fs.stat(filePath);
    const mtime = fileStats.mtime.toISOString();

    if (
      existingCache[folderName] &&
      existingCache[folderName].__mtime === mtime &&
      existingCache[folderName].__content
    ) {
      return {
        ...existingCache[folderName],
        slug: folderName,
      };
    }

    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const {
      title,
      description,
      date,
      tags = [],
      thumbnail = '/images/thumbnail.png',
    } = data;

    const processedContent = await remark().use(strip).process(content);
    const plainText = processedContent.toString();

    let blurDataURL = '';
    if (
      existingCache[folderName] &&
      existingCache[folderName].blurDataURL &&
      existingCache[folderName].thumbnail === thumbnail
    ) {
      ({ blurDataURL } = existingCache[folderName]);
    } else {
      blurDataURL = await generateBlurDataForImage(thumbnail);
    }

    const summary = plainText.replace(/\s+/g, ' ').trim().slice(0, 150) + '...';

    return {
      title,
      description,
      date,
      tags,
      thumbnail,
      slug: folderName,
      blurDataURL,
      summary,
      __mtime: mtime,
      __content: plainText,
    };
  } catch (error) {
    console.error(`Failed to process post ${folderName}:`, error);
    return null;
  }
}

async function main() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  let existingCache: Record<string, CachedPost> = {};
  if (existsSync(CACHE_FILE_PATH)) {
    try {
      const cached = JSON.parse(readFileSync(CACHE_FILE_PATH, 'utf-8'));
      if (Array.isArray(cached)) {
        existingCache = cached.reduce((acc, item) => {
          if (item.slug) acc[item.slug] = item;
          return acc;
        }, {});
      }
    } catch {}
  }

  const postFolders = await fs.readdir(POSTS_DIR);
  const limit = pLimit(CONCURRENCY_LIMIT);

  const posts = await Promise.all(
    postFolders.map((folder) => limit(() => processPost(folder, existingCache)))
  );

  const validPosts = posts.filter((p): p is CachedPost => p !== null);

  validPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const searchIndex: PostSearchData[] = validPosts.map((post) => ({
    title: post.title,
    description: post.description,
    tags: post.tags,
    slug: post.slug,
    date: post.date,
    content: post.__content || '',
  }));

  await fs.writeFile(SEARCH_INDEX_PATH, JSON.stringify(searchIndex, null, 2));

  const listCache = validPosts.map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    thumbnail: post.thumbnail,
    slug: post.slug,
    blurDataURL: post.blurDataURL,
    summary: post.summary,
    __mtime: post.__mtime,
    __content: post.__content,
  }));

  await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(listCache, null, 2));
}

main().catch((error) => {
  console.error('Build script failed:', error);
  process.exit(1);
});
