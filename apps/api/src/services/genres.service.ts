import { create } from '@bufbuild/protobuf';
import { Code, ConnectError, ServiceImpl } from '@connectrpc/connect';
import {
  GenresService,
  GetGenresResponse,
  GetGenresResponseSchema,
} from '@grpc-generated/proto/genres_pb';

import { getGenres } from '@/utils/db';
import { getErrorMessage } from '@/utils/error';

export const genresService: ServiceImpl<typeof GenresService> = {
  async getGenres(): Promise<GetGenresResponse> {
    try {
      const genres = await getGenres();
      const response = create(GetGenresResponseSchema, { genres });
      return response;
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },
};
