import { useState, useEffect, ReactNode, useRef } from 'react';

interface TransitionWrapperProps {
  children: ReactNode;
  isPending?: boolean;
}

const TransitionWrapper = ({
  children,
  isPending = false,
}: TransitionWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    frameId.current = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  const baseClasses = 'transition-opacity duration-300 ease-in-out';
  const mountedClasses = isMounted ? 'opacity-100' : 'opacity-0';
  const pendingClasses = isPending ? 'opacity-50 pointer-events-none' : '';

  return (
    <div className={`${baseClasses} ${mountedClasses} ${pendingClasses}`}>
      {children}
    </div>
  );
};

export default TransitionWrapper;
