import Link from 'next/link';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/PostCard';
import Tag from '@/components/Tag';
import { getAllPosts, getAllTags } from '@/lib/posts';

interface HomeProps {
  searchParams: {
    page?: string;
    tags?: string;
  };
}

const Home = async (props: HomeProps) => {
  const searchParams = await Promise.resolve(props.searchParams);
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const selectedTags = searchParams.tags
    ? searchParams.tags
        .split(',')
        .map((tag) => {
          return tag.trim();
        })
        .filter(Boolean)
    : [];

  const filteredPosts =
    selectedTags.length > 0
      ? allPosts.filter((post) => {
          return selectedTags.some((tag) => {
            return post.tags.includes(tag);
          });
        })
      : allPosts;

  const postsPerPage = 5;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const tagQueryString =
    selectedTags.length > 0 ? `&tags=${selectedTags.join(',')}` : '';

  return (
    <div className='w-full px-2 select-none'>
      <div className='py-5'>
        <h1 className='inline font-recipekorea text-3xl font-bold hover:text-secondary dark:text-text-dark dark:hover:text-secondary'>
          TAGS
        </h1>
        <div className='flex my-4 p-4 gap-2 flex-wrap shadow-md bg-white rounded-lg dark:bg-darkActive'>
          {allTags.map((tag, index) => {
            return <Tag key={index} label={tag} />;
          })}
        </div>
      </div>
      <div className='py-5'>
        <h1 className='inline font-recipekorea text-3xl font-bold hover:text-secondary dark:text-text-dark dark:hover:text-secondary'>
          POSTS
        </h1>
        <div className='flex py-4 gap-8 flex-wrap'>
          {currentPosts.map((post, index) => {
            return (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className='w-full'
              >
                <PostCard
                  key={index}
                  title={post.title}
                  description={post.description}
                  thumbnail={post.thumbnail}
                  date={post.date}
                />
              </Link>
            );
          })}
        </div>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          tagQueryString={tagQueryString}
        />
      )}
    </div>
  );
};

export default Home;
