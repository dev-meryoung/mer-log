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
  return (
    <html
      lang='ko'
      className={`${ibmPlexSansKR.variable} ${recipekorea.variable}`}
    >
      <body>
        <Header />
        <main className='container flex-1 mx-auto p-4 mt-16'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
