// import React, { useState } from 'react';
// import { IoMdHeart } from 'react-icons/io';
//
// const LikesButton: React.FC = () => {
//   const [isLiked, setIsLiked] = useState(false);
//
//   const handleClick = () => {
//     setIsLiked(!isLiked);
//   };
//
//   return (
//     <button
//       type="button"
//       className="flex h-[30px] w-[100px] items-center justify-between bg-black text-white shadow-md"
//       onClick={handleClick}
//     >
//       {isLiked ? (
//         <IoMdHeart className="ml-4 h-5 w-5 text-red-500" />
//       ) : (
//         <IoMdHeart className="ml-4 h-5 w-5 text-white" />
//       )}
//       <span className="mr-4 font-helvetica text-xs font-normal">LIKES</span>
//     </button>
//   );
// };
//
// export default LikesButton;
import React from 'react';
import { IoMdHeart } from 'react-icons/io';

interface LikesButtonProps {
  token: string;
  targetType: string;
  targetId: string;
  isLiked: boolean;
  onToggleLike: () => void;
}


const LikesButton: React.FC<LikesButtonProps> = ({ isLiked, onToggleLike }) => {
  return (
    <button
      type="button"
      className="flex h-[30px] w-[100px] items-center justify-between bg-black text-white shadow-md"
      onClick={onToggleLike}
    >
      {isLiked ? (
        <IoMdHeart className="ml-4 h-5 w-5 text-red-500" />
      ) : (
        <IoMdHeart className="ml-4 h-5 w-5 text-white" />
      )}
      <span className="mr-4 font-helvetica text-xs font-normal">LIKES</span>
    </button>
  );
};

export default LikesButton;
