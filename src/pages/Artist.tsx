import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLikeButton from '@/hooks/useLikeButton';

// Additional component imports
import Collectors from '@/components/collectors/Collectors';
import ArtistProfileCard from '@/components/profile/ArtistProfileCard';
import LikesCountButton from '../components/common/LikesCountButton';
import ArtWorks from '../components/artist/ArtWorks';

// API and model imports
import { ArtistModel } from '../models/artist.model';
import { fetchArtistById } from '../api/images.api';

import logo from '../../assets/logo.png';

const Artist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistModel | null>(null);

  // 아티스트에 대한 좋아요 상태 가져옴
  const { isLiked, handleLikeStatusChange } = useLikeButton(id);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistData = await fetchArtistById(id);
        setArtist(artistData);
      } catch (error) {
        console.error('작가 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchArtistData();
  }, [id]);

  if (!id) {
    return null;
  }

  if (!artist) {
    return <div>Loading...</div>;
  }

  const handleLikeButtonClick = async () => {
    const toggleResult = await handleLikeStatusChange();
    if (toggleResult !== null) {
      // toggleResult가 null이 아닌 경우에만 좋아요 수를 변경
      setArtist((prev) => {
        if (prev) {
          return {
            ...prev,
            likes: toggleResult ? prev.likes + 1 : prev.likes - 1,
          };
        }
        return prev;
      });
    }
  };

  return (
    <div>
      <ArtistProfileCard artist={artist}>
        <LikesCountButton
          likes={artist.likes}
          isLiked={isLiked}
          onLikeStatusChange={handleLikeButtonClick}
        />
      </ArtistProfileCard>
      <div>
        <ArtWorks artistId={id} errorImage={logo} />
        <Collectors artistId={id} />
      </div>
    </div>
  );
};

export default Artist;
