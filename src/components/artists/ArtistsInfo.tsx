import React, { useState } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ArtistModel } from '@/models/artist.model';

const categoryNames: Record<number, string> = {
  1: '서양화',
  2: '동양화',
  3: '팝 아트',
  4: '미디어 아트',
  5: '현대 미술',
};

interface ArtistsInfoProps {
  artists: ArtistModel[];
  categoryId: number;
}

const ArtistsInfo: React.FC<ArtistsInfoProps> = ({ artists, categoryId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < artists.length - 6 ? prevIndex + 6 : 0,
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0
        ? prevIndex - 6
        : artists.length - (artists.length % 6 || 6),
    );
  };

  return (
    <div className="relative flex w-full items-center justify-center px-14 py-5">
      <button
        onClick={handlePrevious}
        className="absolute left-[38px] top-1/2 z-10 flex h-[40px] w-[40px] -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
        type="button"
      >
        <MdNavigateBefore className="text-lg" />
      </button>
      <div className="relative grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-3 md:grid-rows-1 md:flex-row lg:grid-cols-6">
        <div className="col-span-full font-noto-sans-kr text-[20px] font-medium leading-[29px]">
          {categoryNames[categoryId]}
        </div>
        {artists
          .slice(currentIndex, currentIndex + 6)
          .map(({ _id: id, profile_image, name }) => (
            <div key={id} className="relative inline-block rounded p-1">
              <Link to={`/artists/${id}`}>
                <div
                  className="relative overflow-hidden rounded-full border border-gray-500 shadow-lg"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.5)',
                    boxShadow: '0px 4px 8.5px #000000',
                  }}
                >
                  <img
                    src={profile_image}
                    alt={name}
                    className="block h-full w-full object-cover"
                    style={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '1 / 1',
                    }}
                  />
                </div>
                <div className="mt-3 text-center font-noto-sans-kr text-[16px] font-medium text-customGray3">
                  {name}
                </div>
              </Link>
            </div>
          ))}
      </div>
      <button
        onClick={handleNext}
        className="absolute right-[38px] top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
        type="button"
      >
        <MdNavigateNext className="text-lg" />
      </button>
    </div>
  );
};

export default ArtistsInfo;
