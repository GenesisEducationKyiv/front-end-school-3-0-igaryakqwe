import { API_URL } from '@/constants/global';
import { handleAPIResponse } from '@/utils/api.utils';
import { z } from 'zod';

export const getGenres = async () => {
  const res = await fetch(`${API_URL}/genres`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleAPIResponse(res, z.array(z.string()));
};
