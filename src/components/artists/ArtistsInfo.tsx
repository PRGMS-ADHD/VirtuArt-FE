import { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';

const categoryNames = {
  1: 'WESTERN',
  2: 'KOREAN',
  3: 'POP ART',
  4: 'MEDIA ART',
  5: 'MODERN ART',
};

const ArtistsInfo = ({ artists, categoryId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < artists.length - 6 ? prevIndex + 6 : 0,
    );
  };

  return (
    <div className="relative flex w-full items-center justify-center px-4 py-5">
      <div className="md:grid-rows-1 md:flex-row md:grid-cols-3 relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-full font-noto-sans-kr text-[20px] font-medium leading-[29px]">
          {categoryNames[categoryId]}
        </div>
        {artists.slice(currentIndex, currentIndex + 6).map((artist) => (
          <div key={artist._id} className="relative inline-block rounded p-1">
            <Link to={`/artist/${artist._id}`}>
              <div
                className="relative overflow-hidden rounded-full border border-gray-500 shadow-lg"
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.5)',
                  boxShadow: '0px 4px 8.5px #000000',
                }}
              >
                <img
                  src={artist.profile_image}
                  alt={artist.name}
                  className="block h-full w-full object-cover"
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1 / 1',
                  }}
                />
              </div>
              <div className="mt-3 text-center font-noto-sans-kr text-[16px] font-medium text-customGray3">
                {artist.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="bottom-50 absolute right-[-1px] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
      >
        <MdNavigateNext className="text-lg" />
      </button>
    </div>
  );
};

export default ArtistsInfo;