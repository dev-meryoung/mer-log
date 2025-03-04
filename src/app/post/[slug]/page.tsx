import { Metadata } from 'next';
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

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const { postInfo } = post;

  return {
    title: `${postInfo.title}`,
    description: `${postInfo.description}`,
    keywords: [
      '프론트엔드',
      '개발자',
      '기술 블로그',
      'Web',
      'Frontend',
      'Blog',
      'Junior',
      'Developer',
      ...postInfo.tags,
    ],
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: 'https://www.merlog.kr',
      siteName: 'mer-log',
      images: [
        {
          url: `${postInfo.thumbnail}`,
          width: 1200,
          height: 630,
          alt: 'thumbnail',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@mer-log',
      creator: '@meryoung',
      images: [`${postInfo.thumbnail}`],
    },
    robots: 'index, follow',
    alternates: {
      canonical: 'https://www.merlog.kr',
    },
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = await getPost(slug);
  const { postInfo, contentHtml } = post;
  const { headings, updatedHtml } = processHeadings(contentHtml);
  const thumbnailBlur = await generateBlurDataForImage(postInfo.thumbnail);

  return (
    <>
      <article className='w-full mx-auto p-10 rounded-lg bg-white shadow-md dark:bg-darkActive'>
        <div className='relative'>
          <IndexNavigation headings={headings} />
          <div>
            <p className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 pl-0.5 dark:text-text-dark'>
              {postInfo.title}
            </p>
            <p className='text-sm md:text-base text-gray-500 mb-4 pl-1'>
              {formatDate(postInfo.date)}
            </p>
            <ul className='pb-4 mb-4 border-b border-gray-200 dark:border-text-light'>
              {postInfo.tags.map((tag) => (
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
              src={postInfo.thumbnail}
              alt={postInfo.title}
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
