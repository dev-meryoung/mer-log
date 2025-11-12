'use client';

import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useTheme } from 'next-themes';

const ThemeToggleButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  const toggleTheme = () => {
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <button
      type='button'
      className='p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-darkActive'
      onClick={toggleTheme}
      aria-label='테마 전환'
    >
      {isMounted && currentTheme === 'dark' ? (
        <SunIcon className='h-5 w-5 text-text-dark' />
      ) : (
        <MoonIcon className='h-5 w-5' />
      )}
    </button>
  );
};

export default ThemeToggleButton;
