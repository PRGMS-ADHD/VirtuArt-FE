import { httpClient } from './http';
import { ArtistModel } from '../models/artist.model';


export const fetchArtists = async (): Promise<ArtistModel[]> => {
  try {
    const response = await httpClient.get<ArtistModel[]>('/artist/all');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load');
  }
};

export const fetchArtistById = async (
  id: string = '',
): Promise<ArtistModel> => {
  try {
    const response = await httpClient.get<ArtistModel>(`/artist/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load');
  }
};

export const fetchAllArtWorks = async () => {
  try {
    const response = await httpClient.get('/artwork/all');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load');
  }
};

export const fetchArtWorksById = async (id: string = '') => {
  try {
    const response = await httpClient.get(`/artwork/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load');
  }
};
