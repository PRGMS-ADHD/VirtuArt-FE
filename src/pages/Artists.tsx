import { motion } from 'framer-motion';
import ArtistsList from '../components/artists/ArtistsList';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await axios.get('http://localhost:3000/artist/all');
      setArtists(response.data);

      // Extract unique categories from the artists data
      const uniqueCategories = Array.from(
        new Set(response.data.map((artist) => artist.category)),
      );
      setCategories(
        uniqueCategories.map((category) => ({
          id: category,
          name: category, // Adjust if you have a proper name for each category
        })),
      );
    };
    fetchArtists();
  }, []);

  return (
    <div className="my-8 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="my-2 font-medium"
        style={{
          fontFamily: 'Helvetica Neue',
          fontSize: 'clamp(24px, 5vw, 40px)', // 반응형 폰트 크기 설정
        }}
      >
        Meet the Artists Behind the Canvas!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="mb-8 font-extralight"
        style={{
          fontFamily: 'Noto Sans KR',
          fontSize: 'clamp(12px, 5vw, 20px)', 
        }}
      >
        창작의 매력에 빠져보세요! 여러분을 기다리는 아티스트들이 있습니다.
      </motion.p>
      <ArtistsList artists={artists} categories={categories} />
    </div>
  );
};

export default Artists;
