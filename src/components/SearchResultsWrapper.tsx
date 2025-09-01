'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { PostInfo } from '@/lib/posts';
import PostList from './PostList';

const SearchResultsWrapper = () => {
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const keyword = searchParams.get('keyword') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [allPosts, setAllPosts] = useState<PostInfo[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostInfo[]>([]);

  useEffect(() => {
    setIsMounted(true);

    const fetchAllPosts = async () => {
      try {
        const response = await fetch('/search-data.json');
        const data: PostInfo[] = await response.json();

        setAllPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (keyword && allPosts.length > 0) {
      const target = keyword.toLowerCase();
      const results = allPosts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(target);
        const descriptionMatch = post.description
          .toLowerCase()
          .includes(target);
        const tagsMatch = post.tags.some((tag) =>
          tag.toLowerCase().includes(target)
        );

        return titleMatch || descriptionMatch || tagsMatch;
      });

      setFilteredPosts(results);
    } else {
      setFilteredPosts([]);
    }
  }, [keyword, allPosts]);

  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
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
      className={`transition-opacity duration-500 ease-in-out ${
        isMounted ? 'opacity-100' : 'opacity-0'
      } ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <h1 className='inline-block text-2xl md:text-3xl font-semibold my-4 md:my-8'>
        <span className='text-secondary dark:text-blue-700'>{`🔍'${keyword}'`}</span>
        <span className='text-gray-800 dark:text-gray-200'>
          에 대한 검색 결과
        </span>
        <span className='text-lg md:text-xl ml-1 font-normal text-gray-500'>
          ({filteredPosts.length}개)
        </span>
      </h1>

      {filteredPosts.length > 0 ? (
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
    </div>
  );
};

export default SearchResultsWrapper;
