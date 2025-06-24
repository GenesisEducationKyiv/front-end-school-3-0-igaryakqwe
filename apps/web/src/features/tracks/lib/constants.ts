import { parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs';

import { SortOrder, SortValue } from '@/types/entities/track.ts';

export const MAX_TRACKS_PER_PAGE = 6;

export const SORT_VALUES: SortValue[] = [
  'title',
  'artist',
  'album',
  'createdAt',
];
export const SORT_ORDER: SortOrder[] = ['asc', 'desc'];

export const SORT_OPTIONS_MAPPER: Record<SortValue, string> = {
  title: 'By title',
  artist: 'By artist',
  album: 'By album',
  createdAt: 'By date',
};

export const SEARCH_PARAMS_SCHEMA = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger,
  sort: parseAsStringLiteral(SORT_VALUES),
  order: parseAsStringLiteral(SORT_ORDER),
  search: parseAsString.withDefault(''),
  genre: parseAsString.withDefault(''),
  artist: parseAsString.withDefault(''),
  album: parseAsString.withDefault(''),
};

export const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/mp3',
  'audio/x-wav',
];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const INPUT_TRACK_FILTERS = [];
