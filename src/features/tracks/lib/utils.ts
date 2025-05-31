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

export const getSortValue = (value?: SortValue) => {
  if (!value) return 'No sorting';
  return SORT_OPTIONS_MAPPER[value];
};

export const getAudioFile = (fileName?: string | null) => {
  if (!fileName) return;
  return `${API_URL}/files/${fileName}`;
};

export const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const createSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}