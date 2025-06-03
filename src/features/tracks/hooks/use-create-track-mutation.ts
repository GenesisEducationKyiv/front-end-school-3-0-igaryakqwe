import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTrackDto } from '@/api/dto/tracks.dto.ts';
import { createTrack } from '@/api/tracks.api.ts';
import { toast } from '@/lib/toast';
import { Track } from '@/types/entities/track.ts';
import { createSlug } from '@/features/tracks/lib/utils';

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
        
        queryClient.setQueryData(['tracks'], [...previousTracks, optimisticTrack]);
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
    }
  });
};

export default useCreateTrackMutation;