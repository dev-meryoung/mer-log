import Link from 'next/link';

interface TagProps {
  label: string;
  isActive?: boolean;
  size?: 'sm' | 'md';
}

const Tag: React.FC<TagProps> = ({ label, isActive = false, size = 'md' }) => {
  const href = isActive ? '/' : `/tags/${label}`;

  const sizeClasses =
    size === 'sm'
      ? 'text-sm px-2.5 py-1'
      : 'text-sm md:text-[16px] px-2.5 py-1.5';

  return (
    <Link
      href={href}
      className={`flex justify-center items-center gap-1 rounded-3xl ${sizeClasses} ${
        isActive
          ? 'bg-secondary text-text-dark dark:bg-blue-700'
          : 'bg-gray-200 dark:bg-gray-600 dark:text-text-dark'
      }`}
    >
      {label}
    </Link>
  );
};

export default Tag;
