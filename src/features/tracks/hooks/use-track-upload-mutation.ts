import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadTrackFile } from '@/api/tracks.api.ts';
import { toast } from 'sonner';

const useTrackUploadMutation = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData: FormData) => uploadTrackFile(id, formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tracks'] });
      toast.success('Track file uploaded');
    },
    onError: () => {
      toast.error('Failed to upload track file');
    },
  });

  return { uploadTrack: mutate, isUploading: isPending, error };
};

export default useTrackUploadMutation;
