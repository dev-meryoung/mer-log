import { notFound } from 'next/navigation';
import SearchResultsWrapper from '@/components/SearchResultsWrapper';
import { getAllPosts, getAllSearchPosts } from '@/lib/posts';
import { compareDatesDesc } from '@/utils/dateUtils';

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

  const [searchPosts, allPosts] = await Promise.all([
    getAllSearchPosts(),
    getAllPosts(),
  ]);

  const lowerKeyword = trimmedKeyword.toLowerCase();

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

  return (
    <SearchResultsWrapper
      initialPosts={filteredPosts}
      keyword={trimmedKeyword}
    />
  );
};

export default SearchPage;
