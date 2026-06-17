import fsPromises from 'fs/promises';
import path from 'path';
import pLimit from 'p-limit';
import { getPlaiceholder } from 'plaiceholder';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { parseMdxFrontmatter } from '@/lib/frontmatter';
import type { PostMeta, PostSearchData } from '@/types/post';

type CachedPost = PostMeta & {
  __mtime?: string;
  __content?: string;
  __thumbnailMtime?: string;
};

type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail: string;
};

const POSTS_DIR = path.join(process.cwd(), 'public', 'posts');
const DATA_DIR = path.join(process.cwd(), 'public', 'data');
const CACHE_FILE_PATH = path.join(DATA_DIR, 'post-cache.json');
const SEARCH_INDEX_PATH = path.join(DATA_DIR, 'search-index.json');
const CONCURRENCY_LIMIT = 10;
const DEFAULT_THUMBNAIL = '/images/thumbnail.png';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const ALLOWED_IMAGE_EXTENSIONS = new Set([
  '.avif',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
]);
const POST_SLUG_PATTERN = /^[a-z0-9-]+$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim() !== '';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isNonEmptyString);

const isCachedPost = (value: unknown): value is CachedPost => {
  if (!isRecord(value)) {
    return false;
  }

  const {
    title,
    description,
    date,
    tags,
    thumbnail,
    slug,
    blurDataURL,
    summary,
  } = value;

  return (
    isNonEmptyString(title) &&
    isNonEmptyString(description) &&
    isNonEmptyString(date) &&
    isStringArray(tags) &&
    isNonEmptyString(thumbnail) &&
    isNonEmptyString(slug) &&
    typeof blurDataURL === 'string' &&
    isNonEmptyString(summary)
  );
};

const resolvePublicImagePath = (publicPath: string): string => {
  if (!publicPath.startsWith('/')) {
    throw new Error(`Image path must start with "/": ${publicPath}`);
  }

  const resolvedPath = path.resolve(PUBLIC_DIR, `.${publicPath}`);
  const relativePath = path.relative(PUBLIC_DIR, resolvedPath);
  const extension = path.extname(resolvedPath).toLowerCase();

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error(`Image path must stay inside public/: ${publicPath}`);
  }

  if (!ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
    throw new Error(`Unsupported image extension: ${publicPath}`);
  }

  return resolvedPath;
};

const normalizeText = (text: string): string =>
  text.replace(/\s+/g, ' ').trim();

