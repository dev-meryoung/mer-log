'use client';

interface TagProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ label, isActive, onClick }) => (
  <button
    type='button'
    className={`flex justify-center items-center text-sm md:text-[16px] gap-1 px-2.5 py-1.5 rounded-3xl ${
      isActive
        ? 'bg-secondary text-text-dark dark:bg-blue-700'
        : 'bg-gray-200 dark:bg-gray-700 dark:text-text-dark'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Tag;
