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
}) => {
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

  const baseLinkClasses =
    'px-2.5 py-1 text-sm md:text-base md:px-3 md:py-1 border border-gray-300 rounded dark:border-gray-500';
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  const activeClasses = 'bg-secondary text-text-dark dark:bg-blue-400';

  return (
    <div className='my-4 flex justify-center items-center space-x-2 dark:text-text-dark'>
      {currentPage > 1 ? (
        <Link href={`/?page=1${tagQueryString}`} className={baseLinkClasses}>
          처음
        </Link>
      ) : (
        <span className={`${baseLinkClasses} ${disabledClasses}`}>처음</span>
      )}

      {currentGroupStart > 1 ? (
        <Link
          href={`/?page=${currentGroupStart - 1}${tagQueryString}`}
          className={baseLinkClasses}
        >
          이전
        </Link>
      ) : (
        <span className={`${baseLinkClasses} ${disabledClasses}`}>이전</span>
      )}

      {paginationGroup.map((page) =>
        page === currentPage ? (
          <span key={page} className={`${baseLinkClasses} ${activeClasses}`}>
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={`/?page=${page}${tagQueryString}`}
            className={baseLinkClasses}
          >
            {page}
          </Link>
        )
      )}

      {currentGroupEnd < totalPages ? (
        <Link
          href={`/?page=${currentGroupEnd + 1}${tagQueryString}`}
          className={baseLinkClasses}
        >
          다음
        </Link>
      ) : (
        <span className={`${baseLinkClasses} ${disabledClasses}`}>다음</span>
      )}

      {currentPage < totalPages ? (
        <Link
          href={`/?page=${totalPages}${tagQueryString}`}
          className={baseLinkClasses}
        >
          끝
        </Link>
      ) : (
        <span className={`${baseLinkClasses} ${disabledClasses}`}>끝</span>
      )}
    </div>
  );
};

export default Pagination;
