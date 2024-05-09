import { fetchArtists } from '@/api/images.api';
import FetchAndDisplayGrid from '../common/FetchAndDisplayGrid';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';

const LikedWorks: React.FC = () => {
  return (
    <FetchAndDisplayGrid
      title="LIKED WORKS"
      fetchFunction={fetchArtists}
      errorImage={errorImage}
      className="bg-customGray5"
      showLikesButton={false}
    />
  );
};

export default LikedWorks;
