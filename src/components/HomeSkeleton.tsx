const HomeSkeleton = () => (
  <div className='w-full px-2 select-none animate-pulse'>
    <div className='py-5'>
      <div className='h-8 w-24 mb-4 bg-gray-200 rounded-md dark:bg-gray-700' />
      <div className='my-4 p-3 md:p-4 gap-1.5 md:gap-2 flex flex-wrap shadow-md bg-white rounded-lg dark:bg-darkActive'>
        <div className='h-8 w-20 bg-gray-200 rounded-3xl dark:bg-gray-700' />
        <div className='h-8 w-24 bg-gray-200 rounded-3xl dark:bg-gray-700' />
        <div className='h-8 w-16 bg-gray-200 rounded-3xl dark:bg-gray-700' />
        <div className='h-8 w-24 bg-gray-200 rounded-3xl dark:bg-gray-700' />
        <div className='h-8 w-20 bg-gray-200 rounded-3xl dark:bg-gray-700' />
      </div>
    </div>

    <div className='py-2 md:py-5'>
      <div className='h-8 w-24 mb-4 bg-gray-200 rounded-md dark:bg-gray-700' />
      <div className='flex flex-col py-4 gap-8'>
        <div className='flex flex-col md:flex-row w-full rounded-lg shadow-md bg-white overflow-hidden dark:bg-darkActive min-h-[370px] md:min-h-[196px]'>
          <div className='w-full md:w-1/3 bg-gray-200 dark:bg-gray-700 aspect-video md:aspect-auto' />
          <div className='flex flex-col w-full min-h-[164px] p-4 md:min-h-[188px] md:w-2/3 md:px-8 md:py-6 gap-3 flex-grow'>
            <div className='h-6 w-3/4 bg-gray-200 rounded-md dark:bg-gray-700' />
            <div className='h-4 w-full bg-gray-200 rounded-md dark:bg-gray-700' />
            <div className='h-4 w-5/6 bg-gray-200 rounded-md dark:bg-gray-700' />
            <div className='mt-auto h-4 w-1/4 bg-gray-200 rounded-md dark:bg-gray-700' />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomeSkeleton;
