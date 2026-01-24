const PostCardSkeleton = () => (
  <div className='flex flex-col md:flex-row w-full rounded-lg shadow-md bg-white overflow-hidden dark:bg-darkActive min-h-[370px] md:min-h-[196px] animate-pulse'>
    <div className='relative w-full md:w-1/3 aspect-video bg-gray-200 dark:bg-gray-600' />

    <div className='relative flex flex-col w-full min-h-[164px] p-4 md:min-h-[188px] md:w-2/3 md:px-8 md:py-6 gap-2 flex-grow'>
      <div className='h-7 md:h-8 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2' />

      <div className='space-y-2'>
        <div className='h-4 md:h-5 bg-gray-200 dark:bg-gray-600 rounded w-full' />
        <div className='h-4 md:h-5 bg-gray-200 dark:bg-gray-600 rounded w-5/6' />
      </div>

      <div className='mt-auto h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded' />
    </div>
  </div>
);

export default PostCardSkeleton;
