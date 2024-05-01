import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
  isExpanded: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  style,
  isExpanded,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        width: '40px',
        height: '36px',
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        border: '1px solid #DDD',
        ...style,
      }}
    >
      <ChevronDoubleDownIcon
        className={`h-5 w-5 ${isExpanded ? 'rotate-180 transform' : ''}`}
        fill="#777"
        strokeWidth={1}
      />
    </button>
  );
};

export default LoadMoreButton;
