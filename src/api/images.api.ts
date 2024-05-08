import { httpClient } from './http';
import { Artist } from '../models/artist.model';

export const fetchArtists = async (): Promise<Artist[]> => {
  try {
    const response = await httpClient.get<Artist[]>('/artist/all');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load');
  }
};

export const fetchArtistById = async (id: string = ''): Promise<Artist> => {
  try {
    const response = await httpClient.get<Artist>(`/artist/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load');
  }
};
