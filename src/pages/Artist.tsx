import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Collectors from '@/components/collectors/Collectors';
import ArtistProfileCard from '@/components/profile/ArtistProfileCard';
import LikesCountButton from '../components/common/LikesCountButton';
import ArtWorks from '../components/artist/ArtWorks';
import { Artist as ArtistType } from '../models/artist.model';
import { fetchArtistById } from '../api/images.api';

// 데이터 필요합니다.
const Artist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistType | null>(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const data = await fetchArtistById(id);
        console.log(data);
        setArtist(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtistData();
  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ArtistProfileCard artist={artist}>
        <LikesCountButton />
      </ArtistProfileCard>
      <div>
        <ArtWorks />
        <Collectors />
      </div>
    </div>
  );
};

export default Artist;
