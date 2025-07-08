import { Suspense } from 'react';
import ClientWrapper from '@/components/ClientWrapper';
import HomeSkeleton from '@/components/HomeSkeleton';
import { getAllPosts, getAllTags } from '@/lib/posts';

const Home = async () => {
  const allPosts = await getAllPosts();
  const allTags = await getAllTags();

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <ClientWrapper allPosts={allPosts} allTags={allTags} />
    </Suspense>
  );
};

export default Home;
