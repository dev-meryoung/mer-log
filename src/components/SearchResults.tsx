'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { POSTS_PER_PAGE } from '@/constants';
import { PostInfo } from '@/types/post';
import PostList from './PostList';

interface SearchResultsProps {
  initialPosts: PostInfo[];
  keyword: string;
  currentPage: number;
  normalizedHref?: string;
}

const SearchResults = ({
  initialPosts,
  keyword,
  currentPage,
  normalizedHref,
}: SearchResultsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const totalPages = Math.ceil(initialPosts.length / POSTS_PER_PAGE);
  const currentPosts = initialPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    if (normalizedHref) {
      router.replace(normalizedHref);
    }
  }, [normalizedHref, router]);

  const handlePageChange = (page: number) => {
    router.push(getSearchPageHref(page));
  };

  const getSearchPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (keyword) {
      params.set('keyword', keyword);
    } else {
      params.delete('keyword');
    }

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    return `${pathname}?${params.toString()}`;
  };

  if (!keyword) {
    return (
      <div className='py-40 text-center text-gray-500'>
        <h1 className='text-2xl md:text-3xl font-semibold my-4 md:my-8 text-gray-800 dark:text-gray-200'>
          검색
        </h1>
        <p className='text-sm md:text-lg'>
          검색어를 입력하면 관련 포스트를 찾을 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className='inline-block text-2xl md:text-3xl font-semibold my-4 md:my-8'>
        <span className='text-secondary dark:text-blue-700'>{`🔍'${keyword}'`}</span>
        <span className='text-gray-800 dark:text-gray-200'>
          에 대한 검색 결과
        </span>
        <span className='text-lg md:text-xl ml-1 font-normal text-gray-500'>
          ({initialPosts.length}개)
        </span>
      </h1>

      {initialPosts.length > 0 ? (
        <PostList
          posts={currentPosts}
          currentPage={currentPage}
          totalPages={totalPages}
          getPageHref={getSearchPageHref}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className='py-40 text-center text-gray-500'>
          <p className='text-sm md:text-lg'>
            {`'${keyword}'에 대한 검색 결과가 없습니다.`}
          </p>
        </div>
      )}
    </>
  );
};

export default SearchResults;
