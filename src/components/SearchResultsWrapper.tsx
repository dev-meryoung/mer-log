import SearchResults from '@/components/SearchResults';
import { getAllPosts, getAllSearchPosts } from '@/lib/posts';
import { compareDatesDesc } from '@/utils/dateUtils';

interface SearchResultsWrapperProps {
  keyword: string;
}

const SearchResultsWrapper = async ({ keyword }: SearchResultsWrapperProps) => {
  const [searchPosts, allPosts] = await Promise.all([
    getAllSearchPosts(),
    getAllPosts(),
  ]);

  const lowerKeyword = keyword.toLowerCase();

  const matchedSlugs = new Set(
    searchPosts
      .filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(lowerKeyword);
        const descMatch = post.description.toLowerCase().includes(lowerKeyword);
        const contentMatch = post.content.toLowerCase().includes(lowerKeyword);
        const tagMatch = post.tags.some((tag) =>
          tag.toLowerCase().includes(lowerKeyword)
        );

        return titleMatch || descMatch || contentMatch || tagMatch;
      })
      .map((post) => post.slug)
  );

  const filteredPosts = allPosts
    .filter((post) => matchedSlugs.has(post.slug))
    .sort((a, b) => compareDatesDesc(a.date, b.date));

  return <SearchResults initialPosts={filteredPosts} keyword={keyword} />;
};

export default SearchResultsWrapper;
