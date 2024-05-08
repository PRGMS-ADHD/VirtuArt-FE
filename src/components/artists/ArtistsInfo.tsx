import { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Artists } from '../../data/artists';

interface ArtistsInfoProps {
  category: string;
}

const ArtistsInfo: React.FC<ArtistsInfoProps> = ({ category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoryArtists = Artists.filter(
    (artist) => artist.category === category,
  );

  const handleNext = () => {
    // 이미지를 6개씩 이동하도록 변경
    if (currentIndex < categoryArtists.length - 6) {
      setCurrentIndex(currentIndex + 6);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="relative flex w-full items-center justify-center py-6">
      {/* 그리드를 6개의 컬럼으로 변경 */}
      <div className="relative grid grid-cols-6 gap-4">
        {categoryArtists.slice(currentIndex, currentIndex + 6).map((artist) => (
          <div key={artist.id} style={{ position: 'relative' }}>
            <Link to={`/artist/${artist.id}`}>
              <img
                src={artist.imageUrl}
                alt={artist.name}
                width={100}
                height={100}
              />
            </Link>
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

export default ArtistsInfo;
