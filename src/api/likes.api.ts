import { httpClient } from '@/api/http';
import { ArtworkModel } from '@/models/artwork.model';

interface ToggleLikeResult {
  error?: boolean;
}

export const apiToggleLike = async (
  token: string | null,
  targetType: string,
  targetId: string,
): Promise<ToggleLikeResult> => {
  try {
    const response = await httpClient.post(
      `/likes/${targetType}/${targetId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

export const fetchUserLikedArtists = async (
  token: string | null,
): Promise<any> => {
  try {
    const response = await httpClient.get(`/likes/user/artists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user liked artists:', error);
    throw error;
  }
};

export const fetchArtistLikers = async (id: string) => {
  try {
    const response = await httpClient.get(`/likes/artist/${id}/collectors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artist likers:', error);
    throw error;
  }
};

export const fetchUserLikedArtworks = async (
  token: string | null,
): Promise<ArtworkModel[]> => {
  try {
    const response = await httpClient.get(`/likes/user/artworks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user liked artworks:', error);
    throw error;
  }
};
