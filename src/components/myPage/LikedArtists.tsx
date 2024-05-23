import React, { useCallback, useEffect, useState } from 'react';
import { ArtistModel } from '@/models/artist.model';
import { useNavigate } from 'react-router-dom';
import LoadMoreButton from '@/components/common/LoadMoreButton';
import ImageTooltip from '@/components/gallery/ImageTooltip';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';

interface LikedArtistsProps {
  artists: ArtistModel[];
  isLoading: boolean;
}

const LikedArtists: React.FC<LikedArtistsProps> = ({ artists, isLoading }) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleLoadMore = useCallback(() => {
    const increment = window.innerWidth < 768 ? 4 : 8;

    if (!isExpanded) {
      const newVisibleItems = visibleItems + increment;
      setVisibleItems(newVisibleItems);
      setIsExpanded(newVisibleItems >= artists.length);
    } else {
      setVisibleItems(increment);
      setIsExpanded(false);
    }
  }, [isExpanded, visibleItems, artists.length]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(4);
      } else {
        setVisibleItems(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = (id: string) => {
    setShowTooltip(true);
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="my-6 flex flex-col items-center justify-center px-8">
      <div className="border-b border-customGray6">
        <div className="mx-auto min-h-[45vh] min-w-[87vw] pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">LIKED ARTISTS</p>
          {isLoading ? (
            <div style={{ minHeight: '200px' }}>Loading works...</div>
          ) : (
            <div className="relative grid grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 custom:grid-cols-4">
              {artists.slice(0, visibleItems).map((artist) => (
                <div
                  key={artist._id}
                  className="relative cursor-pointer"
                  onClick={() => navigate(`/artists/${artist._id}`)}
                  onMouseEnter={() => handleMouseEnter(artist._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={
                      artist.profile_image ? artist.profile_image : errorImage
                    }
                    alt={artist.profile_image ? artist.name : 'errorImage'}
                    className="object-cover transition-all duration-700"
                    style={{ width: '350px', height: '200px' }}
                  />
                  {showTooltip && hoveredImageId === artist._id && (
                    <ImageTooltip title={artist.name} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default LikedArtists;
