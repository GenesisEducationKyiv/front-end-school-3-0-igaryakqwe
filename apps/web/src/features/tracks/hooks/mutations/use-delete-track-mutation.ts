import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTrack } from '@/features/tracks/api/tracks.api';
import { toast } from '@/lib/toast';
import { Track } from '@/types/entities/track';

const useDeleteTrackMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (trackId: string) => {
      return deleteTrack(trackId);
    },
    onMutate: async (trackId) => {
      await queryClient.cancelQueries({ queryKey: ['tracks'] });

      const previousTracks = queryClient.getQueryData<Track[]>(['tracks']);

      if (previousTracks) {
        const updatedTracks = previousTracks.filter(
          (track) => track.id !== trackId
        );
        queryClient.setQueryData(['tracks'], updatedTracks);
      }

      return { previousTracks };
    },
    onSuccess: () => {
      toast.success('Track deleted successfully');
    },
    onError: (_, __, context) => {
      if (context?.previousTracks) {
        queryClient.setQueryData(['tracks'], context.previousTracks);
      }
      toast.error('There was an error while deleting tracks');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });

  return {
    deleteTrack: mutate,
    isDeleting: isPending,
    error,
  };
};
export default useDeleteTrackMutation;
