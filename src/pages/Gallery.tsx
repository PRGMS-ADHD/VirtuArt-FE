import { motion } from 'framer-motion';
import ArtpieceList from '../components/gallery/ArtpieceList';

const Gallery = () => {
  return (
    <div className="my-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="font my-2 text-center text-2xl font-medium"
        style={{ fontFamily: 'Helvetica Neue' }}
      >
        Hear the Stories Beyond the Canvas!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="mb-6 text-sm font-extralight"
        style={{ fontFamily: 'noto-sans KR' }}
      >
        캔버스 너머의 이야기를 들어보세요.
      </motion.p>
      <ArtpieceList />
    </div>
  );
};

export default Gallery;
