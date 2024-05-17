import { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ArtistsInfo = ({ artists }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < artists.length - 6 ? prevIndex + 6 : 0,
    );
  };

  return (
    <div className="relative flex w-full items-center justify-center py-6">
      <div className="relative grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {artists.slice(currentIndex, currentIndex + 6).map((artist) => (
          <div key={artist._id} className="relative inline-block rounded p-1">
            <Link to={`/artist/${artist._id}`}>
              <div
                className="relative overflow-hidden rounded-full border border-gray-500 shadow-lg"
                style={{
                  width: '20vw',
                  height: '20vw',
                  minWidth: '100px',
                  minHeight: '100px',
                  maxWidth: '200px',
                  maxHeight: '200px',
                  border: '1px solid rgba(0, 0, 0, 0.5)',
                  boxShadow: '0px 4px 8.5px #000000',
                }}
              >
                <img
                  src={artist.profile_image}
                  alt={artist.name}
                  className="block h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 text-center font-noto-sans-kr text-[16px] font-medium text-customGray3">
                {artist.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="relative bottom-2 right-6 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
      >
        <MdNavigateNext className="text-lg" />
      </button>
    </div>
  );
};

export default ArtistsInfo;
