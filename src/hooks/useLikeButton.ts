import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/store/authStore';
import { ArtistModel } from '@/models/artist.model';
import { apiToggleLike, fetchUserLikedArtists } from '../api/likes.api';

interface DecodedToken {
  // TODO
  email: string;
}

const useLikeButton = (id: string | undefined) => {
  const { token } = useAuthStore();
  const [likedArtists, setLikedArtists] = useState<string[]>([]);
  const isLiked = id ? likedArtists.includes(id) : false;

  const getUserDetailsFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.email;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const userEmail = getUserDetailsFromToken();
      if (userEmail && token) {
        try {
          const likedArtistsData = await fetchUserLikedArtists(token);
          const likedArtistsIds = likedArtistsData.map(
            (artist: ArtistModel) => artist._id,
          );
          setLikedArtists(likedArtistsIds);
        } catch (error) {
          console.error('Error fetching liked artists:', error);
        }
      }
    };

    fetchLikes();
  }, [token, id]);

  const handleLikeStatusChange = async () => {
    const userEmail = getUserDetailsFromToken();
    if (userEmail && id) {
      try {
        const toggleResult = await apiToggleLike(token, 'artist', id);
        setLikedArtists((prev) => {
          const newLikedArtists = prev.includes(id)
            ? prev.filter((artistId) => artistId !== id)
            : [...prev, id];
          return newLikedArtists;
        });
        return toggleResult; // 좋아요 상태를 토글한 결과를 반환
      } catch (error) {
        console.error('Failed to update like status:', error);
        return null; // 로그인 상태에서만 좋아요 수를 변경하므로, 에러 발생 시 null을 반환
      }
    } else {
      alert('로그인이 필요합니다.');
      return null; // 로그인하지 않은 상태에서는 null을 반환
    }
  };

  return { isLiked, handleLikeStatusChange };
};

export default useLikeButton;
