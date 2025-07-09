'use client';

import { useCallback, useEffect, useState } from 'react';

interface IndexNavigationProps {
  headings: { id: string; text: string; level: number }[];
}

const IndexNavigation = ({ headings }: IndexNavigationProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const HEADER_OFFSET = 70;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const position =
        element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setActiveId(headings[headings.length - 1]?.id || null);

      return;
    }

    const scrollPosition = window.scrollY;
    let closestId: string | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (element) {
        const elementTop =
          element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        const distance = Math.abs(scrollPosition - elementTop);

        if (distance < closestDistance && elementTop < scrollPosition + 4) {
          closestDistance = distance;
          closestId = id;
        }
      }
    });

    setActiveId(closestId);
  }, [headings]);

  useEffect(() => {
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (!element) {
        return;
      }

      element.id = id;
    });
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const [showNav, setShowNav] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setShowNav(window.innerWidth >= 1620);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!showNav || headings.length === 0) {
    return null;
  }

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav className='absolute left-[968px] top-0 h-full'>
      <div className='sticky top-20 min-w-[284px] p-4 bg-white dark:bg-darkActive shadow-md rounded-lg'>
        <ul className='space-y-2'>
          {headings.map((heading) => {
            const indentLevel = heading.level - minLevel;
            const indentClass =
              indentLevel === 0 ? 'pl-0' : indentLevel === 1 ? 'pl-2' : 'pl-4';

            return (
              <li key={heading.id} className={indentClass}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`text-left w-full ${
                    activeId === heading.id
                      ? 'text-secondary font-bold dark:text-blue-700'
                      : 'text-gray-700 dark:text-text-dark'
                  } hover:underline`}
                >
                  {heading.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default IndexNavigation;
