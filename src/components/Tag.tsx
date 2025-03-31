'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface TagProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tagsArray, setTagsArray] = useState<string[]>([]);

  useEffect(() => {
    setTagsArray(searchParams.getAll('tag'));
  }, [searchParams]);

  const isActive = tagsArray.includes(label);

  const handleClick = () => {
    let newTagsArray = [...tagsArray];

    if (isActive) {
      newTagsArray = newTagsArray.filter((tag) => tag !== label);
    } else {
      newTagsArray.push(label);
    }

    const newSearchParams = new URLSearchParams();

    newTagsArray.forEach((tag) => newSearchParams.append('tag', tag));
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <button
      type='button'
      className={`flex justify-center items-center text-sm md:text-[16px] gap-1 px-2.5 py-1.5 rounded-3xl ${isActive ? 'bg-secondary text-text-dark dark:bg-blue-600' : 'bg-gray-200 dark:bg-gray-700 dark:text-text-dark'}
      `}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Tag;
