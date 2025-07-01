import { ListTracksRequest } from '@grpc-generated/proto/tracks_pb';

import { QueryParams } from '@/types';

export const parseTrackSearchParams = (req: ListTracksRequest): QueryParams => {
  const allowedSorts = ['title', 'artist', 'album', 'createdAt'] as const;
  const allowedOrders = ['asc', 'desc'] as const;

  const sort = allowedSorts.includes(req.sort as typeof allowedSorts[number])
    ? (req.sort as typeof allowedSorts[number])
    : undefined;
  const order = allowedOrders.includes(
    req.order as typeof allowedOrders[number]
  )
    ? (req.order as typeof allowedOrders[number])
    : undefined;

  return {
    page: req.page,
    limit: req.limit,
    sort,
    order,
    search: req.search,
    genre: req.genre,
    artist: req.artist,
  };
};
