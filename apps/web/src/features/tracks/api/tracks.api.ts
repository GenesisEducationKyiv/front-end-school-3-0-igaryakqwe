import { CreateTrackDto } from '@/features/tracks/api/dto/tracks.dto';
import { API_URL } from '@/constants/global';
import { APIDeleteResponseSchema, APIResponseSchema } from '@/types/api.ts';
import { TrackSchema, TracksSchema } from '@/types/entities/track.ts';
import { handleAPIResponse, handleErrorResponse } from '@/utils/api.utils';

export const getTracks = async (params?: string) => {
  const response = await fetch(`${API_URL}/tracks${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleAPIResponse(response, APIResponseSchema(TracksSchema));
};

export const createTrack = async (track: CreateTrackDto) => {
  const response = await fetch(`${API_URL}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(track),
  });

  return handleAPIResponse(response, TrackSchema);
};

export const getTrackBySlug = async (slug: string) => {
  const response = await fetch(`${API_URL}/tracks/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleAPIResponse(response, TrackSchema);
};

export const updateTrack = async (id: string, track: CreateTrackDto) => {
  const response = await fetch(`${API_URL}/tracks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(track),
  });

  return handleAPIResponse(response, TrackSchema);
};

export const deleteTrack = async (id: string) => {
  const response = await fetch(`${API_URL}/tracks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) await handleErrorResponse(response);
};

export const deleteTracks = async (ids: string[]) => {
  const response = await fetch(`${API_URL}/tracks/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  });

  return handleAPIResponse(response, APIDeleteResponseSchema);
};

export const uploadTrackFile = async (id: string, formData: FormData) => {
  const response = await fetch(`${API_URL}/tracks/${id}/upload`, {
    method: 'POST',
    body: formData,
  });

  return handleAPIResponse(response, TrackSchema);
};

export const removeTrackFile = async (id: string) => {
  const response = await fetch(`${API_URL}/tracks/${id}/file`, {
    method: 'DELETE',
  });

  if (!response.ok) await handleErrorResponse(response);
};
