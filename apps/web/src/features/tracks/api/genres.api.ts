import { genresClient } from '@/lib/grpc-client';

export const getGenres = async () => {
  try {
    const res = await genresClient.getGenres({});
    return res.genres;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get genres');
  }
};
