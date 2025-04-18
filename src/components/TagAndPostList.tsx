'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/PostCard';
import Tag from '@/components/Tag';
import { PostInfo } from '@/lib/posts';

interface TagAndPostListProps {
  allTags: string[];
  allPosts: PostInfo[];
}

const TagAndPostList: React.FC<TagAndPostListProps> = ({
  allTags,
  allPosts,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedTags = useMemo(
    () => searchParams.getAll('tag'),
    [searchParams]
  );
  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(Number(pageParam) || 1);

  useEffect(() => {
    setCurrentPage(Number(pageParam) || 1);
  }, [pageParam, selectedTags]);

  const filteredPosts = useMemo(
    () =>
      selectedTags.length > 0
        ? allPosts.filter((post) =>
            selectedTags.some((tag) => post.tags.includes(tag))
          )
        : allPosts,
    [selectedTags, allPosts]
  );

  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const isPageValid =
    !isNaN(currentPage) && currentPage >= 1 && currentPage <= totalPages;

  const currentPosts = isPageValid
    ? filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
      )
    : [];

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='w-full px-2 select-none'>
      <div className='py-5'>
        <h1 className='inline font-recipekorea text-2xl md:text-3xl font-bold hover:text-secondary dark:text-text-dark dark:hover:text-blue-600'>
          TAGS
        </h1>
        {allTags.length > 0 ? (
          <div className='flex my-4 p-3 md:p-4 gap-1.5 md:gap-2 flex-wrap shadow-md bg-white rounded-lg dark:bg-darkActive'>
            {allTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        ) : (
          <div className='flex justify-center my-4 p-4 md:p-6 shadow-md bg-white rounded-lg dark:bg-darkActive dark:text-text-dark'>
            현재 등록된 태그가 없습니다.
          </div>
        )}
      </div>
      <div className='py-2 md:py-5'>
        <h1 className='inline font-recipekorea text-2xl md:text-3xl font-bold hover:text-secondary dark:text-text-dark dark:hover:text-blue-600'>
          POSTS
        </h1>
        {currentPosts.length > 0 ? (
          <div className='flex py-4 gap-8 flex-wrap'>
            {currentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className='w-full'
              >
                <PostCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  thumbnail={post.thumbnail}
                  date={post.date}
                  blurDataURL={post.blurDataURL}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className='flex justify-center my-4 p-12 text-sm md:text-[16px] md:p-20 shadow-md bg-white rounded-lg dark:bg-darkActive dark:text-text-dark'>
            포스트가 존재하지 않습니다.
          </div>
        )}
      </div>
      {filteredPosts.length > postsPerPage && isPageValid ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        ''
      )}
    </div>
  );
};
export default TagAndPostList;
