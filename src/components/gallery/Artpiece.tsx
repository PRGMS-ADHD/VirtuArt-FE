import React, { useState, useEffect } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ArtPieceCategory } from '@/data/artPieceCategories';
import { fetchAllArtWorks } from '@/api/images.api';
import { ArtworkModel } from '@/models/artwork.model';
import LikesButton from '../image/LikesButton';
import ImageTooltip from './ImageTooltip';
import { apiToggleLike } from '../../api/likes.api';

interface ArtpieceProps {
  category: {
    id: number;
    name: string;
  };
}

const Artpiece: React.FC<ArtpieceProps> = ({ category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [likedArtWorks, setLikedArtWorks] = useState<{
    [key: string]: boolean;
  }>({});
  const [artWorks, setArtWorks] = useState<ArtworkModel[]>([]);
  const filteredArtWorks = artWorks.filter(
    (artWork) => artWork.category === category.id,
  );
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchArtPieces = async () => {
      const data = await fetchAllArtWorks(); // fetchAllArtWorks 함수를 호출하여 작품 데이터를 가져옴
      setArtWorks(data); // 가져온 데이터를 상태로 설정
    };

    fetchArtPieces();
  }, []);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % filteredArtWorks.length);
  };

  const handleMouseEnter = (id: string) => {
    setShowTooltip(true);
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleLikeStatusChange = async (id: string) => {
    try {
      const updatedLikeStatus = await apiToggleLike(token, 'artWork', id);
      setLikedArtWorks((prevState) => ({
        ...prevState,
        [id]: updatedLikeStatus,
      }));
    } catch (error) {
      console.error('Failed to update like status:', error);
    }
  };

  const isEvenCategory =
    ArtPieceCategory.findIndex((cat) => cat.name === category.name) % 2 === 0;
  const bgClass = isEvenCategory ? 'bg-gray-100' : '';

  if (filteredArtWorks.length === 0) {
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
          {filteredArtWorks
            .slice(currentIndex, currentIndex + 4)
            .map((artWork) => (
              <div
                key={artWork._id}
                style={{ position: 'relative' }}
                onMouseEnter={() => handleMouseEnter(artWork._id.toString())}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={`/artworks/${artWork._id}`}>
                  <div style={{ width: 376, height: 211, overflow: 'hidden' }}>
                    <img
                      src={artWork.image}
                      alt={artWork.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </Link>
                <div className="absolute right-0 top-0 p-3 px-4">
                  {/*<LikesButton*/}
                  {/*  targetType="artWork"*/}
                  {/*  targetId={artWork._id.toString()}*/}
                  {/*  initialLiked={isLiked(artWork._id.toString())}*/}
                  {/*  token={token}*/}
                  {/*/>*/}
                  <LikesButton
                    targetType="artWork"
                    targetId={artWork._id.toString()}
                    initialLiked={likedArtWorks[artWork._id]}
                    token={token}
                    onLikeStatusChange={() =>
                      handleLikeStatusChange(artWork._id)
                    }
                  />
                </div>
                {showTooltip && hoveredImageId === artWork._id && (
                  <ImageTooltip title={artWork.name} artist={artWork.artist} />
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
