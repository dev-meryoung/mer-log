import { Suspense } from 'react';
import HomeWrapper from '@/components/HomeWrapper';
import { getAllPosts, getAllTags } from '@/lib/posts';

const Home = async () => {
  const allPosts = await getAllPosts();
  const allTags = await getAllTags();

  return (
    <Suspense fallback={null}>
      <HomeWrapper allPosts={allPosts} allTags={allTags} />
    </Suspense>
  );
};

export default Home;