const assertValidPostSlug = (slug: string): void => {
  if (!POST_SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid post slug "${slug}". Use lowercase letters, numbers, and hyphens only.`
    );
  }
};

const getFileMtime = async (filePath: string): Promise<string> => {
  const stats = await fsPromises.stat(filePath);
  return stats.mtime.toISOString();
};

const getThumbnailMtime = async (thumbnail: string): Promise<string> => {
  try {
    return await getFileMtime(resolvePublicImagePath(thumbnail));
  } catch {
    throw new Error(`Thumbnail not found or invalid: ${thumbnail}`);
  }
};

const normalizeFrontmatter = (
  folderName: string,
  data: unknown
): PostFrontmatter => {
  if (!isRecord(data)) {
    throw new Error(`${folderName}: frontmatter must be an object`);
  }

  const { title, description, date, thumbnail, tags } = data;

  if (!isNonEmptyString(title)) {
    throw new Error(
      `${folderName}: frontmatter.title must be a non-empty string`
    );
  }

  if (!isNonEmptyString(description)) {
    throw new Error(
      `${folderName}: frontmatter.description must be a non-empty string`
    );
  }

  if (!isNonEmptyString(date) || Number.isNaN(new Date(date).getTime())) {
    throw new Error(
      `${folderName}: frontmatter.date must be a valid date string`
    );
  }

  if (tags !== undefined && !isStringArray(tags)) {
    throw new Error(
      `${folderName}: frontmatter.tags must be an array of strings`
    );
  }

  return {
    title: title.trim(),
    description: description.trim(),
    date,
    tags: tags || [],
    thumbnail: isNonEmptyString(thumbnail) ? thumbnail : DEFAULT_THUMBNAIL,
  };
};

async function generateBlurDataForImage(imagePath: string): Promise<string> {
  const fullPath = resolvePublicImagePath(imagePath);

  try {
    const fileBuffer = await fsPromises.readFile(fullPath);
    const { base64 } = await getPlaiceholder(fileBuffer, { size: 32 });
    return base64;
  } catch {
    const defaultPath = resolvePublicImagePath(DEFAULT_THUMBNAIL);
    try {
      const fileBuffer = await fsPromises.readFile(defaultPath);
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
): Promise<CachedPost> {
  assertValidPostSlug(folderName);

  const itemPath = path.join(POSTS_DIR, folderName);
  const stats = await fsPromises.stat(itemPath);

  if (!stats.isDirectory()) {
    throw new Error(`${folderName} is not a post directory`);
  }

  const filePath = path.join(itemPath, 'index.mdx');
  const fileStats = await fsPromises.stat(filePath);
  const mtime = fileStats.mtime.toISOString();
  const cachedPost = existingCache[folderName];
  const fileContents = await fsPromises.readFile(filePath, 'utf8');
  const { data, content } = parseMdxFrontmatter(fileContents);
  const { title, description, date, tags, thumbnail } = normalizeFrontmatter(
    folderName,
    data
  );
  const thumbnailMtime = await getThumbnailMtime(thumbnail);

  if (
    cachedPost &&
    cachedPost.__mtime === mtime &&
    cachedPost.__content &&
    cachedPost.thumbnail === thumbnail &&
    cachedPost.__thumbnailMtime === thumbnailMtime
  ) {
    return {
      ...cachedPost,
      slug: folderName,
    };
  }

  const processedContent = await remark().use(strip).process(content);
  const plainText = processedContent.toString();

  let blurDataURL = '';
  if (
    cachedPost &&
    cachedPost.blurDataURL &&
    cachedPost.thumbnail === thumbnail &&
    cachedPost.__thumbnailMtime === thumbnailMtime
  ) {
    ({ blurDataURL } = cachedPost);
  } else {
    blurDataURL = await generateBlurDataForImage(thumbnail);
  }

  const normalizedText = normalizeText(plainText);
  const summary = normalizedText
    ? `${normalizedText.slice(0, 150)}...`
    : description;

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
    __thumbnailMtime: thumbnailMtime,
  };
}

async function readExistingCache(): Promise<Record<string, CachedPost>> {
  try {
    const cached = JSON.parse(
      await fsPromises.readFile(CACHE_FILE_PATH, 'utf8')
    );

    if (!Array.isArray(cached)) {
      return {};
    }

    return cached.reduce<Record<string, CachedPost>>((accumulator, item) => {
      if (isCachedPost(item)) {
        accumulator[item.slug] = item;
      }

      return accumulator;
    }, {});
  } catch {
    return {};
  }
}

async function writeJsonFile(filePath: string, value: unknown): Promise<void> {
  const tempFilePath = `${filePath}.tmp`;
  const json = JSON.stringify(value, null, 2);

  await fsPromises.writeFile(tempFilePath, json);
  await fsPromises.rename(tempFilePath, filePath);
}

async function getPostFolders(): Promise<string[]> {
  const entries = await fsPromises.readdir(POSTS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      assertValidPostSlug(entry.name);
      return entry.name;
    })
    .sort((a, b) => a.localeCompare(b));
}

async function main() {
  await fsPromises.mkdir(DATA_DIR, { recursive: true });

  const existingCache = await readExistingCache();
  const postFolders = await getPostFolders();
  const limit = pLimit(CONCURRENCY_LIMIT);

  const postResults = await Promise.allSettled(
    postFolders.map((folder) => limit(() => processPost(folder, existingCache)))
  );

  const failedPosts = postResults.filter(
    (result): result is PromiseRejectedResult => result.status === 'rejected'
  );
  const validPosts = postResults
    .filter(
      (result): result is PromiseFulfilledResult<CachedPost> =>
        result.status === 'fulfilled'
    )
    .map((result) => result.value);

  if (failedPosts.length > 0) {
    failedPosts.forEach((result) => {
      console.error(result.reason);
    });

    throw new Error(`Failed to process ${failedPosts.length} post(s).`);
  }

  validPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const searchIndex: PostSearchData[] = validPosts.map((post) => ({
    title: post.title,
    description: post.description,
    tags: post.tags,
    slug: post.slug,
    date: post.date,
    content: normalizeText(post.__content || ''),
  }));

  await writeJsonFile(SEARCH_INDEX_PATH, searchIndex);

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
    __thumbnailMtime: post.__thumbnailMtime,
  }));

  await writeJsonFile(CACHE_FILE_PATH, listCache);
}

main().catch((error) => {
  console.error('Build script failed:', error);
  process.exit(1);
});
