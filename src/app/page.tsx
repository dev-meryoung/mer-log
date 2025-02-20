import PostCard from '@/components/PostCard';
import Tag from '@/components/Tag';
import { getAllPosts, getAllTags } from '@/lib/posts';

const Home = async () => {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className='w-full px-2 select-none'>
      <div className='py-6'>
        <h1 className='inline font-recipekorea text-3xl font-bold transition-all duration-300 ease-in-out hover:text-secondary'>
          TAGS
        </h1>
        <div className='flex my-4 p-4 gap-2 flex-wrap bg-white rounded-lg'>
          {tags.map((tag, index) => {
            return <Tag key={index} label={tag} />;
          })}
        </div>
      </div>
      <div className='py-6'>
        <h1 className='font-recipekorea text-3xl font-bold transition-all duration-300 ease-in-out hover:text-secondary'>
          POSTS
        </h1>
        <div className='flex py-4 gap-8 flex-wrap'>
          {posts.map((post, index) => {
            return (
              <PostCard
                key={index}
                title={post.title}
                description={post.description}
                thumbnail={post.thumbnail}
                date={post.date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
