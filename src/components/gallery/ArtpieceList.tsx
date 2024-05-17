import Artpiece from './Artpiece';
import { ArtPieceCategory } from '../../data/artPieceCategories';
const ArtpieceList = () => {
  return (
    <div>
      {ArtPieceCategory.map((category) => (
        <div key={category.id}>
          <Artpiece category={category} />
        </div>
      ))}
    </div>
  );
};

export default ArtpieceList;
