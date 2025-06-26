import { SortOrder, SortValue } from '@/types/entities/track';
import { z } from 'zod';

export const createTrackDto = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  artist: z.string().min(1, { message: 'Artist is required' }),
  album: z.string().optional(),
  genres: z
    .array(z.string())
    .min(1, { message: 'At least one genre is required' })
    .default([]),
  coverImage: z
    .string()
    .url({ message: 'Invalid URL' })
    .optional()
    .or(z.literal('')),
});

export type CreateTrackDto = z.infer<typeof createTrackDto>;

export interface GetTracksQueryParams {
  page?: number;
  limit?: number;
  sort?: SortValue;
  order?: SortOrder;
  search?: string;
  genre?: string;
  artist?: string;
}
