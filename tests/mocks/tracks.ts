export const tracksMock = [
  {
    id: '1',
    title: 'Track 1',
    artist: 'Artist 1',
    album: 'Album 1',
    genres: ['Rock', 'Genre 2'],
    slug: 'track-1',
    coverImage: 'https://cover-image-1.jpg',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Track 2',
    artist: 'Artist 2',
    album: 'Album 2',
    genres: ['Genre 3', 'Genre 4'],
    slug: 'track-2',
    coverImage: 'https://cover-image-2.jpg',
    createdAt: '2021-01-02T00:00:00.000Z',
    updatedAt: '2021-01-02T00:00:00.000Z',
  },
];

export const metaMock = {
  total: tracksMock.length,
  page: 1,
  limit: 6,
  totalPages: 1,
};

export const createTrackMock = {
  title: 'Track 1',
  artist: 'Artist 1',
  album: 'Album 1',
  genres: ['Genre 1', 'Genre 2'],
  coverImage:
    'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
};

export const updateTrackMock = {
  title: 'Track 2',
  artist: 'Artist 2',
  album: 'Album 2',
  genres: ['Genre 3', 'Genre 4'],
  coverImage:
    'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
};

export const genresMock = [
  'Rock',
  'Pop',
  'Hip Hop',
  'Jazz',
  'Classical',
  'Electronic',
  'R&B',
  'Country',
  'Folk',
  'Reggae',
  'Metal',
  'Blues',
  'Indie',
];
