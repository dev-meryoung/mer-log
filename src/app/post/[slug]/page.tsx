import Image from 'next/image';
import Link from 'next/link';
import Comments from '@/components/Comments';
import IndexNavigation from '@/components/IndexNavigation';
import { generateBlurDataForImage } from '@/lib/images';
import { getPost, processHeadings } from '@/lib/posts';
import { formatDate } from '@/utils/dateUtils';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = await getPost(slug);
  const { metadata, contentHtml } = post;
  const { headings, updatedHtml } = processHeadings(contentHtml);
  const thumbnailBlur = await generateBlurDataForImage(metadata.thumbnail);

  return (
    <>
      <article className='w-full mx-auto p-10 rounded-lg bg-white shadow-md dark:bg-darkActive'>
        <div className='relative'>
          <IndexNavigation headings={headings} />
          <div>
            <p className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 pl-0.5 dark:text-text-dark'>
              {metadata.title}
            </p>
            <p className='text-sm md:text-base text-gray-500 mb-4 pl-1'>
              {formatDate(metadata.date)}
            </p>
            <ul className='pb-4 mb-4 border-b border-gray-200 dark:border-text-light'>
              {metadata.tags.map((tag) => (
                <li key={tag} className='inline-block leading-9 mr-2'>
                  <Link href={`/?tags=${tag}`} key={tag}>
                    <span className='bg-gray-200 rounded-3xl px-2.5 py-1 text-sm text-gray-70 dark:bg-gray-500 dark:text-text-dark'>
                      {tag}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='relative w-full aspect-video mb-8'>
            <Image
              src={metadata.thumbnail}
              alt={metadata.title}
              className='rounded-lg object-cover'
              fill
              placeholder='blur'
              blurDataURL={thumbnailBlur}
            />
          </div>
          <div
            className='prose dark:prose-dark max-w-none'
            dangerouslySetInnerHTML={{ __html: updatedHtml }}
          />
        </div>
      </article>
      <Comments />
    </>
  );
};

export default PostPage;
