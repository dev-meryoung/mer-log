'use client';

import React, { ReactElement } from 'react';
import Image from 'next/image';
import { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { PostInfo, Heading } from '@/types/post';
import { formatDate } from '@/utils/dateUtils';
import Comments from './Comments';
import IndexNavigation from './IndexNavigation';
import PostNavigation from './PostNavigation';
import Tag from './Tag';

interface PostWrapperProps {
  postInfo: PostInfo;
  mdxSource: ReactElement<MDXRemoteProps>;
  headings: Heading[];
  prevPost?: PostInfo | null;
  nextPost?: PostInfo | null;
}

const PostWrapper: React.FC<PostWrapperProps> = ({
  postInfo,
  mdxSource,
  headings,
  prevPost,
  nextPost,
}) => (
  <div data-is-post-page='true'>
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
                <Tag label={tag} size='sm' />
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
  </div>
);

export default PostWrapper;
