import { test as base } from '@playwright/test';

import { type CreateTrackDto } from '../../src/features/tracks/api/dto/tracks.dto';
import {
  createTrack as createTrackApi,
  deleteTrack as deleteTrackApi,
} from '../../src/features/tracks/api/tracks.api';
import { Track } from '../../src/types/entities/track';
import { createTrackMock, tracksMock, updateTrackMock } from '../mocks/tracks';

interface TestTracksFixture {
  getTrack: () => CreateTrackDto;
  getUpdatedTrack: () => CreateTrackDto;
  getFullTrack: () => Track;
  createTrack: (track: CreateTrackDto) => Promise<Track>;
  deleteTrack: (id: string) => Promise<void>;
}

export const test = base.extend<TestTracksFixture>({
  getTrack: async (_, use) => {
    const getTrack = () => {
      return createTrackMock;
    };
    await use(getTrack);
  },
  getUpdatedTrack: async (_, use) => {
    const getUpdatedTrack = () => {
      return updateTrackMock;
    };
    await use(getUpdatedTrack);
  },
  getFullTrack: async (_, use) => {
    const getFullTrack = () => {
      return tracksMock[0];
    };
    await use(getFullTrack);
  },
  createTrack: async (_, use) => {
    const createTrack = async (track: CreateTrackDto) => {
      const data = await createTrackApi(track);
      return data;
    };
    await use(createTrack);
  },
  deleteTrack: async (_, use) => {
    const deleteTrack = async (id: string) => {
      await deleteTrackApi(id);
    };
    await use(deleteTrack);
  },
});
