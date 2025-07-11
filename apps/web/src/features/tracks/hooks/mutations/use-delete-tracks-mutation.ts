import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTracks } from '@/features/tracks/api/tracks.api';
import { toast } from '@/lib/toast';
import { Track } from '@/types/entities/track';

const useDeleteTracksMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (ids: string[]) => deleteTracks(ids),
    onMutate: async (trackIds) => {
      await queryClient.cancelQueries({ queryKey: ['tracks'] });

      const previousTracks = queryClient.getQueryData<Track[]>(['tracks']);

      if (previousTracks) {
        const updatedTracks = previousTracks.filter(
          (track) => !trackIds.includes(track.id)
        );
        queryClient.setQueryData(['tracks'], updatedTracks);
      }

      return { previousTracks };
    },
    onSuccess: () => {
      toast.success('Tracks deleted successfully');
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
    deleteTracks: mutate,
    isDeleting: isPending,
    error,
  };
};

export default useDeleteTracksMutation;
