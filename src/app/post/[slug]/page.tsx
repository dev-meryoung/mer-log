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
    <article className='w-full mx-auto p-10 rounded-lg bg-white shadow-md'>
      <div>
        <h1 className='text-4xl font-bold mb-4 pl-0.5'>{metadata.title}</h1>
        <p className='text-gray-500 mb-4 pl-1'>{formatDate(metadata.date)}</p>
        <ul className='pb-4 mb-4 border-b border-gray-200'>
          {metadata.tags.map((tag) => {
            return (
              <li key={tag} className='inline-block leading-9 mr-2'>
                <span className='bg-gray-100 rounded-3xl px-2.5 py-1 text-sm text-gray-700'>
                  {tag}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='relative w-full h-[480px] mb-8'>
        <Image
          src={metadata.thumbnail}
          alt={metadata.title}
          fill
          className='rounded-lg object-cover'
        />
      </div>
      <div
        className='prose max-w-none'
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
};

export default PostPage;
