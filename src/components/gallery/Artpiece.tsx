import React, { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ArtPieceCategory } from '@/data/artPieceCategories'; // 카테고리 데이터 임포트
import { ArtPieces } from '../../data/artPieces';
import LikesButton from '../image/LikesButton';
import ImageTooltip from './ImageTooltip';

interface ArtpieceProps {
  category: string;
}

const Artpiece: React.FC<ArtpieceProps> = ({ category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({
    title: '',
    description: '',
  });

  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const categoryArtPieces = ArtPieces.filter(
    (artpiece) => artpiece.category === category,
  );

  const handleNext = () => {
    if (currentIndex < categoryArtPieces.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleImageClick = (id: number) => {
    setSelectedImageId(id.toString());
  };

  const handleMouseEnter = (id: string, title: string, description: string) => {
    setTooltipContent({ title, description });
    setShowTooltip(true);
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const isEvenCategory =
    ArtPieceCategory.findIndex((cat) => cat.name === category) % 2 !== 0;
  const bgClass = isEvenCategory ? 'bg-gray-100' : '';

  return (
    <div
      className={`relative flex w-full items-center justify-center py-6 ${bgClass}`}
    >
      <div className="relative grid grid-cols-4 gap-4">
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
                  onClick={() => handleImageClick(artpiece.id)}
                />
              </Link>
              <div className="absolute right-0 top-0 p-3 px-4">
                <LikesButton />
              </div>
              {showTooltip && hoveredImageId === artpiece.id.toString() && (
                <ImageTooltip
                  title={tooltipContent.title}
                  description={tooltipContent.description}
                />
              )}
            </div>
          ))}
      </div>
      <button
        onClick={handleNext}
        className="absolute right-0 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
      >
        <MdNavigateNext className="text-lg" />
      </button>
    </div>
  );
};

export default Artpiece;
