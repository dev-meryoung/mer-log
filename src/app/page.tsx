import Link from 'next/link';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/PostCard';
import Tag from '@/components/Tag';
import { generateBlurDataForImage } from '@/lib/images';
import { getAllPosts, getAllTags } from '@/lib/posts';

interface HomeProps {
  searchParams: Promise<{ page?: string; tags?: string }>;
}

const Home = async (props: HomeProps) => {
  const searchParams = await props.searchParams;
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const selectedTags = searchParams.tags
    ? searchParams.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const filteredPosts =
    selectedTags.length > 0
      ? allPosts.filter((post) =>
          selectedTags.some((tag) => post.tags.includes(tag))
        )
      : allPosts;

  const postsPerPage = 5;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );
  const postsWithPlaceholder = await Promise.all(
    currentPosts.map(async (post) => {
      const blurDataURL = await generateBlurDataForImage(post.thumbnail);
      return { ...post, blurDataURL };
    })
  );
  const tagQueryString =
    selectedTags.length > 0 ? `&tags=${selectedTags.join(',')}` : '';

  return (
    <div className='w-full px-2 select-none'>
      <div className='py-5'>
        <h1 className='inline font-recipekorea text-2xl md:text-3xl font-bold hover:text-secondary dark:text-text-dark dark:hover:text-blue-400'>
          TAGS
        </h1>
        {allTags.length > 0 ? (
          <div className='flex my-4 p-3 md:p-4 gap-1.5 md:gap-2 flex-wrap shadow-md bg-white rounded-lg dark:bg-darkActive'>
            {allTags.map((tag, index) => (
              <Tag key={index} label={tag} />
            ))}
          </div>
        ) : (
          <div className='flex justify-center my-4 p-4 md:p-6 shadow-md bg-white rounded-lg dark:bg-darkActive dark:text-text-dark'>
            현재 등록된 태그가 없습니다.
          </div>
        )}
      </div>
      <div className='py-2 md:py-5'>
        <h1 className='inline font-recipekorea text-2xl md:text-3xl font-bold hover:text-secondary dark:text-text-dark dark:hover:text-blue-400'>
          POSTS
        </h1>
        {allPosts.length > 0 ? (
          <div className='flex py-4 gap-8 flex-wrap'>
            {postsWithPlaceholder.map((post, index) => (
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
                  blurDataURL={post.blurDataURL}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className='flex justify-center my-4 p-12 md:p-20 shadow-md bg-white rounded-lg dark:bg-darkActive dark:text-text-dark'>
            현재 작성된 게시글이 없습니다.
          </div>
        )}
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
