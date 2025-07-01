import { UploadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import useTrackUploadMutation from '@/features/tracks/hooks/mutations/use-track-upload-mutation';
import {
  ALLOWED_AUDIO_TYPES,
  MAX_FILE_SIZE,
} from '@/features/tracks/lib/constants';
import { useFileUpload } from '@/hooks/use-file-upload';
import { toast } from '@/lib/toast';

interface TrackUploadProps {
  trackId: string;
}

const TrackUpload = ({ trackId }: TrackUploadProps) => {
  const { uploadTrack, isUploading } = useTrackUploadMutation(trackId);

  const { openFileDialog, getInputProps } = useFileUpload({
    multiple: false,
    accept: ALLOWED_AUDIO_TYPES.join(','),
    onFilesAdded: (files) => {
      if (files.length > 0) {
        const file = files[0]?.file;
        if (!(file instanceof File)) {
          toast.error('Invalid file');
          return;
        }

        if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
          toast.error('Please upload only MP3 or WAV files');
          return;
        }

        if (file.size > MAX_FILE_SIZE) {
          toast.error('File size should be less than 50MB');
          return;
        }

        uploadTrack(file);
      }
    },
  });

  return (
    <div
      data-testid={`track-upload-${trackId}`}
      className="flex flex-col w-full items-center gap-2"
    >
      <div className="inline-flex w-full items-center gap-2 align-top">
        <div className="relative w-full inline-block">
          <Button
            data-testid={`upload-track-${trackId}`}
            className="w-full"
            onClick={openFileDialog}
            isLoading={isUploading}
            icon={<UploadIcon />}
            aria-haspopup="dialog"
          >
            Upload track
          </Button>
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload track file"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackUpload;
