import PostListSkeleton from '@/components/PostListSkeleton';

const Loading = () => (
  <div>
    <div className='py-5'>
      <h1 className='inline font-recipekorea text-2xl md:text-3xl font-bold dark:text-text-dark'>
        TAGS
      </h1>
      <div className='flex my-4 p-3 md:p-4 gap-1.5 md:gap-2 flex-wrap shadow-md bg-white rounded-lg dark:bg-darkActive animate-pulse'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className='h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-3xl'
          />
        ))}
      </div>
    </div>

    <PostListSkeleton />
  </div>
);

export default Loading;
