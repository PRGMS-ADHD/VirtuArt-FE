import { fetchArtists } from '@/api/images.api';
import FetchAndDisplayGrid from '../common/FetchAndDisplayGrid';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';

const ArtWorks: React.FC = () => {
  return (
    <FetchAndDisplayGrid
      title="ARTWORKS"
      fetchFunction={fetchArtists}
      errorImage={errorImage}
      className="bg-customGray5"
    />
  );
};

export default ArtWorks;
