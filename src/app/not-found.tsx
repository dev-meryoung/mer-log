import Link from 'next/link';

const NotFound = () => (
  <div className='w-full flex flex-col items-center px-10 py-60 gap-1.5 rounded-lg select-none bg-white shadow-md dark:bg-darkActive'>
    <h1 className='font-recipekorea text-7xl md:text-8xl text-primary dark:text-text-dark'>
      404
    </h1>
    <h2 className='font-recipekorea text-xl md:text-2xl text-primary dark:text-text-dark'>
      페이지를 찾을 수 없습니다.
    </h2>
    <div className='text-sm md:text-base text-gray-600 dark:text-gray-300'>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <p>URL 주소가 정확한지 확인해 주세요.</p>
    </div>
    <Link
      href='/'
      className='text-sm md:text-base px-2.5 py-1.5 mt-2.5 rounded-md border-2 text-primary border-primary dark:border-text-dark dark:text-text-dark'
    >
      메인으로 이동
    </Link>
  </div>
);

export default NotFound;
