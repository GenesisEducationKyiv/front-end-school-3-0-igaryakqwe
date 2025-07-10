import { createSerializer } from 'nuqs';

import { Option } from '@/components/ui/multiselect.tsx';
import { API_URL } from '@/constants/global.ts';
import {
  SEARCH_PARAMS_SCHEMA,
  SORT_OPTIONS_MAPPER,
} from '@/features/tracks/lib/constants.ts';
import { SortValue, Track } from '@/types/entities/track.ts';

export const serialize = createSerializer(SEARCH_PARAMS_SCHEMA);

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
