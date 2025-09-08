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

  const filePath = path.join(process.cwd(), 'public', 'search-data.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const allPosts: PostInfo[] = JSON.parse(fileContents);

  const filteredPosts = keyword
    ? allPosts.filter((post) => {
        const target = keyword.toLowerCase();
        const titleMatch = post.title.toLowerCase().includes(target);
        const descriptionMatch = post.description
          .toLowerCase()
          .includes(target);
        const tagsMatch = post.tags.some((tag) =>
          tag.toLowerCase().includes(target)
        );
        return titleMatch || descriptionMatch || tagsMatch;
      })
    : [];

  return (
    <SearchResultsWrapper initialPosts={filteredPosts} keyword={keyword} />
  );
};
export default SearchPage;
