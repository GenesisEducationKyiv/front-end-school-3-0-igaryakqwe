import { API_URL } from '@/constants/global';
import { Track } from '@/types/entities/track.ts';
import { APIDeleteResponse, APIError, APIResponse } from '@/types/api.ts';
import { CreateTrackDto } from '@/api/dto/tracks.dto.ts';

export const getTracks = async (params?: string) => {
  const response = await fetch(`${API_URL}/tracks${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const { error } = (await response.json()) as APIError;
    throw new Error(error || 'Failed to fetch tracks');
  }

  return (await response.json()) as APIResponse<Track[]>;
};

export const createTrack = async (track: CreateTrackDto) => {
  const response = await fetch(`${API_URL}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(track),
  });

  if (!response.ok) {
    const { error } = (await response.json()) as APIError;
    throw new Error(error || 'Failed to create track');
  }

  return (await response.json()) as Track;
};

export const getTrackBySlug = async (slug: string) => {
  const response = await fetch(`${API_URL}/tracks/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const { error } = (await response.json()) as APIError;
    throw new Error(error || 'Failed to fetch track');
  }

  return (await response.json()) as Track;
};

export const updateTrack = async (id: string, track: CreateTrackDto) => {
  const response = await fetch(`${API_URL}/tracks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(track),
  });

  if (!response.ok) {
    const { error } = (await response.json()) as APIError;
    throw new Error(error || 'Failed to update track');
  }

  return (await response.json()) as APIResponse<Track>;
};

export const deleteTrack = async (id: string) => {
  const response = await fetch(`${API_URL}/tracks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const { error } = (await response.json()) as APIError;
    throw new Error(error || 'Failed to delete track');
  }
};

export const deleteTracks = async (ids: string[]) => {
  const response = await fetch(`${API_URL}/tracks/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    const { error } = (await response.json()) as APIError;
    throw new Error(error || 'Failed to delete tracks');
  }

  return (await response.json()) as APIDeleteResponse;
};

export const uploadTrackFile = async (id: string, formData: FormData) => {
  const response = await fetch(`${API_URL}/tracks/${id}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const { error } = (await response.json()) as APIError;
    throw new Error(error || 'Failed to upload track file');
  }

  return (await response.json()) as Track;
};

export const removeTrackFile = async (id: string) => {
  const response = await fetch(`${API_URL}/tracks/${id}/file`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const { error } = (await response.json()) as APIError;
    throw new Error(error || 'Failed to remove track file');
  }
};
