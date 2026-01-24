import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  onPageChange,
}) => {
  const groupSize = 5;
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const currentGroupStart =
    Math.floor((safeCurrentPage - 1) / groupSize) * groupSize + 1;
  const currentGroupEnd = Math.min(
    currentGroupStart + groupSize - 1,
    totalPages
  );

  const paginationGroup = [];
  for (let i = currentGroupStart; i <= currentGroupEnd; i++) {
    paginationGroup.push(i);
  }

  const baseLinkClasses =
    'px-2.5 py-1 text-sm md:text-[16px] md:px-3 md:py-1 border border-gray-300 rounded dark:border-gray-500';
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  const activeClasses = 'bg-secondary text-text-dark dark:bg-blue-700';

  const getPageLink = (page: number) => {
    const cleanBasePath = basePath.replace(/\/$/, '');
    return page === 1 ? cleanBasePath || '/' : `${cleanBasePath}/page/${page}`;
  };

  const handleClick = (e: React.MouseEvent, page: number) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className='my-4 flex justify-center items-center space-x-2 dark:text-text-dark'>
      {safeCurrentPage > 1 ? (
        <Link
          href={getPageLink(1)}
          className={`${baseLinkClasses} ${safeCurrentPage === 1 ? disabledClasses : ''}`}
          onClick={(e) => {
            if (safeCurrentPage === 1) e.preventDefault();
            else handleClick(e, 1);
          }}
          aria-disabled={safeCurrentPage === 1}
        >
          처음
        </Link>
      ) : (
        <span className={`${baseLinkClasses} ${disabledClasses}`}>처음</span>
      )}

      {currentGroupStart > 1 ? (
        <Link
          href={getPageLink(currentGroupStart - 1)}
          className={baseLinkClasses}
          onClick={(e) => handleClick(e, currentGroupStart - 1)}
        >
          이전
        </Link>
      ) : (
        <span className={`${baseLinkClasses} ${disabledClasses}`}>이전</span>
      )}

      {paginationGroup.map((page) =>
        page === safeCurrentPage ? (
          <span key={page} className={`${baseLinkClasses} ${activeClasses}`}>
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={getPageLink(page)}
            className={baseLinkClasses}
            onClick={(e) => handleClick(e, page)}
          >
            {page}
          </Link>
        )
      )}

      {currentGroupEnd < totalPages ? (
        <Link
          href={getPageLink(currentGroupEnd + 1)}
          className={baseLinkClasses}
          onClick={(e) => handleClick(e, currentGroupEnd + 1)}
        >
          다음
        </Link>
      ) : (
        <span className={`${baseLinkClasses} ${disabledClasses}`}>다음</span>
      )}

      {safeCurrentPage < totalPages ? (
        <Link
          href={getPageLink(totalPages)}
          className={`${baseLinkClasses} ${safeCurrentPage === totalPages ? disabledClasses : ''}`}
          onClick={(e) => {
            if (safeCurrentPage === totalPages) e.preventDefault();
            else handleClick(e, totalPages);
          }}
          aria-disabled={safeCurrentPage === totalPages}
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
