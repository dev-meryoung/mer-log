import Link from 'next/link';
import { PostInfo } from '@/types/post';

interface PostNavigationProps {
  prevPost: PostInfo | null | undefined;
  nextPost: PostInfo | null | undefined;
}

const PostNavigation = ({ prevPost, nextPost }: PostNavigationProps) => (
  <div className='flex gap-4'>
    <div className='flex w-full justify-center mx-auto rounded-lg bg-white shadow-md mt-4 dark:bg-darkActive'>
      {prevPost ? (
        <Link
          href={`/post/${prevPost.slug}`}
          className='w-full flex flex-col gap-1.5 p-4 md:p-5 hover:text-secondary dark:text-text-dark dark:hover:text-blue-700'
        >
          <p className='text-base md:text-lg font-bold'>← 이전 글</p>
          <p className='text-sm md:text-base'>{prevPost.title}</p>
        </Link>
      ) : (
        <div className='w-full flex flex-col gap-1.5 p-4 md:p-5'>
          <p className='text-base md:text-lg font-bold text-gray-400 dark:text-gray-500'>
            ← 이전 글
          </p>
          <p className='text-sm md:text-base text-gray-400 dark:text-gray-500'>
            -
          </p>
        </div>
      )}
    </div>
    <div className='flex w-full justify-center mx-auto rounded-lg bg-white shadow-md mt-4 dark:bg-darkActive'>
      {nextPost ? (
        <Link
          href={`/post/${nextPost.slug}`}
          className='w-full grid grid-rows-[auto_1fr] gap-1.5 p-4 md:p-5 text-right hover:text-secondary dark:text-text-dark dark:hover:text-blue-700'
        >
          <p className='text-base md:text-lg font-bold'>다음 글 →</p>
          <p className='text-sm md:text-base'>{nextPost.title}</p>
        </Link>
      ) : (
        <div className='w-full flex flex-col gap-1.5 p-4 md:p-5 text-right'>
          <p className='text-base md:text-lg font-bold text-gray-400 dark:text-gray-500'>
            다음 글 →
          </p>
          <p className='text-sm md:text-base text-gray-400 dark:text-gray-500'>
            -
          </p>
        </div>
      )}
    </div>
  </div>
);

export default PostNavigation;
