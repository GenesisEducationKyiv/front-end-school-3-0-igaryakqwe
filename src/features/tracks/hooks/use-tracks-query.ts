import { useQuery } from '@tanstack/react-query';

import { getTracks } from '@/features/tracks/api/tracks.api';
import useTracksSearch from '@/features/tracks/hooks/use-tracks-search.ts';
import { MAX_TRACKS_PER_PAGE } from '@/features/tracks/lib/constants.ts';
import { filterTracks, serialize } from '@/features/tracks/lib/utils.ts';
import useDebounce from '@/hooks/use-debounce.ts';
import { usePagination } from '@/hooks/use-pagination.ts';

const useTracksQuery = () => {
  const {
    state: { album, search, artist, searchParams, limit },
  } = useTracksSearch();

  const debouncedSearch = useDebounce(search, 500);
  const debouncedArtist = useDebounce(artist, 500);
  const debouncedAlbum = useDebounce(album, 500);

  const params = serialize({
    ...searchParams,
    search: debouncedSearch,
    artist: debouncedArtist,
    limit,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['tracks', params],
    queryFn: () => getTracks(params),
    select: (data) => ({
      data: filterTracks(data.data, debouncedAlbum),
      meta: data.meta,
    }),
  });

  const { currentPage, handlePageChange, totalPages } = usePagination({
    totalItems: data?.meta.total ?? 0,
    itemsPerPage: MAX_TRACKS_PER_PAGE,
  });

  return {
    tracks: data?.data ?? [],
    isLoading,
    error,
    currentPage,
    handlePageChange,
    totalPages,
  };
};

export default useTracksQuery;
