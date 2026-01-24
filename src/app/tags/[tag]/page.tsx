import { notFound } from 'next/navigation';
import HomeWrapper from '@/components/HomeWrapper';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { getPaginatedPosts, getTotalPages } from '@/utils/paginationUtils';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const allTags = getAllTags(allPosts);

  return allTags.map((tag) => ({
    tag,
  }));
}

const Page = async ({ params }: PageProps) => {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getAllPosts();

  const filteredPosts = allPosts.filter((post) =>
    post.tags.includes(decodedTag)
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  const totalPages = getTotalPages(filteredPosts.length);
  const currentPosts = getPaginatedPosts(filteredPosts, 1);
  const allTags = getAllTags(allPosts);

  return (
    <HomeWrapper
      posts={currentPosts}
      allTags={allTags}
      totalPages={totalPages}
      currentPage={1}
      selectedTag={decodedTag}
      basePath={`/tags/${tag}`}
    />
  );
};

export default Page;
