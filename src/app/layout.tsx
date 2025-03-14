import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { defaultMetadata } from '@/lib/metadata';

const suit = localFont({
  src: '../../public/fonts/Suit.woff2',
  variable: '--font-suit',
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
    let theme;
    
    try {
      theme = localStorage.getItem('theme');
    } catch (e) {
      return;
    }

    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
  `;

  return (
    <html
      lang='ko'
      className={`${suit.variable} ${recipekorea.variable}`}
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
