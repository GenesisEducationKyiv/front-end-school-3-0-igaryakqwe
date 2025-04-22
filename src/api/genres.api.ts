import { API_URL } from '@/constants/global';
import { APIError } from '@/types/api.ts';

export const getGenres = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay

  const res = await fetch(`${API_URL}/genres`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const { error } = (await res.json()) as APIError;
    throw new Error(error || 'Failed to fetch genres');
  }

  return (await res.json()) as string[];
};
