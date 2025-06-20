import TrackDialog from '@/features/tracks/components/track-dialog';
import { Track } from '@/types/entities/track';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { EditIcon, Trash2Icon } from 'lucide-react';
import useDeleteTrackMutation from '@/features/tracks/hooks/mutations/use-delete-track-mutation';
import { memo } from 'react';

interface TrackActionsProps {
  track: Track;
}

const TrackActions = ({ track }: TrackActionsProps) => {
  const { deleteTrack, isDeleting } = useDeleteTrackMutation();

  const handleDelete = () => {
    deleteTrack(track.id);
  };

  return (
    <div className="flex gap-2 absolute top-2 right-2 z-10">
      <TrackDialog track={track} isEdit>
        <Button
          data-testid={`edit-track-${track.id}`}
          variant="ghost"
          size="icon"
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          aria-label="Edit track"
        >
          <EditIcon className="h-4 w-4" />
        </Button>
      </TrackDialog>
      <ConfirmationDialog
        title="Are you sure you want to delete this track?"
        description="This action cannot be undone."
        onSubmit={handleDelete}
        isLoading={isDeleting}
      >
        <Button
          data-testid={`delete-track-${track.id}`}
          variant="destructive"
          size="icon"
        >
          <Trash2Icon className="h-4 w-4 text-white" />
        </Button>
      </ConfirmationDialog>
    </div>
  );
};

export default memo(TrackActions);
