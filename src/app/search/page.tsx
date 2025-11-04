import fs from 'fs/promises';
import path from 'path';
import SearchResultsWrapper from '@/components/SearchResultsWrapper';
import { PostInfo } from '@/lib/posts';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { keyword } = await searchParams;

  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'post-cache.json'
  );
  const fileContents = await fs.readFile(filePath, 'utf8');
  const allPosts: PostInfo[] = JSON.parse(fileContents);

  const filteredPosts = keyword
    ? allPosts.filter((post) => {
        const target = keyword.toLowerCase();
        const searchableContent = [
          post.title,
          post.description,
          ...(post.tags || []),
          post.content,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchableContent.includes(target);
      })
    : [];

  return (
    <SearchResultsWrapper initialPosts={filteredPosts} keyword={keyword} />
  );
};
export default SearchPage;
