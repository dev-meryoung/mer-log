import { notFound } from 'next/navigation';
import HomeWrapper from '@/components/HomeWrapper';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { getPaginatedPosts, getTotalPages } from '@/utils/paginationUtils';

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const totalPages = getTotalPages(allPosts.length);

  const paths = [];
  for (let i = 2; i <= totalPages; i++) {
    paths.push({ page: i.toString() });
  }

  return paths;
}

const Page = async ({ params }: PageProps) => {
  const { page } = await params;
  const pageNumber = Number(page);
  const allPosts = await getAllPosts();
  const totalPages = getTotalPages(allPosts.length);

  if (isNaN(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const currentPosts = getPaginatedPosts(allPosts, pageNumber);
  const allTags = getAllTags(allPosts);

  return (
    <HomeWrapper
      posts={currentPosts}
      allTags={allTags}
      totalPages={totalPages}
      currentPage={pageNumber}
      basePath=''
    />
  );
};

export default Page;
