import PostCardSkeleton from '@/components/PostCardSkeleton';

interface PostListSkeletonProps {
  isSearchPage?: boolean;
}

const PostListSkeleton = ({ isSearchPage = false }: PostListSkeletonProps) => (
  <div className='py-2 md:py-5'>
    {!isSearchPage && (
      <h1 className='inline font-recipekorea text-2xl md:text-3xl font-bold dark:text-text-dark'>
        POSTS
      </h1>
    )}
    <div className='flex py-4 gap-8 flex-wrap'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='w-full'>
          <PostCardSkeleton />
        </div>
      ))}
    </div>
  </div>
);

export default PostListSkeleton;
