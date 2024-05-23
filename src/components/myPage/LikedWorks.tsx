import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadMoreButton from '@/components/common/LoadMoreButton';
import { ArtworkModel } from '@/models/artwork.model';
import ImageTooltip from '@/components/gallery/ImageTooltip';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';

interface LikedWorksProps {
  works: ArtworkModel[];
  isLoading: boolean;
}

const LikedWorks: React.FC<LikedWorksProps> = ({ works, isLoading }) => {
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
      setIsExpanded(newVisibleItems >= works.length);
    } else {
      setVisibleItems(increment);
      setIsExpanded(false);
    }
  }, [isExpanded, visibleItems, works.length]);

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

  const handleWorkClick = useCallback(
    (workId: string) => {
      navigate(`/artworks/${workId}`);
    },
    [navigate],
  );

  const visibleWorks = useMemo(
    () => works.slice(0, visibleItems),
    [works, visibleItems],
  );

  const handleMouseEnter = (id: string) => {
    setShowTooltip(true);
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="my-6 flex flex-col items-center justify-center bg-customGray5 px-8">
      <div className="border-b border-customGray6">
        <div className="mx-auto min-h-[45vh] min-w-[87vw] pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">LIKED WORKS</p>
          {isLoading ? (
            <div style={{ minHeight: '200px' }}>Loading works...</div>
          ) : (
            <div className="relative grid grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 custom:grid-cols-4">
              {visibleWorks.map((work) => (
                <div
                  key={work._id}
                  className="relative cursor-pointer"
                  onClick={() => handleWorkClick(work._id)}
                  onMouseEnter={() => handleMouseEnter(work._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={work.image ? work.image : errorImage}
                    alt={work.name ? work.name : 'errorImage'}
                    className="object-cover transition-all duration-700"
                    style={{ width: '350px', height: '200px' }}
                  />
                  {showTooltip && hoveredImageId === work._id && (
                    <ImageTooltip title={work.name} artist={work.artist} />
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

export default LikedWorks;
