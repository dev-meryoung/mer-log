'use client';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <button className='p-2 rounded-xl hover:bg-gray-200' {...props}>
      {icon}
    </button>
  );
};

export default IconButton;
