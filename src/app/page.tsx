import HomeWrapper from '@/components/HomeWrapper';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { getPaginatedPosts, getTotalPages } from '@/utils/paginationUtils';

const Home = async () => {
  const allPosts = await getAllPosts();
  const allTags = getAllTags(allPosts);
  const totalPages = getTotalPages(allPosts.length);
  const currentPosts = getPaginatedPosts(allPosts, 1);

  return (
    <HomeWrapper
      posts={currentPosts}
      allTags={allTags}
      totalPages={totalPages}
      currentPage={1}
      basePath=''
    />
  );
};

export default Home;
