import ArtistsInfo from './ArtistsInfo';
import { ArtPieceCategory } from '../../data/artPieceCategories';

const ArtistsList = () => {
  return (
    <div>
      {ArtPieceCategory.map((category) => (
        <div key={category.id}>
          <div
            className="mx-2  mt-10 text-sm"
            style={{ fontFamily: 'noto-sans KR' }}
          >
            {category.name}
          </div>
          <ArtistsInfo category={category.name} />
        </div>
      ))}
    </div>
  );
};

export default ArtistsList;
