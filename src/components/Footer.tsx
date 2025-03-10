const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full h-16 flex items-center justify-center border-t border-gray-200 text-sm select-none dark:text-text-dark dark:border-darkActive'>
      &copy; {currentYear}. meryoung All rights reserved.
    </footer>
  );
};

export default Footer;
