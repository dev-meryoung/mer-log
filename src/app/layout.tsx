import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const pretendard = localFont({
  src: '../../public/fonts/Pretendard-Variable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'mer-log | 기술 블로그',
  description: '현재 구현 진행 중인 기술 블로그입니다.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ko' className={pretendard.variable}>
    <body>
      <Header />
      <main className='flex-1 container mx-auto p-4'>{children}</main>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
