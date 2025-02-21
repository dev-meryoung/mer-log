'use client';

import { XMarkIcon } from '@heroicons/react/16/solid';
import { useRouter, useSearchParams } from 'next/navigation';

interface TagProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }: TagProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tagsQuery = searchParams.get('tags') || '';
  const tagsArray = tagsQuery
    ? tagsQuery.split(',').map((tag) => tag.trim())
    : [];

  const active = tagsArray.includes(label);

  const handleClick = () => {
    let newTagsArray = [...tagsArray];

    if (active) {
      newTagsArray = newTagsArray.filter((tag) => tag !== label);
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
      className={`flex justify-center items-center gap-1 px-2.5 py-1.5 font-bold border border-secondary bg-background-light rounded-3xl transition-all duration-300 ease-in-out
        ${active ? 'bg-secondary text-white' : 'text-secondary hover:bg-secondary hover:text-white'}
      `}
      onClick={handleClick}
    >
      {label}
      {active ? <XMarkIcon className='w-5 h-5' /> : ''}
    </button>
  );
};

export default Tag;
