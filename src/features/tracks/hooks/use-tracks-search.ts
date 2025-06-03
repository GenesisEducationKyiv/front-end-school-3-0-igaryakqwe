import { useQueryStates } from 'nuqs';

import { SEARCH_PARAMS_SCHEMA } from '@/features/tracks/lib/constants.ts';
import { SortOrder, SortValue } from '@/types/entities/track.ts';

const useTracksSearch = () => {
  const [searchParams, setSearchParams] = useQueryStates(SEARCH_PARAMS_SCHEMA);
  const { page, limit, sort, order, search, genre, artist, album } =
    searchParams;

  const setSearch = async (value: string) => {
    await setSearchParams({ search: value, page: 1 });
  };

  const setGenre = async (value: string) => {
    await setSearchParams({ genre: value, page: 1 });
  };

  const setArtist = async (value: string) => {
    await setSearchParams({ artist: value, page: 1 });
  };

  const setAlbum = async (value: string) => {
    await setSearchParams({ album: value, page: 1 });
  };

  const setSort = async (value: SortValue | null) => {
    await setSearchParams({ sort: value, page: 1 });
  };

  const setOrder = async (value: SortOrder) => {
    await setSearchParams({ order: value });
  };

  return {
    searchParams,
    setSearchParams,
    page,
    limit,
    sort,
    setSort,
    order,
    setOrder,
    search,
    setSearch,
    genre,
    setGenre,
    artist,
    setArtist,
    album,
    setAlbum,
  };
};

export default useTracksSearch;
