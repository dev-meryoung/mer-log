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
}) => (
  <div className='group flex flex-col md:flex-row w-full rounded-lg shadow-md bg-white overflow-hidden dark:bg-darkActive'>
    <div className='relative w-full md:w-1/3 overflow-hidden'>
      <Image
        src={thumbnail}
        alt={title}
        className='w-full h-full object-cover transition-all duration-500 group-hover:scale-105'
        width={500}
        height={500}
      />
    </div>
    <div className='relative flex flex-col w-full min-h-[164] md:min-h-[180] md:w-2/3 lg:min-h-[220] lg:w-2/3 p-4 md:px-8 md:py-4 lg:py-6 gap-2'>
      <h2 className='font-bold text-lg md:text-xl lg:text-2xl line-clamp-2 group-hover:text-secondary dark:text-text-dark'>
        {title}
      </h2>
      <p className='line-clamp-2 text-sm md:text-base text-gray-600 dark:text-gray-300'>
        {description}
      </p>
      <p className='text-xs absolute bottom-4 md:text-sm text-gray-500 dark:text-gray-500'>
        {formatDate(date)}
      </p>
    </div>
  </div>
);

export default PostCard;
