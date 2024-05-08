import React, { useState } from 'react';
import { ArtistModel } from '@/models/artist.model';
import { useNavigate } from 'react-router-dom';
import LoadMoreButton from '@/components/common/LoadMoreButton';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';

interface LikedArtistsProps {
  artists: ArtistModel[];
}

const LikedArtists: React.FC<LikedArtistsProps> = ({ artists }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLoadMore = () => {
    if (!isExpanded) {
      const newVisibleItems = visibleItems + 8;
      setVisibleItems(newVisibleItems);
      setIsExpanded(newVisibleItems > artists.length);
    } else {
      setVisibleItems(8);
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="my-6 flex flex-col items-center justify-center px-8">
      <div className="border-b border-customGray6">
        <div className="min-h-[45vh] min-w-[87vw] pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">LIKED ARTISTS</p>
          <div className="relative grid grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 custom:grid-cols-4">
            {artists.slice(0, visibleItems).map((artist) => (
              <div
                key={artist._id}
                className="relative cursor-pointer"
                onClick={() => navigate(`/artists/${artist._id}`)}
              >
                <img
                  src={artist.profile_image ? artist.profile_image : errorImage}
                  alt={artist.profile_image ? artist.name : 'errorImage'}
                  className="object-cover transition-all duration-700"
                  style={{ width: '20vw', height: '20vh' }}
                />
              </div>
            ))}
          </div>
        </div>
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default LikedArtists;
