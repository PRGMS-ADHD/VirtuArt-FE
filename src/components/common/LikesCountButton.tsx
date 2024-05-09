import React, { useState } from 'react';
import { IoMdHeart } from 'react-icons/io';
import formatNumberToK from '@/utils/format';

const LikesCountButton: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      type="button"
      className="flex h-[30px] w-[100px] items-center justify-between bg-black text-white shadow-md"
      onClick={handleClick}
    >
      {isLiked ? (
        <IoMdHeart className="ml-2 h-5 w-5 text-red-500" />
      ) : (
        <IoMdHeart className="ml-2 h-5 w-5 text-white" />
      )}
      <span className="mr-2 font-helvetica text-xs font-normal">
        {formatNumberToK(200000)}
      </span>
    </button>
  );
};

export default LikesCountButton;
