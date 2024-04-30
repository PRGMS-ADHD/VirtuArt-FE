import { useState } from 'react';
import { ArtPieces } from '../../data/artPieces';
import LikesButton from '../image/LikesButton';
import { MdNavigateNext } from 'react-icons/md';
import { ArtPieceCategory } from '../../data/artPieceCategories'; // 카테고리 데이터 임포트

interface ArtpieceProps {
  category: string;
}

const Artpiece: React.FC<ArtpieceProps> = ({ category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const isEvenCategory =
    ArtPieceCategory.findIndex((cat) => cat.name === category) % 2 !== 0;
  const bgClass = isEvenCategory ? 'bg-gray-100' : '';

  return (
    <div
      className={`flex h-[300px] w-full items-center justify-center ${bgClass}`}
    >
      <div className="grid grid-cols-4 gap-4">
        {categoryArtPieces
          .slice(currentIndex, currentIndex + 4)
          .map((artpiece) => (
            <div key={artpiece.id} style={{ position: 'relative' }}>
              <img
                src={artpiece.imageUrl}
                alt={artpiece.title}
                width={376}
                height={211}
              />
              <div className="absolute right-0 top-0 p-2">
                <LikesButton />
              </div>
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
