'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface TagProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }: TagProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tagsQuery = searchParams.get('tags') || '';
  const tagsArray = tagsQuery
    ? tagsQuery.split(',').map((tag) => {
        return tag.trim();
      })
    : [];

  const active = tagsArray.includes(label);

  const handleClick = () => {
    let newTagsArray = [...tagsArray];

    if (active) {
      newTagsArray = newTagsArray.filter((tag) => {
        return tag !== label;
      });
    } else {
      newTagsArray.push(label);
    }

    const newTagsQuery = newTagsArray.join(',');
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newTagsQuery) {
      newSearchParams.set('tags', newTagsQuery);
    } else {
      newSearchParams.delete('tags');
    }

    newSearchParams.set('page', '1');
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <button
      type='button'
      className={`flex justify-center items-center gap-1 px-2.5 py-1.5 rounded-3xl bg-gray-200 dark:bg-gray-500 dark:text-text-dark
        ${active ? 'bg-secondary text-text-dark dark:bg-secondary' : ''}
      `}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Tag;
