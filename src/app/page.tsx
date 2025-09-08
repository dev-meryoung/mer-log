import HomeWrapper from '@/components/HomeWrapper';
import { getAllPosts, getAllTags } from '@/lib/posts';

const Home = async () => {
  const allPosts = await getAllPosts();
  const allTags = await getAllTags();

  return <HomeWrapper allPosts={allPosts} allTags={allTags} />;
};

export default Home;
