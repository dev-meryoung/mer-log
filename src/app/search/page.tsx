import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import SearchResultsWrapper from '@/components/SearchResultsWrapper';
import { getSearchedPosts } from '@/lib/posts';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) => {
  const { keyword } = await searchParams;

  if (!keyword) {
    notFound();
  }

  const searchedPosts = await getSearchedPosts(keyword);

  return (
    <Suspense fallback={<div className='h-[1400px]' />}>
      <SearchResultsWrapper initialPosts={searchedPosts} keyword={keyword} />
    </Suspense>
  );
};

export default SearchPage;
