import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTracks } from '@/api/tracks.api.ts';
import { toast } from '@/lib/toast';

const useDeleteTracksMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: (ids: string[]) => deleteTracks(ids),
    onSuccess: async () => {
      toast.success('Tracks deleted successfully');
      await queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
    onError: () => {
      toast.error('There was an error while deleting tracks');
    },
  });

  return {
    deleteTracks: mutate,
    isDeleting: isPending,
    error,
  };
};

export default useDeleteTracksMutation;
