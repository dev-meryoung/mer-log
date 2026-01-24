'use client';

import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { PostInfo } from '@/types/post';
import PostList from './PostList';

interface SearchResultsProps {
  initialPosts: PostInfo[];
  keyword: string;
}

const SearchResults = ({ initialPosts, keyword }: SearchResultsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get('page')) || 1;

  const postsPerPage = 5;
  const totalPages = Math.ceil(initialPosts.length / postsPerPage);
  const currentPosts = initialPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

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
          onPageChange={handlePageChange}
        />
      ) : (
        <div className='py-40 text-center text-gray-500'>
          <p className='text-sm md:text-lg'>
            {keyword ? `'${keyword}'에 대한 검색 결과가 없습니다.` : notFound()}
          </p>
        </div>
      )}
    </>
  );
};

export default SearchResults;
