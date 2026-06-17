import type { Metadata } from 'next';
import SearchResultsWrapper, {
  getSearchResultsData,
} from '@/components/SearchResultsWrapper';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async ({
  searchParams,
}: SearchPageProps): Promise<Metadata> => {
  const { keyword } = await getSearchResultsData(searchParams);

  return {
    title: keyword ? `'${keyword}' 검색 결과` : '검색',
  };
};

const SearchPage = ({ searchParams }: SearchPageProps) => (
  <SearchResultsWrapper searchParams={searchParams} />
);

export default SearchPage;
