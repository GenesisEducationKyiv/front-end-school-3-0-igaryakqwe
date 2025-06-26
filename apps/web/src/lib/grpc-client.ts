import { createConnectTransport } from '@connectrpc/connect-web';
import { createClient } from '@connectrpc/connect';
import { GenresService } from '@grpc-generated/proto/genres_pb';
import { API_URL } from '@/constants/global';

const transport = createConnectTransport({
  baseUrl: API_URL,
});

export const genresClient = createClient(GenresService, transport);
