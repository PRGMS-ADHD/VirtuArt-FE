import React from 'react';
import { ArtPieceLike } from '../../models/user.model';

interface ImageGridProps {
  images: ArtPieceLike[];
  visibleCount: number;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, visibleCount }) => {
  return (
    <div
      className="grid grid-cols-4 gap-4 transition-all duration-700"
      style={{
        maxHeight: (visibleCount / 4) * 211 + (visibleCount / 4 - 1) * 16, // 16은 gap의 값
      }}
    >
      {images.map((like, index) => (
        <img
          key={like.id}
          src={like.imageUrl}
          alt={`Art Piece ${like.artPieceId}`}
          className={`h-52 w-full object-cover transition-all duration-700 ${index < visibleCount ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
