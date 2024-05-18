// import { useState } from 'react';
// import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
// import { AnimatePresence, motion } from 'framer-motion';
// import { apiToggleLike } from '@/api/likes.api';
//
// interface LikesButtonProps {
//   targetType: string;
//   targetId: string;
//   initialLiked: boolean;
//   token: string;
// }
//
// const LikesButton: React.FC<LikesButtonProps> = ({
//   targetType,
//   targetId,
//   initialLiked,
//   token,
// }) => {
//   const [isLiked, setIsLiked] = useState(initialLiked);
//   const [loading, setLoading] = useState(false);
//
//   const toggleLike = async () => {
//     setLoading(true);
//     try {
//       const liked = await apiToggleLike(token, targetType, targetId);
//       setIsLiked(liked);
//     } catch (error) {
//       console.error('Error toggling like:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="flex items-center justify-center">
//       <AnimatePresence>
//         <motion.button
//           className="relative h-[30px] w-[30px]"
//           whileTap={{ scale: 0.9 }}
//           onClick={toggleLike}
//           type="button"
//           disabled={loading}
//         >
//           <AnimatePresence>
//             {isLiked ? (
//               <motion.div
//                 key="like-icon"
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-75"
//               >
//                 <IoMdHeart
//                   className="cursor-pointer text-lg text-red-500"
//                   aria-label="Liked"
//                 />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="unlike-icon"
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-75"
//               >
//                 <IoMdHeartEmpty
//                   className="cursor-pointer text-lg"
//                   aria-label="Like"
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.button>
//       </AnimatePresence>
//     </div>
//   );
// };
//
// export default LikesButton;

import { useState } from 'react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';

interface LikesButtonProps {
  initialLiked: boolean;
  onLikeStatusChange: () => void;
  targetId: string;
  targetType: string;
  token: string | null;
}

const LikesButton: React.FC<LikesButtonProps> = ({
  initialLiked,
  onLikeStatusChange,
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLiked(!isLiked);
    onLikeStatusChange();
  };

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence>
        <motion.button
          className="relative h-[30px] w-[30px]"
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          type="button"
        >
          <AnimatePresence>
            {initialLiked ? (
              <motion.div
                key="like-icon"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-75"
              >
                <IoMdHeart
                  className="cursor-pointer text-lg text-red-500"
                  aria-label="Liked"
                />
              </motion.div>
            ) : (
              <motion.div
                key="unlike-icon"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-75"
              >
                <IoMdHeartEmpty
                  className="cursor-pointer text-lg"
                  aria-label="Like"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default LikesButton;
