import React from 'react';
import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid';

interface LoadMoreButtonProps {
  onClick: () => void;
  isExpanded: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  isExpanded,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative m-auto flex h-[36px] w-[40px] translate-y-1/2 items-center justify-center rounded-[50%] border border-customGray6 bg-white duration-300"
    >
      <ChevronDoubleDownIcon
        className={`h-5 w-5 ${isExpanded ? 'rotate-180' : ''}`}
        fill="#777"
        strokeWidth={1}
      />
    </button>
  );
};

export default LoadMoreButton;
