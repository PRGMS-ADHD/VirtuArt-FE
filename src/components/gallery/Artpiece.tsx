// import React, { useState } from 'react';
// import { MdNavigateNext } from 'react-icons/md';
// import { Link } from 'react-router-dom';
// import { ArtPieceCategory } from '@/data/artPieceCategories';
// import { ArtPieces } from '../../data/artPieces';
// import LikesButton from '../image/LikesButton';
// import ImageTooltip from './ImageTooltip';
//
// interface ArtpieceProps {
//   category: {
//     id: number;
//     name: string;
//   };
// }
//
// const Artpiece: React.FC<ArtpieceProps> = ({ category }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [tooltipContent, setTooltipContent] = useState({
//     title: '',
//     description: '',
//     artist: '',
//   });
//
//   const categoryArtPieces = ArtPieces.filter(
//     (artpiece) => artpiece.category === category.name,
//   );
//
//   const handleNext = () => {
//     setCurrentIndex((currentIndex + 1) % categoryArtPieces.length);
//   };
//
//   const handleMouseEnter = (
//     id: string,
//     title: string,
//     description: string,
//     artist: string,
//   ) => {
//     setTooltipContent({ title, description, artist });
//     setShowTooltip(true);
//     setHoveredImageId(id);
//   };
//
//   const handleMouseLeave = () => {
//     setShowTooltip(false);
//   };
//
//   const isEvenCategory =
//     ArtPieceCategory.findIndex((cat) => cat.name === category.name) % 2 === 0;
//   const bgClass = isEvenCategory ? 'bg-gray-100' : '';
//
//   // 카테고리에 해당하는 그림이 없으면 null을 반환하여 렌더링하지 않음
//   if (categoryArtPieces.length === 0) {
//     return null;
//   }
//
//   return (
//     <div
//       className={`relative w-full pb-16 pt-12 ${bgClass}`}
//       style={{ width: '100vw' }}
//     >
//       <div className="flex justify-center">
//         <div className="relative grid grid-cols-4 gap-4">
//           {/* 카테고리 제목을 고정된 위치에 배치 */}
//           <div className="col-span-4">
//             <h2 className="text-left font-noto-sans-kr text-xl font-medium">{category.name}</h2>
//           </div>
//           {categoryArtPieces
//             .slice(currentIndex, currentIndex + 4)
//             .map((artpiece) => (
//               <div
//                 key={artpiece.id}
//                 style={{ position: 'relative' }}
//                 onMouseEnter={() =>
//                   handleMouseEnter(
//                     artpiece.id.toString(),
//                     artpiece.title,
//                     artpiece.description,
//                     artpiece.artist,
//                   )
//                 }
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <Link to={`/artpiece/${artpiece.id}`}>
//                   <img
//                     src={artpiece.imageUrl}
//                     alt={artpiece.title}
//                     width={376}
//                     height={211}
//                   />
//                 </Link>
//                 <div className="absolute right-0 top-0 p-3 px-4">
//                   <LikesButton />
//                 </div>
//                 {showTooltip && hoveredImageId === artpiece.id.toString() && (
//                   <ImageTooltip
//                     title={tooltipContent.title}
//                     artist={tooltipContent.artist}
//                   />
//                 )}
//               </div>
//             ))}
//           {/* 버튼을 그리드 컨테이너의 오른쪽 끝에 고정 */}
//           <button
//             type="button"
//             onClick={handleNext}
//             className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
//             style={{
//               right: '-15px',
//               top: '55%',
//               transform: 'translateY(-50%)',
//             }} // 위치 조정
//           >
//             <MdNavigateNext className="text-lg" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Artpiece;

import React, { useState, useEffect } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ArtPieceCategory } from '@/data/artPieceCategories';
import axios from 'axios';
import { ArtPieces } from '../../data/artPieces';
import LikesButton from '../image/LikesButton';
import ImageTooltip from './ImageTooltip';

interface ArtpieceProps {
  category: {
    id: number;
    name: string;
  };
  token: string;
}

const Artpiece: React.FC<ArtpieceProps> = ({ category, token }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({
    title: '',
    description: '',
    artist: '',
  });
  const [likedArtPieces, setLikedArtPieces] = useState<{
    [key: string]: boolean;
  }>({});

  const categoryArtPieces = ArtPieces.filter(
    (artpiece) => artpiece.category === category.name,
  );

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/likes/user/artpieces',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );
        const likedData = response.data;
        const likedStatus: { [key: string]: boolean } = {};
        likedData.forEach((item: { artpieceId: string }) => {
          likedStatus[item.artpieceId] = true;
        });
        setLikedArtPieces(likedStatus);
      } catch (error) {
        console.error('Error fetching liked status:', error);
      }
    };

    fetchLikedStatus();
  }, [category.name, token]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % categoryArtPieces.length);
  };

  const handleMouseEnter = (
    id: string,
    title: string,
    description: string,
    artist: string,
  ) => {
    setTooltipContent({ title, description, artist });
    setShowTooltip(true);
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const isEvenCategory =
    ArtPieceCategory.findIndex((cat) => cat.name === category.name) % 2 === 0;
  const bgClass = isEvenCategory ? 'bg-gray-100' : '';

  // 카테고리에 해당하는 그림이 없으면 null을 반환하여 렌더링하지 않음
  if (categoryArtPieces.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full pb-16 pt-12 ${bgClass}`}
      style={{ width: '100vw' }}
    >
      <div className="flex justify-center">
        <div className="relative grid grid-cols-4 gap-4">
          {/* 카테고리 제목을 고정된 위치에 배치 */}
          <div className="col-span-4">
            <h2 className="text-left font-noto-sans-kr text-xl font-medium">
              {category.name}
            </h2>
          </div>
          {categoryArtPieces
            .slice(currentIndex, currentIndex + 4)
            .map((artpiece) => (
              <div
                key={artpiece.id}
                style={{ position: 'relative' }}
                onMouseEnter={() =>
                  handleMouseEnter(
                    artpiece.id.toString(),
                    artpiece.title,
                    artpiece.description,
                    artpiece.artist,
                  )
                }
                onMouseLeave={handleMouseLeave}
              >
                <Link to={`/artpiece/${artpiece.id}`}>
                  <img
                    src={artpiece.imageUrl}
                    alt={artpiece.title}
                    width={376}
                    height={211}
                  />
                </Link>
                <div className="absolute right-0 top-0 p-3 px-4">
                  <LikesButton
                    targetType="artpiece"
                    targetId={artpiece.id.toString()}
                    initialLiked={!!likedArtPieces[artpiece.id]}
                    token={token}
                  />
                </div>
                {showTooltip && hoveredImageId === artpiece.id.toString() && (
                  <ImageTooltip
                    title={tooltipContent.title}
                    artist={tooltipContent.artist}
                  />
                )}
              </div>
            ))}
          {/* 버튼을 그리드 컨테이너의 오른쪽 끝에 고정 */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
            style={{
              right: '-15px',
              top: '55%',
              transform: 'translateY(-50%)',
            }} // 위치 조정
          >
            <MdNavigateNext className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artpiece;
