import { z } from "zod";

export const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  album: z.string().optional().nullable(),
  genres: z.array(z.string()),
  slug: z.string(),
  coverImage: z.string().optional().nullable(),
  audioFile: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Track = z.infer<typeof TrackSchema>;

export type SortValue = 'title' | 'artist' | 'album' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
