import { notFound } from 'next/navigation';
import HomeWrapper from '@/components/HomeWrapper';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { getPaginatedPosts, getTotalPages } from '@/utils/paginationUtils';

interface PageProps {
  params: Promise<{ tag: string; page: string }>;
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const allTags = getAllTags(allPosts);
  const paths = [];

  for (const tag of allTags) {
    const filteredPosts = allPosts.filter((post) => post.tags.includes(tag));
    const totalPages = getTotalPages(filteredPosts.length);

    for (let i = 2; i <= totalPages; i++) {
      paths.push({
        tag,
        page: i.toString(),
      });
    }
  }

  return paths;
}

const Page = async ({ params }: PageProps) => {
  const { tag, page } = await params;
  const decodedTag = decodeURIComponent(tag);
  const pageNumber = Number(page);

  const allPosts = await getAllPosts();
  const filteredPosts = allPosts.filter((post) =>
    post.tags.includes(decodedTag)
  );

  const totalPages = getTotalPages(filteredPosts.length);

  if (isNaN(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const currentPosts = getPaginatedPosts(filteredPosts, pageNumber);
  const allTags = getAllTags(allPosts);

  return (
    <HomeWrapper
      posts={currentPosts}
      allTags={allTags}
      totalPages={totalPages}
      currentPage={pageNumber}
      selectedTag={decodedTag}
      basePath={`/tags/${tag}`}
    />
  );
};

export default Page;
