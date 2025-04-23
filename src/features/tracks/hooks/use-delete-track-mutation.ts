import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTrack } from '@/api/tracks.api';
import { toast } from '@/lib/toast';

const useDeleteTrackMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (trackId: string) => {
      return deleteTrack(trackId);
    },
    onSuccess: async () => {
      toast.success('Track deleted successfully');
      await queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
    onError: () => {
      toast.error('There was an error while deleting tracks');
    },
  });

  return {
    deleteTrack: mutate,
    isDeleting: isPending,
    error,
  };
};
export default useDeleteTrackMutation;
