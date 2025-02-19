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

  return (
    <div className='w-full px-4 select-none'>
      <div className='py-6'>
        <h1 className='inline font-recipekorea text-3xl font-bold hover:text-primary'>
          TAGS
        </h1>
        <div className='flex py-4 gap-2 flex-wrap'>
          {tempTags.map((tag, index) => {
            return <Tag key={index} label={tag.label} active={tag.active} />;
          })}
        </div>
      </div>
      <div className='py-6'>
        <h1 className='font-recipekorea text-3xl font-bold hover:text-primary'>
          POSTS
        </h1>
      </div>
    </div>
  );
};

export default Home;
