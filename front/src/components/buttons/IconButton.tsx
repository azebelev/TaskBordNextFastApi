import { useState } from 'react';

export function IconButton({
    children,
    onClick,
    roundedValue,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    roundedValue: string;
  }) {
    const [onProcess, setOnProcess] = useState(false);
    const handleClick = () => {
      setOnProcess(true);
      setTimeout(() => {
        setOnProcess(false);
      }, 500);
      onClick();
    };
  
    return (
      <button
        onClick={handleClick}
        className={`flex rounded-${roundedValue} relative overflow-hidden`}
      >
        {onProcess && (
          <div
            className='animate-ping absolute inset-0 rounded-full bg-indigo-700 opacity-50'
          />
        )}
        {children}
      </button>
    );
  }
  