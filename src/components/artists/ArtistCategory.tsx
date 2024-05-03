import React from 'react';

interface ArtistCategoryProps {
  category: string;
  folder: string;
}

const ArtistCategory: React.FC<ArtistCategoryProps> = ({ category, folder }) => {
  const imagePaths = require.context(`../../public/${folder}`, false, /\.png$/);
  const images = imagePaths.keys().map(imagePaths);

  return (
    <div>
      <h2 className="text-2xl font-semibold">{category}</h2>
      <div className="flex flex-wrap justify-center">
        {images.map((img, idx) => (
          <div key={idx} className="m-4">
            <img src={img} alt={`${category} artist ${idx}`} className="h-48 w-48 object-cover rounded-full" />
            <p className="text-center mt-2">{`Artist ${idx + 1}`}</p>  {/* 실제 이름 데이터 필요 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistCategory;
