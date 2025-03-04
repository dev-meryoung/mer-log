import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const ibmPlexSansKR = localFont({
  src: '../../public/fonts/IBMPlexSansKR.woff2',
  variable: '--font-ibmPlexSansKR',
});

const recipekorea = localFont({
  src: '../../public/fonts/Recipekorea.ttf',
  variable: '--font-recipekorea',
});

export const metadata: Metadata = {
  title: 'mer-log | 기술 블로그',
  description: '현재 구현 진행 중인 기술 블로그입니다.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const setInitialTheme = `
    (function() {
      try {
        const theme = localStorage.getItem('theme');

        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      } catch (e) {}
    })();
  `;

  return (
    <html
      lang='ko'
      className={`${ibmPlexSansKR.variable} ${recipekorea.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        <meta
          name='google-site-verification'
          content='2HAw1C-cpAskXgHSDXNzfvo_ZcGuEyEC4DAqCATGaUw'
        />
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body className='dark:bg-background-dark'>
        <Header />
        <main className='container flex-1 mx-auto p-4 mt-16'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
