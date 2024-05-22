import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadMoreButton from '@/components/common/LoadMoreButton';
import { ArtistModel } from '@/models/artist.model';
import { fetchArtWorksByArtist } from '@/api/images.api';
import { ArtworkModel } from '@/models/artwork.model';
import ImageTooltip from '@/components/gallery/ImageTooltip';
import useLikeButtonArtWork from '@/hooks/useLikeButtonArtWork';
import LikesButton from '@/components/image/LikesButton';
import { useAuthStore } from '@/store/authStore';

interface FetchAndDisplayGridProps {
  errorImage: string;
  // className?: string;
  artist: ArtistModel | null;
  id: string | undefined;
}

interface OtherArtWorkItemProps {
  artwork: ArtworkModel;
  errorImage: string;
  handleArtistClick: (artWorkId: string) => void;
  handleMouseEnter: (id: string) => void;
  handleMouseLeave: () => void;
  showTooltip: boolean;
  hoveredImageId: string | null;
}

const OtherArtWorkItem: React.FC<OtherArtWorkItemProps> = ({
  artwork,
  errorImage,
  handleArtistClick,
  handleMouseEnter,
  handleMouseLeave,
  showTooltip,
  hoveredImageId,
}) => {
  const token = useAuthStore((state) => state.token);
  const { isLiked, handleLikeStatusChange } = useLikeButtonArtWork(artwork._id);

  return (
    <div
      key={artwork._id}
      className="relative cursor-pointer"
      onClick={() => handleArtistClick(artwork._id)}
      onMouseEnter={() => handleMouseEnter(artwork._id)}
      onMouseLeave={handleMouseLeave}
    >
      {artwork.image ? (
        <img
          src={artwork.image}
          className="h-[12.5rem] w-[21.875rem] object-cover transition-all duration-700 sm:h-[15rem] sm:w-[25rem]"
        />
      ) : (
        <img
          src={errorImage}
          alt="errorImage"
          className="h-[200px] w-[350px] object-cover"
        />
      )}
      <div className="absolute right-0 top-0 p-2">
        <LikesButton
          initialLiked={isLiked}
          onLikeStatusChange={handleLikeStatusChange}
          targetId={artwork._id}
          targetType="artwork"
          token={token}
        />
      </div>
      {showTooltip && hoveredImageId === artwork._id && (
        <ImageTooltip title={artwork.name} artist={artwork.artist} />
      )}
    </div>
  );
};

const OtherWorks: React.FC<FetchAndDisplayGridProps> = ({
  errorImage,
  // className,
  artist,
  id,
}) => {
  const [artworks, setArtWorks] = useState<ArtworkModel[]>([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getArtWorks = async () => {
      try {
        if (artist && artist._id) {
          const artistArtworks = await fetchArtWorksByArtist(artist._id);
          const filteredArtworks = artistArtworks.filter(
            (artwork: ArtworkModel) => artwork._id !== id,
          );
          setArtWorks(filteredArtworks);
        }
      } catch (error) {
        console.error('Failed to fetch artworks:', error);
      }
    };

    if (artist && artist._id) {
      getArtWorks();
    }
  }, [artist, id]);

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

  const handleLoadMore = () => {
    if (!isExpanded) {
      const newVisibleItems = visibleItems + 8;
      setVisibleItems(newVisibleItems);
      setIsExpanded(newVisibleItems >= artworks.length);
    } else {
      setVisibleItems(8);
      setIsExpanded(!isExpanded);
    }
  };

  const handleArtistClick = (artWorkId: string) => {
    navigate(`/artworks/${artWorkId}`);
    window.scrollTo(0, 0);
  };

  const handleMouseEnter = (id: string) => {
    setShowTooltip(true);
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className={`my-6 flex items-center justify-center px-8`}>
      <div className="w-[88%] border-b border-customGray6">
        <div className="pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">OTHER WORKS</p>
          <div className="relative grid grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 custom:grid-cols-4">
            {artworks.slice(0, visibleItems).map((artwork) => (
              <OtherArtWorkItem
                key={artwork._id}
                artwork={artwork}
                errorImage={errorImage}
                handleArtistClick={handleArtistClick}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                showTooltip={showTooltip}
                hoveredImageId={hoveredImageId}
              />
            ))}
          </div>
        </div>
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default OtherWorks;
