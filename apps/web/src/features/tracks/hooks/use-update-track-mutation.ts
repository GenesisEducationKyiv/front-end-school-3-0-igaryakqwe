import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateTrackDto } from '@/features/tracks/api/dto/tracks.dto';
import { updateTrack } from '@/features/tracks/api/tracks.api';
import { toast } from '@/lib/toast';
import { Track } from '@/types/entities/track';

const useUpdateTrackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateTrackDto }) =>
      updateTrack(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['tracks'] });

      const previousTracks = queryClient.getQueryData<Track[]>(['tracks']);

      if (previousTracks) {
        const updatedTracks = previousTracks.map((track) =>
          track.id === id
            ? {
                ...track,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : track
        );

        queryClient.setQueryData(['tracks'], updatedTracks);
      }

      return { previousTracks };
    },
    onSuccess: () => {
      toast.success('Track updated');
    },
    onError: (error: Error, _, context) => {
      if (context?.previousTracks) {
        queryClient.setQueryData(['tracks'], context.previousTracks);
      }
      toast.error(error?.message || 'Failed to update track');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};

export default useUpdateTrackMutation;
