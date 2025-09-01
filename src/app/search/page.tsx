import { Suspense } from 'react';
import SearchResultsWrapper from '@/components/SearchResultsWrapper';

const SearchPage = () => (
  <Suspense fallback={<div className='h-[1400px]' />}>
    <SearchResultsWrapper />
  </Suspense>
);

export default SearchPage;
