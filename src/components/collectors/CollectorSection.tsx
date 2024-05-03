import React from 'react';
import LoadMoreButton from '../common/LoadMoreButton';
import { ArtPieceLike } from '../../models/user.model';
import CollectorsGrid from './CollectorsGrid'; // CollectorsGrid 컴포넌트 import

interface CollectionSectionProps {
  title: string;
  collectors: ArtPieceLike[];
  visibleCount: number;
  handleLoadMore: () => void;
  isExpanded: boolean;
  backgroundColor?: string;
}

const CollectorSection: React.FC<CollectionSectionProps> = ({
  title,
  collectors,
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
          <CollectorsGrid
            collectors={collectors}
            visibleCount={visibleCount}
            columns={9}
          />
        </div>
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default CollectorSection;
