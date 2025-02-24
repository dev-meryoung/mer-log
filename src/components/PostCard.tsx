import Image from 'next/image';
import { formatDate } from '@/utils/dateUtils';

interface PostCardProps {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  thumbnail,
  date,
}: PostCardProps) => {
  return (
    <div className='group flex w-full h-48 items-center rounded-lg shadow-md bg-white overflow-hidden dark:bg-darkActive'>
      <div className='flex-[2] h-full overflow-hidden'>
        <Image
          src={thumbnail}
          alt={title}
          className='w-full h-full object-cover transition-all duration-500 group-hover:scale-105'
          width={500}
          height={500}
        />
      </div>
      <div className='flex-[4] flex relative flex-col h-full px-10 py-4 gap-2'>
        <h2 className='font-bold text-2xl line-clamp-2 transition-all duration-500 group-hover:text-secondary dark:text-text-dark'>
          {title}
        </h2>
        <p className='line-clamp-2 pt-0.8 text-gray-600 dark:text-gray-300'>
          {description}
        </p>
        <p className='absolute bottom-4 text-sm text-gray-500 dark:text-gray-500'>
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
