import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Head from 'next/head';
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: 'mer-log',
      template: '%s | mer-log',
    },
    description: '웹 프론트엔드 개발자 meryoung의 기술 블로그, mer-log입니다.',
    keywords: [
      '웹 개발',
      '프론트엔드',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Web',
      'Frontend',
    ],
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: 'https://www.merlog.kr',
      siteName: 'mer-log',
      images: [
        {
          url: 'https://www.merlog.kr/images/thumbnail.png',
          width: 1200,
          height: 630,
          alt: 'thumbnail',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@mer-log',
      creator: '@meryoung',
      images: ['https://www.merlog.kr/images/thumbnail.png'],
    },
    robots: 'index, follow',
    alternates: {
      canonical: 'https://www.merlog.kr',
    },
  };
}

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
      <Head>
        <meta
          name='google-site-verification'
          content='2HAw1C-cpAskXgHSDXNzfvo_ZcGuEyEC4DAqCATGaUw'
        />
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </Head>
      <body className='dark:bg-background-dark'>
        <Header />
        <main className='container flex-1 mx-auto p-4 mt-16'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
