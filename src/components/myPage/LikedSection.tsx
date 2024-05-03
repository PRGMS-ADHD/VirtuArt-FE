import React from 'react';
import { ArtPieceLike } from '../../models/user.model';
import ImageGrid from './ImageGrid';
import LoadMoreButton from '../common/LoadMoreButton';

interface LikedSectionProps {
  title: string;
  userImages: ArtPieceLike[];
  visibleCount: number;
  handleLoadMore: () => void;
  isExpanded: boolean;
  backgroundColor?: string;
}

const LikedSection: React.FC<LikedSectionProps> = ({
  title,
  userImages,
  visibleCount,
  handleLoadMore,
  isExpanded,
  backgroundColor,
}) => {
  return (
    <div
      className={`my-6 flex flex-col items-center justify-center px-8 ${backgroundColor}`}
    >
      <div className="border-b border-customGray6">
        <div className="pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">{title}</p>
          <ImageGrid
            images={userImages}
            visibleCount={visibleCount}
            columns={4}
          />
        </div>
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default LikedSection;
