export const dynamicParams = false;

import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import PostWrapper from '@/components/PostWrapper';
import { getPost } from '@/lib/mdx';
import { defaultMetadata } from '@/lib/metadata';
import { getAllPosts } from '@/lib/posts';

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

  const { postInfo, mdxSource, headings, previousPost, nextPost } = post;
  const postURL = `${BASE_URL}/post/${slug}`;

  return (
    <>
      <JsonLd post={postInfo} url={postURL} />
      <PostWrapper
        postInfo={postInfo}
        mdxSource={mdxSource}
        headings={headings}
        previousPost={previousPost}
        nextPost={nextPost}
      />
    </>
  );
};

export default PostPage;
