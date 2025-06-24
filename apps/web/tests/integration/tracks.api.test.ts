import { describe, it, expect } from 'vitest';
import {
  getTracks,
  createTrack,
  getTrackBySlug,
  updateTrack,
  deleteTrack,
  deleteTracks,
  uploadTrackFile,
  removeTrackFile,
} from '../../src/features/tracks/api/tracks.api';
import { getGenres } from '../../src/features/tracks/api/genres.api';
import {
  createTrackMock,
  genresMock,
  metaMock,
  tracksMock,
  updateTrackMock,
} from '../mocks/tracks';

it('should fetch all tracks', async () => {
  const data = await getTracks();
  expect(data).toBeDefined();

  expect(data.data).toStrictEqual(tracksMock);
  expect(data.meta).toStrictEqual(metaMock);
});

it('should create track', async () => {
  const data = await createTrack(updateTrackMock);

  expect(data).toBeDefined();
  expect(data).toStrictEqual(tracksMock[1]);
});

it('should fetch track by slug', async () => {
  const data = await getTrackBySlug('track-1');

  expect(data).toBeDefined();
  expect(data).toStrictEqual(tracksMock[0]);
});

it('should update track', async () => {
  const data = await updateTrack(tracksMock[1].id, createTrackMock);

  expect(data).toBeDefined();
  expect(data).toStrictEqual(tracksMock[0]);
});

it('should delete track', async () => {
  await deleteTrack(tracksMock[0].id);

  expect(true).toBeTruthy();
});

it('should delete many tracks', async () => {
  const ids = tracksMock.map((track) => track.id);
  const data = await deleteTracks(ids);

  expect(data).toStrictEqual({
    success: ids,
    failed: [],
  });
});

it('should upload track file', async () => {
  const formData = new FormData();
  formData.append('file', new Blob(['test'], { type: 'text/plain' }));

  const data = await uploadTrackFile(tracksMock[0].id, formData);

  expect(data).toStrictEqual(tracksMock[0]);
});

it('should delete track file', async () => {
  const data = await removeTrackFile(tracksMock[0].id);

  expect(data).toStrictEqual(tracksMock[0]);
});

it('should return all genres', async () => {
  const data = await getGenres();

  expect(data).toBeDefined();
  expect(data).toStrictEqual(genresMock);
});

it('should fail to create track if title already exists', async () => {
  try {
    await createTrack({
      ...createTrackMock,
      title: tracksMock[0].title,
    });
  } catch (error: any) {
    expect(error).toBeDefined();
    expect(error.message).toMatch(/Track with this title already exists/);
  }
});

it('should return 404 when track slug not found', async () => {
  try {
    await getTrackBySlug('track-3');
  } catch (error: any) {
    expect(error).toBeDefined();
    expect(error.message).toMatch(/Track not found/);
  }
});

it('should fail to upload track file for non-existent track', async () => {
  try {
    const formData = new FormData();
    formData.append('file', new Blob(['dummy'], { type: 'text/plain' }));

    await uploadTrackFile('999', formData);
  } catch (error: any) {
    expect(error).toBeDefined();
    expect(error.message).toMatch(/Track not found/);
  }
});

it('should fail to delete track file for non-existent track', async () => {
  try {
    await removeTrackFile('999');
  } catch (error: any) {
    expect(error).toBeDefined();
    expect(error.message).toMatch(/Track not found/);
  }
});

it('should partially fail when deleting multiple tracks', async () => {
  const ids = [tracksMock[0].id, '999'];
  const data = await deleteTracks(ids);

  expect(data).toStrictEqual({
    success: [tracksMock[0].id],
    failed: ['999'],
  });
});
