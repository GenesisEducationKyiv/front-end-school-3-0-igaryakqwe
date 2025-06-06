import { useQueryStates } from 'nuqs';
import * as Belt from '@mobily/ts-belt';
import { pipe } from '@mobily/ts-belt';

import {
  MAX_TRACKS_PER_PAGE,
  SEARCH_PARAMS_SCHEMA,
} from '@/features/tracks/lib/constants.ts';
import { SortOrder, SortValue } from '@/types/entities/track.ts';

const useTracksSearch = () => {
  const [searchParams, setSearchParams] = useQueryStates(SEARCH_PARAMS_SCHEMA);
  const { page, limit, sort, order, search, genre, artist, album } =
    searchParams;

  const pageOption = Belt.O.fromNullable(page);
  const limitOption = Belt.O.fromNullable(limit);
  const sortOption = Belt.O.fromNullable(sort);
  const orderOption = Belt.O.fromNullable(order);
  const searchOption = pipe(
    Belt.O.fromNullable(search),
    Belt.O.map((s) => s.trim()),
    Belt.O.flatMap((s) => (s.length > 0 ? Belt.O.Some(s) : Belt.O.None))
  );
  const genreOption = pipe(
    Belt.O.fromNullable(genre),
    Belt.O.map((g) => g.trim()),
    Belt.O.flatMap((g) => (g.length > 0 ? Belt.O.Some(g) : Belt.O.None))
  );
  const artistOption = pipe(
    Belt.O.fromNullable(artist),
    Belt.O.map((a) => a.trim()),
    Belt.O.flatMap((a) => (a.length > 0 ? Belt.O.Some(a) : Belt.O.None))
  );
  const albumOption = pipe(
    Belt.O.fromNullable(album),
    Belt.O.map((a) => a.trim()),
    Belt.O.flatMap((a) => (a.length > 0 ? Belt.O.Some(a) : Belt.O.None))
  );

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
    state: {
      searchParams,
      page: Belt.O.getWithDefault(pageOption, 1),
      limit: Belt.O.getWithDefault(limitOption, MAX_TRACKS_PER_PAGE),
      sort: Belt.O.getWithDefault(sortOption, 'createdAt'),
      order: Belt.O.getWithDefault(orderOption, 'desc'),
      search: Belt.O.getWithDefault(searchOption, ''),
      genre: Belt.O.getWithDefault(genreOption, ''),
      artist: Belt.O.getWithDefault(artistOption, ''),
      album: Belt.O.getWithDefault(albumOption, ''),
    },
    actions: {
      setSearchParams,
      setSearch,
      setGenre,
      setArtist,
      setAlbum,
      setSort,
      setOrder,
    },
  };
};

export default useTracksSearch;
