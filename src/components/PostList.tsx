'use client';

import Link from 'next/link';
import { PostInfo } from '@/lib/posts';
import Pagination from './Pagination';
import PostCard from './PostCard';

interface PostListProps {
  posts: PostInfo[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className='py-2 md:py-5'>
    <h1 className='inline font-recipekorea text-2xl md:text-3xl font-bold dark:text-text-dark'>
      POSTS
    </h1>
    {posts.length > 0 ? (
      <div className='flex py-4 gap-8 flex-wrap'>
        {posts.map((post) => (
          <Link key={post.slug} href={`/post/${post.slug}`} className='w-full'>
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
    {totalPages > 1 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    )}
  </div>
);

export default PostList;
