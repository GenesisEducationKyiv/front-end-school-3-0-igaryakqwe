import { queryOptions } from '@tanstack/react-query';
import { createLoader } from 'nuqs/server';

import { Option } from '@/components/ui/multiselect';
import { API_URL } from '@/constants/global';
import {
  SEARCH_PARAMS_SCHEMA,
  SORT_OPTIONS_MAPPER,
} from '@/features/tracks/lib/constants';
import { SortValue, Track } from '@/types/entities/track';

import { GetTracksQueryParams } from '../api/dto/tracks.dto';
import { getTracks } from '../api/tracks.api';

export const loadSearchParams = createLoader(SEARCH_PARAMS_SCHEMA);

export const filterTracks = (tracks: Track[], album?: string) => {
  if (!album) return tracks;

  return tracks.filter((track) =>
    track.album?.toUpperCase().includes(album.toUpperCase())
  );
};

export const mapGenre = (genres?: string[]): Option[] => {
  return genres?.map((genre) => ({ value: genre, label: genre })) ?? [];
};

export const getSortValue = (value: SortValue) => {
  return SORT_OPTIONS_MAPPER[value];
};

export const getAudioFile = (fileName?: string | null) => {
  if (!fileName) return;
  return `${API_URL}/files/${fileName}`;
};

export const convertNullToUndefined = <T extends object>(object: T) => {
  return Object.fromEntries(
    Object.entries(object).map(([k, v]) => [k, v === null ? undefined : v])
  );
};

export const tracksQueryOptions = (params: GetTracksQueryParams) => {
  return queryOptions({
    queryKey: ['tracks', params],
    queryFn: () => getTracks(params),
  });
};
