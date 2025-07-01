import { test as base } from '@playwright/test';
import { Track } from '../../src/types/entities/track';
import {
  createTrack as createTrackApi,
  deleteTrack as deleteTrackApi,
} from '../../src/features/tracks/api/tracks.api';
import { createTrackMock, tracksMock, updateTrackMock } from '../mocks/tracks';
import { type CreateTrackDto } from '../../src/features/tracks/api/dto/tracks.dto';

interface TestTracksFixture {
  getTrack: () => CreateTrackDto;
  getUpdatedTrack: () => CreateTrackDto;
  getFullTrack: () => Track;
  createTrack: (track: CreateTrackDto) => Promise<Track>;
  deleteTrack: (id: string) => Promise<void>;
}

export const test = base.extend<TestTracksFixture>({
  getTrack: async ({}, use) => {
    const getTrack = () => {
      return createTrackMock;
    };
    await use(getTrack);
  },
  getUpdatedTrack: async ({}, use) => {
    const getUpdatedTrack = () => {
      return updateTrackMock;
    };
    await use(getUpdatedTrack);
  },
  getFullTrack: async ({}, use) => {
    const getFullTrack = () => {
      return tracksMock[0];
    };
    await use(getFullTrack);
  },
  createTrack: async ({}, use) => {
    const createTrack = async (track: CreateTrackDto) => {
      const data = await createTrackApi(track);
      return data;
    };
    await use(createTrack);
  },
  deleteTrack: async ({}, use) => {
    const deleteTrack = async (id: string) => {
      await deleteTrackApi(id);
    };
    await use(deleteTrack);
  },
});
