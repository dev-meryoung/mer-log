'use client';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => (
  <button
    type='button'
    className='p-2 rounded-xl hover:bg-gray-200 dark:text-text-dark dark:bg-background-dark hover:dark:bg-darkActive'
    {...props}
  >
    {icon}
  </button>
);

export default IconButton;
