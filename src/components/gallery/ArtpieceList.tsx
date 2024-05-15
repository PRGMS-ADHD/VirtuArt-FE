import Artpiece from './Artpiece';
import { ArtPieceCategory } from '../../data/artPieceCategories';

const ArtpieceList = () => {
  return (
    <div>
      {ArtPieceCategory.map((category) => (
        <div key={category.id}>
          {/*<div*/}
          {/*  className="mx-2 mt-10 text-sm"*/}
          {/*  style={{ fontFamily: 'noto-sans KR' }}*/}
          {/*>*/}
          {/*  {category.name}*/}
          {/*</div>*/}
          <Artpiece category={category} />
        </div>
      ))}
    </div>
  );
};

export default ArtpieceList;
