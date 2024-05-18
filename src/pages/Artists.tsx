import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ArtistsList from '../components/artists/ArtistsList';

// Artist와 Category 타입 정의
interface Artist {
  id: string;
  name: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get<Artist[]>(
          'http://localhost:3000/artist/all',
        );
        setArtists(response.data);

        const uniqueCategories = Array.from(
          new Set(response.data.map((artist) => artist.category)),
        );
        setCategories(
          uniqueCategories.map((category) => ({
            id: category,
            name: category,
          })),
        );
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
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
          fontSize: 'clamp(24px, 5vw, 40px)',
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
