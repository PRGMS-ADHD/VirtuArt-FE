import React, { useState, useEffect } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ArtPieceCategory } from '@/data/artPieceCategories';
import { fetchAllArtWorks } from '@/api/images.api';
import { ArtworkModel } from '@/models/artwork.model';
import { useAuthStore } from '@/store/authStore';
import LikesButton from '../image/LikesButton';
import ImageTooltip from './ImageTooltip';
import { apiToggleLike, fetchUserLikedArtworks } from '../../api/likes.api';

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
  const [likedArtWorks, setLikedArtWorks] = useState<string[]>([]);
  const [artWorks, setArtWorks] = useState<ArtworkModel[]>([]);
  const token = localStorage.getItem('token');

  const { isLoggedOut } = useAuthStore(); // 로그아웃 상태

  useEffect(() => {
    if (isLoggedOut) {
      setLikedArtWorks([]); // 로그아웃 상태가 true이면 좋아요 상태를 초기화
    }
  }, [isLoggedOut]);

  useEffect(() => {
    const fetchArtPieces = async () => {
      const data = await fetchAllArtWorks(); // fetchAllArtWorks 함수를 호출하여 작품 데이터를 가져옴
      setArtWorks(data); // 가져온 데이터를 상태로 설정
    };

    fetchArtPieces();
  }, []);

  useEffect(() => {
    const fetchLikedArtworks = async () => {
      if (token) {
        try {
          const likedArtworks = await fetchUserLikedArtworks(token);
          setLikedArtWorks(
            likedArtworks.map((artwork: ArtworkModel) => artwork._id),
          ); // 모델 확인
        } catch (error) {
          console.error('Error fetching liked artworks:', error);
        }
      }
    };
    fetchLikedArtworks();
  }, [token]);

  const filteredArtWorks = artWorks.filter(
    (artWork) => artWork.category === category.id.toString(),
  );

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % filteredArtWorks.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (currentIndex - 1 + filteredArtWorks.length) % filteredArtWorks.length,
    );
  };

  const handleMouseEnter = (id: string) => {
    setShowTooltip(true);
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleLikeStatusChange = async (id: string) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const updatedLikeStatus = await apiToggleLike(token, 'artwork', id);
      if (updatedLikeStatus) {
        setLikedArtWorks((prevState) => [...prevState, id]);
      } else {
        setLikedArtWorks((prevState) =>
          prevState.filter((artworkId) => artworkId !== id),
        );
      }
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
    <div className={`relative w-screen pb-12 pt-5 ${bgClass}`}>
      <div className="container mx-auto px-1">
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {/* 카테고리 제목을 고정된 위치에 배치 */}
          <div className="col-span-full mb-4">
            <h2 className="text-left font-noto-sans-kr text-xl font-medium">
              {category.name}
            </h2>
          </div>
          {filteredArtWorks
            .slice(currentIndex, currentIndex + 4)
            .map((artWork) => (
              <div
                key={artWork._id}
                className="relative overflow-hidden shadow-lg"
                onMouseEnter={() => handleMouseEnter(artWork._id.toString())}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={`/artworks/${artWork._id}`}>
                  <div className="h-52 w-full">
                    <img
                      src={artWork.image}
                      alt={artWork.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
                <div className="absolute right-0 top-0 p-3 px-4">
                  <LikesButton
                    targetType="artwork"
                    targetId={artWork._id.toString()}
                    initialLiked={likedArtWorks.includes(artWork._id)}
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
          {/* 이전 버튼 */}
          <button
            type="button"
            onClick={handlePrevious}
            className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
            style={{
              left: '-15px',
              top: '56%',
              transform: 'translateY(-50%)',
            }}
          >
            <MdNavigateBefore className="text-lg" />
          </button>
          {/* 다음 버튼 */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
            style={{
              right: '-15px',
              top: '56%',
              transform: 'translateY(-50%)',
            }}
          >
            <MdNavigateNext className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artpiece;
