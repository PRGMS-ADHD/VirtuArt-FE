import { useState } from 'react';
import { westernArtPieces } from '../../data/artPieces';
import { ArtPieceCategory } from '../../data/artPieceCategories';
import LikesButton from '../image/LikesButton';
import { MdNavigateNext } from 'react-icons/md';

const GalleryArtpiece = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < westernArtPieces.length - 4) {
      setCurrentIndex(currentIndex + 4);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="flex h-[300px] w-full items-center justify-center bg-gray-100">
      <div className="flex flex-col justify-center">
        {ArtPieceCategory.map((category) => (
          <div key={category.id}>
            {westernArtPieces.some(
              (artPiece) => artPiece.category === category.name,
            ) && <div>{category.name}</div>}
          </div>
        ))}
        <div className="grid grid-cols-4 gap-4">
          {westernArtPieces
            .slice(currentIndex, currentIndex + 4)
            .map((artPiece) => (
              <div
                key={artPiece.id}
                className="relative transition-transform duration-500 ease-in-out"
              >
                <img
                  src={artPiece.imageUrl}
                  alt={artPiece.title}
                  className="h-[211px] w-[376px] object-cover"
                />
                <div className="absolute right-0 top-1 p-2">
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
    </div>
  );
};

export default GalleryArtpiece;
