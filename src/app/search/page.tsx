import { Suspense } from 'react';
import SearchResultsWrapper from '@/components/SearchResultsWrapper';
import Loading from './loading';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SearchPage = ({ searchParams }: SearchPageProps) => (
  <Suspense fallback={<Loading />}>
    <SearchResultsWrapper searchParams={searchParams} />
  </Suspense>
);

export default SearchPage;
