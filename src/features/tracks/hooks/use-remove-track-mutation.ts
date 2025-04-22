import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTrackFile } from '@/api/tracks.api.ts';
import { toast } from 'sonner';

const useRemoveTrackMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (trackId: string) => removeTrackFile(trackId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tracks'] });
      toast.success('Track file removed');
    },
    onError: () => {
      toast.error('Failed to remove track file');
    },
  });

  return { removeTrack: mutate, isRemoving: isPending, error };
};

export default useRemoveTrackMutation;
