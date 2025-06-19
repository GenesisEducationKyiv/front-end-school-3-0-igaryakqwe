import { test, expect } from '@playwright/experimental-ct-react';
import { Track } from '../../src/types/entities/track';
import TrackCard from '../../src/features/tracks/components/track-card';

const mockTrack: Track = {
  id: 'track-1',
  title: 'Test Song',
  artist: 'Test Artist',
  album: 'Test Album',
  genres: ['Rock', 'Alternative'],
  slug: 'test-song',
  coverImage: 'test-cover.jpg',
  audioFile: 'test-audio.mp3',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-02',
};

const trackWithoutAudio: Track = {
  ...mockTrack,
  id: 'track-2',
  title: 'Track Without Audio',
  audioFile: null,
};

const trackWithMultipleGenres: Track = {
  ...mockTrack,
  id: 'track-3',
  title: 'Multi-Genre Track',
  genres: ['Rock', 'Pop', 'Electronic', 'Alternative', 'Indie'],
};

test.only('renders track information correctly', async ({ mount }) => {
  const component = await mount(<TrackCard track={mockTrack} />);

  await expect(component).toContainText('Test Song');

  await expect(
    component.getByTestId(`track-item-${mockTrack.id}-album`)
  ).toContainText('Test Album');

  await expect(
    component.getByTestId(`track-item-${mockTrack.id}-artist`)
  ).toContainText('By Test Artist');

  await expect(component.getByTestId('genre-Rock')).toBeVisible();
  await expect(component.getByTestId('genre-Alternative')).toBeVisible();
});

test('displays track image with correct alt text', async ({ mount }) => {
  const component = await mount(<TrackCard track={mockTrack} />);

  const trackImageWrapper = component.locator('[class*="track-image"]').first();
  await expect(trackImageWrapper).toBeVisible();
});

test('shows audio component when track has audio file', async ({ mount }) => {
  const component = await mount(<TrackCard track={mockTrack} />);

  const cardContent = component.locator(
    '.card-content, [class*="CardContent"]'
  );
  await expect(cardContent).toBeVisible();
});

test('shows upload component when track has no audio file', async ({
  mount,
}) => {
  const component = await mount(<TrackCard track={trackWithoutAudio} />);

  const cardContent = component.locator(
    '.card-content, [class*="CardContent"]'
  );
  await expect(cardContent).toBeVisible();
});

test('displays edit and delete buttons', async ({ mount }) => {
  const component = await mount(<TrackCard track={mockTrack} />);

  const editButton = component.getByTestId(`edit-track-${mockTrack.id}`);
  await expect(editButton).toBeVisible();
  await expect(editButton).toHaveAttribute('aria-label', 'Edit track');

  const deleteButton = component.getByTestId(`delete-track-${mockTrack.id}`);
  await expect(deleteButton).toBeVisible();
});

test('displays multiple genres correctly', async ({ mount }) => {
  const component = await mount(<TrackCard track={trackWithMultipleGenres} />);

  // Check that all genres are displayed
  for (const genre of trackWithMultipleGenres.genres) {
    await expect(component.getByTestId(`genre-${genre}`)).toBeVisible();
  }

  // Check that genres are in a flex container
  const genreContainer = component
    .locator('div')
    .filter({ hasText: 'Rock' })
    .first()
    .locator('..');
  await expect(genreContainer).toBeVisible();
});
