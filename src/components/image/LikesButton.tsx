import { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';

const LikesButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-[30px] w-[30px]">
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-75">
          {isLiked ? (
            <IoMdHeart
              onClick={handleLike}
              className="cursor-pointer text-lg text-black"
            />
          ) : (
            <IoMdHeartEmpty
              onClick={handleLike}
              className="cursor-pointer text-lg text-black"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LikesButton;
