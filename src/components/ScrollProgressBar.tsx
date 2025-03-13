import { useEffect, useState } from 'react';

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

    setProgress(scrolled);
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener('scroll', updateProgress);

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className='absolute top-0 left-0 w-full h-1 bg-gray-200'>
      <div
        className='h-full bg-secondary dark:bg-blue-600'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
