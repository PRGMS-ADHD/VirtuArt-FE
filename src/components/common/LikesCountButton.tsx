// import React, { useState } from 'react';
// import { IoMdHeart } from 'react-icons/io';
// import formatNumberToK from '@/utils/format';
//
// const LikesCountButton: React.FC = () => {
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
//         <IoMdHeart className="ml-2 h-5 w-5 text-red-500" />
//       ) : (
//         <IoMdHeart className="ml-2 h-5 w-5 text-white" />
//       )}
//       <span className="mr-2 font-helvetica text-xs font-normal">
//         {formatNumberToK(200000)}
//       </span>
//     </button>
//   );
// };
//
// export default LikesCountButton;
// LikesCountButton.tsx
// import React from 'react';
// import { IoMdHeart } from 'react-icons/io';
// import formatNumberToK from '@/utils/format';
//
// interface LikesCountButtonProps {
//   likes?: number; // 좋아요 수
//   isLiked: boolean; // 좋아요 상태
//   toggleLike: () => void; // 좋아요 토글 함수
// }
//
// const LikesCountButton: React.FC<LikesCountButtonProps> = ({
//   likes = 0,
//   isLiked,
//   toggleLike,
// }) => {
//   return (
//     <button
//       type="button"
//       className="flex h-[30px] w-[100px] items-center justify-between bg-black text-white shadow-md"
//       onClick={toggleLike}
//     >
//       {isLiked ? (
//         <IoMdHeart className="ml-2 h-5 w-5 text-red-500" />
//       ) : (
//         <IoMdHeart className="ml-2 h-5 w-5 text-white" />
//       )}
//       <span className="mr-2 font-helvetica text-xs font-normal">
//         {formatNumberToK(likes)}
//       </span>
//     </button>
//   );
// };
//
// export default LikesCountButton;
// src/components/common/LikesCountButton.tsx
// src/components/common/LikesCountButton.tsx
// src/components/common/LikesCountButton.tsx
// src/components/common/LikesCountButton.tsx
// import React from 'react';
// import { IoMdHeart } from 'react-icons/io';
// import { useAuthStore } from '@/store/authStore';
//
// interface LikesCountButtonProps {
//   likes: number;
//   isLiked: boolean;
//   toggleLike: () => void;
// }
//
// const LikesCountButton: React.FC<LikesCountButtonProps> = ({
//   likes,
//   isLiked,
//   toggleLike,
// }) => {
//   const { isLoggedIn } = useAuthStore();
//
//   const handleClick = () => {
//     if (isLoggedIn) {
//       toggleLike();
//     } else {
//       alert('로그인 후 이용 가능합니다.');
//     }
//   };
//
//   return (
//     <button
//       type="button"
//       className="flex h-[30px] w-[100px] items-center justify-between bg-black text-white shadow-md"
//       onClick={handleClick}
//     >
//       <IoMdHeart
//         className={`ml-2 ${isLiked ? 'text-red-500' : 'text-white'}`}
//       />
//       <span className="mr-2">{likes}</span>
//     </button>
//   );
// };
//
// export default LikesCountButton;

// import React from 'react';
// import { IoMdHeart } from 'react-icons/io';
// import { useAuthStore } from '@/store/authStore';
// import { toggleLike as apiToggleLike } from '../../api/likes.api'; // 이름 변경하여 충돌 방지
//
// interface LikesCountButtonProps {
//   targetId: string;
//   targetType: string;
//   likes: number;
//   isLiked: boolean;
//   onLikeStatusChange: () => void;
// }
//
// const LikesCountButton: React.FC<LikesCountButtonProps> = ({
//   likes,
//   isLiked,
//   targetId,
//   targetType,
//   onLikeStatusChange,
// }) => {
//   const { isLoggedIn, token } = useAuthStore();
//
//   const handleClick = async () => {
//     if (isLoggedIn && token) {
//       try {
//         // API에서 좋아요 상태 토글 시도
//         const isSuccess = await apiToggleLike(token, targetType, targetId);
//         if (isSuccess) {
//           onLikeStatusChange();
//         }
//       } catch (error) {
//         console.error('Failed to toggle like', error);
//       }
//     } else {
//       // 로그인 되어있지 않다면 경고
//       alert('로그인 후 이용 가능합니다.');
//     }
//   };
//
//   return (
//     <button
//       type="button"
//       className="flex h-[30px] w-[100px] items-center justify-between bg-black text-white shadow-md"
//       onClick={handleClick}
//     >
//       <IoMdHeart
//         className={`ml-2 ${isLiked ? 'text-red-500' : 'text-white'}`}
//       />
//       <span className="mr-2">{likes}</span>
//     </button>
//   );
// };
//
// export default LikesCountButton;
// import React from 'react';
// import { IoMdHeart } from 'react-icons/io';
// import { useAuthStore } from '@/store/authStore';
// import { toggleLike } from '../../api/likes.api'; // Import the API function
//
// interface LikesCountButtonProps {
//   targetId: string;
//   targetType: string;
//   likes: number;
//   isLiked: boolean;
//   onLikeStatusChange: () => void; // This function should update parent component state
// }
//
// const LikesCountButton: React.FC<LikesCountButtonProps> = ({
//   likes,
//   isLiked,
//   targetId,
//   targetType,
//   onLikeStatusChange,
// }) => {
//   // const { isLoggedIn, token } = useAuthStore();
//   //
//   // const handleClick = async () => {
//   //   if (isLoggedIn && token) {
//   //     try {
//   //       const isSuccess = await toggleLike(token, targetType, targetId);
//   //       if (isSuccess) {
//   //         onLikeStatusChange();
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to toggle like:', error);
//   //     }
//   //   } else {
//   //     alert('로그인 후 이용 가능합니다.');
//   //   }
//   // };
//
//   return (
//     <button
//       type="button"
//       className="flex h-[30px] w-[100px] items-center justify-between bg-black text-white shadow-md"
//       onClick={onLikeStatusChange}
//     >
//       <IoMdHeart
//         className={`ml-2 h-5 w-5 ${isLiked ? 'text-red-500' : 'text-white'}`}
//       />
//       <span className="mr-2">{likes}</span>
//     </button>
//   );
// };
//
// export default LikesCountButton;
import React from 'react';
import { IoMdHeart } from 'react-icons/io';

interface LikesCountButtonProps {
  likes: number;
  isLiked: boolean;
  onLikeStatusChange: () => void;
}

const LikesCountButton: React.FC<LikesCountButtonProps> = ({
  likes,
  isLiked,
  onLikeStatusChange,
}) => {
  return (
    <button
      type="button"
      className="flex h-[30px] w-[100px] items-center justify-between bg-black text-white shadow-md"
      onClick={onLikeStatusChange}
    >
      <IoMdHeart
        className={`ml-2 h-5 w-5 ${isLiked ? 'text-red-500' : 'text-white'}`}
      />
      <span className="mr-2">{likes}</span>
    </button>
  );
};

export default LikesCountButton;
