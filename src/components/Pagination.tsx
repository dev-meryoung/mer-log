interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const groupSize = 5;
  const safeCurrentPage =
    !Number.isInteger(currentPage) ||
    currentPage < 1 ||
    currentPage > totalPages
      ? 1
      : currentPage;
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
  const activeClasses = 'bg-secondary text-text-dark dark:bg-blue-600';

  return (
    <div className='my-4 flex justify-center items-center space-x-2 dark:text-text-dark'>
      <button
        className={`${baseLinkClasses} ${safeCurrentPage === 1 ? disabledClasses : ''}`}
        onClick={() => onPageChange(1)}
        disabled={safeCurrentPage === 1}
      >
        처음
      </button>
      <button
        className={`${baseLinkClasses} ${currentGroupStart === 1 ? disabledClasses : ''}`}
        onClick={() => onPageChange(currentGroupStart - 1)}
        disabled={currentGroupStart === 1}
      >
        이전
      </button>
      {paginationGroup.map((page) => (
        <button
          key={page}
          className={`${baseLinkClasses} ${page === safeCurrentPage ? activeClasses : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`${baseLinkClasses} ${currentGroupEnd === totalPages ? disabledClasses : ''}`}
        onClick={() => onPageChange(currentGroupEnd + 1)}
        disabled={currentGroupEnd === totalPages}
      >
        다음
      </button>
      <button
        className={`${baseLinkClasses} ${safeCurrentPage === totalPages ? disabledClasses : ''}`}
        onClick={() => onPageChange(totalPages)}
        disabled={safeCurrentPage === totalPages}
      >
        끝
      </button>
    </div>
  );
};

export default Pagination;
