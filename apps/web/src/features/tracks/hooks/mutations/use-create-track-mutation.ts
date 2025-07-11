import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateTrackDto } from '@/features/tracks/api/dto/tracks.dto';
import { createTrack } from '@/features/tracks/api/tracks.api';
import { toast } from '@/lib/toast';
import { Track } from '@/types/entities/track';
import { createSlug } from '@/utils/string.utils';

const useCreateTrackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTrackDto) => createTrack(data),
    onMutate: async (newTrackData) => {
      await queryClient.cancelQueries({ queryKey: ['tracks'] });

      const previousTracks = queryClient.getQueryData<Track[]>(['tracks']);

      if (previousTracks) {
        const optimisticTrack: Track = {
          id: 'temp-id-' + Date.now(),
          ...newTrackData,
          slug: createSlug(newTrackData.title),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        queryClient.setQueryData(
          ['tracks'],
          [...previousTracks, optimisticTrack]
        );
      }

      return { previousTracks };
    },
    onSuccess: () => {
      toast.success('Track created');
    },
    onError: (error: Error, _, context) => {
      if (context?.previousTracks) {
        queryClient.setQueryData(['tracks'], context.previousTracks);
      }
      toast.error(error?.message || 'Failed to create track');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
};

export default useCreateTrackMutation;
