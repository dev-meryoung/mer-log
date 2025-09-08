'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isModalOpen, onClose }) => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
      inputRef.current?.focus();
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      setKeyword('');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    inputRef.current?.blur();

    if (!keyword.trim()) {
      return;
    }

    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    setKeyword('');
    onClose();
  };

  return (
    <div
      className={`fixed flex justify-center inset-0 z-50 bg-background-light dark:bg-background-dark transition-opacity duration-300 ease-in-out ${
        isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`w-full max-w-3xl mx-auto transition-transform duration-500 ease-in-out ${
          isModalOpen ? 'transform-none' : '-translate-y-10'
        }`}
      >
        <div className='relative flex justify-center items-center h-16 select-none'>
          <Image
            src='/images/logo-light.svg'
            alt='logo'
            width={150}
            height={100}
            className='w-[150px] h-[50px] block dark:hidden'
            draggable={false}
            priority
          />
          <Image
            src='/images/logo-dark.svg'
            alt='dark logo'
            width={150}
            height={100}
            className='w-[150px] h-[50px] hidden dark:block'
            draggable={false}
            priority
          />
          <button
            type='button'
            className='absolute right-4 p-2 rounded-xl hover:bg-gray-200 dark:text-text-dark dark:bg-background-dark dark:hover:bg-darkActive'
            aria-label='닫기'
            onClick={onClose}
          >
            <XMarkIcon className='h-5 w-5' strokeWidth={2.5} />
          </button>
        </div>
        <form
          className='flex relative justify-center items-center w-full h-12 mt-2 px-4'
          onSubmit={handleSearch}
        >
          <input
            ref={inputRef}
            type='text'
            className='w-full max-w-3xl h-full pl-4 pr-10 shadow-md bg-white rounded-lg dark:text-text-dark dark:bg-darkActive outline-none focus:outline-primary dark:focus:outline-background-light'
            placeholder='검색어를 입력해 주세요.'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type='submit'
            className='absolute right-5 p-2 dark:text-text-dark'
            aria-label='검색'
          >
            <MagnifyingGlassIcon className='h-5 w-5' strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
