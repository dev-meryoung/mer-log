'use client';

import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | undefined>(undefined);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme as 'light' | 'dark');
        document.documentElement.classList.toggle(
          'dark',
          storedTheme === 'dark'
        );
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        const initTheme = prefersDark ? 'dark' : 'light';
        setTheme(initTheme);
        document.documentElement.classList.toggle('dark', initTheme === 'dark');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      type='button'
      className='p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-darkActive'
      onClick={toggleTheme}
      aria-label='테마 전환'
    >
      {theme === 'dark' ? (
        <SunIcon className='h-5 w-5 text-text-dark' />
      ) : (
        <MoonIcon className='h-5 w-5' />
      )}
    </button>
  );
};

export default ThemeToggleButton;
