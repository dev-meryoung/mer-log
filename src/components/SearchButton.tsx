'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => (
  <button
    type='button'
    className='p-2 rounded-xl hover:bg-gray-200 dark:text-text-dark dark:bg-background-dark dark:hover:bg-darkActive'
    aria-label='검색'
    onClick={onClick}
  >
    <MagnifyingGlassIcon className='h-5 w-5' strokeWidth={2.5} />
  </button>
);

export default SearchButton;
