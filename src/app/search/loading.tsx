import PostListSkeleton from '@/components/PostListSkeleton';

const Loading = () => (
  <div className='w-full'>
    {/* Title Skeleton */}
    <div className='my-4 md:my-8 animate-pulse'>
      <div className='h-8 md:h-9 w-64 md:w-96 bg-gray-200 dark:bg-gray-600 rounded' />
    </div>

    {/* Post List Skeleton */}
    <PostListSkeleton isSearchPage />
  </div>
);

export default Loading;
