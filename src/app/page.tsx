import PostCard from '@/components/PostCard';
import Tag from '@/components/Tag';

const Home = () => {
  const tempTags = [
    { label: 'JavaScript', active: true },
    { label: 'TypeScript', active: false },
    { label: 'React', active: true },
    { label: 'Next.js', active: false },
    { label: 'Node.js', active: true },
    { label: 'Express', active: false },
    { label: 'MongoDB', active: false },
    { label: 'GraphQL', active: true },
    { label: 'Tailwind CSS', active: false },
    { label: 'CSS', active: false },
    { label: 'HTML', active: true },
    { label: 'Redux', active: false },
    { label: 'Zustand', active: false },
    { label: 'Vite', active: true },
    { label: 'Webpack', active: false },
    { label: 'Bun', active: false },
    { label: 'Jest', active: true },
    { label: 'Testing Library', active: false },
    { label: 'Cypress', active: false },
    { label: 'Storybook', active: true },
  ];

  const tempPosts = [
    {
      title:
        'Next.js 시작하기 Next.js 시작하기 Next.js 시작하기 Next.js 시작하기 Next.js 시작하기 Next.js 시작하기',
      description:
        'Next.js의 기본 개념과 설치 방법을 알아봅니다. 길이가 길어질 경우에는 이렇습니다. 길이가 길어질 경우에는 이렇습니다. 길이가 길어질 경우에는 이렇습니다. 길이가 길어질 경우에는 이렇습니다. 길이가 길어질 경우에는 이렇습니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-19',
    },
    {
      title: 'React와 상태 관리',
      description: 'React에서 상태를 관리하는 다양한 방법을 비교합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-18',
    },
    {
      title: 'TypeScript 기초 문법',
      description: 'TypeScript의 기본적인 문법과 사용법을 배워봅니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-17',
    },
    {
      title: 'Tailwind CSS 완벽 가이드',
      description: 'Tailwind CSS를 활용하여 반응형 디자인을 구현하는 방법.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-16',
    },
    {
      title: 'Next.js API Routes 사용법',
      description: 'Next.js에서 API를 생성하고 활용하는 방법을 소개합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-15',
    },
    {
      title: 'React Server Components',
      description: 'React Server Components의 개념과 활용법을 다룹니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-14',
    },
    {
      title: 'Vercel로 배포하기',
      description: 'Next.js 프로젝트를 Vercel에 배포하는 방법을 설명합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-13',
    },
    {
      title: 'ESLint & Prettier 설정',
      description: 'ESLint와 Prettier를 설정하여 코드 스타일을 통일합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-12',
    },
    {
      title: 'React Query를 활용한 데이터 관리',
      description: 'React Query를 사용하여 데이터를 효율적으로 관리하는 법.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-11',
    },
    {
      title: 'Zustand 상태 관리 라이브러리',
      description: 'Zustand를 활용한 상태 관리 방법을 소개합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-10',
    },
    {
      title: 'Jest & React Testing Library',
      description: 'Jest와 React Testing Library를 활용한 테스트 작성법.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-09',
    },
    {
      title: 'NextAuth로 인증 구현',
      description: 'NextAuth를 이용한 OAuth 인증 구현 방법을 알아봅니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-08',
    },
    {
      title: 'GraphQL과 Apollo Client',
      description: 'GraphQL과 Apollo Client를 활용한 데이터 가져오기.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-07',
    },
    {
      title: 'React Hook Form 기본 사용법',
      description: 'React Hook Form을 활용한 폼 관리 방법을 설명합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-06',
    },
    {
      title: 'Storybook을 활용한 UI 개발',
      description:
        'Storybook을 사용하여 UI 컴포넌트를 독립적으로 개발하는 방법.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-05',
    },
    {
      title: 'Cypress로 E2E 테스트 하기',
      description:
        'Cypress를 사용하여 E2E 테스트를 수행하는 방법을 배워봅니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-04',
    },
    {
      title: 'Turbopack으로 빌드 속도 개선',
      description: 'Next.js의 Turbopack을 활용하여 빌드 속도를 개선하는 방법.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-03',
    },
    {
      title: 'Webpack과 Vite 비교',
      description: 'Webpack과 Vite의 차이점과 성능을 비교 분석합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-02',
    },
    {
      title: 'React 18의 새로운 기능',
      description: 'React 18에서 추가된 주요 기능들을 정리합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-02-01',
    },
    {
      title: 'Next.js 15 새로운 기능',
      description: 'Next.js 15에서 추가된 주요 기능을 정리합니다.',
      thumbnail: '/posts/first-post/0.png',
      date: '2024-01-31',
    },
  ];

  return (
    <div className='w-full px-2 select-none'>
      <div className='py-6'>
        <h1 className='inline font-recipekorea text-3xl font-bold transition-all duration-300 ease-in-out hover:text-secondary'>
          TAGS
        </h1>
        <div className='flex my-4 p-4 gap-2 flex-wrap bg-white rounded-lg'>
          {tempTags.map((tag, index) => {
            return <Tag key={index} label={tag.label} active={tag.active} />;
          })}
        </div>
      </div>
      <div className='py-6'>
        <h1 className='font-recipekorea text-3xl font-bold transition-all duration-300 ease-in-out hover:text-secondary'>
          POSTS
        </h1>
        <div className='flex py-4 gap-8 flex-wrap'>
          {tempPosts.map((post, index) => {
            return (
              <PostCard
                key={index}
                title={post.title}
                description={post.description}
                thumbnail={post.thumbnail}
                date={post.date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
