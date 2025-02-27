'use client';

import { useEffect, useState } from 'react';

const Comments = () => {
  const getInitialTheme = () =>
    typeof window !== 'undefined' &&
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');

      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe.giscus-frame'
      );

      if (iframe) {
        iframe.contentWindow?.postMessage(
          { giscus: { setConfig: { theme: isDark ? 'dark' : 'light' } } },
          'https://giscus.app'
        );
      }
    };

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    checkTheme();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (document.querySelector('script#giscus-script')) return;

    const script = document.createElement('script');

    script.id = 'giscus-script';
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'dev-meryoung/mer-log');
    script.setAttribute('data-repo-id', 'R_kgDON6ue9Q');
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-category-id', 'DIC_kwDON6ue9c4YnYFV');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-theme', theme);
    script.crossOrigin = 'anonymous';
    script.async = true;

    document.getElementById('giscus')?.appendChild(script);
  }, [theme]);

  return (
    <div
      id='giscus'
      className='w-full mx-auto p-10 rounded-lg bg-white shadow-md dark:bg-darkActive mt-4'
    />
  );
};

export default Comments;
