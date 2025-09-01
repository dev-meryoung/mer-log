'use client';

import { useMemo, useState, useTransition, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PostInfo } from '@/lib/posts';
import PostList from './PostList';

interface SearchResultsWrapperProps {
  initialPosts: PostInfo[];
  keyword: string;
}

const SearchResultsWrapper: React.FC<SearchResultsWrapperProps> = ({
  initialPosts,
  keyword,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentPage = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  );

  const postsPerPage = 5;
  const totalPages = Math.ceil(initialPosts.length / postsPerPage);

  const currentPosts = initialPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div
      className={`mx-auto transition-opacity duration-500 ease-in-out ${
        isMounted ? 'opacity-100' : 'opacity-0'
      } ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <h1 className='inline-block text-2xl sm:text-3xl font-semibold my-4 md:my-8'>
        <span className='text-secondary dark:text-blue-700'>{`🔍'${keyword}'`}</span>
        <span className='text-gray-800 dark:text-gray-200'>
          에 대한 검색 결과
        </span>
        <span className='text-lg sm:text-xl ml-1 font-normal text-gray-500'>
          ({initialPosts.length}개)
        </span>
      </h1>

      {initialPosts.length > 0 ? (
        <PostList
          posts={currentPosts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className='py-16 text-center text-gray-500'>
          <p className='text-lg'>
            {`'${keyword}'`}에 대한 검색 결과가 없습니다.
          </p>
          <p className='mt-2 text-sm'>다른 검색어로 다시 시도해보세요.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsWrapper;
