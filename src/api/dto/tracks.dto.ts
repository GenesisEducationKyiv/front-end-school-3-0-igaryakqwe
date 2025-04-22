import { z } from 'zod';

export const createTrackDto = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  artist: z.string().min(1, { message: 'Artist is required' }),
  album: z.string().optional(),
  genres: z.array(z.string()).default([]),
  coverImage: z
    .string()
    .url({ message: 'Invalid URL' })
    .nullish()
    .or(z.literal('')),
});

export type CreateTrackDto = z.infer<typeof createTrackDto>;
