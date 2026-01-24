import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import SearchResultsWrapper from '@/components/SearchResultsWrapper';
import Loading from './loading';

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

  return (
    <Suspense fallback={<Loading />}>
      <SearchResultsWrapper keyword={trimmedKeyword} />
    </Suspense>
  );
};

export default SearchPage;
