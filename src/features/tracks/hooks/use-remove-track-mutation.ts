import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeTrackFile } from '@/api/tracks.api.ts';
import { toast } from '@/lib/toast';
import { Track } from '@/types/entities/track.ts';

const useRemoveTrackMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (trackId: string) => removeTrackFile(trackId),
    onMutate: async (trackId) => {
      await queryClient.cancelQueries({ queryKey: ['tracks'] });
      
      const previousTracks = queryClient.getQueryData<Track[]>(['tracks']);
      
      if (previousTracks) {
        const updatedTracks = previousTracks.map(track => 
          track.id === trackId 
            ? { 
                ...track, 
                fileStatus: 'removing',
                updatedAt: new Date().toISOString() 
              } 
            : track
        );
        
        queryClient.setQueryData(['tracks'], updatedTracks);
      }
      
      return { previousTracks };
    },
    onSuccess: (_, trackId) => {
      const tracks = queryClient.getQueryData<Track[]>(['tracks']);
      
      if (tracks) {
        const updatedTracks = tracks.map(track => 
          track.id === trackId 
            ? { 
                ...track, 
                fileStatus: null,
                audioUrl: null,
                updatedAt: new Date().toISOString() 
              } 
            : track
        );
        
        queryClient.setQueryData(['tracks'], updatedTracks);
      }
      
      toast.success('Track file removed');
    },
    onError: (_, __, context) => {
      if (context?.previousTracks) {
        queryClient.setQueryData(['tracks'], context.previousTracks);
      }
      toast.error('Failed to remove track file');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    }
  });

  return { removeTrackFile: mutate, isRemoving: isPending, error };
};

export default useRemoveTrackMutation;
