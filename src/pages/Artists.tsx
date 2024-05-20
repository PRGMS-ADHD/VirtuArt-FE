import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArtistModel } from '@/models/artist.model';
import ArtistsList, { Category } from '../components/artists/ArtistsList';
import { fetchArtists } from '../api/http';

const Artists = () => {
  const [artists, setArtists] = useState<ArtistModel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);

        const uniqueCategories = Array.from(
          new Set<string>(data.map((artist: ArtistModel) => artist.category)),
        );
        setCategories(
          uniqueCategories.map((category: string) => ({
            id: category,
            name: category,
          })),
        );
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };
    getArtists();
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
          fontSize: 'clamp(24px, 5vw, 20px)',
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
          fontSize: 'clamp(12px, 5vw, 13px)',
        }}
      >
        창작의 매력에 빠져보세요! 여러분을 기다리는 아티스트들이 있습니다.
      </motion.p>
      <ArtistsList artists={artists} categories={categories} />
    </div>
  );
};
export default Artists;
