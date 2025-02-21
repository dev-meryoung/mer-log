export const getPaginationGroup = (
  currentPage: number,
  totalPages: number,
  groupSize = 5
): number[] => {
  const start = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const end = Math.min(start + groupSize - 1, totalPages);
  const pages: number[] = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};
