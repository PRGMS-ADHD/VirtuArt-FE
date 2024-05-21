import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/store/authStore';
import { ArtworkModel } from '@/models/artwork.model';
import { useLikesStore } from '@/store/likesStore';
import { apiToggleLike, fetchUserLikedArtworks } from '../api/likes.api';
import debounce from 'lodash/debounce';

interface DecodedToken {
  email: string;
}

const useLikeButtonArtwork = (id: string | undefined) => {
  const { token } = useAuthStore();
  const { likedArtworks, addLikedArtwork, removeLikedArtwork } =
    useLikesStore();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const queryClient = useQueryClient();

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
      const userEmail = getUserDetailsFromToken();
      if (userEmail && token) {
        try {
          const likedArtworksData = await fetchUserLikedArtworks(token);
          likedArtworksData.forEach((artwork: ArtworkModel) => {
            addLikedArtwork(artwork._id);
          });
        } catch (error) {
          console.error('Error fetching liked artworks:', error);
        }
      }
    };

    fetchLikes();
  }, [token, id]);

  const toggleLikeMutation = useMutation(
    (params: { token: string | null; type: string; id: string }) =>
      apiToggleLike(params.token, params.type, params.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('artworks');
      },
    },
  );

  const handleLikeStatusChange = debounce(async () => {
    if (!isRequesting) {
      setIsRequesting(true);
      const userEmail = getUserDetailsFromToken();
      if (userEmail && id) {
        try {
          await toggleLikeMutation.mutateAsync({ token, type: 'artwork', id });
          if (isLiked) {
            removeLikedArtwork(id);
          } else {
            addLikedArtwork(id);
          }
          setIsRequesting(false);
          return !isLiked;
        } catch (error) {
          console.error('Failed to update like status:', error);
          setIsRequesting(false);
          return null;
        }
      } else {
        if (!userEmail) {
          alert('로그인이 필요합니다.');
        }
        setIsRequesting(false);
        return null;
      }
    }
    return null;
  }, 500);

  return { isLiked, handleLikeStatusChange };
};

export default useLikeButtonArtwork;
