import React from 'react';
import { HeartIcon } from '@heroicons/react/20/solid';

interface SettingsButtonProps {
  onClick?: () => void;
}

const LikesButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="relative flex h-[30px] w-[100px] items-center justify-around shadow-md"
      onClick={onClick}
    >
      <div className="absolute left-0 top-0 h-[30px] w-[100px] bg-black" />
      <HeartIcon className="z-10 h-5 w-5 text-white" />
      <div className="z-10 ml-1 font-['Helvetica'] text-xs font-normal text-white">
        1234 K
      </div>
    </button>
  );
};

export default LikesButton;
