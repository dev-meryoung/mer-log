import { POSTS_PER_PAGE } from '@/constants';
import { PostInfo } from '@/types/post';

export const getTotalPages = (totalPosts: number): number =>
  Math.ceil(totalPosts / POSTS_PER_PAGE);

export const getPaginatedPosts = (
  posts: PostInfo[],
  page: number
): PostInfo[] => {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  return posts.slice(start, end);
};
