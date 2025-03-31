import TagAndPostList from '@/components/TagAndPostList';
import { getAllPosts, getAllTags } from '@/lib/posts';

const Home = async () => {
  const allPosts = await getAllPosts();
  const allTags = await getAllTags();

  return <TagAndPostList allPosts={allPosts} allTags={allTags} />;
};

export default Home;
