import { redirect } from 'next/navigation';
import SearchResults from '@/components/SearchResults';
import { POSTS_PER_PAGE } from '@/constants';
import { getAllPosts, getAllSearchPosts } from '@/lib/posts';
import type { PostSearchData } from '@/types/post';

interface SearchResultsWrapperProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export type SearchResultsData = {
  filteredPosts: Awaited<ReturnType<typeof getAllPosts>>;
  keyword: string;
  currentPage: number;
  normalizedHref?: string;
};

const normalizeSearchValue = (value: string): string => value.toLowerCase();

const getSearchUrl = (keyword: string, page = 1): string => {
  const params = new URLSearchParams();

  if (keyword) {
    params.set('keyword', keyword);
  }

  if (page > 1) {
    params.set('page', page.toString());
  }

  const queryString = params.toString();
  return queryString ? `/search?${queryString}` : '/search';
};

const parsePageParam = (
  page: string | string[] | undefined
): { page: number; shouldNormalize: boolean } => {
  const pageString = Array.isArray(page) ? page[0] : page;

  if (pageString === undefined) {
    return {
      page: 1,
      shouldNormalize: false,
    };
  }

  if (!/^[1-9]\d*$/.test(pageString)) {
    return {
      page: 1,
      shouldNormalize: true,
    };
  }

  const parsedPage = Number(pageString);

  return {
    page: parsedPage,
    shouldNormalize: parsedPage === 1,
  };
};

const matchesKeyword = (post: PostSearchData, keyword: string): boolean => {
  const searchableValues = [
    post.title,
    post.description,
    post.content,
    ...post.tags,
  ];

  return searchableValues.some((value) =>
    normalizeSearchValue(value).includes(keyword)
  );
};

export const getSearchResultsData = async (
  searchParams: SearchResultsWrapperProps['searchParams']
): Promise<SearchResultsData> => {
  const { keyword, page } = await searchParams;
  const keywordString = Array.isArray(keyword) ? keyword[0] : keyword;
  const trimmedKeyword = keywordString?.trim() || '';
  const { page: parsedPage, shouldNormalize: shouldNormalizePage } =
    parsePageParam(page);
  let currentPage = parsedPage;
  let normalizedHref: string | undefined;

  if (!trimmedKeyword) {
    if (keyword !== undefined || page !== undefined) {
      redirect('/search');
    }

    return {
      filteredPosts: [],
      keyword: '',
      currentPage: 1,
    };
  }

  if (shouldNormalizePage) {
    redirect(getSearchUrl(trimmedKeyword));
  }

  const [searchPosts, allPosts] = await Promise.all([
    getAllSearchPosts(),
    getAllPosts(),
  ]);

  const normalizedKeyword = normalizeSearchValue(trimmedKeyword);

  const matchedSlugs = new Set(
    searchPosts
      .filter((post) => matchesKeyword(post, normalizedKeyword))
      .map((post) => post.slug)
  );

  const filteredPosts = allPosts.filter((post) => matchedSlugs.has(post.slug));
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  if (
    (totalPages === 0 && currentPage > 1) ||
    (totalPages > 0 && currentPage > totalPages)
  ) {
    currentPage = 1;
    normalizedHref = getSearchUrl(trimmedKeyword);
  }

  return {
    filteredPosts,
    keyword: trimmedKeyword,
    currentPage,
    normalizedHref,
  };
};

const SearchResultsWrapper = async ({
  searchParams,
}: SearchResultsWrapperProps) => {
  const { filteredPosts, keyword, currentPage, normalizedHref } =
    await getSearchResultsData(searchParams);

  return (
    <SearchResults
      initialPosts={filteredPosts}
      keyword={keyword}
      currentPage={currentPage}
      normalizedHref={normalizedHref}
    />
  );
};

export default SearchResultsWrapper;
