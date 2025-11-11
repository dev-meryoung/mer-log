import fs from 'fs/promises';
import path from 'path';
import { Document } from 'flexsearch';
import { notFound } from 'next/navigation';
import SearchResultsWrapper from '@/components/SearchResultsWrapper';
import { PostInfo } from '@/lib/posts';

const postCacheDefinition = {
  charset: 'utf-8',
  document: {
    id: 'id',
    index: ['title', 'description', 'tags', 'content'],
    store: ['slug'],
  },
};

async function getSearchIndex() {
  const searchIndex = new Document(postCacheDefinition);
  const searchDir = path.join(process.cwd(), 'public', 'data', 'search');

  try {
    const indexFiles = await fs.readdir(searchDir);

    for (const file of indexFiles) {
      const filePath = path.join(searchDir, file);
      const data = await fs.readFile(filePath, 'utf-8');
      searchIndex.import(file, data);
    }
  } catch (error) {
    console.error(error);

    return new Document(postCacheDefinition);
  }

  return searchIndex;
}

async function getAllPostsMap() {
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'post-cache.json'
  );
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const allPosts: PostInfo[] = JSON.parse(fileContents);

    return new Map(allPosts.map((post) => [post.slug, post]));
  } catch (error) {
    console.error(error);

    return new Map();
  }
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { keyword } = await searchParams;
  const trimmedKeyword = keyword?.trim();

  if (!trimmedKeyword) {
    notFound();
  }

  const [searchIndex, postMap] = await Promise.all([
    getSearchIndex(),
    getAllPostsMap(),
  ]);

  const searchResults = searchIndex.search(trimmedKeyword, {
    enrich: true,
  });

  const uniqueSlugs = new Set<string>();
  searchResults.forEach((fieldResult) => {
    fieldResult.result.forEach((hit) => {
      if (hit.doc && hit.doc.slug) {
        uniqueSlugs.add(hit.doc.slug as string);
      }
    });
  });

  const filteredPosts = Array.from(uniqueSlugs)
    .map((slug) => postMap.get(slug))
    .filter(Boolean) as PostInfo[];

  return (
    <SearchResultsWrapper
      initialPosts={filteredPosts}
      keyword={trimmedKeyword}
    />
  );
};
export default SearchPage;
