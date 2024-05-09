import { fetchArtists } from '@/api/images.api';
import FetchAndDisplayGrid from '../common/FetchAndDisplayGrid';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';

const ArtWorks: React.FC = () => {
  return (
    <FetchAndDisplayGrid
      title="LIKED ARTISTS"
      fetchFunction={fetchArtists}
      errorImage={errorImage}
      showLikesButton={false}
    />
  );
};

export default ArtWorks;
