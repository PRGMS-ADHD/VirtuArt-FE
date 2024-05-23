import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/store/authStore';
import { ArtworkModel } from '@/models/artwork.model';
import { apiToggleLike, fetchUserLikedArtworks } from '../api/likes.api';

interface DecodedToken {
  email: string;
}

const useLikeButtonArtwork = (id: string | undefined) => {
  const { token } = useAuthStore();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likedArtworks, setLikedArtworks] = useState<string[]>([]);

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
    setIsLiked(id ? likedArtworks.includes(id) : false);
  }, [likedArtworks, id]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (token) {
        try {
          const likedArtworksData = await fetchUserLikedArtworks(token);
          const likedArtworksIds = likedArtworksData.map(
            (artwork: ArtworkModel) => artwork._id,
          );
          setLikedArtworks(likedArtworksIds);
        } catch (error) {
          console.error('Error fetching liked artworks:', error);
        }
      }
    };

    fetchLikes();
  }, [token]); // id 의존성 제거

  // useEffect(() => {
  //   const fetchLikes = async () => {
  //     const userEmail = getUserDetailsFromToken();
  //     if (userEmail && token) {
  //       try {
  //         const likedArtworksData = await fetchUserLikedArtworks(token);
  //         const likedArtworksIds = likedArtworksData.map(
  //           (artwork: ArtworkModel) => artwork._id,
  //         );
  //         setLikedArtworks(likedArtworksIds);
  //       } catch (error) {
  //         console.error('Error fetching liked artworks:', error);
  //       }
  //     }
  //   };

  //   fetchLikes();
  // }, [token, id]);

  // const handleLikeStatusChange = async () => {
  //   const userEmail = getUserDetailsFromToken();
  //   if (userEmail && id) {
  //     try {
  //       const toggleResult = await apiToggleLike(token, 'artwork', id);
  //       setLikedArtworks((prev) => {
  //         const newLikedArtworks = prev.includes(id)
  //           ? prev.filter((artworkId) => artworkId !== id)
  //           : [...prev, id];
  //         return newLikedArtworks;
  //       });
  //       return toggleResult; // 좋아요 상태를 토글한 결과를 반환
  //     } catch (error) {
  //       console.error('Failed to update like status:', error);
  //       return null; // 로그인 상태에서만 좋아요 수를 변경하므로, 에러 발생 시 null을 반환
  //     }
  //   } else {
  //     alert('로그인이 필요합니다.');
  //     return null; // 로그인하지 않은 상태에서는 null을 반환
  //   }
  // };

  const handleLikeStatusChange = async () => {
    const userEmail = getUserDetailsFromToken();
    if (userEmail && id) {
      setIsLiked((prev) => !prev); // 상태를 즉시 업데이트
      try {
        const toggleResult = await apiToggleLike(token, 'artwork', id);
        // 서버 응답 후 필요한 경우 상태를 다시 조정
        if (toggleResult.error) {
          setIsLiked((prev) => !prev); // 에러가 발생하면 상태를 원래대로 되돌림
        }
        return toggleResult;
      } catch (error) {
        console.error('Failed to update like status:', error);
        setIsLiked((prev) => !prev); // 에러가 발생하면 상태를 원래대로 되돌림
        return null;
      }
    } else {
      alert('로그인이 필요합니다.');
      return null;
    }
  };

  return { isLiked, handleLikeStatusChange };
};

export default useLikeButtonArtwork;
