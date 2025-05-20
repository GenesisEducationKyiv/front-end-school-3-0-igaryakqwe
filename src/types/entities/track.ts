export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  slug: string;
  coverImage?: string | null;
  audioFile?: string;
  createdAt: string;
  updatedAt: string;
}

export type SortValue = 'title' | 'artist' | 'album' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
