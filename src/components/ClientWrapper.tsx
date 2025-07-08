'use client';

import { useMemo, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PostInfo } from '@/lib/posts';
import PostList from './PostList';
import TagList from './TagList';

interface ClientWrapperProps {
  allTags: string[];
  allPosts: PostInfo[];
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ allTags, allPosts }) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedTags = useMemo(
    () => searchParams.getAll('tag'),
    [searchParams]
  );
  const currentPage = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  );

  const filteredPosts = useMemo(
    () =>
      selectedTags.length > 0
        ? allPosts.filter((post) =>
            selectedTags.some((tag) => post.tags.includes(tag))
          )
        : allPosts,
    [selectedTags, allPosts]
  );

  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    const params = new URLSearchParams();
    newTags.forEach((t) => params.append('tag', t));
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
    <div
      className={`w-full px-2 select-none transition-opacity duration-300 ${isPending ? 'opacity-50 cursor-default pointer-events-none' : 'opacity-100'}`}
    >
      <TagList
        allTags={allTags}
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
      />
      <PostList
        posts={currentPosts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ClientWrapper;
