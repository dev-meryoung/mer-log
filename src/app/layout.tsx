import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/Pretendard-Variable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '<meryoung />',
  description: '현재 개발 진행 중인 블로그입니다.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ko' className={pretendard.variable}>
    <body>{children}</body>
  </html>
);

export default RootLayout;
