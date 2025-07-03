/* eslint-disable no-empty-pattern */
import crypto from 'node:crypto';

import { test as base } from '@playwright/test';

import { type CreateTrackDto } from '../../src/features/tracks/api/dto/tracks.dto';
import {
  createTrack as createTrackApi,
  deleteTrack as deleteTrackApi,
  deleteTracks as deleteTracksApi,
} from '../../src/features/tracks/api/tracks.api';
import { Track } from '../../src/types/entities/track';
import { createTrackMock, tracksMock, updateTrackMock } from '../mocks/tracks';

interface TestTracksFixture {
  getTrack: (isRandom?: boolean) => CreateTrackDto;
  getUpdatedTrack: () => CreateTrackDto;
  getFullTrack: () => Track;
  createTrack: (track: CreateTrackDto) => Promise<Track>;
  deleteTrack: (id: string) => Promise<void>;
  deleteAllTracks: () => Promise<void>;
}

let tracksIds: string[] = [];

export const test = base.extend<TestTracksFixture>({
  getTrack: async ({}, use) => {
    const getTrack = (isRandom = true) => {
      const randomPostfix = isRandom ? crypto.randomUUID() : '';
      return {
        ...createTrackMock,
        title: createTrackMock.title + randomPostfix,
      };
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
      tracksIds.push(data.id);
      return data;
    };
    await use(createTrack);
  },
  deleteTrack: async ({}, use) => {
    const deleteTrack = async (id: string) => {
      await deleteTrackApi(id);
      tracksIds = tracksIds.filter((trackId) => trackId !== id);
    };
    await use(deleteTrack);
  },
  deleteAllTracks: async ({}, use) => {
    const deleteAllTracks = async () => {
      if (tracksIds.length === 0) return;
      await deleteTracksApi(tracksIds);
    };
    await use(deleteAllTracks);
  },
});
