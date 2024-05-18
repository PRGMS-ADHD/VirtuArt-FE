import Artpiece from './Artpiece';
import { ArtPieceCategory } from '../../data/artPieceCategories';

const ArtpieceList = () => {
  return (
    <div>
      {ArtPieceCategory.map((category, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? 'bg-gray-100' : '';
        return (
          <div key={category.id} className={`p-4 ${bgClass}`}>
            <div className="mx-2 mt-10 text-sm font-noto-sans">
              {category.name}
            </div>
            <Artpiece category={category.name} />
          </div>
        );
      })}
    </div>
  );
};

export default ArtpieceList;
