import { motion } from 'framer-motion';
import ArtistsList from '../components/artists/ArtistsList';

const Artists = () => {
  return (
    <div className="my-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="font my-2 text-2xl font-medium"
        style={{ fontFamily: 'Helvetica Neue' }}
      >
        Meet the Artists Behind the Canvas!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="mb-6 text-sm font-extralight"
        style={{ fontFamily: 'noto-sans KR' }}
      >
        창작의 매력에 빠져보세요! 여러분을 기다리는 아티스트들이 있습니다.
      </motion.p>
      <ArtistsList />
    </div>
  );
};

export default Artists;
