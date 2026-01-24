import { notFound } from 'next/navigation';
import SearchResults from '@/components/SearchResults';
import { getAllPosts, getAllSearchPosts } from '@/lib/posts';
import { compareDatesDescending } from '@/utils/dateUtils';

interface SearchResultsWrapperProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SearchResultsWrapper = async ({
  searchParams,
}: SearchResultsWrapperProps) => {
  const { keyword } = await searchParams;
  const keywordString = Array.isArray(keyword) ? keyword[0] : keyword;
  const trimmedKeyword = keywordString?.trim();

  if (!trimmedKeyword) {
    notFound();
  }

  const [searchPosts, allPosts] = await Promise.all([
    getAllSearchPosts(),
    getAllPosts(),
  ]);

  const lowerKeyword = trimmedKeyword.toLowerCase();

  const matchedSlugs = new Set(
    searchPosts
      .filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(lowerKeyword);
        const descriptionMatch = post.description
          .toLowerCase()
          .includes(lowerKeyword);
        const contentMatch = post.content.toLowerCase().includes(lowerKeyword);
        const tagMatch = post.tags.some((tag) =>
          tag.toLowerCase().includes(lowerKeyword)
        );

        return titleMatch || descriptionMatch || contentMatch || tagMatch;
      })
      .map((post) => post.slug)
  );

  const filteredPosts = allPosts
    .filter((post) => matchedSlugs.has(post.slug))
    .sort((a, b) => compareDatesDescending(a.date, b.date));

  return (
    <SearchResults initialPosts={filteredPosts} keyword={trimmedKeyword} />
  );
};

export default SearchResultsWrapper;
