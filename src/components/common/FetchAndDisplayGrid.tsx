import React, { useState, useEffect } from 'react';
import LoadMoreButton from '@/components/common/LoadMoreButton';
import { Artist } from '@/models/artist.model';
import LikesButton from '@/components/image/LikesButton';

interface FetchAndDisplayGridProps {
  title: string;
  fetchFunction: () => Promise<Artist[]>;
  errorImage: string;
  className?: string;
  showLikesButton?: boolean; // 새로운 속성 추가
}

const FetchAndDisplayGrid: React.FC<FetchAndDisplayGridProps> = ({
  title,
  fetchFunction,
  errorImage,
  className,
  showLikesButton = true, // 기본값을 true로 설정
}) => {
  const [items, setItems] = useState<Artist[]>([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      const fetchedItems = await fetchFunction();
      setItems(fetchedItems);
    };
    getItems();
  }, [fetchFunction]);

  const handleLoadMore = () => {
    setVisibleItems(isExpanded ? 8 : items.length);
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center ${className} px-8`}
    >
      <div className="border-b border-customGray6">
        <div className="pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">{title}</p>
          <div className="relative grid grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(0, visibleItems).map((artist) => (
              <div key={artist._id} className="relative">
                {artist.profile_image ? (
                  <img
                    src={artist.profile_image}
                    alt={artist.name}
                    className="h-[200px] w-[350px] object-cover transition-all duration-700"
                  />
                ) : (
                  <img
                    src={errorImage}
                    alt="errorImage"
                    className="h-[200px] w-[350px] object-cover"
                  />
                )}
                {showLikesButton && ( // 조건적 렌더링
                  <div className="absolute right-0 top-0 p-2">
                    <LikesButton />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default FetchAndDisplayGrid;
