import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Comments from '@/components/Comments';
import IndexNavigation from '@/components/IndexNavigation';
import PostNavigation from '@/components/PostNavigation';
import { defaultMetadata } from '@/lib/metadata';
import { getAllPosts, getPost } from '@/lib/posts';
import { formatDate } from '@/utils/dateUtils';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPost(slug);
  const { postInfo, summary } = post;
  const postURL = `${BASE_URL}/post/${slug}`;

  return defaultMetadata({
    title: postInfo.title,
    description: summary,
    keywords: postInfo.tags,
    image: postInfo.thumbnail,
    url: postURL,
  });
};

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return allPosts.map((post) => ({ slug: post.slug }));
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = await getPost(slug);
  const { postInfo, mdxSource, headings, prevPost, nextPost } = post;

  return (
    <>
      <article className='w-full mx-auto p-5 md:p-10 rounded-lg bg-white shadow-md dark:bg-darkActive'>
        <div className='relative'>
          <IndexNavigation headings={headings} />
          <div>
            <p className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 pl-0.5 dark:text-text-dark'>
              {postInfo.title}
            </p>
            <p className='text-sm md:text-[16px] text-gray-500 mb-4 pl-1'>
              {formatDate(postInfo.date)}
            </p>
            <ul className='pb-4 mb-4 border-b border-gray-200 dark:border-text-light'>
              {postInfo.tags.map((tag) => (
                <li key={tag} className='inline-block leading-9 mr-2'>
                  <Link href={`/?tag=${tag}`} key={tag}>
                    <span className='bg-gray-200 rounded-3xl px-2.5 py-1 text-sm text-gray-70 dark:bg-gray-700 dark:text-text-dark'>
                      {tag}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='relative w-full rounded-lg overflow-hidden aspect-video mb-8'>
            <Image
              src={postInfo.thumbnail || '/images/thumbnail.png'}
              alt={postInfo.title}
              className='w-full h-full object-cover'
              width={1280}
              height={720}
              placeholder='blur'
              blurDataURL={postInfo.blurDataURL}
              priority
            />
          </div>
          <div className='prose dark:prose-dark max-w-none'>{mdxSource}</div>
        </div>
      </article>
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
      <Comments />
    </>
  );
};

export default PostPage;
