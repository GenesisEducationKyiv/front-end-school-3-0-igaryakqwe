import { ServiceImpl } from '@connectrpc/connect';
import {
  GetGenresRequest,
  GetGenresResponse,
  GetGenresResponseSchema,
  GenresService,
} from '@grpc-generated/proto/genres_pb';
import { getGenres } from '../utils/db';
import { create } from '@bufbuild/protobuf';

export const genresService: ServiceImpl<typeof GenresService> = {
  async getGenres(req: GetGenresRequest): Promise<GetGenresResponse> {
    try {
      const genres = await getGenres();
      const response = create(GetGenresResponseSchema, { genres });
      return response;
    } catch (error) {
      throw new Error(`Failed to get genres: ${error}`);
    }
  },
};
