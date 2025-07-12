import { useQuery } from '@tanstack/react-query';

import { GetTracksQueryParams } from '@/features/tracks/api/dto/tracks.dto';
import { getTracks } from '@/features/tracks/api/tracks.api';
import useTracksSearch from '@/features/tracks/hooks/use-tracks-search';
import { MAX_TRACKS_PER_PAGE } from '@/features/tracks/lib/constants';
import { filterTracks } from '@/features/tracks/lib/utils';
import useDebounce from '@/hooks/use-debounce';
import { usePagination } from '@/hooks/use-pagination';

const useTracksQuery = () => {
  const {
    state: { album, search, artist, sort, order, searchParams, limit },
  } = useTracksSearch();

  const debouncedSearch = useDebounce(search, 500);
  const debouncedArtist = useDebounce(artist, 500);
  const debouncedAlbum = useDebounce(album, 500);

  const params: GetTracksQueryParams = {
    ...searchParams,
    search: debouncedSearch,
    artist: debouncedArtist,
    sort: sort || undefined,
    order: order || undefined,
    limit,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['tracks', params],
    queryFn: () => getTracks(params),
    select: (data) => {
      if (!data) return;
      return {
        data: filterTracks(data.data, debouncedAlbum),
        meta: data.meta,
      };
    },
  });

  const { currentPage, handlePageChange, totalPages } = usePagination({
    totalItems: data?.meta.total ?? 0,
    itemsPerPage: MAX_TRACKS_PER_PAGE,
  });

  return {
    tracks: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    error,
    currentPage,
    handlePageChange,
    totalPages,
  };
};

export default useTracksQuery;
