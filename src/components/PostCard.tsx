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
    <div className='group flex w-full h-40 items-center gap-8 hover:cursor-pointer'>
      <div className='flex-[1.5] h-full overflow-hidden rounded-lg'>
        <img
          src={thumbnail}
          alt={title}
          className='w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:scale-105'
        />
      </div>
      <div className='flex-[3.5] flex flex-col h-full p-2 gap-2'>
        <h2 className='font-bold text-2xl line-clamp-2 transition-all duration-500 group-hover:text-secondary'>
          {title}
        </h2>
        <p className='line-clamp-2'>{description}</p>
        <p className='text-sm text-gray-500'>{date}</p>
      </div>
    </div>
  );
};

export default PostCard;
