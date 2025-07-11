import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { GenresService } from '@grpc-generated/proto/genres_pb';
import { TracksService } from '@grpc-generated/proto/tracks_pb';

import { API_URL } from '@/constants/global';

const transport = createConnectTransport({
  baseUrl: API_URL,
});

export const genresClient = createClient(GenresService, transport);
export const tracksClient = createClient(TracksService, transport);
