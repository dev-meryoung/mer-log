import Image from 'next/image';
import { getPost } from '@/lib/posts';
import { formatDate } from '@/utils/dateUtils';

interface PostPageProps {
  params: { slug: string };
}

const PostPage = async ({ params }: PostPageProps) => {
  const post = await getPost(params.slug);
  const { metadata, contentHtml } = post;

  return (
    <article className='w-full mx-auto p-10 rounded-lg bg-white shadow-md dark:bg-darkActive'>
      <div>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 pl-0.5 dark:text-text-dark'>
          {metadata.title}
        </h1>
        <p className='text-sm md:text-base text-gray-500 mb-4 pl-1'>
          {formatDate(metadata.date)}
        </p>
        <ul className='pb-4 mb-4 border-b border-gray-200 dark:border-text-light'>
          {metadata.tags.map((tag) => (
            <li key={tag} className='inline-block leading-9 mr-2'>
              <span className='bg-gray-200 rounded-3xl px-2.5 py-1 text-sm text-gray-70 dark:bg-gray-500 dark:text-text-dark'>
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className='relative w-full aspect-video mb-8'>
        <Image
          src={metadata.thumbnail}
          alt={metadata.title}
          fill
          className='rounded-lg object-cover'
        />
      </div>
      <div
        className='prose dark:prose-dark max-w-none'
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
};

export default PostPage;
