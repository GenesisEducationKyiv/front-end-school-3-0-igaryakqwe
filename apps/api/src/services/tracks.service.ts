import { ServiceImpl, ConnectError, Code } from '@connectrpc/connect';
import {
  GetTrackRequest,
  GetTrackResponse,
  ListTracksRequest,
  ListTracksResponse,
  CreateTrackRequest,
  CreateTrackResponse,
  UpdateTrackRequest,
  UpdateTrackResponse,
  DeleteTrackRequest,
  DeleteTrackResponse,
  UploadTrackFileRequest,
  UploadTrackFileResponse,
  DeleteTrackFileRequest,
  DeleteTrackFileResponse,
  TracksService,
  GetTrackResponseSchema,
  ListTracksResponseSchema,
  CreateTrackResponseSchema,
  UpdateTrackResponseSchema,
  DeleteTrackResponseSchema,
  DeleteTracksRequest,
  DeleteTracksResponse,
  DeleteTracksResponseSchema,
  UploadTrackFileResponseSchema,
  DeleteTrackFileResponseSchema,
} from '@grpc-generated/proto/tracks_pb';
import {
  getTrackById,
  getTrackBySlug,
  getTracks,
  createTrack,
  updateTrack,
  deleteTrack,
  deleteMultipleTracks,
  saveAudioFile,
  deleteAudioFile,
} from '../utils/db';
import { createSlug } from '../utils/slug';
import { getErrorMessage } from 'src/utils/error';
import { create } from '@bufbuild/protobuf';
import { parseTrackSearchParams } from 'src/utils/query-params';

export const tracksService: ServiceImpl<typeof TracksService> = {
  async getTrack(req: GetTrackRequest): Promise<GetTrackResponse> {
    try {
      const track = await getTrackBySlug(req.slug);
      if (!track) {
        throw new ConnectError('Track not found', Code.NotFound);
      }
      const response = create(GetTrackResponseSchema, { track });
      return response;
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },

  async listTracks(req: ListTracksRequest): Promise<ListTracksResponse> {
    try {
      const queryParams = parseTrackSearchParams(req);
      const { tracks, total } = await getTracks(queryParams);
      const response = create(ListTracksResponseSchema, {
        data: tracks,
        meta: {
          total,
          page: req.page || 1,
          limit: req.limit || 10,
          totalPages: Math.ceil(total / (req.limit || 10)),
        },
      });

      return response;
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },

  async createTrack(req: CreateTrackRequest): Promise<CreateTrackResponse> {
    try {
      if (!req.title || !req.artist) {
        throw new ConnectError(
          'Title and artist are required',
          Code.InvalidArgument
        );
      }
      if (!req.genres || !Array.isArray(req.genres)) {
        throw new ConnectError('Genres must be an array', Code.InvalidArgument);
      }
      const slug = createSlug(req.title);
      const existingTrack = await getTrackBySlug(slug);
      if (existingTrack) {
        throw new ConnectError(
          'A track with this title already exists',
          Code.AlreadyExists
        );
      }
      const newTrack = await createTrack({
        title: req.title,
        artist: req.artist,
        album: req.album || '',
        genres: req.genres,
        coverImage: req.coverImage || '',
        slug,
      });

      const response = create(CreateTrackResponseSchema, { track: newTrack });
      return response;
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },

  async updateTrack(req: UpdateTrackRequest): Promise<UpdateTrackResponse> {
    try {
      const existingTrack = await getTrackById(req.id);
      if (!existingTrack) {
        throw new ConnectError('Track not found', Code.NotFound);
      }
      let updates: any = { ...req };
      if (req.title && req.title !== existingTrack.title) {
        const newSlug = createSlug(req.title);
        const trackWithSameSlug = await getTrackBySlug(newSlug);
        if (trackWithSameSlug && trackWithSameSlug.id !== req.id) {
          throw new ConnectError(
            'A track with this title already exists',
            Code.AlreadyExists
          );
        }
        updates.slug = newSlug;
      }
      const updatedTrack = await updateTrack(req.id, updates);
      const response = create(UpdateTrackResponseSchema, {
        track: updatedTrack,
      });
      return response;
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },

  async deleteTrack(req: DeleteTrackRequest): Promise<DeleteTrackResponse> {
    try {
      const success = await deleteTrack(req.id);
      if (!success) {
        throw new ConnectError('Track not found', Code.NotFound);
      }
      return create(DeleteTrackResponseSchema, {});
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },

  async deleteTracks(req: DeleteTracksRequest): Promise<DeleteTracksResponse> {
    try {
      if (!req.ids || !Array.isArray(req.ids) || req.ids.length === 0) {
        throw new ConnectError('Track IDs are required', Code.InvalidArgument);
      }
      const results = await deleteMultipleTracks(req.ids);
      return create(DeleteTracksResponseSchema, results);
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },

  async uploadTrackFile(
    req: UploadTrackFileRequest
  ): Promise<UploadTrackFileResponse> {
    try {
      const existingTrack = await getTrackById(req.id);
      if (!existingTrack) {
        throw new ConnectError('Track not found', Code.NotFound);
      }
      const allowedMimeTypes = [
        'audio/mpeg',
        'audio/wav',
        'audio/mp3',
        'audio/x-wav',
      ];
      if (!allowedMimeTypes.includes(req.mimetype)) {
        throw new ConnectError(
          'Invalid file type. Only MP3 and WAV files are allowed.',
          Code.InvalidArgument
        );
      }
      if (req.file.length > 10 * 1024 * 1024) {
        throw new ConnectError(
          'File is too large. Maximum size is 10MB.',
          Code.InvalidArgument
        );
      }
      const fileName = await saveAudioFile(req.id, req.filename, req.file);
      const updatedTrack = await updateTrack(req.id, { audioFile: fileName });
      const response = create(UploadTrackFileResponseSchema, {
        track: updatedTrack,
      });
      return response;
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },

  async deleteTrackFile(
    req: DeleteTrackFileRequest
  ): Promise<DeleteTrackFileResponse> {
    try {
      const existingTrack = await getTrackById(req.id);
      if (!existingTrack) {
        throw new ConnectError('Track not found', Code.NotFound);
      }
      if (!existingTrack.audioFile) {
        throw new ConnectError('Track has no audio file', Code.NotFound);
      }
      const success = await deleteAudioFile(req.id);
      if (!success) {
        throw new ConnectError('Failed to delete audio file', Code.Internal);
      }
      const updatedTrack = await getTrackById(req.id);
      const response = create(DeleteTrackFileResponseSchema, {
        track: updatedTrack,
      });
      return response;
    } catch (error) {
      throw new ConnectError(getErrorMessage(error), Code.Internal);
    }
  },
};
