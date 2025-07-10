import {
  CreateTrackDto,
  GetTracksQueryParams,
} from '@/features/tracks/api/dto/tracks.dto';
import { APIDeleteResponseSchema, APIResponseSchema } from '@/types/api';
import { TrackSchema, TracksSchema } from '@/types/entities/track';
import { handleGrpcError, handleGrpcResponse } from '@/utils/api.utils';
import { tracksClient } from '@/lib/grpc-client';

export const getTracks = async (params: GetTracksQueryParams = {}) => {
  try {
    const { data, meta } = await tracksClient.listTracks(params);
    return handleGrpcResponse({ data, meta }, APIResponseSchema(TracksSchema));
  } catch (error) {
    handleGrpcError(error);
  }
};

export const createTrack = async (track: CreateTrackDto) => {
  try {
    const { track: data } = await tracksClient.createTrack(track);
    return handleGrpcResponse(data, TrackSchema);
  } catch (error) {
    handleGrpcError(error);
  }
};

export const getTrackBySlug = async (slug: string) => {
  try {
    const { track } = await tracksClient.getTrack({
      slug,
    });
    return handleGrpcResponse(track, TracksSchema);
  } catch (error) {
    handleGrpcError(error);
  }
};

export const updateTrack = async (id: string, track: CreateTrackDto) => {
  try {
    const { track: data } = await tracksClient.updateTrack({
      id,
      ...track,
    });
    return handleGrpcResponse(data, TrackSchema);
  } catch (error) {
    handleGrpcError(error);
  }
};

export const deleteTrack = async (id: string) => {
  try {
    await tracksClient.deleteTrack({
      id,
    });
  } catch (error) {
    handleGrpcError(error);
  }
};

export const deleteTracks = async (ids: string[]) => {
  try {
    const { success, failed } = await tracksClient.deleteTracks({
      ids,
    });
    return handleGrpcResponse({ success, failed }, APIDeleteResponseSchema);
  } catch (error) {
    handleGrpcError(error);
  }
};

export const uploadTrackFile = async (id: string, file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const {} = await tracksClient.uploadTrackFile({
      id,
      filename: file.name,
      mimetype: file.type,
      file: uint8Array,
    });
  } catch (error) {
    handleGrpcError(error);
  }
};

export const removeTrackFile = async (id: string) => {
  try {
    const { track } = await tracksClient.deleteTrackFile({
      id,
    });

    return handleGrpcResponse(track, TrackSchema);
  } catch (error) {
    handleGrpcError(error);
  }
};
