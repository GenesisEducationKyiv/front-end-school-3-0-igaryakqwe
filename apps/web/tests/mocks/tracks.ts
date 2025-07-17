export const tracksMock = [
  {
    id: '1',
    title: 'Track 1',
    artist: 'Artist 1',
    album: 'Album 1',
    genres: ['Rock', 'Pop'],
    slug: 'track-1',
    coverImage:
      'https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Track 2',
    artist: 'Artist 2',
    album: 'Album 2',
    genres: ['Hip Hop', 'Jazz'],
    slug: 'track-2',
    coverImage:
      'https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
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
  genres: ['Rock', 'Pop'],
  coverImage:
    'https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
};

export const updateTrackMock = {
  title: 'Track 2',
  artist: 'Artist 2',
  album: 'Album 2',
  genres: ['Hip Hop', 'Jazz'],
  coverImage:
    'https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
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
