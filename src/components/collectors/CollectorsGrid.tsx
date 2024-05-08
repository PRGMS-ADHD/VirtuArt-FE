import React from 'react';
import { ArtPieceLike } from '../../models/user.model';
import ProfilePicture from '../profile/ProfilePicture';

interface CollectorsProps {
  collectors: ArtPieceLike[];
  visibleCount: number;
  columns: number;
}

const CollectorsGrid: React.FC<CollectorsProps> = ({
  collectors,
  visibleCount,
  columns,
}) => {
  return (
    <div
      className={`grid grid-cols-${columns} gap-10 transition-all duration-700`}
      style={{
        maxHeight:
          (visibleCount / columns) * 190 + (visibleCount / columns - 1) * 16, //
      }}
    >
      {collectors.map((collector, index) => (
        <div
          key={index} // TODO 인덱스 나중에 수정
          className={`flex flex-col items-center transition-all duration-700 ${index < visibleCount ? 'opacity-100' : 'opacity-0'}`}
        >
          <ProfilePicture src={collector.imageUrl} />
          <p className="mt-2">nickname</p>
        </div>
      ))}
    </div>
  );
};

export default CollectorsGrid;
