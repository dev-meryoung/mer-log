import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  tagQueryString?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  tagQueryString = '',
}: PaginationProps) => {
  const groupSize = 5;
  const currentGroupStart =
    Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const currentGroupEnd = Math.min(
    currentGroupStart + groupSize - 1,
    totalPages
  );
  const paginationGroup = [];
  for (let i = currentGroupStart; i <= currentGroupEnd; i++) {
    paginationGroup.push(i);
  }
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <div className='my-4 flex justify-center items-center space-x-2 dark:text-text-dark'>
      {currentPage > 1 ? (
        <Link
          href={`/?page=1${tagQueryString}`}
          className='px-3 py-1 border border-gray-300 rounded dark:border-gray-500'
        >
          처음
        </Link>
      ) : (
        <span
          className={`px-3 py-1 border rounded ${disabledClasses} dark:border-gray-500`}
        >
          처음
        </span>
      )}

      {currentGroupStart > 1 ? (
        <Link
          href={`/?page=${currentGroupStart - 1}${tagQueryString}`}
          className='px-3 py-1 border border-gray-300 rounded dark:border-gray-500'
        >
          이전
        </Link>
      ) : (
        <span
          className={`px-3 py-1 border rounded ${disabledClasses} dark:border-gray-500`}
        >
          이전
        </span>
      )}

      {paginationGroup.map((page) => {
        return page === currentPage ? (
          <span
            key={page}
            className='px-3 py-1 border rounded bg-secondary text-white dark:border-gray-500'
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={`/?page=${page}${tagQueryString}`}
            className='px-3 py-1 border border-gray-300 rounded dark:border-gray-500'
          >
            {page}
          </Link>
        );
      })}

      {currentGroupEnd < totalPages ? (
        <Link
          href={`/?page=${currentGroupEnd + 1}${tagQueryString}`}
          className='px-3 py-1 border border-gray-300 rounded dark:border-gray-500'
        >
          다음
        </Link>
      ) : (
        <span
          className={`px-3 py-1 border rounded ${disabledClasses} dark:border-gray-500`}
        >
          다음
        </span>
      )}

      {currentPage < totalPages ? (
        <Link
          href={`/?page=${totalPages}${tagQueryString}`}
          className='px-3 py-1 border border-gray-300 rounded dark:border-gray-500'
        >
          끝
        </Link>
      ) : (
        <span
          className={`px-3 py-1 border rounded ${disabledClasses} dark:border-gray-500`}
        >
          끝
        </span>
      )}
    </div>
  );
};

export default Pagination;
