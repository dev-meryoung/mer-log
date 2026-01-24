import { ReactElement } from 'react';
import { MDXRemoteProps } from 'next-mdx-remote/rsc';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail: string;
  slug: string;
  blurDataURL: string;
  summary: string;
}

export type PostInfo = PostMeta & { content?: string };

export type PostSearchData = Pick<
  PostInfo,
  'title' | 'description' | 'tags' | 'slug' | 'date'
> & {
  content: string;
};

export interface PostData {
  postInfo: PostInfo;
  mdxSource: ReactElement<MDXRemoteProps>;
  headings: Heading[];
  summary: string;
  previousPost?: PostInfo | null;
  nextPost?: PostInfo | null;
}
