export const dynamicParams = false;

import { Metadata } from 'next';
import PostWrapper from '@/components/PostWrapper';
import { defaultMetadata } from '@/lib/metadata';
import { getAllPosts, getPost } from '@/lib/posts';

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
    <PostWrapper
      postInfo={postInfo}
      mdxSource={mdxSource}
      headings={headings}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
};

export default PostPage;
