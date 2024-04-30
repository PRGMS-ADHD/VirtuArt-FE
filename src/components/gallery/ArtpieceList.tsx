import Artpiece from './Artpiece';
import { ArtPieceCategory } from '../../data/artPieceCategories';

const ArtpieceList = () => {
  return (
    <div>
      {ArtPieceCategory.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <Artpiece category={category.name} />
        </div>
      ))}
    </div>
  );
};

export default ArtpieceList;
