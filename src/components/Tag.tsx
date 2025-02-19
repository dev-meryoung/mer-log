'use client';

import { XMarkIcon } from '@heroicons/react/16/solid';

interface TagProps extends React.HTMLProps<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

const Tag: React.FC<TagProps> = ({ label, active }: TagProps) => {
  return (
    <button
      type='button'
      className={`flex justify-center items-center gap-1 px-2.5 py-1.5 font-bold border border-secondary rounded-3xl transition-all duration-300 ease-in-out
        ${active ? 'bg-secondary text-white hover:bg-white hover:text-secondary' : 'text-secondary hover:bg-secondary hover:text-white'}
      `}
    >
      {label}
      {active ? <XMarkIcon className='w-5 h-5' /> : ''}
    </button>
  );
};

export default Tag;
