import { z } from 'zod';

import { genresClient } from '@/lib/grpc-client';
import { handleGrpcError, handleGrpcResponse } from '@/utils/api.utils';

export const getGenres = async () => {
  try {
    const res = await genresClient.getGenres({});
    return handleGrpcResponse(res.genres, z.array(z.string()));
  } catch (error) {
    handleGrpcError(error);
  }
};
