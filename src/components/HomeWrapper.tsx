'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PostInfo } from '@/types/post';
import PostList from './PostList';
import TagList from './TagList';
import TransitionWrapper from './TransitionWrapper';

interface HomeWrapperProps {
  allTags: string[];
  posts: PostInfo[];
  totalPages: number;
  currentPage: number;
  selectedTags: string[];
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({
  allTags,
  posts,
  totalPages,
  currentPage,
  selectedTags,
}) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    const params = new URLSearchParams(searchParams.toString());
    params.delete('tag');
    newTags.forEach((t) => params.append('tag', t));

    params.set('page', '1');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <TransitionWrapper isPending={isPending}>
      <TagList
        allTags={allTags}
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
      />
      <PostList
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </TransitionWrapper>
  );
};

export default HomeWrapper;
