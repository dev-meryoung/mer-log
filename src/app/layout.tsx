import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';
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
}>) => (
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
    </head>
    <body className='dark:bg-background-dark'>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem={true}
        enableColorScheme={true}
      >
        <Header />
        <main className='container flex-1 mx-auto p-4 mt-16'>{children}</main>
        <Footer />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
