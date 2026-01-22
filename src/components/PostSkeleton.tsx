const PostSkeleton = () => (
  <div className='w-full mx-auto p-5 md:p-10 rounded-lg bg-white shadow-md dark:bg-darkActive animate-pulse'>
    <div className='relative'>
      <div className='h-8 md:h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4' />

      <div className='h-4 md:h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4' />

      <div className='flex pb-4 mb-4 border-b border-gray-200 dark:border-text-light'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded-3xl mr-2'
          />
        ))}
      </div>

      <div className='w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-8' />

      <div className='space-y-4'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-[95%]' />
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-[90%]' />
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-[85%]' />
        <br />
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-[92%]' />
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-[98%]' />
      </div>
    </div>
  </div>
);

export default PostSkeleton;
