import { fetchArtists } from '@/api/images.api';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';
import FetchAndDisplayGrid from '../common/FetchAndDisplayGrid';

const OtherWorks: React.FC = () => {
  return (
    <FetchAndDisplayGrid
      title="OTHER WORKS"
      fetchFunction={fetchArtists}
      errorImage={errorImage}
      className="-mt-6 bg-customGray5"
    />
  );
};

export default OtherWorks;
