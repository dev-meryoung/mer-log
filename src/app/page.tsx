import { Suspense } from 'react';
import HomeWrapper from '@/components/HomeWrapper';
import { getAllPosts, getAllTags } from '@/lib/posts';
import Loading from './loading';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const HomeContent = async ({ searchParams }: HomeProps) => {
  const [allPosts, resolvedSearchParams] = await Promise.all([
    getAllPosts(),
    searchParams,
  ]);
  const allTags = getAllTags(allPosts);

  const page = Number(resolvedSearchParams.page) || 1;
  const selectedTags = resolvedSearchParams.tag;
  const tagsArray = Array.isArray(selectedTags)
    ? selectedTags
    : selectedTags
      ? [selectedTags]
      : [];

  const filteredPosts =
    tagsArray.length > 0
      ? allPosts.filter((post) =>
          tagsArray.some((tag) => post.tags.includes(tag))
        )
      : allPosts;

  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <HomeWrapper
      posts={currentPosts}
      allTags={allTags}
      totalPages={totalPages}
      currentPage={page}
      selectedTags={tagsArray}
    />
  );
};

const Home = async (props: HomeProps) => (
  <Suspense fallback={<Loading />}>
    <HomeContent {...props} />
  </Suspense>
);

export default Home;
