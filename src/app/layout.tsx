import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { defaultMetadata } from '@/lib/metadata';

const ibmPlexSansKR = localFont({
  src: '../../public/fonts/IBMPlexSansKR.woff2',
  variable: '--font-ibmPlexSansKR',
});

const recipekorea = localFont({
  src: '../../public/fonts/Recipekorea.ttf',
  variable: '--font-recipekorea',
});

export const generateMetadata = async (): Promise<Metadata> =>
  defaultMetadata({});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const setInitialTheme = `
    (() => {
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
