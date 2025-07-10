import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadTrackFile } from '@/features/tracks/api/tracks.api';
import { toast } from '@/lib/toast';
import { Track } from '@/types/entities/track.ts';

const useTrackUploadMutation = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (file: File) => uploadTrackFile(id, file),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tracks'] });

      const previousTracks = queryClient.getQueryData<Track[]>(['tracks']);

      if (previousTracks) {
        const updatedTracks = previousTracks.map((track) =>
          track.id === id
            ? {
                ...track,
                fileStatus: 'uploading',
                updatedAt: new Date().toISOString(),
              }
            : track
        );

        queryClient.setQueryData(['tracks'], updatedTracks);
      }

      return { previousTracks };
    },
    onSuccess: () => {
      const tracks = queryClient.getQueryData<Track[]>(['tracks']);

      if (tracks) {
        const updatedTracks = tracks.map((track) =>
          track.id === id
            ? {
                ...track,
                fileStatus: 'uploaded',
                updatedAt: new Date().toISOString(),
              }
            : track
        );

        queryClient.setQueryData(['tracks'], updatedTracks);
      }

      toast.success('Track file uploaded');
    },
    onError: (_, __, context) => {
      if (context?.previousTracks) {
        queryClient.setQueryData(['tracks'], context.previousTracks);
      }
      toast.error('Failed to upload track file');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });

  return { uploadTrack: mutate, isUploading: isPending, error };
};

export default useTrackUploadMutation;
